import ModelPageLayout from "@/components/ModelPageLayout/ModelPageLayout";

export const metadata = {
  title: "Pony Diffusion Online Free - Best Anime AI Generator",
  description:
    "Generate high-quality Pony Diffusion V6 anime art online for free. Includes best prompts, negative embeddings, and usage guide.",
  keywords: [
    "pony diffusion online",
    "pony v6 prompt",
    "anime ai generator",
    "pony diffusion xl",
    "waifu generator",
  ],
  alternates: {
    canonical: 'https://genanime.art/models/pony-diffusion',
  },
};

export default function PonyDiffusionPage() {
  return (
    <ModelPageLayout
      title="Pony Diffusion Online Free"
      subtitle="The ultimate SDXL model for high-quality, stylized anime art. Generate distinct characters with the best Pony Diffusion prompts."
      bgImage="/bg-pony.webp"
      modelName="Pony Diffusion"
      features={[
        "Native Pony V6 Architecture",
        "Supports Danbooru Tags",
        "No Credit Cost (Free)",
        "Fast Generation Speed",
      ]}
      samples={[
        {
          image: "/feature-pony.webp",
          prompt:
            "score_9, score_8_up, score_7_up, 1girl, rainbow hair, solo, dynamic pose, simple background, flat color, anime style",
        },
        {
          image: "/feature-waifu.webp",
          prompt:
            "score_9, score_8_up, masterpiece, 1girl, school uniform, cinematic lighting, detailed eyes, looking at viewer, blush",
        },
        {
          image: "/feature-chibi.webp",
          prompt:
            "score_9, score_8_up, chibi, cute, 1girl, white background, simple background, full body",
        },
      ]}
      promptGuide={{
        triggerWords: ["score_9", "score_8_up", "score_7_up", "source_anime"],
        bestTags: [
          "masterpiece",
          "best quality",
          "very aesthetic",
          "absurdres",
        ],
        negativePrompt:
          "score_6, score_5, score_4, low quality, bad hands, text, watermark, signature, ugly, bad anatomy, distorted",
        tips: "Pony Diffusion V6 requires specific 'score' tags to work correctly. Always start your prompt with 'score_9, score_8_up' to ensure high quality. Unlike other models, it understands Danbooru-style tags (e.g., '1girl, blue_hair') much better than natural language.",
      }}
      howToSteps={[
        {
          title: "Enter the Score Tags",
          desc: "Start your prompt with 'score_9, score_8_up'. This tells the model to prioritize high-quality data.",
        },
        {
          title: "Describe Character",
          desc: "Use specific Danbooru tags like 'blue_eyes', 'long_hair', 'school_uniform' to define your character.",
        },
        {
          title: "Generate & Refine",
          desc: "Click Generate. If the style isn't right, add style tags like '3d', 'flat_color', or 'painting'.",
        },
      ]}
      faqs={[
        {
          question: "Is Pony Diffusion free to use online?",
          answer:
            "Yes, our Anime AI Generator allows you to use the Pony Diffusion model completely for free without needing to install Stable Diffusion locally.",
        },
        {
          question: "What are the best settings for Pony V6?",
          answer:
            "We recommend using the Euler a or DPM++ 2M Karras sampler, with 25-30 steps and a CFG scale of 7.0 for the best balance between creativity and prompt adherence.",
        },
        {
          question: "Can I use this for commercial projects?",
          answer:
            "Images generated are generally free to use, but please check the specific license of the Pony Diffusion model checkpoint if you plan to sell the assets.",
        },
      ]}
      seoContent={{
        heading: "Why is Pony Diffusion V6 the Best Anime Model?",
        text: `Pony Diffusion XL V6 has revolutionized the anime AI art scene. Unlike generic SDXL models, it was fine-tuned on a massive dataset of high-quality anime illustrations with a unique "scoring" system.
        
        **Why users love it:**
        1. **Tag Adherence:** It listens to your prompts incredibly well. If you ask for a specific eye color or accessory, you get it.
        2. **Style Versatility:** From cel-shaded anime to semi-realistic 3D renders, Pony can do it all with the right style tags.
        3. **Anatomy Fixes:** It handles difficult poses and hands significantly better than older models.
        
        Our **Pony Diffusion Online** tool brings this power to your browser. No need for a $2000 graphics card—just type your prompt, hit generate, and get 4K quality anime art in seconds.`,
      }}
    />
  );
}
