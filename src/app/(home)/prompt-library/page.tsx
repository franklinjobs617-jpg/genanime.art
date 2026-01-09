"use client";
import React, { useState } from "react";
import {
  Search,
  Copy,
  Check,
  Filter,
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
      className="object-cover group-hover:scale-105 transition-transform duration-700"
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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500 selection:text-white">
      <div className="flex pt-16">
        {/* --- Sidebar (过滤器) --- */}
        <aside className="w-64 fixed h-screen overflow-y-auto border-r border-white/10 bg-black/40 hidden lg:block p-6 mt-2 pb-24">
          <div className="flex items-center gap-2 mb-8 text-purple-400">
            <Filter size={20} />
            <h3 className="font-bold text-lg">Filters</h3>
          </div>

          {/* Filter Group: Style */}
          <div className="mb-8">
            <h4 className="text-xs uppercase text-gray-500 font-bold tracking-wider mb-4">
              Art Style
            </h4>
            <div className="space-y-3">
              {[
                "Anime V3",
                "Niji Style",
                "Realistic",
                "Oil Painting",
                "Sketch",
              ].map((style) => (
                <label
                  key={style}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer appearance-none w-5 h-5 border border-gray-600 rounded bg-transparent checked:bg-purple-600 checked:border-purple-600 transition"
                    />
                    <Check
                      size={12}
                      className="absolute left-1 top-1 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                    />
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition text-sm">
                    {style}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter Group: Aspect Ratio */}
          <div className="mb-8">
            <h4 className="text-xs uppercase text-gray-500 font-bold tracking-wider mb-4">
              Ratio
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {["1:1", "2:3", "16:9", "9:16", "3:2"].map((ratio) => (
                <button
                  key={ratio}
                  className="px-2 py-2 text-xs border border-gray-700 rounded hover:border-purple-500 hover:text-purple-400 transition text-gray-400"
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <main className="flex-1 lg:ml-64 p-6 md:p-10 min-h-screen">
          {/* Hero & Search Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 mt-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover the Best <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                Anime AI Prompts
              </span>
            </h1>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto group">
              {/* 修复点击穿透问题：pointer-events-none */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500 pointer-events-none"></div>
              <div className="relative z-10 flex items-center bg-[#151515] border border-white/10 rounded-full p-2 shadow-2xl">
                <Search className="ml-4 text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Try searching 'Sakamoto Days', 'Cyberpunk', 'White hair'..."
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-white px-4 py-2 text-lg placeholder-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-white text-black rounded-full px-6 py-3 font-bold hover:bg-gray-200 transition cursor-pointer">
                  Search
                </button>
              </div>
            </div>

            {/* Trending Tags */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 relative z-10">
              <span className="text-gray-500 text-sm flex items-center">
                <Zap size={14} className="mr-1 text-yellow-500" /> Trending:
              </span>
              {[
                "Cyberpunk",
                "Samurai",
                "Magical Girl",
                "Ghibli",
                "Space",
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-sm hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-400 transition cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrompts.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/10 flex flex-col"
              >
                {/* Image Area - 使用新封装的组件 */}
                <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
                  <PromptCardImage item={item} />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[2px] z-10 pointer-events-none">
                    <button className="pointer-events-auto bg-white text-black px-6 py-2.5 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition duration-300 flex items-center gap-2 hover:bg-gray-200 cursor-pointer shadow-lg">
                      <Sparkles size={18} />
                      Try this Style
                    </button>
                  </div>

                  {/* Badge & Heart */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white border border-white/10 z-20">
                    {item.ratio}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-1.5 rounded-full text-white border border-white/10 cursor-pointer hover:text-pink-500 hover:border-pink-500/50 transition z-20">
                    <Heart size={16} />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="mb-2">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <ImageIcon size={12} />{" "}
                      <span className="truncate">{item.imageName}</span>
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider font-bold text-purple-400 bg-purple-900/20 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="bg-black/30 p-2 rounded border border-white/5">
                      <p className="text-[10px] text-gray-500 mb-1 uppercase font-bold">
                        Optimized Prompt
                      </p>
                      <p className="text-gray-400 text-xs line-clamp-2 font-mono">
                        {item.prompt}
                      </p>
                    </div>

                    <div className="bg-white/5 p-2 rounded border border-white/5">
                      <p className="text-[10px] text-gray-400/50 mb-1 uppercase font-bold">
                        Original Prompt
                      </p>
                      <p className="text-gray-500 text-[11px] line-clamp-1 italic">
                        {item.originalPrompt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
                    <span className="text-xs text-gray-500">
                      {item.likes} used
                    </span>

                    <button
                      onClick={() => handleCopy(item.prompt, item.id)}
                      className={`cursor-pointer flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-md transition-all z-20 ${copiedId === item.id
                        ? "bg-green-500/20 text-green-400"
                        : "bg-white/5 text-white hover:bg-purple-600 hover:text-white"
                        }`}
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check size={14} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy Prompt
                        </>
                      )}
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