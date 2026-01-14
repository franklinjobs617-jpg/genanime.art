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
    id: "tpl-1",
    title: "Ethereal Portrait",
    prompt:
      "an ethereal anime girl portrait, soft glowing skin, dreamy bokeh, ultra-detailed eyes, cinematic lighting",
    style: "Vibrant Anime",
    ratio: "1:1",
    image: "/gallery/masterpiece-anime-girl-upper-body-waist-up-portrait.webp",
  },
  {
    id: "tpl-2",
    title: "Retro 90s Cel",
    prompt:
      "classic 1990s anime cel style, nostalgic vibe, screentone texture, bold lines, coffee shop ambience",
    style: "Retro 90s",
    ratio: "16:9",
    image: "/gallery/retro-1980s-anime-style-boy-girl-coffee-shop-nostalgic.webp",
  },
  {
    id: "tpl-3",
    title: "Ghibli Scenery",
    prompt:
      "ghibli-inspired countryside bus stop, warm sunlight, lush greenery, whimsical mood, painterly textures",
    style: "Makoto Ethereal",
    ratio: "16:9",
    image: "/gallery/ghibli-inspired-nostalgic-countryside-bus-stop-scenery.webp",
  },
  {
    id: "tpl-4",
    title: "Cyberpunk Streets",
    prompt:
      "neon-lit cyberpunk street at night, rain reflections, dynamic perspective, vivid colors, futuristic signage",
    style: "Cyberpunk Trigger",
    ratio: "9:16",
    image: "/gallery/cyberpunk-street.webp",
  },
  {
    id: "tpl-5",
    title: "Game Splash Art",
    prompt:
      "elite game splash art, powerful pose, flowing cape, energy particles, iconic character silhouette",
    style: "Elite Game Splash",
    ratio: "2:3",
    image: "/gallery/epic-birds-eye-view-anime-character-aerial-cityscape.webp",
  },
  {
    id: "tpl-6",
    title: "Pastel Kawaii Sticker",
    prompt:
      "kawaii sticker sheet, pastel palette, cute chibi expressions, high contrast outlines, playful charm",
    style: "Pastel Luxe Art",
    ratio: "1:1",
    image: "/gallery/kawaii-sticker.webp",
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