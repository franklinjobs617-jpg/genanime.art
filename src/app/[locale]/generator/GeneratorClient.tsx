"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import RedesignedSidebar, { STYLES, QUALITY_PROMPT } from "@/components/generator/RedesignedSidebar";
import PromptConsole from "@/components/generator/PromptConsole";
import ImagePromptConsole from "@/components/generator/ImagePromptConsole";
import WelcomeGuide from "@/components/generator/WelcomeGuide";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Settings,
  Coins,
  Home, // 确保引入 Home 图标
  History,
  Trash2,
  ChevronLeft, // 新增返回箭头图标
  SlidersHorizontal // 建议用这个图标代表参数设置，比 Settings 更直观
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import dynamic from "next/dynamic";
import { toast, Toaster } from "react-hot-toast";
import ShowcaseGallery from "@/components/generator/ShowcaseGallery";
import { useTranslations } from "next-intl";

// ... (导入部分保持不变)
const PlansBanner = dynamic(
  () => import("@/components/generator/PlansBanner"),
  {
    loading: () => (
      <div className="h-32 bg-white/5 rounded-2xl animate-pulse" />
    ),
  }
);
const HistoryRow = dynamic(() => import("@/components/generator/HistoryRow"), {
  ssr: false,
});
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
  // ... (状态管理逻辑保持不变，直到 return 部分)
  const t = useTranslations("Generator");
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading, login, refreshUser } = useAuth();

  const [activePrompt, setActivePrompt] = useState("");
  const [activeStyle, setActiveStyle] = useState("Default");
  const [activePreset, setActivePreset] = useState<"free" | "ghibli" | "avatar">("free");
  const [activeRatio, setActiveRatio] = useState("1:1");
  const [activeQuantity, setActiveQuantity] = useState(1);
  const [activeModel, setActiveModel] = useState("Seedream 4.0");

  const [cfgScale, setCfgScale] = useState(7.0);
  const [steps, setSteps] = useState(30);
  const [seed, setSeed] = useState<number | null>(null);
  const [isRandomSeed, setIsRandomSeed] = useState(true);

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageStrength, setImageStrength] = useState(0.7);

  const [negativePrompt, setNegativePrompt] = useState("");
  const [generationMode, setGenerationMode] = useState<
    "text-to-image" | "image-to-prompt" | "image-to-image"
  >("text-to-image");

  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [guestGenerations, setGuestGenerations] = useState(0);
  const [selectedDetailItem, setSelectedDetailItem] = useState<any | null>(
    null
  );
  const [highlightPrompt, setHighlightPrompt] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // ... (Effect 和 Handler 逻辑保持不变)
  // 为了节省篇幅，省略未修改的逻辑代码...
  useEffect(() => {
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

    const prompt = searchParams.get("prompt");
    if (prompt) setActivePrompt(decodeURIComponent(prompt));
    
    const style = searchParams.get("style");
    if (style) setActiveStyle(decodeURIComponent(style));

    const mode = searchParams.get("mode");
    if (mode === "upload") {
      setGenerationMode("image-to-prompt");
    }
    
    const modelParam = searchParams.get("model");
    if (modelParam) {
      const decodedModel = decodeURIComponent(modelParam);
      const availableModels = [
        "Seedream 4.0",
        "Pony Diffusion",
        "Animagine XL",
        "Niji Style",
        "SDXL Base"
      ];
      if (availableModels.includes(decodedModel)) {
        setActiveModel(decodedModel);
      }
    }

    if (user) refreshUser();
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("anime-gen-history", JSON.stringify(history));
    }
  }, [history]);

  const handleGenerate = useCallback(async () => {
     // ... (保持原有的 handleGenerate 逻辑)
     if (!activePrompt.trim()) {
      toast.error("Please enter a prompt before generating.");
      return;
    }
    if (activeQuantity <= 0 || activeQuantity > 4) {
      toast.error("Invalid number of images selected.");
      return;
    }
    if (isGenerating) return;

    if (!user) {
      if (guestGenerations >= GUEST_FREE_LIMIT) {
        if (!showLoginModal) setShowLoginModal(true);
        return;
      }
    } else if ((Number(user.credits) || 0) < currentTotalCost) {
        // ... (原有的积分不足提示逻辑)
        toast.error(t("imagePrompt.insufficientCredits"));
        return;
    }

    setIsGenerating(true);
    setMobileSheetOpen(false);

    const optimisticId = `temp-${Date.now()}`;
    const optimisticEntry = {
      id: optimisticId,
      urls: Array(activeQuantity).fill(""),
      prompt: activePrompt,
      timestamp: Date.now(),
      style: activeStyle,
      ratio: activeRatio,
      status: "generating",
    };

    setHistory((prev) => [optimisticEntry, ...prev]);
    const toastId = toast.loading(t("history.aiCasting"));

    try {
      // Construct enhanced prompt with style modifiers and quality boosters
      const selectedStyleObj = STYLES.find(s => s.value === activeStyle);
      const stylePrompt = selectedStyleObj?.prompt || "";
      const enhancedPrompt = [
        activePrompt,
        stylePrompt,
        QUALITY_PROMPT
      ].filter(Boolean).join(", ");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: enhancedPrompt, // Send enhanced prompt to backend
          originalPrompt: activePrompt, // Optional: send original for reference if needed
          style: activeStyle,
          ratio: activeRatio,
          quantity: activeQuantity,
          googleUserId: user?.googleUserId,
          negativePrompt: negativePrompt,
          model: activeModel,
        }),
      });

      if (!response.ok) throw new Error("Generation failed");

      const data = await response.json();
      const urls = data.images || (Array.isArray(data.urls) ? data.urls : [data.url]);

      setHistory((prev) =>
        prev.map((item) =>
          item.id === optimisticId
            ? { ...item, urls, status: "completed" }
            : item
        )
      );

      if (!user) {
        const newCount = guestGenerations + 1;
        setGuestGenerations(newCount);
        localStorage.setItem("guest_generations", newCount.toString());
      } else {
        await refreshUser();
      }

      toast.success(t("history.artGenerated"), { id: toastId });
      setActivePrompt("");
    } catch (err: any) {
      console.error(err);
      toast.error(t("history.generationError"), { id: toastId });
      setHistory((prev) => prev.filter((item) => item.id !== optimisticId));
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
    setGenerationMode("text-to-image");
    toast.success(t("history.promptApplied"));
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

  const handlePickShowcase = (item: any, quick?: boolean) => {
    setActivePrompt(item.prompt);
    setActiveStyle(item.style);
    setActiveRatio(item.ratio);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    setHighlightPrompt(true);
    setTimeout(() => setHighlightPrompt(false), 2000);
    if (quick) setTimeout(() => handleGenerate(), 100);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) return;
    setHistory((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    toast.success(t("history.batchRemoved", { count: selectedIds.length }));
  };

  const handleImageToPrompt = async (imageUrl: string) => {
     try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const fileName = `image_${Date.now()}.png`;
      const file = new File([blob], fileName, { type: blob.type || "image/png" });
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setGenerationMode("image-to-prompt");
      setSelectedDetailItem(null);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Image uploaded for analysis");
    } catch (error) {
      toast.error("Failed to load image");
    }
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
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={login}
      />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[320px] border-r border-zinc-800 bg-[#09090b] relative z-20">
        <RedesignedSidebar
          activeStyle={activeStyle}
          setActiveStyle={setActiveStyle}
          activeRatio={activeRatio}
          setActiveRatio={setActiveRatio}
          activeQuantity={activeQuantity}
          setActiveQuantity={setActiveQuantity}
          activeModel={activeModel}
          setActiveModel={setActiveModel}
          cfgScale={cfgScale}
          setCfgScale={setCfgScale}
          steps={steps}
          setSteps={setSteps}
          seed={seed}
          setSeed={setSeed}
          isRandomSeed={isRandomSeed}
          setIsRandomSeed={setIsRandomSeed}
          generationMode={generationMode}
          setGenerationMode={setGenerationMode}
          activePreset={activePreset}
          setActivePreset={setActivePreset}
        />
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#09090b]">
        
        <header className="flex items-center justify-between px-6 h-16 border-b border-zinc-800/50 bg-[#09090b] z-40">
          {/* Mobile Left: Home + Menu */}
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-md transition-all"
            >
              <Home className="w-5 h-5" />
            </Link>

            <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-md transition-all">
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[320px] p-0 bg-[#09090b] border-r border-zinc-800"
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
                  cfgScale={cfgScale}
                  setCfgScale={setCfgScale}
                  steps={steps}
                  setSteps={setSteps}
                  seed={seed}
                  setSeed={setSeed}
                  isRandomSeed={isRandomSeed}
                  setIsRandomSeed={setIsRandomSeed}
                  generationMode={generationMode}
                  setGenerationMode={setGenerationMode}
                  activePreset={activePreset}
                  setActivePreset={setActivePreset}
                />
              </SheetContent>
            </Sheet>

            {/* Desktop Breadcrumb */}
            <nav className="hidden lg:flex items-center gap-2 text-sm font-medium text-zinc-500">
              <Link
                href="/"
                className="hover:text-zinc-300 transition-colors"
              >
                Home
              </Link>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-200">
                Generator
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/pricing" className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-800/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Coins className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              <span className="text-sm font-bold text-zinc-300 group-hover:text-white tabular-nums relative z-10">
                {user ? user.credits : `${remainingGuest}/${GUEST_FREE_LIMIT}`}
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold text-indigo-400 uppercase tracking-wider ml-1 relative z-10 group-hover:text-indigo-300">
                Credits
              </span>
            </Link>
            
            {authLoading ? (
              <div className="w-9 h-9 rounded-full bg-zinc-800 animate-pulse" />
            ) : user ? (
              <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-700 hover:border-indigo-500 hover:shadow-[0_0_10px_rgba(99,102,241,0.3)] transition-all cursor-pointer">
                <img
                  src={user.picture || "/default-avatar.png"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <button
                onClick={login}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                {t("login")}
              </button>
            )}
          </div>
        </header>

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar relative px-4 md:px-8 lg:px-16 pt-8"
        >
          <div className="w-full max-w-9xl mx-auto pb-20 space-y-10">
            <div className="flex flex-col gap-6">
              
              <div className="lg:hidden flex p-1 bg-zinc-900/50 border border-zinc-800 rounded-lg mb-2">
                {[
                  { id: "text-to-image", label: "Text" },
                  { id: "image-to-image", label: "Image" },
                  { id: "image-to-prompt", label: "Analyze" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGenerationMode(item.id as any)}
                    className={`flex-1 py-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-md transition-all ${
                      generationMode === item.id
                        ? "bg-zinc-800 text-zinc-100 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {generationMode !== "image-to-prompt" ? (
                  <motion.div
                    key="text-console"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full"
                  >
                       <PromptConsole
                          activePrompt={activePrompt}
                          setActivePrompt={setActivePrompt}
                          negativePrompt={negativePrompt}
                          setNegativePrompt={setNegativePrompt}
                          isGenerating={isGenerating}
                          onGenerate={handleGenerate}
                          canGenerate={canGenerate()}
                          isGuest={!user}
                          guestGenerations={guestGenerations}
                          guestLimit={GUEST_FREE_LIMIT}
                          image={image}
                          setImage={setImage}
                          imagePreview={imagePreview}
                          setImagePreview={setImagePreview}
                          mode={generationMode}
                          preset={activePreset}
                          imageStrength={imageStrength}
                          setImageStrength={setImageStrength}
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
                      imageFile={image}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* PlansBanner 等其他组件保持不变... */}
              <AnimatePresence>
                {((!user && guestGenerations > 0) ||
                  (user && Number(user.credits) < 50)) && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full overflow-hidden shadow-xl border border-indigo-500/10 rounded-2xl"
                  >
                    <PlansBanner
                      isGuest={!user}
                      onLogin={() => setShowLoginModal(true)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* History List ... */}
            <div className="space-y-12">
              {[
                { key: "today", data: groupedHistory.today },
                { key: "older", data: groupedHistory.older },
              ].map(
                (group) =>
                  group.data.length > 0 && (
                    <div key={group.key} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2 tracking-tight">
                          <History className="w-5 h-5 text-indigo-500" />{" "}
                          {t(`history.${group.key}`)}
                        </h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                      </div>
                      {selectedIds.length > 0 && group.key === "today" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-6"
                        >
                          <span className="text-sm font-bold text-indigo-400">
                            {t("history.itemsSelected", {
                              count: selectedIds.length,
                            })}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedIds([])}
                              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl text-xs font-bold transition-all"
                            >
                              {t("cancel")}
                            </button>
                            <button
                              onClick={handleBatchDelete}
                              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" /> {t("delete")}
                            </button>
                          </div>
                        </motion.div>
                      )}
                      <div className="flex flex-col">
                        {group.data.map((item) => (
                          <HistoryRow
                            key={item.id}
                            item={item}
                            onRegenerate={() =>
                              handleRegenerate(
                                item.prompt,
                                item.style,
                                item.ratio
                              )
                            }
                            onDelete={(id) => {
                              setHistory((prev) =>
                                prev.filter((h) => h.id !== id)
                              );
                              toast.success(t("history.creationRemoved"));
                            }}
                            onViewDetail={(item) => setSelectedDetailItem(item)}
                          />
                        ))}
                      </div>
                    </div>
                  )
              )}

              {!isGenerating && history.length === 0 && (
                <div className="mt-8">
                  <ShowcaseGallery
                    onSelect={(item) => handlePickShowcase(item, false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <ImageDetailModal
          isOpen={!!selectedDetailItem}
          onClose={() => setSelectedDetailItem(null)}
          item={selectedDetailItem}
          onRegenerate={() => {
            if (selectedDetailItem) {
              handleRegenerate(
                selectedDetailItem.prompt,
                selectedDetailItem.style,
                selectedDetailItem.ratio
              );
              setSelectedDetailItem(null);
            }
          }}
          onDelete={(id) => {
            setHistory((prev) => prev.filter((h) => h.id !== id));
            toast.success(t("history.creationRemoved"));
          }}
          onImageToPrompt={handleImageToPrompt}
        />
      </main>
    </div>
  );
}
