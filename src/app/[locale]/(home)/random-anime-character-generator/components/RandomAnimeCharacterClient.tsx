"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, RefreshCw, Copy, Check, ArrowRight,
  Wand2, Zap, BookOpen, Heart, X, Trash2, Users,
} from "lucide-react";
import { generateCharacters, GeneratedCharacter, ARCHETYPES } from "../lib/characterData";

const COUNT_OPTIONS = [1, 2, 3, 4, 6];
const STORAGE_KEY = "anime-saved-characters";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What is a random anime character generator?",
    a: "It creates a complete anime character instantly — including a Japanese name, archetype, appearance, special ability, and backstory. Our generator also lets you create an AI portrait with one click.",
  },
  {
    q: "What character types can I generate?",
    a: "8 archetypes: Hero, Warrior, Mage, Villain, Idol, Ninja, Healer, and Mysterious. Each has unique outfits, abilities, and backstory templates.",
  },
  {
    q: "Can I generate art of my character?",
    a: "Yes. Every card has a 'Generate Character Art' button that sends the character's details to our AI image generator and creates a portrait in seconds.",
  },
  {
    q: "Are the names authentic Japanese?",
    a: "Yes. Every name includes kanji, a romanized reading, and a meaning based on real Japanese naming conventions.",
  },
];

