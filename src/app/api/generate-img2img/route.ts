export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import { addWatermark } from "@/lib/watermark";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

const COST_PER_IMAGE = 2;

const GLOBAL_QUALITY_BOOSTER =
  "masterpiece, best quality, aesthetic, breathtaking, 8k uhd, highly detailed, sharp focus, perfect composition, high fidelity, rich textures";
const GLOBAL_NEGATIVE_PROMPT =
  "low quality, worst quality, ugly, blurry, pixelated, jpeg artifacts, text, watermark, signature, bad anatomy, bad hands, deformed, amateur";

// 注意：风格处理现在完全由前端负责，后端不再重复处理风格提示词

const ANIME_STYLES = [
  "Vibrant Anime",
  "Studio Ghibli",
  "Retro 90s",
  "Elite Game Splash",
  "Makoto Ethereal",
  "Cyberpunk Trigger",
];

const ANIME_DEFAULT_PARAMS = {
  cfg_scale: 9.5,
  steps: 30,
  sampler_name: "DPM++ 2M Karras",
  clip_skip: 2,
  vae: "animevae.pt",
};

const ASPECT_RATIO_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "1:1": { width: 2048, height: 2048 },
  "9:16": { width: 1536, height: 2048 },
  "16:9": { width: 2048, height: 1536 },
  "2:3": { width: 1536, height: 2048 },
  "3:2": { width: 2048, height: 1536 },
  "4:3": { width: 2048, height: 1536 },
  "3:4": { width: 1536, height: 2048 },
};

