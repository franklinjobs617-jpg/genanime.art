"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Trash2,
  Copy,
  Wand2,
  Image as ImageIcon,
  Info,
  Check,
  Box,
  Maximize2,
  Calendar,
  Cpu,
  Palette,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import SafeImage from "./SafeImage";
import { useTranslations } from "next-intl";

interface ImageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    urls: string[];
    prompt: string;
    timestamp: number;
    style?: string;
    ratio?: string;
    model?: string;
    seed?: number;
    steps?: number;
    cfgScale?: number;
  } | null;
  onRegenerate: () => void;
  onDelete: (id: string) => void;
  onImageToPrompt?: (imageUrl: string) => void;
}

export default function ImageDetailModal({
  isOpen,
  onClose,
  item,
  onRegenerate,
  onDelete,
  onImageToPrompt,
}: ImageDetailModalProps) {
  const t = useTranslations("Hero");
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    toast.success("Prompt copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  // 优化的下载函数：增加移动端兼容性
  const downloadImg = async (
    e: React.MouseEvent,
    url: string,
    index: number
  ) => {
    e.stopPropagation(); // 阻止点击穿透关闭弹窗
    toast.loading("Preparing download...", { id: "download" });

    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error("Network error");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `anime-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast.success("Download completed!", { id: "download" });
    } catch (e) {
      // 移动端保底方案：如果跨域失败，直接新窗口打开图片
      console.error("Download failed:", e);
      toast.success("Long press image to save", { id: "download" });
      window.open(url, "_blank");
    }
  };

  const date = new Date(item.timestamp).toLocaleString();
  const resolution =
    item.ratio === "1:1"
      ? "1024x1024"
      : item.ratio === "16:9"
      ? "1344x768"
      : "768x1344";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center lg:justify-end overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />

          {/* Main Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 100 }}
            className="relative w-full h-full max-h-screen flex flex-col lg:flex-row shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // 阻止内容区点击关闭
          >
            {/* Center: Image Display */}
            <div className="flex-1 flex items-center justify-center p-4 lg:p-8 relative bg-black min-h-0">
              {/* 关闭按钮 */}
              <button
                onClick={onClose}
                className="absolute top-4 left-4 z-50 p-3 bg-black/80 hover:bg-black/90 rounded-full border border-white/20 transition-all text-white shadow-lg backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 图片容器 - 使用CSS类确保完整显示 */}
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <SafeImage
                  src={item.urls[0]}
                  alt={item.prompt}
                  className="max-w-full max-h-[calc(100vh-8rem)] lg:max-w-[calc(100vw-28rem)] w-auto h-auto object-contain"
                />
              </div>

              {/* Mobile Bottom Bar Actions - 固定在底部 */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-3 lg:hidden z-[60]">
                <button
                  onClick={(e) => downloadImg(e, item.urls[0], 0)}
                  className="p-3 bg-black/90 hover:bg-black rounded-xl border border-white/30 text-white active:scale-90 transition-all shadow-xl backdrop-blur-sm"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                    onClose();
                  }}
                  className="p-3 bg-black/90 hover:bg-red-600/90 rounded-xl border border-white/30 text-white active:scale-90 transition-all shadow-xl backdrop-blur-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRegenerate();
                    onClose();
                  }}
                  className="flex-1 p-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-white text-sm shadow-xl active:scale-95 transition-all"
                >
                  Remix
                </button>
              </div>
            </div>

            {/* Sidebar: Metadata & Actions (Desktop Only) */}
            <div className="w-full lg:w-[400px] bg-[#0a0a0a] border-l border-white/10 p-6 lg:p-8 flex flex-col gap-8 overflow-y-auto hidden lg:flex">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400 flex items-center gap-2 uppercase tracking-wider">
                  <Calendar className="w-4 h-4" /> {date}
                </span>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Prompt Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-400" /> Prompt
                  </h4>
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-zinc-300" />
                    )}
                  </button>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-2xl border border-white/10">
                  <p className="text-sm text-zinc-200 leading-relaxed font-medium">
                    {item.prompt}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-black text-zinc-400 tracking-wider flex items-center gap-2">
                    <Cpu className="w-3 h-3" /> Model
                  </h4>
                  <div className="px-3 py-3 bg-zinc-800/50 rounded-xl border border-white/10 text-sm font-bold text-zinc-100 flex items-center gap-2">
                    <Box className="w-4 h-4 text-indigo-400" />{" "}
                    {item.model || "Flux v1.0"}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-black text-zinc-400 tracking-wider flex items-center gap-2">
                    <Palette className="w-3 h-3" /> Style
                  </h4>
                  <div className="px-3 py-3 bg-zinc-800/50 rounded-xl border border-white/10 text-sm font-bold text-zinc-100">
                    {item.style || "None"}
                  </div>
                </div>
              </div>

              <div className="flex-1" />

              {/* Desktop Buttons */}
              <div className="space-y-4 pb-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={(e) => downloadImg(e, item.urls[0], 0)}
                    className="flex items-center justify-center gap-2 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl border border-white/20 text-sm font-bold text-white transition-all"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button
                    onClick={() => {
                      onDelete(item.id);
                      onClose();
                    }}
                    className="flex items-center justify-center gap-2 py-3 bg-zinc-800 hover:bg-red-600 rounded-xl border border-white/20 text-sm font-bold text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
                <button
                  onClick={onRegenerate}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl text-sm font-black uppercase tracking-wider shadow-2xl transition-all"
                >
                  <Wand2 className="w-5 h-5" /> Remix This Art
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
