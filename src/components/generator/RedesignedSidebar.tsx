"use client"

import { useState } from "react"
import { ChevronDown, RotateCcw } from "lucide-react"

interface SidebarProps {
    activeStyle: string
    setActiveStyle: (val: string) => void
    activeRatio: string
    setActiveRatio: (val: string) => void
    activeQuantity: number
    setActiveQuantity: (val: number) => void
    activeModel: string
    setActiveModel: (val: string) => void
}

export default function RedesignedSidebar({
    activeStyle,
    setActiveStyle,
    activeRatio,
    setActiveRatio,
    activeQuantity,
    setActiveQuantity,
    activeModel,
    setActiveModel,
}: SidebarProps) {
    const [modelOpen, setModelOpen] = useState(false)
    const [styleOpen, setStyleOpen] = useState(false)

    const models = [
        { value: "Seedream 4.0", label: "Seedream 4.0" },
        { value: "Anime XL", label: "Anime XL" },
    ]

    const styles = [
        { value: "Vibrant Anime", label: "Vibrant Anime" },
        { value: "Retro 90s", label: "Retro 90s" },
        { value: "Cinematic", label: "Cinematic" },
        { value: "Soft Pastel", label: "Soft Pastel" },
    ]

    const ratios = [
        { label: "2:3", w: 3, h: 4 },
        { label: "1:1", w: 4, h: 4 },
        { label: "16:9", w: 5, h: 3 },
    ]

    const quantities = [1, 2, 3, 4]

    return (
        <div className="w-full h-full flex flex-col bg-[#09090b]">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
                {/* Model Selector */}
                <div className="space-y-2">
                    <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Model</label>
                    <div className="relative">
                        <button
                            onClick={() => setModelOpen(!modelOpen)}
                            className="w-full h-11 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 flex items-center justify-between hover:border-zinc-600 transition-colors"
                        >
                            <span className="text-sm font-medium text-zinc-200">{activeModel}</span>
                            <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${modelOpen ? "rotate-180" : ""}`} />
                        </button>

                        {modelOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden z-10 shadow-xl">
                                {models.map((model) => (
                                    <button
                                        key={model.value}
                                        onClick={() => {
                                            setActiveModel(model.value)
                                            setModelOpen(false)
                                        }}
                                        className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${activeModel === model.value
                                            ? "bg-purple-600/20 text-purple-300"
                                            : "text-zinc-300 hover:bg-zinc-700/50"
                                            }`}
                                    >
                                        {model.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Style Selector */}
                <div className="space-y-2">
                    <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Style</label>
                    <div className="relative">
                        <button
                            onClick={() => setStyleOpen(!styleOpen)}
                            className="w-full h-11 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 flex items-center justify-between hover:border-zinc-600 transition-colors"
                        >
                            <span className="text-sm font-medium text-zinc-200">{activeStyle}</span>
                            <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${styleOpen ? "rotate-180" : ""}`} />
                        </button>

                        {styleOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden z-10 shadow-xl">
                                {styles.map((style) => (
                                    <button
                                        key={style.value}
                                        onClick={() => {
                                            setActiveStyle(style.value)
                                            setStyleOpen(false)
                                        }}
                                        className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${activeStyle === style.value
                                            ? "bg-purple-600/20 text-purple-300"
                                            : "text-zinc-300 hover:bg-zinc-700/50"
                                            }`}
                                    >
                                        {style.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-2">
                    <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Aspect Ratio</label>
                    <div className="grid grid-cols-3 gap-2">
                        {ratios.map((r) => (
                            <button
                                key={r.label}
                                onClick={() => setActiveRatio(r.label)}
                                className={`flex flex-col items-center justify-center py-3 rounded-lg border transition-all ${activeRatio === r.label
                                    ? "bg-purple-600/20 border-purple-500/50 text-zinc-100"
                                    : "bg-zinc-800/30 border-zinc-700/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                                    }`}
                            >
                                <div
                                    className={`border-2 rounded-sm mb-1.5 ${activeRatio === r.label ? "border-purple-400" : "border-current"
                                        }`}
                                    style={{ width: r.w * 4, height: r.h * 4 }}
                                />
                                <span className="text-[11px] font-medium">{r.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                    <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Quantity</label>
                    <div className="flex gap-2">
                        {quantities.map((num) => (
                            <button
                                key={num}
                                onClick={() => setActiveQuantity(num)}
                                className={`flex-1 py-2.5 text-sm font-medium rounded-lg border transition-all ${activeQuantity === num
                                    ? "bg-purple-600/20 border-purple-500/50 text-zinc-100"
                                    : "bg-zinc-800/30 border-zinc-700/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reset Button */}
            <div className="p-4 border-t border-zinc-800/50">
                <button
                    onClick={() => {
                        setActiveStyle("Vibrant Anime")
                        setActiveRatio("1:1")
                        setActiveQuantity(1)
                        setActiveModel("Seedream 4.0")
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 rounded-lg transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </button>
            </div>
        </div>
    )
}
