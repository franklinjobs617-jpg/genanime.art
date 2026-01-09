"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Quote } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const originalCards = [
  {
    id: "waifu",
    title: "Anime Waifu Generator",
    image: "/feature-waifu.webp",
    prompt:
      "A beautiful anime waifu with long silver hair and glowing blue eyes, wearing a futuristic school uniform, standing in a cherry blossom park at sunset, cinematic lighting, high quality, detailed face, 8k resolution.",
    tags: ["Waifu", "Portrait"],
  },
  {
    id: "pony",
    title: "Pony Diffusion Style",
    image: "/feature-pony.webp",
    prompt:
      "Pony diffusion art style, vibrant colors, a cute anime girl with rainbow hair, dynamic pose, floating in a magical sky, stars and sparkles background, soft shading, dreamy atmosphere.",
    tags: ["Pony V6", "Vibrant"],
  },
  {
    id: "animagine",
    title: "Animagine XL Model",
    image: "/feature-animagine.webp",
    prompt:
      "Animagine XL style, a cyberpunk city street at night, neon signs reflecting in rain puddles, a mysterious anime character in a hoodie looking at a hologram, intricate details, volumetric lighting.",
    tags: ["Animagine", "Scenery"],
  },
  {
    id: "chibi",
    title: "Cute Chibi Maker",
    image: "/feature-chibi.webp",
    prompt:
      "A cute chibi character design, small body, big head, holding a bubble tea, pastel colors, white background, sticker art style, vector illustration, flat color, kawaii aesthetic.",
    tags: ["Chibi", "Sticker"],
  },
  {
    id: "photo",
    title: "Photo to Anime",
    image: "/feature-img2img.webp",
    prompt:
      "Turn photo into anime, studio ghibli art style, lush green meadow background, cumulus clouds, peaceful atmosphere, watercolor texture, hand-drawn feeling, vibrant greens and blues.",
    tags: ["Img2Img", "Filter"],
  },
  {
    id: "anime-portrait",
    title: "Anime Portrait Generator",
    image: "/feature-portrait.webp",
    prompt:
      "anime portrait illustration, upper body anime character, detailed expressive eyes, clean anime facial structure, soft lighting, simple background, sharp lineart, high resolution, pure 2D anime style, no realism",
    tags: ["Portrait", "Face", "Clean"],
  },
  {
    id: "anime-couple",
    title: "Anime Couple Art",
    image: "/feature-couple.webp",
    prompt:
      "anime couple illustration, romantic atmosphere, two anime characters standing close together, soft lighting, gentle expressions, clean background, detailed anime lineart, harmonious color palette, pure 2D anime style",
    tags: ["Couple", "Romance"],
  },
  {
    id: "anime-action",
    title: "Anime Action Scene",
    image: "/feature-action.webp",
    prompt:
      "dynamic anime action scene, powerful anime character in motion, dramatic pose, flowing hair and clothes, speed lines, strong contrast lighting, sharp anime lineart, high energy composition, pure 2D anime style",
    tags: ["Action", "Dynamic"],
  },
  {
    id: "anime-emoticons",
    title: "Anime Emoticons",
    image: "/feature-emoticons.webp",
    prompt:
      "anime icon, small avatar, kawaii expression, cute reaction face, minimalist anime style, transparent background, social media ready, simple but detailed",
    tags: ["Emoticons", "Kawaii"],
  },
  {
    id: "anime-cyberpunk",
    title: "Cyberpunk Anime Art",
    image: "/feature-cyberpunk.webp",
    prompt:
      "cyberpunk anime illustration, futuristic city at night, neon lights, holographic signs, anime character wearing tech outfit, rain reflections, high contrast lighting, clean anime lineart, pure 2D anime style",
    tags: ["Cyberpunk", "Sci-Fi"],
  },
  {
    id: "anime-school",
    title: "Anime School Scene",
    image: "/feature-school.webp",
    prompt:
      "anime school scene, japanese high school classroom, warm sunlight through windows, anime students chatting, clean background, soft anime lighting, detailed but simple composition, pure 2D anime style",
    tags: ["School", "Slice of Life"],
  },
  {
    id: "anime-idol",
    title: "Anime Idol Generator",
    image: "/feature-idol.webp",
    prompt:
      "anime idol character, cute stage outfit, colorful lights, confident pose, sparkling eyes, vibrant anime colors, clean lineart, idol concert atmosphere, pure 2D anime illustration",
    tags: ["Idol", "Music"],
  },
  {
    id: "anime-sticker-pack",
    title: "Anime Sticker Pack",
    image: "/feature-sticker.webp",
    prompt:
      "anime sticker pack, multiple cute anime expressions, chibi proportions, thick outlines, flat pastel colors, white background, emoji style, consistent character design, commercial friendly",
    tags: ["Sticker", "Emoji"],
  },
  {
    id: "fantasy-mage",
    title: "Fantasy Mage Generator",
    image: "/feature-mage.webp",
    prompt:
      "anime fantasy mage, magical girl with glowing staff, arcane symbols floating around, ethereal magic aura, intricate magical outfit design, glowing runes, fantasy spell effects, dark magical forest background, epic fantasy atmosphere, pure 2D anime style",
    tags: ["Fantasy", "Magic", "Mage"],
  },
  {
    id: "medieval-knight",
    title: "Medieval Knight Anime",
    image: "/feature-knight.webp",
    prompt:
      "anime medieval knight, shiny armor, elegant sword at hip, medieval castle courtyard background, dramatic sunlight, determined expression, flowing cape, detailed metal armor texture, classic fantasy anime style, epic heroic atmosphere",
    tags: ["Medieval", "Knight", "Fantasy"],
  },
  {
    id: "christmas-anime",
    title: "Christmas Anime Scene",
    image: "/feature-christmas.webp",
    prompt:
      "anime christmas scene, cute girl in santa outfit, snowy night background, Christmas tree with lights, falling snowflakes, warm indoor lighting from window, cozy holiday atmosphere, festive anime illustration, winter wonderland",
    tags: ["Christmas", "Holiday", "Winter"],
  },
];

