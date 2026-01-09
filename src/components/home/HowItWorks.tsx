"use client";

import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Describe Your Vision",
    description: "Type a prompt or use our smart assistant to craft the perfect description.",
    imagePlaceholder: "Input Interface Shot",
  },
  {
    id: "02",
    title: "Select Premium Model",
    description: "Choose from our curated list of high-fidelity anime models and styles.",
    imagePlaceholder: "Model Selector Shot",
  },
  {
    id: "03",
    title: "Generate & Refine",
    description: "Get high-res results instantly. Upscale, vary, or download your masterpiece.",
    imagePlaceholder: "Result & Upscale Shot",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#050505] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Professional Anime Art
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              in 3 Simple Steps
            </span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Streamlined workflow designed for both beginners and pro creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              {/* 视觉展示区 (Image Area) */}
              <div className="relative aspect-[4/3] w-full bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 mb-8 shadow-2xl group-hover:border-purple-500/30 transition-all duration-500">
                <img
                  src={`/screenshots/step${index + 1}-${index === 0 ? 'prompt' : index === 1 ? 'model' : 'result'}.png`}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* 步骤数字 */}
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl font-bold text-zinc-800 group-hover:text-purple-500/50 transition-colors duration-300 font-mono">
                  {step.id}
                </span>
                <div className="h-[1px] flex-1 bg-zinc-900 group-hover:bg-zinc-800 transition-colors"></div>
              </div>

              {/* 文字内容 */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                {step.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}