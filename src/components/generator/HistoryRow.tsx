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

    const getResolution = (ratio: string) => {
        switch (ratio) {
            case "1:1": return "1024x1024"
            case "16:9": return "1344x768"
            case "9:16": return "768x1344"
            case "4:3": return "1024x768"
            case "3:4": return "768x1024"
            default: return "1024x1024"
        }
    }

    const resolution = getResolution(item.ratio || "1:1")
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

            {/* Row Content - Image */}
            <div className="relative group/img cursor-pointer max-w-fit px-2" onClick={() => onViewDetail(item)}>
                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[2/3] w-[240px] md:w-[280px]">
                    <SafeImage
                        src={item.urls[0]}
                        alt={item.prompt}
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                            <Eye className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
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
