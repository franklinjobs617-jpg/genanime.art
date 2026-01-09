"use client";
import React, { useState } from "react";
import {
  Search,
  Copy,
  Check,
  Sparkles,
  Zap,
  Heart,
  Image as ImageIcon,
} from "lucide-react";
import { PROMPTS_DATA } from "./data";
import Image from "next/image";

const PromptCardImage = ({ item }: { item: any }) => {
  const [src, setSrc] = useState(`/images/prompts/${item.imageName}.webp`);

  return (
    <Image
      src={src}
      alt={item.alt}
      fill
      className="object-cover group-hover:scale-110 transition-transform duration-700"
      onError={() => {
        setSrc(
          `https://placehold.co/400x600/111/fff?text=${encodeURIComponent(
            item.imageName
          )}`
        );
      }}
      unoptimized={src.startsWith("http")}
    />
  );
};

export default function PromptLibrary() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = PROMPTS_DATA.filter(
    (item) =>
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* 
          页面主容器 
          max-w-[1400px] 确保在大屏显示器上不会铺得太满，保持美感 
      */}
      <div className="pt-24 pb-20 px-4 md:px-8 max-w-[1440px] mx-auto">

        {/* --- Hero & Search Section --- */}
        <header className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Prompt <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Library</span>
          </h1>
          <p className="text-gray-400 mb-10 text-sm md:text-lg">
            Explore 50+ high-quality anime prompts to kickstart your creativity.
          </p>

          {/* Search Bar - 强化视觉效果 */}
          <div className="relative max-w-2xl mx-auto group mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
            <div className="relative z-10 flex items-center bg-[#111] border border-white/10 rounded-full p-1.5 md:p-2 shadow-2xl focus-within:border-purple-500/50 transition">
              <Search className="ml-4 text-gray-500 shrink-0" size={20} />
              <input
                type="text"
                placeholder="Search styles, characters, or tags..."
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-white px-3 md:px-4 py-2 text-sm md:text-lg placeholder-gray-600 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-white text-black rounded-full px-5 md:px-8 py-2 md:py-3 text-sm md:text-base font-bold hover:bg-purple-500 hover:text-white transition duration-300 cursor-pointer shrink-0 shadow-lg">
                Search
              </button>
            </div>
          </div>

          {/* Trending Tags */}
          <div className="flex flex-wrap justify-center gap-2 relative z-10">
            <span className="text-gray-500 text-xs md:text-sm flex items-center mr-1">
              <Zap size={14} className="mr-1 text-yellow-500" /> Trending:
            </span>
            {["Cyberpunk", "Ghibli", "Samurai", "Kawaii", "Vray"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] md:text-xs text-gray-300 hover:border-purple-500 hover:text-purple-400 hover:bg-purple-500/10 transition cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </header>

        {/* --- Main Content Grid --- */}
        <main>
          {/* 
             Grid 设置：
             grid-cols-2: 移动端保持两列
             md:grid-cols-3: 平板三列
             lg:grid-cols-4: 普通PC四列
             xl:grid-cols-5: 大屏PC五列
          */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {filteredPrompts.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-500 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative aspect-[2/3] overflow-hidden bg-[#151515]">
                  <PromptCardImage item={item} />

                  {/* Overlay (只在非触摸屏/PC端更有意义) */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 backdrop-blur-[2px] z-10 pointer-events-none">
                    <button className="pointer-events-auto bg-purple-600 text-white p-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition duration-300 hover:bg-purple-500 shadow-xl">
                      <Sparkles size={20} />
                    </button>
                    <p className="text-[10px] text-white/70 mt-3 transform translate-y-4 group-hover:translate-y-0 transition duration-500 delay-75 uppercase tracking-widest font-bold">Try Style</p>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 z-20">
                    <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] md:text-[10px] text-white border border-white/10 uppercase font-bold">
                      {item.ratio}
                    </span>
                  </div>
                  <button className="absolute top-2 right-2 md:top-3 md:right-3 bg-black/60 backdrop-blur-md p-1.5 rounded-full text-white/70 border border-white/10 cursor-pointer hover:text-pink-500 hover:border-pink-500/50 transition z-20">
                    <Heart size={14} className="md:w-4 md:h-4" />
                  </button>
                </div>

                {/* Info Section */}
                <div className="p-3 md:p-4 flex-1 flex flex-col bg-gradient-to-b from-transparent to-[#0a0a0a]">
                  <div className="mb-2 flex items-center gap-1.5">
                    <ImageIcon size={10} className="text-purple-500" />
                    <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase truncate">
                      {item.imageName}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] md:text-[9px] font-extrabold uppercase bg-white/5 text-gray-400 px-1.5 py-0.5 rounded border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Prompt Text - 移动端显示两行，PC端显示两行 */}
                  <div className="flex-1">
                    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2 md:p-2.5">
                      <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed font-mono line-clamp-2 md:line-clamp-3 italic">
                        &quot;{item.prompt}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Bottom Stats & Action */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                    <div className="flex items-center text-[10px] text-gray-600 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                      {item.likes}
                    </div>

                    <button
                      onClick={() => handleCopy(item.prompt, item.id)}
                      className={`cursor-pointer flex items-center gap-1.5 text-[10px] md:text-xs font-bold py-1.5 px-3 rounded-lg transition-all z-20 shadow-sm ${copiedId === item.id
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-white text-black hover:bg-purple-600 hover:text-white active:scale-95"
                        }`}
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check size={12} /> <span>Done</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} /> <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPrompts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-500 text-lg">No prompts found matching your search.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-purple-400 hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}