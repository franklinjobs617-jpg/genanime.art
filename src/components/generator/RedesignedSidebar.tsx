"use client";

import { useState, useEffect, useMemo, memo } from "react";
import {
  ChevronDown,
  RotateCcw,
  Sparkles,
  Zap,
  X,
  Search,
  Settings2,
  Maximize2,
  ImagePlus,
  Type,
  Wand2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { createPortal } from "react-dom";

// --- Types ---
type GenerationMode = "text-to-image" | "image-to-prompt" | "image-to-image";
type PresetMode = "free" | "ghibli" | "avatar";

// Memoized Style Card Component (For Modal)
const StyleGridItem = memo(({ 
  style, 
  isActive, 
  onSelect 
}: { 
  style: any, 
  isActive: boolean, 
  onSelect: (val: string) => void 
}) => {
  return (
    <button 
      onClick={() => onSelect(style.value)}
      className={`
        group relative text-left flex flex-col gap-3 transition-all duration-300
        ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}
      `}
    >
       <div className={`
         relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-300 shadow-lg will-change-transform
         ${isActive 
           ? "ring-2 ring-indigo-500 ring-offset-4 ring-offset-[#09090b] shadow-indigo-500/20 scale-[1.02]" 
           : "hover:ring-2 hover:ring-white/20 hover:scale-[1.02]"}
       `}>
          <img 
            src={style.img} 
            alt={style.label} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Selection Checkmark */}
          {isActive && (
            <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}
       </div>

       <div>
         <h4 className={`text-sm font-bold truncate transition-colors ${isActive ? "text-indigo-400" : "text-zinc-300 group-hover:text-white"}`}>
           {style.label}
         </h4>
         <p className="text-xs text-zinc-500 line-clamp-2 mt-0.5 leading-relaxed group-hover:text-zinc-400">
           {style.desc}
         </p>
       </div>
    </button>
  );
});
StyleGridItem.displayName = "StyleGridItem";

// Memoized Modal Component to prevent re-renders and optimize animation
const StyleLibraryModal = memo(({
  isOpen,
  onClose,
  activeCategory,
  setActiveCategory,
  filteredStyles,
  activeStyle,
  setActiveStyle
}: {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  setActiveCategory: (cat: any) => void;
  filteredStyles: any[];
  activeStyle: string;
  setActiveStyle: (val: string) => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Optimized Backdrop: Removed blur for performance, increased opacity for focus */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.2 }}
            onClick={onClose} 
            className="absolute inset-0 bg-black/80" 
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-7xl h-[85vh] bg-[#09090b] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden will-change-transform"
          >
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-[#09090b] shrink-0">
               <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    Style Library
                  </h2>
                  <p className="text-sm text-zinc-500 mt-1">Select a visual direction for your generation.</p>
               </div>
               <button 
                 onClick={onClose} 
                 className="p-2 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>
            
            {/* Modal Body */}
            <div className="flex flex-1 overflow-hidden">
               {/* Sidebar Categories */}
               <div className="w-64 bg-zinc-900/30 border-r border-white/5 p-4 space-y-1 overflow-y-auto custom-scrollbar hidden md:block shrink-0">
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-4 mb-4 mt-2">Categories</div>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)}
                      className={`
                        w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between group
                        ${activeCategory === cat 
                          ? "bg-white text-black shadow-lg shadow-white/10" 
                          : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"}
                      `}
                    >
                      {cat}
                      {activeCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                    </button>
                  ))}
               </div>

               {/* Grid */}
               <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#09090b]">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                     {filteredStyles.map(style => (
                       <StyleGridItem 
                         key={style.value}
                         style={style}
                         isActive={activeStyle === style.value}
                         onSelect={(val) => {
                           setActiveStyle(val);
                           onClose();
                         }}
                       />
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});
StyleLibraryModal.displayName = "StyleLibraryModal";

// Memoized Portal Preview Component
const StylePreviewTooltip = memo(({ style }: { style: any }) => {
  if (!style) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed left-[340px] top-[180px] z-[9999] w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#09090b] pointer-events-none"
    >
      <img
        src={style.img}
        alt={style.label}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
        <h3 className="text-white font-bold text-xl leading-tight mb-1">{style.label}</h3>
        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">{style.desc}</p>
      </div>
    </motion.div>,
    document.body
  );
});
StylePreviewTooltip.displayName = "StylePreviewTooltip";

