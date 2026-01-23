"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Crown, Sparkles, Check, ArrowRight, Gift, Star, Coins, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { trackConversionFunnel } from "@/lib/analytics";

interface ConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: "credits_low" | "guest_limit" | "daily_visit" | "generation_complete";
  userCredits?: number;
}

const CONVERSION_CONTENT = {
  credits_low: {
    title: "Almost Out of Credits!",
    subtitle: "Don't let your creativity stop here",
    description: "Remove watermarks & unlock unlimited potential",
    urgency: "⚡ 25% OFF Today Only",
    cta: "Upgrade Now",
    icon: Zap,
    gradient: "from-red-500 to-pink-500"
  },
  guest_limit: {
    title: "Free Limit Reached",
    subtitle: "Ready to create without limits?",
    description: "Join thousands of creators worldwide",
    urgency: "🎁 New User Special",
    cta: "Sign Up Free",
    icon: Crown,
    gradient: "from-purple-500 to-indigo-500"
  },
  daily_visit: {
    title: "Welcome Back Creator!",
    subtitle: "Ready for your next masterpiece?",
    description: "Your artistic journey continues",
    urgency: "🌟 Daily Inspiration",
    cta: "Start Creating",
    icon: Sparkles,
    gradient: "from-blue-500 to-cyan-500"
  },
  generation_complete: {
    title: "Great Work! 🎨",
    subtitle: "Love your art? Remove the watermark!",
    description: "Get clean, professional images + unlimited generations",
    urgency: "💎 Pro Features Unlocked",
    cta: "Go Watermark-Free",
    icon: Star,
    gradient: "from-green-500 to-emerald-500"
  }
};

const PRICING_PLANS = [
  {
    name: "Initiate",
    credits: 120,
    price: "$12",
    originalPrice: "$16",
    popular: false,
    features: ["120 Credits / mo", "Base Models (V4/V5)", "Standard Queue Speed", "Personal Use Only", "Basic Upscaling (2K)"],
    gradient: "from-cyan-600 to-cyan-700",
    description: "Start your journey into the anime universe."
  },
  {
    name: "Elite",
    credits: 450,
    price: "$29",
    originalPrice: "$39",
    popular: true,
    features: ["450 Credits / mo", "Commercial Usage Rights", "⚡ Turbo GPU Mode (2x Speed)", "Advanced Models (Seedream V5)", "Ultra-HD 4K Upscaling", "Priority Support"],
    gradient: "from-amber-500 to-orange-600",
    description: "The powerhouse for content creators & artists."
  },
  {
    name: "Zenith",
    credits: 1200,
    price: "$59",
    originalPrice: "$79",
    popular: false,
    features: ["1200 Credits / mo", "Full Enterprise License", "Private Stealth Mode", "8K Extreme Upscaling", "Batch Rendering (x4)", "Custom Style Training"],
    gradient: "from-fuchsia-600 to-purple-600",
    description: "Ultimate performance for professional studios."
  }
];

