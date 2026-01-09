"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
    Download,
    Share2,
    Maximize2,
    MoreHorizontal,
    Sparkles,
    ThumbsUp,
    ThumbsDown,
    Wand2,
    Copy,
    X,
    Trash2,
    CheckCircle2,
    Loader2,
    AlertCircle
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
    url: string
    prompt: string
    style?: string
    ratio?: string
    isGenerating?: boolean
    onRegenerate?: () => void
    onDelete?: () => void // 新增删除回调
}

export default function GenerationResultCard({
    url,
    prompt,
    style,
    ratio,
    isGenerating,
    onRegenerate,
    onDelete // 接收删除方法
}: Props) {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [liked, setLiked] = useState<boolean | null>(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // 通知状态
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'loading' | 'error';
    } | null>(null)

    // 显示通知的辅助函数
    const showToast = (message: string, type: 'success' | 'loading' | 'error' = 'success') => {
        setNotification({ message, type })
        if (type !== 'loading') {
            setTimeout(() => setNotification(null), 2500)
        }
    }

    // 关闭菜单监听
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const copyPrompt = () => {
        navigator.clipboard.writeText(prompt)
        showToast("Prompt copied to clipboard!", "success")
        setMenuOpen(false)
    }

    const handleDownload = async () => {
        setMenuOpen(false)
        showToast("Downloading image...", "loading")

        try {
            const response = await fetch(url)
            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = blobUrl
            link.download = `anime-${Date.now()}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)

            showToast("Download completed!", "success")
        } catch (error) {
            console.error("Download failed:", error)
            showToast("Download failed. Try again.", "error")
        }
    }

    const handleShare = async () => {
        setMenuOpen(false)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "AI Generated Image",
                    text: prompt,
                    url: window.location.href,
                })
            } catch (error) {
                console.error("Share failed:", error)
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
            showToast("Link copied to clipboard!", "success")
        }
    }

    const handleDelete = () => {
        setMenuOpen(false)
        if (onDelete) {
            onDelete()
            showToast("Image deleted", "success")
        } else {
            showToast("Delete function not implemented", "error")
        }
    }

    if (isGenerating) {
        return (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center relative">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                    <span className="text-xs text-zinc-500">Generating...</span>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* 通知 Toast 组件 */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -20, x: "-50%" }}
                        className="fixed top-6 left-1/2 z-[100] flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-full shadow-2xl text-sm font-medium text-white"
                    >
                        {notification.type === 'success' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                        {notification.type === 'loading' && <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />}
                        {notification.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
                        <span>{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Card Container */}
            <div className="flex flex-col lg:flex-row gap-4 group">
                {/* Image */}
                <div className="relative flex-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <img
                        src={url || "/placeholder.svg"}
                        alt="Generated image"
                        className="w-full aspect-[4/3] lg:aspect-auto lg:h-[360px] object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-500"
                        onClick={() => setIsFullscreen(true)}
                    />

                    {/* Hover Actions - Desktop */}
                    <div className="hidden lg:flex absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
                            <div className="flex gap-2">
                                <IconButton icon={<Download className="w-4 h-4" />} onClick={handleDownload} tooltip="Download" />
                                <IconButton icon={<Share2 className="w-4 h-4" />} onClick={handleShare} tooltip="Share" />
                            </div>
                            <IconButton icon={<Maximize2 className="w-4 h-4" />} onClick={() => setIsFullscreen(true)} tooltip="Fullscreen" />
                        </div>
                    </div>
                </div>

                {/* Info Panel - Desktop */}
                <div className="hidden lg:flex w-[280px] flex-col bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="flex-1">
                        <p className="text-sm text-zinc-300 leading-relaxed line-clamp-5 font-mono text-xs">{prompt}</p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-zinc-500">
                            <div className="flex items-center gap-1 px-2 py-1 bg-zinc-800/50 rounded border border-zinc-800">
                                <Sparkles className="w-3 h-3 text-purple-400" />
                                <span>{style || "Anime V4"}</span>
                            </div>
                            <span className="bg-zinc-800/50 px-2 py-1 rounded border border-zinc-800">1024 × 768</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between">
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={`p-2 rounded-lg transition-colors ${menuOpen ? "bg-zinc-800 text-zinc-200" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"}`}
                            >
                                <MoreHorizontal className="w-5 h-5" />
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {menuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute bottom-full left-0 mb-2 w-40 bg-[#18181b] border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-20 p-1"
                                    >
                                        <MenuItem icon={<Copy className="w-4 h-4" />} label="Copy Prompt" onClick={copyPrompt} />
                                        <MenuItem icon={<Download className="w-4 h-4" />} label="Download" onClick={handleDownload} />
                                        <MenuItem icon={<Share2 className="w-4 h-4" />} label="Share" onClick={handleShare} />

                                        <div className="h-px bg-zinc-700/50 my-1 mx-2" />

                                        <button
                                            onClick={handleDelete}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors rounded-lg"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setLiked(liked === true ? null : true)}
                                className={`p-2 rounded-lg transition-colors ${liked === true
                                    ? "text-purple-400 bg-purple-500/10"
                                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                                    }`}
                            >
                                <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setLiked(liked === false ? null : false)}
                                className={`p-2 rounded-lg transition-colors ${liked === false ? "text-red-400 bg-red-500/10" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                                    }`}
                            >
                                <ThumbsDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Bar (Optimized) */}
            <div className="lg:hidden mt-3 space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-400 line-clamp-1 flex-1 mr-4 font-mono text-xs">{prompt}</p>
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 text-zinc-400 bg-zinc-800 rounded-lg"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {/* Mobile Dropdown Logic is same as Desktop (using same state) */}
                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute bottom-full right-0 mb-2 w-48 bg-[#18181b] border border-zinc-700 rounded-xl shadow-2xl z-20 p-1"
                                >
                                    <MenuItem icon={<Copy className="w-4 h-4" />} label="Copy Prompt" onClick={copyPrompt} />
                                    <MenuItem icon={<Download className="w-4 h-4" />} label="Download" onClick={handleDownload} />
                                    <MenuItem icon={<Trash2 className="w-4 h-4" />} label="Delete" onClick={handleDelete} isDanger />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Quick Actions */}
                <div className="flex gap-2">
                    <button onClick={handleDownload} className="flex-1 bg-zinc-800 py-2 rounded-lg text-xs font-medium text-zinc-300 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                        <Download className="w-3.5 h-3.5" /> Download
                    </button>
                    <button onClick={copyPrompt} className="flex-1 bg-zinc-800 py-2 rounded-lg text-xs font-medium text-zinc-300 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                        <Copy className="w-3.5 h-3.5" /> Copy
                    </button>
                </div>
            </div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setIsFullscreen(false)}
                    >
                        <button
                            className="absolute top-6 right-6 p-2 bg-zinc-800/80 hover:bg-zinc-700 rounded-full transition-colors z-10"
                            onClick={() => setIsFullscreen(false)}
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            src={url || "/placeholder.svg"}
                            alt="Fullscreen view"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                            <ActionPill icon={<Download className="w-5 h-5" />} label="Download" onClick={handleDownload} />
                            <ActionPill icon={<Copy className="w-5 h-5" />} label="Prompt" onClick={copyPrompt} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

// 辅助组件：图标按钮
function IconButton({ icon, onClick, tooltip }: { icon: React.ReactNode, onClick?: () => void, tooltip?: string }) {
    return (
        <button
            title={tooltip}
            onClick={(e) => {
                e.stopPropagation()
                onClick?.()
            }}
            className="p-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg text-white hover:bg-zinc-800 transition-all active:scale-95"
        >
            {icon}
        </button>
    )
}

// 辅助组件：菜单项
function MenuItem({ icon, label, onClick, isDanger }: { icon: React.ReactNode, label: string, onClick: () => void, isDanger?: boolean }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${isDanger
                ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                : "text-zinc-300 hover:bg-zinc-700/50 hover:text-white"
                }`}
        >
            {icon}
            {label}
        </button>
    )
}

function ActionPill({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800/90 hover:bg-zinc-700 backdrop-blur-md rounded-full text-white font-medium transition-all active:scale-95 border border-white/10"
        >
            {icon}
            <span>{label}</span>
        </button>
    )
}