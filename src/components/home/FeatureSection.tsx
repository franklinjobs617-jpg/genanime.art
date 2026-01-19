"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Quote } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

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
    id: "kimono_waifu",
    title: "Kimono Waifu Style",
    image: "/kimono-waifu-anime.webp",
    prompt:
      "Traditional kimono anime character, beautiful Japanese attire, elegant pose, soft background, classical Japanese setting, detailed fabric textures, refined aesthetic.",
    tags: ["Kimono", "Traditional"],
  },
  {
    id: "portrait",
    title: "Anime Portrait Generator",
    image: "/feature-portrait.webp",
    prompt:
      "anime portrait illustration, upper body anime character, detailed expressive eyes, clean anime facial structure, soft lighting, simple background, sharp lineart, high resolution, pure 2D anime style, no realism",
    tags: ["Portrait", "Face", "Clean"],
  },
  {
    id: "cyberpunk_waifu",
    title: "Cyberpunk Waifu Anime",
    image: "/cyberpunk-waifu-anime.webp",
    prompt:
      "A stunning cyberpunk anime waifu with neon-lit background, futuristic cityscape, vibrant glowing lights, high-tech outfit, dramatic lighting, detailed character design, 8k resolution.",
    tags: ["Cyberpunk", "Future"],
  },
  {
    id: "beach_waifu",
    title: "Beach Waifu Vacation",
    image: "/beach-waifu-anime.webp",
    prompt:
      "Relaxing beach anime scene, beautiful waifu in summer outfit, sunny weather, ocean waves, palm trees, vacation atmosphere, bright colors, cheerful mood.",
    tags: ["Beach", "Summer"],
  },
  {
    id: "bedroom_waifu",
    title: "Bedroom Waifu Comfort",
    image: "/bedroom-waifu-anime.webp",
    prompt:
      "Cozy bedroom anime scene, comfortable interior, soft lighting, intimate setting, peaceful atmosphere, homey environment, warm tones.",
    tags: ["Bedroom", "Interior"],
  },
  {
    id: "couple",
    title: "Anime Couple Art",
    image: "/feature-couple.webp",
    prompt:
      "anime couple illustration, romantic atmosphere, two anime characters standing close together, soft lighting, gentle expressions, clean background, detailed anime lineart, harmonious color palette, pure 2D anime style",
    tags: ["Couple", "Romance"],
  },
  {
    id: "action",
    title: "Anime Action Scene",
    image: "/feature-action.webp",
    prompt:
      "dynamic anime action scene, powerful anime character in motion, dramatic pose, flowing hair and clothes, speed lines, strong contrast lighting, sharp anime lineart, high energy composition, pure 2D anime style",
    tags: ["Action", "Dynamic"],
  },
  {
    id: "emoticons",
    title: "Anime Emoticons",
    image: "/feature-emoticons.webp",
    prompt:
      "anime icon, small avatar, kawaii expression, cute reaction face, minimalist anime style, transparent background, social media ready, simple but detailed",
    tags: ["Emoticons", "Kawaii"],
  },
  {
    id: "cyberpunk",
    title: "Cyberpunk Anime Art",
    image: "/feature-cyberpunk.webp",
    prompt:
      "cyberpunk anime illustration, futuristic city at night, neon lights, holographic signs, anime character wearing tech outfit, rain reflections, high contrast lighting, clean anime lineart, pure 2D anime style",
    tags: ["Cyberpunk", "Sci-Fi"],
  },
  {
    id: "school",
    title: "Anime School Scene",
    image: "/feature-school.webp",
    prompt:
      "anime school scene, japanese high school classroom, warm sunlight through windows, anime students chatting, clean background, soft anime lighting, detailed but simple composition, pure 2D anime style",
    tags: ["School", "Slice of Life"],
  },
  {
    id: "idol",
    title: "Anime Idol Generator",
    image: "/feature-idol.webp",
    prompt:
      "anime idol character, cute stage outfit, colorful lights, confident pose, sparkling eyes, vibrant anime colors, clean lineart, idol concert atmosphere, pure 2D anime illustration",
    tags: ["Idol", "Music"],
  },
  {
    id: "sticker",
    title: "Anime Sticker Pack",
    image: "/feature-sticker.webp",
    prompt:
      "anime sticker pack, multiple cute anime expressions, chibi proportions, thick outlines, flat pastel colors, white background, emoji style, consistent character design, commercial friendly",
    tags: ["Sticker", "Emoji"],
  },
  {
    id: "mage",
    title: "Fantasy Mage Generator",
    image: "/feature-mage.webp",
    prompt:
      "anime fantasy mage, magical girl with glowing staff, arcane symbols floating around, ethereal magic aura, intricate magical outfit design, glowing runes, fantasy spell effects, dark magical forest background, epic fantasy atmosphere, pure 2D anime style",
    tags: ["Fantasy", "Magic", "Mage"],
  },
  {
    id: "knight",
    title: "Medieval Knight Anime",
    image: "/feature-knight.webp",
    prompt:
      "anime medieval knight, shiny armor, elegant sword at hip, medieval castle courtyard background, dramatic sunlight, determined expression, flowing cape, detailed metal armor texture, classic fantasy anime style, epic heroic atmosphere",
    tags: ["Medieval", "Knight", "Fantasy"],
  },
  {
    id: "christmas",
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
  const router = useRouter();
  const t = useTranslations("FeatureSection");
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

  // 布局参数：收缩时变窄，展开时保持适中宽度但让高度更高
  const CARD_WIDTH_COLLAPSED = 260;
  const CARD_WIDTH_EXPANDED = 700;
  const GAP = 24;

  const translateX = (() => {
    if (containerWidth === 0) return 0;
    let offset = 0;
    for (let i = 0; i < activeIndex; i++) {
      offset += CARD_WIDTH_COLLAPSED + GAP;
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

  const handleGenerate = (prompt: string) => {
    router.push(`/generator?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <section className="py-16 md:py-32 bg-[#050505] overflow-hidden relative font-sans selection:bg-purple-500/30">
      <div className="container mx-auto px-6 mb-12 md:mb-16 text-center">
        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-4">
          {t.rich("title", {
            span1: (chunks) => (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {chunks}
              </span>
            ),
          })}
        </h1>
        <p className="text-zinc-400 text-sm md:text-lg max-w-2xl mx-auto font-medium">
          {t("subtitle")}
        </p>
      </div>

      {/* ===================== MOBILE VIEW ===================== */}
      <div className="md:hidden w-full overflow-x-auto snap-x snap-mandatory flex gap-4 px-4 pb-12 scroll-smooth no-scrollbar">
        {originalCards.map((card) => (
          <div
            key={card.id}
            className="relative shrink-0 w-[85vw] sm:w-[320px] snap-center flex flex-col group"
          >
            <div className="bg-[#121212] rounded-[28px] overflow-hidden border border-white/10 shadow-2xl relative">
              {/* 移动端优化：使用 aspect-[2/3] 更适合竖版动漫人物 */}
              <div className="relative aspect-[2/3] w-full bg-zinc-800">
                <Image
                  src={card.image}
                  alt={t(`cards.${card.id}` as any)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 85vw, 320px"
                  quality={85}
                  priority={false}
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-black/60 backdrop-blur-xl text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10 tracking-wide">
                    {card.tags[0]}
                  </span>
                </div>
              </div>
              <div className="bg-white p-5 relative">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"></div>
                <div className="flex items-center gap-2 mb-3">
                  <Quote className="w-3.5 h-3.5 text-purple-500 fill-purple-500 rotate-180" />
                  <h3 className="text-zinc-900 font-bold text-lg tracking-tight truncate">
                    {t(`cards.${card.id}` as any)}
                  </h3>
                </div>
                <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 mb-4 h-20 overflow-hidden relative">
                  <p className="text-zinc-600 text-[12px] leading-relaxed font-medium line-clamp-3">
                    {card.prompt}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-zinc-50 to-transparent pointer-events-none" />
                </div>
                <button
                  onClick={() => handleGenerate(card.prompt)}
                  className="w-full h-11 bg-[#1a1a1a] active:bg-black text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />{" "}
                  {t("buttons.generate")}
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
        className="hidden md:flex w-full h-[750px] flex-col justify-center relative touch-none"
      >
        <motion.div
          className="flex items-center absolute left-0 h-full"
          animate={{ x: translateX }}
          drag="x"
          dragConstraints={{
            left: -(originalCards.length * (CARD_WIDTH_COLLAPSED + GAP)),
            right: 100000,
          }}
          onDragEnd={handleDragEnd}
          style={{ cursor: "grab" }}
          whileTap={{ cursor: "grabbing" }}
        >
          {originalCards.map((card, index) => {
            const isActive = index === activeIndex;

            if (Math.abs(activeIndex - index) > 6)
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
                className={`relative rounded-[28px] overflow-hidden shrink-0 border border-white/5 cursor-pointer shadow-2xl bg-zinc-900`}
                style={{ marginRight: GAP }}
                animate={{
                  width: isActive ? CARD_WIDTH_EXPANDED : CARD_WIDTH_COLLAPSED,
                  height: isActive ? 580 : 420,
                  filter: isActive ? "brightness(1)" : "brightness(0.35)",
                  opacity: isActive ? 1 : 0.8,
                  zIndex: isActive ? 10 : 0,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
              >
                {/* 
                  核心修复：双层图片渲染
                  1. 底层：object-cover + 模糊，作为背景填充，防止黑边。
                  2. 顶层（仅活动时）：object-contain，保证完整显示不被裁切。
                */}
                <div className="w-full h-full relative overflow-hidden">
                  
                  {/* Layer 1: 背景填充 (Always visible) */}
                  <Image
                    src={card.image}
                    alt={t(`cards.${card.id}` as any)}
                    fill
                    className={`object-cover object-center transition-all duration-500 ${isActive ? 'blur-xl scale-110 opacity-60' : ''}`}
                    draggable={false}
                    sizes={isActive ? `${CARD_WIDTH_EXPANDED}px` : `${CARD_WIDTH_COLLAPSED}px`}
                  />
                  
                  {/* Layer 2: 完整主体 (Only for Active Card) */}
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-10"
                    >
                      <Image
                        src={card.image}
                        alt={t(`cards.${card.id}` as any)}
                        fill
                        className="object-contain drop-shadow-2xl" 
                        draggable={false}
                        sizes={`${CARD_WIDTH_EXPANDED}px`}
                        priority
                      />
                    </motion.div>
                  )}

                  {/* 非活动时的遮罩 */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                  )}
                </div>

                <div
                  className={`absolute bottom-8 left-8 right-8 transition-all duration-300 pointer-events-none z-20 ${
                    isActive
                      ? "opacity-0 translate-y-4"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <span className="text-white text-xl font-bold leading-tight drop-shadow-xl line-clamp-2">
                    {t(`cards.${card.id}` as any)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Prompt Box */}
        <div
          className="absolute top-1/2 left-1/2 z-30 pointer-events-none"
          // 向下移动，留出更多图片展示空间
          style={{ transform: `translate(-50%, 220px)` }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="bg-white/95 backdrop-blur-2xl rounded-[24px] pointer-events-auto overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              style={{
                width: Math.min(CARD_WIDTH_EXPANDED - 80, 600),
              }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
              <div className="p-6 flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
                      Prompt
                    </span>
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                      {originalCards[activeIndex].tags[0]}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4 min-h-[60px]">
                  <TypewriterInput text={originalCards[activeIndex].prompt} />
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-zinc-100/80">
                  <button
                    onClick={() =>
                      handleGenerate(originalCards[activeIndex].prompt)
                    }
                    className="px-4 py-2 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-600 text-xs font-bold hover:bg-zinc-100 hover:text-purple-600 transition-colors hover:border-purple-200"
                  >
                    Customize
                  </button>
                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      onClick={() =>
                        handleGenerate(originalCards[activeIndex].prompt)
                      }
                      className="group flex items-center gap-2 px-6 py-2.5 bg-[#0a0a0a] hover:bg-black text-white text-sm font-bold rounded-full transition-all active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
                    >
                      <Sparkles className="w-4 h-4 text-purple-400 group-hover:animate-pulse" />
                      {t("buttons.generate")}
                    </button>
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