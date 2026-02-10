"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, History, Settings2, Copy, Check, Info, Zap, Star, Wand2, ArrowRight } from "lucide-react";
import { GeneratedName, GenerationSettings, GenerationHistoryEntry, LocalStorageData } from "../lib/types";
import { generateAnimeNames, validateGenerationSettings } from "../lib/nameGenerator";
import { AnimeNameStorage } from "../lib/storage";
import HistoryPanel from "./HistoryPanel";
import DataManager from "./DataManager";

// Default generation settings
const DEFAULT_SETTINGS: GenerationSettings = {
  gender: 'random',
  style: 'mixed',
  quantity: 6
};

export default function AnimeNameGeneratorClient() {
  // --- 核心逻辑保持 100% 不变 ---
  const [settings, setSettings] = useState<GenerationSettings>(DEFAULT_SETTINGS);
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const [favorites, setFavorites] = useState<GeneratedName[]>([]);
  const [history, setHistory] = useState<GenerationHistoryEntry[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'generator' | 'favorites' | 'history'>('generator');
  
  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  }>({
    message: '',
    type: 'success',
    visible: false
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  }, []);

  // Data Loading
  useEffect(() => {
    try {
      const data = AnimeNameStorage.validateAndMigrateData();
      setFavorites(data.favorites);
      setHistory(data.history);
      setSettings(data.settings);
    } catch (error) {
      console.error('Failed to load data:', error);
      setFavorites([]);
      setHistory([]);
      setSettings(DEFAULT_SETTINGS);
    }
  }, []);

  // Auto-save effects
  useEffect(() => { if (settings !== DEFAULT_SETTINGS) AnimeNameStorage.saveSettings(settings); }, [settings]);
  useEffect(() => { AnimeNameStorage.saveFavorites(favorites); }, [favorites]);
  useEffect(() => { AnimeNameStorage.saveHistory(history); }, [history]);

  const handleGenerate = useCallback(async () => {
    if (!validateGenerationSettings(settings)) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 600)); // Animation delay
    try {
      const newNames = generateAnimeNames(settings);
      setGeneratedNames(newNames);
      const historyEntry: GenerationHistoryEntry = {
        id: `history-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        names: newNames,
        settings: { ...settings },
        timestamp: Date.now()
      };
      setHistory(prev => [historyEntry, ...prev].slice(0, 50));
      setActiveTab('generator');
    } catch (error) {
      console.error('Name generation failed:', error);
      setGeneratedNames([]);
    } finally {
      setIsGenerating(false);
    }
  }, [settings]);

  const handleFavorite = useCallback((name: GeneratedName) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === name.id);
      if (exists) {
        showToast(`Removed ${name.fullName} from favorites`, 'success');
        return prev.filter(fav => fav.id !== name.id);
      } else {
        showToast(`Saved ${name.fullName}`, 'success');
        return [name, ...prev];
      }
    });
  }, [showToast]);

  const handleCopy = useCallback(async (name: GeneratedName) => {
    try {
      const copyText = `${name.fullName} (${name.surnameReading} ${name.givenNameReading})`;
      await navigator.clipboard.writeText(copyText);
      showToast(`Copied to clipboard`, 'success');
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = name.fullName;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showToast(`Copied to clipboard`, 'success');
      } catch (e) {
        showToast('Failed to copy', 'error');
      }
      document.body.removeChild(textArea);
    }
  }, [showToast]);

  const handleRestoreGeneration = useCallback((entry: GenerationHistoryEntry) => {
    setGeneratedNames(entry.names);
    setSettings(entry.settings);
    setActiveTab('generator');
    showToast(`Restored generation from history`, 'success');
  }, [showToast]);

  const handleClearHistory = useCallback(() => setHistory([]), []);
  const handleRemoveHistoryEntry = useCallback((id: string) => setHistory(prev => prev.filter(e => e.id !== id)), []);
  
  const handleDataImported = useCallback((data: LocalStorageData) => {
    setFavorites(data.favorites);
    setHistory(data.history);
    setSettings(data.settings);
  }, []);

  const handleDataCleared = useCallback(() => {
    setFavorites([]);
    setHistory([]);
    setGeneratedNames([]);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const isFavorited = useCallback((id: string) => favorites.some(fav => fav.id === id), [favorites]);

  // --- UI Components with "AnimeAI" Aesthetic ---
  
  const FilterPill = ({ label, value, options, onChange }: any) => (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest pl-1">{label}</label>
      <div className="relative">
        <select 
          value={value}
          onChange={onChange}
          className="w-full appearance-none bg-[#1a1b26] text-white border border-zinc-700/50 hover:border-indigo-500/50 rounded-full py-3 pl-5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer shadow-lg shadow-black/20"
        >
          {options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
          <Settings2 className="w-4 h-4" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-pink-500/30 overflow-x-hidden">
      
      {/* Background Ambience (Matching the dark aesthetic) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-fuchsia-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20" id="main-content">
        
        {/* Hero Section */}
        <section className="mb-16 relative">
          <div className="absolute top-0 right-0 z-20">
             <DataManager onDataImported={handleDataImported} onDataCleared={handleDataCleared} />
          </div>

          <div className="max-w-4xl">
            {/* Tags matching screenshot style */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {['JAPANESE NAMES', 'AUTHENTIC', 'KANJI', 'MEANINGS'].map((tag, i) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-wider text-zinc-300 flex items-center gap-1.5">
                  <Sparkles className="w-2.5 h-2.5 text-pink-500" />
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-white"
            >
              Anime Name <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500">
                Generator
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10"
            >
              Create <span className="text-white border-b border-white/20 pb-0.5">authentic</span> Japanese character names with cultural meanings and proper readings in seconds.
            </motion.p>
          </div>
        </section>

        {/* Interactive Generator Area */}
        <section className="relative mb-24">
          {/* Glass Card Container */}
          <div className="bg-[#0f1119]/80 backdrop-blur-md border border-white/5 rounded-[32px] p-2 md:p-3 shadow-2xl">
            
            {/* Controls */}
            <div className="bg-[#0a0b10] rounded-[24px] p-6 md:p-8 border border-white/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                <FilterPill 
                  label="Gender" 
                  value={settings.gender}
                  onChange={(e: any) => setSettings({...settings, gender: e.target.value})}
                  options={[
                    { value: 'random', label: 'Surprise Me' },
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'unisex', label: 'Unisex' }
                  ]}
                />
                <FilterPill 
                  label="Style Theme" 
                  value={settings.style}
                  onChange={(e: any) => setSettings({...settings, style: e.target.value})}
                  options={[
                    { value: 'mixed', label: 'Mixed Style' },
                    { value: 'traditional', label: 'Traditional' },
                    { value: 'modern', label: 'Modern' },
                    { value: 'fantasy', label: 'Fantasy' },
                    { value: 'sci-fi', label: 'Sci-Fi' }
                  ]}
                />
                <FilterPill 
                  label="Quantity" 
                  value={settings.quantity}
                  onChange={(e: any) => setSettings({...settings, quantity: parseInt(e.target.value)})}
                  options={[
                    { value: 3, label: '3 Names' },
                    { value: 6, label: '6 Names' },
                    { value: 9, label: '9 Names' },
                    { value: 12, label: '12 Names' },
                    { value: 20, label: '20 Names' }
                  ]}
                />

                {/* Primary Action Button - White Pill Style matching screenshot */}
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="h-[52px] w-full bg-white hover:bg-zinc-200 text-black rounded-full font-bold text-base transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-black" />
                      Start Creating
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Area */}
            <div className="mt-2 min-h-[300px] p-4 md:p-6 rounded-[24px] bg-[#0f1119]">
              
              {/* Tabs */}
              {(generatedNames.length > 0 || favorites.length > 0 || history.length > 0) && (
                <div className="flex justify-center mb-8">
                  <div className="inline-flex bg-black/40 p-1 rounded-full border border-white/5">
                    {[
                      { id: 'generator', label: 'Results' },
                      { id: 'favorites', label: `Saved (${favorites.length})` },
                      { id: 'history', label: 'History' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                          activeTab === tab.id 
                            ? 'bg-zinc-800 text-white shadow-lg' 
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {activeTab === 'generator' && (
                  <motion.div 
                    key="generator"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {generatedNames.length > 0 ? (
                      generatedNames.map((name, i) => (
                        <NameCard 
                          key={name.id} 
                          name={name} 
                          idx={i}
                          isFavorited={isFavorited(name.id)}
                          onFav={() => handleFavorite(name)}
                          onCopy={() => handleCopy(name)}
                        />
                      ))
                    ) : (
                      <EmptyState />
                    )}
                  </motion.div>
                )}

                {activeTab === 'favorites' && (
                  <motion.div 
                    key="favorites"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {favorites.length > 0 ? (
                      favorites.map((name, i) => (
                        <NameCard 
                          key={name.id} 
                          name={name} 
                          idx={i}
                          isFavorited={true}
                          onFav={() => handleFavorite(name)}
                          onCopy={() => handleCopy(name)}
                        />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-20 text-zinc-500">No favorites saved yet.</div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'history' && (
                  <motion.div 
                    key="history"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  >
                    <HistoryPanel 
                      history={history}
                      onRestoreGeneration={handleRestoreGeneration}
                      onClearHistory={handleClearHistory}
                      onRemoveEntry={handleRemoveHistoryEntry}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </div>
        </section>

        {/* --- ORIGINAL CONTENT SECTIONS (Unchanged text, optimized layout) --- */}
        
        {/* SEO/About - Enhanced with secondary keywords */}
        <article className="grid md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-5">
            <h2 className="text-3xl font-bold text-white mb-6">About Our Anime Name Generator</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Our <strong>anime name generator</strong> creates authentic Japanese character names based on traditional naming conventions.
              As the best <strong>anime character name generator</strong>, each name includes proper kanji characters, romanized readings, and cultural meanings.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Whether you need <strong>random anime name generator</strong> results or specific styles, our <strong>anime names generator</strong> provides names that
              sound natural and carry meaningful cultural significance for your creative projects.
            </p>
          </div>
          <div className="md:col-span-7">
             <div className="grid sm:grid-cols-2 gap-4">
               {[
                 { title: "Instant Generation", desc: "Generate up to 20 unique anime names instantly with our advanced algorithm. No waiting, no limits." },
                 { title: "Save Favorites", desc: "Keep track of your favorite names with our built-in favorites system. Never lose a great name again." },
                 { title: "Generation History", desc: "Access your previous generations with our comprehensive history system. Search and filter easily." },
                 { title: "Commercial Use", desc: "All names are free to use for your stories, games, manga, and creative projects." }
               ].map((f, i) => (
                 <div key={i} className="bg-[#0f1119] border border-white/5 p-6 rounded-2xl hover:border-fuchsia-500/30 transition-colors group">
                   <h3 className="font-bold text-white mb-2 group-hover:text-fuchsia-400 transition-colors">{f.title}</h3>
                   <p className="text-sm text-zinc-500">{f.desc}</p>
                 </div>
               ))}
             </div>
          </div>
        </article>

        {/* How It Works - Enhanced with secondary keywords */}
        <section className="mb-24 py-12 border-t border-white/5 border-b">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">How to Use the Random Anime Name Generator</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Choose Preferences", desc: "Select the gender (male, female, unisex) and style (traditional, modern, fantasy) that fits your character concept." },
              { num: "02", title: "Generate Names", desc: "Click 'Start Creating' to generate authentic Japanese names. Our algorithm ensures proper meanings." },
              { num: "03", title: "Explore & Save", desc: "Browse names, read meanings. Save favorites or copy to clipboard for your character sheets." }
            ].map((step, i) => (
              <div key={i} className="relative p-6 bg-[#0f1119] rounded-[32px] border border-white/5">
                <div className="absolute -top-4 -left-2 bg-gradient-to-br from-fuchsia-600 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mt-4 mb-3">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Name Styles Grid - Enhanced with secondary keywords */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Anime Character Name Generator Styles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StyleCard 
              title="Traditional" 
              examples={["Hiroshi (寛)", "Sakura (桜)"]}
              desc="Classic Japanese names with deep cultural roots, emphasizing virtue, honor, and family values."
              theme="amber"
            />
            <StyleCard 
              title="Modern" 
              examples={["Sora (空)", "Yuki (雪)"]}
              desc="Contemporary Japanese names popular in recent decades, often inspired by nature and aspirations."
              theme="emerald"
            />
            <StyleCard 
              title="Fantasy" 
              examples={["Ryu (龍)", "Yume (夢)"]}
              desc="Mystical names perfect for supernatural anime, featuring elements of magic and otherworldly power."
              theme="fuchsia"
            />
            <StyleCard 
              title="Sci-Fi" 
              examples={["Rei (零)", "Neo (新)"]}
              desc="Futuristic names ideal for cyberpunk and space anime, blending tradition with technological themes."
              theme="cyan"
            />
          </div>
        </section>

        {/* Tips & FAQ Split */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <AccordionItem question="Are the generated names authentic?">
                Yes, all names are based on authentic Japanese naming conventions. Each name includes proper kanji characters and cultural meanings.
              </AccordionItem>
              <AccordionItem question="Can I use these names commercially?">
                 Yes, the generated names are free to use for any purpose, including commercial projects like games, stories, manga, or anime.
              </AccordionItem>
              <AccordionItem question="Do you save my generated names?">
                 Your favorites and history are saved locally in your browser (LocalStorage). Your data stays private and accessible only to you.
              </AccordionItem>
              <AccordionItem question="How many names can I generate?">
                 You can generate between 1 and 20 names at once. We recommend generating 6-10 names for the best variety.
              </AccordionItem>
            </div>
          </section>

          {/* Tips */}
          <section className="bg-gradient-to-br from-[#0f1119] to-[#0a0b10] p-8 rounded-[32px] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Tips for the Perfect Name</h2>
            <div className="space-y-6">
              <TipItem title="Consider Personality">
                Match the name's meaning to traits. "Strength" (Takeshi) for warriors, "Harmony" (Ai) for healers.
              </TipItem>
              <TipItem title="Think About Setting">
                Choose a style that matches. Traditional for historical anime, Sci-fi for cyberpunk settings.
              </TipItem>
              <TipItem title="Check Name Flow">
                 Pay attention to how the surname and given name sound together. It should flow naturally.
              </TipItem>
              <TipItem title="Research Culture">
                Understanding the cultural significance adds depth to characters. Use meanings as a guide.
              </TipItem>
            </div>
          </section>

        </div>

      </main>

      {/* Toast */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className={`px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-xl border ${
              toast.type === 'success' ? 'bg-zinc-900/90 border-green-500/20 text-green-400' : 'bg-zinc-900/90 border-red-500/20 text-red-400'
            }`}>
              {toast.type === 'success' ? <Check className="w-4 h-4" /> : <Info className="w-4 h-4" />}
              <span className="font-bold text-sm">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB COMPONENTS (Inline for clean file structure) ---

const EmptyState = () => (
  <div className="col-span-full py-24 flex flex-col items-center justify-center text-center">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl rounded-full" />
      <Wand2 className="relative w-12 h-12 text-fuchsia-500" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">Ready to Generate</h3>
    <p className="text-zinc-500 max-w-sm">Configure your settings above and click "Start Creating" to discover amazing anime names.</p>
  </div>
);

const NameCard = ({ name, idx, isFavorited, onFav, onCopy }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: idx * 0.05 }}
    className="group relative bg-[#151720] hover:bg-[#1a1d26] border border-white/5 hover:border-fuchsia-500/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-fuchsia-900/10 hover:-translate-y-1"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="text-2xl font-black text-white mb-1 tracking-tight">{name.fullName}</h4>
        <div className="flex items-center gap-2 text-fuchsia-400 font-medium text-xs uppercase tracking-wider">
           {name.surnameReading} <span className="w-1 h-1 bg-zinc-600 rounded-full"/> {name.givenNameReading}
        </div>
      </div>
      <div className="flex gap-1">
         <button onClick={onFav} className={`p-2 rounded-full transition-all ${isFavorited ? 'bg-pink-500/20 text-pink-500' : 'bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white'}`}>
           <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
         </button>
         <button onClick={onCopy} className="p-2 rounded-full bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-white transition-all">
           <Copy className="w-4 h-4" />
         </button>
      </div>
    </div>
    <div className="space-y-2 pt-3 border-t border-white/5">
      <div className="flex text-sm text-zinc-400">
        <span className="w-16 shrink-0 text-xs font-bold text-zinc-600 uppercase pt-0.5">Surname</span>
        <span>{name.surnameMeaning}</span>
      </div>
      <div className="flex text-sm text-zinc-400">
        <span className="w-16 shrink-0 text-xs font-bold text-zinc-600 uppercase pt-0.5">Given</span>
        <span>{name.givenNameMeaning}</span>
      </div>
    </div>
  </motion.div>
);

const StyleCard = ({ title, desc, examples, theme }: any) => {
  const colors: any = {
    amber: "from-amber-500/20 to-orange-600/5 border-amber-500/20 text-amber-500",
    emerald: "from-emerald-500/20 to-teal-600/5 border-emerald-500/20 text-emerald-500",
    fuchsia: "from-fuchsia-500/20 to-purple-600/5 border-fuchsia-500/20 text-fuchsia-500",
    cyan: "from-cyan-500/20 to-blue-600/5 border-cyan-500/20 text-cyan-500",
  };
  
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${colors[theme].split(' ')[0]} ${colors[theme].split(' ')[1]} border ${colors[theme].split(' ')[2]} rounded-2xl p-6`}>
      <h3 className={`text-xl font-bold mb-3 ${colors[theme].split(' ')[3]}`}>{title}</h3>
      <p className="text-zinc-300 text-sm mb-4 leading-relaxed">{desc}</p>
      <div className="space-y-1">
        {examples.map((ex: string, i: number) => (
          <div key={i} className="text-xs text-white/50 font-mono bg-black/20 p-1.5 rounded w-fit">{ex}</div>
        ))}
      </div>
    </div>
  );
}

const AccordionItem = ({ question, children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/5 bg-[#0f1119] rounded-xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-semibold text-white hover:bg-white/5 transition-colors"
      >
        {question}
        <ArrowRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90 text-fuchsia-500' : 'text-zinc-600'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="p-4 pt-0 text-zinc-400 text-sm leading-relaxed border-t border-white/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const TipItem = ({ title, children }: any) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
      <Star className="w-4 h-4 text-indigo-400" />
    </div>
    <div>
      <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
      <p className="text-zinc-400 text-xs leading-relaxed">{children}</p>
    </div>
  </div>
)