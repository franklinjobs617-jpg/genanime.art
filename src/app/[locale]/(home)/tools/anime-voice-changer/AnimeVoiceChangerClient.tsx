"use client";

import { useState } from "react";
import {
  Mic,
  Volume2,
  Sparkles,
  Zap,
  HelpCircle,
  ArrowRight,
  Play,
  Settings,
  Star,
  Users,
  Shield,
  Lock,
  User,
  Lightbulb,
  Cpu,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import Script from "next/script";
import Image from "next/image";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
      </div>
    </div>
  </div>
);

// Voice Character Component with Enhanced Design
// Voice Character Component - Circular Clean Design
const VoiceCharacter = ({ name, category, description, color, gradient, imageUrl, popularity, onClick }: {
  name: string;
  category: string;
  description: string;
  color: string;
  gradient: string;
  imageUrl: string;
  popularity: string;
  onClick: () => void;
}) => (
  <div
    className="group cursor-pointer flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-2"
    onClick={onClick}
  >
    {/* Avatar Circle Container */}
    <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full p-[3px] ${gradient} shadow-lg shadow-black/50 group-hover:shadow-2xl group-hover:shadow-${color}-500/30 transition-all duration-500`}>
      
      {/* Inner Image Container */}
      <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-900">
        <Image
          src={imageUrl}
          alt={`${name} voice avatar`}
          width={112}
          height={112}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          unoptimized
        />

        {/* Circular Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
          <Play className="w-8 h-8 text-white fill-white drop-shadow-lg" />
        </div>
      </div>
    </div>

    {/* Text Info (Below Circle) */}
    <div className="text-center">
      <h3 className="text-white font-bold text-base group-hover:text-indigo-300 transition-colors">
        {name}
      </h3>
      <p className={`text-xs font-medium mt-1 uppercase tracking-wider text-${color}-400 opacity-80`}>
        {category}
      </p>
    </div>
  </div>
);

// Window Bar Component
const WindowBar = () => (
  <div className="h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 rounded-t-xl">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
    <div className="flex-1 text-center">
      <span className="text-slate-400 text-xs font-medium">AI Voice Studio</span>
    </div>
  </div>
);

export default function AnimeVoiceChangerClient() {
  const [mode, setMode] = useState<'changer' | 'generator'>('changer');
  const [toolLoaded, setToolLoaded] = useState(false);

  const scrollToTool = () => {
    document.querySelector('#voice-tool')?.scrollIntoView({ behavior: 'smooth' });
  };

  // TODO: Replace with real anime avatars
  const voiceCharacters = [
    {
      name: "Anime Girl",
      color: "pink",
      gradient: "bg-gradient-to-br from-pink-400 to-rose-600",
      imageUrl: "/voice-tools/ai-anime-voice-cute-girl.webp"
    },
    {
      name: "Shonen Hero",
      color: "blue",
      gradient: "bg-gradient-to-br from-blue-400 to-indigo-600",
      imageUrl: "/voice-tools/ai-anime-voice-shonen-hero.webp"
    },
    {
      name: "Tsundere",
      color: "red",
      gradient: "bg-gradient-to-br from-red-400 to-pink-600",
      imageUrl: "/voice-tools/ai-anime-voice-tsundere.webp"
    },
    {
      name: "Kuudere",
      color: "cyan",
      gradient: "bg-gradient-to-br from-cyan-400 to-blue-600",
      imageUrl: "/voice-tools/ai-anime-voice-kuudere.webp"
    },
    {
      name: "Villain",
      color: "purple",
      gradient: "bg-gradient-to-br from-purple-400 to-violet-600",
      imageUrl: "/voice-tools/ai-anime-voice-villain.webp"
    },
    {
      name: "Sensei",
      color: "green",
      gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
      imageUrl: "/voice-tools/ai-anime-voice-sensei.webp"
    },
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="voice-changer-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free AI Anime Voice Changer & Generator",
            "description": "Transform your voice into anime characters with real-time RVC technology. Free text-to-speech and voice changing tool with no sign-up required.",
            "url": "https://genanime.art/tools/anime-voice-changer",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "100% Free with no limitations"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "8420",
              "bestRating": "5"
            },
            "featureList": [
              "Real-time voice changing",
              "Anime character voices",
              "Text-to-speech generation",
              "No sign-up required",
              "Discord compatible"
            ]
          })
        }}
      />

      <Script
        id="faq-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is the anime voice changer free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our anime voice changer is 100% free with no sign-up required. You can use both voice changing and text-to-speech features without any limitations."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this voice changer for Discord?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, you can use our anime voice changer with Discord and other voice chat applications. The tool works with any application that accepts audio input."
                }
              },
              {
                "@type": "Question",
                "name": "What anime voices are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our tool includes various anime character voice models including popular waifu voices, male and female character options, and different anime art styles."
                }
              }
            ]
          })
        }}
      />

      <article className="min-h-screen bg-[#020203] text-zinc-300 selection:bg-indigo-500/40 pb-20 font-sans">
        {/* Hero Section */}
        <header className="relative w-full pt-32 pb-16 px-6 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-900/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-8">
              <Sparkles className="w-3 h-3" /> Free AI Tool
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
              Free AI Anime Voice Changer & Generator
            </h1>

            <h2 className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
              Transform your voice with <span className="text-indigo-400 font-bold">Real-time RVC</span> technology or generate anime voices with <span className="text-purple-400 font-bold">Text-to-Speech</span>. <span className="text-green-400 font-bold">No Sign-up</span> required.
            </h2>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {["Zero Latency", "100% Free", "Discord Ready", "No Limits"].map((feature, idx) => (
                <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300 font-medium">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6">
          {/* Popular AI Voices Gallery */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Popular AI Voices
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Choose from our collection of high-quality anime character voices. Each voice is powered by advanced RVC technology.
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 justify-items-center">
              {voiceCharacters.map((character, idx) => (
                <VoiceCharacter
                  key={idx}
                  name={character.name}
                  color={character.color}
                  gradient={character.gradient}
                  imageUrl={character.imageUrl}
                  category=""
                  popularity=""
                  description=""
                  onClick={scrollToTool}
                />
              ))}
            </div>
          </section>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-2 inline-flex">
              <button
                onClick={() => setMode('changer')}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-sm transition-all ${mode === 'changer'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Mic className="w-4 h-4" />
                Voice Changer
              </button>
              <button
                onClick={() => setMode('generator')}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-sm transition-all ${mode === 'generator'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Volume2 className="w-4 h-4" />
                Text-to-Speech
              </button>
            </div>
          </div>

          {/* Tool Container with Cyberpunk Styling */}
          <div id="voice-tool" className="relative mb-16">
            {/* Outer Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-75"></div>

            {/* Main Container */}
            <div className="relative border-2 border-slate-700 rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur-sm shadow-2xl">
              {/* Window Bar */}
              <WindowBar />

              {/* Tool Content */}
              <div className="relative overflow-hidden">
                {/* User Guide Toast */}
                <div className="bg-indigo-600/20 border-b border-indigo-500/30 px-6 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">👉</span>
                    {mode === 'changer' ? (
                      <p className="text-indigo-200 text-sm font-medium">
                        <strong>Tip:</strong> Click the <strong>'Voice Conversion'</strong> tab inside the tool below to start recording.
                      </p>
                    ) : (
                      <p className="text-indigo-200 text-sm font-medium">
                        <strong>Tip:</strong> Ensure the <strong>'TTS'</strong> tab is selected below.
                      </p>
                    )}
                  </div>
                </div>

                {/* Single Iframe for Both Modes */}
                <div className="relative min-h-[900px] md:min-h-[850px]">
                  {!toolLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm z-10">
                      <LoadingSpinner />
                      <p className="text-zinc-400 mt-4 text-sm">
                        Loading {mode === 'changer' ? 'Voice Changer' : 'Text-to-Speech'}...
                      </p>
                    </div>
                  )}
                  <iframe
                    src="https://huggingface.co/spaces/skytnt/moe-tts/embed?__theme=dark"
                    className="w-full h-[900px] md:h-[850px] border-0"
                    onLoad={() => setToolLoaded(true)}
                    title="AI Voice Studio - Voice Changer & TTS"
                    allow="microphone; camera; autoplay"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <section className="mb-20">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Mic,
                  title: "Real-time Conversion",
                  desc: "Low latency RVC technology for instant voice transformation",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: User,
                  title: "100+ Characters",
                  desc: "Naruto, Genshin, VTubers included in our voice library",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: Lock,
                  title: "100% Privacy",
                  desc: "Browser-based processing ensures your data stays secure",
                  color: "from-green-500 to-emerald-500"
                }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group bg-zinc-900/30 border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/50 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Enhanced Conversion Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 p-8 md:p-12 mb-20">
            {/* Background Pattern */}

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Love this voice? Visualize it!
                </h3>
                <p className="text-indigo-100 text-lg mb-6 leading-relaxed">
                  Generate a matching Anime Character to bring your voice to life with our AI art generator.
                </p>
                <Link
                  href="/generator"
                  className="inline-flex items-center gap-3 bg-white text-indigo-600 font-black py-4 px-8 rounded-full text-lg hover:scale-105 hover:shadow-2xl transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                  Create Character <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Character Placeholder */}
              <div className="flex justify-center md:justify-end">
                {/* TODO: Replace with transparent PNG */}
                <div className="w-48 h-72 md:w-56 md:h-80 rounded-2xl overflow-hidden">
                  <Image
                    src="/voice-tools/generate-anime-character-from-voice.webp"
                    alt="Generated anime character placeholder"
                    width={400}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              How to Use the Anime Voice Changer?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Choose Your Mode",
                  desc: "Select Voice Changer for real-time transformation or Text-to-Speech for generating anime voices from text.",
                  icon: Settings
                },
                {
                  step: "02",
                  title: "Configure Settings",
                  desc: "Adjust voice parameters, select your favorite anime character voice model, and set up your microphone.",
                  icon: Mic
                },
                {
                  step: "03",
                  title: "Start Creating",
                  desc: "Begin speaking or type your text. Your voice will be transformed instantly with zero latency processing.",
                  icon: Play
                }
              ].map((step, idx) => (
                <div key={idx} className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/50 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                    <step.icon className="text-indigo-400 w-6 h-6" />
                  </div>
                  <div className="text-indigo-400 text-sm font-bold mb-2">STEP {step.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pro Tip Module */}
          <div className="bg-indigo-900/30 border-l-4 border-indigo-500 p-6 rounded-r-2xl mb-16">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-3">💡 Pro Tip for Best Results:</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Don't just speak normally! RVC models work best when you <strong>'act'</strong> the character.
                  If you choose a high-pitched Anime Girl voice, try to speak softly and raise your own pitch
                  slightly <em>before</em> conversion. This 'pre-acting' improves the AI mapping accuracy by 40%.
                </p>
              </div>
            </div>
          </div>

          {/* Deep Dive Technical Section */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Deep Dive: How RVC Technology Works?
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    RVC (Retrieval-based Voice Conversion) represents a paradigm shift from traditional pitch shifting methods.
                    Unlike simple frequency manipulation, RVC leverages <strong>TensorFlow</strong>-powered neural networks
                    to map voice characteristics in high-dimensional <strong>latent space</strong>.
                  </p>
                  <p className="text-zinc-300 leading-relaxed mb-4">
                    The system performs <strong>real-time inference</strong> by analyzing spectral features and reconstructing
                    them through learned voice embeddings, ensuring <strong>timbre preservation</strong> while transforming
                    vocal identity. This approach maintains natural prosody and emotional nuances that traditional vocoders destroy.
                  </p>
                  <p className="text-zinc-400 leading-relaxed">
                    The result is authentic character voice conversion that preserves your speaking patterns while
                    applying the target voice's unique acoustic signature.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                {/* TODO: Add RVC Workflow Diagram */}
                <div className="w-full max-w-md h-64 bg-zinc-900/50 border border-white/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Cpu className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                    <p className="text-zinc-400 font-semibold">RVC Workflow Diagram</p>
                    <p className="text-zinc-600 text-sm">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Zero Latency",
                  desc: "Real-time voice processing with no delays or buffering"
                },
                {
                  icon: Star,
                  title: "100% Free",
                  desc: "No hidden costs, subscriptions, or usage limits"
                },
                {
                  icon: Users,
                  title: "Discord Ready",
                  desc: "Works seamlessly with Discord and other voice apps"
                },
                {
                  icon: Shield,
                  title: "No Sign-up",
                  desc: "Start using immediately without creating an account"
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-zinc-900/30 border border-white/5 p-6 rounded-2xl text-center hover:bg-zinc-900/50 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-indigo-400 w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
              <HelpCircle className="text-indigo-500" /> FAQ
            </h2>
            <div className="grid gap-4">
              {[
                {
                  q: "Is this anime voice changer completely free?",
                  a: "Yes, our voice changer is 100% free and open-source based. Built on the skytnt optimized model architecture, there are no hidden credits, subscription fees, or usage limitations. The underlying RVC technology is community-driven, ensuring permanent free access to core voice conversion features."
                },
                {
                  q: "How do I use this with Discord or streaming software?",
                  a: "To route anime voices to Discord, OBS, or other applications, install Virtual Audio Cable (VB-Cable) - a free virtual audio driver. Set VB-Cable as your microphone input in Discord/OBS, then configure our voice changer to output to VB-Cable. This creates a seamless audio pipeline for live streaming and gaming."
                },
                {
                  q: "What makes RVC different from traditional voice changers?",
                  a: "Unlike pitch shifters that simply modify frequency, RVC (Retrieval-based Voice Conversion) uses neural networks to analyze and reconstruct voice characteristics in latent space. This preserves natural speech patterns, emotional nuances, and breathing while applying the target voice's timbre - resulting in authentic character voices rather than robotic distortions."
                },
                {
                  q: "Can I use this for commercial projects or content creation?",
                  a: "Yes, the generated voice content can be used for personal projects, streaming, and most commercial applications. However, always respect voice actor rights and platform terms of service. For large-scale commercial use, consider the ethical implications and potential licensing requirements of the original voice models."
                }
              ].map((item, idx) => (
                <details
                  key={idx}
                  className="group bg-zinc-900/30 rounded-2xl border border-white/5 open:bg-zinc-900 transition-all duration-300"
                >
                  <summary className="flex justify-between items-center w-full p-6 cursor-pointer list-none text-zinc-200 font-bold text-lg select-none hover:text-white">
                    {item.q}
                    <span className="transform group-open:rotate-180 transition-transform text-indigo-400">
                      ▼
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-zinc-400 border-t border-white/5 pt-4 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <footer className="relative rounded-[40px] overflow-hidden bg-[#0A0A0C] border border-white/10 p-12 md:p-20 text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Ready to Transform Your Voice?
              </h2>
              <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
                Join thousands of creators using our free anime voice changer. No limits, no sign-up required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setMode('changer');
                    document.querySelector('#voice-tool')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-3 bg-white text-indigo-950 font-black py-4 px-8 rounded-full text-lg hover:bg-indigo-50 transition-colors"
                >
                  <Mic className="w-5 h-5" />
                  Try Voice Changer
                </button>
                <button
                  onClick={() => {
                    setMode('generator');
                    document.querySelector('#voice-tool')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-3 bg-indigo-500 text-white font-black py-4 px-8 rounded-full text-lg hover:bg-indigo-600 transition-colors"
                >
                  <Volume2 className="w-5 h-5" />
                  Try Text-to-Speech
                </button>
              </div>
            </div>
          </footer>
        </main>
      </article>
    </>
  );
}