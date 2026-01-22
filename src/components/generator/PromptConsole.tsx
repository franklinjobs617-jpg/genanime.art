"use client";
import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Sliders, Plus, MinusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUploadSection from "./ImageUploadSection";

interface PromptConsoleProps {
  activePrompt: string;
  setActivePrompt: (val: string) => void;
  negativePrompt: string;
  setNegativePrompt: (val: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  canGenerate: boolean;
  isGuest: boolean;
  guestGenerations: number;
  guestLimit: number;
  image: File | null;
  setImage: (file: File | null) => void;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
  mode: "text-to-image" | "image-to-prompt" | "image-to-image";
  preset?: "free" | "ghibli" | "avatar";
  imageStrength: number;
  setImageStrength: (val: number) => void;
}

const QUICK_TAGS = [
  "Masterpiece",
  "Best Quality",
  "8k Resolution",
  "Ultra Detailed",
  "Cinematic Lighting",
  "Trending on ArtStation"
];

const NEGATIVE_PRESETS = [
  { label: "Universal Bad Quality", value: "low quality, worst quality, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, jpeg artifacts, signature, watermark, username, blurry" },
  { label: "NSFW", value: "nsfw, nude, naked, uncensored" },
  { label: "Blurry", value: "blurry, out of focus, depth of field" }
];

export default function PromptConsole({
  activePrompt,
  setActivePrompt,
  negativePrompt,
  setNegativePrompt,
  isGenerating,
  onGenerate,
  canGenerate,
  isGuest,
  guestGenerations,
  guestLimit,
  image,
  setImage,
  imagePreview,
  setImagePreview,
  mode,
  preset = "free",
  imageStrength,
  setImageStrength,
}: PromptConsoleProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [activePrompt]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSettings &&
        settingsRef.current &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings]);

  const handleAddTag = (tag: string) => {
    if (activePrompt.includes(tag)) return;
    const separator = activePrompt.trim().length > 0 && !activePrompt.trim().endsWith(",") ? ", " : "";
    setActivePrompt(activePrompt + separator + tag);
    setIsFocused(true);
    textareaRef.current?.focus();
  };

  const handleAddNegative = (val: string) => {
    if (negativePrompt.includes(val)) return;
    const separator = negativePrompt.trim().length > 0 && !negativePrompt.trim().endsWith(",") ? ", " : "";
    setNegativePrompt(negativePrompt + separator + val);
  };

  const hasContent = activePrompt.trim().length > 0;
  const shouldShowUpload = mode === "image-to-image" || preset === "avatar";
  const promptPlaceholder = shouldShowUpload
    ? preset === "avatar"
      ? "Describe the avatar look (optional)…"
      : "Describe how you want to remix (optional)…"
    : "Describe your imagination… (e.g. A cyberpunk samurai in neon rain)";
  const promptMax = 4000;

  return (
    <div className="w-full flex flex-col gap-4 relative z-20 max-w-9xl mx-auto">
      <motion.div
        ref={containerRef}
        layout
        className={`
            relative flex flex-col w-full rounded-xl isolate transition-all duration-300
            bg-zinc-900/60 backdrop-blur-md border
            ${isFocused || hasContent 
                ? "border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/30" 
                : "border-zinc-800 hover:border-zinc-700"}
        `}
      >
        <div className="relative z-30 flex flex-col p-1">
          
          <div className="relative px-4 pt-4 pb-2">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-indigo-400" /> Prompt
              </div>
              <div className="text-[10px] font-mono text-zinc-600 tabular-nums">
                {Math.min(activePrompt.length, promptMax)}/{promptMax}
              </div>
            </div>
            <textarea
              ref={textareaRef}
              value={activePrompt}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setActivePrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onGenerate();
                }
              }}
              placeholder={promptPlaceholder}
              maxLength={promptMax}
              className="
                  w-full bg-transparent border-none outline-none ring-0
                  text-[15px] text-zinc-100 placeholder-zinc-600
                  min-h-[60px] resize-none
                  font-normal leading-relaxed tracking-normal
                  selection:bg-indigo-500/30 selection:text-indigo-200
              "
              rows={1}
            />
          </div>

          {/* Quick Tags Section */}
          <div className="px-4 pb-3 flex flex-wrap gap-2">
             {QUICK_TAGS.map((tag) => (
                <button
                   key={tag}
                   onClick={() => handleAddTag(tag)}
                   className="flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-800/50 border border-zinc-700/50 text-[10px] font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600 transition-all active:scale-95"
                >
                   <Plus className="w-2.5 h-2.5" />
                   {tag}
                </button>
             ))}
          </div>

          <AnimatePresence>
            {shouldShowUpload && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden px-3 mb-2"
              >
                 <ImageUploadSection
                   image={image}
                   setImage={setImage}
                   imagePreview={imagePreview}
                   setImagePreview={setImagePreview}
                   strength={imageStrength}
                   setStrength={setImageStrength}
                   isAvatar={preset === "avatar"}
                 />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between px-3 pb-3 mt-1 border-t border-zinc-800/50 pt-3">
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-[11px] font-medium
                    ${showSettings || negativePrompt 
                      ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20" 
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 border border-transparent"}
                `}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Negative Prompt</span>
              </button>
            </div>

            {/* Right Action: Generate Button */}
            <button
              onClick={onGenerate}
              disabled={isGenerating || (!canGenerate && !isGuest)}
              className={`
                  group relative flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-xs tracking-wide transition-all
                  ${
                    isGenerating
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      : !canGenerate && !isGuest
                      ? "bg-red-900/20 text-red-400 border border-red-900/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] hover:bg-[position:right_center] text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-[1.02] border border-white/10"
                  }
              `}
            >
              {isGenerating ? (
                <>
                  <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Generate</span>
                  {(!isGuest || guestGenerations >= guestLimit) && (
                     <span className="ml-1 text-[9px] font-mono opacity-80 bg-black/20 px-1 rounded">
                        2C
                     </span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showSettings && (
            <motion.div
              ref={settingsRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="relative z-20 border-t border-zinc-800/50 bg-black/20 rounded-b-xl"
            >
              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                      Avoid in image
                    </h4>
                    {negativePrompt && (
                      <button
                        onClick={() => setNegativePrompt("")}
                        className="text-[10px] text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1"
                      >
                        <X className="w-3 h-3" /> Clear
                      </button>
                    )}
                  </div>
                  
                  {/* Negative Presets */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {NEGATIVE_PRESETS.map((preset) => (
                        <button
                           key={preset.label}
                           onClick={() => handleAddNegative(preset.value)}
                           className="px-2 py-1 rounded text-[10px] bg-red-900/10 text-red-400 border border-red-900/20 hover:bg-red-900/20 transition-colors"
                        >
                           + {preset.label}
                        </button>
                    ))}
                  </div>

                  <textarea
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="E.g. blurry, bad anatomy, extra limbs, text..."
                    className="
                        w-full h-[60px] bg-black/20 border border-zinc-800 rounded-lg p-3
                        text-xs text-red-200/80 placeholder-zinc-700
                        focus:outline-none focus:border-red-900/50 focus:bg-black/40
                        transition-all resize-none custom-scrollbar
                    "
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {isGuest && guestGenerations >= guestLimit && (
        <div className="text-center">
          <p className="text-[11px] text-zinc-500">
            Free limit reached. <a href="/pricing" className="text-zinc-300 underline hover:text-white">Sign in</a> to continue.
          </p>
        </div>
      )}
    </div>
  );
}
