import { type NextRequest, NextResponse } from "next/server";
import { addWatermark } from "@/lib/watermark";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
const COST_PER_IMAGE = 2;

const GLOBAL_QUALITY_BOOSTER = "masterpiece, best quality, aesthetic, breathtaking, 8k uhd, highly detailed, sharp focus, perfect composition, high fidelity, rich textures";
const GLOBAL_NEGATIVE_PROMPT = "low quality, worst quality, ugly, blurry, pixelated, jpeg artifacts, text, watermark, signature, bad anatomy, bad hands, deformed, amateur";

const STYLE_PROMPTS: Record<string, string> = {
  "Default": "",
  "Realism": "photorealistic, raw photo, dslr, soft lighting, highly detailed skin texture, hyper-realistic",
  "Vibrant Anime":
    "official art, unity 8k wallpaper, ultra detailed, vibrant colors, aesthetic masterpiece",
  "Retro 90s": "1990s anime style, cel shaded, vintage aesthetic, vhs noise",
  "Elite Game Splash":
    "game splash art, genshin impact style, honkai star rail style, dynamic pose",
  "Makoto Ethereal":
    "makoto shinkai style, kimi no na wa style, breathtaking scenery, highly detailed",
  "Cyberpunk Trigger":
    "studio trigger style, neon lights, bold lines, vivid colors",
  "Pastel Luxe Art": "pastel colors, soft lighting, painterly, dreamlike",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, style, ratio, quantity = 1, googleUserId, negativePrompt } = body;

    if (!prompt?.trim())
      return NextResponse.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );

    const isGuest = !googleUserId;
    const cookies = req.cookies;
    const guestCount = Number(cookies.get("guest_gen_count")?.value || "0");
    const GUEST_DAILY_LIMIT = 2;

    if (isGuest) {
      if (guestCount >= GUEST_DAILY_LIMIT) {
        return NextResponse.json(
          { success: false, error: "Free limit reached" },
          { status: 429 }
        );
      }
    }

    let user: any = null;
    if (!isGuest) {
      user = await prisma.user.findUnique({ where: { googleUserId } });
      if (!user)
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 }
        );

      const totalCost = quantity * COST_PER_IMAGE;
      if (Number(user.credits) < totalCost) {
        return NextResponse.json(
          { success: false, error: "Insufficient credits" },
          { status: 403 }
        );
      }
    }

    // 1. Base Prompt
    let finalPrompt = prompt;

    // 2. Add Style Suffix (if not Default)
    const styleSuffix = STYLE_PROMPTS[style];
    if (styleSuffix && style !== "Default") {
      finalPrompt += `, ${styleSuffix}`;
    }

    // 3. Force Global Quality Boosters
    finalPrompt += `, ${GLOBAL_QUALITY_BOOSTER}`;

    // 4. Build Negative Prompt
    let finalNegative = GLOBAL_NEGATIVE_PROMPT;
    if (negativePrompt?.trim()) {
      finalNegative += `, ${negativePrompt}`;
    }

    // 5. Realism Special Logic: Exclude anime/cartoon
    if (style === "Realism") {
      finalNegative += ", anime, cartoon, illustration, 2d, sketch";
    }

    // 6. Concatenate Negative Prompt to finalPrompt
    finalPrompt += `, negative prompt: ${finalNegative}`;

    let sizeStr = "1920x1920"; // 默认 1:1
    if (ratio === "9:16") {
      sizeStr = "1440x2560";
    } else if (ratio === "16:9") {
      sizeStr = "2560x1440";
    } else if (ratio === "2:3") {
      sizeStr = "1536x2400";
    } else if (ratio === "3:2") {
      sizeStr = "2400x1536";
    }

    const effectiveQuantity = isGuest ? 1 : quantity;

    const client = new OpenAI({
      apiKey: "3a4b60e4-f692-4210-b26e-a03c636fc804",
      baseURL: "https://ark.cn-beijing.volces.com/api/v3",
    });

    const promises = Array.from({ length: effectiveQuantity }).map(() =>
      client.images.generate({
        model: "doubao-seedream-4-5-251128",
        prompt: finalPrompt,
        size: sizeStr as any,
        response_format: "b64_json",
        watermark: false
      } as any)
    );

    const responses = await Promise.all(promises);
    const imageUrls: string[] = [];

    const isPremium = !isGuest && Number(user.credits) > 100;

    for (const res of responses) {
      const base64 = res.data?.[0]?.b64_json;
      if (!base64) continue;

      let buffer: any = Buffer.from(base64, "base64");
      if (!isPremium) {
        try {
          buffer = await addWatermark(buffer, "GenAnime.art");
        } catch (e) {
          console.error("Watermark error:", e);
        }
      }
      imageUrls.push(`data:image/png;base64,${buffer.toString("base64")}`);
    }

    if (!isGuest) {
      const totalCost = quantity * COST_PER_IMAGE;
      await prisma.user.update({
        where: { googleUserId },
        data: { credits: (Number(user.credits) - totalCost).toString() },
      });
    }

    const res = NextResponse.json({ success: true, images: imageUrls });
    if (isGuest) {
      res.cookies.set("guest_gen_count", String(guestCount + 1), {
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    }
    return res;
  } catch (error: any) {
    console.error("[API Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
