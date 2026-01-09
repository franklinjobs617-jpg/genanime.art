"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is this the best AI animation generator for beginners?",
      a: "Yes! Our interface is designed for everyone. You can use our AI video generator for anime openings or character motion without any technical skills. Just type your idea and generate."
    },
    {
      q: "Can I use the AI generated anime art for commercial purposes?",
      a: "Absolutely. Whether you create an 'anime ai generated business woman' for a presentation or assets for a game, you own the commercial rights to your creations on our paid plans."
    },
    {
      q: "How does the AI generated animated sprite feature work?",
      a: "Our specialized mode allows you to generate character sheets with transparent backgrounds. It ensures consistency across different poses, perfect for 2D game development."
    },
    {
      q: "What technology powers your anime AI generator?",
      a: "We use a custom-tuned, high-fidelity AI model optimized specifically for anime aesthetics. It excels at understanding complex prompts like 'ai animal generator' concepts or intricate mechanical details, surpassing generic off-the-shelf models."
    }
  ];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer group select-none ${
                openIndex === i 
                ? "bg-zinc-900/80 border-indigo-500/50" 
                : "bg-zinc-900/30 border-white/5 hover:border-white/20 hover:bg-zinc-900/50"
              }`}
            >
              <h3 className="text-lg font-medium text-white flex justify-between items-center">
                <span className={openIndex === i ? "text-indigo-300" : "text-zinc-200"}>{faq.q}</span>
                <span className={`flex-shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${openIndex === i ? "rotate-180 bg-indigo-500/20 text-indigo-400" : "bg-white/5 text-zinc-400 group-hover:bg-white/10"}`}>
                   {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </h3>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-zinc-400 text-sm leading-relaxed border-t border-white/5 mt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}