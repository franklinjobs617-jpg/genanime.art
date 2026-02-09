"use client";

import {
    Sparkles, Check, Copy, Terminal, ChevronDown,
    ArrowRight, Eye, Users, Star, Award, ShieldCheck,
    MonitorPlay, Palette, Layers, Play, TrendingUp,
    Download, Heart, Globe, Cpu, Zap, Info, Lightbulb,
    Target, BarChart3, Smartphone, Camera, Wand2,
    Crown, ExternalLink, ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import Image from "next/image";
const faqs = [
    {
        q: "Can I use AI anime backgrounds for commercial advertising?",
        a: "Yes! All backgrounds generated with our professional plans include full commercial licensing. You can use them in your advertising campaigns, social media posts, marketing materials, and client work without any restrictions or royalties."
    },
    {
        q: "What file formats are available for anime ad backgrounds?",
        a: "We provide PNG, JPEG, SVG formats for static backgrounds, and MP4, GIF options for animated backgrounds. All formats are optimized for different advertising platforms including Instagram, Facebook, Google Ads, TikTok, and print media."
    },
    {
        q: "How do I ensure the background matches my brand colors?",
        a: "Our AI allows you to specify brand colors, mood preferences, and style guidelines. You can input your brand's hex codes, and the AI will generate backgrounds that align perfectly with your brand identity while maintaining anime aesthetics."
    },
    {
        q: "What's the difference between free and premium anime backgrounds?",
        a: "Free backgrounds come with watermarks and limited resolution (1024x1024). Premium backgrounds are watermark-free, available in up to 8K resolution, include commercial licensing, and offer advanced customization options like brand color matching."
    },
    {
        q: "How long does it take to generate AI ad background anime?",
        a: "Our AI generates professional-quality anime backgrounds in under 30 seconds. Batch generation of multiple variations takes 1-2 minutes, making it perfect for A/B testing different creative approaches."
    },
    {
        q: "Can I create animated anime backgrounds for video ads?",
        a: "Yes! Our premium plans include animated background generation. You can create subtle animations, particle effects, and dynamic lighting that work perfectly for video advertisements and social media content."
    }
];

const backgroundStyles = [
    {
        title: "Cyberpunk Cityscapes",
        desc: "A sprawling cyberpunk city at night, illuminated by vibrant neon signs and holographic ads, with flying vehicles creating light trails between towering skyscrapers.",
        features: ["Neon lighting", "Urban depth", "Futuristic UI elements"],
        placeholderId: "style-cyberpunk",
        href: "/ai-ad/cyberpunk-cityscape-neon-lights-futuristic-ui.webp"
    },
    {
        title: "Ethereal Fantasy",
        desc: "A magical fantasy landscape featuring majestic islands floating in a soft, pastel-colored sky, with mystical light particles drifting in the air.",
        features: ["Soft lighting", "Floating islands", "Mystical particles"],
        placeholderId: "style-fantasy",
        href: "/ai-ad/ethereal-fantasy-landscape-floating-islands-soft-light.webp"
    },
    {
        title: "Modern Slice of Life",
        desc: "A clean and minimalist modern interior bathed in bright daylight from large windows, showcasing clean lines and a relatable, serene living space.",
        features: ["Bright daylight", "Modern architecture", "Clean lines"],
        placeholderId: "style-modern",
        href: "/ai-ad/modern-slice-of-life-clean-architecture-bright-daylight.webp"
    }
];

export default function AIAdBackgroundAnimePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("cyberpunk anime cityscape, neon lights, advertising background, professional quality, 4k resolution");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#030305] text-white font-sans selection:bg-indigo-500/30">
            <main className="relative">

                {/* Hero Section */}
                <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-20 lg:py-0 gap-12 max-w-7xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#030305] via-[#050505] to-[#030305] -z-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.08),transparent_50%)]" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
                    </div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 space-y-8 pt-20 lg:pt-0"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400/90 text-sm font-medium backdrop-blur-sm">
                            <Crown className="w-4 h-4 text-indigo-400" />
                            Premium Advertising Assets
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                            Elevate Ads with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400">Anime Aesthetics</span>
                        </h1>

                        <p className="text-xl text-zinc-400 max-w-xl leading-relaxed">
                            Create stunning, commercial-grade <strong>AI ad background anime</strong>.
                            Engage the next generation of consumers with authentic, high-resolution art tailored for your brand.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="/generator"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/25 hover:scale-105"
                            >
                                Start Creating
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/gallery"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm group"
                            >
                                <ImageIcon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                                View Gallery
                            </Link>
                        </div>

                        <div className="flex items-center gap-6 pt-4 text-sm text-zinc-500 font-medium">
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-indigo-500" />
                                <span>Commercial License</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-indigo-500" />
                                <span>8K Resolution</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Visual Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 w-full max-w-xl lg:max-w-none"
                    >

                        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 group">
                            <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-zinc-600">
                                <Image
                                    src="/ai-ad-background-anime.webp"
                                    alt="Cyberpunk neon city street at night in anime aesthetic, rainy futuristic cityscape, high-quality AI generated background"
                                    fill // 替代之前的 width={full}
                                    priority // 如果是 Hero 区域首屏图，请务必加上此项以提升 LCP
                                    className="object-cover" // 确保图片不拉伸，完美填充容器
                                    sizes="100vw"
                                />
                            </div>

                            {/* Overlay Card Example */}
                            <div className="absolute bottom-6 right-6 left-6 bg-black/60 backdrop-blur-md p-6 rounded-xl border border-white/10 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">Generated Result</span>
                                    <div className="flex gap-1">
                                        <Star className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                                        <Star className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                                        <Star className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                                        <Star className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                                        <Star className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                                    </div>
                                </div>
                                <p className="text-white font-medium text-sm line-clamp-1">"Futuristic neon city street with rain..."</p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Visual Styles Section (Redesigned) */}
                <section className="py-24 bg-[#050505]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Curated Aesthetic Styles
                            </h2>
                            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                                Choose from professionally tuned anime styles optimized for engagement and brand alignment.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {backgroundStyles.map((style, i) => (
                                <div key={i} className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-indigo-500/30 transition-all duration-300">
                                    {/* Image Placeholder */}
                                    <div className="aspect-[3/2] w-full bg-zinc-800 relative overflow-hidden">
                                        {/* 
                                            USER: Replace this with actual style preview images.
                                            Size: ~400x300
                                        */}
                                        <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 text-zinc-600 bg-zinc-800/80">
                                            <Image src={style.href} width={400} height={300} alt={style.desc}></Image>
                                            <span className="text-xs font-mono uppercase tracking-wider">[{style.title} Image]</span>
                                        </div>
                                        {/* Hover Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                    </div>

                                    <div className="p-8 relative">
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">{style.title}</h3>
                                        <p className="text-zinc-400 mb-6 text-sm leading-relaxed">{style.desc}</p>

                                        <div className="flex flex-wrap gap-2">
                                            {style.features.map((feature, idx) => (
                                                <span key={idx} className="px-2.5 py-1 bg-white/5 rounded-md text-xs text-zinc-300 border border-white/5">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Performance/Success Section (Redesigned with Visuals) */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#030305] to-[#050505]" />

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 text-indigo-400 font-bold tracking-wider text-sm uppercase mb-6">
                                    <TrendingUp className="w-4 h-4" />
                                    Proven Results
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                    Why Top Brands Choose <br />
                                    <span className="text-white">Anime Aesthetics</span>
                                </h2>

                                <div className="space-y-8">
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                            <Users className="w-8 h-8 text-indigo-500" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-white mb-1">67%</div>
                                            <h4 className="text-lg font-semibold text-zinc-200 mb-2">Higher Engagement</h4>
                                            <p className="text-zinc-400 text-sm leading-relaxed">
                                                Campaigns using anime-style visuals consistently outperform traditional stock photography in social media engagement metrics.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                            <Target className="w-8 h-8 text-indigo-500" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold text-white mb-1">2.4x</div>
                                            <h4 className="text-lg font-semibold text-zinc-200 mb-2">Conversion Rate</h4>
                                            <p className="text-zinc-400 text-sm leading-relaxed">
                                                For Gen Z and Millennial demographics, authentically styled anime content drives significantly higher conversion actions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Image Placeholder for Statistics/Graph Visual */}
                            <div className="relative">
                                <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 relative">
                                    {/* 
                                        USER: Replace this with a visual representation of success.
                                        E.g., A graph overlaying an anime background, or a 'Before/After' comparison.
                                    */}
                                    <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-zinc-700">
                                        <BarChart3 className="w-20 h-20 opacity-50" />
                                        <Image src={"/ai-ad/anime-aesthetics-performance-data-visualization.webp"} fill alt="A data visualization dashboard demonstrating the success of anime aesthetics in marketing, showing significant growth in engagement and conversion rates through futuristic charts and anime-style graphics."></Image>
                                    </div>

                                    {/* Decorative Overlay Elements */}
                                    <div className="absolute top-10 right-10 bg-black/80 backdrop-blur border border-indigo-500/30 p-4 rounded-xl shadow-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-white font-mono text-xs">Live Analytics</span>
                                        </div>
                                        <div className="mt-2 text-2xl font-bold text-green-400">+128%</div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -z-10" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Advanced Features (Grid Layout) */}
                <section className="py-24 bg-[#050505]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Enterprise-Grade Features
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Commercial Rights",
                                    desc: "Full ownership of every generated asset. No royalties, no hidden fees.",
                                    icon: <Award className="w-6 h-6" />
                                },
                                {
                                    title: "8K Ultra-HD",
                                    desc: "Print-ready resolution suitable for billboards and large format displays.",
                                    icon: <MonitorPlay className="w-6 h-6" />
                                },
                                {
                                    title: "Brand Consistency",
                                    desc: "Train the AI on your brand colors and specific character styles.",
                                    icon: <Palette className="w-6 h-6" />
                                },
                                {
                                    title: "Batch Production",
                                    desc: "Generate hundreds of variations in minutes for A/B testing.",
                                    icon: <Layers className="w-6 h-6" />
                                },
                                {
                                    title: "Vector Export",
                                    desc: "Convert anime backgrounds to SVG for infinite scalability.",
                                    icon: <Wand2 className="w-6 h-6" />
                                },
                                {
                                    title: "API Access",
                                    desc: "Integrate generation directly into your marketing tools.",
                                    icon: <Terminal className="w-6 h-6" />
                                }
                            ].map((feature, i) => (
                                <div key={i} className="p-8 bg-zinc-900/50 rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all hover:bg-zinc-900">
                                    <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-500 mb-6">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 bg-[#030305]">
                    <div className="max-w-3xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-white mb-12 text-center">
                            Common Questions
                        </h2>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-6 text-left"
                                    >
                                        <span className="font-semibold text-zinc-200 pr-8">{faq.q}</span>
                                        <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-[#030305]" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

                    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                        <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">
                            Start Your Next Campaign
                        </h2>
                        <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                            Join over 50,000 marketers using AI to create high-conversion anime advertising assets.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/pricing"
                                className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:bg-zinc-200 transition-colors shadow-xl shadow-white/5"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                href="/gallery"
                                className="w-full sm:w-auto px-10 py-5 bg-transparent border border-zinc-700 text-white rounded-xl font-bold text-lg hover:bg-white/5 transition-colors"
                            >
                                Browse Styles
                            </Link>
                        </div>
                    </div>
                </section>

                {/* TAAFT Badge */}
                <div className="w-full flex justify-center items-center py-12 bg-[#030305] border-t border-white/5">
                    <a
                        href="https://theresanaiforthat.com/ai/animeai/?ref=featured&v=7340698"
                        target="_blank"
                        rel="nofollow"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <img
                            width="300"
                            src="https://media.theresanaiforthat.com/featured-on-taaft.png?width=600"
                            alt="Verified on There's An AI For That"
                            loading='lazy'
                        />
                    </a>
                </div>

            </main>
        </div>
    );
}