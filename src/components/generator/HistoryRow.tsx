"use client"

import { motion } from "framer-motion"
import {
    Plus,
    Share2,
    Clock,
    Maximize2,
    Layers,
    Wand2,
    Eye,
    Globe,
    Cpu
} from "lucide-react"
import SafeImage from "./SafeImage"

interface HistoryRowProps {
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
    }
    onRegenerate: () => void
    onDelete: (id: string) => void
    onViewDetail: (item: any) => void
}

export default function HistoryRow({
    item,
    onRegenerate,
    onDelete,
    onViewDetail
}: HistoryRowProps) {
    const formatDate = (timestamp: number) => {
        const d = new Date(timestamp)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const hours = String(d.getHours()).padStart(2, '0')
        const minutes = String(d.getMinutes()).padStart(2, '0')
        const seconds = String(d.getSeconds()).padStart(2, '0')
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    const date = formatDate(item.timestamp)

    const getAspectRatioClass = (ratio: string) => {
        switch (ratio) {
            case "1:1": return "aspect-square";
            case "16:9": return "aspect-[16/9]";
            case "9:16": return "aspect-[9/16]";
            case "4:3": return "aspect-[4/3]";
            case "3:4": return "aspect-[3/4]";
            case "2:3": return "aspect-[2/3]";
            default: return "aspect-square";
        }
    };

    const getResolution = (ratio: string) => {
        switch (ratio) {
            case "1:1": return "1024x1024"
            case "16:9": return "1344x768"
            case "9:16": return "768x1344"
            case "4:3": return "1024x768"
            case "3:4": return "768x1024"
            case "2:3": return "832x1216"
            default: return "1024x1024"
        }
    }

    const resolution = getResolution(item.ratio || "1:1")
    const aspectRatioClass = getAspectRatioClass(item.ratio || "1:1")
    const modelName = item.model || "Flux v1.0"

    return (
        <div className="group flex flex-col gap-3 py-6 border-b border-white/5 transition-colors hover:bg-white/[0.02]">
            {/* Row Header - Metadata - Scrollable on mobile */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                <div className="flex items-center gap-4 text-[10px] md:text-[11px] font-medium text-zinc-500 overflow-x-auto pb-2 md:pb-0 no-scrollbar whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-zinc-300 shrink-0">
                        <Plus className="w-3.5 h-3.5" />
                        <span className="font-bold">Prompt</span>
                    </div>

                    <div className="h-3 w-px bg-zinc-800" />

                    <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Text to Image</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" />
                        <span>Public</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-zinc-300">{modelName}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{date}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>{resolution}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <span className="font-bold text-zinc-400">{item.urls.length}</span>
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onRegenerate()
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md text-[11px] font-bold transition-all border border-white/5 self-start md:self-auto shrink-0"
                >
                    <Wand2 className="w-3.5 h-3.5" /> Remix
                </button>
            </div>

            {/* Row Content - Image Grid */}
            <div className={`px-2 grid gap-4 w-full max-w-6xl ${item.urls.length === 1 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" :
                    item.urls.length === 2 ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" :
                        "grid-cols-2 md:grid-cols-4 lg:grid-cols-4"
                }`}>
                {item.urls.map((url, index) => (
                    <div key={index} className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className={`relative group/img cursor-pointer rounded-2xl overflow-hidden border border-white/10 ${aspectRatioClass} ${item.urls.length === 1 ? "w-[240px] md:w-[280px]" : "w-full"
                                }`}
                            onClick={() => onViewDetail({ ...item, initialIndex: index })}
                            onTouchStart={(e) => {
                                // 为移动端添加长按保存提示
                                const touchStartTime = Date.now();
                                let touchTimer: NodeJS.Timeout;
                                
                                touchTimer = setTimeout(() => {
                                    // 检查触摸持续时间是否超过阈值（例如500毫秒）
                                    if (Date.now() - touchStartTime > 500) {
                                        // 显示长按保存提示
                                        const tooltip = document.createElement('div');
                                        tooltip.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg z-50 transition-opacity duration-300';
                                        tooltip.textContent = 'Long press to save to your gallery';
                                        document.body.appendChild(tooltip);
                                        
                                        // 3秒后自动移除提示
                                        setTimeout(() => {
                                            tooltip.remove();
                                        }, 3000);
                                    }
                                }, 500); // 500ms 作为长按阈值
                                
                                // 清除定时器，如果触摸结束
                                const clearTouchTimer = () => {
                                    clearTimeout(touchTimer);
                                    window.removeEventListener('touchend', clearTouchTimer);
                                    window.removeEventListener('touchmove', clearTouchTimer);
                                };
                                
                                window.addEventListener('touchend', clearTouchTimer);
                                window.addEventListener('touchmove', clearTouchTimer);
                            }}
                        >
                            <SafeImage
                                src={url}
                                alt={item.prompt}
                                fill={true}
                                sizes="(max-width: 768px) 45vw, (max-width: 1024px) 22vw, 15vw"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                className="w-full h-full object-cover transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                    <Eye className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Row Footer - Full Prompt */}
            <div className="px-2">
                <p className="text-[13px] text-zinc-400 leading-relaxed max-w-4xl line-clamp-2 italic font-medium">
                    {item.prompt}
                </p>
            </div>
        </div>
    )
}
