"use client";

import { motion } from "framer-motion";
import { PenTool, ImagePlus, Search, Sparkles, ArrowRight } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";
import { useRouter } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/generator?prompt=${encodeURIComponent(inputValue.trim())}`);
    } else {
      router.push("/generator");
    }
  };
  // 高质量主提示词映射
  const stylePrompts: Record<string, string> = {
    Waifu:
      "masterpiece, best quality, absurdres, 8k, ultra detailed, high resolution, perfect lighting, 1girl, solo, beautiful detailed eyes, beautiful detailed face, elegant beautiful detailed hair, intricate elegant clothes, detailed background, soft smooth skin, perfect detailed hands, aesthetic beauty, studio quality, professional digital art, soft bloom light, cinematic lighting, bokeh, film grain, atmospheric, dynamic pose, vivid colors, ultra sharp focus, ornate, exquisite, refined, glowing eyes, perfect eyelashes, beautiful detailed lips, jewelry, accessories, elegant dress, fantasy setting, magic aura",
    Chibi:
      "masterpiece, best quality, absurdres, 8k, ultra detailed, high resolution, perfect lighting, chibi kawaii cute, adorable, super cute, small body, big head, large expressive beautiful eyes, tiny limbs, round cheeks, big cute eyes, cute face, happy cheerful expression, playful pose, colorful background, soft pastel colors, detailed facial features, charming smile, innocent look, anime style, studio quality, soft bloom light, magical atmosphere, fluffy hair, cute outfit, detailed accessories, professional digital art, round shiny eyes, big cute pupils, soft shadows, smooth gradients",
    "Pony Diffusion":
      "masterpiece, best quality, absurdres, 8k, ultra detailed, high resolution, perfect lighting, official art, unity 8k wallpaper, photorealistic, highly detailed, vibrant colors, aesthetic masterpiece, dynamic pose, fantasy setting, magical lighting, detailed armor, ornate clothing, intricate patterns, ethereal atmosphere, professional digital painting, sharp focus, smooth skin, perfect anatomy, detailed textures, epic composition, dramatic angle, ornate accessories, fantasy elements, magical particles, detailed environment, cinematic shot, character full body, detailed face, ornate weapons, fantasy creatures in background",
    "Animagine XL":
      "masterpiece, best quality, absurdres, 8k, ultra detailed, high resolution, perfect lighting, official art, unity 8k wallpaper, highly detailed, vibrant colors, aesthetic masterpiece, realistic lighting, detailed textures, cinematic composition, sharp focus, smooth skin, perfect anatomy, beautiful detailed eyes, intricate costume design, elaborate clothing, detailed background, fantasy setting, ethereal atmosphere, professional digital artwork, ornate details, exquisite beauty, stunning visuals, detailed hair strands, perfect shading, realistic skin texture, intricate fabric details",
    "Niji Style":
      "masterpiece, best quality, absurdres, 8k, ultra detailed, high resolution, perfect lighting, niji style, anime style, soft pastel colors, dreamy atmosphere, fantasy setting, detailed background, ethereal lighting, magical girl style, watercolor texture, hand-drawn feeling, soft brush strokes, delicate details, gentle bloom effect, soft shadows, dreamlike quality, fantasy elements, floral motifs, soft clouds, aesthetic beauty, professional digital art, magical particles, soft hair strands, glowing effects, fairy tale atmosphere, detailed accessories, cute character design",
  };

  const styleTags = Object.keys(stylePrompts);

  const handleTagClick = (tag: string) => {
    const prompt = stylePrompts[tag] || tag;
    setInputValue(prompt);

    let model = "Seedream 4.0";
    if (tag.toLowerCase().includes("pony")) {
      model = "Pony Diffusion";
    } else if (tag.toLowerCase().includes("animagine")) {
      model = "Animagine XL";
    } else if (tag.toLowerCase().includes("niji")) {
      model = "Niji Style";
    }

    router.push(
      `/generator?prompt=${encodeURIComponent(
        prompt
      )}&model=${encodeURIComponent(model)}`
    );
  };

  const handleStartCreating = () => {
    // 首次访问显示引导
    const hasVisited = localStorage.getItem('hasVisitedGenerator');
    if (!hasVisited) {
      setShowGuestGuide(true);
    } else {
      router.push("/generator");
    }
  };

  const handleGuestGuideClose = () => {
    setShowGuestGuide(false);
    localStorage.setItem('hasVisitedGenerator', 'true');
    router.push("/generator");
  };

  return (
    <section className="relative w-full min-h-screen bg-[#030305] font-sans selection:bg-indigo-500/30 flex flex-col">
      {/* 背景层 - 使用更高效的定位 */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full">
          <AnimatedBackground />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030305] via-[#030305]/60 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent z-[1]" />
      </div>

      {/* 内容层 - 优化移动端间距 */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 flex-grow flex flex-col justify-center py-16 sm:py-24 md:py-32">
        <div className="max-w-4xl">
          {/* 桌面端搜索框 */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8 hidden md:flex items-center gap-3 bg-white/5 backdrop-blur-2xl px-6 py-3 rounded-2xl w-full max-w-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group focus-within:border-indigo-500/50 transition-all"
          >
            <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-600 text-sm font-medium h-10"
            />
            <button
              type="submit"
              className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white transition-all shadow-lg shadow-indigo-600/20"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>

          {/* 样式标签 - 优化移动端显示 */}
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
                className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] sm:text-[10px] md:text-xs font-black text-zinc-400 uppercase tracking-[0.15em] backdrop-blur-md hover:bg-indigo-500/20 hover:text-white hover:border-indigo-500/50 transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
                {tag}
              </button>
            ))}
          </motion.div>

          {/* 主标题 - 优化移动端字体大小 */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[100px] font-black text-white leading-[0.95] md:leading-[0.9] mb-6 md:mb-8 tracking-tighter"
          >
            {t("titleLine1")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_10px_10px_rgba(99,102,241,0.2)]">
              {t("titleLine2")}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 md:space-y-8"
          >
            {/* 描述文字 - 优化移动端字体大小 */}
            <p className="text-zinc-400 text-sm sm:text-base md:text-2xl max-w-2xl font-medium leading-relaxed">
              {t.rich("description", {
                span1: (chunks) => (
                  <span className="text-white border-b-2 border-indigo-500/50 pb-1">
                    {chunks}
                  </span>
                ),
              })}
            </p>

            {/* 特性标签 - 优化移动端布局 */}
            <div className="flex flex-wrap gap-3 md:gap-6 text-[10px] sm:text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest">
              <span className="flex items-center gap-1.5 md:gap-2">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-indigo-500" />
                {t("features.noSignUp")}
              </span>
              <span className="flex items-center gap-1.5 md:gap-2">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
                {t("features.noWatermark")}
              </span>
              <span className="flex items-center gap-1.5 md:gap-2">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-pink-500" />
                {t("features.quality")}
              </span>
            </div>

            {/* 行动按钮 - 优化移动端布局 */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 pt-2">
              <button
                onClick={() => router.push("/generator")}
                className="group w-full sm:w-auto"
              >
                <div className="flex items-center justify-center gap-2 md:gap-3 px-6 sm:px-8 md:px-10 py-3 md:py-4 lg:py-5 bg-white text-black rounded-2xl font-black text-sm sm:text-base md:text-lg transition-all duration-300 hover:bg-indigo-500 hover:text-white transform hover:scale-105 shadow-2xl">
                  <PenTool className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{t("buttons.startCreating")}</span>
                </div>
              </button>

              <Link href="/generator?mode=upload" className="group w-full sm:w-auto">
                <div className="flex items-center justify-center gap-2 md:gap-3 px-6 sm:px-8 md:px-10 py-3 md:py-4 lg:py-5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-black text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105">
                  <ImagePlus className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{t("buttons.imageToImage")}</span>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