interface SidebarProps {
  activeStyle: string;
  setActiveStyle: (val: string) => void;
  activeRatio: string;
  setActiveRatio: (val: string) => void;
  activeQuantity: number;
  setActiveQuantity: (val: number) => void;
  activeModel: string;
  setActiveModel: (val: string) => void;
  cfgScale: number;
  setCfgScale: (val: number) => void;
  steps: number;
  setSteps: (val: number) => void;
  seed: number | null;
  setSeed: (val: number | null) => void;
  isRandomSeed: boolean;
  setIsRandomSeed: (val: boolean) => void;
  generationMode: GenerationMode;
  setGenerationMode: (mode: GenerationMode) => void;
  activePreset?: PresetMode;
  setActivePreset?: (preset: PresetMode) => void;
}

// --- Static Data ---
export const STYLES = [
  { 
    value: "Default", 
    label: "No Style", 
    img: "/gallery/anime_zen_solitude.webp", 
    category: "All", 
    desc: "Raw model output",
    prompt: "" 
  },
  { 
    value: "Vibrant Anime", 
    label: "Vibrant V6", 
    img: "/gallery/feature-waifu.webp", 
    category: "Anime", 
    desc: "High saturation, clean lines",
    prompt: "vibrant colors, anime style, high contrast, cel shaded, clean lines, vivid palette" 
  },
  { 
    value: "Makoto Ethereal", 
    label: "Ghibli", 
    img: "/gallery/style_makoto_scenery.webp", 
    category: "Anime", 
    desc: "Lush backgrounds, emotional",
    prompt: "makoto shinkai style, studio ghibli inspired, ethereal lighting, lush backgrounds, highly detailed clouds, emotional atmosphere, scenic, anime scenery" 
  },
  { 
    value: "Retro 90s", 
    label: "Retro 90s", 
    img: "/artStyles/style_retro_cel_90s.webp", 
    category: "Anime", 
    desc: "Cel shading, vintage",
    prompt: "90s anime style, retro aesthetic, cel animation, vintage finish, lo-fi, vhs effect, classic anime" 
  },
  { 
    value: "Elite Game Splash", 
    label: "Game Art", 
    img: "/artStyles/style_game_splash_elite.webp", 
    category: "3D", 
    desc: "Detailed splash art",
    prompt: "game splash art, riot games style, dynamic pose, detailed background, rim lighting, cinematic composition, highly detailed, 8k" 
  },
  { 
    value: "Sketch Black White", 
    label: "Sketch", 
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop", 
    category: "Anime", 
    desc: "Monochrome pencil",
    prompt: "monochrome, sketch, pencil drawing, rough lines, charcoal style, artistic, hand drawn texture" 
  },
  { 
    value: "Realism", 
    label: "Realism", 
    img: "/gallery/Realism.webp", 
    category: "Realistic", 
    desc: "Photorealistic 8k",
    prompt: "photorealistic, 8k, raw photo, hyperrealistic, dslr, ray tracing, cinematic lighting, realistic texture, photography" 
  },
  { 
    value: "Avatar Portrait", 
    label: "Avatar", 
    img: "/gallery/Avatar.webp", 
    category: "Realistic", 
    desc: "Perfect for PFPs",
    prompt: "avatar style, headshot, centered, detailed face, perfect lighting, profile picture composition, bokeh background, expressive" 
  }
];

export const QUALITY_PROMPT = "masterpiece, best quality, ultra detailed, 8k resolution, cinematic lighting, sharp focus, perfect composition, high fidelity";

const MODELS = [
  { value: "Seedream 4.0", label: "Seedream 4.0", desc: "General Purpose" },
  { value: "Pony-Diffusion-V6", label: "Pony Diffusion V6", desc: "Best for anime logic" },
  { value: "Animagine-XL-3.1", label: "Animagine XL 3.1", desc: "Character fidelity" },
  { value: "Niji-Journey-V6", label: "Niji Journey V6", desc: "Artistic aesthetics" },
  { value: "Flux.1-Dev", label: "Flux.1 Dev", desc: "State-of-the-art detail" },
  { value: "Flux.1-Schnell", label: "Flux.1 Schnell", desc: "Turbo speed" },
];

