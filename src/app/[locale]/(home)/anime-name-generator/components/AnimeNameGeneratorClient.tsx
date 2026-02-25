"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Copy, Check, Sparkles, Wand2, Zap, ArrowRight } from "lucide-react";
import { GeneratedName, GenerationSettings, GenerationHistoryEntry, LocalStorageData } from "../lib/types";
import { generateAnimeNames } from "../lib/nameGenerator";
import { AnimeNameStorage } from "../lib/storage";
import HistoryPanel from "./HistoryPanel";
import DataManager from "./DataManager";

const ROLES = [
  { id: "hero",        label: "Hero",        emoji: "🌟", style: "modern"      as const, prompt: "brave anime protagonist, heroic pose, determined expression, vibrant colors" },
  { id: "warrior",     label: "Warrior",     emoji: "⚔️", style: "traditional" as const, prompt: "anime warrior, traditional Japanese armor, fierce battle stance, determined eyes" },
  { id: "mage",        label: "Mage",        emoji: "🔮", style: "fantasy"     as const, prompt: "anime mage, magical aura, mystical robes, glowing spell effects, fantasy" },
  { id: "villain",     label: "Villain",     emoji: "😈", style: "fantasy"     as const, prompt: "anime villain, dark mysterious aura, powerful and menacing, dramatic lighting" },
  { id: "idol",        label: "Idol",        emoji: "🎤", style: "modern"      as const, prompt: "anime idol, cute energetic expression, colorful outfit, sparkling stage" },
  { id: "mysterious",  label: "Mysterious",  emoji: "🌙", style: "mixed"       as const, prompt: "mysterious anime character, enigmatic expression, ethereal atmosphere, soft lighting" },
];

const DEFAULT_SETTINGS: GenerationSettings = { gender: "random", style: "mixed", quantity: 6 };

