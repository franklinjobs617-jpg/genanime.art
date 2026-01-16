"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import RedesignedSidebar from "@/components/generator/RedesignedSidebar";
import PromptConsole from "@/components/generator/PromptConsole";
import ImagePromptConsole from "@/components/generator/ImagePromptConsole";
import WelcomeGuide from "@/components/generator/WelcomeGuide";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Settings,
  Coins,
  Sparkles,
  Home,
  History,
  Loader2,
  Trash2,
  Trash,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSkeleton from "@/components/generator/LoadingSkeleton";
import { Link } from "@/i18n/routing";
import dynamic from "next/dynamic";
import { toast, Toaster } from "react-hot-toast";
import ShowcaseGallery from "@/components/generator/ShowcaseGallery";
import { useTranslations } from "next-intl";

// 动态加载组件以优化性能
const PlansBanner = dynamic(
  () => import("@/components/generator/PlansBanner"),
  {
    loading: () => (
      <div className="h-32 bg-white/5 rounded-2xl animate-pulse" />
    ),
  }
);
const HistoryRow = dynamic(
  () => import("@/components/generator/HistoryRow"),
  { ssr: false }
);
const ImageDetailModal = dynamic(
  () => import("@/components/generator/ImageDetailModal"),
  { ssr: false }
);
const LoginModal = dynamic(() => import("@/components/LoginModel"), {
  ssr: false,
});

const GUEST_FREE_LIMIT = 2;
const COST_PER_IMAGE = 2;