const RATIOS = [
  { label: "1:1", w: 1, h: 1 },
  { label: "2:3", w: 2, h: 3 },
  { label: "3:4", w: 3, h: 4 },
  { label: "16:9", w: 16, h: 9 },
  { label: "9:16", w: 9, h: 16 },
];

const QUANTITIES = [1, 2, 3, 4];
const CATEGORIES = ["All", "Anime", "Realistic", "3D"] as const;

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
  activePreset,
  setActivePreset,
}: SidebarProps) {
  const t = useTranslations("Generator");
  
  // UI States
  const [modelOpen, setModelOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [styleModalOpen, setStyleModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("All");
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const currentStyleObj = useMemo(() => STYLES.find((s) => s.value === activeStyle) || STYLES[0], [activeStyle]);
  const hoveredStyleObj = useMemo(() => STYLES.find((s) => s.value === hoveredStyle), [hoveredStyle]);
  const filteredStyles = useMemo(() => activeCategory === "All" ? STYLES : STYLES.filter((s) => s.category === activeCategory || s.value === "Default"), [activeCategory]);

  useEffect(() => {
    if (activeStyle === "Makoto Ethereal") setActiveRatio("16:9");
    else if (activeStyle === "Avatar Portrait") setActiveRatio("1:1");
  }, [activeStyle, setActiveRatio]);

  const handleModeSelect = (mode: PresetMode) => {
    setActivePreset?.(mode);
    if (mode === "free") { setActiveStyle("Default"); setGenerationMode("text-to-image"); }
    else if (mode === "ghibli") { setActiveStyle("Makoto Ethereal"); setGenerationMode("text-to-image"); }
    else if (mode === "avatar") { setActiveStyle("Avatar Portrait"); setGenerationMode("image-to-image"); }
  };

  const handleReset = () => {
    setActiveStyle("Default");
    setActiveRatio("1:1");
    setActiveQuantity(1);
    setActiveModel("Seedream 4.0");
    setCfgScale(7.0);
    setSteps(30);
    setIsRandomSeed(true);
    setSeed(null);
    setGenerationMode("text-to-image");
    setActivePreset?.("free");
  };

  return (
    <div className="w-[320px] h-full flex flex-col bg-zinc-900/50 backdrop-blur-md text-zinc-400 border-r border-white/10 font-sans select-none">
      
      {/* --- Top: Input Method Tabs --- */}
      <div className="flex items-center px-4 pt-4 pb-2 border-b border-white/5 bg-transparent">
        {[
          { id: "text-to-image", label: "Text" },
          { id: "image-to-image", label: "Image" },
          { id: "image-to-prompt", label: "Analyze" },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setGenerationMode(mode.id as GenerationMode)}
            className={`
              relative flex-1 py-2 text-sm font-semibold tracking-wide transition-all duration-200
              ${generationMode === mode.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"}
            `}
          >
            {mode.label}
            {generationMode === mode.id && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-[-9px] left-0 right-0 h-[1px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="p-5 space-y-6">

          {/* --- Section: Quick Presets (Chips) --- */}
          {generationMode !== "image-to-prompt" && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Preset</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "free", label: "Creative" },
                  { id: "ghibli", label: "Anime" },
                  { id: "avatar", label: "Avatar" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleModeSelect(m.id as PresetMode)}
                    className={`
                      py-2 px-2 rounded-lg text-xs font-medium transition-all duration-200 border
                      ${activePreset === m.id
                        ? "bg-zinc-800 text-white border-zinc-700 shadow-sm"
                        : "bg-transparent text-zinc-500 border-transparent hover:bg-white/5 hover:text-zinc-300"
                      }
                    `}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- Section: Art Style (Refactored) --- */}
          {generationMode !== "image-to-prompt" && (
            <div className="space-y-4 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between mb-1 px-1">
                 <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Style</span>
                 <button 
                   onClick={() => setStyleModalOpen(true)}
                   className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                 >
                   View All <ChevronDown className="w-3 h-3 -rotate-90" />
                 </button>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar mask-gradient-right">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap border shrink-0
                      ${activeCategory === cat 
                        ? "bg-white text-black border-white shadow-lg shadow-white/10" 
                        : "bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700 hover:bg-white/5"}
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Style Grid - Refactored Card Style */}
              <div className="grid grid-cols-3 gap-x-3 gap-y-4">
                 {filteredStyles.map((style) => (
                   <button
                     key={style.value}
                     onClick={() => setActiveStyle(style.value)}
                     onMouseEnter={() => setHoveredStyle(style.value)}
                     onMouseLeave={() => setHoveredStyle(null)}
                     className="group relative flex flex-col items-center gap-2 outline-none"
                   >
                      <div className={`
                        relative w-full aspect-square rounded-xl overflow-hidden transition-all duration-200
                        ${activeStyle === style.value 
                          ? "ring-2 ring-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.4)] scale-105" 
                          : "border border-white/10 group-hover:border-indigo-500/50 group-hover:scale-105"}
                      `}>
                         <img 
                           src={style.img} 
                           alt={style.label} 
                           loading="lazy"
                           className="w-full h-full object-cover transition-transform duration-500" 
                         />
                         
                         {/* Selection Indicator - Green Check */}
                         <AnimatePresence>
                           {activeStyle === style.value && (
                             <motion.div
                               initial={{ scale: 0, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               exit={{ scale: 0, opacity: 0 }}
                               className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm border border-white/20 z-10"
                             >
                               <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                 <polyline points="20 6 9 17 4 12" />
                               </svg>
                             </motion.div>
                           )}
                         </AnimatePresence>

                         {/* Hover Overlay */}
                         <div className={`absolute inset-0 bg-black/20 transition-opacity duration-200 ${activeStyle === style.value ? "opacity-0" : "opacity-0 group-hover:opacity-100"}`} />
                      </div>
                      
                      <span className={`text-[10px] font-medium truncate w-full text-center transition-colors ${activeStyle === style.value ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                        {style.label}
                      </span>
                   </button>
                 ))}
              </div>
            </div>
          )}

      {/* --- Hover Preview Tooltip --- */}
      <AnimatePresence>
        {hoveredStyleObj && (
          <StylePreviewTooltip key="preview-tooltip" style={hoveredStyleObj} />
        )}
      </AnimatePresence>

          {/* --- Section: Dimensions (Tag-like Style) --- */}
          {generationMode !== "image-to-prompt" && (
            <div className="space-y-4 pt-6 border-t border-white/5">
               <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Ratio</span>
               <div className="flex flex-wrap gap-2">
                  {RATIOS.map((r) => {
                    const isActive = activeRatio === r.label;
                    return (
                      <button
                        key={r.label}
                        onClick={() => setActiveRatio(r.label)}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-200
                          ${isActive 
                            ? "bg-zinc-800 text-white border-zinc-600 shadow-sm" 
                            : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:bg-white/5 hover:text-zinc-200 hover:border-zinc-700"
                          }
                        `}
                      >
                         <div 
                           className={`border transition-all duration-200 ${isActive ? "border-white" : "border-zinc-500"}`}
                           style={{ 
                             width: r.w > r.h ? '12px' : `${12 * (r.w/r.h)}px`, 
                             height: r.h > r.w ? '12px' : `${12 * (r.h/r.w)}px` 
                           }}
                         />
                         {r.label}
                      </button>
                    );
                  })}
               </div>
            </div>
          )}

          {/* --- Section: Model (Tag-like Style) --- */}
          {generationMode !== "image-to-prompt" && (
            <div className="space-y-4 pt-6 border-t border-white/5">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Model</span>
              <div className="relative">
                <button
                  onClick={() => setModelOpen(!modelOpen)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 group
                    bg-zinc-900/50 border-zinc-800 hover:bg-white/5 hover:border-zinc-700 text-zinc-300 hover:text-white
                  `}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                    <span>{MODELS.find(m => m.value === activeModel)?.label}</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-transform duration-200 ${modelOpen ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {modelOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-[#0c0c0e] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl ring-1 ring-black/50"
                    >
                      <div className="max-h-[240px] overflow-y-auto custom-scrollbar p-1.5">
                        {MODELS.map((model) => (
                          <button
                            key={model.value}
                            onClick={() => { setActiveModel(model.value); setModelOpen(false); }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
                              activeModel === model.value 
                                ? "bg-zinc-800 text-white" 
                                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                            }`}
                          >
                            <span>{model.label}</span>
                            {activeModel === model.value && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* --- Section: Advanced (Clean Accordion) --- */}
          <div className="pt-6 border-t border-white/5">
            <button
              onClick={() => setAdvancedOpen(!advancedOpen)}
              className="w-full flex items-center justify-between text-zinc-500 hover:text-zinc-300 transition-all duration-200 py-2 px-1 group"
            >
              <span className="text-xs font-bold uppercase tracking-widest group-hover:text-zinc-200">Advanced</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${advancedOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {advancedOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 space-y-8 pb-2 px-1">
                    {/* Quantity */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-zinc-500 uppercase tracking-wider font-bold">
                        <span>Count</span>
                        <span className="text-zinc-300">{activeQuantity}</span>
                      </div>
                      <div className="flex gap-1.5 bg-zinc-900/50 p-1 rounded-lg border border-white/5">
                         {QUANTITIES.map(q => (
                           <button 
                             key={q} 
                             onClick={() => setActiveQuantity(q)}
                             className={`h-6 flex-1 rounded-md text-xs font-bold transition-all duration-200 ${activeQuantity === q ? "bg-zinc-700 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-400 hover:bg-white/5"}`}
                           >
                             {q}
                           </button>
                         ))}
                      </div>
                    </div>

                    {/* CFG & Steps */}
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs text-zinc-500 uppercase tracking-wider font-bold">
                          <span>Guidance Scale</span>
                          <span className="text-zinc-300 font-mono">{cfgScale}</span>
                        </div>
                        <input type="range" min="1" max="20" step="0.5" value={cfgScale} onChange={(e) => setCfgScale(Number(e.target.value))} className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs text-zinc-500 uppercase tracking-wider font-bold">
                          <span>Steps</span>
                          <span className="text-zinc-300 font-mono">{steps}</span>
                        </div>
                        <input type="range" min="10" max="50" step="1" value={steps} onChange={(e) => setSteps(Number(e.target.value))} className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all" />
                      </div>
                    </div>

                    {/* Seed */}
                    <div className="space-y-3">
                       <div className="flex items-center justify-between">
                          <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Seed</span>
                          <button 
                            onClick={() => setIsRandomSeed(!isRandomSeed)}
                            className={`text-xs font-bold transition-colors ${isRandomSeed ? "text-indigo-400" : "text-zinc-500 hover:text-zinc-300"}`}
                          >
                            {isRandomSeed ? "Randomized" : "Fixed"}
                          </button>
                       </div>
                       <div className={`relative flex items-center bg-zinc-900/50 border rounded-xl transition-all duration-200 ${isRandomSeed ? "border-zinc-800 opacity-50" : "border-zinc-700 hover:border-zinc-600"}`}>
                          <input 
                             type="number" 
                             disabled={isRandomSeed}
                             value={seed || ""} 
                             onChange={(e) => setSeed(Number(e.target.value))}
                             className="w-full bg-transparent border-none py-2.5 px-3 text-sm text-zinc-300 font-mono focus:ring-0 placeholder:text-zinc-700 disabled:cursor-not-allowed"
                             placeholder="Random Seed"
                          />
                          <div className="pr-2">
                            <button 
                              onClick={() => setIsRandomSeed(!isRandomSeed)}
                              className={`w-8 h-4 rounded-full relative transition-colors ${isRandomSeed ? "bg-indigo-500/20" : "bg-zinc-700"}`}
                            >
                               <div className={`absolute top-0.5 w-3 h-3 rounded-full shadow-sm transition-all duration-200 ${isRandomSeed ? "left-4.5 bg-indigo-400" : "left-0.5 bg-zinc-400"}`} />
                            </button>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* --- Footer --- */}
      <div className="p-4 border-t border-white/5 bg-transparent">
        <button
          onClick={handleReset}
          className="w-full py-3 rounded-xl border border-zinc-800 text-xs font-bold text-zinc-500 uppercase tracking-widest hover:text-zinc-300 hover:border-zinc-700 hover:bg-white/5 transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-180 transition-transform duration-500" />
          Reset Settings
        </button>
      </div>

      {mounted && typeof document !== "undefined" && createPortal(
        <StyleLibraryModal
          isOpen={styleModalOpen}
          onClose={() => setStyleModalOpen(false)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filteredStyles={filteredStyles}
          activeStyle={activeStyle}
          setActiveStyle={setActiveStyle}
        />,
        document.body
      )}
    </div>
  );
}
