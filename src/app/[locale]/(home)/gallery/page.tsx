"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ImageIcon,
  Video,
  Maximize2,
  Sparkles,
  Heart,
  Zap,
  X,
  Copy,
  Check,
  Loader2,
  Flame,
  TrendingUp,
  Download,
  Filter,
  Grid3X3,
  List,
  Star,
  Eye,
  Clock,
  Users,
  Award,
  Palette,
  Camera,
  Wand2,
} from "lucide-react";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

// --- 类型定义 ---
interface GalleryItem {
  id: string;
  title: string;
  author: string;
  image: string;
  aspect: string;
  prompt: string;
  likes: number;
  views?: number;
  style?: string;
  ratio?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  premium?: boolean;
}

interface FilterOption {
  id: string;
  label: string;
  count: number;
  icon?: React.ReactNode;
}

export default function GalleryPage() {
  const router = useRouter();
  const t = useTranslations("GalleryPage");
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");
  const [sortBy, setSortBy] = useState<"trending" | "newest" | "popular" | "featured">("trending");

  // 防止水合不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K 打开搜索
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }
      
      // ESC 关闭模态框
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // 无限滚动检测
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        // 这里可以加载更多内容
        console.log('Near bottom - could load more content');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 分类过滤器
  const filterOptions: FilterOption[] = [
    { id: "all", label: "All Styles", count: 120, icon: <Palette className="w-4 h-4" /> },
    { id: "waifu", label: "Waifu", count: 45, icon: <Heart className="w-4 h-4" /> },
    { id: "cyberpunk", label: "Cyberpunk", count: 28, icon: <Zap className="w-4 h-4" /> },
    { id: "fantasy", label: "Fantasy", count: 32, icon: <Wand2 className="w-4 h-4" /> },
    { id: "chibi", label: "Chibi", count: 15, icon: <Star className="w-4 h-4" /> },
  ];

  // --- 完整数据 ---
