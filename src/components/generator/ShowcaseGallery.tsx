"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight, Sparkles, Zap, ImageIcon } from "lucide-react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";

// --- SEO 优化的数据源 ---
const SHOWCASE_ITEMS = [
  // SEO 优化的测试图片
  {
    id: "elegant-anime-portrait-digital-art",
    title: "Elegant Anime Portrait Digital Art",
    prompt: "Beautiful anime girl with long flowing hair, elegant dress, soft lighting, detailed facial features, high quality digital art, masterpiece",
    style: "Portrait",
    ratio: "9:16",
    image: "/gallery/elegant-anime-portrait-digital-art.webp",
  },
  {
    id: "fantasy-anime-character-magical", 
    title: "Fantasy Anime Character with Magical Elements",
    prompt: "Anime fantasy character with magical elements, detailed costume design, vibrant colors, cinematic lighting, high resolution artwork",
    style: "Fantasy",
    ratio: "9:16", 
    image: "/gallery/fantasy-anime-character-magical-elements.webp",
  },
  {
    id: "modern-anime-character-urban",
    title: "Modern Anime Character Urban Style",
    prompt: "Contemporary anime character design, modern clothing, urban background, stylish composition, professional digital illustration",
    style: "Modern",
    ratio: "9:16",
    image: "/gallery/modern-anime-character-urban-style.webp", 
  },
  {
    id: "artistic-anime-character-creative",
    title: "Artistic Anime Character Creative Design",
    prompt: "Creative anime artwork with unique artistic style, expressive character design, dynamic pose, high quality rendering",
    style: "Artistic",
    ratio: "9:16",
    image: "/gallery/artistic-anime-character-creative-design.webp",
  },
  {
    id: "detailed-anime-character-study", 
    title: "Detailed Anime Character Study Art",
    prompt: "Detailed anime character study, focus on expression and personality, refined art style, professional quality illustration",
    style: "Study",
    ratio: "9:16",
    image: "/gallery/detailed-anime-character-study-art.webp",
  },
  {
    id: "stylized-anime-character-unique",
    title: "Stylized Anime Character Unique Design", 
    prompt: "Stylized anime character with unique design elements, creative composition, vibrant color palette, high detail artwork",
    style: "Stylized",
    ratio: "9:16",
    image: "/gallery/stylized-anime-character-unique-design.webp",
  },
  {
    id: "dynamic-anime-action-pose",
    title: "Dynamic Anime Action Pose Art",
    prompt: "Anime character in dynamic action pose, detailed anatomy, flowing movement, cinematic composition, masterpiece quality",
    style: "Action", 
    ratio: "9:16",
    image: "/gallery/dynamic-anime-action-pose-art.webp",
  },
  {
    id: "expressive-anime-character-emotional",
    title: "Expressive Anime Character Emotional Art",
    prompt: "Expressive anime character with emotional depth, detailed facial features, artistic lighting, high quality digital painting",
    style: "Expressive",
    ratio: "9:16", 
    image: "/gallery/expressive-anime-character-emotional-art.webp",
  },
  {
    id: "creative-anime-character-innovative",
    title: "Creative Anime Character Innovative Style",
    prompt: "Creative anime character design with unique elements, innovative art style, detailed rendering, professional illustration",
    style: "Creative",
    ratio: "9:16",
    image: "/gallery/creative-anime-character-innovative-style.webp",
  },
  {
    id: "anime-masterpiece-exceptional-quality",
    title: "Anime Masterpiece Exceptional Quality Art",
    prompt: "High quality anime masterpiece, exceptional detail, perfect composition, professional digital art, stunning visual quality",
    style: "Masterpiece", 
    ratio: "9:16",
    image: "/gallery/anime-masterpiece-exceptional-quality-art.webp",
  },
  
  // 新添加的压缩图片 - SEO 优化
  {
    id: "anime-portrait-masterpiece-digital",
    title: "Anime Portrait Masterpiece Digital Art",
    prompt: "Beautiful anime character portrait with detailed facial features, expressive eyes, soft lighting, high quality digital illustration, masterpiece artwork",
    style: "Portrait",
    ratio: "3:4",
    image: "/gallery/anime-portrait-masterpiece-digital-art.jpg",
  },
  {
    id: "anime-character-design-vibrant", 
    title: "Anime Character Design Vibrant Colors",
    prompt: "Detailed anime character design with unique styling, vibrant colors, professional digital art, high resolution illustration",
    style: "Character",
    ratio: "3:4",
    image: "/gallery/anime-character-design-vibrant-colors.jpg",
  },
  {
    id: "high-quality-anime-digital-artwork",
    title: "High Quality Anime Digital Artwork",
    prompt: "High quality anime digital artwork, detailed character illustration, professional rendering, artistic composition, masterpiece quality",
    style: "Digital Art",
    ratio: "3:4",
    image: "/gallery/high-quality-anime-digital-artwork.jpg",
  },
  {
    id: "professional-anime-illustration", 
    title: "Professional Anime Illustration Art",
    prompt: "Professional anime illustration with detailed character design, vibrant colors, high quality digital painting, artistic excellence",
    style: "Illustration",
    ratio: "3:4",
    image: "/gallery/professional-anime-illustration-art.jpg",
  },

  // 最新添加的新图片 - SEO 优化
  {
    id: "anime-character-portrait-detailed",
    title: "Anime Character Portrait Detailed Art",
    prompt: "Detailed anime character portrait with expressive features, professional digital art, high quality illustration, masterpiece artwork",
    style: "Portrait",
    ratio: "9:16",
    image: "/gallery/anime-character-portrait-detailed-art.webp",
  },
  {
    id: "fantasy-anime-girl-magical", 
    title: "Fantasy Anime Girl Magical Style",
    prompt: "Fantasy anime girl with magical elements, enchanting design, vibrant colors, detailed character illustration, high quality digital art",
    style: "Fantasy",
    ratio: "9:16",
    image: "/gallery/fantasy-anime-girl-magical-style.webp",
  },
  {
    id: "beautiful-anime-character-digital",
    title: "Beautiful Anime Character Digital Painting",
    prompt: "Beautiful anime character digital painting, detailed artwork, professional illustration, high quality rendering, artistic masterpiece",
    style: "Digital Art",
    ratio: "9:16",
    image: "/gallery/beautiful-anime-character-digital-painting.webp",
  },
  {
    id: "artistic-anime-illustration-masterpiece", 
    title: "Artistic Anime Illustration Masterpiece",
    prompt: "Artistic anime illustration masterpiece, exceptional detail, professional digital art, high quality character design, stunning artwork",
    style: "Masterpiece",
    ratio: "3:4",
    image: "/gallery/artistic-anime-illustration-masterpiece.jpg",
  },
  {
    id: "stylish-anime-girl-character",
    title: "Stylish Anime Girl Character Design",
    prompt: "Stylish anime girl character design, modern aesthetic, detailed illustration, professional digital art, high quality artwork",
    style: "Character",
    ratio: "9:16",
    image: "/gallery/stylish-anime-girl-character-design.webp",
  },
  {
    id: "premium-anime-artwork-quality", 
    title: "Premium Anime Artwork High Quality",
    prompt: "Premium anime artwork high quality, exceptional detail, professional illustration, masterpiece digital art, stunning character design",
    style: "Premium",
    ratio: "9:16",
    image: "/gallery/premium-anime-artwork-high-quality.webp",
  },

  // 原有的经典图片
  {
    id: "tpl-10",
    title: "Abstract Digital Art",
    prompt: `(Subject:1.5): A breathtakingly beautiful and elegant 1/7 scale anime girl figure. (Outfit:1.4): Wearing a sophisticated summer-themed fantasy dress, featuring semi-transparent light blue silk layers, delicate lace ruffles, and elegant silver embroidery, sleeveless design with a stylish choker, perfectly balanced elegance and freshness. (Face:1.4): Exquisite facial features, large sparkling sapphire eyes, soft natural makeup, a gentle and captivating smile. (Hair:1.3): Long flowing silver hair with a slight translucent effect at the tips, decorated with small pearl hairpins.
(Environment): Placed on a realistic modern computer desk, circular transparent acrylic base with no text.
(Background): A large 4K monitor displaying the professional ZBrush modeling interface with the 3D sculpt of this figure, showing intricate mesh details. Next to the monitor, a premium TAMIYA-style packaging box with the beautiful character illustration.
(Quality): Masterpiece, 8k resolution, photorealistic, cinematic lighting, soft studio shadows, subsurface scattering for skin, depth of field, sharp focus on the figure, high-end collector's item aesthetic.`,
    style: "",
    ratio: "1:1",
    image: "/gallery/genanime-art-elegant-summer-oc-figure-pro-setup.webp",
  },

  {
    id: "tpl-13",
    title: "Minimalist Sumi-e",
    prompt:
      "Minimalist anime character design using traditional Japanese ink wash (Sumi-e) techniques. A graceful female warrior, only essential lines and shadows, elegant flow, negative space. Splashes of black ink, high-quality paper texture, Zen-like atmosphere. Sophisticated and modern.",
    style: "Ink Wash",
    ratio: "9:16",
    image: "/gallery/minimalist-anime-warrior-ink-wash-sumie.webp",
  },
  {
    id: "tpl-14",
    title: "Glitch-core Cyber",
    prompt:
      "Edgy anime character in a Glitch-core and Cyber-goth style. A character with digital distortion effects, chromatic aberration, scan lines, and neon green accents. Dark aesthetic, tech-wear fashion, fragmented visuals, high energy. Unique and experimental.",
    style: "Glitch Art",
    ratio: "9:16",
    image: "/gallery/edgy-anime-girl-glitch-core-cyber-goth.webp",
  },

  {
    id: "tpl-19",
    title: "Watercolor Sketch",
    prompt:
      "Artistic anime character in a loose watercolor and pencil sketch style. A girl with a soft smile, delicate washes of color, intentional pencil marks, and paper texture. Ethereal, light, and full of personality. High-end editorial illustration feel.",
    style: "Watercolor",
    ratio: "9:16",
    image: "/gallery/artistic-anime-girl-watercolor-pencil-sketch.webp",
  },
  {
    id: "tpl-20",
    title: "Neon Noir Detective",
    prompt:
      "Neon-noir anime character portrait. A detective-like character in a dark city, illuminated by harsh pink and blue neon lights. High contrast, deep shadows, cinematic composition, rain effects. Moody and stylish.",
    style: "Neon Noir",
    ratio: "9:16",
    image: "/gallery/neon-noir-anime-detective-portrait.webp",
  },
  {
    id: "tpl-21",
    title: "Summer Bikini Beach",
    prompt: "High-quality anime illustration of a beautiful girl in a stylish white bikini on a tropical beach. Sun-kissed skin, sparkling turquoise water, palm trees in the background. Golden hour lighting, lens flare, wet skin texture, vibrant colors, masterpiece.",
    style: "Summer Allure",
    ratio: "9:16",
    image: "/gallery/anime-summer-bikini-beach.webp",
  },
  {
    id: "tpl-22",
    title: "Poolside Elegance",
    prompt: "Stunning anime girl lounging by a luxury infinity pool. Wearing a fashionable translucent sarong over a sleek black swimsuit. Crystal clear water reflections, summer cocktail on the side, sophisticated and alluring atmosphere. High detail, soft shadows.",
    style: "Luxury Swimwear",
    ratio: "9:16",
    image: "/gallery/anime-poolside-summer.webp",
  },
  {
    id: "tpl-23",
    title: "Succubus Aesthetic",
    prompt: "Dark and alluring anime succubus character. Minimalist gothic outfit with lace details, small wings, and a playful tail. Dimly lit room with purple neon accents, mysterious and seductive gaze, high-end digital art style, sharp focus.",
    style: "Dark Allure",
    ratio: "9:16",
    image: "/gallery/anime-succubus-aesthetic.webp",
  },
  {
    id: "tpl-24",
    title: "Onsen Intimacy",
    prompt: "Beautiful anime girl at a traditional Japanese hot spring (onsen). Wearing a loose, slightly open yukata, steam rising around her, blushing cheeks, wet hair. Serene and intimate atmosphere, soft painterly textures, high artistic quality.",
    style: "Traditional Allure",
    ratio: "9:16",
    image: "/gallery/anime-hot-spring-yukata.webp",
  },

  {
    id: "tpl-26",
    title: "Matsuri Summer Kimono",
    prompt: "Attractive anime girl at a summer festival (Matsuri). Wearing a thin, breathable summer kimono, holding a fan, fireworks exploding in the night sky. Warm glow from lanterns, joyful and charming expression, high resolution.",
    style: "Festival Allure",
    ratio: "9:16",
    image: "/gallery/anime-summer-festival-girl.webp",
  },

  {
    id: "tpl-28",
    title: "Lingerie Morning Light",
    prompt: "Elegant anime girl in a sophisticated silk and lace lingerie set. Soft morning light through a window, ethereal atmosphere, delicate textures, gentle and captivating expression. High-end editorial style, soft focus background.",
    style: "Elegant Allure",
    ratio: "9:16",
    image: "/gallery/anime-lingerie-aesthetic.webp",
  },
  {
    id: "tpl-29",
    title: "Beach Volleyball Action",
    prompt: "Dynamic shot of an attractive anime girl playing beach volleyball. Wearing a sporty bikini, sand flying, intense action pose, bright sunlight. High energy, vibrant colors, detailed anatomy.",
    style: "Sporty Allure",
    ratio: "9:16",
    image: "/gallery/anime-beach-volleyball.webp",
  },
  {
    id: "tpl-30",
    title: "Night Pool Party",
    prompt: "Glamorous anime girl at a night pool party. Wearing a glittering swimsuit, neon pool lights, bokeh background of city lights. Confident and seductive look, cinematic lighting, high-quality digital painting.",
    style: "Nightlife Allure",
    ratio: "9:16",
    image: "/gallery/anime-night-pool-party.webp",
  },
];

