"use client"

import { useState } from "react"
import { ChevronDown, RotateCcw, Sparkles } from "lucide-react"

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

    const models = [
        { value: "Seedream 4.0", label: "Seedream 4.0" },
        { value: "Anime XL", label: "Anime XL" },
        { value: "Realism v5", label: "Realism v5" },
    ]

    // Style presets with their corresponding prompt enhancements
    const stylePrompts: Record<string, string> = {
        "Vibrant V6 Core": "official art, unity 8k wallpaper, ultra detailed, beautiful and aesthetic, masterpiece, best quality, vibrant colors, cinematic lighting",
        "Retro Cel 1990s": "1990s anime style, retro anime, cel shading, screen shot, vhs effect, noise, vintage aesthetic, sailor moon style",
        "Elite Game Splash": "game splash art, genshin impact style, honkai star rail style, super detailed, dynamic pose, elemental effects, character design",
        "Makoto Ethereal": "makoto shinkai style, kimi no na wa style, clouds, blue sky, lens flare, breathtaking scenery, highly detailed",
        "Cyberpunk Trigger": "studio trigger style, cyberpunk edgerunners style, neon lights, chromatic aberration, bold lines, vivid colors",
        "Pastel Luxe Art": "pastel colors, soft lighting, thick coating, painterly, dreamlike, ethereal, illustration, feminine"
    }

    const styles = [
        {
            value: "Vibrant V6 Core",
            label: "Vibrant V6",
            img: "/feature-waifu.webp",
            description: "Official art style with vibrant colors"
        },
        {
            value: "Retro Cel 1990s",
            label: "Retro 90s",
            img: "artStyles/style_retro_cel_90s.webp",
            description: "Classic 90s anime cel-shaded look"
        },
        {
            value: "Elite Game Splash",
            label: "Game Art",
            img: "artStyles/style_game_splash_elite.webp",
            description: "Dynamic game splash art style"
        },
        {
            value: "Makoto Ethereal",
            label: "Makoto",
            img: "/artStyles/style_makoto_scenery.webp",
            description: "Makoto Shinkai's signature style"
        },
        {
            value: "Cyberpunk Trigger",
            label: "Cyberpunk",
            img: "/artStyles/style_cyberpunk_trigger.webp",
            description: "Studio Trigger cyberpunk aesthetic"
        },
        {
            value: "Pastel Luxe Art",
            label: "Pastel",
            img: "/image.jpg",
            description: "Soft pastel dreamlike illustration"
        },
    ]

    const ratios = [
        { label: "2:3", w: 3, h: 4 },
        { label: "1:1", w: 4, h: 4 },
        { label: "16:9", w: 5, h: 3 },
    ]

    const quantities = [1, 2, 3, 4]

    return (
        <div className="w-full h-full flex flex-col bg-[#09090b] text-zinc-200">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-8">

                {/* 1. Model Selector (Dropdown is fine for simple text selection) */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Model</label>
                    <div className="relative">
                        <button
                            onClick={() => setModelOpen(!modelOpen)}
                            className="w-full h-10 bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 flex items-center justify-between hover:border-zinc-600 transition-colors"
                        >
                            <span className="text-sm font-medium">{activeModel}</span>
                            <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${modelOpen ? "rotate-180" : ""}`} />
                        </button>

                        {modelOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden z-20 shadow-xl ring-1 ring-black/20">
                                {models.map((model) => (
                                    <button
                                        key={model.value}
                                        onClick={() => {
                                            setActiveModel(model.value)
                                            setModelOpen(false)
                                        }}
                                        className={`w-full px-3 py-2 text-left text-sm transition-colors ${activeModel === model.value
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

                {/* 2. Style Selector (Visual Grid) */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Style</label>
                        <span className="text-[11px] text-zinc-600">{activeStyle}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                        {styles.map((style) => {
                            const isActive = activeStyle === style.value
                            return (
                                <button
                                    key={style.value}
                                    onClick={() => setActiveStyle(style.value)}
                                    className={`group relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 transition-all duration-200 ${isActive
                                        ? "border-purple-500 shadow-[0_0_0_2px_rgba(168,85,247,0.2)]"
                                        : "border-transparent hover:border-zinc-600"
                                        }`}
                                >
                                    {/* Image with Zoom Effect */}
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img
                                            src={style.img}
                                            alt={style.label}
                                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                        />
                                        {/* Overlay Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-80' : 'opacity-60 group-hover:opacity-40'}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute inset-x-0 bottom-0 p-2 text-left">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`text-xs font-medium truncate ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                                                }`}>
                                                {style.label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Active Indicator (Optional dot) */}
                                    {isActive && (
                                        <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* 3. Aspect Ratio */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Aspect Ratio</label>
                    <div className="grid grid-cols-3 gap-2">
                        {ratios.map((r) => (
                            <button
                                key={r.label}
                                onClick={() => setActiveRatio(r.label)}
                                className={`group flex flex-col items-center justify-center py-3 rounded-lg border transition-all ${activeRatio === r.label
                                    ? "bg-zinc-800 border-purple-500/50 text-zinc-100 shadow-sm"
                                    : "bg-zinc-800/30 border-zinc-700/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/50"
                                    }`}
                            >
                                <div
                                    className={`border-2 rounded-[2px] mb-2 transition-colors ${activeRatio === r.label ? "border-purple-400 bg-purple-400/10" : "border-zinc-600 group-hover:border-zinc-500"
                                        }`}
                                    style={{ width: r.w * 4, height: r.h * 4 }}
                                />
                                <span className="text-[10px] font-medium">{r.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. Quantity */}
                <div className="space-y-3">
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Image Count</label>
                    <div className="bg-zinc-800/50 p-1 rounded-lg flex border border-zinc-700/50">
                        {quantities.map((num) => (
                            <button
                                key={num}
                                onClick={() => setActiveQuantity(num)}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${activeQuantity === num
                                    ? "bg-zinc-700 text-white shadow-sm ring-1 ring-white/10"
                                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700/30"
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reset Button */}
            <div className="p-4 border-t border-zinc-800 bg-[#09090b]">
                <button
                    onClick={() => {
                        setActiveStyle("Vibrant V6 Core")
                        setActiveRatio("1:1")
                        setActiveQuantity(1)
                        setActiveModel("Seedream 4.0")
                    }}
                    className="group w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-all"
                >
                    <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-180" />
                    Reset to Default
                </button>
            </div>
        </div>
    )
}