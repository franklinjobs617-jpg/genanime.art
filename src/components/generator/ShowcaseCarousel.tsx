"use client";

import Image from "next/image";

interface ShowcaseItem {
  id: string;
  title: string;
  prompt: string;
  style: string;
  ratio: string;
  image: string;
}

interface ShowcaseCarouselProps {
  onUse: (item: ShowcaseItem, quickGenerate?: boolean) => void;
}

const SHOWCASE: ShowcaseItem[] = [
  {
    id: "sc-1",
    title: "Ethereal Portrait",
    prompt:
      "an ethereal anime girl portrait, soft glowing skin, dreamy bokeh, ultra-detailed eyes, cinematic lighting",
    style: "Vibrant Anime",
    ratio: "1:1",
    image: "/gallery/masterpiece-anime-girl-upper-body-waist-up-portrait.webp",
  },
  {
    id: "sc-2",
    title: "Retro 90s Cel",
    prompt:
      "classic 1990s anime cel style, nostalgic vibe, screentone texture, bold lines, coffee shop ambience",
    style: "Retro 90s",
    ratio: "16:9",
    image: "/gallery/retro-1980s-anime-style-boy-girl-coffee-shop-nostalgic.webp",
  },
  {
    id: "sc-3",
    title: "Ghibli Scenery",
    prompt:
      "ghibli-inspired countryside bus stop, warm sunlight, lush greenery, whimsical mood, painterly textures",
    style: "Makoto Ethereal",
    ratio: "16:9",
    image: "/gallery/ghibli-inspired-nostalgic-countryside-bus-stop-scenery.webp",
  },
  {
    id: "sc-4",
    title: "Cyberpunk Streets",
    prompt:
      "neon-lit cyberpunk street at night, rain reflections, dynamic perspective, vivid colors, futuristic signage",
    style: "Cyberpunk Trigger",
    ratio: "9:16",
    image: "/gallery/cyberpunk-street.webp",
  },
  {
    id: "sc-5",
    title: "Game Splash Art",
    prompt:
      "elite game splash art, powerful pose, flowing cape, energy particles, iconic character silhouette",
    style: "Elite Game Splash",
    ratio: "2:3",
    image: "/gallery/epic-birds-eye-view-anime-character-aerial-cityscape.webp",
  },
];

export default function ShowcaseCarousel({ onUse }: ShowcaseCarouselProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black uppercase tracking-[0.25em] text-zinc-500">
          Showcase
        </h2>
        <p className="text-xs text-zinc-500">Curated results — try the prompt</p>
      </div>

      <div className="relative">
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 custom-scrollbar">
          {SHOWCASE.map((item) => (
            <div
              key={item.id}
              className="snap-start rounded-2xl border border-white/10 bg-zinc-900/40 overflow-hidden min-w-[90%] sm:min-w-[70%] md:min-w-[60%] lg:min-w-[50%]"
            >
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white/90">
                      {item.title}
                    </span>
                    <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-white/10 border border-white/20 text-white/80">
                      {item.style} • {item.ratio}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUse(item, false)}
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white transition-colors"
                    >
                      Use this prompt
                    </button>
                    <button
                      onClick={() => onUse(item, true)}
                      className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-[11px] font-black text-white transition-colors"
                    >
                      Quick Generate
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <p className="text-[11px] text-zinc-400 line-clamp-2">
                  {item.prompt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}