interface ShowcaseGalleryProps {
  onSelect: (item: { prompt: string; style: string; ratio: string }) => void;
}

// --- 内部优化组件: ShowcaseItem ---
const ShowcaseItem = ({ 
  item, 
  onSelect 
}: { 
  item: typeof SHOWCASE_ITEMS[0]; 
  onSelect: () => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 处理比例字符串 "9:16" -> "9 / 16"
  const aspectRatio = item.ratio ? item.ratio.replace(':', '/') : '3/4';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      className="mb-4 md:mb-6 group relative cursor-pointer"
      onClick={onSelect}
    >
      <div 
        className="relative w-full rounded-2xl overflow-hidden bg-[#121217] border border-white/5 group-hover:border-indigo-500/50 transition-all duration-300 shadow-md group-hover:shadow-xl group-hover:shadow-indigo-500/10"
        style={{ aspectRatio }}
      >
        {/* 骨架屏 - 加载前显示 */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center z-0">
            <ImageIcon className="w-8 h-8 text-zinc-800" />
          </div>
        )}

        {/* 错误回退 */}
        {hasError && (
           <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center flex-col gap-2 text-zinc-500">
             <ImageIcon className="w-8 h-8" />
             <span className="text-xs">Image unavailable</span>
           </div>
        )}

        <img
          src={item.image}
          alt={`${item.title} - High quality anime art illustration`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* 悬停遮罩与内容 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
             <div className="flex items-center gap-2 mb-1">
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-indigo-500/30">
                  {item.style || "Remix"}
                </span>
                {item.ratio && <span className="text-[10px] text-zinc-400 font-mono">{item.ratio}</span>}
             </div>
             <h3 className="text-white font-bold text-sm leading-tight line-clamp-1 mb-3">{item.title || "Untitled Creation"}</h3>
             
             <button className="w-full bg-white text-black py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
               <Zap className="w-3 h-3 fill-current" />
               Use this Style
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ShowcaseGallery({ onSelect }: ShowcaseGalleryProps) {
  const breakpointColumnsObj = {
    default: 4,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 2 
  };

  return (
    <div className="w-full space-y-12 py-12 pb-32">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3 px-4">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight font-outfit">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse">
            Inspiration Gallery
          </span>
        </h2>
        <p className="text-zinc-500 text-sm md:text-base font-medium max-w-lg">
          Discover and remix masterpiece creations from the community
        </p>
      </div>

      {/* Masonry Layout - 优化核心 */}
      <div className="px-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-3 md:-ml-6"
          columnClassName="pl-3 md:pl-6 bg-clip-padding"
        >
          {SHOWCASE_ITEMS.map((item, idx) => (
            <ShowcaseItem
              key={`${item.id}-${idx}`}
              item={item}
              onSelect={() => onSelect(item)}
            />
          ))}
        </Masonry>
      </div>

      {/* View Full Library Button */}
      <div className="flex justify-center pt-8">
        <Link
          href="/prompt-library"
          className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 rounded-2xl transition-all duration-300"
        >
          <Sparkles className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
          <span className="text-sm font-bold text-zinc-400 group-hover:text-white uppercase tracking-widest">
            View Full Library
          </span>
          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
}