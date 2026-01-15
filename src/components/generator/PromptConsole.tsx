"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  MinusCircle,
  Image as ImageIcon,
  Plus,
  Wand2,
  X
} from "lucide-react";
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
  image: File | null;
  setImage: (file: File | null) => void;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
}

const SUGGESTION_CHIPS = [
  "Masterpiece", "Cyberpunk", "8k Resolution", "Cinematic", "Studio Ghibli"
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
  image,
  setImage,
  imagePreview,
  setImagePreview
}: PromptConsoleProps) {
  const [showNegative, setShowNegative] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [activePrompt]);

  const addTag = (tag: string) => {
    const newPrompt = activePrompt.trim() ? `${activePrompt}, ${tag}` : tag;
    setActivePrompt(newPrompt);
  };

  const hasContent = activePrompt.length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 relative z-10">

      {/* 
        核心容器：
        1. 去掉 Border
        2. 使用双重阴影制造悬浮感
        3. 聚焦时，背景微亮，而不是边框变色
      */}
      <div
        className={`
          relative rounded-[28px] transition-all duration-500 ease-out
          ${isFocused
            ? "bg-zinc-900/90 shadow-[0_0_50px_-10px_rgba(99,102,241,0.15)] ring-1 ring-white/10"
            : "bg-zinc-900/60 hover:bg-zinc-900/80 shadow-2xl ring-1 ring-white/5"
          }
          backdrop-blur-xl
        `}
      >
        {/* 顶部：功能区 (图片/负面词) - 更加隐形，只有激活时才明显 */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex gap-2">
            <button
              onClick={() => setShowImageUpload(!showImageUpload)}
              className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                  ${showImageUpload || imagePreview
                  ? "bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                }
                `}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Image Ref</span>
            </button>

            <button
              onClick={() => setShowNegative(!showNegative)}
              className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                  ${showNegative || negativePrompt
                  ? "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                }
                `}
            >
              <MinusCircle className="w-3.5 h-3.5" />
              <span>Negative</span>
            </button>
          </div>

          {/* 字数统计 - 极简 */}
          <span className="text-[10px] text-zinc-600 font-mono tracking-widest opacity-60">
            {activePrompt.length} / 1000
          </span>
        </div>

        {/* 展开区域：图片上传 & 负面词 */}
        <AnimatePresence>
          {(showImageUpload || imagePreview) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-5 overflow-hidden"
            >
              <div className="pb-4 pt-2">
                <ImageUpload
                  image={image}
                  setImage={setImage}
                  previewUrl={imagePreview}
                  setPreviewUrl={setImagePreview}
                />
              </div>
            </motion.div>
          )}
          {(showNegative || negativePrompt) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-5 overflow-hidden"
            >
              <div className="pb-4 pt-2 relative">
                <input
                  type="text"
                  placeholder="Negative prompt (e.g. ugly, blurry)"
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  className="w-full bg-rose-500/5 text-rose-200 text-sm px-4 py-3 rounded-xl border-none focus:ring-1 focus:ring-rose-500/30 placeholder-rose-500/30 transition-all outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* 主输入区 + 生成按钮 */}
        <div className="relative px-2 pb-2 pt-1 flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={activePrompt}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setActivePrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onGenerate();
              }
            }}
            placeholder="Imagine anything..."
            className="
                  w-full bg-transparent border-none outline-none ring-0
                  text-lg text-zinc-100 placeholder-zinc-600
                  px-4 py-4 min-h-[60px] max-h-[300px] resize-none
                  font-light tracking-wide leading-relaxed
                "
            rows={1}
          />

          {/* 
               亮点：生成按钮 
               使用高饱和度的渐变，且没有任何描边。
               它是整个黑灰色块中唯一的色彩，非常吸睛。
            */}
          <button
            onClick={onGenerate}
            disabled={isGenerating || (!canGenerate && !isGuest) || !hasContent}
            className={`
                   group relative flex items-center justify-center
                   w-12 h-12 mb-2 mr-2 rounded-2xl shrink-0
                   transition-all duration-500 ease-out
                   ${hasContent
                ? "bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/30 hover:scale-105 hover:shadow-indigo-500/50"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              }
                `}
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Sparkles className={`w-6 h-6 transition-colors ${hasContent ? 'text-white' : 'text-zinc-600'}`} />
            )}

            {/* 按钮内部的流光效果 (仅在可点击时显示) */}
            {hasContent && !isGenerating && (
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* 底部标签：极度干净，无边框，纯文字+背景 */}
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTION_CHIPS.map((chip, i) => (
          <button
            key={i}
            onClick={() => addTag(chip)}
            className="
                    group relative px-4 py-2 rounded-xl
                    bg-white/5 hover:bg-white/10
                    transition-all duration-300
                "
          >
            <div className="flex items-center gap-1.5">
              <Plus className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
              <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">{chip}</span>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}