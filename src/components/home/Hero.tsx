"use client";

import { motion } from "framer-motion";
import { PenTool, ImagePlus, Search, Sparkles, ArrowRight } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const styleTags = ["Waifu", "Chibi", "Pony Diffusion", "Animagine XL", "Niji Style"];

  const handleTagClick = (tag: string) => {
    router.push(`/generator?prompt=${encodeURIComponent(tag)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPath = inputValue.trim()
      ? `/generator?prompt=${encodeURIComponent(inputValue)}`
      : "/generator";
    router.push(targetPath);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#030305] font-sans selection:bg-indigo-500/30">

      <div className="absolute inset-0 z-0">
        <div className="w-full h-full scale-105">
          <AnimatedBackground />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030305] via-[#030305]/60 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent z-[1]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center pt-20">
        <div className="max-w-4xl">

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 hidden md:flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-6 py-3 rounded-2xl w-full max-w-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group focus-within:border-indigo-500/50 transition-all"
          >
            <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your dream... e.g. silver hair, cyberpunk"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-600 text-sm font-medium h-10"
            />
            <button type="submit" className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white transition-all shadow-lg shadow-indigo-600/20">
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {styleTags.map((tag, i) => (
              <button
                key={i}
                onClick={() => handleTagClick(tag)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] md:text-xs font-black text-zinc-400 uppercase tracking-[0.15em] backdrop-blur-md hover:bg-indigo-500/20 hover:text-white hover:border-indigo-500/50 transition-all active:scale-95"
              >
                {tag}
              </button>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-[100px] font-black text-white leading-[0.9] mb-8 tracking-tighter"
          >
            Best Anime <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_10px_10px_rgba(99,102,241,0.2)]">
              AI Generator
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <p className="text-zinc-400 text-lg md:text-2xl max-w-2xl font-medium leading-relaxed">
              Create <span className="text-white border-b-2 border-indigo-500/50 pb-1">waifu, chibi, & pony art</span> in seconds with the world's most advanced models.
            </p>

            <div className="flex flex-wrap gap-6 text-sm font-bold text-zinc-500 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-indigo-500" /> No sign-up</span>
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-500" /> No watermark</span>
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-pink-500" /> 4K Quality</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/generator" className="group">
                <div className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-2xl font-black text-lg transition-all duration-300 hover:bg-indigo-500 hover:text-white transform hover:scale-105 shadow-2xl">
                  <PenTool className="w-5 h-5" />
                  <span>Start Creating</span>
                </div>
              </Link>

              <Link href="/generator?mode=upload" className="group">
                <div className="flex items-center justify-center gap-3 px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-black text-lg transition-all duration-300 transform hover:scale-105">
                  <ImagePlus className="w-5 h-5" />
                  <span>Image to Image</span>
                </div>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />
    </section>
  );
}