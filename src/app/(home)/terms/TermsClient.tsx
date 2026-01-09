"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";

export default function TermsClient() {
    const sections = [
        {
            id: "acceptance",
            title: "1. Acceptance of Terms",
            content: "By accessing and using AnimeAI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
        },
        {
            id: "service",
            title: "2. Description of Service",
            content: "AnimeAI is an AI-powered image generation platform. We provide tools for creating, sharing, and managing digital artwork generated through our proprietary and third-party AI models."
        },
        {
            id: "responsibilities",
            title: "3. User Responsibilities",
            content: "You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree not to use the service for any illegal or unauthorized purpose."
        },
        {
            id: "copyright",
            title: "4. Content & Copyright",
            content: "As between you and AnimeAI, you own the content you generate. However, you grant AnimeAI a non-exclusive, worldwide, royalty-free license to use, host, and display the content for the purpose of providing and improving the service."
        },
        {
            id: "prohibited",
            title: "5. Prohibited Content",
            content: "Users may not generate content that violates our community guidelines, including but not limited to: hate speech, explicit illegal acts, or content that infringes on the intellectual property of others."
        },
        {
            id: "payments",
            title: "6. Subscription & Payments",
            content: "Paid subscriptions are billed according to the plan selected. Subscriptions can be cancelled at any time, but no refunds will be issued for partial billing cycles."
        },
        {
            id: "liability",
            title: "7. Limitation of Liability",
            content: "AnimeAI is provided 'as is' without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our service."
        }
    ];

    return (
        <div className="min-h-screen bg-[#000000] text-[#888888] font-sans selection:bg-white/20 overflow-x-hidden">
            <Header />

            <main className="relative pt-32 pb-40 px-6 max-w-[800px] mx-auto">

                {/* 头部信息：极其克制 */}
                <header className="mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-zinc-500 text-[11px] font-bold uppercase tracking-[0.2em]"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Legal Policy
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white"
                    >
                        Terms of Service
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-4 text-[13px] border-y border-white/5 py-4"
                    >
                        <span className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            Last updated on January 8, 2026
                        </span>
                    </motion.div>
                </header>

                {/* 正文区域：摒弃卡片，改用纯文字流和极细分割线 */}
                <div className="space-y-16">
                    {sections.map((section, i) => (
                        <motion.section
                            key={section.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="group"
                        >
                            <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-3">
                                {section.title}
                            </h2>
                            <div className="pl-0 md:pl-0">
                                <p className="text-[16px] md:text-[17px] leading-[1.7] text-[#888888] group-hover:text-[#BBBBBB] transition-colors duration-500">
                                    {section.content}
                                </p>
                            </div>
                        </motion.section>
                    ))}
                </div>
            </main>
        </div>
    );
}