export default function GeneratorClient() {
  const t = useTranslations('Generator');
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading, login, refreshUser } = useAuth();

  // --- 状态管理 ---
  const [activePrompt, setActivePrompt] = useState("");
  const [activeStyle, setActiveStyle] = useState("Default");
  const [activeRatio, setActiveRatio] = useState("1:1");
  const [activeQuantity, setActiveQuantity] = useState(1);
  const [activeModel, setActiveModel] = useState("Seedream 4.0");

  // Advanced Settings State
  const [cfgScale, setCfgScale] = useState(7.0);
  const [steps, setSteps] = useState(30);
  const [seed, setSeed] = useState<number | null>(null);
  const [isRandomSeed, setIsRandomSeed] = useState(true);

  // Image Reference State
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Prompt Console Extra State
  const [negativePrompt, setNegativePrompt] = useState("");
  const [generationMode, setGenerationMode] = useState<'text-to-image' | 'image-to-prompt'>('text-to-image');

  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [guestGenerations, setGuestGenerations] = useState(0);
  const [selectedDetailItem, setSelectedDetailItem] = useState<any | null>(null);
  const [highlightPrompt, setHighlightPrompt] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- 计算属性 ---
  const currentTotalCost = useMemo(
    () => COST_PER_IMAGE * activeQuantity,
    [activeQuantity]
  );

  const remainingGuest = useMemo(
    () => GUEST_FREE_LIMIT - guestGenerations,
    [guestGenerations]
  );

  const canGenerate = useCallback(() => {
    if (user) {
      return (Number(user.credits) || 0) >= currentTotalCost;
    }
    return guestGenerations < GUEST_FREE_LIMIT;
  }, [user, guestGenerations, currentTotalCost]);

  // --- 初始化加载 ---
  useEffect(() => {
    // 加载历史记录和游客次数
    const savedGuestCount = localStorage.getItem("guest_generations");
    if (savedGuestCount) setGuestGenerations(Number(savedGuestCount));

    const savedHistory = localStorage.getItem("anime-gen-history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error(e);
      }
    }

    // 处理 URL 传参
    const prompt = searchParams.get("prompt");
    if (prompt) setActivePrompt(decodeURIComponent(prompt));

    // 刷新用户信息确保积分最新
    if (user) refreshUser();
  }, []);

  // 历史记录持久化
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("anime-gen-history", JSON.stringify(history));
    }
  }, [history]);

  const handleGenerate = useCallback(async () => {
    if (!activePrompt.trim() || isGenerating) return;

    if (!user) {
      if (guestGenerations >= GUEST_FREE_LIMIT) {
        setShowLoginModal(true);
        return;
      }
    } else if ((Number(user.credits) || 0) < currentTotalCost) {
      toast.custom((toastItem) => (
        <div className="bg-zinc-900 border border-amber-500/30 rounded-xl p-4 shadow-2xl max-w-md">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <Coins className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">{t('imagePrompt.insufficientCredits')}</h4>
              <p className="text-xs text-zinc-400 mb-3">
                {t('imagePrompt.analysisCost', { count: currentTotalCost })}
              </p>
              <button
                onClick={() => {
                  toast.dismiss(toastItem.id);
                  window.location.href = '/pricing';
                }}
                className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
              >
                {t('imagePrompt.getMoreCredits')}
              </button>
            </div>
            <button onClick={() => toast.dismiss(toastItem.id)} className="text-zinc-500 hover:text-zinc-400">✕</button>
          </div>
        </div>
      ), { duration: 6000 });
      return;
    }

    setIsGenerating(true);
    setMobileSheetOpen(false);

    // Create an optimistic history entry
    const optimisticId = `temp-${Date.now()}`;
    const optimisticEntry = {
      id: optimisticId,
      urls: Array(activeQuantity).fill(""), // Empty strings for skeletons
      prompt: activePrompt,
      timestamp: Date.now(),
      style: activeStyle,
      ratio: activeRatio,
      status: 'generating'
    };

    setHistory((prev) => [optimisticEntry, ...prev]);
    const toastId = toast.loading(t('history.aiCasting'));

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: activePrompt,
          style: activeStyle,
          ratio: activeRatio,
          quantity: activeQuantity,
          googleUserId: user?.googleUserId,
          negativePrompt: negativePrompt,
        }),
      });

      if (!response.ok) throw new Error("Generation failed");

      const data = await response.json();
      const urls = data.images || (Array.isArray(data.urls) ? data.urls : [data.url]);

      // Update the optimistic entry with real data
      setHistory((prev) => prev.map(item =>
        item.id === optimisticId
          ? { ...item, urls, status: 'completed' }
          : item
      ));

      if (!user) {
        const newCount = guestGenerations + 1;
        setGuestGenerations(newCount);
        localStorage.setItem("guest_generations", newCount.toString());
      } else {
        await refreshUser();
      }

      toast.success(t('history.artGenerated'), { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error(t('history.generationError'), { id: toastId });
      // Remove the optimistic entry on failure
      setHistory((prev) => prev.filter(item => item.id !== optimisticId));
    } finally {
      setIsGenerating(false);
    }
  }, [activePrompt, activeStyle, activeRatio, activeQuantity, isGenerating, user, guestGenerations, currentTotalCost, refreshUser]);

  const handleAnalysisSuccess = useCallback(() => {
    if (!user) {
      const newCount = guestGenerations + 1;
      setGuestGenerations(newCount);
      localStorage.setItem("guest_generations", newCount.toString());
    } else {
      refreshUser();
    }
  }, [user, guestGenerations, refreshUser]);

  const handleApplyPrompt = (prompt: string) => {
    setActivePrompt(prompt);
    setGenerationMode('text-to-image');
    toast.success(t('history.promptApplied'));
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setHighlightPrompt(true);
    setTimeout(() => setHighlightPrompt(false), 2000);
  };

  const handleRegenerate = (prompt: string, style: string, ratio: string) => {
    setActivePrompt(prompt);
    setActiveStyle(style);
    setActiveRatio(ratio);
    setTimeout(() => handleGenerate(), 100);
  };

  const handlePickShowcase = (item: { prompt: string; style: string; ratio: string }, quick?: boolean) => {
    setActivePrompt(item.prompt);
    setActiveStyle(item.style);
    setActiveRatio(item.ratio);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    setHighlightPrompt(true);
    setTimeout(() => setHighlightPrompt(false), 2000);

    if (quick) {
      setTimeout(() => handleGenerate(), 100);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) return;
    setHistory(prev => prev.filter(item => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    toast.success(t('history.batchRemoved', { count: selectedIds.length }));
  };

  const groupedHistory = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    return {
      today: history.filter((item) => item.timestamp >= today),
      older: history.filter((item) => item.timestamp < today),
    };
  }, [history]);

  return (
    <div className="flex h-[100dvh] bg-[#09090b] text-zinc-100 overflow-hidden font-sans selection:bg-indigo-500/30">
      <Toaster position="bottom-right" reverseOrder={false} />
      <WelcomeGuide />
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={login} />

      <aside className="hidden lg:flex flex-col w-[320px] border-r border-white/5 bg-[#09090b] shadow-2xl relative z-20">
        <RedesignedSidebar
          activeStyle={activeStyle} setActiveStyle={setActiveStyle}
          activeRatio={activeRatio} setActiveRatio={setActiveRatio}
          activeQuantity={activeQuantity} setActiveQuantity={setActiveQuantity}
          activeModel={activeModel} setActiveModel={setActiveModel}
          cfgScale={cfgScale} setCfgScale={setCfgScale}
          steps={steps} setSteps={setSteps}
          seed={seed} setSeed={setSeed}
          isRandomSeed={isRandomSeed} setIsRandomSeed={setIsRandomSeed}
          generationMode={generationMode} setGenerationMode={setGenerationMode}
        />
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#09090b]">
        {/* Ambient Effects */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/10 via-[#09090b]/50 to-[#09090b] pointer-events-none" />
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

        <header className="flex items-center justify-between px-4 md:px-8 h-20 bg-transparent z-40">
          <div className="flex items-center gap-4">
            <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2.5 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-all border border-white/5">
                  <Settings className="w-5 h-5 text-zinc-400" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0 bg-[#09090b] border-r border-white/10">
                <RedesignedSidebar
                  activeStyle={activeStyle} setActiveStyle={setActiveStyle}
                  activeRatio={activeRatio} setActiveRatio={setActiveRatio}
                  activeQuantity={activeQuantity} setActiveQuantity={setActiveQuantity}
                  activeModel={activeModel} setActiveModel={setActiveModel}
                  cfgScale={cfgScale} setCfgScale={setCfgScale}
                  steps={steps} setSteps={setSteps}
                  seed={seed} setSeed={setSeed}
                  isRandomSeed={isRandomSeed} setIsRandomSeed={setIsRandomSeed}
                  generationMode={generationMode} setGenerationMode={setGenerationMode}
                />
              </SheetContent>
            </Sheet>
            <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-500">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-2">
                <Home className="w-4 h-4" /> Home
              </Link>
              <span className="text-zinc-700">/</span>
              <span className="text-indigo-400 font-bold tracking-tight">Generator</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-zinc-800/50 backdrop-blur-md rounded-full border border-white/5 hover:bg-zinc-800 transition-colors cursor-help">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold tabular-nums text-zinc-200">
                {user ? user.credits : `${remainingGuest}/${GUEST_FREE_LIMIT}`}
              </span>
            </div>
            {authLoading ? (
              <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse" />
            ) : user ? (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 hover:border-indigo-500 transition-all cursor-pointer shadow-lg">
                <img src={user.picture || "/default-avatar.png"} alt={user.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <button onClick={login} className="px-6 py-2.5 bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105">{t('login')}</button>
            )}
          </div>
        </header>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto custom-scrollbar relative px-4 md:px-8 lg:px-12 pt-6">
          <div className="w-full max-w-none pb-20 space-y-8">
            <div className="flex flex-col gap-4">
              <AnimatePresence mode="wait">
                {generationMode === 'text-to-image' ? (
                  <motion.div
                    key="text-console"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PromptConsole
                      activePrompt={activePrompt} setActivePrompt={setActivePrompt}
                      negativePrompt={negativePrompt} setNegativePrompt={setNegativePrompt}
                      isGenerating={isGenerating} onGenerate={handleGenerate}
                      canGenerate={canGenerate()} isGuest={!user}
                      guestGenerations={guestGenerations} guestLimit={GUEST_FREE_LIMIT}
                      image={image} setImage={setImage}
                      imagePreview={imagePreview} setImagePreview={setImagePreview}
                      highlight={highlightPrompt}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="image-console"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImagePromptConsole
                      onApplyPrompt={handleApplyPrompt}
                      onSuccess={handleAnalysisSuccess}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {((!user && guestGenerations > 0) || (user && Number(user.credits) < 50)) && (
                  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full overflow-hidden shadow-xl border border-indigo-500/10 rounded-2xl">
                    <PlansBanner isGuest={!user} onLogin={() => setShowLoginModal(true)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-12">


              {[
                { key: "today", data: groupedHistory.today },
                { key: "older", data: groupedHistory.older },
              ].map((group) => group.data.length > 0 && (
                <div key={group.key} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 tracking-tight">
                      <History className="w-5 h-5 text-indigo-500" /> {t(`history.${group.key}`)}
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                  {selectedIds.length > 0 && group.key === "today" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-6">
                      <span className="text-sm font-bold text-indigo-400">{t('history.itemsSelected', { count: selectedIds.length })}</span>
                      <div className="flex gap-2">
                        <button onClick={() => setSelectedIds([])} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl text-xs font-bold transition-all">{t('cancel')}</button>
                        <button onClick={handleBatchDelete} className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-red-500/20"><Trash2 className="w-4 h-4" /> {t('delete')}</button>
                      </div>
                    </motion.div>
                  )}
                  <div className="flex flex-col">
                    {group.data.map((item) => (
                      <HistoryRow
                        key={item.id} item={item}
                        onRegenerate={() => handleRegenerate(item.prompt, item.style, item.ratio)}
                        onDelete={(id) => {
                          setHistory(prev => prev.filter(h => h.id !== id));
                          toast.success(t('history.creationRemoved'));
                        }}
                        onViewDetail={(item) => setSelectedDetailItem(item)}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {!isGenerating && history.length === 0 && (
                <div className="mt-8">
                  <ShowcaseGallery onSelect={(item) => handlePickShowcase(item, false)} />
                </div>
              )}
            </div>
          </div>
        </div>

        <ImageDetailModal
          isOpen={!!selectedDetailItem} onClose={() => setSelectedDetailItem(null)} item={selectedDetailItem}
          onRegenerate={() => {
            if (selectedDetailItem) {
              handleRegenerate(selectedDetailItem.prompt, selectedDetailItem.style, selectedDetailItem.ratio);
              setSelectedDetailItem(null);
            }
          }}
          onDelete={(id) => {
            setHistory(prev => prev.filter(h => h.id !== id));
            toast.success(t('history.creationRemoved'));
          }}
        />
      </main>
    </div>
  );
}
