"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Download,
  MoreHorizontal,
  Wand2,
  Copy,
  X,
  Trash2,
  Loader2,
  Crown,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SafeImage from "./SafeImage";

interface Props {
  urls: string[];
  prompt: string;
  style?: string;
  ratio?: string;
  isGenerating?: boolean;
  onRegenerate?: () => void;
  onDelete?: () => void;
  isPro?: boolean;
  onUpgrade?: () => void;
}

export default function GenerationResultCard({
  urls = [],
  prompt,
  style,
  ratio,
  isGenerating,
  onRegenerate,
  onDelete,
  isPro = false,
  onUpgrade,
}: Props) {
  const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "loading" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "loading" | "error" = "success"
  ) => {
    setNotification({ message, type });
    if (type !== "loading") setTimeout(() => setNotification(null), 2500);
  };

  // 监听外部点击关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 核心下载逻辑：支持跨域逃生
  const handleDownload = async (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();

    showToast("Starting download...", "loading");

    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      showToast("Saved successfully!", "success");
    } catch (err) {
      // 逃生方案：如果 CORS 报错，直接打开新页面让用户长按保存
      console.error("Download failed, using fallback:", err);
      showToast("Opening image... Long press to save!", "success");
      setTimeout(() => {
        window.open(url, "_blank");
      }, 500);
    }
  };

  if (isGenerating) {
    return (
      <div className="bg-[#09090b] border border-white/5 rounded-[24px] aspect-[16/9] flex items-center justify-center animate-pulse">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* 通知浮层 */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-10 left-1/2 z-[200] flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-white/10 rounded-full shadow-2xl text-xs font-bold text-white whitespace-nowrap"
          >
            {notification.type === "loading" && (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
            )}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 卡片视图 */}
      <motion.div
        layout
        className="group relative bg-[#09090b] border border-white/5 rounded-[24px] overflow-hidden transition-all duration-500 hover:border-white/10"
      >
        <div className="flex flex-col md:flex-row">
          {/* 图片网格 */}
          <div
            className={`grid flex-1 gap-0.5 ${
              urls.length >= 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {urls.map((u, i) => (
              <div
                key={i}
                className="relative aspect-square cursor-zoom-in overflow-hidden"
                onClick={() => setSelectedImgIndex(i)}
              >
                <SafeImage
                  src={u}
                  alt="Generated"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* 卡片信息区 */}
          <div className="md:w-[280px] p-6 flex flex-col justify-between bg-[#09090b]/50 border-l border-white/5">
            <div className="space-y-4">
              <p className="text-sm text-zinc-300 font-medium leading-relaxed line-clamp-4">
                "{prompt}"
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] font-bold text-zinc-500 border border-white/5 uppercase tracking-wider">
                  {style || "Original"}
                </span>
                <span className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] font-bold text-zinc-500 border border-white/5 uppercase tracking-wider">
                  {ratio || "1:1"}
                </span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2">
              <button
                onClick={onRegenerate}
                className="flex-1 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-[0.97] transition-all"
              >
                Remix
              </button>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-3 bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-colors active:scale-90"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full right-0 mb-2 w-36 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl p-1 z-50 origin-bottom-right"
                    >
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(prompt);
                          showToast("Copied!", "success");
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-medium text-zinc-300 hover:bg-white/5 rounded-lg text-left"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Prompt
                      </button>
                      <button
                        onClick={() => {
                          onDelete?.();
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-medium text-red-400 hover:bg-red-500/10 rounded-lg text-left"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 付费功能引导 */}
            {!isPro && (
              <div className="pt-4 mt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Pro Features</span>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={onUpgrade}
                    className="w-full group/pro flex items-center justify-between p-3 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-xl hover:from-violet-600/20 hover:to-indigo-600/20 hover:border-violet-500/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-3 h-3 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-white">Upscale to 4K</p>
                        <p className="text-[9px] text-zinc-500">Ultra HD quality</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-violet-400">
                      <Crown className="w-3 h-3" />
                      <ArrowRight className="w-3 h-3 group-hover/pro:translate-x-0.5 transition-transform" />
                    </div>
                  </button>

                  <button
                    onClick={onUpgrade}
                    className="w-full group/pro flex items-center justify-between p-3 bg-gradient-to-r from-amber-600/10 to-orange-600/10 border border-amber-500/20 rounded-xl hover:from-amber-600/20 hover:to-orange-600/20 hover:border-amber-500/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <Download className="w-3 h-3 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-white">No Watermark</p>
                        <p className="text-[9px] text-zinc-500">Clean downloads</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Crown className="w-3 h-3" />
                      <ArrowRight className="w-3 h-3 group-hover/pro:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* 移动端/全屏预览 (针对点击失效优化的结构) */}
      <AnimatePresence>
        {selectedImgIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex flex-col bg-black/98 backdrop-blur-3xl"
            style={{ touchAction: "none" }}
          >
            {/* 背景层：点击任意位置关闭图片，但不影响上方按钮 */}
            <div
              className="absolute inset-0 z-0"
              onClick={() => setSelectedImgIndex(null)}
            />

            {/* 顶部：关闭按钮 */}
            <div className="relative z-[170] flex justify-end p-6 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImgIndex(null);
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all active:scale-90 pointer-events-auto"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 中间：图片展示 */}
            <div
              className="relative z-[160] flex-1 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={urls[selectedImgIndex]}
                className="max-w-[95vw] max-h-[75vh] w-auto h-auto object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
              />
            </div>

            {/* 底部：操作栏容器 (通过 z-index 确保在最上层) */}
            <div className="relative z-[180] w-full px-6 pt-8 pb-12 bg-gradient-to-t from-black via-black/95 to-transparent">
              <div className="max-w-md mx-auto space-y-4">
                {/* 主要操作按钮 */}
                <div className="flex items-center gap-3">
                  {/* 下载按钮 - 专门加大高度以适配移动端 */}
                  <button
                    onClick={(e) => handleDownload(e, urls[selectedImgIndex!])}
                    className="h-16 flex-1 bg-white text-black rounded-2xl flex items-center justify-center gap-3 font-black text-sm uppercase tracking-wider active:scale-95 transition-transform shadow-xl"
                  >
                    <Download className="w-5 h-5" />
                    Save Image
                  </button>

                  {/* 删除按钮 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.();
                      setSelectedImgIndex(null);
                    }}
                    className="h-16 w-16 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-2xl flex items-center justify-center border border-red-500/30 active:scale-95 backdrop-blur-sm"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  {/* Remix 按钮 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRegenerate?.();
                      setSelectedImgIndex(null);
                    }}
                    className="h-16 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-sm uppercase tracking-wider active:scale-95 shadow-lg shadow-indigo-500/30"
                  >
                    <Wand2 className="w-5 h-5" />
                  </button>
                </div>

                {/* 付费功能引导 - 全屏预览版本 */}
                {!isPro && (
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpgrade?.();
                        setSelectedImgIndex(null);
                      }}
                      className="flex-1 group/pro flex items-center justify-center gap-2 h-12 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/30 rounded-xl text-white hover:from-violet-600/30 hover:to-indigo-600/30 hover:border-violet-500/50 transition-all active:scale-95"
                    >
                      <Zap className="w-4 h-4 text-violet-400" />
                      <span className="text-[10px] font-bold">4K Upscale</span>
                      <Crown className="w-3 h-3 text-amber-400" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpgrade?.();
                        setSelectedImgIndex(null);
                      }}
                      className="flex-1 group/pro flex items-center justify-center gap-2 h-12 bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-xl text-white hover:from-amber-600/30 hover:to-orange-600/30 hover:border-amber-500/50 transition-all active:scale-95"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                      <span className="text-[10px] font-bold">No Watermark</span>
                      <Crown className="w-3 h-3 text-amber-400" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-center text-zinc-300 text-xs mt-6 font-semibold uppercase tracking-wider opacity-80">
                Tap Background to Close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
