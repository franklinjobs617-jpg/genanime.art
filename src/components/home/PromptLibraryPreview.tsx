"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Lightbulb, ArrowRight, Sparkles, Tag } from "lucide-react";

import Image from "next/image";

const featuredPrompts = [
  {
    id: 1,
    prompt: "Exquisite anime illustration in a retro-futuristic pop art style, a vibrant space cafe on a floating asteroid. 1980s anime aesthetic combined with modern high-detail rendering. Bold flat colors, halftone patterns...",
    image: "/prompt-example-sprite.webp",
    tags: ["Game Assets", "Sprite Sheet", "2D Art"]
  },
  {
    id: 2,
    prompt: "Literature Club by krenz cushart, stu_dts, yoshiku, wlop, trending on ArtStation, Pixiv, masterpiece, best quality, ultra-detailed, highres, 8k, cinematic lighting, sharp focus, intricate details",
    image: "/images/prompts/literature_club_by_3.webp",
    tags: ["Full Body", "Professional", "Office"]
  },
  {
    id: 3,
    prompt: "Serene anime illustration, a girl reading a book in a sun-drenched ancient library. Tyndall effect (God rays) piercing through large windows, illuminating floating dust particles. Intricate details of wooden bookshelves, thousands of books, and soft textures. Peaceful and nostalgic atmosphere, soft lighting, high-quality visuals, 8k, masterpiece, Kyoto Animation style.",
    image: "/images/prompts/library_sunlight_dust.webp",
    tags: ["Fantasy Animal", "Ethereal", "Creature"]
  }
];

export default function PromptLibraryPreview() {
  return (
    <section id="prompt-library" className="py-20 lg:py-28 bg-[#050505] text-white overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
          >
            Unlock Your Imagination with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              AI Prompts Library
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto"
          >
            Explore the ultimate <strong>AI anime generator</strong> library. Don't know what to write? Copy our high-quality prompts to create stunning art instantly.
          </motion.p>
        </div>

        {/* Grid Section */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {featuredPrompts.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-all duration-500 flex flex-col h-full shadow-lg hover:shadow-purple-900/10"
            >
              <div className="relative h-64 w-full overflow-hidden bg-zinc-800">
                <Image
                  src={item.image}
                  alt={`AI generated art`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={75}
                />

                {/* 仅在底部保留极小的渐变，让图片主体不被遮挡 */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                {/* 装饰性图标 */}
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>
              </div>

              {/* 内容区域 */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Tags 移到这里，清晰可见 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Prompt 区域 - 类似代码块的设计 */}
                <div className="flex-grow mb-6">
                  <div className="bg-[#050505] border border-white/5 rounded-xl p-3 relative group/code">
                    <p className="text-zinc-400 text-xs font-mono leading-relaxed line-clamp-4 italic">
                      "{item.prompt}"
                    </p>
                    {/* 视觉提示 */}
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-zinc-700 group-hover/code:bg-green-500 transition-colors" />
                  </div>
                </div>

                {/* 按钮区域 */}
                <Link
                  href={`/prompt-library/${item.id}`}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white text-zinc-200 hover:text-black font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  Try this Style
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <Link
            href="/prompt-library"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 rounded-full text-white text-lg font-bold transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 active:scale-95"
          >
            <Lightbulb className="w-5 h-5 fill-white" />
            Browse Full Prompt Collection
          </Link>
          <p className="mt-4 text-zinc-500 text-sm">
            Updates daily with new styles and models.
          </p>
        </motion.div>
      </div>
    </section>
  );
}