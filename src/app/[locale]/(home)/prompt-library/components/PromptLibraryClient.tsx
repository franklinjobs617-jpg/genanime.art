"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Copy,
  Check,
  Sparkles,
  Heart,
  Image as ImageIcon,
  Maximize2,
  X,
  HelpCircle,
  Layers,
  Zap,
  Lightbulb,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PROMPTS_DATA } from "../data";
import { useTranslations, useLocale } from "next-intl";

const PromptCard = ({
  item,
  onClick,
  onTryStyle,
  onCopy,
  copiedId,
}: {
  item: any;
  onClick: () => void;
  onTryStyle: (e: React.MouseEvent) => void;
  onCopy: (text: string, id: number, e: React.MouseEvent) => void;
  copiedId: number | null;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const locale = useLocale();

  const localizedAlt =
    locale === "id"
      ? `Gambar Anime AI: ${item.alt}`
      : item.alt || `${item.imageName} - AI Anime Art Prompt`;

  const getAspectRatioStyle = (ratio: string) => {
    const parts = ratio.split(":");
    return parts.length === 2 ? `${parts[0]} / ${parts[1]}` : "3 / 4";
  };

  return (
    <div className="break-inside-avoid mb-4 group relative bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 flex flex-col shadow-lg shadow-black/40 hover:shadow-purple-500/10">
      <div
        className="relative w-full bg-[#151515] overflow-hidden cursor-zoom-in"
        style={{ aspectRatio: getAspectRatioStyle(item.ratio) }}
        onClick={onClick}
      >
        {!isLoaded && (
          <div className="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center z-0">
            <ImageIcon className="w-6 h-6 text-zinc-800" />
          </div>
        )}
        <img
          src={`/images/prompts/${item.imageName}.webp`}
          alt={localizedAlt}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/600x400/111/fff?text=Error`;
            setIsLoaded(true);
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <div className="bg-black/50 backdrop-blur-sm p-2 rounded-full text-white/80 border border-white/10">
            <Maximize2 size={16} />
          </div>
        </div>
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
          <button
            onClick={onTryStyle}
            className="bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-500 transition active:scale-95"
          >
            <Sparkles size={14} />
          </button>
        </div>
        <div className="absolute top-2 left-2 z-20 pointer-events-none">
          <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] md:text-[10px] text-white border border-white/10 uppercase font-bold">
            {item.ratio}
          </span>
        </div>
      </div>

      <div
        className="p-3 md:p-4 flex flex-col bg-gradient-to-b from-[#111] to-[#0a0a0a] cursor-pointer"
        onClick={onClick}
      >
        <div className="mb-2 flex items-center gap-1.5">
          <ImageIcon size={10} className="text-purple-500" />
          <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase truncate">
            {item.imageName}
          </span>
        </div>
        <div className="w-full">
          <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed font-mono line-clamp-2 italic bg-white/5 p-2 rounded border border-white/5">
            {item.prompt}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <span className="text-[10px] text-gray-600 font-bold flex items-center">
            <Heart size={10} className="mr-1" /> {item.likes}
          </span>
          <button
            onClick={(e) => onCopy(item.prompt, item.id, e)}
            className={`text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded transition-colors ${copiedId === item.id ? "bg-green-500/20 text-green-400" : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"}`}
          >
            {copiedId === item.id ? "Done" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PromptLibraryClient() {
  const router = useRouter();
  const t = useTranslations("promptLibrary");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return <div className="min-h-screen bg-[#050505]" />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500 selection:text-white">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #18181b;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #52525b;
        }
      `}</style>

      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-in fade-in duration-200 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition z-[110] bg-black/50 p-2 rounded-full border border-white/10">
            <X size={28} />
          </button>
          <div
            className="flex flex-col lg:flex-row w-full h-full max-w-[1600px] max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full lg:flex-1 h-[40vh] lg:h-full bg-[#020202] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 blur-3xl scale-110 pointer-events-none">
                <img
                  src={`/images/prompts/${selectedItem.imageName}.webp`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <img
                src={`/images/prompts/${selectedItem.imageName}.webp`}
                alt={selectedItem.alt}
                className="max-w-full max-h-full object-contain drop-shadow-2xl z-10 relative"
              />
            </div>
            <div className="w-full lg:w-[400px] lg:min-w-[400px] bg-[#0f0f0f] border-l border-white/5 flex flex-col h-[50vh] lg:h-full">
              <div className="p-6 border-b border-white/5">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-white truncate">
                    <span className="text-purple-500">#{selectedItem.id}</span>
                    <span className="truncate">{selectedItem.imageName}</span>
                  </h2>
                  <span className="shrink-0 px-2 py-1 bg-white/10 rounded text-xs font-mono text-gray-400 border border-white/5">
                    {selectedItem.ratio}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs uppercase text-gray-500 font-bold mb-3 tracking-wider flex items-center gap-2">
                      <Sparkles size={12} /> Optimized Prompt
                    </h3>
                    <div className="bg-[#050505] p-4 rounded-xl border border-white/10 group hover:border-purple-500/30 transition-colors">
                      <p className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap selection:bg-purple-500/30">
                        {selectedItem.prompt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-[#0a0a0a] border-t border-white/10 z-20 pb-safe">
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleTryStyle(selectedItem.prompt)}
                    className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 text-white active:scale-95"
                  >
                    <Sparkles size={18} fill="currentColor" />{" "}
                    {t("generateButton")}
                  </button>
                  <button
                    onClick={() =>
                      handleCopy(selectedItem.prompt, selectedItem.id)
                    }
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border transition active:scale-95 ${copiedId === selectedItem.id ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"}`}
                  >
                    {copiedId === selectedItem.id ? (
                      <Check size={18} />
                    ) : (
                      <Copy size={18} />
                    )}{" "}
                    {copiedId === selectedItem.id
                      ? t("copied")
                      : t("copyPrompt")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pt-24 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        <header className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            {t.rich("title", {
              span1: (chunks) => (
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <p className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("seoDescription") ||
              "Browse our curated collection of high-quality anime AI art prompts. Perfect for Stable Diffusion, Midjourney, and Niji Journey."}
          </p>
          <div className="relative max-w-2xl mx-auto group mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
            <div className="relative z-10 flex items-center bg-[#111] border border-white/10 rounded-full p-1.5 md:p-2 shadow-2xl">
              <Search className="ml-4 text-gray-500 shrink-0" size={20} />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
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
            {[
              "Anime",
              "Girl",
              "Cyberpunk",
              "Kawaii",
              "Landscape",
              "Portrait",
              "Mecha",
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] md:text-xs text-gray-300 hover:border-purple-500 hover:text-purple-400 transition"
              >
                {t(`tags.${tag}` as any) || tag}
              </button>
            ))}
          </div>
        </header>

        <main className="mb-24">
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 mx-auto">
            {filteredPrompts.map((item) => (
              <PromptCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
                onTryStyle={(e) => handleTryStyle(item.prompt, e)}
                onCopy={handleCopy}
                copiedId={copiedId}
              />
            ))}
          </div>
          {filteredPrompts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">
                No prompts found matching your search.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-purple-400 hover:text-purple-300 underline"
              >
                Clear search
              </button>
            </div>
          )}
        </main>

        <section className="mb-24 py-12 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              {t("featuresTitle") || "Why Use Our Anime Prompts?"}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t("featuresDesc") ||
                "Curated for high consistency and beautiful aesthetics."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-purple-500/20 transition group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="text-purple-400" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">
                Curated Styles
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                From Makoto Shinkai landscapes to 90s retro aesthetics, explore
                a diverse library.
              </p>
            </div>
            <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-purple-500/20 transition group">
              <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="text-pink-400" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">
                Ready to Remix
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Copy our optimized prompts and simply change the character or
                setting.
              </p>
            </div>
            <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-purple-500/20 transition group">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="text-blue-400" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">
                High Quality Tags
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Includes "masterpiece", "best quality" tags for crispest
                details.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0a0a0c] border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                {t("guideSection.title")}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t("guideSection.subtitle")}
              </p>
            </div>
            <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="text-yellow-400" size={20} />
                {t("guideSection.formulaTitle")}
              </h3>
              <div className="flex flex-wrap gap-3 font-mono text-sm">
                <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 px-4 py-3 rounded-lg flex-1 min-w-[140px]">
                  <span className="block text-[10px] uppercase text-yellow-500/70 font-bold mb-1">
                    1. Quality
                  </span>
                  masterpiece, best quality
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 text-blue-200 px-4 py-3 rounded-lg flex-[2] min-w-[200px]">
                  <span className="block text-[10px] uppercase text-blue-500/70 font-bold mb-1">
                    2. Subject
                  </span>
                  1girl, white hair
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 text-purple-200 px-4 py-3 rounded-lg flex-1 min-w-[140px]">
                  <span className="block text-[10px] uppercase text-purple-500/70 font-bold mb-1">
                    3. Style
                  </span>
                  anime style, cel shading
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#121214] p-6 rounded-xl border border-white/5">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Zap size={16} className="text-yellow-400" />
                  {t("guideSection.qualityBoosters")}
                </h4>
                <div className="bg-black/40 p-3 rounded font-mono text-xs text-gray-300 border border-white/5">
                  masterpiece, best quality, ultra-detailed, 8k resolution
                </div>
              </div>
              <div className="bg-[#121214] p-6 rounded-xl border border-white/5">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <X size={16} className="text-red-400" />
                  {t("guideSection.negativePrompts")}
                </h4>
                <div className="bg-black/40 p-3 rounded font-mono text-xs text-red-200/70 border border-white/5">
                  worst quality, low quality, bad anatomy, bad hands
                </div>
              </div>
              <div className="bg-[#121214] p-6 rounded-xl border border-white/5">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Lightbulb size={16} className="text-blue-400" />
                  {t("guideSection.lighting")}
                </h4>
                <div className="bg-black/40 p-3 rounded font-mono text-xs text-gray-300 border border-white/5">
                  cinematic lighting, volumetric light, backlighting
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-8">
            <HelpCircle className="text-gray-500" size={20} />
            <h2 className="text-2xl font-bold text-white">FAQ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "Can I use these prompts for Midjourney?",
                a: "Yes! Optimized for Midjourney, Stable Diffusion, and DALL-E.",
              },
              {
                q: "What is a negative prompt?",
                a: "It tells the AI what NOT to include, like 'bad hands' or 'low quality'.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5"
              >
                <h3 className="font-bold text-white mb-2 text-sm">{faq.q}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