const TypewriterInput = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    setDisplayedText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="w-full bg-transparent text-[#1a1a1a] text-[15px] leading-relaxed font-medium h-auto overflow-hidden break-words">
      <span>
        {displayedText}
        <span className="animate-pulse inline-block w-0.5 h-4 bg-purple-600 align-middle ml-0.5"></span>
      </span>
    </div>
  );
};

export default function FeatureSection() {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(originalCards.length / 2)
  );
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current)
        setContainerWidth(containerRef.current.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CARD_WIDTH_COLLAPSED = 280;
  const CARD_WIDTH_EXPANDED = 650;
  const GAP = 24;

  // ✅ 左右点击平滑动画计算 translateX
  const translateX = (() => {
    if (containerWidth === 0) return 0;
    let offset = 0;
    for (let i = 0; i < activeIndex; i++) {
      offset +=
        (i === activeIndex ? CARD_WIDTH_EXPANDED : CARD_WIDTH_COLLAPSED) + GAP;
    }
    return containerWidth / 2 - offset - CARD_WIDTH_EXPANDED / 2;
  })();

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold && activeIndex < originalCards.length - 1)
      setActiveIndex((prev) => prev + 1);
    else if (info.offset.x > threshold && activeIndex > 0)
      setActiveIndex((prev) => prev - 1);
  };

  return (
    <section className="py-16 md:py-32 bg-[#050505] overflow-hidden relative font-sans selection:bg-purple-500/30">
      {/* ===================== TITLE & SUBTITLE ===================== */}
      <div className="container mx-auto px-6 mb-12 md:mb-0 text-center">
        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-4">
          Create Stunning{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Anime Illustrations
          </span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">
          From Waifu to Cyberpunk, transform your ideas into high-quality anime
          illustrations in seconds – free, no login required.
        </p>
      </div>

      {/* ===================== MOBILE VIEW ===================== */}
      <div className="md:hidden w-full overflow-x-auto snap-x snap-mandatory flex gap-4 px-6 pb-12 scroll-smooth no-scrollbar">
        {originalCards.map((card, index) => (
          <div
            key={card.id}
            className="relative shrink-0 w-[88vw] snap-center flex flex-col group"
          >
            <div className="bg-[#121212] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl relative">
              <div className="relative aspect-[4/5] w-full">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 backdrop-blur-xl text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/10 tracking-wide">
                    {card.tags[0]}
                  </span>
                </div>
              </div>
              <div className="bg-white p-6 relative">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"></div>
                <div className="flex items-center gap-2 mb-3">
                  <Quote className="w-4 h-4 text-purple-500 fill-purple-500 rotate-180" />
                  <h3 className="text-zinc-900 font-bold text-lg tracking-tight">
                    {card.title}
                  </h3>
                </div>
                <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 mb-5">
                  <p className="text-zinc-600 text-[13px] leading-relaxed font-medium line-clamp-3">
                    {card.prompt}
                  </p>
                </div>
                <button className="w-full h-12 bg-[#1a1a1a] active:bg-black text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Generate with
                  this Prompt
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="w-2 shrink-0"></div>
      </div>

      {/* ===================== DESKTOP VIEW ===================== */}
      <div
        ref={containerRef}
        className="hidden md:flex w-full h-[750px] flex-col justify-center relative"
      >
        <motion.div
          className="flex items-center absolute left-0 h-full"
          animate={{ x: translateX }}
          drag="x"
          dragConstraints={{ left: -100000, right: 100000 }}
          onDragEnd={handleDragEnd}
          style={{ cursor: "grab" }}
          whileTap={{ cursor: "grabbing" }}
        >
          {originalCards.map((card, index) => {
            const isActive = index === activeIndex;
            // 渲染优化：只渲染可见范围
            if (Math.abs(activeIndex - index) > 5)
              return (
                <div
                  key={card.id}
                  style={{ width: CARD_WIDTH_COLLAPSED, marginRight: GAP }}
                />
              );
            return (
              <motion.div
                key={card.id}
                onClick={() => setActiveIndex(index)}
                className={`relative rounded-[32px] overflow-hidden shrink-0 bg-zinc-900 border border-white/5 cursor-pointer`}
                style={{ marginRight: GAP }}
                animate={{
                  width: isActive ? CARD_WIDTH_EXPANDED : CARD_WIDTH_COLLAPSED,
                  height: isActive ? 520 : 440,
                  filter: isActive ? "brightness(1)" : "brightness(0.4)",
                  zIndex: isActive ? 10 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />

                <div
                  className={`absolute bottom-8 left-8 transition-all duration-300 ${
                    isActive
                      ? "opacity-0 translate-y-4"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <span className="text-white text-2xl font-bold leading-tight drop-shadow-lg">
                    {card.title.split(" ").slice(0, 2).join("\n")}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Prompt Box */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          style={{ transform: `translate(-50%, 180px)` }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="bg-white/95 backdrop-blur-xl rounded-[24px] pointer-events-auto overflow-hidden relative"
              style={{
                width: CARD_WIDTH_EXPANDED - 60,
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.1), 0 25px 50px -12px rgba(0,0,0,0.5)",
              }}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
              <div className="p-6 flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-100 px-2 py-0.5 rounded-sm">
                    Ready-to-use Prompt
                  </span>
                  <span className="text-xs font-bold text-purple-600">
                    {originalCards[activeIndex].tags[0]}
                  </span>
                </div>
                <div className="mb-2">
                  <TypewriterInput text={originalCards[activeIndex].prompt} />
                </div>
                <p className="text-[12px] text-zinc-500 mb-4">
                  Generates a complete anime illustration in seconds.
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-zinc-100">
                  <button className="px-4 py-2 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-600 text-xs font-semibold hover:bg-zinc-100 hover:text-purple-600 transition-colors">
                    Customize Prompt
                  </button>
                  <div className="flex flex-col items-end gap-1">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-[#111] hover:bg-black text-white text-sm font-bold rounded-full transition-all active:scale-95 shadow-lg">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      Generate Image Now
                    </button>
                    <span className="text-[10px] text-zinc-400">
                      Free · No login required
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
