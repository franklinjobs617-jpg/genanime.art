"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/routing"; 
import { motion } from "framer-motion";
import { 
  ArrowRight, Upload, Sparkles, Zap, Ghost, 
  Smartphone, Cpu, ChevronRight, HelpCircle, Star 
} from "lucide-react";

export default function BrHomePage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [prompt, setPrompt] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // --- Lógica do Slider (Arrastar) ---
  const handleMove = (clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  
  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleGlobalUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMove);
      window.addEventListener("mouseup", handleGlobalUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
    };
  }, [isDragging]);

  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div className="relative min-h-screen bg-[#020202] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* --- 1. Background Ambience --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full opacity-30"></div>
      </div>

      {/* --- 2. Hero Section --- */}
      <section className="relative pt-32 pb-20 px-6 z-10">
        <div className="container mx-auto max-w-5xl text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold mb-8 backdrop-blur-md"
          >
            <Star className="w-3 h-3 fill-current" />
            <span>IA GENERATIVA V3.0</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white leading-[1.1]"
          >
            Transforme sua Foto em <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400">
             Anime com IA
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Converta suas fotos em personagens de anime em segundos. Estilo real, 
            <span className="text-white font-semibold"> Studio Ghibli</span> e 
            <span className="text-white font-semibold"> Shonen</span> de forma gratuita.
          </motion.p>

          {/* Input Principal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-6 max-w-xl mx-auto w-full"
          >
            <div className="relative group w-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full opacity-20 group-focus-within:opacity-50 blur transition duration-500"></div>
              
              <div className="relative flex w-full bg-[#0F0F0F] border border-white/10 rounded-full p-1.5 items-center shadow-2xl">
                  <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Descreva: garota cyberpunk, cabelo rosa..."
                    className="flex-1 bg-transparent border-none text-white placeholder-zinc-500 px-6 py-3 focus:outline-none text-base"
                  />
                  <Link 
                     href={`/generator?prompt=${encodeURIComponent(prompt)}&style=Vibrant Anime`}
                     className="px-6 py-3 bg-white hover:bg-zinc-200 text-black rounded-full font-bold transition-all flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                     Criar <ArrowRight className="w-4 h-4" />
                  </Link>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
                <span>Ou use sua foto:</span>
                <Link 
                  href="/generator?mode=upload" 
                  className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors group px-3 py-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload de Imagem
                </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 3. Comparison Slider --- */}
      <section className="px-4 pb-32 z-10 relative">
        <div className="container mx-auto max-w-5xl">
          <div 
            ref={sliderRef}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_-15px_rgba(0,0,0,0.7)] bg-[#0A0A0A] group select-none cursor-ew-resize"
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
          >
            
            {/* Imagem DEPOIS (Fundo) */}
            <div className="absolute inset-0 bg-zinc-800">
               <img 
                 src="/br/rax71yrChMVeM9i3mtgAvx_1769064440281_na1fn_L2hvbWUvdWJ1bnR1L3NoaW5rYWlfc3R5bGVfd2FsbHBhcGVy.webp" 
                 alt="Anime Version" 
                 className="absolute inset-0 w-full h-full object-cover"
                 draggable={false}
               />
               <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 z-10">
                 <span className="text-xs font-bold text-white tracking-wider">DEPOIS</span>
               </div>
            </div>

            {/* Imagem ANTES (Corte) */}
            <div 
              className="absolute inset-0 bg-zinc-900 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
               <img 
                 src="/br/stRb86BCdyDMesVTjwmvdQ_1769052912478_na1fn_L2hvbWUvdWJ1bnR1L3JlYWxpc20 (2).webp" 
                 alt="Original Photo" 
                 className="absolute inset-0 w-[100vw] max-w-5xl h-full object-cover" 
                 style={{ width: 'calc(100vw - 2rem)', maxWidth: '64rem' }} 
                 draggable={false}
               />
               <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 z-10">
                 <span className="text-xs font-bold text-white tracking-wider">ANTES</span>
               </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-white/50 z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-md border-2 border-white/90 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                 <div className="flex gap-1">
                   <ChevronRight className="w-3 h-3 text-white rotate-180" />
                   <ChevronRight className="w-3 h-3 text-white" />
                 </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- 4. Section: Categorias com Imagem --- */}
      <section className="py-12 px-6 relative z-10 bg-[#020202]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
             
             {/* Card 1: Ghibli */}
             <Link href="/generator?style=Studio Ghibli" className="group relative rounded-3xl overflow-hidden border border-white/10 h-80 cursor-pointer">
                <img 
                  src="/br/ghibli_landscape_sample.webp" 
                  alt="Estilo Ghibli" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                  style={{ backgroundColor: '#1a2e1a' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-green-500/30">
                      <Ghost className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">Studio Ghibli</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-200">
                      Ideal para paisagens e fotos de casal com aquele toque nostálgico.
                    </p>
                </div>
             </Link>

             {/* Card 2: Shonen */}
             <Link href="/generator?style=Shonen" className="group relative rounded-3xl overflow-hidden border border-white/10 h-80 cursor-pointer">
                <img 
                  src="/br/shonen_action_sample.webp" 
                  alt="Estilo Shonen" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                  style={{ backgroundColor: '#2e1a2e' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-pink-500/30">
                      <Smartphone className="w-5 h-5 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">Shonen Style</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-200">
                      Traços fortes e vibrantes, perfeito para fotos de ação.
                    </p>
                </div>
             </Link>

             {/* Card 3: Cyberpunk */}
             <Link href="/generator?style=Cyberpunk" className="group relative rounded-3xl overflow-hidden border border-white/10 h-80 cursor-pointer">
                <img 
                  src="/feature-cyberpunk.webp" 
                  alt="Estilo Cyberpunk" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                  style={{ backgroundColor: '#1a2e2e' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 backdrop-blur-sm flex items-center justify-center mb-4 border border-cyan-500/30">
                      <Cpu className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Cyberpunk</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-200">
                      Cores neon e futurismo para destacar sua presença digital.
                    </p>
                </div>
             </Link>
          </div>
        </div>
      </section>


      {/* --- 6. FAQ Section --- */}
      <section className="py-24 z-10 relative border-t border-white/5 bg-zinc-900/10">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold mb-10 text-center tracking-tight">Perguntas Frequentes</h2>
          <div className="space-y-4">
             {[
               { q: "É gratuito usar o gerador?", a: "Sim, você pode gerar animes gratuitamente com créditos diários renováveis. Basta acessar a ferramenta e começar a criar." },
               { q: "A IA funciona com qualquer tipo de foto?", a: "Sim, mas fotos com boa iluminação, rosto visível e sem muitos elementos no fundo geram os melhores resultados com nossos modelos." },
               { q: "Posso usar as imagens comercialmente?", a: "Sim, todas as imagens geradas pela nossa plataforma são de sua propriedade intelectual total para uso pessoal ou comercial." }
             ].map((item, i) => (
               <div key={i} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors flex gap-4 items-start">
                 <HelpCircle className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
                 <div>
                   <h3 className="font-bold text-lg mb-2 text-zinc-100">{item.q}</h3>
                   <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- 7. Final CTA --- */}
      <section className="py-24 px-6 text-center z-10 relative">
        <div className="container mx-auto max-w-4xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-500/30 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-white tracking-tight">Pronto para criar seu Anime?</h2>
            <p className="text-indigo-200 mb-8 max-w-xl mx-auto text-lg">
              Junte-se a milhares de brasileiros que já estão usando o GenAnime ART para transformar suas selfies.
            </p>
            <Link 
              href="/generator" 
              className="inline-flex items-center px-10 py-4 bg-white text-indigo-950 rounded-full font-bold text-lg hover:bg-zinc-100 transition-all transform hover:scale-105 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
            >
              <Zap className="w-5 h-5 mr-2" />
              Gerar Anime Grátis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}