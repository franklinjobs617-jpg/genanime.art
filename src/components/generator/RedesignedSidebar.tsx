"use client"

import { useState } from "react"
import { ChevronDown, RotateCcw, Sparkles, Sliders, Dna, Layers, Zap, Image as ImageIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
    activeStyle: string
    setActiveStyle: (val: string) => void
    activeRatio: string
    setActiveRatio: (val: string) => void
    activeQuantity: number
    setActiveQuantity: (val: number) => void
    activeModel: string
    setActiveModel: (val: string) => void
    // Advanced Settings
    cfgScale: number
    setCfgScale: (val: number) => void
    steps: number
    setSteps: (val: number) => void
    seed: number | null
    setSeed: (val: number | null) => void
    isRandomSeed: boolean
    setIsRandomSeed: (val: boolean) => void
    generationMode: 'text-to-image' | 'image-to-prompt'
    setGenerationMode: (mode: 'text-to-image' | 'image-to-prompt') => void
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
    cfgScale,
    setCfgScale,
    steps,
    setSteps,
    seed,
    setSeed,
    isRandomSeed,
    setIsRandomSeed,
    generationMode,
    setGenerationMode,
}: SidebarProps) {
    const [modelOpen, setModelOpen] = useState(false)
    const [advancedOpen, setAdvancedOpen] = useState(false)

    const models = [
        { value: "Seedream 4.0", label: "Seedream 4.0", desc: "Best for anime portraits" },
        { value: "Anime XL", label: "Anime XL", desc: "High details & backgrounds" },
        { value: "Realism v5", label: "Realism v5", desc: "Photorealistic style" },
    ]

    const styles = [
        {
            value: "Default",
            label: "Free Style",
            img: "/gallery/anime_zen_solitude.webp", // Use a generic beautiful image
        },
        {
            value: "Realism",
            label: "Realism",
            img: "/gallery/anime_cyber_noir.webp",
        },
        {
            value: "Vibrant Anime",
            label: "Vibrant V6",
            img: "/feature-waifu.webp",
        },
        {
            value: "Retro 90s",
            label: "Retro 90s",
            img: "/artStyles/style_retro_cel_90s.webp",
        },
        {
            value: "Elite Game Splash",
            label: "Game Art",
            img: "/artStyles/style_game_splash_elite.webp",
        },
        {
            value: "Makoto Ethereal",
            label: "Makoto",
            img: "/artStyles/style_makoto_scenery.webp",
        },
        {
            value: "Cyberpunk Trigger",
            label: "Cyberpunk",
            img: "/artStyles/style_cyberpunk_trigger.webp",
        },
        {
            value: "Pastel Luxe Art",
            label: "Pastel",
            img: "/image.jpg",
        },
    ]

    const ratios = [
        { label: "2:3", w: 3, h: 4 },
        { label: "1:1", w: 4, h: 4 },
        { label: "16:9", w: 5, h: 3 },
    ]

    const quantities = [1, 2, 3, 4]

    return (
        <div className="w-full h-full flex flex-col bg-[#09090b] text-zinc-200 border-r border-white/5">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-8">
                {/* 0. Creation Mode Selector */}
                <div className="space-y-4">
                    <label className="flex items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <Layers className="w-3 h-3 mr-2 text-indigo-400" />
                        Generation Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-white/[0.02] border border-white/5 rounded-xl">
                        <button
                            onClick={() => setGenerationMode('text-to-image')}
                            className={`flex items-center justify-center gap-2 py-2 text-[11px] font-bold rounded-lg transition-all ${generationMode === 'text-to-image'
                                ? "bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/20 shadow-sm"
                                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                                }`}
                        >
                            <Sparkles className="w-3 h-3" />
                            Text - Image
                        </button>
                        <button
                            onClick={() => setGenerationMode('image-to-prompt')}
                            className={`flex items-center justify-center gap-2 py-2 text-[11px] font-bold rounded-lg transition-all ${generationMode === 'image-to-prompt'
                                ? "bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/20 shadow-sm"
                                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                                }`}
                        >
                            <ImageIcon className="w-3 h-3" />
                            <span>Image - Prompt</span>
                        </button>
                    </div>
                </div>

                {/* 1. Model Selector */}
                <div className="space-y-4">
                    <label className="flex items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <Zap className="w-3 h-3 mr-2 text-indigo-400" />
                        Base Model
                    </label>
                    <div className="relative">
                        <button
                            onClick={() => setModelOpen(!modelOpen)}
                            className="w-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-xl p-3 flex items-center justify-between transition-all duration-300 group"
                        >
                            <div className="flex flex-col items-start gap-0.5">
                                <span className="text-sm font-medium text-zinc-100 group-hover:text-white transition-colors">{activeModel}</span>
                                <span className="text-[10px] text-zinc-500">
                                    {models.find(m => m.value === activeModel)?.desc}
                                </span>
                            </div>
                            <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-300 ${modelOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {modelOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-[#121214]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-20 shadow-2xl ring-1 ring-black/50"
                                >
                                    {models.map((model) => (
                                        <button
                                            key={model.value}
                                            onClick={() => {
                                                setActiveModel(model.value)
                                                setModelOpen(false)
                                            }}
                                            className={`w-full px-4 py-3 text-left transition-all duration-200 flex flex-col gap-0.5 ${activeModel === model.value
                                                ? "bg-indigo-500/10 text-indigo-300"
                                                : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                                                }`}
                                        >
                                            <span className="text-xs font-medium">{model.label}</span>
                                            <span className="text-[10px] opacity-60">{model.desc}</span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* 2. Style Selector */}
                {generationMode === 'text-to-image' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                <Sparkles className="w-3 h-3 mr-2 text-pink-400" />
                                Art Style
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {styles.map((style) => {
                                const isActive = activeStyle === style.value
                                return (
                                    <button
                                        key={style.value}
                                        onClick={() => setActiveStyle(style.value)}
                                        className={`group relative aspect-[1.3] w-full overflow-hidden rounded-xl border transition-all duration-300 ${isActive
                                            ? "border-purple-500/50 shadow-[0_0_15px_-5px_rgba(168,85,247,0.3)]"
                                            : "border-white/5 hover:border-white/10"
                                            }`}
                                    >
                                        <div className="absolute inset-0 bg-zinc-800">
                                            <img
                                                src={style.img}
                                                alt={style.label}
                                                className={`h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-110 ${isActive ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'}`}
                                            />
                                            {/* Subtle gradient only at bottom for text readability */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-80" />

                                            {/* Active State Overlay (border glow internal) */}
                                            {isActive && <div className="absolute inset-0 ring-1 ring-inset ring-white/20" />}
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-2 text-center z-10">
                                            <span className={`text-[10px] font-bold tracking-wide shadow-black/50 drop-shadow-md ${isActive ? 'text-white' : 'text-zinc-200 group-hover:text-white'}`}>
                                                {style.label}
                                            </span>
                                        </div>

                                        {/* Active Indicator Dot */}
                                        {isActive && (
                                            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </motion.div>
                )}

                {/* 3. Settings Grid (Ratio & Quantity) */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Aspect Ratio */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Aspect Ratio</label>
                        <div className="grid grid-cols-3 gap-2">
                            {ratios.map((r) => (
                                <button
                                    key={r.label}
                                    onClick={() => setActiveRatio(r.label)}
                                    className={`relative flex flex-col items-center justify-center py-2.5 rounded-lg border transition-all ${activeRatio === r.label
                                        ? "bg-zinc-800/80 border-purple-500/50 text-white shadow-inner"
                                        : "bg-zinc-800/20 border-white/5 text-zinc-500 hover:bg-zinc-800/50 hover:border-white/10"
                                        }`}
                                >
                                    <div
                                        className={`border rounded-[2px] mb-1.5 transition-all ${activeRatio === r.label ? "border-purple-400 bg-purple-400/20" : "border-zinc-600"
                                            }`}
                                        style={{ width: r.w * 3.5, height: r.h * 3.5 }}
                                    />
                                    <span className="text-[9px] font-medium">{r.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Image Quantity */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Batch Size</label>
                        <div className="bg-zinc-800/30 p-1 rounded-lg flex border border-white/5 relative">
                            {/* Sliding background could be added here for polish */}
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

                {/* 4. Advanced Settings (Collapsible) */}
                <div className="pt-2 border-t border-white/5">
                    <button
                        onClick={() => setAdvancedOpen(!advancedOpen)}
                        className="w-full flex items-center justify-between py-2 text-zinc-400 hover:text-white transition-colors group"
                    >
                        <div className="flex items-center gap-2">
                            <Sliders className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Advanced Settings</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${advancedOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                        {advancedOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 pb-2 space-y-6">
                                    {/* CFG Scale */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-zinc-400 font-medium">Guidance Scale</span>
                                            <span className="bg-white/5 px-2 py-0.5 rounded text-zinc-300 tabular-nums">{cfgScale}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1" max="20" step="0.5"
                                            value={cfgScale}
                                            onChange={(e) => setCfgScale(Number(e.target.value))}
                                            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
                                        />
                                        <p className="text-[10px] text-zinc-600">How closely AI follows your prompt</p>
                                    </div>

                                    {/* Steps */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-zinc-400 font-medium">Inference Steps</span>
                                            <span className="bg-white/5 px-2 py-0.5 rounded text-zinc-300 tabular-nums">{steps}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="10" max="50" step="1"
                                            value={steps}
                                            onChange={(e) => setSteps(Number(e.target.value))}
                                            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
                                        />
                                        <p className="text-[10px] text-zinc-600">Higher steps = more detail but slower</p>
                                    </div>

                                    {/* Seed */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-xs">
                                            <div className="flex items-center gap-2 text-zinc-400 font-medium">
                                                <Dna className="w-3.5 h-3.5" />
                                                Seed
                                            </div>
                                            <button
                                                onClick={() => setIsRandomSeed(!isRandomSeed)}
                                                className={`text-[10px] px-2 py-0.5 rounded border transition-all ${isRandomSeed
                                                    ? "bg-green-500/10 border-green-500/50 text-green-400"
                                                    : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`
                                                }
                                            >
                                                {isRandomSeed ? "Randomized" : "Fixed"}
                                            </button>
                                        </div>

                                        {!isRandomSeed && (
                                            <motion.input
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                type="number"
                                                placeholder="Enter seed number..."
                                                value={seed || ""}
                                                onChange={(e) => setSeed(e.target.value ? Number(e.target.value) : null)}
                                                className="w-full bg-zinc-800/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                                            />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            {/* Reset Footer */}
            <div className="p-4 border-t border-white/5">
                <button
                    onClick={() => {
                        setActiveStyle("Vibrant V6 Core")
                        setActiveRatio("1:1")
                        setActiveQuantity(1)
                        setActiveModel("Seedream 4.0")
                        // Reset advanced
                        setCfgScale(7.0)
                        setSteps(30)
                        setIsRandomSeed(true)
                        setSeed(null)
                    }}
                    className="group w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 rounded-xl transition-all"
                >
                    <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover:-rotate-180" />
                    Reset Defaults
                </button>
            </div>
        </div>
    )
}