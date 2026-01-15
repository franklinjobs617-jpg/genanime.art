"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import RedesignedSidebar from "@/components/generator/RedesignedSidebar";
import PromptConsole from "@/components/generator/PromptConsole";
import WelcomeGuide from "@/components/generator/WelcomeGuide";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Settings,
  Coins,
  Sparkles,
  Home,
  History,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSkeleton from "@/components/generator/LoadingSkeleton";
import EmptyState from "@/components/generator/EmptyState";
import Link from "next/link";
import dynamic from "next/dynamic";
import { toast, Toaster } from "react-hot-toast";

// 动态加载组件以优化性能
const PlansBanner = dynamic(
  () => import("@/components/generator/PlansBanner"),
  {
    loading: () => (
      <div className="h-32 bg-white/5 rounded-2xl animate-pulse" />
    ),
  }
);
const GenerationResultCard = dynamic(
  () => import("@/components/generator/GenerationResultCard"),
  {
    ssr: false,
  }
);
const LoginModal = dynamic(() => import("@/components/LoginModel"), {
  ssr: false,
});

const GUEST_FREE_LIMIT = 2;
const COST_PER_IMAGE = 2;

export default function GeneratorClient() {
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading, login, refreshUser } = useAuth();

  // --- 状态管理 ---
  const [activePrompt, setActivePrompt] = useState("");
  const [activeStyle, setActiveStyle] = useState("Vibrant Anime");
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

  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [guestGenerations, setGuestGenerations] = useState(0);

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
      // Show elegant credit alert instead of simple toast
      toast.custom((t) => (
        <div className="bg-zinc-900 border border-amber-500/30 rounded-xl p-4 shadow-2xl max-w-md">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <Coins className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">
                Insufficient Credits
              </h4>
              <p className="text-xs text-zinc-400 mb-3">
                You need {currentTotalCost} credits. You have {Number(user.credits) || 0}.
              </p>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  window.location.href = '/pricing';
                }}
                className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
              >
                Get More Credits →
              </button>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-zinc-500 hover:text-zinc-400"
            >
              ✕
            </button>
          </div>
        </div>
      ), { duration: 6000 });
      return;
    }

    setIsGenerating(true);
    setMobileSheetOpen(false);
    const toastId = toast.loading("AI is casting your vision...");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: activePrompt,
          style: activeStyle,
          ratio: activeRatio,
          quantity: activeQuantity,
          googleUserId: user?.googleUserId, // 透传 UUID 给后端扣费
        }),
      });

      if (!response.ok) throw new Error("Generation failed");

      const data = await response.json();
      const urls =
        data.images || (Array.isArray(data.urls) ? data.urls : [data.url]);

      // 更新历史记录
      const newEntry = {
        id: Date.now().toString(),
        urls,
        prompt: activePrompt,
        timestamp: Date.now(),
        style: activeStyle,
        ratio: activeRatio,
      };
      setHistory((prev) => [newEntry, ...prev]);

      // 扣除次数/刷新积分
      if (!user) {
        const newCount = guestGenerations + 1;
        setGuestGenerations(newCount);
        localStorage.setItem("guest_generations", newCount.toString());
      } else {
        await refreshUser(); // 💡 成功后立即静默刷新积分
      }

      toast.success("Art generated successfully!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during generation.", { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  }, [
    activePrompt,
    activeStyle,
    activeRatio,
    activeQuantity,
    isGenerating,
    user,
    guestGenerations,
    currentTotalCost,
    refreshUser,
  ]);

  // 重新生成逻辑
  const handleRegenerate = (prompt: string, style: string, ratio: string) => {
    setActivePrompt(prompt);
    setActiveStyle(style);
    setActiveRatio(ratio);
    // 给状态更新留一点时间
    setTimeout(() => handleGenerate(), 100);
  };

  // 历史按天分组
  const groupedHistory = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    return {
      today: history.filter((item) => item.timestamp >= today),
      older: history.filter((item) => item.timestamp < today),
    };
  }, [history]);

  // 新增：轮播选中回调
  const handlePickShowcase = (item: { prompt: string; style: string; ratio: string }, quick?: boolean) => {
    setActivePrompt(item.prompt);
    setActiveStyle(item.style);
    setActiveRatio(item.ratio);
    if (quick) {
      setTimeout(() => handleGenerate(), 100);
    }
  };

  return (
    <div className="flex h-[100dvh] bg-[#050507] text-zinc-100 overflow-hidden font-sans">
      <Toaster position="bottom-right" reverseOrder={false} />
      <WelcomeGuide />
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={login}
      />
      <aside className="hidden lg:flex flex-col w-[300px] border-r border-white/5 bg-[#08080a] shadow-2xl">
        <RedesignedSidebar
          activeStyle={activeStyle}
          setActiveStyle={setActiveStyle}
          activeRatio={activeRatio}
          setActiveRatio={setActiveRatio}
          activeQuantity={activeQuantity}
          setActiveQuantity={setActiveQuantity}
          activeModel={activeModel}
          setActiveModel={setActiveModel}
          // Advanced Settings
          cfgScale={cfgScale}
          setCfgScale={setCfgScale}
          steps={steps}
          setSteps={setSteps}
          seed={seed}
          setSeed={setSeed}
          isRandomSeed={isRandomSeed}
          setIsRandomSeed={setIsRandomSeed}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#050507]">
        {/* --- Header --- */}
        <header className="flex items-center justify-between px-6 h-16 border-b border-white/5 bg-[#08080a]/80 backdrop-blur-2xl z-40">
          <div className="flex items-center gap-4">
            <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
                  <Settings className="w-5 h-5 text-zinc-400" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] p-0 bg-[#08080a] border-r border-white/10"
              >
                <RedesignedSidebar
                  activeStyle={activeStyle}
                  setActiveStyle={setActiveStyle}
                  activeRatio={activeRatio}
                  setActiveRatio={setActiveRatio}
                  activeQuantity={activeQuantity}
                  setActiveQuantity={setActiveQuantity}
                  activeModel={activeModel}
                  setActiveModel={setActiveModel}
                  // Advanced Settings
                  cfgScale={cfgScale}
                  setCfgScale={setCfgScale}
                  steps={steps}
                  setSteps={setSteps}
                  seed={seed}
                  setSeed={setSeed}
                  isRandomSeed={isRandomSeed}
                  setIsRandomSeed={setIsRandomSeed}
                />
              </SheetContent>
            </Sheet>

            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="hidden sm:block text-xl font-black tracking-tighter">
                GEN<span className="text-indigo-400">ANIME</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Credits Display */}
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-black tabular-nums">
                {user ? user.credits : `${remainingGuest}/${GUEST_FREE_LIMIT}`}
              </span>
            </div>

            {authLoading ? (
              <div className="w-9 h-9 rounded-full bg-zinc-800 animate-pulse" />
            ) : user ? (
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-500/30 hover:border-indigo-500 transition-all cursor-pointer">
                <img
                  src={user.picture || "/default-avatar.png"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <button
                onClick={login}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-600/30"
              >
                Login
              </button>
            )}
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative pb-[180px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-indigo-600/5 blur-[120px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6 text-xs font-medium text-zinc-500">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-zinc-700">/</span>
              <span className="text-purple-400">Generator</span>
            </nav>

            {/* Banner for low credits */}
            <AnimatePresence>
              {((!user && guestGenerations > 0) || (user && Number(user.credits) < 50)) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl overflow-hidden shadow-2xl border border-amber-500/20"
                >
                  <PlansBanner
                    isGuest={!user}
                    onLogin={() => setShowLoginModal(true)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results History */}
            <div className="space-y-10">
              {/* Enhanced Loading State */}
              <AnimatePresence>
                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <LoadingSkeleton />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Render Lists */}
              {[
                { title: "Today's Gallery", data: groupedHistory.today },
                { title: "Archived Creations", data: groupedHistory.older },
              ].map(
                (group) =>
                  group.data.length > 0 && (
                    <div key={group.title} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/5" />
                        <h3 className="text-xs font-semibold text-zinc-500 flex items-center gap-2">
                          <History className="w-3.5 h-3.5" /> {group.title}
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/5" />
                      </div>

                      <div className="grid grid-cols-1 gap-8">
                        {group.data.map((item) => (
                          <GenerationResultCard
                            key={item.id}
                            urls={item.urls}
                            prompt={item.prompt}
                            style={item.style}
                            ratio={item.ratio}
                            onRegenerate={() =>
                              handleRegenerate(
                                item.prompt,
                                item.style,
                                item.ratio
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )
              )}

              {/* Empty State */}
              {!isGenerating && history.length === 0 && (
                <EmptyState onUsePrompt={setActivePrompt} />
              )}
            </div>
          </div>
        </div>

        {/* Floating Command Bar Container */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-6 bg-gradient-to-t from-[#050507] via-[#050507]/90 to-transparent pointer-events-none">
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <PromptConsole
              activePrompt={activePrompt}
              setActivePrompt={setActivePrompt}
              negativePrompt={negativePrompt}
              setNegativePrompt={setNegativePrompt}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              canGenerate={canGenerate()}
              isGuest={!user}
              // Image Ref
              image={image}
              setImage={setImage}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </div>
        </div>
      </main >
    </div >
  );
}