export default function AnimeNameGeneratorClient() {
  const [settings, setSettings]             = useState<GenerationSettings>(DEFAULT_SETTINGS);
  const [selectedRole, setSelectedRole]     = useState("hero");
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const [favorites, setFavorites]           = useState<GeneratedName[]>([]);
  const [history, setHistory]               = useState<GenerationHistoryEntry[]>([]);
  const [isGenerating, setIsGenerating]     = useState(false);
  const [activeTab, setActiveTab]           = useState<"generator" | "favorites" | "history">("generator");
  const [copiedId, setCopiedId]             = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = AnimeNameStorage.validateAndMigrateData();
      setFavorites(data.favorites);
      setHistory(data.history);
      setSettings(data.settings);
    } catch {
      setFavorites([]); setHistory([]); setSettings(DEFAULT_SETTINGS);
    }
  }, []);

  useEffect(() => { if (settings !== DEFAULT_SETTINGS) AnimeNameStorage.saveSettings(settings); }, [settings]);
  useEffect(() => { AnimeNameStorage.saveFavorites(favorites); }, [favorites]);
  useEffect(() => { AnimeNameStorage.saveHistory(history); }, [history]);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    await new Promise(r => setTimeout(r, 500));
    try {
      const role = ROLES.find(r => r.id === selectedRole) ?? ROLES[0];
      const activeSettings: GenerationSettings = { ...settings, style: role.style };
      const newNames = generateAnimeNames(activeSettings);
      setGeneratedNames(newNames);
      setHistory(prev => [{
        id: `history-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        names: newNames,
        settings: activeSettings,
        timestamp: Date.now(),
      }, ...prev].slice(0, 50));
      setActiveTab("generator");
    } finally {
      setIsGenerating(false);
    }
  }, [settings, selectedRole]);

  const handleFavorite = useCallback((name: GeneratedName) => {
    setFavorites(prev =>
      prev.find(f => f.id === name.id)
        ? prev.filter(f => f.id !== name.id)
        : [name, ...prev]
    );
  }, []);

  const handleCopy = useCallback(async (name: GeneratedName) => {
    const text = `${name.fullName} (${name.surnameReading} ${name.givenNameReading})`;
    try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
    setCopiedId(name.id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleDataImported = useCallback((data: LocalStorageData) => {
    setFavorites(data.favorites); setHistory(data.history); setSettings(data.settings);
  }, []);

  const handleDataCleared = useCallback(() => {
    setFavorites([]); setHistory([]); setGeneratedNames([]); setSettings(DEFAULT_SETTINGS);
  }, []);

  const isFavorited  = useCallback((id: string) => favorites.some(f => f.id === id), [favorites]);
  const currentRole  = ROLES.find(r => r.id === selectedRole) ?? ROLES[0];

  return (
    <div className="min-h-screen bg-[#02040a] text-white">
      {/* Ambient background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-fuchsia-900/20 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-12">
          <div>
            <div className="flex gap-2 mb-4 flex-wrap">
              {["JAPANESE", "AUTHENTIC", "FREE"].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-wider text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
              Anime Name{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">
                Generator
              </span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
              Pick your character type, get authentic Japanese names with meanings —
              then bring them to life with AI art.
            </p>
          </div>
          <div className="shrink-0">
            <DataManager onDataImported={handleDataImported} onDataCleared={handleDataCleared} />
          </div>
        </div>

        {/* Generator Card */}
        <div className="bg-[#0f1119]/80 border border-white/5 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl backdrop-blur-sm">

          {/* Step 1: Role */}
          <div className="mb-8">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
              1 — Choose Character Type
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {ROLES.map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 ${
                    selectedRole === role.id
                      ? "bg-fuchsia-500/20 border-fuchsia-500/50 text-white shadow-lg shadow-fuchsia-900/20"
                      : "bg-white/[0.03] border-white/5 text-zinc-400 hover:border-white/20 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-2xl leading-none">{role.emoji}</span>
                  <span className="text-xs font-bold">{role.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Gender + Generate */}
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">
                2 — Gender
              </p>
              <div className="flex gap-2 flex-wrap">
                {(["random", "male", "female"] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => setSettings(s => ({ ...s, gender: g }))}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                      settings.gender === g
                        ? "bg-white text-black"
                        : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {g === "random" ? "Any" : g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="h-12 px-8 bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white rounded-full font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-fuchsia-900/30 shrink-0"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  Generate Names
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        {(generatedNames.length > 0 || favorites.length > 0 || history.length > 0) && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {([
              { id: "generator" as const, label: "Results" },
              { id: "favorites" as const, label: `Saved (${favorites.length})` },
              { id: "history"   as const, label: "History" },
            ]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTab === tab.id ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        <AnimatePresence mode="wait">
          {activeTab === "generator" && (
            <motion.div key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {generatedNames.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                  {generatedNames.map((name, i) => (
                    <NameCard
                      key={name.id} name={name} idx={i}
                      rolePrompt={currentRole.prompt}
                      isFavorited={isFavorited(name.id)}
                      isCopied={copiedId === name.id}
                      onFav={() => handleFavorite(name)}
                      onCopy={() => handleCopy(name)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState onGenerate={handleGenerate} />
              )}
            </motion.div>
          )}

          {activeTab === "favorites" && (
            <motion.div key="fav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                  {favorites.map((name, i) => (
                    <NameCard
                      key={name.id} name={name} idx={i}
                      rolePrompt={currentRole.prompt}
                      isFavorited={true}
                      isCopied={copiedId === name.id}
                      onFav={() => handleFavorite(name)}
                      onCopy={() => handleCopy(name)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-zinc-500 mb-16">No saved names yet.</div>
              )}
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div key="hist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-16">
              <HistoryPanel
                history={history}
                onRestoreGeneration={(entry) => { setGeneratedNames(entry.names); setActiveTab("generator"); }}
                onClearHistory={() => setHistory([])}
                onRemoveEntry={(id) => setHistory(prev => prev.filter(e => e.id !== id))}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <RelatedTools />

        {/* SEO Content */}
        <article className="grid md:grid-cols-2 gap-12 mb-16 pt-16 border-t border-white/5">
          <div>
            <h2 className="text-2xl font-bold mb-4">About This Anime Name Generator</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Our <strong>anime name generator</strong> creates authentic Japanese character names based on real naming
              conventions. Each name includes kanji, romanized reading, and cultural meaning — perfect for writers,
              gamers, and creators.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Unlike other generators, you can instantly <strong>generate character art</strong> for any name using our
              AI image generator. Turn a name into a full character in seconds.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                { q: "Are the names authentic?",                    a: "Yes. All names use real Japanese kanji with proper readings and cultural meanings." },
                { q: "Can I use these names commercially?",         a: "Yes, all generated names are free to use for any purpose including games, stories, and manga." },
                { q: "What is a random anime character generator?", a: "A tool that creates unique Japanese character names instantly. Our generator also lets you create character art from any name." },
                { q: "How many names can I generate?",              a: "Up to 20 names per batch. The default is 6 for the best variety." },
              ].map((item, i) => (
                <div key={i} className="bg-[#0f1119] border border-white/5 rounded-xl p-4">
                  <p className="font-bold text-white text-sm mb-1">{item.q}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

      </main>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

interface NameCardProps {
  name: GeneratedName;
  idx: number;
  rolePrompt: string;
  isFavorited: boolean;
  isCopied: boolean;
  onFav: () => void;
  onCopy: () => void;
}

function NameCard({ name, idx, rolePrompt, isFavorited, isCopied, onFav, onCopy }: NameCardProps) {
  const prompt = encodeURIComponent(
    `anime character ${name.surnameReading} ${name.givenNameReading}, ${rolePrompt}, ${name.surnameMeaning} ${name.givenNameMeaning}, masterpiece, best quality`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.04, duration: 0.3 }}
      className="group flex flex-col bg-[#0f1119] border border-white/5 hover:border-fuchsia-500/30 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-fuchsia-900/10"
    >
      {/* Name + action buttons */}
      <div className="flex justify-between items-start mb-4">
        <div className="min-w-0 flex-1 pr-2">
          <h3 className="text-2xl font-black text-white tracking-tight leading-tight">{name.fullName}</h3>
          <p className="text-fuchsia-400 text-xs font-bold uppercase tracking-wider mt-1">
            {name.surnameReading} {name.givenNameReading}
          </p>
        </div>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={onFav}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            className={`p-2 rounded-full transition-all ${
              isFavorited
                ? "bg-pink-500/20 text-pink-400"
                : "bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={onCopy}
            aria-label="Copy name"
            className="p-2 rounded-full bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
          >
            {isCopied
              ? <Check className="w-4 h-4 text-green-400" />
              : <Copy className="w-4 h-4" />
            }
          </button>
        </div>
      </div>

      {/* Meaning */}
      <p className="flex-1 text-zinc-500 text-xs leading-relaxed border-t border-white/5 pt-3 mb-4">
        {name.surnameMeaning} · {name.givenNameMeaning}
      </p>

      {/* Generate Art CTA — the key differentiator */}
      <a
        href={`/generator?prompt=${prompt}`}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600/10 to-indigo-600/10 border border-fuchsia-500/20 text-fuchsia-300 text-sm font-bold hover:from-fuchsia-600/25 hover:to-indigo-600/25 hover:border-fuchsia-500/40 transition-all"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Generate Character Art
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}

function EmptyState({ onGenerate }: { onGenerate: () => void }) {
  return (
    <div className="text-center py-24 mb-16">
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl rounded-full" />
        <Wand2 className="relative w-12 h-12 text-fuchsia-500" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Pick a character type and generate</h3>
      <p className="text-zinc-500 mb-6 max-w-sm mx-auto">
        Each name comes with kanji, meaning, and a one-click art generator.
      </p>
      <button
        onClick={onGenerate}
        className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-full font-bold transition-all"
      >
        Generate Now
      </button>
    </div>
  );
}

function RelatedTools() {
  const tools = [
    { label: "AI Anime Art Generator", href: "/generator",      emoji: "🎨", desc: "Generate anime art from text" },
    { label: "Image to Prompt",        href: "/image-to-prompt", emoji: "🔍", desc: "Reverse-engineer any image" },
    { label: "Prompt Library",         href: "/prompt-library",  emoji: "📚", desc: "Browse curated prompts" },
    { label: "Anime Gallery",          href: "/gallery",         emoji: "🖼️", desc: "Explore community art" },
  ];

  return (
    <section className="mb-16 pt-8 border-t border-white/5">
      <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tools.map(tool => (
          <a
            key={tool.href}
            href={tool.href}
            className="bg-[#0f1119] border border-white/5 hover:border-fuchsia-500/20 rounded-2xl p-4 transition-all hover:-translate-y-0.5 group"
          >
            <span className="text-2xl mb-2 block">{tool.emoji}</span>
            <p className="font-bold text-white text-sm group-hover:text-fuchsia-400 transition-colors">{tool.label}</p>
            <p className="text-zinc-500 text-xs mt-1">{tool.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
