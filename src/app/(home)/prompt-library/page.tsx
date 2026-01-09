"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Copy,
  Check,
  Sparkles,
  Zap,
  Heart,
  Image as ImageIcon,
  Maximize2,
  X,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PROMPTS_DATA } from "./data";
import Image from "next/image";

// --- 辅助函数：根据数据中的比例返回对应的 Tailwind 类名 ---
const getAspectRatioClass = (ratio: string) => {
  switch (ratio) {
    case "16:9":
      return "aspect-video"; // 横图
    case "1:1":
      return "aspect-square"; // 方图
    case "3:2":
      return "aspect-[3/2]"; // 横向长图
    case "9:16":
      return "aspect-[9/16]"; // 手机竖屏
    case "2:3":
    default:
      return "aspect-[2/3]"; // 默认竖图
  }
};

// --- 图片组件 ---
const PromptCardImage = ({
  item,
  onClick
}: {
  item: any;
  onClick: () => void;
}) => {
  const [src, setSrc] = useState(`/images/prompts/${item.imageName}.webp`);

  return (
    <div className="relative w-full h-full cursor-zoom-in bg-gray-900" onClick={onClick}>
      <Image
        src={src}
        alt={item.alt || item.imageName}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        onError={() => {
          setSrc(
            `https://placehold.co/600x400/111/fff?text=${encodeURIComponent(item.imageName)}`
          );
        }}
        unoptimized={src.startsWith("http")}
      />

      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="bg-black/50 backdrop-blur-sm p-3 rounded-full text-white/80 border border-white/10">
          <Maximize2 size={20} />
        </div>
      </div>
    </div>
  );
};

