"use client";

import React, { useState } from "react";

import { Link } from "@/i18n/routing";
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
} from "lucide-react";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
  style?: string;
  ratio?: string;
}


export default function GalleryPage() {
  const router = useRouter();
  const t = useTranslations('GalleryPage');
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const modes = [
    {
      label: t('modes.generation'),
      icon: <ImageIcon className="w-5 h-5" />,
      active: true,
      href: "/generator",
      disabled: false,
    },
    {
      label: t('modes.video'),
      icon: <Video className="w-5 h-5" />,
      active: false,
      href: "#",
      badge: t('modes.soon'),
      disabled: true,
    },
    {
      label: t('modes.upscaler'),
      icon: <Maximize2 className="w-5 h-5" />,
      active: false,
      href: "#",
      disabled: true,
    },
  ];

  const baseImages: GalleryItem[] = [
    {
      id: "u1",
      title: "Ethereal Starlight Soul",
      author: "ManusArt",
      image: "/gallery/anime_ethereal_light.webp",
      aspect: "aspect-[3/4]",
      likes: 12500,
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
      prompt:
        "A cinematic, wide-shot digital illustration in a high-end semi-realistic anime style. A lone samurai girl stands on a vast frozen lake at dawn. The composition is minimalist and moody. The color palette is muted and desaturated, featuring a single, striking splash of crimson red on her outfit. Intricate details include falling cherry blossoms encased within the ice and soft morning mist swirling around. There is a sharp focus on the reflection in her blade. The atmosphere is melancholic yet beautiful, with hyper-detailed textures and dramatic lighting.",
    },

    {
      id: "u3",
      title: "Cyber Noir Ramen Night",
      author: "ManusArt",
      image: "/gallery/anime_cyber_noir.webp",
      aspect: "aspect-[3/4]",
      likes: 11200,
      prompt:
        "An anime-style digital art masterpiece featuring a serene girl floating gently amidst a sea of glowing lilies. The scene has a dreamlike quality with vibrant yet harmonious colors and soft painterly brushstrokes. Sunlight filters through the scene as if underwater, with pearl-like bubbles rising. She wears a flowing silk dress. The image is high resolution with an ethereal atmosphere, reminiscent of soft, expressive character art.",
    },

    {
      id: "u4",
      title: "Floral Dream Submergence",
      author: "ManusArt",
      image: "/gallery/anime_floral_dream.webp",
      aspect: "aspect-[3/4]",
      likes: 10500,
      prompt:
        "A cinematic dark cyberpunk noir illustration of an anime girl with subtle mechanical enhancements. She is sitting in a neon-drenched ramen shop with heavy rain falling outside the window. Steam rises from the bowl, and neon signs reflect vividly in her eyes. The style features high contrast, deep shadows, and volumetric fog. The image is highly detailed, moody, and has a sleek, aesthetic anime character design.",
    },
    // 1. 核心商业/职场关键词 (Business Woman)
    {
      id: "1",
      title: "Business Woman Anime Art",
      author: "OfficeVibes",
      image: "/gallery/anime-business-woman-office.webp",
      aspect: "aspect-[3/4]",
      likes: 2890,
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
      aspect: "aspect-[2/3]",
      likes: 3450,
      prompt:
        "masterpiece, best quality, anime waifu art, high school girl, sailor uniform, pleated skirt, long wind-blown hair, standing in school hallway, golden hour lighting, sunset streaming through windows, floating dust particles, sentimental atmosphere, detailed eyes, makoto shinkai style, emotional, lens flare --ar 2:3",
    },

    {
      id: "3",
      title: "Cyberpunk Anime Wallpaper",
      author: "NeonDreams",
      image:
        "/gallery/modern-anime-girl-iridescent-jacket-holographic-aesthetic.webp",
      aspect: "aspect-[9/16]",
      likes: 4100,
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
      prompt:
        "chibi character design, super deformed, cute magical girl, big head small body, kawaii, sticker style, simple background, vibrant colors, expressive face, 3d toy render style, blender, smooth textures, blind box style",
    },

    // 5. 奇幻精灵 (Fantasy Elf)
    {
      id: "5",
      title: "Fantasy Elf Archer",
      author: "FantasyLab",
      image: "/gallery/fantasy-elf-archer-forest.webp",
      aspect: "aspect-[2/3]",
      likes: 2560,
      prompt:
        "masterpiece, best quality, fantasy anime art, beautiful elf archer, silver long hair, emerald eyes, intricate white and gold armor, holding a glowing magical bow, standing in a bioluminescent forest, giant glowing mushrooms, fireflies, ethereal atmosphere, tyndall effect, dreamy lighting",
    },

    // 6. 偶像舞台 (Idol Concert)
    {
      id: "6",
      title: "Idol Concert Stage",
      author: "StarLight",
      image: "/gallery/masterpiece-anime-idol-singer-concert-stage-outfit.webp",
      aspect: "aspect-[3/4]",
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
      aspect: "aspect-video", // 16:9
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
      aspect: "aspect-[2/3]",
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
      aspect: "aspect-[3/4]", // 设定图通常较宽
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
      aspect: "aspect-square",
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
      image: "/gallery/anime-convention-cosplayer-matching-rollup-banner-4k-photo.webp",
      aspect: "aspect-[3/4]",
      likes: 2450,
      prompt:
        "anime convention poster, high quality photo of a cosplayer, matching rollup banner design, 4k photo, vibrant event lighting, professional photography, costume detail, convention background blur",
    },
    {
      id: "36",
      title: "Upper Body Masterpiece",
      author: "PortraitArtist",
      image: "/gallery/masterpiece-anime-girl-upper-body-waist-up-portrait.webp",
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
    prompt: "High-quality anime illustration of a beautiful girl in a stylish white bikini on a tropical beach. Sun-kissed skin, sparkling turquoise water, palm trees in the background. Golden hour lighting, lens flare, wet skin texture, vibrant colors, masterpiece.",
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
    prompt: "Stunning anime girl lounging by a luxury infinity pool. Wearing a fashionable translucent sarong over a sleek black swimsuit. Crystal clear water reflections, summer cocktail on the side, sophisticated and alluring atmosphere. High detail, soft shadows.",
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
    prompt: "Dark and alluring anime succubus character. Minimalist gothic outfit with lace details, small wings, and a playful tail. Dimly lit room with purple neon accents, mysterious and seductive gaze, high-end digital art style, sharp focus.",
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
    prompt: "Beautiful anime girl at a traditional Japanese hot spring (onsen). Wearing a loose, slightly open yukata, steam rising around her, blushing cheeks, wet hair. Serene and intimate atmosphere, soft painterly textures, high artistic quality.",
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
    prompt: "Attractive anime girl at a summer festival (Matsuri). Wearing a thin, breathable summer kimono, holding a fan, fireworks exploding in the night sky. Warm glow from lanterns, joyful and charming expression, high resolution.",
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
    prompt: "Elegant anime girl in a sophisticated silk and lace lingerie set. Soft morning light through a window, ethereal atmosphere, delicate textures, gentle and captivating expression. High-end editorial style, soft focus background.",
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
    prompt: "Dynamic shot of an attractive anime girl playing beach volleyball. Wearing a sporty bikini, sand flying, intense action pose, bright sunlight. High energy, vibrant colors, detailed anatomy.",
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
    prompt: "Glamorous anime girl at a night pool party. Wearing a glittering swimsuit, neon pool lights, bokeh background of city lights. Confident and seductive look, cinematic lighting, high-quality digital painting.",
    style: "Nightlife Allure",
    ratio: "9:16",
    image: "/gallery/anime-night-pool-party.webp",
  },
  ];

  const galleryImages = [...baseImages];

  const breakpointColumnsObj = {
    default: 4,
    1536: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1,
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

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-pink-500/30 relative">
      {/* 全局加载遮罩 */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center flex-col gap-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500 blur-xl opacity-20 animate-pulse" />
              <Loader2 className="w-12 h-12 text-pink-500 animate-spin relative z-10" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {t('loading.title')}
              </h3>
              <p className="text-zinc-500 text-sm">{t('loading.subtitle')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 背景氛围 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[500px] bg-indigo-900/20 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-36 pb-20 flex flex-col items-center justify-center px-6 z-10">
        <div className="relative z-10 w-full max-w-4xl text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.9]">
              {t.rich('title', {
                span1: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">{chunks}</span>
              })}
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto tracking-tight">
              {t.rich('subtitle', {
                b: (chunks) => <b>{chunks}</b>
              })}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto w-full group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[28px] opacity-30 group-hover:opacity-60 blur transition duration-500" />
            <div className="relative flex items-center bg-[#0a0a0c] border border-white/10 rounded-[26px] p-2 shadow-2xl">
              <div className="pl-4 pr-3">
                <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
              </div>
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="flex-1 bg-transparent border-none outline-none text-base text-white placeholder:text-zinc-600 py-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRemix(search)}
              />
              <button
                onClick={() => handleRemix(search)}
                className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-[20px] text-sm font-black transition-all flex items-center gap-2 shrink-0 hover:scale-[1.02] active:scale-95"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                {t('generateButton')}
              </button>
            </div>
          </div>

          {/* Nav Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {modes.map((mode) => (
              <Link
                key={mode.label}
                href={mode.href}
                onClick={(e) => mode.disabled && e.preventDefault()}
                className={`group flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all ${mode.active
                  ? "bg-white/10 border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  : "bg-transparent border-white/5 text-zinc-600 cursor-not-allowed opacity-60"
                  }`}
              >
                {mode.icon}
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {mode.label}
                </span>
                {mode.badge && (
                  <span className="bg-zinc-800 text-zinc-400 text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase border border-white/5">
                    {mode.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-4 md:px-8 pb-32 max-w-[1920px] mx-auto z-10 relative">
        <div className="flex items-end justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
              <Flame className="w-5 h-5 text-pink-500 fill-pink-500/20" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight uppercase text-white">
                {t('trendingTitle')}
              </h2>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-0.5">
                {t('trendingSubtitle')}
              </p>
            </div>
          </div>
          {/* 显示当前点赞总数 (模拟) */}
          <div className="hidden md:flex items-center gap-2 text-zinc-500 text-sm font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>{likedItems.size} Liked this session</span>
          </div>
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4 md:-ml-6"
          columnClassName="pl-4 md:pl-6 bg-clip-padding"
        >
          {galleryImages.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              key={`${item.id}-${index}`}
              className="mb-6 group relative cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <div
                className={`relative w-full ${item.aspect} rounded-[20px] overflow-hidden bg-[#121217] border border-white/5 group-hover:border-pink-500/30 transition-all duration-500 shadow-lg`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 4}
                />

                {/* Image Placeholder Shimmer */}
                <div className="absolute inset-0 -z-10 bg-zinc-900 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>


                {/* 悬浮遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-sm font-bold text-white line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mt-0.5">
                          @{item.author}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {/* Remix 按钮 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemix(item.prompt);
                        }}
                        className="col-span-4 py-2.5 bg-white text-black rounded-xl text-[11px] font-black uppercase tracking-tight hover:bg-pink-500 hover:text-white transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-lg"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        Remix
                      </button>

                      {/* 点赞按钮 */}
                      <button
                        onClick={(e) => toggleLike(e, item.id)}
                        className={`col-span-1 flex items-center justify-center rounded-xl backdrop-blur-md border transition-all active:scale-90 ${likedItems.has(item.id)
                          ? "bg-pink-500/20 border-pink-500/50 text-pink-500"
                          : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                          }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${likedItems.has(item.id) ? "fill-current" : ""
                            }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </section>

      {/* 图片详情模态框 (Lightbox) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050507]/95 backdrop-blur-xl p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white z-50 transition-colors">
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0a0a0c] border border-white/10 rounded-3xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 bg-black/50 flex items-center justify-center p-4 relative group">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[50vh] md:max-h-[85vh] object-contain shadow-2xl"
                />
              </div>

              <div className="w-full md:w-[420px] bg-[#0f0f12] flex flex-col border-l border-white/5 h-auto md:h-full">
                <div className="p-6 border-b border-white/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1 leading-tight">
                        {selectedImage.title}
                      </h2>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                          {selectedImage.author.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">
                          @{selectedImage.author}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => toggleLike(e, selectedImage.id)}
                      className={`flex flex-col items-center gap-1 min-w-[50px] transition-colors ${likedItems.has(selectedImage.id)
                        ? "text-pink-500"
                        : "text-zinc-500 hover:text-white"
                        }`}
                    >
                      <Heart
                        className={`w-6 h-6 ${likedItems.has(selectedImage.id) ? "fill-current" : ""
                          }`}
                      />
                      <span className="text-xs font-bold">
                        {selectedImage.likes +
                          (likedItems.has(selectedImage.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Prompt 区域 */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                  <div className="bg-zinc-900/50 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                          Generation Prompt
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(selectedImage.prompt)}
                        className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium bg-white/5 px-2 py-1 rounded-md"
                      >
                        {copied ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap break-words">
                      {selectedImage.prompt}
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/30 p-3 rounded-lg border border-white/5">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">
                        Model
                      </span>
                      <span className="text-xs text-white font-medium">
                        Anime V4.5
                      </span>
                    </div>
                    <div className="bg-zinc-900/30 p-3 rounded-lg border border-white/5">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">
                        Scale
                      </span>
                      <span className="text-xs text-white font-medium">
                        1024 x 1536
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-white/5 bg-[#0a0a0c]">
                  <button
                    onClick={() => handleRemix(selectedImage.prompt)}
                    className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-95"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    Remix this Style
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
