"use client";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Image as ImageIcon, Settings2, X, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ImageUpload from "./ImageUpload";

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
  highlight?: boolean;
}

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
  highlight,
}: PromptConsoleProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // 自动调整高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [activePrompt]);

  // 点击外部区域关闭设置面板
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSettings &&
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(
          'button[title="Reference Image & Negative Prompt Settings"]'
        )
      ) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSettings]);

  const hasContent = activePrompt.trim().length > 0;

  return (
    <div className="w-full max-w-8xl mx-auto flex flex-col gap-4 relative z-20">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative flex flex-col w-full rounded-[24px] bg-[#121215] isolate"
      >
        <div
          className={`
                absolute inset-0 rounded-[24px] pointer-events-none z-20
                transition-all duration-300 ease-out
                ${
                  isFocused
                    ? "shadow-[0_0_0_2px_rgba(99,102,241,0.5),0_0_40px_rgba(79,70,229,0.2)]"
                    : "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                }
            `}
        />

        <div className="absolute inset-0 rounded-[24px] pointer-events-none z-10 transition-opacity duration-300 opacity-0 hover:opacity-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)]" />

        <div className="relative z-30 flex flex-col">
          <div className="relative">
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
              placeholder="Describe your imagination... (e.g. A cyberpunk samurai in neon rain)"
              className="
                        w-full bg-transparent border-none outline-none ring-0
                        text-base md:text-lg text-zinc-100 placeholder-zinc-600
                        px-6 pt-6 pb-2 min-h-[80px] resize-none
                        font-light leading-relaxed tracking-wide
                    "
              rows={1}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between px-4 pb-4 pt-2 gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                        ${
                          showSettings || imagePreview || negativePrompt
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "bg-white/5 text-zinc-500 hover:text-zinc-300 hover:bg-white/10"
                        }
                    `}
              title="Reference Image & Negative Prompt Settings"
            >
              <Settings2 className="w-5 h-5" />
              <span>{showSettings ? "Hide Settings" : "Ref & Negative"}</span>
            </button>

            {/* 添加积分不足提示 */}
            {!canGenerate && !isGuest && (
              <div className="hidden md:flex-1 text-center">
                <p className="text-[10px] text-amber-400 font-medium">
                  Insufficient credits.{" "}
                  <a href="/pricing" className="underline hover:text-amber-300">
                    Get more credits
                  </a>
                </p>
              </div>
            )}
            {isGuest && guestGenerations >= guestLimit && (
              <div className="order-first md:order-none md:flex-1 text-center">
                <p className="text-[10px] text-amber-400 font-medium md:hidden">
                  Limit reached
                </p>
                <p className="text-[10px] text-amber-400 font-medium hidden md:block">
                  Free trial limit reached.{" "}
                  <a href="/pricing" className="underline hover:text-amber-300">
                    Sign in to continue
                  </a>
                </p>
              </div>
            )}

            {/* 右侧：生成按钮组 */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 sm:hidden">
                <span
                  className={`text-[10px] font-mono transition-opacity ${
                    activePrompt.length > 0 ? "opacity-100" : "opacity-0"
                  } text-zinc-600`}
                >
                  {activePrompt.length} chars
                </span>
                {activePrompt.length > 0 && (
                  <button
                    onClick={() => setActivePrompt("")}
                    className="text-[10px] text-zinc-500 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-500/10"
                    title="Clear prompt"
                  >
                    Clear
                  </button>
                )}
              </div>

              <button
                onClick={onGenerate}
                disabled={isGenerating || (!canGenerate && !isGuest)}
                title={
                  !canGenerate && !isGuest
                    ? guestGenerations >= guestLimit
                      ? "Free trial limit reached"
                      : "Insufficient credits"
                    : ""
                }
                className={`
                            group relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 overflow-hidden w-full sm:w-auto
                            ${
                              isGenerating
                                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                : !canGenerate && !isGuest
                                ? "bg-gradient-to-r from-red-900 to-rose-900 text-white cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02]"
                            }
                        `}
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles
                      className={`w-4 h-4 ${
                        hasContent ? "fill-white" : "fill-transparent"
                      }`}
                    />
                    <div className="flex flex-col items-center leading-none">
                      <span className="text-[13px] font-bold">Generate</span>
                      <span className="text-[9px] font-black uppercase tracking-tighter bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                        {!isGuest || guestGenerations >= guestLimit
                          ? "2 Credits"
                          : "FREE TRIAL"}
                      </span>
                    </div>
                  </>
                )}

                {!isGenerating && hasContent && (
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 
           3. 设置面板 (Settings Drawer)
           使用 AnimatePresence 处理展开动画
           改为相对定位，不影响布局
        */}
        {/* 
           3. 设置面板 (Settings Drawer)
           使用 AnimatePresence 处理展开动画
           改为相对定位，不影响布局
        */}
        <AnimatePresence mode="sync">
          {showSettings && (
            <motion.div
              ref={settingsRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="relative z-30 border-t border-white/5 bg-[#0a0a0c]"
            >
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 图片参考 */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5" /> Image Reference
                  </h4>
                  <div className="bg-black/20 rounded-xl p-1 border border-white/5">
                    <ImageUpload
                      image={image}
                      setImage={setImage}
                      previewUrl={imagePreview}
                      setPreviewUrl={setImagePreview}
                    />
                  </div>
                </div>

                {/* 负面提示词 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                      <X className="w-3.5 h-3.5" /> Negative Prompt
                    </h4>
                    {negativePrompt && (
                      <button
                        onClick={() => setNegativePrompt("")}
                        className="text-[10px] text-zinc-600 hover:text-red-400 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <textarea
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="E.g. blurry, bad anatomy, low quality, extra fingers..."
                    className="
                        w-full h-[120px] bg-black/20 border border-white/5 rounded-xl p-4 
                        text-sm text-zinc-300 placeholder-zinc-700 
                        focus:outline-none focus:border-indigo-500/30 focus:bg-black/40 
                        transition-all resize-none custom-scrollbar
                    "
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 底部状态条 */}
      <div className="flex items-center gap-3 px-4 py-2 opacity-60 hover:opacity-100 transition-opacity">
        <Info className="w-3.5 h-3.5 text-zinc-500" />
        <p className="text-[11px] text-zinc-500">
          <span className="font-semibold text-zinc-400">Notice:</span> Sensitive
          content generation will be blocked by the safety filter.
        </p>
      </div>
    </div>
  );
}