const baseImages: GalleryItem[] = [
    {
      id: "u1",
      title: "Ethereal Starlight Soul",
      author: "ManusArt",
      image: "/gallery/anime_ethereal_light.webp",
      aspect: "aspect-[3/4]",
      likes: 12500,
      views: 45600,
      category: "fantasy",
      tags: ["ethereal", "starlight", "cosmic", "cinematic"],
      featured: true,
      premium: true,
      prompt:
        "An ultra-detailed, breathtaking anime illustration of an ethereal girl with a surreal aesthetic. She has translucent, glowing skin and crystalline eyes that seem to hold infinite depth. Her hair is composed of flowing starlight and liquid gold. She is floating in a dark void surrounded by broken floating glass shards that reflect a vibrant cosmic nebula. The scene features extreme cinematic lighting with strong Tyndall effects (god rays) and slight chromatic aberration. The art style combines emotional character design with hyper-realistic, atmospheric environmental lighting.",
    },

    {
      id: "u2",
      title: "Zen Solitude at Dawn",
      author: "ManusArt",
      image: "/gallery/anime_zen_solitude.webp",
      aspect: "aspect-[4/3]",
      likes: 9800,
      views: 32100,
      category: "fantasy",
      tags: ["samurai", "zen", "dawn", "minimalist"],
      featured: true,
      prompt:
        "A cinematic, wide-shot digital illustration in a high-end semi-realistic anime style. A lone samurai girl stands on a vast frozen lake at dawn. The composition is minimalist and moody. The color palette is muted and desaturated, featuring a single, striking splash of crimson red on her outfit. Intricate details include falling cherry blossoms encased within the ice and soft morning mist swirling around. There is a sharp focus on the reflection in her blade. The atmosphere is melancholic yet beautiful, with hyper-detailed textures and dramatic lighting.",
    },

    {
      id: "u3",
      title: "Cyber Noir Ramen Night",
      author: "ManusArt",
      image: "/gallery/anime_cyber_noir.webp",
      aspect: "aspect-[2/3]",
      likes: 11200,
      views: 38900,
      category: "cyberpunk",
      tags: ["cyberpunk", "noir", "neon", "ramen"],
      featured: true,
      prompt:
        "A cinematic dark cyberpunk noir illustration of an anime girl with subtle mechanical enhancements. She is sitting in a neon-drenched ramen shop with heavy rain falling outside the window. Steam rises from the bowl, and neon signs reflect vividly in her eyes. The style features high contrast, deep shadows, and volumetric fog. The image is highly detailed, moody, and has a sleek, aesthetic anime character design.",
    },

    {
      id: "u4",
      title: "Floral Dream Submergence",
      author: "ManusArt",
      image: "/gallery/anime_floral_dream.webp",
      aspect: "aspect-[3/4]",
      likes: 10500,
      views: 29800,
      category: "fantasy",
      tags: ["floral", "underwater", "dreamy", "ethereal"],
      prompt:
        "An anime-style digital art masterpiece featuring a serene girl floating gently amidst a sea of glowing lilies. The scene has a dreamlike quality with vibrant yet harmonious colors and soft painterly brushstrokes. Sunlight filters through the scene as if underwater, with pearl-like bubbles rising. She wears a flowing silk dress. The image is high resolution with an ethereal atmosphere, reminiscent of soft, expressive character art.",
    },
    // 1. 核心商业/职场关键词 (Business Woman)
    {
      id: "1",
      title: "Business Woman Anime Art",
      author: "OfficeVibes",
      image: "/gallery/anime-business-woman-office.webp",
      aspect: "aspect-[2/3]",
      likes: 2890,
      views: 8900,
      category: "waifu",
      tags: ["business", "office", "professional", "mature"],
      prompt:
        "masterpiece, best quality, business woman anime art, mature female, office lady, wearing sharp white formal suit, black pencil skirt, glasses, holding a tablet, leaning against glass wall, modern high-rise office background, city skyline view, confident smile, professional lighting, sharp focus, detailed illustration --ar 3:4",
    },

    // 2. 校园/校服 (Waifu/School)
    {
      id: "2",
      title: "Anime Waifu Art",
      author: "WaifuHunter",
      image:
        "/gallery/anime-girl-sailor-uniform-school-hallway-masterpiece.webp",
      aspect: "aspect-[3/4]",
      likes: 3450,
      views: 12300,
      category: "waifu",
      tags: ["school", "uniform", "waifu", "golden hour"],
      featured: true,
      prompt:
        "masterpiece, best quality, anime waifu art, high school girl, sailor uniform, pleated skirt, long wind-blown hair, standing in school hallway, golden hour lighting, sunset streaming through windows, floating dust particles, sentimental atmosphere, detailed eyes, makoto shinkai style, emotional, lens flare --ar 2:3",
    },

    {
      id: "3",
      title: "Cyberpunk Anime Wallpaper",
      author: "NeonDreams",
      image:
        "/gallery/modern-anime-girl-iridescent-jacket-holographic-aesthetic.webp",
      aspect: "aspect-[3/5]",
      likes: 4100,
      views: 15600,
      category: "cyberpunk",
      tags: ["cyberpunk", "holographic", "neon", "futuristic"],
      premium: true,
      prompt:
        "best quality, cyberpunk anime wallpaper, futuristic city, neon lights, rain, iridescent jacket, holographic interface, chromatic aberration, cinematic lighting, ray tracing, sci-fi aesthetic, highly detailed background, 4k",
    },

    // 4. Q版/盲盒风格 (Chibi)
    {
      id: "4",
      title: "Chibi Character Design",
      author: "CuteMaker",
      image: "/gallery/chibi-magical-girl-anime-figure-toy-design-style.webp",
      aspect: "aspect-square",
      likes: 1200,
      views: 4500,
      category: "chibi",
      tags: ["chibi", "kawaii", "magical girl", "toy"],
      prompt:
        "chibi character design, super deformed, cute magical girl, big head small body, kawaii, sticker style, simple background, vibrant colors, expressive face, 3d toy render style, blender, smooth textures, blind box style",
    },

    // 5. 奇幻精灵 (Fantasy Elf)
    {
      id: "5",
      title: "Fantasy Elf Archer",
      author: "FantasyLab",
      image: "/gallery/fantasy-elf-archer-forest.webp",
      aspect: "aspect-[3/4]",
      likes: 2560,
      views: 7800,
      category: "fantasy",
      tags: ["elf", "archer", "forest", "magical"],
      prompt:
        "masterpiece, best quality, fantasy anime art, beautiful elf archer, silver long hair, emerald eyes, intricate white and gold armor, holding a glowing magical bow, standing in a bioluminescent forest, giant glowing mushrooms, fireflies, ethereal atmosphere, tyndall effect, dreamy lighting",
    },

    // 6. 偶像舞台 (Idol Concert)
    {
      id: "6",
      title: "Idol Concert Stage",
      author: "StarLight",
      image: "/gallery/masterpiece-anime-idol-singer-concert-stage-outfit.webp",
      aspect: "aspect-[2/3]",
      likes: 1980,
      prompt:
        "anime idol singer, concert stage, sparkling dress, holding microphone, dynamic pose, audience cheering, laser lights, energetic atmosphere, detailed frills, key visual, vivid colors",
    },

    // 7. 吉卜力风景 (Ghibli Scenery)
    {
      id: "7",
      title: "Ghibli Scenery Art",
      author: "StudioFan",
      image:
        "/gallery/ghibli-inspired-nostalgic-countryside-bus-stop-scenery.webp",
      aspect: "aspect-[5/3]", // 16:9 改为更合适的比例
      likes: 3120,
      prompt:
        "studio ghibli style, nostalgic scenery, countryside bus stop, summer clouds, lush green nature, watercolor texture, hand painted background, hayao miyazaki style, peaceful atmosphere",
    },

    // 8. 迪士尼/Pixar 3D (Pixar Style)
    {
      id: "8",
      title: "3D Cinematic Render",
      author: "PixarStyle",
      image: "/gallery/pixar-disney-style-3d-anime-girl-cinematic-render.webp",
      aspect: "aspect-[3/4]",
      likes: 2200,
      prompt:
        "3d render, pixar style, disney style, cute anime girl, big eyes, cinematic lighting, 8k resolution, subsurface scattering, volumetric lighting, magical forest background, fireflies, floating particles, octane render",
    },

    // 9. 魔法少女设定图 (Magical Girl Sheet)
    {
      id: "9",
      title: "Magical Girl Concept",
      author: "ConceptArtist",
      image:
        "/gallery/anime-magical-girl-character-reference-sheet-opal-jellyfish-fantasy.webp",
      aspect: "aspect-[4/5]", // 设定图通常较宽，调整为更合适的比例
      likes: 1450,
      prompt:
        "character reference sheet, magical girl, opal jellyfish theme, front view, back view, side view, detailed costume design, frills, staff, accessories breakdown, anime character design, flat color",
    },

    // 10. 绘本风小屋 (Storybook Cottage)
    {
      id: "10",
      title: "Cozy Storybook Illustration",
      author: "ArtisticPencil",
      image: "/gallery/storybook-illustration-cozy-cottage.webp",
      aspect: "aspect-[4/3]",
      likes: 890,
      prompt:
        "hand-drawn colored pencil illustration, clean line art with slightly rough pencil outlines, a cozy small cottage with a smoking chimney, flower garden in front, soft pastel coloring, visible pencil strokes, warm and friendly tone, storybook illustration feel",
    },

    // 11. 护士/医院 (Nurse)
    {
      id: "11",
      title: "Clinical Anime Art",
      author: "HealthArt",
      image:
        "/gallery/masterpiece-anime-nurse-uniform-stethoscope-hospital.webp",
      aspect: "aspect-[3/4]",
      likes: 1670,
      prompt:
        "illustration, anime nurse, white clinical uniform, stethoscope around neck, hospital corridor background, soft clean lighting, tyndall effect, gentle smile, holding clipboard, highly detailed face, soft focus, pastel color palette",
    },

    // 12. 电影感光影 (Cinematic Lighting)
    {
      id: "12",
      title: "Dramatic Lighting Portrait",
      author: "LightingMaster",
      image:
        "/gallery/cinematic-lighting-anime-girl-dramatic-volumetric-glow.webp",
      aspect: "aspect-[2/3]",
      likes: 2780,
      prompt:
        "cinematic lighting, dramatic atmosphere, anime girl, volumetric fog, rim light, backlighting, glowing particles, intense gaze, highly detailed face, masterpiece, movie poster style, dark background",
    },

    // 13. 复古 80年代 (Retro 80s)
    {
      id: "13",
      title: "Retro 80s Aesthetic",
      author: "CityPop",
      image:
        "/gallery/retro-1980s-anime-style-boy-girl-coffee-shop-nostalgic.webp",
      aspect: "aspect-[4/3]",
      likes: 1340,
      prompt:
        "retro 1980s anime style, cel shading, vhs effect, boy and girl sitting in a coffee shop, nostalgic, city pop vibe, lo-fi aesthetic, muted colors, film grain, vintage anime screenshot",
    },

    // 14. 俯视视角 (Epic Angle)
    {
      id: "14",
      title: "Epic Aerial View",
      author: "AnglePro",
      image:
        "/gallery/epic-birds-eye-view-anime-character-aerial-cityscape.webp",
      aspect: "aspect-[3/4]",
      likes: 3560,
      prompt:
        "epic bird's eye view, aerial shot, anime character falling from sky, sprawling futuristic cityscape below, clouds, motion blur, dynamic angle, high perspective, depth of field, action shot",
    },

    // 15. 梦幻柔焦 (Dreamy Pastel)
    {
      id: "15",
      title: "Dreamy Pastel Aesthetics",
      author: "SoftFocus",
      image: "/gallery/dreamy-pastel-anime-girl-soft-glow-bokeh.webp",
      aspect: "aspect-square",
      likes: 2100,
      prompt:
        "dreamy, pastel colors, soft focus, bokeh, anime girl, angelic, soft glow, ethereal, light pink and blue palette, delicate features, flowers, romantic atmosphere, shoujo manga style",
    },

    {
      id: "16",
      title: "Flying Witch Scenery",
      author: "MiyazakiFan",
      image:
        "/gallery/ghibli-style-witch-flying-over-european-seaside-town.webp",
      aspect: "aspect-video",
      likes: 2900,
      prompt:
        "studio ghibli style, young witch flying on broomstick, black cat, european seaside town with red roofs below, blue ocean, white clouds, seagulls, windy, freedom, kiki's delivery service vibes, hand painted background",
    },

    {
      id: "17",
      title: "Classic Manga Style",
      author: "Mangaka",
      image:
        "/gallery/classic-manga-screentone-john-wick-anime-illustration.webp",
      aspect: "aspect-[2/3]",
      likes: 1850,
      prompt:
        "classic manga style, black and white, screentones, ink lines, crosshatching, action scene, intense expression, dynamic speed lines, comic book aesthetic, traditional media",
    },

    {
      id: "18",
      title: "Lush Forest Meadow",
      author: "NatureSpirit",
      image: "/gallery/studio-ghibli-style-anime-girl-lush-forest-meadow.webp",
      aspect: "aspect-video",
      likes: 2340,
      prompt:
        "studio ghibli style, anime girl standing in a lush forest meadow, sunlight filtering through leaves, deer in background, flowers, butterflies, peaceful nature, detailed vegetation, vibrant greens",
    },

    {
      id: "19",
      title: "Full Body Masterpiece",
      author: "CharDesign",
      image:
        "/gallery/full-body-anime-girl-standing-complete-figure-masterpiece.webp",
      aspect: "aspect-[1/2]",
      likes: 1560,
      prompt:
        "full body shot, complete figure, anime girl standing, detailed outfit, stylish pose, white background, character design, high quality, sharp focus, head to toe",
    },

    {
      id: "20",
      title: "Kawaii Magical Girl",
      author: "PinkMagic",
      image: "/gallery/magical-girl-anime-pink-hair-kawaii-magic-wand.webp",
      aspect: "aspect-[2/3]",
      likes: 1990,
      prompt:
        "magical girl, pink hair, kawaii, holding magic wand, frilly dress, sparkles, hearts, transformation sequence, anime style, vibrant colors, cute and energetic",
    },
    {
      id: "21",
      title:
        "A thrilling 3D cartoon scene: [CHARACTER1] runs through a narrow corridor inside [Place], chased at high speed by [CHARACTER2]. Their facial expressions reflect tension and focus, with beads of sweat glistening under dramatic lighting.",
      author: "3DAction",
      image: "/gallery/3D cartoon scene.webp",
      aspect: "aspect-video",
      likes: 2250,
      prompt:
        "A thrilling 3D cartoon scene: [CHARACTER1] runs through a narrow corridor inside [Place], chased at high speed by [CHARACTER2]. Their facial expressions reflect tension and focus, with beads of sweat glistening under dramatic lighting.",
    },
    {
      id: "22",
      title:
        "A futuristic 3D cartoon scene: [CHARACTER1] and [CHARACTER2] are in a high-tech laboratory, with advanced equipment and holographic displays. They are working on a groundbreaking project, with intense concentration on their faces.",
      author: "3DAction",
      image: "/gallery/anime-figure-1-7-scale-zbrush-desk-setup.webp",
      aspect: "aspect-video",
      likes: 1980,
      prompt:
        "A hyper-realistic close-up photography of a 1/7 scale commercialized PVC anime figure of a [Cute Magical Girl with pink hair and frilly dress]. The figure is placed on a cluttered computer desk, standing on a circular transparent acrylic base without text. The figure features exquisite paintwork, glossy plastic textures, and matte skin finish. In the background, a computer monitor clearly displays the ZBrush 3D modeling interface of this exact figure. Next to the monitor, a premium collectible packaging box featuring the character's original artwork is visible. Soft indoor lighting, depth of field, 8k resolution, product photography style. --ar 16:9 --v 6.0",
    },
    {
      id: "23",
      title: "Dynamic Action Rush",
      author: "ActionMaster",
      image: "/gallery/action-pose.webp",
      aspect: "aspect-[3/4]",
      likes: 3100,
      prompt:
        "masterpiece, best quality, dynamic action pose, anime girl with katana, slashing through obstacles, motion blur, blue lightning effects, sparks, intense expression, battlefield background, 8k resolution, cinematic lighting, sharp focus",
    },
    {
      id: "24",
      title: "Neon Street Cyberpunk",
      author: "CyberVibe",
      image: "/gallery/cyberpunk-street.webp",
      aspect: "aspect-[4/3]",
      likes: 4200,
      prompt:
        "cyberpunk anime girl, techwear outfit, standing in a rainy neon street, pink and cyan lighting, reflections on puddles, futuristic headphones, robotic arm detail, cinematic atmosphere, hyper-detailed background, 8k, bokeh effect",
    },
    {
      id: "25",
      title: "Silver Holy Knight",
      author: "ArmorArt",
      image: "/gallery/holy-knight.webp",
      aspect: "aspect-[2/3]",
      likes: 2850,
      prompt:
        "masterpiece, best quality, female knight in intricate silver and gold armor, holding a holy claymore, standing in a ruined cathedral, light rays through broken stained glass, dust particles, heroic atmosphere, sharp detail, fantasy epic",
    },
    {
      id: "26",
      title: "Celestial Mage",
      author: "MagicCaster",
      image: "/gallery/celestial-mage.webp",
      aspect: "aspect-video",
      likes: 3400,
      prompt:
        "anime mage girl, casting a celestial spell, glowing runes, sparkling magical energy, starry night sky background, flowing purple robe, intricate staff, ethereal glow, vibrant colors, majestic composition, 8k resolution",
    },
    {
      id: "27",
      title: "Premium Waifu Portrait",
      author: "WaifuDesigner",
      image: "/gallery/premium-waifu.webp",
      aspect: "aspect-[3/2]",
      likes: 4800,
      prompt:
        "ultimate waifu portrait, beautiful anime girl, long flowing white hair, sapphire eyes, elegant white dress, cherry blossom garden background, soft natural lighting, masterpiece, high fidelity, 4k, digital illustration, extremely detailed face",
    },
    {
      id: "28",
      title: "Pony Style Celebration",
      author: "PonyArtist",
      image: "/gallery/pony-style-art.webp",
      aspect: "aspect-square",
      likes: 1560,
      prompt:
        "pony diffusion style anime art, vibrant colors, clean lineart, cute girl in festive outfit, holding balloons, colorful background, high-contrast lighting, modern anime aesthetic, sharp focus, masterpiece",
    },
    {
      id: "29",
      title: "Animagine XL Quality",
      author: "XLMaster",
      image: "/gallery/animagine-xl-showcase.webp",
      aspect: "aspect-[3/2]",
      likes: 5200,
      prompt:
        "animagine xl style, ultra-high resolution, anime girl in futuristic library, many glowing books, intricate architectural details, soft volumetric lighting, masterpiece, photorealistic anime style, 8k, sharp focus",
    },
    {
      id: "30",
      title: "Midnight Romantic Couple",
      author: "LoveStory",
      image: "/gallery/romantic-couple.webp",
      aspect: "aspect-video",
      likes: 3890,
      prompt:
        "romantic anime couple, standing on a bridge, fireworks in the background, night sky, city lights reflected in water, emotional atmosphere, holding hands, soft glow, high quality, cinematic screenshot style",
    },
    {
      id: "31",
      title: "High School Afternoons",
      author: "SchoolDays",
      image: "/gallery/high-school-life.webp",
      aspect: "aspect-[4/3]",
      likes: 2100,
      prompt:
        "nostalgic high school life, classroom during sunset, girl looking out the window, long shadows, warm orange lighting, dust floating, school supplies on desk, realistic anime style, peaceful vibe, high detail",
    },
    {
      id: "32",
      title: "Classic Anime Portrait",
      author: "RetroFan",
      image: "/gallery/classic-portrait.webp",
      aspect: "aspect-square",
      likes: 1980,
      prompt:
        "classic anime portrait, close-up, expressive eyes, soft shading, gentle smile, simple background, character design sheet quality, clean lines, professional digital art, timeless aesthetic",
    },
    {
      id: "33",
      title: "Kawaii Sticker Set",
      author: "StickerLife",
      image: "/gallery/kawaii-sticker.webp",
      aspect: "aspect-square",
      likes: 1450,
      prompt:
        "kawaii anime sticker illustration, white border, cute mascot character, pastel colors, thick lines, simple shading, clean design, vector style, high quality, sticker art",
    },
    {
      id: "34",
      title: "Chibi Emote Pack",
      author: "ChibiWorld",
      image: "/gallery/chibi-emotes.webp",
      aspect: "aspect-square",
      likes: 1200,
      prompt:
        "chibi anime emotes, various expressions, super deformed style, vibrant colors, high quality, twitch emote style, simple background, expressive eyes, cute and fun",
    },
    {
      id: "35",
      title: "Cosplay Event Banner",
      author: "EventPro",
      image:
        "/gallery/anime-convention-cosplayer-matching-rollup-banner-4k-photo.webp",
      aspect: "aspect-[3/4]",
      likes: 2450,
      prompt:
        "anime convention poster, high quality photo of a cosplayer, matching rollup banner design, 4k photo, vibrant event lighting, professional photography, costume detail, convention background blur",
    },
    {
      id: "36",
      title: "Upper Body Masterpiece",
      author: "PortraitArtist",
      image:
        "/gallery/masterpiece-anime-girl-upper-body-waist-up-portrait.webp",
      aspect: "aspect-[2/3]",
      likes: 3100,
      prompt:
        "masterpiece, anime girl waist-up portrait, intricate outfit design, detailed eyes, soft lighting, professional digital painting, high resolution, sharp focus, aesthetic composition",
    },
    {
      id: "tpl-10",
      title: "Abstract Digital Art",
      author: "ArtCreator",
      aspect: "aspect-[1/1]",
      likes: 2450,
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
      author: "ArtCreator",
      aspect: "aspect-[9/16]",
      likes: 1890,
      prompt:
        "Minimalist anime character design using traditional Japanese ink wash (Sumi-e) techniques. A graceful female warrior, only essential lines and shadows, elegant flow, negative space. Splashes of black ink, high-quality paper texture, Zen-like atmosphere. Sophisticated and modern.",
      style: "Ink Wash",
      ratio: "9:16",
      image: "/gallery/minimalist-anime-warrior-ink-wash-sumie.webp",
    },
    {
      id: "tpl-14",
      title: "Glitch-core Cyber",
      author: "ArtCreator",
      aspect: "aspect-[9/16]",
      likes: 2100,
      prompt:
        "Edgy anime character in a Glitch-core and Cyber-goth style. A character with digital distortion effects, chromatic aberration, scan lines, and neon green accents. Dark aesthetic, tech-wear fashion, fragmented visuals, high energy. Unique and experimental.",
      style: "Glitch Art",
      ratio: "9:16",
      image: "/gallery/edgy-anime-girl-glitch-core-cyber-goth.webp",
    },

    {
      id: "tpl-19",
      title: "Watercolor Sketch",
      author: "ArtCreator",
      aspect: "aspect-[9/16]",
      likes: 1750,
      prompt:
        "Artistic anime character in a loose watercolor and pencil sketch style. A girl with a soft smile, delicate washes of color, intentional pencil marks, and paper texture. Ethereal, light, and full of personality. High-end editorial illustration feel.",
      style: "Watercolor",
      ratio: "9:16",
      image: "/gallery/artistic-anime-girl-watercolor-pencil-sketch.webp",
    },
    {
      id: "tpl-20",
      title: "Neon Noir Detective",
      author: "ArtCreator",
      aspect: "aspect-[9/16]",
      likes: 1920,
      prompt:
        "Neon-noir anime character portrait. A detective-like character in a dark city, illuminated by harsh pink and blue neon lights. High contrast, deep shadows, cinematic composition, rain effects. Moody and stylish.",
      style: "Neon Noir",
      ratio: "9:16",
      image: "/gallery/neon-noir-anime-detective-portrait.webp",
    },
    {
      id: "tpl-21",
      title: "Summer Bikini Beach",
      author: "ArtCreator",
      aspect: "aspect-[9/16]",
      likes: 2850,
      prompt:
        "High-quality anime illustration of a beautiful girl in a stylish white bikini on a tropical beach. Sun-kissed skin, sparkling turquoise water, palm trees in the background. Golden hour lighting, lens flare, wet skin texture, vibrant colors, masterpiece.",
      style: "Summer Allure",
      ratio: "9:16",
      image: "/gallery/anime-summer-bikini-beach.webp",
    },
    {
      id: "tpl-22",
      title: "Poolside Elegance",
      author: "ArtCreator",
      aspect: "aspect-[9/16]",
      likes: 2400,
      prompt:
        "Stunning anime girl lounging by a luxury infinity pool. Wearing a fashionable translucent sarong over a sleek black swimsuit. Crystal clear water reflections, summer cocktail on the side, sophisticated and alluring atmosphere. High detail, soft shadows.",
      style: "Luxury Swimwear",
      ratio: "9:16",
      image: "/gallery/anime-poolside-summer.webp",
    },
    {
      id: "tpl-23",
      title: "Succubus Aesthetic",
      author: "ArtCreator",
      aspect: "aspect-[9/16]",
      likes: 2100,
      prompt:
        "Dark and alluring anime succubus character. Minimalist gothic outfit with lace details, small wings, and a playful tail. Dimly lit room with purple neon accents, mysterious and seductive gaze, high-end digital art style, sharp focus.",
      style: "Dark Allure",
      ratio: "9:16",
      image: "/gallery/anime-succubus-aesthetic.webp",
    },
    {
      id: "tpl-24",
      title: "Onsen Intimacy",
      author: "ArtCreator",
      aspect: "aspect-[9/16]",
      likes: 1800,
      prompt:
        "Beautiful anime girl at a traditional Japanese hot spring (onsen). Wearing a loose, slightly open yukata, steam rising around her, blushing cheeks, wet hair. Serene and intimate atmosphere, soft painterly textures, high artistic quality.",
      style: "Traditional Allure",
      ratio: "9:16",
      image: "/gallery/anime-hot-spring-yukata.webp",
    },

    {
      id: "tpl-26",
      title: "Matsuri Summer Kimono",
      author: "ArtCreator",
      aspect: "aspect-[9/16]",
      likes: 2200,
      prompt:
        "Attractive anime girl at a summer festival (Matsuri). Wearing a thin, breathable summer kimono, holding a fan, fireworks exploding in the night sky. Warm glow from lanterns, joyful and charming expression, high resolution.",
      style: "Festival Allure",
      ratio: "9:16",
      image: "/gallery/anime-summer-festival-girl.webp",
    },

    {
      id: "tpl-28",
      title: "Lingerie Morning Light",
      author: "ArtCreator",
      aspect: "aspect-[9/16]",
      likes: 1950,
      prompt:
        "Elegant anime girl in a sophisticated silk and lace lingerie set. Soft morning light through a window, ethereal atmosphere, delicate textures, gentle and captivating expression. High-end editorial style, soft focus background.",
      style: "Elegant Allure",
      ratio: "9:16",
      image: "/gallery/anime-lingerie-aesthetic.webp",
    },
    {
      id: "tpl-29",
      title: "Beach Volleyball Action",
      author: "ArtCreator",
      aspect: "aspect-[9/16]",
      likes: 2300,
      prompt:
        "Dynamic shot of an attractive anime girl playing beach volleyball. Wearing a sporty bikini, sand flying, intense action pose, bright sunlight. High energy, vibrant colors, detailed anatomy.",
      style: "Sporty Allure",
      ratio: "9:16",
      image: "/gallery/anime-beach-volleyball.webp",
    },
    {
      id: "tpl-30",
      title: "Night Pool Party",
      author: "ArtCreator",
      aspect: "aspect-[9/16]",
      likes: 2150,
      prompt:
        "Glamorous anime girl at a night pool party. Wearing a glittering swimsuit, neon pool lights, bokeh background of city lights. Confident and seductive look, cinematic lighting, high-quality digital painting.",
      style: "Nightlife Allure",
      ratio: "9:16",
      image: "/gallery/anime-night-pool-party.webp",
    },
  ];

  const galleryImages = [...baseImages];

  const filteredImages = galleryImages.filter(item => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  const sortedImages = [...filteredImages].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return parseInt(b.id) - parseInt(a.id);
      case "popular":
        return b.likes - a.likes;
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default: // trending
        return (b.views || 0) - (a.views || 0);
    }
  });

  // 瀑布流列数配置 - 移动端改为2列
  const breakpointColumnsObj = {
    default: 5,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 2, // 确保移动端是2列
  };

  const handleRemix = (promptText: string) => {
    if (!promptText.trim()) return;
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/generator?prompt=${encodeURIComponent(promptText)}`);
    }, 500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newLikes = new Set(likedItems);
    if (newLikes.has(id)) {
      newLikes.delete(id);
    } else {
      newLikes.add(id);
    }
    setLikedItems(newLikes);
  };

  const modes = [
    {
      label: t("modes.generation"),
      icon: <ImageIcon className="w-5 h-5" />,
      active: true,
      href: "/generator",
      disabled: false,
    },
    {
      label: t("modes.video"),
      icon: <Video className="w-5 h-5" />,
      active: false,
      href: "#",
      badge: t("modes.soon"),
      disabled: true,
    },
    {
      label: t("modes.upscaler"),
      icon: <Maximize2 className="w-5 h-5" />,
      active: false,
      href: "#",
      disabled: true,
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans">
        {/* 骨架屏占位符 */}
        <div className="pt-28 md:pt-32 pb-8 px-4">
          {/* Hero 骨架屏 */}
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
            <div className="w-20 h-6 bg-zinc-800 rounded-full mx-auto animate-pulse"></div>
            <div className="w-80 h-12 bg-zinc-800 rounded-lg mx-auto animate-pulse"></div>
            <div className="w-96 h-4 bg-zinc-800 rounded mx-auto animate-pulse"></div>
            <div className="w-full max-w-xl h-12 bg-zinc-800 rounded-2xl mx-auto animate-pulse"></div>
            <div className="flex gap-2 justify-center">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-16 h-6 bg-zinc-800 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
          
          {/* 图片网格骨架屏 */}
          <div className="max-w-[2400px] mx-auto">
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
              {Array.from({length: 20}).map((_, i) => (
                <div key={i} className="break-inside-avoid mb-4 bg-zinc-900 rounded-2xl overflow-hidden animate-pulse">
                  <div 
                    className="w-full bg-zinc-800" 
                    style={{height: `${200 + Math.random() * 200}px`}}
                  ></div>
                  <div className="p-4 space-y-2">
                    <div className="w-3/4 h-3 bg-zinc-800 rounded"></div>
                    <div className="w-1/2 h-2 bg-zinc-800 rounded"></div>
                    <div className="w-full h-8 bg-zinc-800 rounded"></div>
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-3 bg-zinc-800 rounded"></div>
                      <div className="w-8 h-6 bg-zinc-800 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 relative overflow-x-hidden">
      
     
      
      {/* 全局加载遮罩 */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center flex-col gap-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse" />
              <Loader2 className="w-12 h-12 text-indigo-500 animate-spin relative z-10" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">{t("loading.title")}</h3>
              <p className="text-zinc-500 text-sm">{t("loading.subtitle")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 顶部环境光背景 */}
      <div className="fixed top-0 left-0 w-full h-[600px] pointer-events-none z-0">
         <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen" />
         <div className="absolute top-[-100px] right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[100px] rounded-full mix-blend-screen" />
      </div>
      
      {/* 噪点纹理背景 */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"></div>

      {/* Simplified Hero Section */}
      <section className="relative w-full pt-28 md:pt-32 pb-8 flex flex-col items-center justify-center px-4 z-10">
        <div className="relative z-10 w-full max-w-4xl text-center space-y-6">

          <div className="space-y-6">
            {/* 更吸引人的标题 */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.9]"
            >
               Discover <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse">
                 Infinite
               </span> <br />
               Anime Magic
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-base md:text-xl font-medium max-w-3xl mx-auto tracking-tight leading-relaxed px-4"
            >
              Explore <span className="text-white font-bold">10,000+</span> AI-generated anime masterpieces. 
              Copy prompts, remix styles, and create your next viral artwork.
            </motion.p>

            {/* Stats Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm"
            >
              <div className="flex items-center gap-2 text-zinc-500">
                <Users className="w-4 h-4" />
                <span><span className="text-white font-bold">50K+</span> Artists</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <Eye className="w-4 h-4" />
                <span><span className="text-white font-bold">2M+</span> Views Daily</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <Award className="w-4 h-4" />
                <span><span className="text-white font-bold">Premium</span> Quality</span>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-3xl mx-auto w-full group px-2"
          >
            <div className="relative flex items-center bg-[#0a0a0c] border border-white/10 rounded-[32px] p-3 shadow-2xl transition-all group-focus-within:border-indigo-500/50 group-focus-within:shadow-indigo-500/20">
              <div className="pl-4 pr-3">
                <Search className="w-6 h-6 text-zinc-500 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search styles, prompts, or artists..."
                className="flex-1 bg-transparent border-none outline-none text-base md:text-lg text-white placeholder:text-zinc-600 py-3 md:py-4 w-full min-w-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRemix(search)}
              />
              <div className="hidden md:flex items-center gap-2 mr-2">
                <kbd className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">⌘</kbd>
                <kbd className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">K</kbd>
              </div>
              <button
                onClick={() => handleRemix(search)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-[24px] text-sm md:text-base font-black transition-all items-center gap-2 shrink-0 hover:scale-[1.02] active:scale-95 shadow-lg flex"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span className="hidden sm:inline">Generate</span>
                <span className="sm:hidden">Go</span>
              </button>
            </div>
          </motion.div>
          
          {/* Quick Action Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {["Trending", "Waifu", "Cyberpunk", "Fantasy", "Chibi"].map((tag, i) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag.toLowerCase())}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all hover:scale-105 ${
                  activeFilter === tag.toLowerCase()
                    ? "bg-white/10 border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    : "bg-transparent border-white/5 text-zinc-500 hover:border-white/10 hover:text-zinc-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-3 md:px-8 pb-32 max-w-[2400px] mx-auto z-10 relative">
        

        {/* Gallery Grid */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-3 md:-ml-6"
          columnClassName="pl-3 md:pl-6 bg-clip-padding"
        >
          {sortedImages.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
              key={`${item.id}-${index}`}
              className="mb-4 md:mb-8 group relative cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              {/* Image Container - 移除固定aspect，让图片保持原始比例 */}
              <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden bg-[#121217] border border-white/5 group-hover:border-indigo-500/30 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
                
                {/* 图片加载占位符 */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-zinc-600 border-t-indigo-500 rounded-full animate-spin"></div>
                </div>
                
                {/* Premium Badge */}
                {item.premium && (
                  <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-black px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    PRO
                  </div>
                )}

                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-black px-2 py-1 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Featured
                  </div>
                )}

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-all duration-700 ease-out md:group-hover:scale-110 relative z-10"
                  loading={index < 8 ? "eager" : "lazy"}
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    const placeholder = img.previousElementSibling as HTMLElement;
                    if (placeholder) {
                      placeholder.style.display = 'none';
                    }
                  }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = `https://placehold.co/400x600/1a1a1a/666?text=${encodeURIComponent(item.title)}`;
                  }}
                />

                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Desktop Hover Actions */}
                <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-all duration-300 hidden md:flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 space-y-3">
                        {/* Title and Author */}
                        <div>
                          <h3 className="text-white font-bold text-base line-clamp-1 mb-1">{item.title}</h3>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                              {item.author[0]}
                            </div>
                            <span className="text-zinc-300 text-xs">@{item.author}</span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-zinc-400">
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{item.likes.toLocaleString()}</span>
                          </div>
                          {item.views && (
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{item.views.toLocaleString()}</span>
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        {item.tags && (
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleRemix(item.prompt); }}
                                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                            >
                                <Zap className="w-4 h-4" /> Remix
                            </button>
                            <button 
                                onClick={(e) => toggleLike(e, item.id)}
                                className={`p-2.5 rounded-lg backdrop-blur-md border transition-all ${likedItems.has(item.id) ? 'bg-pink-500/20 border-pink-500/50 text-pink-500' : 'bg-black/20 border-white/10 text-white hover:bg-white/20'}`}
                            >
                                <Heart className={`w-4 h-4 ${likedItems.has(item.id) ? "fill-current" : ""}`} />
                            </button>
                        </div>
                    </div>
                </div>
              </div>
              
              {/* Enhanced Mobile Info Bar */}
              <div className="md:hidden mt-3 space-y-2">
                 <div className="flex justify-between items-start">
                     <div className="flex-1 pr-2">
                         <h3 className="text-sm font-bold text-white line-clamp-1 leading-tight">{item.title}</h3>
                         <div className="flex items-center gap-2 mt-1">
                           <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                             {item.author[0]}
                           </div>
                           <span className="text-xs text-zinc-500">@{item.author}</span>
                         </div>
                     </div>
                     <button 
                        onClick={(e) => toggleLike(e, item.id)}
                        className="text-zinc-500 active:scale-90 transition-transform"
                     >
                         <Heart className={`w-4 h-4 ${likedItems.has(item.id) ? "fill-pink-500 text-pink-500" : ""}`} />
                     </button>
                 </div>

                 {/* Mobile Stats */}
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3 text-xs text-zinc-500">
                     <div className="flex items-center gap-1">
                       <Heart className="w-3 h-3" />
                       <span>{item.likes.toLocaleString()}</span>
                     </div>
                     {item.views && (
                       <div className="flex items-center gap-1">
                         <Eye className="w-3 h-3" />
                         <span>{item.views.toLocaleString()}</span>
                       </div>
                     )}
                   </div>
                   
                   <button 
                     onClick={(e) => { e.stopPropagation(); handleRemix(item.prompt); }}
                     className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
                   >
                     <Zap className="w-3 h-3" /> Remix
                   </button>
                 </div>

                 {/* Mobile Tags */}
                 {item.tags && (
                   <div className="flex flex-wrap gap-1">
                     {item.tags.slice(0, 3).map((tag) => (
                       <span key={tag} className="bg-zinc-800 text-zinc-400 text-xs px-2 py-0.5 rounded-full">
                         #{tag}
                       </span>
                     ))}
                   </div>
                 )}
              </div>

            </motion.div>
          ))}
        </Masonry>
        
        {/* Enhanced Load More Section */}
        <div className="mt-12 md:mt-20 text-center space-y-8">
            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
                <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <div className="text-2xl font-black text-white mb-1">10K+</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-widest">Artworks</div>
                </div>
                <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <div className="text-2xl font-black text-white mb-1">50K+</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-widest">Artists</div>
                </div>
                <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <div className="text-2xl font-black text-white mb-1">2M+</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-widest">Views</div>
                </div>
                <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <div className="text-2xl font-black text-white mb-1">Daily</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-widest">Updates</div>
                </div>
            </div>

            {/* Load More Button */}
            <div className="space-y-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-full text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 group-hover:opacity-40 blur-lg transition duration-500" />
                    <span className="relative text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Load More Inspiration
                    </span>
                </button>
                
                <p className="text-sm text-zinc-500">
                    Showing {sortedImages.length} of 10,000+ artworks
                </p>
            </div>

            {/* Call to Action */}
            <div className="mt-16 p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/20 max-w-2xl mx-auto">
                <h3 className="text-xl md:text-2xl font-black text-white mb-3">
                    Ready to Create Your Own?
                </h3>
                <p className="text-zinc-400 mb-6">
                    Join thousands of artists creating stunning anime art with AI
                </p>
                <Link 
                    href="/generator"
                    className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-full font-bold transition-all hover:scale-105"
                >
                    <Wand2 className="w-4 h-4" />
                    Start Creating
                </Link>
            </div>
        </div>

      </section>

      {/* Image Detail Modal (Lightbox) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050505]/95 backdrop-blur-2xl p-0 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Mobile Close Button */}
            <button className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white z-50 md:hidden">
              <X className="w-6 h-6" />
            </button>

            {/* Desktop Close Button */}
            <button className="hidden md:block absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white z-50 transition-colors">
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0a0a0c] md:border border-zinc-800 md:rounded-3xl overflow-hidden w-full h-full md:h-auto md:max-h-[90vh] md:max-w-6xl flex flex-col md:flex-row shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Left: Image Area */}
              <div className="flex-1 bg-black flex items-center justify-center relative group h-[50vh] md:h-auto">
                <div className="absolute inset-0 overflow-hidden opacity-30 blur-3xl pointer-events-none">
                     <Image src={selectedImage.image} alt="" fill className="object-cover" />
                </div>
                
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="relative max-w-full max-h-full object-contain z-10"
                />
              </div>

              {/* Right: Info Area */}
              <div className="w-full md:w-[400px] bg-[#09090b] flex flex-col h-[50vh] md:h-auto border-l border-zinc-800">
                {/* Header */}
                <div className="p-5 border-b border-zinc-800 flex justify-between items-start bg-[#09090b]">
                   <div>
                       <h2 className="text-xl font-bold text-white leading-tight line-clamp-2">{selectedImage.title}</h2>
                       <div className="flex items-center gap-2 mt-2">
                           <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">
                               {selectedImage.author[0]}
                           </div>
                           <span className="text-xs text-zinc-400 font-medium">@{selectedImage.author}</span>
                       </div>
                   </div>
                   <div className="flex gap-2">
                       <button className="p-2 bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                           <Download className="w-4 h-4" />
                       </button>
                       <button 
                           onClick={(e) => toggleLike(e, selectedImage.id)}
                           className={`p-2 rounded-lg bg-zinc-800 transition-colors ${likedItems.has(selectedImage.id) ? 'text-pink-500' : 'text-zinc-400 hover:text-white'}`}
                       >
                           <Heart className={`w-4 h-4 ${likedItems.has(selectedImage.id) ? "fill-current" : ""}`} />
                       </button>
                   </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-[#09090b]">
                    {/* Enhanced Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 text-center">
                            <div className="flex items-center justify-center gap-1 text-pink-500 mb-1">
                                <Heart className="w-4 h-4 fill-current" />
                            </div>
                            <span className="block text-sm font-bold text-white">{selectedImage.likes.toLocaleString()}</span>
                            <span className="text-xs text-zinc-500">Likes</span>
                        </div>
                        {selectedImage.views && (
                            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 text-center">
                                <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                                    <Eye className="w-4 h-4" />
                                </div>
                                <span className="block text-sm font-bold text-white">{selectedImage.views.toLocaleString()}</span>
                                <span className="text-xs text-zinc-500">Views</span>
                            </div>
                        )}
                        <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 text-center">
                            <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                                <Download className="w-4 h-4" />
                            </div>
                            <span className="block text-sm font-bold text-white">4K</span>
                            <span className="text-xs text-zinc-500">Quality</span>
                        </div>
                    </div>

                    {/* Tags */}
                    {selectedImage.tags && (
                        <div className="mb-6">
                            <span className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3 block">Tags</span>
                            <div className="flex flex-wrap gap-2">
                                {selectedImage.tags.map((tag) => (
                                    <span key={tag} className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-300 text-xs px-3 py-1.5 rounded-full font-medium">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Prompt Box */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Prompt</span>
                            <button 
                                onClick={() => handleCopy(selectedImage.prompt)}
                                className="text-xs flex items-center gap-1.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 rounded-xl border border-zinc-700 text-sm text-zinc-300 font-mono leading-relaxed break-words">
                            {selectedImage.prompt}
                        </div>
                    </div>

                    {/* Enhanced Params Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="p-3 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-lg border border-zinc-700">
                            <span className="block text-xs text-zinc-500 font-bold uppercase mb-1">Aspect Ratio</span>
                            <span className="text-sm text-white font-medium">{selectedImage.aspect.replace('aspect-', '').replace('[', '').replace(']', '').replace('/', ':')}</span>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-lg border border-zinc-700">
                            <span className="block text-xs text-zinc-500 font-bold uppercase mb-1">Model</span>
                            <span className="text-sm text-white font-medium">Anime XL v5</span>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-lg border border-zinc-700">
                            <span className="block text-xs text-zinc-500 font-bold uppercase mb-1">Category</span>
                            <span className="text-sm text-white font-medium capitalize">{selectedImage.category || 'General'}</span>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-lg border border-zinc-700">
                            <span className="block text-xs text-zinc-500 font-bold uppercase mb-1">Style</span>
                            <span className="text-sm text-white font-medium">{selectedImage.style || 'Anime'}</span>
                        </div>
                    </div>

                    {/* Similar Works Preview */}
                    <div className="mb-4">
                        <span className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3 block">More from @{selectedImage.author}</span>
                        <div className="grid grid-cols-3 gap-2">
                            {galleryImages.filter(img => img.author === selectedImage.author && img.id !== selectedImage.id).slice(0, 3).map((img) => (
                                <div key={img.id} className="aspect-square rounded-lg overflow-hidden bg-zinc-800 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedImage(img)}>
                                    <Image src={img.image} alt={img.title} width={100} height={100} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Fixed Footer Action */}
                <div className="p-5 border-t border-zinc-800 bg-[#09090b] pb-safe">
                    <button 
                        onClick={() => handleRemix(selectedImage.prompt)}
                        className="w-full py-3.5 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        <Zap className="w-4 h-4 fill-black" />
                        Remix this Image
                    </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}