function strengthToHint(strength: number) {
  const s = Math.max(0, Math.min(1, strength));
  if (s <= 0.3) return "Preserve the original image composition, colors, and details closely. Make minimal changes.";
  if (s <= 0.5) return "Keep the main subject and composition. Allow moderate style changes while maintaining identity.";
  if (s <= 0.7) return "Allow significant style transformation while preserving the core subject and pose.";
  return "Strong creative transformation. Use the reference image as loose inspiration.";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt = "",
      style = "Default",
      ratio = "1:1",
      quantity = 1,
      googleUserId,
      negativePrompt,
      model = "",
      image,
      strength = 0.4, // 降低默认 strength，更好地保持原图特征
    } = body as any;

    if (!image) {
      return NextResponse.json(
        { success: false, error: "Reference image is required for Img2Img" },
        { status: 400 }
      );
    }

    // 验证图片格式
    if (!image.startsWith('data:image/')) {
      return NextResponse.json(
        { success: false, error: "Invalid image format. Please provide a valid base64 image." },
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
      if (!user) {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 }
        );
      }

      const totalCost = quantity * COST_PER_IMAGE;
      if (Number(user.credits) < totalCost) {
        return NextResponse.json(
          { success: false, error: "Insufficient credits" },
          { status: 403 }
        );
      }
    }

    let finalPrompt = (prompt || "").trim();

    // 如果没有提供 prompt 且没有选择特定风格，添加保持原图风格的指导
    if (!finalPrompt && style === "Default") {
      finalPrompt = "maintain the original style and aesthetic, preserve the visual characteristics";
    }

    // 根据模型类型添加预设前缀（仅在前端未处理时）
    if (model && !finalPrompt.includes("score_9") && !finalPrompt.includes("studio ghibli") && !finalPrompt.includes("photorealistic details")) {
      if (model.includes("Pony") || model.toLowerCase().includes("pony")) {
        finalPrompt = "score_9, score_8_up, score_7_up, anime source, " + finalPrompt;
      } else if (model.includes("Niji") || model.toLowerCase().includes("niji")) {
        finalPrompt =
          "studio ghibli style, vibrant colors, cinematic lighting, artistic composition, " +
          finalPrompt;
      } else if (model.includes("Flux") || model.toLowerCase().includes("flux")) {
        finalPrompt =
          "photorealistic details, depth of field, 8k resolution, natural lighting, " +
          finalPrompt;
      }
    }

    // 移除后端的重复风格处理，因为前端已经处理了
    // const styleSuffix = STYLE_PROMPTS[style];
    // if (styleSuffix && style !== "Default") {
    //   finalPrompt = finalPrompt ? `${finalPrompt}, ${styleSuffix}` : styleSuffix;
    // }

    // 添加 img2img 特定的指导
    const hint = strengthToHint(Number(strength));
    if (finalPrompt) {
      finalPrompt = `${finalPrompt}. ${hint}`;
    } else {
      finalPrompt = hint;
    }

    // 确保包含全局质量提升词（避免重复添加）
    if (!finalPrompt.includes("masterpiece") && !finalPrompt.includes("best quality")) {
      finalPrompt += `, ${GLOBAL_QUALITY_BOOSTER}`;
    }

    let finalNegative = GLOBAL_NEGATIVE_PROMPT;
    if (negativePrompt?.trim()) {
      finalNegative += `, ${negativePrompt}`;
    }
    if (style === "Realism") {
      finalNegative += ", anime, cartoon, illustration, 2d, sketch";
    } else if (style === "Studio Ghibli") {
      // Ghibli-specific negative prompts to avoid overly modern or harsh elements
      finalNegative += ", overly saturated, neon colors, cyberpunk, modern technology, harsh lighting, aggressive, violent, dark atmosphere, gothic";
    }
    finalPrompt += `, negative prompt: ${finalNegative}`;

    const dimension = ASPECT_RATIO_DIMENSIONS[ratio] || ASPECT_RATIO_DIMENSIONS["1:1"];
    const sizeStr = `${dimension.width}x${dimension.height}`;

    const effectiveQuantity = isGuest ? 1 : quantity;

    const client = new OpenAI({
      apiKey: process.env.DOUBAO_API_KEY,
      baseURL: process.env.ARK_BASE_URL,
    });

    const isAnimeStyle = ANIME_STYLES.includes(style);

    const baseParams: any = {
      model: process.env.DOUBAO_ENDPOINT_ID, // 使用和文生图相同的端点 doubao-seedream-4-0-250828
      prompt: finalPrompt,
      image: image, // 确保原始图片被传递
      strength: Number(strength), // 添加 strength 参数控制变化程度
      size: sizeStr as any,
      response_format: "b64_json",
      watermark: false,
      // 添加 img2img 特定参数
      image_guidance_scale: 1.5, // 图片引导强度
      num_inference_steps: isAnimeStyle ? ANIME_DEFAULT_PARAMS.steps : 25,
    };

    // 为动漫风格添加特殊参数
    if (isAnimeStyle) {
      baseParams.cfg_scale = ANIME_DEFAULT_PARAMS.cfg_scale;
      baseParams.sampler_name = ANIME_DEFAULT_PARAMS.sampler_name;
      baseParams.clip_skip = ANIME_DEFAULT_PARAMS.clip_skip;
      // 不要在 prompt 中重复添加这些参数，而是作为独立参数传递
    }

    console.log('Img2Img Debug Info:', {
      hasImage: !!image,
      imagePrefix: image?.substring(0, 50) + '...',
      prompt: finalPrompt,
      style,
      strength,
      model: process.env.DOUBAO_ENDPOINT_ID, // 使用和文生图相同的端点 doubao-seedream-4-0-250828
      apiKey: process.env.DOUBAO_API_KEY ? 'Set' : 'Not Set',
      baseURL: process.env.ARK_BASE_URL
    });

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

      const finalBase64 = buffer.toString("base64");
      imageUrls.push(`data:image/png;base64,${finalBase64}`);
    }

    if (!imageUrls.length) {
      return NextResponse.json(
        { success: false, error: "No images generated" },
        { status: 500 }
      );
    }

    if (!isGuest) {
      const totalCost = effectiveQuantity * COST_PER_IMAGE;
      console.log('IMG2IMG - Deducting credits:', {
        userId: googleUserId,
        currentCredits: user.credits,
        totalCost,
        effectiveQuantity,
        newCredits: Number(user.credits) - totalCost
      });
      
      try {
        const updatedUser = await prisma.user.update({
          where: { googleUserId },
          data: { credits: (Number(user.credits) - totalCost).toString() },
        });
        
        console.log('IMG2IMG - Credits deducted successfully:', {
          userId: googleUserId,
          oldCredits: user.credits,
          newCredits: updatedUser.credits
        });
      } catch (creditError) {
        console.error('IMG2IMG - Failed to deduct credits:', creditError);
        // 积分扣减失败时，应该返回错误而不是继续
        return NextResponse.json(
          { success: false, error: "Failed to deduct credits" },
          { status: 500 }
        );
      }
    } else {
      const newCount = guestCount + 1;
      const response = NextResponse.json({ success: true, images: imageUrls });
      response.cookies.set("guest_gen_count", newCount.toString(), {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
      return response;
    }

    return NextResponse.json({ success: true, images: imageUrls });
  } catch (error: any) {
    console.error('Img2Img Generation Error:', {
      message: error?.message,
      status: error?.status,
      code: error?.code,
      stack: error?.stack
    });

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Generation failed",
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}
