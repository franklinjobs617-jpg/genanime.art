"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations('HowItWorks');

  const steps = [
    {
      id: "01",
      title: t('steps.step1.title'),
      description: t('steps.step1.description'),
      imagePlaceholder: "Input Interface Shot",
    },
    {
      id: "02",
      title: t('steps.step2.title'),
      description: t('steps.step2.description'),
      imagePlaceholder: "Model Selector Shot",
    },
    {
      id: "03",
      title: t('steps.step3.title'),
      description: t('steps.step3.description'),
      imagePlaceholder: "Result & Upscale Shot",
    },
  ];

  return (
    <section className="py-24 bg-[#050505] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {t('title')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {t('subtitle')}
            </span>
          </h2>
          <p className="text-zinc-400 text-lg">
            {t('description')}
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
                <Image
                  src={`/screenshots/step${index + 1}-${index === 0 ? 'prompt' : index === 1 ? 'model' : 'result'}.png`}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
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