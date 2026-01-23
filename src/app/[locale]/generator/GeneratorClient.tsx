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
  Coins,
  Home,
  History,
  Trash2,
  SlidersHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import dynamic from "next/dynamic";
import { toast, Toaster } from "react-hot-toast";
import ShowcaseGallery from "@/components/generator/ShowcaseGallery";
import { useTranslations } from "next-intl";
import { trackConversionFunnel, trackDailyReward, AnalyticsEvents, trackEvent } from "@/lib/analytics";

// ... (导入部分保持不变)
const PlansBanner = dynamic(
  () => import("@/components/generator/PlansBanner"),
  {
    loading: () => (
      <div className="h-32 bg-white/5 rounded-2xl animate-pulse" />
    ),
  }
);
const WatermarkNotice = dynamic(() => import("@/components/generator/WatermarkNotice"), {
  loading: () => null,
  ssr: false,
});
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
const DailyRewardModal = dynamic(() => import("@/components/generator/DailyRewardModal"), {
  ssr: false,
});
const ConversionModal = dynamic(() => import("@/components/generator/ConversionModal"), {
  ssr: false,
});

const GUEST_FREE_LIMIT = 2;
const COST_PER_IMAGE = 2;

export default function GeneratorClient() {
  // ... (状态管理逻辑保持不变，直到 return 部分)
  const t = useTranslations("Generator");
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading, login, logout, refreshUser } = useAuth();

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
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [showConversionModal, setShowConversionModal] = useState(false);
  const [showWatermarkNotice, setShowWatermarkNotice] = useState(false);
  const [conversionTrigger, setConversionTrigger] = useState<"credits_low" | "guest_limit" | "daily_visit" | "generation_complete">("daily_visit");
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
    } else if (mode === "img2img") {
      setGenerationMode("image-to-image");
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

    if (user) {
      // 移除这里的refreshUser调用，避免无限循环
      // refreshUser();
      // 用户登录后检查每日奖励
      checkDailyReward();
    }
  }, [user]); // 依赖 user 变化

  // 检查每日奖励的函数
  const checkDailyReward = useCallback(() => {
    if (!user) return;

    console.log('检查每日奖励 - 用户:', user.googleUserId);

    const today = new Date().toDateString();
    const lastRewardClaim = localStorage.getItem(`lastRewardClaim_${user.googleUserId}`);

    console.log('今天:', today);
    console.log('上次领取:', lastRewardClaim);

    // 如果今天还没有领取过奖励
    if (lastRewardClaim !== today) {
      console.log('显示每日奖励弹窗');
      // 延迟显示每日奖励弹窗
      setTimeout(() => {
        setShowDailyReward(true);
        trackDailyReward.show(1, user.googleUserId);
      }, 2000);
    } else {
      console.log('今天已经领取过奖励了');
    }
    
    // 更新最后访问时间
    localStorage.setItem(`lastVisit_${user.googleUserId}`, today);
  }, [user]);

  // 检查是否需要显示转化弹窗
  const checkConversionModal = useCallback((trigger: typeof conversionTrigger) => {
    setConversionTrigger(trigger);
    setShowConversionModal(true);
    
    // 记录转化弹窗显示事件
    trackConversionFunnel.showConversionModal(trigger, user?.googleUserId);
  }, [user]);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("anime-gen-history", JSON.stringify(history));
    }
  }, [history]);

  const handleGenerate = useCallback(async () => {
    if (!activePrompt.trim() && generationMode !== "image-to-image") {
      toast.error("Please enter a prompt before generating.");
      return;
    }

    if (generationMode === "image-to-image" && !image) {
      toast.error("Please upload a reference image for Image-to-Image generation.");
      return;
    }

    if (activeQuantity <= 0 || activeQuantity > 4) {
      toast.error("Invalid number of images selected.");
      return;
    }
    if (isGenerating) return;

    if (!user) {
      if (guestGenerations >= GUEST_FREE_LIMIT) {
        checkConversionModal("guest_limit");
        return;
      }
    } else if ((Number(user.credits) || 0) < currentTotalCost) {
      checkConversionModal("credits_low");
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

      console.log('Style Application Debug:', {
        activeStyle,
        stylePrompt,
        originalPrompt: activePrompt,
        enhancedPrompt
      });

      let requestBody: any = {
        prompt: enhancedPrompt,
        originalPrompt: activePrompt,
        style: activeStyle,
        ratio: activeRatio,
        quantity: activeQuantity,
        googleUserId: user?.googleUserId,
        negativePrompt: negativePrompt,
        model: activeModel,
      };

      // 为 img2img 模式添加图片数据
      if (generationMode === "image-to-image" && image) {
        // 将 File 转换为 base64
        const imageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });

        requestBody.image = imageBase64;
        requestBody.strength = imageStrength;
      }

      // 根据生成模式选择正确的 API 端点
      const apiEndpoint = generationMode === "image-to-image"
        ? "/api/generate-img2img"
        : "/api/generate";

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
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
        // 只有在生成成功后才刷新用户数据
        setTimeout(() => {
          refreshUser();
        }, 500); // 延迟500ms，避免与其他状态更新冲突
      }

      toast.success(t("history.artGenerated"), { id: toastId });
      setActivePrompt("");
      
      // 更精准的转化策略
      if (user) {
        const remainingCredits = Number(user.credits);
        const isPremium = remainingCredits > 100;
        
        // 如果是免费用户，显示水印提示
        if (!isPremium) {
          setShowWatermarkNotice(true);
          setTimeout(() => setShowWatermarkNotice(false), 8000); // 8秒后自动隐藏
        }
        
        // 第一次生成后就提示升级优势
        if (remainingCredits === 4) { // 刚用了第一张图
          setTimeout(() => {
            checkConversionModal("generation_complete");
          }, 1500);
        }
        // 积分快用完时再次提示
        else if (remainingCredits <= 2) { // 只剩1张图时
          setTimeout(() => {
            checkConversionModal("credits_low");
          }, 1000);
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(t("history.generationError"), { id: toastId });
      setHistory((prev) => prev.filter((item) => item.id !== optimisticId));
    } finally {
      setIsGenerating(false);
    }
  }, [activePrompt, activeStyle, activeRatio, activeQuantity, isGenerating, user, guestGenerations, currentTotalCost, refreshUser, generationMode, image, imageStrength, negativePrompt, activeModel]);

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
      <DailyRewardModal
        isOpen={showDailyReward}
        onClose={() => {
          setShowDailyReward(false);
          console.log('每日奖励弹框已关闭');
        }}
      />
      <ConversionModal
        isOpen={showConversionModal}
        onClose={() => setShowConversionModal(false)}
        trigger={conversionTrigger}
        userCredits={user ? Number(user.credits) : 0}
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
              <div className="relative group">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-700 hover:border-indigo-500 hover:shadow-[0_0_10px_rgba(99,102,241,0.3)] transition-all cursor-pointer">
                  <img
                    src={user.picture || "/default-avatar.png"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Simple tooltip showing user info */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-3">
                    <div className="text-sm font-medium text-white truncate">{user.name}</div>
                    <div className="text-xs text-zinc-400 truncate">{user.email}</div>
                    <div className="text-xs text-indigo-400 mt-1">{user.credits} credits</div>
                  </div>
                  <div className="border-t border-zinc-700">
                    <button
                      onClick={logout}
                      className="w-full px-3 py-2 text-left text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors rounded-b-lg"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
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
                    className={`flex-1 py-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-md transition-all ${generationMode === item.id
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
              
              {/* Watermark Notice */}
              <AnimatePresence>
                {showWatermarkNotice && user && Number(user.credits) <= 100 && (
                  <WatermarkNotice 
                    onUpgrade={() => {
                      setShowWatermarkNotice(false);
                      checkConversionModal("credits_low");
                    }}
                  />
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

        {/* 移动端生成状态指示器 */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden fixed bottom-4 left-4 right-4 z-50 bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-2xl p-4 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">Creating your anime art...</div>
                  <div className="text-xs text-zinc-400 mt-1">This usually takes 20-30 seconds</div>
                </div>
              </div>
              <div className="mt-3 w-full bg-zinc-800 rounded-full h-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 25, ease: "linear" }}
                  className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
