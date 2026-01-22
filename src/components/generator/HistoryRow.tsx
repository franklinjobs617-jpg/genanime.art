"use client"

import { motion } from "framer-motion"
import {
    Clock,
    Maximize2,
    Wand2,
    Cpu,
    Download,
    Trash2,
} from "lucide-react"
import SafeImage from "./SafeImage"
import { toast } from "react-hot-toast"

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
        status?: string
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
    const isGenerating = item.status === 'generating';

    const formatDate = (timestamp: number) => {
        const d = new Date(timestamp)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        const hours = String(d.getHours()).padStart(2, '0')
        const minutes = String(d.getMinutes()).padStart(2, '0')
        return `${year}-${month}-${day} ${hours}:${minutes}`
    }

    const handleDownload = async (e: React.MouseEvent, url: string) => {
        e.stopPropagation();
        const toastId = toast.loading("Starting download...");
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `genanime-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            toast.success("Saved!", { id: toastId });
        } catch (err) {
            console.error(err);
            toast.error("Download failed", { id: toastId });
            window.open(url, "_blank");
        }
    };

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
        <div className="group flex flex-col gap-4 p-5 bg-[#09090b] border border-zinc-800 rounded-2xl transition-all hover:border-zinc-700 hover:shadow-lg">
            {/* Top: Prompt & Main Actions */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-300 font-medium leading-relaxed line-clamp-2 font-mono">
                        {item.prompt}
                    </p>
                </div>
            </div>

            {/* Middle: Image Grid */}
            <div className={`grid gap-3 w-full ${item.urls.length === 1 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" :
                    item.urls.length === 2 ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" :
                        "grid-cols-2 md:grid-cols-4"
                }`}>
                {item.urls.map((url, index) => {
                    const isLoading = isGenerating || !url;
                    
                    if (isLoading) {
                         return (
                            <div key={index} className={`relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 ${aspectRatioClass} ${item.urls.length === 1 ? "w-[240px]" : "w-full"}`}>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                                </div>
                            </div>
                         );
                    }

                    return (
                        <div key={index} className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className={`relative group/img cursor-pointer rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 ${aspectRatioClass} ${item.urls.length === 1 ? "w-[240px]" : "w-full"
                                    }`}
                                onClick={() => onViewDetail({ ...item, initialIndex: index })}
                            >
                                <SafeImage
                                    src={url}
                                    alt={item.prompt}
                                    fill={true}
                                    sizes="(max-width: 768px) 45vw, (max-width: 1024px) 22vw, 15vw"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                                />
                                
                                {/* Hover Overlay & Actions */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                                    <div className="absolute top-2 right-2 flex flex-col gap-1.5 translate-x-4 group-hover/img:translate-x-0 transition-transform duration-300">
                                        <button
                                            onClick={(e) => handleDownload(e, url)}
                                            className="p-2 bg-black/60 hover:bg-white text-white hover:text-black rounded-lg backdrop-blur-md border border-white/10 transition-colors"
                                            title="Download"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onViewDetail({ ...item, initialIndex: index });
                                            }}
                                            className="p-2 bg-black/60 hover:bg-white text-white hover:text-black rounded-lg backdrop-blur-md border border-white/10 transition-colors"
                                            title="Maximize"
                                        >
                                            <Maximize2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRegenerate();
                                            }}
                                            className="p-2 bg-black/60 hover:bg-indigo-500 text-white hover:text-white rounded-lg backdrop-blur-md border border-white/10 transition-colors"
                                            title="Remix"
                                        >
                                            <Wand2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(item.id);
                                            }}
                                            className="p-2 bg-black/60 hover:bg-red-500 text-white hover:text-white rounded-lg backdrop-blur-md border border-white/10 transition-colors"
                                            title="Delete Batch"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )
                })}
            </div>

            {/* Bottom: Icons Metadata */}
            <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 border-t border-zinc-800/50 pt-3 mt-1">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800">
                    <Cpu className="w-3 h-3 text-indigo-400" />
                    <span>{modelName}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800">
                    <Maximize2 className="w-3 h-3 text-emerald-400" />
                    <span>{resolution}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span>{date}</span>
                </div>
                {item.style && item.style !== "Default" && (
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800">
                        <Wand2 className="w-3 h-3 text-pink-400" />
                        <span>{item.style}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
