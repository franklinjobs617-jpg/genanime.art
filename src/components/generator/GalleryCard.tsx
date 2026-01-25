"use client";

import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";
import Image from "next/image";

interface GalleryCardProps {
    src: string;
    prompt: string;
    style: string;
    ratio: string;
    onSelect: () => void;
    index: number;
}

export default function GalleryCard({ src, prompt, style, ratio, onSelect, index }: GalleryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            onClick={onSelect}
            className="group relative cursor-pointer rounded-2xl overflow-hidden bg-zinc-900 shadow-xl border border-white/5 transition-all duration-300 hover:shadow-2xl hover:border-indigo-500/20"
        >
            {/* Image Container with Zoom */}
            <div className="relative overflow-hidden aspect-[3/4] min-h-[200px]">
                <Image
                    src={src}
                    alt={`${prompt.substring(0, 100)}... - High quality anime art illustration`}
                    fill={true}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />


                {/* 1. Dark Overlay (Fades in) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* 2. Content (Slides up) */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-black uppercase tracking-widest rounded border border-indigo-500/30 backdrop-blur-md">
                                {style}
                            </span>
                            <span className="px-2 py-0.5 bg-white/5 text-zinc-400 text-[9px] font-black uppercase tracking-widest rounded border border-white/10 backdrop-blur-md">
                                {ratio}
                            </span>
                        </div>

                        <p className="text-white text-xs md:text-sm font-medium leading-relaxed line-clamp-3">
                            {prompt}
                        </p>

                        <button
                            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-colors shadow-lg"
                        >
                            <Wand2 className="w-3.5 h-3.5" />
                            Remix
                        </button>
                    </div>
                </div>
            </div>

            {/* Placeholder / Loading State hint */}
            <div className="absolute inset-0 -z-10 bg-zinc-900 animate-pulse" />
        </motion.div>
    );
}
