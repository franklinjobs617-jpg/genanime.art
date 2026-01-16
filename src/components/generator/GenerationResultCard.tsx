"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
    Download, Share2, Maximize2, MoreHorizontal, Sparkles, ThumbsUp, ThumbsDown,
    Wand2, Copy, X, Trash2, CheckCircle2, Loader2, AlertCircle, ImageIcon
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import SafeImage from "./SafeImage"

interface Props {
    urls: string[]
    prompt: string
    style?: string
    ratio?: string
    isGenerating?: boolean
    onRegenerate?: () => void
    onDelete?: () => void
}

export default function GenerationResultCard({
    urls = [],
    prompt,
    style,
    ratio,
    isGenerating,
    onRegenerate,
    onDelete
}: Props) {
    const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null)
    const [liked, setLiked] = useState<boolean | null>(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'loading' | 'error' } | null>(null)

    const showToast = (message: string, type: 'success' | 'loading' | 'error' = 'success') => {
        setNotification({ message, type })
        if (type !== 'loading') setTimeout(() => setNotification(null), 2500)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const downloadImg = async (url: string, index: number) => {
        showToast(`Downloading image ${index + 1}...`, "loading")
        try {
            const response = await fetch(url)
            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = blobUrl
            link.download = `anime-${Date.now()}-${index}.png`
            link.click()
            window.URL.revokeObjectURL(blobUrl)
            showToast("Download completed!", "success")
        } catch (e) { showToast("Download failed", "error") }
    }

    if (isGenerating) {
        return (
            <div className="bg-[#09090b] border border-white/5 rounded-[24px] aspect-[16/9] flex items-center justify-center animate-pulse">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Casting Vision...</span>
                </div>
            </div>
        )
    }

    const isCardGenerating = urls.some(u => u === "") || isGenerating;

    return (
        <>
            <AnimatePresence>
                {notification && (
                    <motion.div initial={{ opacity: 0, y: -20, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: -20, x: "-50%" }}
                        className="fixed top-6 left-1/2 z-[100] flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-full shadow-2xl text-xs font-bold text-white">
                        {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                        {notification.type === 'loading' && <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />}
                        {notification.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
                        <span>{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-[#09090b] hover:bg-zinc-900/50 border border-white/5 rounded-[24px] overflow-hidden transition-all duration-500 hover:border-white/10"
            >
                <div className="flex flex-col md:flex-row">
                    {/* Image Area - Expanded Grid */}
                    <div className={`
                         flex-1 grid gap-0.5 overflow-hidden
                         ${urls.length === 1 ? 'grid-cols-1' : ''}
                         ${urls.length === 2 ? 'grid-cols-2' : ''}
                         ${urls.length === 3 ? 'grid-cols-3' : ''}
                         ${urls.length >= 4 ? 'grid-cols-2 md:grid-cols-4' : ''}
                    `}>
                        {urls.map((u, i) => (
                            <div key={i} className={`relative aspect-square group/img ${u ? 'cursor-zoom-in' : ''} overflow-hidden`} onClick={() => u && setSelectedImgIndex(i)}>
                                {u ? (
                                    <SafeImage
                                        src={u}
                                        alt={`Result ${i}`}
                                        className="w-full h-full transition-transform duration-700 group-hover/img:scale-110"
                                        priority={true}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-zinc-900 relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Loader2 className="w-5 h-5 text-indigo-500/20 animate-spin" />
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-all" />

                                {/* Quick Actions Overlay */}
                                {u && (
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover/img:opacity-100 transition-all translate-y-2 group-hover/img:translate-y-0">
                                        <button onClick={(e) => { e.stopPropagation(); downloadImg(u, i) }} className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-white hover:text-black transition-colors">
                                            <Download className="w-3.5 h-3.5" />
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); setSelectedImgIndex(i) }} className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-white hover:text-black transition-colors">
                                            <Maximize2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Info Area - Reveals/Expands on large screens */}
                    <div className="md:w-[280px] p-5 flex flex-col justify-between border-l border-white/5 bg-[#09090b]/50">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                        <ImageIcon className="w-3 h-3 text-indigo-400" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{urls.length} Images</span>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => setLiked(!liked)} className={`p-2 rounded-lg transition-all ${liked ? "text-indigo-400 bg-indigo-500/10" : "text-zinc-600 hover:text-zinc-300 hover:bg-white/5"}`}>
                                        <ThumbsUp className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-zinc-300 font-medium leading-relaxed line-clamp-4">
                                "{prompt}"
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] font-bold text-zinc-400 border border-white/5">
                                    {style || "Anime"}
                                </span>
                                <span className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] font-bold text-zinc-400 border border-white/5">
                                    {ratio || "1:1"}
                                </span>
                                {isCardGenerating && (
                                    <span className="px-2.5 py-1 bg-indigo-500/10 rounded-md text-[10px] font-bold text-indigo-400 border border-indigo-500/20 animate-pulse">
                                        Generating...
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-2">
                            <button
                                onClick={onRegenerate}
                                disabled={isCardGenerating}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Wand2 className="w-3 h-3" /> Remix
                            </button>
                            <div className="relative" ref={menuRef}>
                                <button onClick={() => setMenuOpen(!menuOpen)} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                                <AnimatePresence>
                                    {menuOpen && (
                                        <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute bottom-full right-0 mb-2 w-40 bg-[#121214] border border-white/10 rounded-xl shadow-2xl p-1 z-20 origin-bottom-right">
                                            <button onClick={() => { navigator.clipboard.writeText(prompt); showToast("Copied!", "success"); setMenuOpen(false) }} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-white/5 rounded-lg text-left">
                                                <Copy className="w-3.5 h-3.5" /> Copy Prompt
                                            </button>
                                            <button onClick={() => { onDelete && onDelete(); setMenuOpen(false) }} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-lg text-left">
                                                <Trash2 className="w-3.5 h-3.5" /> Delete
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Fullscreen Preview */}
            <AnimatePresence>
                {selectedImgIndex !== null && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#09090b]/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setSelectedImgIndex(null)}>
                        <button className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"><X className="w-6 h-6" /></button>
                        <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={urls[selectedImgIndex]} className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()} />
                        <div className="absolute bottom-10 flex gap-4">
                            <button onClick={() => downloadImg(urls[selectedImgIndex!], selectedImgIndex!)} className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-2xl">
                                <Download className="w-4 h-4" /> Download High-Res
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}