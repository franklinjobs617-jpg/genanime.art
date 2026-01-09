"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Eye, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import Header from "@/components/layout/Header";

export const metadata = {
  alternates: {
    canonical: 'https://genanime.art/privacy',
  },
};

export default function PrivacyPage() {
    const sections = [
        {
            title: "1. Information Collection",
            content: "We collect information you provide directly to us when you create an account, use our generation tools, or communicate with us. This includes your email address, billing information, and the prompts or images you upload for AI processing."
        },
        {
            title: "2. Technical Data",
            content: "When you access AnimeAI, we automatically collect certain technical information, including your IP address, browser type, device identifiers, and usage patterns through cookies and similar tracking technologies to ensure service stability."
        },
        {
            title: "3. Use of Information",
            content: "We use the collected data to maintain and improve our AI models, process transactions, and protect against fraudulent activity. We do not sell your personal data to third parties for marketing purposes."
        },
        {
            title: "4. Data Retention",
            content: "We store your personal information only as long as necessary to provide you with our services and for legitimate legal purposes. Generated images are stored according to your account settings and subscription plan."
        },
        {
            title: "5. Your Privacy Rights",
            content: "Depending on your location, you may have rights under GDPR, CCPA, or other privacy laws. These include the right to access, correct, or delete your personal data. You can exercise these rights through your account settings."
        },
        {
            title: "6. Security Measures",
            content: "We implement robust technical and organizational measures to protect your data, including end-to-end encryption for sensitive information. However, no method of transmission over the internet is 100% secure."
        },
        {
            title: "7. Policy Updates",
            content: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the effective date at the top."
        }
    ];

    return (
        <div className="min-h-screen bg-[#000000] text-[#888888] font-sans selection:bg-white/20 overflow-x-hidden">
            <Header />

            <main className="relative pt-32 pb-40 px-6 max-w-[800px] mx-auto">

                {/* 头部信息：与 Terms 保持高度一致 */}
                <header className="mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-zinc-500 text-[11px] font-bold uppercase tracking-[0.2em]"
                    >
                        <Eye className="w-4 h-4" />
                        Data Privacy
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-white"
                    >
                        Privacy Policy
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-4 text-[13px] border-y border-white/5 py-4"
                    >
                        <span className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            Effective Date: January 8, 2026
                        </span>
                    </motion.div>
                </header>

                {/* 正文区域：流线型纯文字排版 */}
                <div className="space-y-16">
                    {sections.map((section, i) => (
                        <motion.section
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="group"
                        >
                            <h2 className="text-white text-lg font-bold mb-4">
                                {section.title}
                            </h2>
                            <p className="text-[16px] md:text-[17px] leading-[1.7] text-[#888888] group-hover:text-[#BBBBBB] transition-colors duration-500">
                                {section.content}
                            </p>
                        </motion.section>
                    ))}
                </div>

            </main>
        </div>
    );
}