// 简化的动画配置 - 减少动画复杂度
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function ConversionModal({ isOpen, onClose, trigger, userCredits = 0 }: ConversionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [showPricing, setShowPricing] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { user, login } = useAuth();

  // 使用 useMemo 缓存计算结果
  const content = useMemo(() => CONVERSION_CONTENT[trigger], [trigger]);
  const ContentIcon = content.icon;
  const selectedPlanData = useMemo(() => PRICING_PLANS[selectedPlan], [selectedPlan]);

  useEffect(() => {
    if (isOpen) {
      if (trigger === "credits_low" || trigger === "guest_limit") {
        setShowPricing(true);
      } else {
        setShowPricing(false);
      }
      // 重置错误状态
      setErrorMessage(null);
      setLoadingPlan(null);
    }
  }, [isOpen, trigger]);

  const handleGetStarted = () => {
    if (trigger === "guest_limit") {
      onClose();
    } else {
      setShowPricing(true);
    }
  };

  const handleCheckout = async (planIndex: number) => {
    setErrorMessage(null);

    if (!user) {
      setErrorMessage("Please sign in to upgrade your plan");
      login();
      return;
    }

    if (!user.googleUserId) {
      setErrorMessage("Session expired. Please sign in again");
      return;
    }

    const plan = PRICING_PLANS[planIndex];
    const planKey = plan.name.toLowerCase();

    setLoadingPlan(plan.name);
    const typeParam = `plan_${planKey}_monthly`; // 默认使用月付

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stripe/getPayUrl`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: typeParam,
            googleUserId: user.googleUserId,
          }),
        }
      );

      const resData = await response.json();

      if (resData.code === 200 && resData.data) {
        trackConversionFunnel.visitPricing('conversion_modal');
        window.location.href = resData.data;
      } else {
        throw new Error(resData.msg || "Server response error");
      }
    } catch (error: any) {
      console.error("Checkout Error:", error);
      setErrorMessage(error.message || "Payment initiation failed. Please try again.");
      setLoadingPlan(null);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 简化的背景 */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          {/* 优化移动端的模态框 */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* 固定的关闭按钮 */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-150 bg-white/90 backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </button>

            {/* 可滚动的内容区域 */}
            <div className="flex-1 overflow-y-auto">
              {!showPricing ? (
                // 欢迎屏幕 - 移动端优化
                <div className="relative overflow-hidden">
                  {/* 简化的背景 */}
                  <div className={`bg-gradient-to-br ${content.gradient} relative`}>
                    <div className="absolute inset-0 bg-black/20" />
                    {/* 静态装饰 */}
                    <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                    <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                  </div>

                  <div className="relative z-10 p-6 md:p-12 text-center text-white">
                    {/* 图标 - 移动端缩小 */}
                    <div className="flex justify-center mb-4 md:mb-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <ContentIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                    </div>

                    {/* 内容 - 移动端优化 */}
                    <div>
                      <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{content.title}</h1>
                      <p className="text-lg md:text-xl mb-2 text-white/90">{content.subtitle}</p>
                      <p className="text-white/80 mb-6 md:mb-8 text-sm md:text-base">{content.description}</p>

                      {/* 紧急标签 - 移动端缩小 */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-6 md:mb-8">
                        <Gift className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="font-bold text-sm md:text-base">{content.urgency}</span>
                      </div>

                      {/* 统计信息 - 移动端优化 */}
                      {userCredits > 0 && (
                        <div className="flex justify-center items-center gap-8 md:gap-12 mb-6 md:mb-8">
                          <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold">{userCredits}</div>
                            <div className="text-xs md:text-sm text-white/80">Current Credits</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold">{Math.floor(userCredits / 2)}</div>
                            <div className="text-xs md:text-sm text-white/80">Images Left</div>
                          </div>
                        </div>
                      )}

                      {/* CTA 按钮 - 移动端优化 */}
                      <button
                        onClick={handleGetStarted}
                        className="inline-flex items-center gap-3 px-8 py-3 md:px-10 md:py-4 bg-white text-gray-800 font-bold rounded-2xl transition-all duration-150 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <span className="text-base md:text-lg">{content.cta}</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // 定价屏幕 - 移动端优化
                <div className="p-4 md:p-8">
                  <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">Choose Your Plan</h2>
                    <p className="text-gray-600 text-sm md:text-base">Unlock unlimited creative possibilities</p>
                  </div>

                  {/* 定价卡片 - 移动端垂直布局 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                    {PRICING_PLANS.map((plan, index) => (
                      <div
                        key={index}
                        className={`relative p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 cursor-pointer transition-all duration-150 ${selectedPlan === index
                          ? "border-purple-500 bg-purple-50 shadow-lg"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                          }`}
                        onClick={() => setSelectedPlan(index)}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <div className="px-4 py-1 md:px-6 md:py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs md:text-sm font-bold rounded-full shadow-lg">
                              MOST POPULAR
                            </div>
                          </div>
                        )}

                        <div className="text-center mb-4 md:mb-6">
                          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                          <p className="text-xs md:text-sm text-gray-600 mb-3 min-h-[30px] md:min-h-[40px] line-clamp-2">{plan.description}</p>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-2xl md:text-4xl font-bold text-gray-800">{plan.price}</span>
                            <div className="flex flex-col items-start">
                              <span className="text-sm md:text-lg text-gray-500 line-through leading-none">{plan.originalPrice}</span>
                              <span className="text-xs text-gray-600 font-medium">/month</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-purple-600 font-bold">
                            <Coins className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-sm md:text-base">{plan.credits} Credits</span>
                          </div>
                        </div>

                        {/* 移动端显示简化的特性列表 */}
                        <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                          {plan.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-700">
                              <Check className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                          {/* 桌面端显示所有特性 */}
                          <div className="hidden md:block">
                            {plan.features.slice(3).map((feature, i) => (
                              <li key={i + 3} className="flex items-center gap-3 text-sm text-gray-700 mt-3">
                                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </div>
                          {/* 移动端显示更多特性提示 */}
                          {plan.features.length > 3 && (
                            <li className="md:hidden text-xs text-gray-500 italic">
                              +{plan.features.length - 3} more features
                            </li>
                          )}
                        </ul>

                        {selectedPlan === index && (
                          <div className="absolute top-3 right-3 md:top-4 md:right-4 w-5 h-5 md:w-6 md:h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 购买按钮 - 移动端优化 */}
                  <div className="text-center">
                    {/* 错误提示 */}
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                      >
                        {errorMessage}
                      </motion.div>
                    )}

                    <button
                      onClick={() => handleCheckout(selectedPlan)}
                      disabled={loadingPlan !== null}
                      className={`inline-flex items-center gap-3 px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r ${selectedPlanData.gradient} hover:shadow-lg text-white font-bold rounded-2xl transition-all duration-150 hover:scale-105 ${loadingPlan ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                      {loadingPlan ? (
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                      ) : (
                        <Crown className="w-4 h-4 md:w-5 md:h-5" />
                      )}
                      <span className="text-base md:text-lg">
                        {loadingPlan ? "Processing..." : `Get ${selectedPlanData.name} Plan`}
                      </span>
                    </button>

                    <p className="text-xs text-gray-500 mt-4">
                      Secure Payment • Instant Delivery • 7-Day Money Back Guarantee
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}