export default function PromptLibrary() {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const handleCopy = (text: string, id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTryStyle = (prompt: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    router.push(`/generator?prompt=${encodeURIComponent(prompt)}`);
  };

  const filteredPrompts = PROMPTS_DATA.filter(
    (item) =>
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500 selection:text-white">

      {/* --- 灯箱 Modal (保持不变) --- */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <button className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition z-[110] bg-black/50 p-2 rounded-full border border-white/10">
            <X size={28} />
          </button>

          <div
            className="flex flex-col lg:flex-row w-full h-full max-w-[1800px] max-h-[95vh] bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl mx-4 my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full lg:flex-1 h-[45vh] lg:h-full bg-[#020202] flex items-center justify-center overflow-hidden group/image">
              <div className="absolute inset-0 opacity-30 blur-3xl scale-110 pointer-events-none">
                <Image src={`/images/prompts/${selectedItem.imageName}.webp`} alt="bg" fill className="object-cover" unoptimized />
              </div>
              <div className="relative w-full h-full p-2 md:p-8">
                <Image
                  src={`/images/prompts/${selectedItem.imageName}.webp`}
                  alt={selectedItem.alt}
                  fill
                  className="object-contain drop-shadow-2xl z-10"
                  quality={100}
                  priority
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/1200x800/111/fff?text=${selectedItem.imageName}`;
                  }}
                />
              </div>
            </div>

            <div className="w-full lg:w-[400px] lg:min-w-[400px] bg-[#0f0f0f] border-l border-white/5 flex flex-col h-full">
              <div className="p-6 md:p-8 border-b border-white/5">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-white">
                    <span className="text-purple-500">#{selectedItem.id}</span>
                    <span className="truncate max-w-[200px]">{selectedItem.imageName}</span>
                  </h2>
                  <span className="px-2 py-1 bg-white/10 rounded text-xs font-mono text-gray-400 border border-white/5">
                    {selectedItem.ratio}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] md:text-xs font-bold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs uppercase text-gray-500 font-bold mb-3 tracking-wider flex items-center gap-2">
                      <Sparkles size={12} /> Optimized Prompt
                    </h3>
                    <div className="bg-[#050505] p-4 rounded-xl border border-white/10 group hover:border-purple-500/30 transition-colors">
                      <p className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                        {selectedItem.prompt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#0a0a0a] border-t border-white/10 z-20">
                <div className="flex flex-col gap-3">
                  <button onClick={() => handleTryStyle(selectedItem.prompt)} className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 text-white">
                    <Sparkles size={18} fill="currentColor" /> Generate with this Style
                  </button>
                  <div className="flex gap-3">
                    <button onClick={() => handleCopy(selectedItem.prompt, selectedItem.id)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border transition ${copiedId === selectedItem.id ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"}`}>
                      {copiedId === selectedItem.id ? <Check size={18} /> : <Copy size={18} />} {copiedId === selectedItem.id ? "Copied" : "Copy Prompt"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 主页面 --- */}
      <div className="pt-24 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        <header className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Prompt <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Library</span>
          </h1>

          <div className="relative max-w-2xl mx-auto group mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
            <div className="relative z-10 flex items-center bg-[#111] border border-white/10 rounded-full p-1.5 md:p-2 shadow-2xl">
              <Search className="ml-4 text-gray-500 shrink-0" size={20} />
              <input
                type="text"
                placeholder="Search styles, characters..."
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-white px-3 md:px-4 py-2 text-sm md:text-lg placeholder-gray-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-white text-black rounded-full px-5 md:px-8 py-2 md:py-3 text-sm md:text-base font-bold hover:bg-purple-500 hover:text-white transition duration-300">
                Search
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 relative z-10">
            {["Cyberpunk", "Ghibli", "Samurai", "Kawaii", "Landscape"].map((tag) => (
              <button key={tag} onClick={() => setSearchQuery(tag)} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] md:text-xs text-gray-300 hover:border-purple-500 hover:text-purple-400 transition">
                {tag}
              </button>
            ))}
          </div>
        </header>

        <main>
          {/* 
            === 核心修改：瀑布流布局 (Masonry Layout) ===
            1. 使用 columns-2 md:columns-3 ... 代替 grid-cols
            2. 使用 gap-4 控制列间距
            3. space-y-4 控制垂直间距 (备选，或在 Item 上加 mb-4)
          */}
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 mx-auto">
            {filteredPrompts.map((item) => (
              <div
                key={item.id}
                // break-inside-avoid: 防止卡片在列之间被切断
                // mb-4: 每个卡片底部的间距
                className="break-inside-avoid mb-4 group relative bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 flex flex-col"
              >
                {/* 
                  动态宽高比容器 
                  getAspectRatioClass(item.ratio) 会根据图片比例返回 'aspect-video' 或 'aspect-[2/3]' 等
                  这样横图就是横的，竖图就是竖的。
                */}
                <div className={`relative w-full ${getAspectRatioClass(item.ratio)} overflow-hidden bg-[#151515]`}>
                  <PromptCardImage
                    item={item}
                    onClick={() => setSelectedItem(item)}
                  />
                  <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                    <button onClick={(e) => handleTryStyle(item.prompt, e)} className="bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-500 transition">
                      <Sparkles size={14} />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2 z-20 pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] md:text-[10px] text-white border border-white/10 uppercase font-bold">
                      {item.ratio}
                    </span>
                  </div>
                </div>

                {/* 底部信息 (跟之前保持一致，但高度是自适应的) */}
                <div className="p-3 md:p-4 flex flex-col bg-gradient-to-b from-transparent to-[#0a0a0a] cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <div className="mb-2 flex items-center gap-1.5">
                    <ImageIcon size={10} className="text-purple-500" />
                    <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase truncate">{item.imageName}</span>
                  </div>

                  {/* Prompt: 横图因为比较矮，为了不占太多位置，可以限制行数 */}
                  <div className="w-full">
                    <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed font-mono line-clamp-2 italic bg-white/5 p-2 rounded border border-white/5">
                      {item.prompt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <span className="text-[10px] text-gray-600 font-bold flex items-center"><Heart size={10} className="mr-1" /> {item.likes}</span>
                    <button onClick={(e) => handleCopy(item.prompt, item.id, e)} className="text-[10px] font-bold text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                      {copiedId === item.id ? "Done" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}