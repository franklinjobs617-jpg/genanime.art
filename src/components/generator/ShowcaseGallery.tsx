"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import GalleryCard from "./GalleryCard";

const SHOWCASE_ITEMS = [
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

export default function ShowcaseGallery({ onSelect }: ShowcaseGalleryProps) {
  return (
    <div className="w-full space-y-12 py-12 pb-32">
      {/* Header with Outfit font and Gradient effect */}
      <div className="flex flex-col items-center text-center gap-3">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight font-outfit">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
            Inspiration Gallery
          </span>
        </h2>
        <p className="text-zinc-500 text-sm md:text-base font-medium max-w-lg">
          Discover and remix masterpiece creations from the community
        </p>
      </div>

      {/* Masonry Layout (Waterfall) */}
      <div className="columns-1 md:columns-3 xl:columns-4 gap-6 space-y-6">
        {SHOWCASE_ITEMS.map((item, idx) => (
          <GalleryCard
            key={idx}
            index={idx}
            src={item.image}
            prompt={item.prompt}
            style={item.style}
            ratio={item.ratio}
            onSelect={() => onSelect(item)}
          />
        ))}
      </div>

      {/* View Full Library Button */}
      <div className="flex justify-center pt-8">
        <Link
          href="/prompt-library"
          className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 rounded-2xl transition-all duration-300"
        >
          <span className="text-sm font-bold text-zinc-400 group-hover:text-white uppercase tracking-widest">
            View Full Library
          </span>
          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
}
