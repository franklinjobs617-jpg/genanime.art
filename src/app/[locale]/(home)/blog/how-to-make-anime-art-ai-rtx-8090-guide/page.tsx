"use client";

import {
    Sparkles, Calendar, User, Clock, ChevronRight,
    Cpu, Cloud, Zap, Check, X as XIcon, Copy,
    MonitorPlay, Palette, Terminal, HelpCircle, ChevronDown,
    Layers, Wand2, ShieldCheck, ZapIcon, Hash, BookOpen,
    Lightbulb, Info, ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// --- FAQ 数据 ---
const faqs = [
    {
        q: "Do I really need an RTX 8090 for Anime AI generation?",
        a: "Technically, no. While local generation on an RTX 8090 offers immense power, it requires complex environment setups (Python, PyTorch). AnimeAI's cloud-based H100 clusters provide equivalent speed and higher reliability without any hardware investment."
    },
    {
        q: "What is the best model for 2026 anime styles?",
        a: "We recommend our 'Seedream V5' or 'Animagine XL' variants. These are specifically fine-tuned for modern cinematic aesthetics, high-dynamic-range (HDR) lighting, and anatomically correct character posing."
    },
    {
        q: "Can I generate commercial-grade wallpapers with this?",
        a: "Yes. By using our Elite Upscaler (4K/8K options), you can transform a standard generation into a professional wallpaper suitable for digital distribution or high-quality printing."
    },
    {
        q: "How can I fix messy hands or faces in AI art?",
        a: "In 2026, our engine uses 'Adetailer' technology. For best results, ensure your prompt includes facial/hand specific tags like 'detailed fingernails' or 'expressive eyes', or use our In-painting tool for targeted fixes."
    }
];

// --- 目录组件 ---
const sections = [
    { id: "myth", title: "Hardware Myth", icon: <Cpu className="w-4 h-4" /> },
    { id: "workflow", title: "The Workflow", icon: <Wand2 className="w-4 h-4" /> },
    { id: "prompts", title: "Prompt Secrets", icon: <Terminal className="w-4 h-4" /> },
    { id: "models", title: "Model Mastery", icon: <Layers className="w-4 h-4" /> },
    { id: "faq", title: "Common FAQ", icon: <HelpCircle className="w-4 h-4" /> },
];


export default function EnhancedBlogGuide() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [copied, setCopied] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const handleCopy = () => {
        navigator.clipboard.writeText("masterpiece, best quality, ultra-detailed, 1girl, vibrant colors, cinematic lighting, depth of field, sharp focus, 8k wallpaper");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#020204] text-zinc-200 font-sans selection:bg-indigo-500/30">

            <main className="relative">

                {/* --- Hero Section --- */}
                <section className="relative w-full h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/gallery/modern-anime-girl-iridescent-jacket-holographic-aesthetic.webp"
                            className="w-full h-full object-cover opacity-20 blur-[2px] scale-110"
                            alt="Professional Anime AI Generation Guide 2026"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/70 to-transparent" />
                        {/* 动态粒子效果模拟 */}
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                    </div>

                    <div className="relative z-10 max-w-5xl w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/5">
                                    Ultimate Blueprint 2026
                                </div>
                                <div className="h-px w-12 bg-white/10" />
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                                    <Calendar className="w-3 h-3" /> Jan 9, 2026
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white mb-8 leading-[0.9] drop-shadow-2xl">
                                Mastering <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">Anime AI</span> <br />
                                Without an RTX 8090
                            </h1>

                            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-medium leading-relaxed mb-12">
                                Stop waiting for next-gen GPUs. Learn how to generate <span className="text-white">top-tier anime art</span> using professional workflows and cloud acceleration.
                            </p>

                            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-xs">AI</div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-white uppercase tracking-tighter">Authored by</p>
                                        <p className="text-sm text-zinc-400 font-medium">AnimeAI Tech Lab</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm font-bold italic">15 min read</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <BookOpen className="w-4 h-4" />
                                    <span className="text-sm font-bold italic">Expert Level</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-32">

                    {/* --- 左侧粘性目录 --- */}
                    <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <Hash className="w-3 h-3" /> Navigation
                            </p>
                            {sections.map((sec) => (
                                <a
                                    key={sec.id}
                                    href={`#${sec.id}`}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeSection === sec.id ? "bg-white/5 text-indigo-400 translate-x-2" : "text-zinc-500 hover:text-zinc-300"
                                        }`}
                                >
                                    {sec.icon}
                                    {sec.title}
                                </a>
                            ))}
                        </div>

                        <div className="mt-12 p-6 rounded-[24px] bg-indigo-500/5 border border-indigo-500/10">
                            <Lightbulb className="text-indigo-400 w-5 h-5 mb-3" />
                            <p className="text-xs font-bold text-zinc-300 leading-relaxed italic">
                                "In 2026, 80% of professional anime creators use cloud-based inference for final renders."
                            </p>
                        </div>
                    </aside>

                    {/* --- 文章正文区域 --- */}
                    <article className="lg:col-span-9 space-y-24">

                        {/* Section: Myth */}
                        <section id="myth" className="scroll-mt-32">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-10 italic flex items-center gap-4">
                                <span className="text-indigo-500">01.</span> Why Search for RTX 8090?
                            </h2>
                            <div className="prose prose-invert prose-zinc max-w-none">
                                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                                    The buzz around <strong>Anime art AI generated RTX 8090</strong> setups stems from the massive compute requirement of 2026's latest architectures. With <strong>Animagine XL v5</strong> and <strong>Pony Diffusion Core</strong> requiring upwards of 32GB VRAM for high-quality batches, it's easy to see why hardware envy is real.
                                </p>

                                {/* Info Box */}
                                <div className="bg-[#0A0A0C] border-l-4 border-indigo-500 p-8 rounded-r-[24px] my-10 space-y-4">
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                                        <Info className="w-4 h-4" /> Technical Insight
                                    </div>
                                    <p className="text-zinc-300 font-medium">
                                        VRAM is the king of AI art. An 8K upscale can consume 24GB+ of memory instantly. While an 8090 is great, it’s often overkill when cloud H100 units can be leased for cents per generation.
                                    </p>
                                </div>

                                <p className="text-zinc-400 leading-relaxed">
                                    For 99% of creators, the bottleneck isn't your GPU—it's your <strong>workflow</strong>. Let's look at the actual stats:
                                </p>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                                    <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[32px] hover:border-white/10 transition-all">
                                        <p className="text-zinc-500 text-xs font-bold uppercase mb-2">Local Generation</p>
                                        <p className="text-3xl font-black text-white mb-4">45s / Image</p>
                                        <p className="text-sm text-zinc-500">Based on standard RTX 30/40 series cards running SDXL models.</p>
                                    </div>
                                    <div className="bg-indigo-500/5 border border-indigo-500/20 p-8 rounded-[32px] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                            <Zap className="w-16 h-16 text-indigo-500" />
                                        </div>
                                        <p className="text-indigo-400 text-xs font-bold uppercase mb-2">AnimeAI Cloud</p>
                                        <p className="text-3xl font-black text-white mb-4">0.8s / Image</p>
                                        <p className="text-sm text-zinc-400 font-medium leading-relaxed underline decoration-indigo-500/30">Sub-second inference powered by professional-grade A100/H100 clusters.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Workflow */}
                        <section id="workflow" className="scroll-mt-32 pt-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-10 italic flex items-center gap-4">
                                <span className="text-indigo-500">02.</span> Professional Workflow
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                {[
                                    { title: "Define Archetype", desc: "Start with the character soul—hair, eyes, and emotion tags.", icon: <Palette /> },
                                    { title: "Set Cinematic", desc: "Add 'tyndall effect', 'rim lighting', or 'bokeh' for that movie feel.", icon: <ZapIcon /> },
                                    { title: "Final Polish", desc: "Always use high-denoising upscaling for crisp lines.", icon: <ShieldCheck /> }
                                ].map((step, i) => (
                                    <div key={i} className="space-y-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                                            {step.icon}
                                        </div>
                                        <h3 className="font-black text-xl text-white italic">{step.title}</h3>
                                        <p className="text-sm text-zinc-500 leading-relaxed font-medium">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Section: Prompts */}
                        <section id="prompts" className="scroll-mt-32 pt-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-10 italic flex items-center gap-4">
                                <span className="text-indigo-500">03.</span> The Secret Prompt Formula
                            </h2>
                            <p className="text-lg text-zinc-400 leading-relaxed mb-12">
                                Mastering <strong>how to make anime art with AI</strong> requires a structured approach to prompting. Don't just type "anime girl". Use our proven multi-layered formula:
                            </p>

                            <div className="bg-[#0A0A0C] border border-white/5 rounded-[40px] overflow-hidden">
                                <div className="p-10 border-b border-white/5">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <Terminal className="w-5 h-5 text-indigo-400" />
                                            <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Prompt Deconstruction</span>
                                        </div>
                                        <button
                                            onClick={handleCopy}
                                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-xs font-bold"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                            {copied ? "Prompt Copied" : "Copy Template"}
                                        </button>
                                    </div>
                                    <div className="font-mono text-indigo-200 text-lg md:text-xl leading-relaxed bg-black/40 p-8 rounded-3xl border border-white/5 mb-10">
                                        (masterpiece:1.2), best quality, <span className="text-white underline decoration-indigo-500">[Subject]</span>, <span className="text-white underline decoration-purple-500">[Environment]</span>, <span className="text-white underline decoration-pink-500">[Style Tags]</span>, cinematic lighting, 8k wallpaper
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                                            <p className="text-[10px] font-black uppercase text-indigo-400 mb-1 tracking-widest">Quality Layer</p>
                                            <p className="text-xs text-zinc-400 font-medium italic">Ensures the engine uses maximum resolution and denoising.</p>
                                        </div>
                                        <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                                            <p className="text-[10px] font-black uppercase text-purple-400 mb-1 tracking-widest">Aesthetic Layer</p>
                                            <p className="text-xs text-zinc-400 font-medium italic">Defines if it's Ghibli, Makoto Shinkai, or Trigger style.</p>
                                        </div>
                                        <div className="p-4 bg-pink-500/10 rounded-2xl border border-pink-500/20">
                                            <p className="text-[10px] font-black uppercase text-pink-400 mb-1 tracking-widest">Vibe Layer</p>
                                            <p className="text-xs text-zinc-400 font-medium italic">Adds 'melancholic', 'dynamic action', or 'nostalgic'.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: FAQ */}
                        <section id="faq" className="scroll-mt-32 pt-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-12 italic flex items-center gap-4">
                                <span className="text-indigo-500">04.</span> Common Roadblocks
                            </h2>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 border border-white/10 rounded-[28px] overflow-hidden transition-all duration-300 hover:bg-white/[0.07]"
                                    >
                                        <button
                                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                            className="w-full flex items-center justify-between p-10 text-left"
                                        >
                                            <span className="text-xl font-bold text-white pr-8">{faq.q}</span>
                                            <ChevronDown className={`w-6 h-6 text-zinc-500 transition-transform duration-500 ${openFaq === index ? 'rotate-180' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {openFaq === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    <div className="px-10 pb-10 text-zinc-400 text-lg leading-relaxed font-medium">
                                                        {faq.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Footer CTA */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="mt-32 p-12 md:p-24 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 rounded-[64px] text-center relative overflow-hidden group"
                        >
                            <div className="relative z-10">
                                <h2 className="text-5xl md:text-7xl font-black italic text-white mb-8 tracking-tighter leading-none">
                                    YOUR MASTERPIECE <br /> AWAITS YOU.
                                </h2>
                                <p className="text-white/80 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Experience RTX 8090 speeds today. No hardware, no limits, just pure anime art.
                                </p>
                                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                    <Link href="/generator" className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-white text-black px-12 py-6 rounded-full font-black text-2xl hover:scale-105 transition-transform shadow-2xl active:scale-95">
                                        Start Creating <ArrowUpRight className="w-6 h-6" />
                                    </Link>
                                    <Link href="/gallery" className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-black/20 backdrop-blur-md text-white border border-white/10 px-12 py-6 rounded-full font-black text-2xl hover:bg-white/10 transition-all">
                                        View Gallery
                                    </Link>
                                </div>
                            </div>

                            {/* 装饰发光元素 */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                        </motion.div>

                    </article>
                </div>
            </main>

        </div>
    );
}