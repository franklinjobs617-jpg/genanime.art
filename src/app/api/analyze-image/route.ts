export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

const apiKey = process.env.DOUBAO_API_KEY;
const endpointId = process.env.ARK_IMAGE_ANALYZE_MODEL || "doubao-seed-1-6-vision-250815";
const COST_PER_ANALYSIS = 2;
const GUEST_FREE_LIMIT = 2;

const client = new OpenAI({
    apiKey: apiKey,
    baseURL: process.env.ARK_BASE_URL,
});

export async function POST(req: NextRequest) {
    try {
        const { image, googleUserId } = await req.json();

        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        const isGuest = !googleUserId;
        const cookies = req.cookies;
        const guestCount = Number(cookies.get("guest_gen_count")?.value || "0");

        if (isGuest) {
            if (guestCount >= GUEST_FREE_LIMIT) {
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

            if (Number(user.credits) < COST_PER_ANALYSIS) {
                return NextResponse.json(
                    { success: false, error: "Insufficient credits" },
                    { status: 403 }
                );
            }
        }

        const response = await client.chat.completions.create({
            model: endpointId,
            messages: [
                {
                    role: "system",
                    content: `You are a professional AI Art Prompt Engineer specializing in Studio Ghibli and anime aesthetics. Your task is to analyze the user's uploaded image and reverse-engineer a high-quality prompt for Stable Diffusion / Flux that captures the essence of Studio Ghibli's visual style.

### Output Rules:
1.  **Format:** Output ONLY a comma-separated list of English tags.
2.  **Order of Importance:** 
    - [Quality/Style Tags] -> [Ghibli-specific Elements] -> [Main Subject] -> [Clothing/Accessories] -> [Pose/Action] -> [Environment/Background] -> [Lighting/Atmosphere].
3.  **No Chinese:** Strictly no Chinese characters in the output.

### Studio Ghibli Style Elements (PRIORITY):
- **Visual Style:** \`studio ghibli style, miyazaki hayao style, ghibli movie style, hand-drawn animation, cel shading, soft colors, watercolor style\`
- **Lighting:** \`soft natural lighting, golden hour, warm sunlight, dappled light, atmospheric lighting, dreamy lighting\`
- **Colors:** \`muted colors, pastel palette, earthy tones, soft greens, sky blues, warm yellows\`
- **Atmosphere:** \`nostalgic, peaceful, whimsical, magical realism, serene atmosphere\`

### Extraction Layers:
1.  **Quality Boosters:** Always include: \`masterpiece, best quality, ultra-detailed, highly detailed, beautiful, aesthetic\`.
2.  **Ghibli Style Tags:** ALWAYS include relevant Ghibli-specific visual elements from above.
3.  **Core Subject:** Identify gender, age, hair style/color, eye color, and unique features (e.g., \`1girl, solo, brown hair, gentle eyes, child\`).
4.  **Clothing & Accessories:** Focus on simple, natural clothing styles typical of Ghibli films (e.g., \`simple dress, casual clothes, natural fabrics, flowing clothes\`).
5.  **Environment & Nature:** Ghibli films emphasize nature - identify landscapes, plants, weather (e.g., \`lush forest, rolling hills, cloudy sky, grass field, ancient trees\`).
6.  **Mood & Composition:** Capture the emotional tone (e.g., \`peaceful expression, contemplative mood, wide shot, cinematic composition\`).

### Special Focus Areas:
- **Nature Elements:** Trees, grass, clouds, water, flowers, wind effects
- **Architecture:** Traditional buildings, rural settings, cozy interiors
- **Character Expression:** Gentle, thoughtful, innocent expressions
- **Composition:** Wide establishing shots, medium shots with environmental context

### Tone Setting:
Prioritize tags that evoke the gentle, nostalgic, and magical atmosphere of Studio Ghibli films. Focus on natural beauty, emotional depth, and the harmony between characters and their environment.`
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "image_url",
                            image_url: {
                                url: image,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 600,
        });

        let result = response.choices[0]?.message?.content || "";
        result = result.replace(/^Tags:\s*/i, "").trim();

        // Enhanced post-processing for Ghibli style
        const ghibliEnhancements = [
            "studio ghibli style",
            "miyazaki hayao style",
            "soft natural lighting",
            "muted colors",
            "peaceful atmosphere",
            "hand-drawn animation",
            "cel shading"
        ];

        // Check if Ghibli elements are already present
        const hasGhibliElements = ghibliEnhancements.some(enhancement =>
            result.toLowerCase().includes(enhancement.toLowerCase())
        );

        // Add Ghibli enhancements if not present
        if (!hasGhibliElements) {
            result = `studio ghibli style, miyazaki hayao style, ${result}`;
        }

        const finalPrompt = `${result}, (ghibli_style:1.3), (soft_colors:1.2), nostalgic, magical realism`;

        // Update credits or guest count
        if (!isGuest) {
            await prisma.user.update({
                where: { googleUserId },
                data: { credits: (Number(user.credits) - COST_PER_ANALYSIS).toString() },
            });
        }

        const res = NextResponse.json({
            success: true,
            prompt: finalPrompt,
            tags: finalPrompt.split(",").map(tag => tag.trim()).filter(Boolean)
        });

        if (isGuest) {
            res.cookies.set("guest_gen_count", String(guestCount + 1), {
                maxAge: 60 * 60 * 24,
                path: "/",
            });
        }
        return res;
    } catch (error: any) {
        console.error("Error analyzing image:", error);

        // 检查错误类型并返回更具体的错误信息
        let errorMessage = error.message || "Failed to analyze image";
        let errorType = "general";

        if (error.message && typeof error.message === 'string') {
            const lowerMessage = error.message.toLowerCase();

            if (lowerMessage.includes('sensitive') || lowerMessage.includes('inappropriate') ||
                lowerMessage.includes('nsfw') || lowerMessage.includes('adult') ||
                lowerMessage.includes('sex') || lowerMessage.includes('nudity')) {
                errorType = "content_filter";
                errorMessage = "Content not allowed: Please ensure your image doesn't contain adult or inappropriate content";
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
