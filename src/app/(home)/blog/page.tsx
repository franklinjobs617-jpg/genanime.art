"use client";

import { Sparkles, Calendar, User, Clock, ChevronRight, Copy, Check, Info } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";



export default function BlogPage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        // 修复点：移除了 h-screen 和 overflow-hidden，让页面自然滚动
        <div className="min-h-screen w-full bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30">
            <main className="relative bg-[#08080A]">

                {/* --- Hero Section --- */}
                <section className="relative w-full h-[60vh] min-h-[500px] flex flex-col items-center justify-center px-6 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/gallery/ghibli-style-witch-flying-over-european-seaside-town.webp" // 建议换成这张图
                            className="w-full h-full object-cover opacity-40 scale-105 blur-[2px]"
                            alt="Blog Hero"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/60 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-4xl w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                                    2026 Guide
                                </span>
                                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
                                    <Calendar className="w-3 h-3" /> Jan 8, 2026
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter text-white mb-8 leading-[1.1]">
                                How to Create <span className="text-indigo-500 text-glow">Top-Tier</span> Anime Art in 2026?
                            </h1>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600 border border-white/10 flex items-center justify-center font-bold text-white shadow-lg">
                                        AI
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold text-white">AnimeAI Team</p>
                                        <p className="text-[11px] text-zinc-500">Tech Research</p>
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-white/10" />
                                <div className="flex flex-col">
                                    <p className="text-sm font-bold text-white">8 min</p>
                                    <p className="text-[11px] text-zinc-500">Read time</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- Content Section --- */}
                <section className="max-w-4xl mx-auto px-6 pb-32 relative z-10 -mt-10">
                    <div className="prose prose-invert prose-zinc max-w-none">
                        <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light mb-12">
                            In 2026, the boundaries of anime art are being redefined. If you are looking for the most powerful <strong>Anime AI Art Generator</strong>, you have come to the right place.
                        </p>

                        <h2 className="text-3xl font-bold text-white mt-16 mb-8 flex items-center gap-3 italic">
                            <Sparkles className="w-6 h-6 text-indigo-500" />
                            1. The 2026 Paradigm Shift
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                            Today's <strong>AI Art Generator Anime</strong> technology—powered by our Seedream engine—has moved beyond simple filters. We now focus on <strong>volumetric lighting</strong> and <strong>anatomical precision</strong>.
                        </p>

                        {/* 特色卡片 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
                                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20">
                                    <Sparkles className="w-6 h-6 text-indigo-400" />
                                </div>
                                <h3 className="text-white font-bold text-xl mb-3 uppercase tracking-tight">Seedream 4.0 Engine</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">Our proprietary model eliminates the "AI look" by introducing authentic hand-drawn textures and brushstroke simulation.</p>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                                    <Clock className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-white font-bold text-xl mb-3 uppercase tracking-tight">Instant RTX Upscale</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">Go from 1024px to crisp 4K in less than 2 seconds using cloud-based RTX 8090 clusters.</p>
                            </div>
                        </div>

                        {/* --- 重点：图片展示区 (配有 Prompt) --- */}
                        <div className="space-y-4 mb-16">
                            <div className="relative w-full aspect-video rounded-[32px] overflow-hidden border border-white/10 group shadow-2xl">
                                <img
                                    src="/gallery/modern-anime-girl-iridescent-jacket-holographic-aesthetic.webp"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    alt="Generation Example"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                                    <p className="text-white font-bold text-lg mb-2">Example: Cinematic Cyberpunk Style</p>
                                    <p className="text-zinc-300 text-sm italic">"Masterpiece, 1girl, holographic jacket, neon rain..."</p>
                                </div>
                            </div>
                            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Info className="w-4 h-4 text-indigo-400" />
                                    <span className="text-xs font-mono text-zinc-500">Prompt: masterpiece, best quality, 1girl, iridescent jacket, futuristic city...</span>
                                </div>
                                <button
                                    onClick={() => handleCopy("masterpiece, best quality, 1girl, iridescent jacket, futuristic city, neon lights, rainy street, cinematic lighting, highly detailed eyes, purple and cyan theme")}
                                    className="text-[10px] uppercase font-black text-indigo-400 hover:text-indigo-300 px-3 py-1 bg-indigo-500/10 rounded-full"
                                >
                                    Copy Prompt
                                </button>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mt-20 mb-8 italic">2. Three Steps to Masterpiece</h2>

                        <div className="space-y-12 mb-16">
                            <Step
                                num="01"
                                title="Define Your Archetype"
                                desc="Don't just say 'girl'. Describe the soul: 'Melancholic cyborg girl with silver hair' works 10x better."
                            />
                            <Step
                                num="02"
                                title="Set the Cinematic Vibe"
                                desc="Use lighting tags like 'tyndall effect', 'rim lighting', or 'god rays' to add depth to your anime art."
                            />
                            <Step
                                num="03"
                                title="The Upscale Polish"
                                desc="Always generate in 1:1 or 4:3 first, then use our 'Elite Upscale' to reveal micro-details in the eyes and hair."
                            />
                        </div>

                        {/* --- Prompt Template Code Block --- */}
                        <div className="bg-[#0A0A0C] border border-white/10 rounded-[32px] p-8 md:p-12 mb-16 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-indigo-400 font-black italic tracking-widest text-xs uppercase mb-6 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> Recommended 2026 Template
                                </h4>
                                <div className="bg-black/60 rounded-2xl p-6 font-mono text-indigo-100 text-sm md:text-xl mb-8 leading-relaxed border border-white/5 select-all">
                                    (masterpiece:1.2), best quality, 1girl, [CHARACTER_DESC], [ACTION], [BACKGROUND], cinematic lighting, [ART_STYLE]
                                </div>
                                <button
                                    onClick={() => handleCopy("(masterpiece:1.2), best quality, 1girl, [CHARACTER_DESC], [ACTION], [BACKGROUND], cinematic lighting, [ART_STYLE]")}
                                    className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center gap-3 active:scale-95"
                                >
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    {copied ? "Copied!" : "Copy Full Template"}
                                </button>
                            </div>
                            <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
                        </div>

                        {/* --- FAQ Section --- */}
                        <h2 className="text-3xl font-bold text-white mt-20 mb-8 italic">3. Creator FAQ</h2>
                        <div className="space-y-4 mb-20">
                            <FaqItem q="How to get sharp lines like modern anime?" a="Use the tag 'flat color' combined with 'sharp focus' and ensure you are using the Seedream 4.5 model." />
                            <FaqItem q="Is commercial use allowed?" a="Yes, Pro plan subscribers have full commercial ownership of all generated images." />
                        </div>
                    </div>

                    {/* --- CTA Section --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-12 md:p-20 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[64px] text-center relative overflow-hidden group shadow-2xl"
                    >
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black italic text-white mb-6 leading-none">READY TO CREATE?</h2>
                            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-xl mx-auto">The portal to your imagination is open. Generate your first masterpiece in seconds.</p>
                            <Link href="/generator" className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-[32px] font-black text-xl hover:scale-105 transition-transform shadow-2xl">
                                Start Generating <ChevronRight className="w-6 h-6" />
                            </Link>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    </motion.div>
                </section>
            </main>
        </div>
    );
}

// 辅助组件
function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
    return (
        <div className="flex gap-8 group">
            <div className="text-5xl font-black text-white/5 group-hover:text-indigo-500/20 transition-colors font-mono leading-none">{num}</div>
            <div>
                <h3 className="text-2xl font-bold text-white mb-2 italic tracking-tight">{title}</h3>
                <p className="text-zinc-500 text-lg leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function FaqItem({ q, a }: { q: string; a: string }) {
    return (
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-all">
            <h4 className="text-white font-bold text-lg mb-2">Q: {q}</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">A: {a}</p>
        </div>
    );
}