"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, CheckCircle2, Copy, HelpCircle, BookOpen, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// 定义丰富的数据接口
interface ModelPageProps {
  title: string;
  subtitle: string;
  bgImage: string;
  modelName: string;
  
  // 1. 生成器部分
  features: string[];
  
  // 2. 画廊数据
  samples: { image: string; prompt: string }[];
  
  // 3. 提示词指南 (SEO 核心)
  promptGuide: {
    triggerWords: string[]; // 触发词
    bestTags: string[];     // 推荐标签
    negativePrompt: string; // 推荐负向词
    tips: string;           // 专家建议
  };

  // 4. 教程步骤
  howToSteps: { title: string; desc: string }[];

  // 5. FAQ 数据
  faqs: { question: string; answer: string }[];

  // 6. SEO 长文
  seoContent: { heading: string; text: string };
}

export default function ModelPageLayout({ 
  title, subtitle, bgImage, modelName, features, samples, promptGuide, howToSteps, faqs, seoContent 
}: ModelPageProps) {
  
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      
      {/* ================= HERO 生成区 ================= */}
      <section className="relative w-full py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={bgImage} alt={`${title} background`} className="w-full h-full object-cover opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-black/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/10 backdrop-blur-md text-xs font-bold text-purple-300 mb-6">
               <Sparkles className="w-3 h-3" /> {modelName} V6 Active
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-2xl text-white">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 mb-10 font-medium max-w-2xl mx-auto drop-shadow-md">
              {subtitle}
            </p>

            {/* 生成器模拟框 */}
            <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-3xl p-3 shadow-2xl ring-1 ring-white/5 max-w-3xl mx-auto text-left">
              <div className="relative">
                <textarea 
                  placeholder={`Enter prompt for ${modelName}... (Try: ${promptGuide.triggerWords[0]}...)`}
                  className="w-full h-32 bg-white/5 rounded-2xl border border-white/5 p-4 text-white placeholder-zinc-500 focus:outline-none focus:bg-black/50 resize-none transition-colors"
                />
              </div>
              <div className="mt-3 flex justify-between items-center px-1">
                 <div className="flex gap-2">
                    {features.slice(0,2).map((f, i) => (
                        <span key={i} className="text-[10px] bg-white/5 px-2 py-1 rounded text-zinc-400 border border-white/5 hidden sm:block">{f}</span>
                    ))}
                 </div>
                 <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95">
                  <Sparkles className="w-4 h-4" /> Generate Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 画廊 SHOWCASE (视觉吸引) ================= */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Masterpieces created with {modelName}</h2>
            <p className="text-zinc-400">Copy these prompts to start creating instantly.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {samples.map((sample, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 aspect-[2/3]">
                <img src={sample.image} alt={`${modelName} example`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-zinc-300 text-xs line-clamp-3 mb-4 italic leading-relaxed">"{sample.prompt}"</p>
                  <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-black hover:bg-zinc-200 rounded-lg text-xs font-bold transition-colors">
                    <Copy className="w-3 h-3" /> Copy Prompt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 核心干货：提示词指南 (SEO 权重极高) ================= */}
      <section className="py-20 bg-[#050505]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
             <BookOpen className="w-8 h-8 text-purple-500" />
             <h2 className="text-3xl font-bold text-white">{modelName} Prompting Guide</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
             {/* 左侧：必填词 */}
             <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" /> Essential Trigger Words
                </h3>
                <p className="text-sm text-zinc-400 mb-4">Always include these at the start of your prompt for best results:</p>
                <div className="flex flex-wrap gap-2">
                    {promptGuide.triggerWords.map((word, i) => (
                        <span key={i} className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg text-sm font-mono select-all cursor-pointer hover:bg-purple-500/30">
                            {word}
                        </span>
                    ))}
                </div>
             </div>

             {/* 右侧：推荐负向词 */}
             <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Recommended Negative Prompt</h3>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-zinc-400 text-xs font-mono leading-relaxed select-all">
                    {promptGuide.negativePrompt}
                </div>
             </div>
          </div>

          <div className="mt-8 bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
             <h3 className="text-lg font-bold text-white mb-2">Pro Tips for {modelName}</h3>
             <p className="text-zinc-400 leading-relaxed">{promptGuide.tips}</p>
          </div>
        </div>
      </section>

      {/* ================= 教程步骤 (Google How-to Schema) ================= */}
      <section className="py-20 bg-[#0a0a0a] border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">How to Generate {modelName} Art Free</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {howToSteps.map((step, i) => (
                <div key={i} className="relative p-6 bg-zinc-900 border border-white/5 rounded-2xl">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-zinc-800 border border-white/10 rounded-full flex items-center justify-center text-xl font-bold text-white">
                        {i + 1}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 mt-2">{step.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ & SEO Text (长尾词覆盖) ================= */}
      <section className="py-20 bg-[#050505]">
        <div className="container mx-auto px-4 max-w-4xl">
            {/* FAQ Accordion */}
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-20">
                {faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 rounded-xl bg-zinc-900/30 overflow-hidden">
                        <button 
                            onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                            className="w-full flex justify-between items-center p-5 text-left hover:bg-white/5 transition-colors"
                        >
                            <span className="font-semibold text-zinc-200">{faq.question}</span>
                            <Layers className={`w-4 h-4 text-zinc-500 transition-transform ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                        </button>
                        {openFaqIndex === i && (
                            <div className="p-5 pt-0 text-zinc-400 text-sm leading-relaxed border-t border-white/5 mt-2">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* SEO Article */}
            <div className="prose prose-invert prose-zinc max-w-none border-t border-white/10 pt-12">
              <h3 className="text-2xl font-bold text-white mb-4">{seoContent.heading}</h3>
              <div className="text-zinc-400 leading-7 whitespace-pre-line">
                {seoContent.text}
              </div>
            </div>
        </div>
      </section>

    </div>
  );
}