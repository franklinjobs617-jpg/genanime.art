"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image Container - 请在这里放入一张横向的、史诗感的动漫图 */}
      <div className="absolute inset-0 bg-zinc-900">
         {/* 占位符：请替换为 <img src="..." /> */}
         <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <span className="text-zinc-700 font-mono text-xl">[Epic Anime Background Image]</span>
         </div>
         {/* 如果你有图片，解开下面这行注释并替换 src */}
         {/* <img src="/images/cta-bg.jpg" className="w-full h-full object-cover opacity-40 mix-blend-overlay" /> */}
         
         {/* Gradient Overlay for Text Readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-purple-900/20" />
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl"
        >
          Ready to Create Your <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Masterpiece?
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-zinc-300 mb-12 max-w-2xl mx-auto font-medium"
        >
          Join thousands of creators turning their imagination into reality.
          <br className="hidden md:block"/> 
          Start generating professional anime art in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/generator" 
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full text-lg font-bold shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
            
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>Generate Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <span className="text-sm text-zinc-500 font-medium mt-4 md:mt-0 md:ml-4">
            No credit card required
          </span>
        </motion.div>
      </div>
    </section>
  );
}