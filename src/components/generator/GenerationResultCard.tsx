"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
    Download, Share2, Maximize2, MoreHorizontal, Sparkles, ThumbsUp, ThumbsDown,
    Wand2, Copy, X, Trash2, CheckCircle2, Loader2, AlertCircle, ImageIcon
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
    urls: string[] // 改为数组支持多图
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
    const [notification, setNotification] = useState<{message: string, type: 'success' | 'loading' | 'error'} | null>(null)

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
            <div className="bg-zinc-900/50 border border-white/5 rounded-3xl aspect-[16/9] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Casting Vision...</span>
                </div>
            </div>
        )
    }

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

            <div className="flex flex-col lg:flex-row gap-6 group">
                {/* Image Display Grid */}
                <div className={`relative flex-1 bg-zinc-900 border border-white/5 rounded-[32px] overflow-hidden grid gap-1 ${urls.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {urls.map((u, i) => (
                        <div key={i} className="relative aspect-square lg:aspect-auto lg:h-[400px] overflow-hidden group/img">
                            <img src={u} alt="Result" className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-700" onClick={() => setSelectedImgIndex(i)} />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                            <button onClick={() => downloadImg(u, i)} className="absolute top-4 right-4 p-2.5 bg-black/50 backdrop-blur-md rounded-xl text-white opacity-0 group-hover/img:opacity-100 transition-all hover:bg-white hover:text-black">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Sidebar Info */}
                <div className="lg:w-[300px] flex flex-col bg-zinc-900/50 border border-white/5 rounded-[32px] p-6 backdrop-blur-xl">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                            <ImageIcon className="w-3.5 h-3.5" /> {urls.length} Variations
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed font-medium italic line-clamp-6">"{prompt}"</p>
                        
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-tight">
                                <Sparkles className="w-3 h-3" /> {style || "Vibrant Anime"}
                            </div>
                            <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-tight">
                                {ratio || "1:1"}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2" ref={menuRef}>
                            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2.5 bg-white/5 text-zinc-500 hover:text-white rounded-xl transition-all relative">
                                <MoreHorizontal className="w-5 h-5" />
                                <AnimatePresence>
                                    {menuOpen && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                            className="absolute bottom-full left-0 mb-3 w-44 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-1.5 z-50">
                                            <button onClick={() => { navigator.clipboard.writeText(prompt); showToast("Copied!", "success") }} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-zinc-400 hover:bg-white/5 hover:text-white rounded-xl">
                                                <Copy className="w-4 h-4" /> Copy Prompt
                                            </button>
                                            <button onClick={onDelete} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-red-400 hover:bg-red-400/10 rounded-xl">
                                                <Trash2 className="w-4 h-4" /> Delete Gallery
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                            <button onClick={() => setLiked(!liked)} className={`p-2.5 rounded-xl transition-all ${liked ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "bg-white/5 text-zinc-500 hover:text-white"}`}>
                                <ThumbsUp className="w-4 h-4" />
                            </button>
                        </div>
                        
                        <button onClick={onRegenerate} className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 shadow-lg">
                            <Wand2 className="w-3.5 h-3.5" /> Retry
                        </button>
                    </div>
                </div>
            </div>

            {/* Fullscreen Preview */}
            <AnimatePresence>
                {selectedImgIndex !== null && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setSelectedImgIndex(null)}>
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