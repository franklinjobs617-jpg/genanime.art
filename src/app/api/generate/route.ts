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

// 定义动漫相关的风格
const ANIME_STYLES = [
  "Vibrant Anime",
  "Retro 90s",
  "Elite Game Splash",
  "Makoto Ethereal",
  "Cyberpunk Trigger",
];

// 动漫专用参数配置
const ANIME_DEFAULT_PARAMS = {
  cfg_scale: 9.5,
  steps: 30,
  sampler_name: "DPM++ 2M Karras",
  clip_skip: 2,
  vae: "animevae.pt"
};

// 分辨率预设
const ASPECT_RATIO_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "1:1": { width: 1024, height: 1024 },
  "9:16": { width: 832, height: 1216 }, // 优化竖屏模式
  "16:9": { width: 1216, height: 832 }, // 优化横屏模式
  "2:3": { width: 832, height: 1216 },
  "3:2": { width: 1216, height: 832 },
  "4:3": { width: 1216, height: 912 },
  "3:4": { width: 912, height: 1216 },
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

    // 限制单次生成的最大数量，防止API滥用和过载
    const MAX_QUANTITY = 4;
    if (quantity > MAX_QUANTITY) {
      return NextResponse.json(
        { success: false, error: `Maximum quantity allowed is ${MAX_QUANTITY}` },
        { status: 400 }
      );
    }

    // 确保数量至少为1
    if (quantity < 1) {
      return NextResponse.json(
        { success: false, error: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

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

    // 获取优化后的分辨率
    const dimension = ASPECT_RATIO_DIMENSIONS[ratio] || ASPECT_RATIO_DIMENSIONS["1:1"];
    const sizeStr = `${dimension.width}x${dimension.height}`;

    const effectiveQuantity = isGuest ? 1 : quantity;

    const client = new OpenAI({
      apiKey: process.env.DOUBAO_API_KEY,
      baseURL: process.env.ARK_BASE_URL,
    });

    // 检查是否为动漫风格
    const isAnimeStyle = ANIME_STYLES.includes(style);
    
    // 构建基础参数
    const baseParams: any = {
      model: process.env.DOUBAO_ENDPOINT_ID || "doubao-seedream-4-5-251128",
      prompt: finalPrompt,
      size: sizeStr as any,
      response_format: "b64_json",
      watermark: false
    };
    
    // 如果是动漫风格，添加动漫专用参数到提示词中以确保兼容性
    if (isAnimeStyle) {
      baseParams.prompt = `${finalPrompt}, vae:${ANIME_DEFAULT_PARAMS.vae}, cfg_scale:${ANIME_DEFAULT_PARAMS.cfg_scale}, steps:${ANIME_DEFAULT_PARAMS.steps}, sampler:${ANIME_DEFAULT_PARAMS.sampler_name}, clip_skip:${ANIME_DEFAULT_PARAMS.clip_skip}`;
    }
    
    const promises = Array.from({ length: effectiveQuantity }).map(() =>
      client.images.generate(baseParams)
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
