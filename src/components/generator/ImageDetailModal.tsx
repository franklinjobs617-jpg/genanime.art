"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    X,
    Download,
    Trash2,
    Copy,
    Wand2,
    Image as ImageIcon,
    Info,
    Check,
    Box,
    Maximize2,
    Calendar,
    Cpu,
    Palette
} from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import SafeImage from "./SafeImage"
import { useTranslations } from "next-intl"

interface ImageDetailModalProps {
    isOpen: boolean
    onClose: () => void
    item: {
        id: string
        urls: string[]
        prompt: string
        timestamp: number
        style?: string
        ratio?: string
        model?: string
        seed?: number
        steps?: number
        cfgScale?: number
    } | null
    onRegenerate: () => void
    onDelete: (id: string) => void
}

export default function ImageDetailModal({
    isOpen,
    onClose,
    item,
    onRegenerate,
    onDelete
}: ImageDetailModalProps) {
    const t = useTranslations('Hero')
    const [copied, setCopied] = useState(false)

    if (!item) return null

    const handleCopy = () => {
        navigator.clipboard.writeText(item.prompt)
        setCopied(true)
        toast.success("Prompt copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
    }

    const date = new Date(item.timestamp).toLocaleString()
    const resolution = item.ratio === "1:1" ? "1024x1024" : item.ratio === "16:9" ? "1344x768" : "768x1344"

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center lg:justify-end overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    {/* Main Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 100 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 100 }}
                        className="relative w-full h-full flex flex-col lg:flex-row shadow-2xl"
                    >
                        {/* Center: Image Display */}
                        <div className="flex-1 flex items-center justify-center p-4 lg:p-12 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-6 left-6 z-50 p-3 bg-zinc-900/50 hover:bg-zinc-800 rounded-full border border-white/10 transition-all text-white/50 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="relative max-h-full max-w-full aspect-[2/3] lg:aspect-auto shadow-[0_0_100px_-20px_rgba(79,70,229,0.3)] rounded-2xl overflow-hidden border border-white/10">
                                <SafeImage
                                    src={item.urls[0]}
                                    alt={item.prompt}
                                    className="h-[500px] lg:h-[80vh] w-auto object-contain"
                                />
                            </div>

                            {/* Mobile Bottom Bar Actions (Visible on Mobile Only) */}
                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-4 lg:hidden">
                                <button className="p-4 bg-zinc-900/80 rounded-2xl border border-white/10 text-white">
                                    <Download className="w-6 h-6" />
                                </button>
                                <button className="p-4 bg-zinc-900/80 rounded-2xl border border-white/10 text-white">
                                    <Trash2 className="w-6 h-6 text-red-400" />
                                </button>
                                <button
                                    onClick={onRegenerate}
                                    className="flex-1 p-4 bg-indigo-600 rounded-2xl font-black text-white uppercase tracking-widest text-sm shadow-xl"
                                >
                                    Remix Vision
                                </button>
                            </div>
                        </div>

                        {/* Sidebar: Metadata & Actions */}
                        <div className="w-full lg:w-[400px] bg-[#0c0c0e] border-l border-white/5 p-6 lg:p-8 flex flex-col gap-8 overflow-y-auto hidden lg:flex">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-2 uppercase tracking-widest">
                                    <Calendar className="w-3.5 h-3.5" /> {date}
                                </span>
                                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-500 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Prompt Section */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Info className="w-3.5 h-3.5 text-indigo-400" /> Prompt
                                    </h4>
                                    <button
                                        onClick={handleCopy}
                                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                                    </button>
                                </div>
                                <div className="p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                                    <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                                        {item.prompt}
                                    </p>
                                </div>
                            </div>

                            {/* Model Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h4 className="text-[10px] uppercase font-black text-zinc-500 tracking-widest flex items-center gap-2">
                                        <Cpu className="w-3 h-3" /> Model
                                    </h4>
                                    <div className="px-3 py-2.5 bg-zinc-900/50 rounded-xl border border-white/5 text-xs font-bold text-zinc-200 flex items-center gap-2">
                                        <Box className="w-3.5 h-3.5 text-indigo-400" /> {item.model || "Flux v1.0"}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-[10px] uppercase font-black text-zinc-500 tracking-widest flex items-center gap-2">
                                        <Palette className="w-3 h-3" /> Style
                                    </h4>
                                    <div className="px-3 py-2.5 bg-zinc-900/50 rounded-xl border border-white/5 text-xs font-bold text-zinc-200">
                                        {item.style || "None"}
                                    </div>
                                </div>
                            </div>

                            {/* Technical Details Grid */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-4 border-t border-white/5">
                                <div>
                                    <h5 className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Image Dimension</h5>
                                    <p className="text-xs font-black text-white">{resolution}</p>
                                </div>
                                <div>
                                    <h5 className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Seed</h5>
                                    <p className="text-xs font-black text-white">{item.seed || "6289880345017"}</p>
                                </div>
                                <div>
                                    <h5 className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Prompt Enhance</h5>
                                    <p className="text-xs font-black text-white">On</p>
                                </div>
                                <div>
                                    <h5 className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Performance</h5>
                                    <p className="text-xs font-black text-white">Speed</p>
                                </div>
                            </div>

                            {/* Action Buttons Spacer */}
                            <div className="flex-1" />

                            {/* Action Buttons */}
                            <div className="space-y-4 pb-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-white/10 text-xs font-bold transition-all">
                                        <Download className="w-4 h-4" /> Download
                                    </button>
                                    <button
                                        onClick={() => { onDelete(item.id); onClose(); }}
                                        className="flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-white/10 text-xs font-bold text-red-400 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-white/10 text-xs font-bold transition-all">
                                        <Maximize2 className="w-4 h-4" /> Original Image
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-white/10 text-xs font-bold transition-all">
                                        <ImageIcon className="w-4 h-4" /> {t('buttons.imageToImage')}
                                    </button>
                                </div>
                                <button
                                    onClick={onRegenerate}
                                    className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <Wand2 className="w-5 h-5" /> Remix This Art
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
