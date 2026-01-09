import { type NextRequest, NextResponse } from "next/server"
import { addWatermark } from "@/lib/watermark"
import OpenAI from "openai"

const STYLE_PROMPTS: Record<string, string> = {
    "Vibrant V6 Core":
        "official art, unity 8k wallpaper, ultra detailed, beautiful and aesthetic, masterpiece, best quality, vibrant colors, cinematic lighting",
    "Retro Cel 1990s":
        "1990s anime style, retro anime, cel shading, screen shot, vhs effect, noise, vintage aesthetic, sailor moon style",
    "Elite Game Splash":
        "game splash art, genshin impact style, honkai star rail style, super detailed, dynamic pose, elemental effects, character design",
    "Makoto Ethereal":
        "makoto shinkai style, kimi no na wa style, clouds, blue sky, lens flare, breathtaking scenery, highly detailed",
    "Cyberpunk Trigger":
        "studio trigger style, cyberpunk edgerunners style, neon lights, chromatic aberration, bold lines, vivid colors",
    "Pastel Luxe Art":
        "pastel colors, soft lighting, thick coating, painterly, dreamlike, ethereal, illustration, feminine",
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { prompt, style, ratio, quantity = 1, isPremium } = body

        if (!prompt || !prompt.trim()) {
            return NextResponse.json({ success: false, error: "提示词不能为空" }, { status: 400 })
        }

        const styleSuffix = STYLE_PROMPTS[style] || STYLE_PROMPTS["Vibrant V6 Core"]
        const finalPrompt = `${prompt}, ${styleSuffix}`

        let width = 1920
        let height = 1920

        // 根据模型限制调整分辨率 (Doubao模型通常最大支持边长为 2048 或特定比例，此处保留你的逻辑)
        if (ratio === "2:3") {
            width = 1536
            height = 2304
        } else if (ratio === "3:2") {
            width = 2304
            height = 1536
        } else if (ratio === "16:9") {
            width = 2560
            height = 1440
        } else if (ratio === "9:16") {
            width = 1440
            height = 2560
        }

        const sizeStr = `${width}x${height}`

        console.log("[Generate API] Processing:", {
            prompt,
            style,
            ratio,
            count: quantity,
            size: sizeStr,
        })

        const apiKey = process.env.DOUBAO_API_KEY as string
        const endpointId = process.env.DOUBAO_ENDPOINT_ID as string

        if (!apiKey || !endpointId) {
            throw new Error("Missing DOUBAO_API_KEY or DOUBAO_ENDPOINT_ID")
        }

        const client = new OpenAI({
            apiKey: apiKey,
            baseURL: "https://ark.cn-beijing.volces.com/api/v3",
        })


        const promises = Array.from({ length: quantity }).map(() =>
            client.images.generate({
                model: endpointId,
                prompt: finalPrompt,
                n: 1, // 强制每次只请求 1 张，因为上游限制
                size: sizeStr as any,
                response_format: "b64_json",
                watermark: false,
            } as any)
        );

        // 并发执行所有请求 (Promise.all 会等待所有请求完成)
        const responses = await Promise.all(promises);

        const imageUrls: string[] = []

        // 处理所有返回结果
        for (const response of responses) {
            if (response.data) {
                for (const item of response.data) {
                    const base64Data = item.b64_json
                    if (!base64Data) continue

                    let imageBuffer: Buffer = Buffer.from(base64Data, "base64")

                    // Apply watermark if not premium
                    if (!isPremium) {
                        try {
                            imageBuffer = await addWatermark(imageBuffer, "AnimeAI Generator")
                        } catch (wmError) {
                            console.error("Watermark failed:", wmError)

                        }
                    }

                    const finalBase64 = imageBuffer.toString("base64")
                    imageUrls.push(`data:image/jpeg;base64,${finalBase64}`)
                }
            }
        }
        // --- 核心修改结束 ---

        if (imageUrls.length === 0) {
            throw new Error("No image data received from API")
        }

        return NextResponse.json({
            success: true,
            images: imageUrls,
            creditsRemaining: isPremium ? 9999 : 1000,
        })
    } catch (error) {
        console.error("[Generate API] Error:", error)

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "生成图片失败",
            },
            { status: 500 },
        )
    }
}