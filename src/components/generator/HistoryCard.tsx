"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wand2, Trash2, ImageOff, ExternalLink } from "lucide-react"

import SafeImage from "./SafeImage"

interface HistoryCardProps {
    urls: string[]
    prompt: string
    style?: string
    ratio?: string
    model?: string
    isSelected?: boolean
    onSelect?: () => void
    onRegenerate: () => void
    onDelete: () => void
}

export default function HistoryCard({
    urls = [],
    prompt,
    style,
    ratio,
    model = "Seedream 4.0",
    isSelected,
    onSelect,
    onRegenerate,
    onDelete
}: HistoryCardProps) {
    const displayUrl = urls[0] || ""

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onSelect}
            className={`
                group relative aspect-square rounded-[24px] overflow-hidden bg-zinc-900 border transition-all duration-500 cursor-pointer
                ${isSelected
                    ? "border-indigo-500 shadow-[0_0_30px_-5px_rgba(79,70,229,0.4)] ring-2 ring-indigo-500/50"
                    : "border-white/5 hover:border-indigo-500/30 shadow-2xl"
                }
            `}
        >
            {/* Selection Checkbox (Visible when selected or on hover) */}
            <div className={`
                absolute top-3 left-3 z-30 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center
                ${isSelected
                    ? "bg-indigo-500 border-indigo-500 scale-110 shadow-lg"
                    : "bg-black/20 border-white/20 opacity-0 group-hover:opacity-100"
                }
            `}>
                {isSelected && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>
                )}
            </div>
            {/* Main Image with Safe Loading & Fallback */}
            <SafeImage
                src={displayUrl}
                alt={prompt}
                className="w-full h-full transition-transform duration-700 group-hover:scale-110"
            />

            {/* Top Right Actions (Appear on Hover) */}
            <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-[-10px] group-hover:translate-y-0">
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="p-2.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-xl"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {/* Bottom Reveal Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                >
                    <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-0.5 bg-indigo-600 text-[10px] font-black text-white uppercase tracking-widest rounded-md shadow-lg">
                                {style || "Vibrant"}
                            </span>
                            <span className="px-2 py-0.5 bg-white/10 text-[10px] font-black text-zinc-300 uppercase tracking-widest rounded-md border border-white/5 backdrop-blur-md">
                                {ratio || "1:1"}
                            </span>
                        </div>
                        <p className="text-sm font-medium text-zinc-200 leading-relaxed line-clamp-2">
                            "{prompt}"
                        </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onRegenerate(); }}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 shadow-xl"
                        >
                            <Wand2 className="w-3.5 h-3.5" /> Remix
                        </button>
                        <div className="h-10 px-3 flex items-center bg-white/5 rounded-xl border border-white/5 text-[10px] font-bold text-zinc-500">
                            {model}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Selection/Hover Glow */}
            <div className="absolute inset-0 border-2 border-indigo-500/0 group-hover:border-indigo-500/20 rounded-[24px] pointer-events-none transition-all duration-500" />
        </motion.div>
    )
}
