"use client";

import { motion } from "framer-motion";
import { Palette, User, Video, Sparkles, Lock } from "lucide-react";

const features = [
  {
    title: "High-Fidelity Anime Art",
    desc: "Generate professional-grade illustrations with perfect lighting. The ultimate anime ai art generator for creators.",
    icon: <Palette className="w-6 h-6" />,
    label: "Available Now",
    isComingSoon: false,
  },
  {
    title: "Character Design",
    desc: "Create consistent characters from head to toe. Ideal for anime ai generated business woman or fantasy heroes.",
    icon: <User className="w-6 h-6" />,
    label: "Available Now",
    isComingSoon: false,
  },
  {
    title: "AI Anime Video Generator",
    desc: "Coming Soon: Create professional anime openings and dynamic motion clips directly from your text prompts.",
    icon: <Video className="w-6 h-6" />,
    label: "Coming Soon",
    isComingSoon: true,
  },
];

export default function SEOContentSection() {
  return (
    <section className="py-24 bg-[#050505] text-zinc-300 relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 flex flex-col ${
                f.isComingSoon
                  ? "bg-zinc-900/10 border-white/5 grayscale"
                  : "bg-[#0F0F0F] border-white/5 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/10"
              }`}
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                      f.isComingSoon
                        ? "bg-zinc-950 border-white/5 text-zinc-600"
                        : "bg-zinc-900 border-white/5 text-zinc-100 group-hover:bg-purple-500/10 group-hover:text-purple-400"
                    }`}
                  >
                    {f.isComingSoon ? <Lock className="w-5 h-5" /> : f.icon}
                  </div>
                  <span
                    className={`text-[10px] font-mono border px-3 py-1 rounded-full uppercase tracking-wider ${
                      f.isComingSoon
                        ? "border-zinc-800 text-zinc-600"
                        : "border-purple-500/20 bg-purple-500/10 text-purple-400"
                    }`}
                  >
                    {f.label}
                  </span>
                </div>

                <h3
                  className={`text-xl font-bold mb-3 ${
                    f.isComingSoon
                      ? "text-zinc-600"
                      : "text-white group-hover:text-purple-300"
                  }`}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {f.desc}
                </p>

                {f.isComingSoon && (
                  <button className="mt-6 text-xs font-bold text-zinc-500 border border-zinc-800 rounded-lg py-2 hover:bg-zinc-800 transition-colors">
                    Get Notified on Launch
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEO Text Block - 依然包含视频关键词 */}
        <div className="max-w-5xl mx-auto relative">
          <div className="bg-zinc-900/30 backdrop-blur-sm p-8 md:p-14 rounded-[40px] border border-white/5 relative">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Leading the{" "}
                <span className="text-purple-400">AI Anime Revolution</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-zinc-400 text-sm leading-7">
              <p>
                Our platform is the most versatile{" "}
                <strong>anime ai art generator</strong>. We specialize in
                high-resolution image creation, from{" "}
                <strong>ai generated animated sprite</strong> sheets to
                professional character designs. Whether you need a full-body{" "}
                <strong>anime ai generated business woman</strong> or a custom
                mascot via our <strong>ai animal generator</strong>, we have you
                covered.
              </p>
              <p>
                The future is motion. We are actively developing our{" "}
                <strong>ai video generator anime opening</strong> module. Soon,
                you'll be able to transform your static{" "}
                <strong>ai generator anime</strong> creations into cinematic
                sequences. Join our waitlist to be the first to experience the
                power of <strong>AI animation generator</strong> technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
