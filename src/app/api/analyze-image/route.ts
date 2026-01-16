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
                    content: `You are a professional AI Art Prompt Engineer and Anime Stylist. Your task is to analyze the user's uploaded image and reverse-engineer a high-quality prompt for Stable Diffusion / Flux.

### Output Rules:
1.  **Format:** Output ONLY a comma-separated list of English tags.
2.  **Order of Importance:** 
    - [Quality/Style Tags] -> [Main Subject] -> [Clothing/Accessories] -> [Pose/Action] -> [Environment/Background] -> [Lighting/Atmosphere].
3.  **No Chinese:** Strictly no Chinese characters in the output.

### Extraction Layers:
1.  **Quality Boosters:** Always include standard high-quality tokens like: \`masterpiece, best quality, ultra-detailed, 8k wallpaper, highly detailed\`.
2.  **Core Subject:** Identify gender, hair style/color, eye color, and unique features (e.g., \`1girl, solo, long pink hair, purple eyes, cat ears\`).
3.  **Clothing & Medium:** Be specific about textures and styles (e.g., \`frills, lace, school uniform, oversized hoodie, techwear\`).
4.  **Art Style & Technique:** This is crucial for GenAnime. Identify styles like: \`flat color, cel shading, retro anime style, cinematic lighting, depth of field, sketch, oil painting, watercolor\`.
5.  **Environment & Lighting:** Describe the vibe (e.g., \`cherry blossoms, cyberpunk city, sunset, soft rim lighting, volumetric light, lens flare\`).

### Tone Setting:
Avoid generic sentences. Use professional Danbooru-style tags. If the image has a specific artist's style or era (like 90s anime), mention it.`
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
            max_tokens: 500,
        });

        let result = response.choices[0]?.message?.content || "";
        result = result.replace(/^Tags:\s*/i, "").trim();
        const finalPrompt = `${result}, (genanime_style:1.2), colorful`;

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
        return NextResponse.json(
            { success: false, error: error.message || "Failed to analyze image" },
            { status: 500 }
        );
    }
}
