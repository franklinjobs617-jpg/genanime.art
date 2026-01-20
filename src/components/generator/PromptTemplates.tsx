"use client";

import Image from "next/image";

interface Template {
  id: string;
  title: string;
  prompt: string;
  style: string;
  ratio: string;
  image: string;
}

interface PromptTemplatesProps {
  onPick: (tpl: Template, quickGenerate?: boolean) => void;
}

const TEMPLATES: Template[] = [
  {
    id: "tpl-10",
    title: "Abstract Digital Art",
    prompt: `(Subject:1.5): A breathtakingly beautiful and elegant 1/7 scale anime girl figure. (Outfit:1.4): Wearing a sophisticated summer-themed fantasy dress, featuring semi-transparent light blue silk layers, delicate lace ruffles, and elegant silver embroidery, sleeveless design with a stylish choker, perfectly balanced elegance and freshness. (Face:1.4): Exquisite facial features, large sparkling sapphire eyes, soft natural makeup, a gentle and captivating smile. (Hair:1.3): Long flowing silver hair with a slight translucent effect at the tips, decorated with small pearl hairpins.
(Environment): Placed on a realistic modern computer desk, circular transparent acrylic base with no text.
(Background): A large 4K monitor displaying the professional ZBrush modeling interface with the 3D sculpt of this figure, showing intricate mesh details. Next to the monitor, a premium TAMIYA-style packaging box with the beautiful character illustration.
(Quality): Masterpiece, 8k resolution, photorealistic, cinematic lighting, soft studio shadows, subsurface scattering for skin, depth of field, sharp focus on the figure, high-end collector's item aesthetic.`,
    style: "",
    ratio: "1:1",
    image: "/gallery/genanime-art-elegant-summer-oc-figure-pro-setup.webp",
  },
  {
    id: "tpl-11",
    title: "Thick Oil Impasto",
    prompt:
      "Avant-garde anime character portrait in heavy impasto oil painting style. A mysterious girl with messy white hair and piercing red eyes. Thick, visible brushstrokes, rich textures, dark moody lighting with a single spotlight. High artistic value, unique character design, expressive and emotional.",
    style: "Oil Painting",
    ratio: "9:16",
    image: "/gallery/avant-garde-anime-girl-thick-oil-painting.webp",
  },
  {
    id: "tpl-12",
    title: "Vibrant Pop Art",
    prompt:
      "Stylized anime character in a vibrant Pop Art aesthetic. A cool boy with sunglasses, bold black outlines, halftone dot patterns, and a limited palette of neon pink, yellow, and cyan. Flat colors, high contrast, 1960s comic book vibe mixed with modern anime. Eye-catching and iconic.",
    style: "Pop Art",
    ratio: "9:16",
    image: "/gallery/stylized-anime-boy-pop-art-neon.webp",
  },
  {
    id: "tpl-13",
    title: "Minimalist Sumi-e",
    prompt:
      "Minimalist anime character design using traditional Japanese ink wash (Sumi-e) techniques. A graceful female warrior, only essential lines and shadows, elegant flow, negative space. Splashes of black ink, high-quality paper texture, Zen-like atmosphere. Sophisticated and modern.",
    style: "Ink Wash",
    ratio: "9:16",
    image: "/gallery/minimalist-anime-warrior-ink-wash-sumie.webp",
  },
  {
    id: "tpl-14",
    title: "Glitch-core Cyber",
    prompt:
      "Edgy anime character in a Glitch-core and Cyber-goth style. A character with digital distortion effects, chromatic aberration, scan lines, and neon green accents. Dark aesthetic, tech-wear fashion, fragmented visuals, high energy. Unique and experimental.",
    style: "Glitch Art",
    ratio: "9:16",
    image: "/gallery/edgy-anime-girl-glitch-core-cyber-goth.webp",
  },
  {
    id: "tpl-15",
    title: "3D Paper-cut Art",
    prompt:
      "Unique anime character created in a 3D paper-cut art style. Layers of colored paper creating depth and shadows. A whimsical character with intricate patterns, soft studio lighting, macro photography feel. Creative, tactile, and highly distinctive.",
    style: "Paper Cut",
    ratio: "9:16",
    image: "/gallery/unique-anime-character-3d-paper-cut-art.webp",
  },
  {
    id: "tpl-16",
    title: "Stained Glass Celestial",
    prompt:
      "Anime character portrait designed as a vibrant stained glass window. A celestial goddess with flowing hair, intricate lead lines, glowing translucent colors, sunlight filtering through. Ethereal, sacred, and visually stunning. Unique mosaic-like composition.",
    style: "Stained Glass",
    ratio: "9:16",
    image: "/gallery/celestial-goddess-anime-stained-glass-art.webp",
  },
  {
    id: "tpl-17",
    title: "Vaporwave Retro",
    prompt:
      "Retro-futuristic anime character in a Vaporwave and Synthwave aesthetic. A character with a 1980s anime style, pastel purple and pink sunset background, palm tree silhouettes, and VHS glitch effects. Nostalgic, dreamy, and highly stylized.",
    style: "Vaporwave",
    ratio: "9:16",
    image: "/gallery/retro-vaporwave-anime-character-synthwave.webp",
  },
  {
    id: "tpl-18",
    title: "Dark Fantasy Knight",
    prompt:
      "Dark fantasy anime character design. A knight in ornate, cursed black armor with glowing blue soul-fire leaking from the joints. Gothic architecture in the background, dramatic chiaroscuro lighting, high detail, epic and intimidating.",
    style: "Dark Fantasy",
    ratio: "9:16",
    image: "/gallery/dark-fantasy-anime-knight-cursed-armor.webp",
  },
  {
    id: "tpl-19",
    title: "Watercolor Sketch",
    prompt:
      "Artistic anime character in a loose watercolor and pencil sketch style. A girl with a soft smile, delicate washes of color, intentional pencil marks, and paper texture. Ethereal, light, and full of personality. High-end editorial illustration feel.",
    style: "Watercolor",
    ratio: "9:16",
    image: "/gallery/artistic-anime-girl-watercolor-pencil-sketch.webp",
  },
  {
    id: "tpl-20",
    title: "Neon Noir Detective",
    prompt:
      "Neon-noir anime character portrait. A detective-like character in a dark city, illuminated by harsh pink and blue neon lights. High contrast, deep shadows, cinematic composition, rain effects. Moody and stylish.",
    style: "Neon Noir",
    ratio: "9:16",
    image: "/gallery/neon-noir-anime-detective-portrait.webp",
  },
];

export default function PromptTemplates({ onPick }: PromptTemplatesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-[0.25em] text-zinc-500">
          Starter Templates
        </h2>
        <p className="text-xs text-zinc-500">
          Click to fill your prompt or quick-generate
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            className="group rounded-2xl border border-white/10 bg-zinc-900/40 overflow-hidden"
          >
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={tpl.image}
                alt={tpl.title}
                fill
                className="object-cover transition-all group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white/90">
                  {tpl.title}
                </span>
                <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-white/10 border border-white/20 text-white/80">
                  {tpl.style} • {tpl.ratio}
                </span>
              </div>
            </div>

            <div className="p-3 flex items-center gap-2">
              <button
                onClick={() => onPick(tpl, false)}
                className="flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-colors"
              >
                Use this
              </button>
              <button
                onClick={() => onPick(tpl, true)}
                className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-black text-white transition-colors"
              >
                Quick Generate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
