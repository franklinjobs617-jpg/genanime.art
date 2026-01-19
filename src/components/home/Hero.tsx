"use client";

import { motion } from "framer-motion";
import { PenTool, ImagePlus, Search, Sparkles, ArrowRight } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import { useRouter } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations('Hero');
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  // 高质量主提示词映射
  const stylePrompts: Record<string, string> = {
    "Waifu": "masterpiece, best quality, 1girl, solo, anime style, detailed eyes, flowing hair, cinematic lighting, soft shadows, elegant dress, fantasy background, magical aura, perfect face, smooth skin, vibrant colors, sharp focus, studio quality, professional digital artwork",
    "Chibi": "masterpiece, best quality, chibi character, kawaii, adorable, super cute, small body, big head, large expressive eyes, tiny limbs, round cheeks, playful pose, colorful background, soft pastel colors, detailed facial features, charming smile, innocent look, anime style, studio quality",
    "Pony Diffusion": "masterpiece, best quality, official art, unity 8k wallpaper, highly detailed, vibrant colors, aesthetic masterpiece, dynamic pose, fantasy setting, magical lighting, detailed armor, ornate clothing, ethereal atmosphere, professional digital painting, sharp focus, smooth skin, perfect composition",
    "Animagine XL": "masterpiece, best quality, official art, unity 8k wallpaper, highly detailed, vibrant colors, aesthetic masterpiece, realistic lighting, detailed textures, cinematic composition, sharp focus, professional digital artwork, perfect anatomy, smooth skin, elaborate costume design",
    "Niji Style": "masterpiece, best quality, niji style, anime style, soft pastel colors, dreamy atmosphere, fantasy setting, detailed background, ethereal lighting, cute character, magical girl style, watercolor texture, hand-drawn feeling, soft brush strokes, delicate details"
  };

  const styleTags = Object.keys(stylePrompts);

  const handleTagClick = (tag: string) => {
    const prompt = stylePrompts[tag] || tag;
    setInputValue(tag);
    
    // Map tags to appropriate models
    let model = "Seedream 4.0";
    if (tag.toLowerCase().includes("pony")) {
      model = "Pony Diffusion";
    } else if (tag.toLowerCase().includes("animagine")) {
      model = "Animagine XL";
    } else if (tag.toLowerCase().includes("niji")) {
      model = "Niji Style";
    }
    
    router.push(`/generator?prompt=${encodeURIComponent(prompt)}&model=${encodeURIComponent(model)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPath = inputValue.trim()
      ? `/generator?prompt=${encodeURIComponent(inputValue)}`
      : "/generator";
    router.push(targetPath);
  };

  return (
    // 修改 1: 
    // - 移除 overflow-hidden / overflow-x-hidden
    // - 保持 min-h-screen 确保至少占满一屏
    // - 使用 relative 确保内容层级正确
    <section className="relative w-full min-h-screen bg-[#030305] font-sans selection:bg-indigo-500/30 flex flex-col overflow-hidden">

      {/* 
         修改 2: 背景层改为 absolute (绝对定位)
         让背景跟随容器滚动。
      */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full scale-105">
          <AnimatedBackground />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030305] via-[#030305]/60 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent z-[1]" />
      </div>

      {/* 
         内容层: 
         py-24 确保上下有足够呼吸空间，不会被切断
      */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center py-24 md:py-32">
        <div className="max-w-4xl">

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 hidden md:flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-6 py-3 rounded-2xl w-full max-w-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group focus-within:border-indigo-500/50 transition-all"
          >
            <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('searchPlaceholder')}
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
            className="flex flex-wrap gap-2 mb-6 md:mb-8"
          >
            {styleTags.map((tag, i) => (
              <button
                key={i}
                onClick={() => handleTagClick(tag)}
                title={`Generate with ${tag} style`}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] md:text-xs font-black text-zinc-400 uppercase tracking-[0.15em] backdrop-blur-md hover:bg-indigo-500/20 hover:text-white hover:border-indigo-500/50 transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl sm:text-6xl md:text-[100px] font-black text-white leading-[0.95] md:leading-[0.9] mb-6 md:mb-8 tracking-tighter"
          >
            {t('titleLine1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_10px_10px_rgba(99,102,241,0.2)]">
              {t('titleLine2')}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 md:space-y-8"
          >
            <p className="text-zinc-400 text-base md:text-2xl max-w-2xl font-medium leading-relaxed">
              {t.rich('description', {
                span1: (chunks) => <span className="text-white border-b-2 border-indigo-500/50 pb-1">{chunks}</span>
              })}
            </p>

            <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-indigo-500" /> {t('features.noSignUp')}</span>
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-500" /> {t('features.noWatermark')}</span>
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-pink-500" /> {t('features.quality')}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-2">
              <button
                onClick={() => router.push("/generator")}
                className="group"
              >
                <div className="flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white text-black rounded-2xl font-black text-base md:text-lg transition-all duration-300 hover:bg-indigo-500 hover:text-white transform hover:scale-105 shadow-2xl">
                  <PenTool className="w-5 h-5" />
                  <span>{t('buttons.startCreating')}</span>
                </div>
              </button>

              <Link href="/generator?mode=upload" className="group">
                <div className="flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-black text-base md:text-lg transition-all duration-300 transform hover:scale-105">
                  <ImagePlus className="w-5 h-5" />
                  <span>{t('buttons.imageToImage')}</span>
                </div>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}