// ─── localStorage hook ────────────────────────────────────────────────────────
function useSavedCharacters() {
  const [saved, setSaved] = useState<GeneratedCharacter[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: GeneratedCharacter[]) => {
    setSaved(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const save = useCallback((char: GeneratedCharacter) => {
    setSaved(prev => {
      if (prev.some(c => c.id === char.id)) return prev;
      const next = [char, ...prev];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setSaved(prev => {
      const next = prev.filter(c => c.id !== id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => saved.some(c => c.id === id), [saved]);

  return { saved, save, remove, isSaved, mounted };
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-white/8 rounded-xl overflow-hidden cursor-pointer hover:border-white/15 transition-colors"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between px-5 py-4 gap-4">
        <p className="text-sm font-semibold text-white/80">{q}</p>
        <span className={`shrink-0 text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed border-t border-white/5 pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Archetype gradient map ───────────────────────────────────────────────────
const ARCHETYPE_GRADIENTS: Record<string, string> = {
  Hero:       "from-yellow-500/30 via-orange-500/20 to-transparent",
  Warrior:    "from-red-600/30 via-red-500/20 to-transparent",
  Mage:       "from-purple-600/30 via-violet-500/20 to-transparent",
  Villain:    "from-rose-700/30 via-pink-600/20 to-transparent",
  Idol:       "from-pink-500/30 via-fuchsia-400/20 to-transparent",
  Ninja:      "from-cyan-600/30 via-teal-500/20 to-transparent",
  Healer:     "from-emerald-500/30 via-green-400/20 to-transparent",
  Mysterious: "from-indigo-600/30 via-blue-500/20 to-transparent",
};

// ─── Saved Drawer ─────────────────────────────────────────────────────────────
function SavedDrawer({
  saved,
  onRemove,
  onClose,
}: {
  saved: GeneratedCharacter[];
  onRemove: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 260 }}
      className="fixed top-0 right-0 h-full w-full sm:w-[380px] bg-[#0a0a0c] border-l border-white/8 z-[80] flex flex-col shadow-2xl shadow-black/60"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <div className="flex items-center gap-2">
          <Heart size={16} className="text-pink-400" fill="currentColor" />
          <span className="font-black text-white text-sm">My Roster</span>
          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black">
            {saved.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-16">
            <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
              <Heart size={24} className="text-pink-400/50" />
            </div>
            <p className="text-white/30 text-sm">No saved characters yet.</p>
            <p className="text-white/20 text-xs">Hit ❤️ on any card to save them here.</p>
          </div>
        ) : (
          <AnimatePresence>
            {saved.map((char) => (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                className={`relative rounded-xl border ${char.archetype.borderColor} bg-gradient-to-r ${ARCHETYPE_GRADIENTS[char.archetype.label]} p-3 flex items-center gap-3`}
              >
                <span className="text-2xl shrink-0">{char.archetype.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-white truncate">{char.name.reading}</p>
                  <p className={`text-[10px] font-bold ${char.archetype.color}`}>{char.archetype.label} · {char.gender}</p>
                  <p className="text-[10px] text-white/30 truncate">{char.name.japanese} · {char.name.meaning}</p>
                </div>
                <div className="flex flex-col gap-1.5 shrink-0">
                  <a
                    href={`/generator?prompt=${encodeURIComponent(char.artPrompt)}`}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white text-[10px] font-black transition-colors"
                  >
                    <Sparkles size={9} fill="currentColor" /> Art
                  </a>
                  <button
                    onClick={() => onRemove(char.id)}
                    className="flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/30 transition-colors"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      {saved.length > 0 && (
        <div className="p-4 border-t border-white/8">
          <p className="text-[10px] text-white/20 text-center">
            Saved to your browser · Clears if you clear site data
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ─── Character Card ───────────────────────────────────────────────────────────
function CharacterCard({
  character,
  index,
  isSaved,
  onSave,
}: {
  character: GeneratedCharacter;
  index: number;
  isSaved: boolean;
  onSave: (char: GeneratedCharacter) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [saveAnim, setSaveAnim] = useState(false);
  const { archetype } = character;
  const gradient = ARCHETYPE_GRADIENTS[archetype.label] ?? "from-purple-600/20 to-transparent";
  const artUrl = `/generator?prompt=${encodeURIComponent(character.artPrompt)}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(character.artPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSaved) {
      setSaveAnim(true);
      setTimeout(() => setSaveAnim(false), 600);
      onSave(character);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-[#0c0c0e] hover:border-white/16 transition-colors duration-300"
    >
      {/* Portrait banner */}
      <div className={`relative h-28 bg-gradient-to-br ${gradient} flex items-center justify-between px-5 overflow-hidden`}>
        <div className={`absolute -right-8 -top-8 w-40 h-40 rounded-full border-2 ${archetype.borderColor} opacity-20`} />
        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full border ${archetype.borderColor} opacity-10`} />

        <div className="flex flex-col gap-1.5 z-10">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${archetype.bgColor} ${archetype.color} border ${archetype.borderColor}`}>
            {archetype.emoji} {archetype.label}
          </span>
          <div>
            <p className="text-xl font-black text-white leading-none">{character.name.reading}</p>
            <p className="text-[11px] text-white/50 mt-0.5">{character.name.japanese} · {character.name.meaning}</p>
          </div>
        </div>

        <div className="z-10 flex flex-col items-end gap-2">
          {/* Save button */}
          <motion.button
            onClick={handleSave}
            animate={saveAnim ? { scale: [1, 1.4, 0.9, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
              isSaved
                ? "bg-pink-500/20 border-pink-500/40 text-pink-400"
                : "bg-black/30 border-white/10 text-white/40 hover:text-pink-400 hover:border-pink-500/30"
            }`}
            title={isSaved ? "Saved" : "Save character"}
          >
            <Heart size={13} fill={isSaved ? "currentColor" : "none"} />
          </motion.button>
          <span className="text-3xl opacity-70 select-none">{archetype.emoji}</span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-white/40 capitalize">{character.gender}</span>
        </div>
      </div>

      {/* Traits row */}
      <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5">
        {[
          { label: "Hair", value: character.hairColor.name },
          { label: "Eyes", value: character.eyeColor.name },
          { label: "Style", value: character.archetype.label },
        ].map(({ label, value }) => (
          <div key={label} className="px-3 py-2.5 text-center">
            <p className="text-[9px] uppercase font-bold text-white/30 tracking-wider mb-0.5">{label}</p>
            <p className="text-xs font-semibold text-white/80 truncate">{value}</p>
          </div>
        ))}
      </div>

      {/* Personality */}
      <div className="px-4 pt-3 pb-2 flex flex-wrap gap-1.5">
        {character.personality.map((trait) => (
          <span key={trait} className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${archetype.bgColor} ${archetype.color} border ${archetype.borderColor}`}>
            {trait}
          </span>
        ))}
      </div>

      {/* Ability */}
      <div className="px-4 py-3 border-t border-white/5">
        <p className="text-[9px] uppercase font-black text-white/30 tracking-widest mb-1 flex items-center gap-1">
          <Zap size={8} /> Ability
        </p>
        <p className="text-xs text-white/70 leading-relaxed">{character.ability}</p>
      </div>

      {/* Backstory */}
      <div className="px-4 py-3 border-t border-white/5 flex-1">
        <p className="text-[9px] uppercase font-black text-white/30 tracking-widest mb-1 flex items-center gap-1">
          <BookOpen size={8} /> Backstory
        </p>
        <p className="text-xs text-white/50 leading-relaxed italic">{character.backstory}</p>
      </div>

      {/* CTAs */}
      <div className="p-4 border-t border-white/5 flex flex-col gap-2">
        <a
          href={artUrl}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 active:scale-95 transition-all text-white shadow-lg shadow-purple-500/20"
        >
          <Sparkles size={12} fill="currentColor" />
          Generate Character Art
          <ArrowRight size={12} />
        </a>
        <button
          onClick={handleCopy}
          className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95 ${
            copied
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-white/4 border-white/8 text-white/50 hover:text-white hover:bg-white/8"
          }`}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied!" : "Copy Prompt"}
        </button>
      </div>
    </motion.article>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function RandomAnimeCharacterClient() {
  const [characters, setCharacters] = useState<GeneratedCharacter[]>([]);
  const [count, setCount] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { saved, save, remove, isSaved, mounted } = useSavedCharacters();
  const gridRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      setCharacters(generateCharacters(count));
      setHasGenerated(true);
      setIsGenerating(false);
      setTimeout(() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }, 420);
  }, [count]);

  // Auto-generate on first load
  useEffect(() => {
    handleGenerate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />
          <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-indigo-600/8 blur-[100px] rounded-full" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-black uppercase tracking-widest mb-5">
              <Sparkles size={10} fill="currentColor" /> Free Character Generator
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Random Anime<br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Character Generator
              </span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Instantly create complete anime characters — name, archetype, abilities, and backstory. One click to generate AI art.
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Count selector */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-2xl p-1.5">
              {COUNT_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${
                    count === n
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : "text-white/40 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {n}
                </button>
              ))}
              <span className="text-[10px] text-white/25 font-bold uppercase tracking-widest px-2">chars</span>
            </div>

            {/* Generate button */}
            <motion.button
              onClick={handleGenerate}
              disabled={isGenerating}
              whileTap={{ scale: 0.96 }}
              className="relative flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-sm shadow-xl shadow-purple-500/25 hover:opacity-90 disabled:opacity-60 transition-all overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw size={14} />
                    </motion.div>
                    Generating…
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Wand2 size={14} />
                    {hasGenerated ? "Regenerate" : "Generate Characters"}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Character Grid ── */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid gap-4 ${
                count === 1 ? "grid-cols-1 max-w-sm mx-auto" :
                count === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto" :
                count === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" :
                "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-white/5 bg-white/3 overflow-hidden animate-pulse">
                  <div className="h-28 bg-white/5" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-white/5 rounded-full w-3/4" />
                    <div className="h-3 bg-white/5 rounded-full w-1/2" />
                    <div className="h-3 bg-white/5 rounded-full w-2/3" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : characters.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid gap-4 ${
                count === 1 ? "grid-cols-1 max-w-sm mx-auto" :
                count === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto" :
                count === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" :
                "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {characters.map((char, i) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  index={i}
                  isSaved={isSaved(char.id)}
                  onSave={save}
                />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Regenerate hint */}
        {hasGenerated && !isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8"
          >
            <button
              onClick={handleGenerate}
              className="inline-flex items-center gap-2 text-white/25 hover:text-white/60 text-xs font-semibold transition-colors"
            >
              <RefreshCw size={11} /> Generate new characters
            </button>
          </motion.div>
        )}
      </section>

      {/* ── Archetypes Showcase ── */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-white mb-2">8 Unique Archetypes</h2>
          <p className="text-white/40 text-sm">Each with distinct abilities, outfits, and backstory templates</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {ARCHETYPES.map((a) => (
            <div
              key={a.label}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border ${a.borderColor} ${a.bgColor} hover:scale-105 transition-transform cursor-default`}
            >
              <span className="text-2xl">{a.emoji}</span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${a.color}`}>{a.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-white mb-2">How It Works</h2>
          <p className="text-white/40 text-sm">Three steps from zero to a full character</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: "01", icon: <Wand2 size={20} />, title: "Pick a count", desc: "Choose 1–6 characters to generate at once. Mix archetypes for a full party." },
            { step: "02", icon: <Sparkles size={20} />, title: "Generate instantly", desc: "Get a complete character — name, appearance, ability, and backstory in under a second." },
            { step: "03", icon: <Heart size={20} />, title: "Save your roster", desc: "Hit ❤️ to save favorites to My Roster. Generate art with one click." },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} className="relative p-6 rounded-2xl border border-white/8 bg-white/2 hover:border-white/15 transition-colors">
              <div className="absolute top-4 right-4 text-[10px] font-black text-white/10 tracking-widest">{step}</div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                {icon}
              </div>
              <h3 className="text-sm font-black text-white mb-1.5">{title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-2xl mx-auto px-4 pb-24">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white mb-2">FAQ</h2>
        </div>
        <div className="space-y-2">
          {FAQS.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* ── Floating Roster Button ── */}
      <AnimatePresence>
        {mounted && saved.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setDrawerOpen(true)}
            className="fixed bottom-40 right-6 z-[70] flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#111] border border-white/10 shadow-2xl shadow-black/60 hover:border-pink-500/30 hover:bg-[#161616] transition-all"
          >
            <div className="relative">
              <Users size={16} className="text-pink-400" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-black flex items-center justify-center">
                {saved.length}
              </span>
            </div>
            <span className="text-sm font-black text-white">My Roster</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Saved Drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/50 z-[75] backdrop-blur-sm"
            />
            <SavedDrawer
              saved={saved}
              onRemove={remove}
              onClose={() => setDrawerOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
