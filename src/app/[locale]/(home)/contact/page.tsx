"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    MessageSquare,
    Send,
    Twitter,
    Github,
    Sparkles,
    MapPin,
    Phone
} from "lucide-react";
import Header from "@/components/layout/Header";



export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Show success message
        alert("Thank you for contacting us! We'll get back to you soon.");
        
        // Reset form
        setFormState({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    return (
        <div className="min-h-screen bg-[#050507] text-white font-sans overflow-x-hidden">
            <Header />

            {/* Background Glow */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full" />
            </div>

            <main className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="text-center space-y-4 mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tight"
                    >
                        Get in <span className="text-purple-500">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-medium"
                    >
                        Have questions or feedback? We&apos;d love to hear from you. Our team usually responds within 24 hours.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-12"
                    >
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
                            <div className="space-y-6">
                                {[
                                    { icon: <Mail className="w-6 h-6 text-purple-500" />, label: "Email", value: "admin@genanime.art" },
                                    { icon: <div className="w-6 h-6 flex items-center justify-center">D</div>, label: "Discord", value: "Join our Community" },
                                    { icon: <Twitter className="w-6 h-6 text-[#1DA1F2]" />, label: "Twitter", value: "@AnimeAI_Gen" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-6 p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-white/10 transition-all group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">{item.label}</p>
                                            <p className="text-lg font-bold text-zinc-200">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-[32px] space-y-4">
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                                <h3 className="text-xl font-bold">Business Inquiries</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Interested in API access or enterprise solutions? Reach out to our business team at <span className="text-white font-bold">admin@genanime.art</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-blue-600/10 blur-3xl opacity-50 -z-10" />
                        <form onSubmit={handleSubmit} className="bg-[#0A0A0E]/60 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 space-y-8 shadow-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">Subject</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="How can we help you?"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
                                    value={formState.subject}
                                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 pl-1">Message</label>
                                <textarea
                                    required
                                    placeholder="Tell us more about your inquiry..."
                                    rows={5}
                                    className="w-full bg-white/5 border border-white/10 rounded-[24px] px-6 py-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm resize-none"
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full group flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:brightness-110 px-8 py-5 rounded-[24px] text-base font-black text-white transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                            >
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                SEND MESSAGE
                            </button>
                        </form>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
