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
  "Studio Ghibli": 
    "studio ghibli style, miyazaki hayao style, hand-drawn animation, cel shading, soft natural lighting, muted colors, peaceful atmosphere, nostalgic, magical realism, watercolor style, dreamy, whimsical",
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
  "Studio Ghibli",
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
  "1:1": { width: 2048, height: 2048 },
  "9:16": { width: 1536, height: 2048 }, // 优化竖屏模式
  "16:9": { width: 2048, height: 1536 }, // 优化横屏模式
  "2:3": { width: 1536, height: 2048 },
  "3:2": { width: 2048, height: 1536 },
  "4:3": { width: 2048, height: 1536 },
  "3:4": { width: 1536, height: 2048 },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, style, ratio, quantity = 1, googleUserId, negativePrompt, model = "" } = body;

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
    // 根据模型类型添加预设前缀
    if (model) {
      if (model.includes("Pony") || model.toLowerCase().includes("pony")) {
        finalPrompt = "score_9, score_8_up, score_7_up, anime source, " + finalPrompt;
      } else if (model.includes("Niji") || model.toLowerCase().includes("niji")) {
        finalPrompt = "studio ghibli style, vibrant colors, cinematic lighting, artistic composition, " + finalPrompt;
      } else if (model.includes("Flux") || model.toLowerCase().includes("flux")) {
        finalPrompt = "photorealistic details, depth of field, 8k resolution, natural lighting, " + finalPrompt;
      }
    }

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

    // 5. Style-specific negative prompts
    if (style === "Realism") {
      finalNegative += ", anime, cartoon, illustration, 2d, sketch";
    } else if (style === "Studio Ghibli") {
      // Ghibli-specific negative prompts to avoid overly modern or harsh elements
      finalNegative += ", overly saturated, neon colors, cyberpunk, modern technology, harsh lighting, aggressive, violent, dark atmosphere, gothic";
    }

    // 6. Concatenate Negative Prompt to finalPrompt
    finalPrompt += `, negative prompt: ${finalNegative}`;

    // 获取优化后的分辨率
    let dimension = ASPECT_RATIO_DIMENSIONS[ratio] || ASPECT_RATIO_DIMENSIONS["1:1"];
    
    // 对于某些模型，可能需要特定的分辨率优化
    if (model) {
      // 如果是Pony模型，可以使用其推荐的分辨率
      if (model.includes("Pony") || model.toLowerCase().includes("pony")) {
        // Pony模型通常推荐使用特定的分辨率
        if (ratio === "1:1") {
          dimension = { width: 1024, height: 1024 };
        } else if (ratio === "16:9") {
          dimension = { width: 1344, height: 768 };
        } else if (ratio === "9:16") {
          dimension = { width: 768, height: 1344 };
        } else {
          // 其他比例按比例调整
          const ratioValue = dimension.width / dimension.height;
          if (ratioValue > 1) {
            // 横向图片
            dimension = { width: 1344, height: Math.round(1344 / ratioValue) };
          } else {
            // 纵向图片
            dimension = { width: Math.round(1344 * ratioValue), height: 1344 };
          }
        }
      }
    }
    
    // 确保最小尺寸满足API要求
    if (dimension.width * dimension.height < 3686400 && !(model && (model.includes("Pony") || model.toLowerCase().includes("pony")))) {
      // 如果小于最小要求且不是Pony模型，则使用更高分辨率
      if (ratio === "1:1") {
        dimension = { width: 2048, height: 2048 };
      } else {
        const ratioValue = dimension.width / dimension.height;
        if (ratioValue > 1) {
          dimension = { width: 2048, height: Math.round(2048 / ratioValue) };
        } else {
          dimension = { width: Math.round(2048 * ratioValue), height: 2048 };
        }
      }
    }
    
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
      model:
        process.env.DOUBAO_ENDPOINT_ID,
      prompt: finalPrompt,
      size: sizeStr as any,
      response_format: "b64_json",
      watermark: false
    };
    
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
    
    let errorMessage = error.message || "Failed to generate image";
    let errorType = "general";
    
    if (error.message && typeof error.message === 'string') {
      const lowerMessage = error.message.toLowerCase();
      
      if (lowerMessage.includes('sensitive') || lowerMessage.includes('inappropriate') || 
          lowerMessage.includes('nsfw') || lowerMessage.includes('adult') || 
          lowerMessage.includes('sex') || lowerMessage.includes('nudity')) {
        errorType = "content_filter";
        errorMessage = "Content not allowed: Please ensure your prompt doesn't contain adult or inappropriate content";
      } else if (lowerMessage.includes('credit') || lowerMessage.includes('insufficient')) {
        errorType = "insufficient_credits";
        errorMessage = "Insufficient credits";
      } else if (lowerMessage.includes('limit') || lowerMessage.includes('rate')) {
        errorType = "rate_limit";
        errorMessage = "Rate limit exceeded";
      } else if (lowerMessage.includes('user') && lowerMessage.includes('not found')) {
        errorType = "user_not_found";
        errorMessage = "User not found";
      }
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage, errorType },
      { status: 500 }
    );
  }
}
