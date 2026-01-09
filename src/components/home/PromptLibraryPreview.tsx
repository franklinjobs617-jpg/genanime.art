"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lightbulb, ArrowRight } from "lucide-react";

// 示例精选 Prompt - 针对 SEO 关键词进行了优化
const featuredPrompts = [
  {
    id: 1,
    // 关键词: ai generated animated sprite (针对游戏开发者)
    prompt: "Game asset, 2D sprite sheet, fantasy knight character, idle animation, running frames, flat shading, transparent background, clean lines, ai generated animated sprite style",
    image: "/prompt-example-sprite.webp", 
    tags: ["Game Assets", "Sprite Sheet", "2D Art"]
  },
  {
    id: 2,
    // 关键词: anime ai generated business woman head to toe (高具体性长尾词)
    prompt: "Full body shot, professional office lady, navy blue suit, confident smile, modern skyscraper office background, 8k resolution, anime ai generated business woman head to toe",
    image: "/prompt-example-business.webp",
    tags: ["Full Body", "Professional", "Office"]
  },
  {
    id: 3,
    // 关键词: ai animal generator (潜力词)
    prompt: "Mystical spirit fox, glowing blue markings, floating in a cosmic nebula, ethereal atmosphere, digital painting, fantasy creature, created with ai animal generator",
    image: "/prompt-example-animal.webp",
    tags: ["Fantasy Animal", "Ethereal", "Creature"]
  }
];

export default function PromptLibraryPreview() {
  return (
    <section id="prompt-library" className="py-20 lg:py-28 bg-zinc-950 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-6 leading-tight"
        >
          Unlock Your Imagination with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">AI Prompts</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-zinc-300 text-center max-w-2xl mx-auto mb-16"
        >
          Explore the ultimate <strong>AI anime generator</strong> library. From specific <strong>animated sprites</strong> to full-body character designs, copy our prompts to create stunning art instantly.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {featuredPrompts.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-purple-500/20 transition-all duration-300 group"
            >
              <div className="relative h-56 w-full overflow-hidden">
                {/* 实际项目中请使用 next/image */}
                <img 
                  src={item.image} 
                  alt={`AI generated anime art: ${item.tags.join(', ')}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-zinc-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 flex flex-col h-full">
                <div className="flex-grow">
                   <p className="text-zinc-400 text-sm italic line-clamp-3 bg-zinc-950/50 p-3 rounded-lg border border-white/5">
                    "{item.prompt}"
                   </p>
                </div>
                <Link href={`/prompt-library/${item.id}`} className="mt-5 inline-flex items-center gap-2 text-purple-400 font-semibold group-hover:text-pink-400 transition-colors">
                  Try this Prompt <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link 
            href="/prompt-library" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full text-lg font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] active:scale-98"
          >
            <Lightbulb className="w-5 h-5" />
            Browse Full Prompt Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}