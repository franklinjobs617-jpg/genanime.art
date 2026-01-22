"use client";

import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Sliders, Zap, Leaf, Quote, Sparkles, HelpCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function GhibliPage({ params }: PageProps) {
  const [locale, setLocale] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        if (resolvedParams.locale !== 'pt') {
          notFound();
        }
        setLocale(resolvedParams.locale);
      } catch (error) {
        console.error('Error resolving params:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    resolveParams();
  }, [params]);

  // --- Slider Logic ---
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.clientX);
      }
    };

    const handleGlobalUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMove);
      document.addEventListener("mouseup", handleGlobalUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMove);
      document.removeEventListener("mouseup", handleGlobalUp);
    };
  }, [isDragging]);

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#020202] text-white font-sans selection:bg-green-500/30 overflow-x-hidden">

      {/* --- 1. Background Ambience (Ghibli Green Theme) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-600/10 blur-[100px] rounded-full opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] rounded-full opacity-30"></div>
      </div>

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">

          {/* --- Header / Hero --- */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-bold mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-3 h-3 fill-current" />
              <span>ESTILO ONLINE V3.0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white leading-[1.1]"
            >
              Seu Mundo no Estilo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-emerald-400">
                Studio Ghibli
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              A magia de Miyazaki nas suas fotos. Transforme paisagens e selfies em cenas de filme com nossa IA, 100% online e grátis.
            </motion.p>
          </div>

          {/* --- Functional Comparison Slider --- */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-24"
          >
            <div
              ref={sliderRef}
              className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_-15px_rgba(0,0,0,0.7)] bg-[#0A0A0A] group select-none cursor-ew-resize"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Image AFTER (Ghibli) */}
              <div className="absolute inset-0 bg-zinc-800">
                <img
                  src="/ghibli-style-portrait-after.webp"
                  alt="Ghibli Version"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 z-10">
                  <span className="text-xs font-bold text-white tracking-wider">DEPOIS</span>
                </div>
              </div>

              {/* Image BEFORE (Original) */}
              <div
                className="absolute inset-0 bg-zinc-900 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src="/ghibli-style-portrait-before.webp"
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
                  <Sliders className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </motion.section>

          {/* --- CTA Section --- */}
          <div className="text-center mb-24">
            <Link
              href="/generator"
              className="inline-flex items-center px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-100 transition-all transform hover:scale-105 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <Zap className="w-5 h-5 mr-2" />
              Aplicar Filtro Ghibli Agora
            </Link>
            <p className="mt-6 text-sm text-zinc-500 font-medium">100% Grátis • Sem Marca d&apos;Água</p>
          </div>

          {/* --- Content Grid (Bento Style) --- */}
          <div className="grid md:grid-cols-2 gap-6 mb-24">

            {/* Tech Explanation */}
            <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden group hover:border-green-500/20 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Leaf className="w-24 h-24 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-6">Como funciona a estética?</h2>
              <p className="text-zinc-400 leading-relaxed mb-6 text-lg">
                Nossa tecnologia não aplica apenas um filtro de cor. Ela reinterpreta a geometria da cena. Nuvens são transformadas em "cumulonimbus" volumosos, a grama ganha textura pintada à mão e a iluminação é suavizada.
              </p>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-300 border border-white/5">Mono no Aware</div>
                <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-300 border border-white/5">Nostalgia</div>
              </div>
            </div>

            {/* Expert Quote */}
            <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden hover:border-green-500/20 transition-colors flex flex-col justify-center">
              <Quote className="w-8 h-8 text-green-500/50 mb-6" />
              <p className="text-xl font-medium text-white italic leading-relaxed mb-6">
                "O segredo do 'Look Ghibli' está no verde e no azul. O GenAnime aumenta a saturação dos céus e aplica um tom ciano específico nas sombras, idêntico à paleta de Totoro."
              </p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="w-10 h-10 bg-green-900/30 rounded-full flex items-center justify-center text-green-400 font-bold border border-green-500/20">AI</div>
                <div>
                  <div className="text-white font-bold text-sm">Análise de Colorista</div>
                  <div className="text-zinc-500 text-xs">Equipe GenAnime</div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Comparison Table (Clean Dark) --- */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-white mb-10 text-center tracking-tight">GenAnime vs Filtros Comuns</h2>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="p-6 font-bold text-white">Recurso</th>
                    <th className="p-6 font-bold text-zinc-500 hidden md:table-cell">Filtros de App (Instagram)</th>
                    <th className="p-6 font-bold text-green-300 bg-green-500/5">GenAnime AI</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-400 text-sm">
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 font-medium text-white text-base">Céus e Nuvens</td>
                    <td className="p-6 hidden md:table-cell">Estáticos / Sem alteração</td>
                    <td className="p-6 font-bold text-white bg-green-500/5">Recriados volumetricamente</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 font-medium text-white text-base">Comida (Food Porn)</td>
                    <td className="p-6 hidden md:table-cell">Apenas contraste</td>
                    <td className="p-6 font-bold text-white bg-green-500/5">Estilo "Anime Food" apetitoso</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-medium text-white text-base">Resolução</td>
                    <td className="p-6 hidden md:table-cell">Baixa (Story)</td>
                    <td className="p-6 font-bold text-white bg-green-500/5">Alta (Até 4K)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* --- FAQ Section --- */}
          <section className="py-24 z-10 relative border-t border-white/5 bg-zinc-900/10">
            <div className="container mx-auto max-w-3xl px-6">
              <h2 className="text-3xl font-bold mb-10 text-center tracking-tight">Perguntas Frequentes</h2>
              <div className="space-y-4">
                <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors flex gap-4 items-start">
                  <HelpCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-zinc-100">Funciona com fotos de comida?</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">Sim! O estilo Ghibli é famoso por deixar a comida deliciosa. Experimente com fotos de ramen, ovos ou pães.</p>
                  </div>
                </div>
                <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors flex gap-4 items-start">
                  <HelpCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-zinc-100">Demora quanto tempo?</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">O processamento leva cerca de 5 a 10 segundos, dependendo da complexidade da imagem em nossos servidores GPU.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Final CTA --- */}
          <section className="py-24 px-6 text-center z-10 relative">
            <div className="container mx-auto max-w-4xl bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/20 rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-green-500/30 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black mb-6 text-white tracking-tight">Pronto para criar seu mundo Ghibli?</h2>
                <p className="text-green-200 mb-8 max-w-xl mx-auto text-lg">
                  Transforme suas fotos com a magia nostálgica do Studio Ghibli. Gratuito e sem marca d&apos;água.
                </p>
                <Link 
                  href="/generator?style=Studio Ghibli" 
                  className="inline-flex items-center px-10 py-4 bg-white text-green-950 rounded-full font-bold text-lg hover:bg-zinc-100 transition-all transform hover:scale-105 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Aplicar Filtro Ghibli
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}