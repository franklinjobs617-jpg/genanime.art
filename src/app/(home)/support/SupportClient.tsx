"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    HelpCircle,
    Search,
    ChevronDown,
    MessageCircle,
    Book,
    Zap,
    Youtube,
    Github,
    LifeBuoy
} from "lucide-react";
import Header from "@/components/layout/Header";

const faqs = [
    {
        question: "How do I start generating images?",
        answer: "Simply navigate to the Generator page, enter a descriptive prompt in the input box, select your preferred model and style settings in the sidebar, and click 'Generate'. Your images will appear in the workspace below."
    },
    {
        question: "What are credits and how do they work?",
        answer: "Credits are used to power our AI models. Each generation consumes a specific number of credits depending on the complexity and quality settings. You receive free daily credits, and can purchase more via our pricing plans."
    },
    {
        question: "Can I use the images commercially?",
        answer: "Yes, users on our paid plans have full commercial rights to the images they generate. Free tier users are granted a personal use license. Please refer to our Terms of Service for full details."
    },
    {
        question: "How can I improve my results?",
        answer: "Using detailed, descriptive prompts with keywords related to style, lighting, and composition will yield better results. You can also explore our Gallery for inspiration and 'Remix' existing masterpieces."
    },
    {
        question: "Is there a Discord community?",
        answer: "Yes! We have a vibrant community on Discord where you can share your work, get tips from other artists, and talk directly to the developers."
    }
];

export default function SupportClient() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [search, setSearch] = useState("");

    const resources = [
        { icon: <Book className="w-6 h-6 text-purple-500" />, title: "Documentation", desc: "Detailed guides on all features", link: "#" },
        { icon: <Youtube className="w-6 h-6 text-red-500" />, title: "Video Tutorials", desc: "Learn visually with our channel", link: "#" },
        { icon: <MessageCircle className="w-6 h-6 text-blue-500" />, title: "Community Forum", desc: "Talk with other creators", link: "#" },
        { icon: <Github className="w-6 h-6 text-white" />, title: "API Reference", desc: "Build on top of our platform", link: "#" },
    ];

    return (
        <div className="min-h-screen bg-[#050507] text-white font-sans overflow-x-hidden">
            <Header />

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-1/4 right-[-5%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <main className="relative pt-32 pb-24 px-6 max-w-6xl mx-auto">
                {/* Hero */}
                <div className="text-center space-y-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest"
                    >
                        <LifeBuoy className="w-3.5 h-3.5" />
                        Support Center
                    </motion.div>
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight">How can we <span className="text-purple-500">help?</span></h1>
                        <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">Search our knowledge base or browse frequently asked questions below.</p>
                    </div>

                    <div className="relative max-w-2xl mx-auto group">
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[28px] border border-white/10 group-focus-within:border-purple-500/50 transition-all shadow-2xl" />
                        <div className="relative flex items-center px-8 py-5 gap-4">
                            <Search className="w-6 h-6 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search for help articles..."
                                className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-zinc-600"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Quick Resources */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {resources.map((res, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 bg-[#0A0A0E]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] hover:border-white/10 hover:-translate-y-1 transition-all cursor-pointer group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {res.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{res.title}</h3>
                            <p className="text-zinc-500 text-sm font-medium leading-relaxed">{res.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* FAQs */}
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-1 h-8 bg-purple-500 rounded-full" />
                        <h2 className="text-3xl font-bold tracking-tight">Popular Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.filter(f => f.question.toLowerCase().includes(search.toLowerCase())).map((faq, i) => (
                            <div key={i} className="bg-[#0A0A0E]/60 backdrop-blur-2xl border border-white/5 rounded-[24px] overflow-hidden">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-all"
                                >
                                    <span className="text-lg font-bold text-zinc-200">{faq.question}</span>
                                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-8 pb-8"
                                        >
                                            <div className="pt-2 text-zinc-400 text-base leading-relaxed font-medium">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mt-32 text-center space-y-8">
                    <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl rotate-12">
                        <Zap className="w-8 h-8 text-white fill-white" />
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold">Still stuck?</h2>
                        <p className="text-zinc-500 max-w-md mx-auto">Our support team is always ready to help you navigate through your creative journey.</p>
                    </div>
                    <button className="bg-white text-black px-10 py-4 rounded-full font-black text-sm hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        CONTACT AGENT
                    </button>
                </div>
            </main>
        </div>
    );
}
