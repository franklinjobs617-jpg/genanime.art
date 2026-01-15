"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FAQSection() {
  const t = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = t.raw('items') as Array<{ q: string; a: string }>;

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center tracking-tight">
          {t('title')}
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer group select-none ${openIndex === i
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