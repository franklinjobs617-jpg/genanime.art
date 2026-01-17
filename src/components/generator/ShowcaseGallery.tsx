"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import GalleryCard from "./GalleryCard";

const SHOWCASE_ITEMS = [
    {
        image: "/images/prompts/cyberpunk_neon_city_31.webp",
        prompt: "Cyberpunk neon city, rainy night, futuristic skyscrapers, ultra detailed, cinematic lighting, purple and teal atmosphere",
        style: "Cyberpunk",
        ratio: "16:9"
    },
    {
        image: "/images/prompts/anime_key_visual_1.webp",
        prompt: "Highly detailed anime key visual, girl with black hair and glasses in a library, soft sunlight, cinematic composition",
        style: "Key Visual",
        ratio: "2:3"
    },
    {
        image: "/images/prompts/Ink_Style_White_Hair_Rose_Girl_01.webp",
        prompt: "Ink wash style illustration, short white hair, glowing green eyes, holding a single red rose, dark traditional background",
        style: "Ink Style",
        ratio: "2:3"
    },
    {
        image: "/images/prompts/cherry_blossom_sunset_dream.webp",
        prompt: "School classroom, sunset glow through windows, cherry blossoms petals floating in the air, nostalgic atmosphere",
        style: "Slice of Life",
        ratio: "16:9"
    },
    {
        image: "/images/prompts/full_shot_of_6.webp",
        prompt: "Full shot of Rimuru Tempest, wearing a fancy black jacket, blue hair, confident expression, magical forest background",
        style: "Fantasy",
        ratio: "2:3"
    },
    {
        image: "/images/prompts/starry_night_rooftop_view.webp",
        prompt: "Dramatic rooftop view, magnificent starry sky with giant comet, cinematic lighting, Makoto Shinkai style artwork",
        style: "Makoto Shinkai",
        ratio: "16:9"
    },
    {
        image: "/images/prompts/cyberpunk_neon_city_31.webp",
        prompt: "Neon-lit cybernetic street market, crowded holographic displays, heavy rain, reflection on puddles, high contrast",
        style: "Cyberpunk",
        ratio: "16:9"
    },
    {
        image: "/feature-waifu.webp",
        prompt: "Vibrant anime portrait, girl with flowing pastel hair, sparkling eyes, wearing a futuristic headset, soft bokeh background",
        style: "Modern Art",
        ratio: "2:3"
    }
];

interface ShowcaseGalleryProps {
    onSelect: (item: { prompt: string; style: string; ratio: string }) => void;
}

export default function ShowcaseGallery({ onSelect }: ShowcaseGalleryProps) {
    return (
        <div className="w-full space-y-12 py-12 pb-32">
            {/* Header with Outfit font and Gradient effect */}
            <div className="flex flex-col items-center text-center gap-3">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight font-outfit">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                        Inspiration Gallery
                    </span>
                </h2>
                <p className="text-zinc-500 text-sm md:text-base font-medium max-w-lg">
                    Discover and remix masterpiece creations from the community
                </p>
            </div>

            {/* Masonry Layout (Waterfall) */}
            <div className="columns-1 md:columns-3 xl:columns-4 gap-6 space-y-6">
                {SHOWCASE_ITEMS.map((item, idx) => (
                    <GalleryCard
                        key={idx}
                        index={idx}
                        src={item.image}
                        prompt={item.prompt}
                        style={item.style}
                        ratio={item.ratio}
                        onSelect={() => onSelect(item)}
                    />
                ))}
            </div>

            {/* View Full Library Button */}
            <div className="flex justify-center pt-8">
                <Link
                    href="/prompt-library"
                    className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 rounded-2xl transition-all duration-300"
                >
                    <span className="text-sm font-bold text-zinc-400 group-hover:text-white uppercase tracking-widest">
                        View Full Library
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </Link>
            </div>
        </div>
    );
}


