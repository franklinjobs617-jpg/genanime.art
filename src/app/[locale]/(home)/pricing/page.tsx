"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  Crown,
  RefreshCcw,
  Lock,
  CreditCard,
  HelpCircle,
  Rocket,
  Wand2,
  ZapIcon,
  Flame,
  Star,
  Plus,
  Loader2,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext"; // 请确保路径正确指向你的 AuthProvider 文件

// --- 权益配置 (基于后端逻辑映射) ---
const plans = [
  {
    name: "Initiate",
    price: { monthly: 12, yearly: 9 },
    desc: "Start your journey into the anime universe.",
    credits: 120,
    highlight: "Ideal for Hobbyists",
    features: [
      "120 High-speed credits / mo",
      "Access to Base Models (V4/V5)",
      "Standard Generation Speed",
      "Personal Use License",
      "Basic Upscaling (2K)",
    ],
    icon: <Rocket className="w-5 h-5 text-blue-400" />,
    theme: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/50",
    btnClass: "bg-white text-black hover:bg-zinc-200",
  },
  {
    name: "Elite",
    price: { monthly: 29, yearly: 24 },
    desc: "The powerhouse for content creators & artists.",
    credits: 450,
    highlight: "Best Value - Most Popular",
    features: [
      "450 High-speed credits / mo",
      "Commercial Usage Rights",
      "Advanced Models (Seedream V5)",
      "Ultra-HD 4K Upscaling",
      "Priority GPU Queue (Fast)",
      "Early Access to Video Gen",
    ],
    icon: <Crown className="w-5 h-5 text-amber-400" />,
    isPopular: true,
    theme: "from-indigo-600/20 to-purple-600/20",
    border: "border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.2)]",
    btnClass:
      "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]",
  },
  {
    name: "Zenith",
    price: { monthly: 59, yearly: 49 },
    desc: "Ultimate performance for professional studios.",
    credits: 1200,
    highlight: "Unlimited Creative Freedom",
    features: [
      "1200 High-speed credits / mo",
      "Full Enterprise License",
      "Private Stealth Generation",
      "8K Extreme Upscaling",
      "Bulk Batch Rendering (x4)",
      "24/7 Priority Support",
      "Custom Style Training",
    ],
    icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
    theme: "from-purple-600/20 to-pink-600/20",
    border: "group-hover:border-purple-500/50",
    btnClass: "bg-white text-black hover:bg-zinc-200",
  },
];

const faqs = [
  {
    question: "Is there a refund policy?",
    answer:
      "Yes. We offer a 7-day 'Quality Guarantee'. If you've used less than 20 credits and are not satisfied with the art style, we'll provide a full refund.",
  },
  {
    question: "Do my credits roll over to next month?",
    answer:
      "On Elite and Zenith plans, unused credits roll over for up to 3 months. Initiate plan credits refresh monthly.",
  },
  {
    question: "Can I use these images commercially?",
    answer:
      "Elite and Zenith plans include full commercial rights. The Initiate plan is for personal use only.",
  },
];

export default function PremiumPricing() {
  const [isYearly, setIsYearly] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  // 从 AuthContext 获取用户信息
  const { user, login } = useAuth();

  // 处理支付跳转
  const handleCheckout = async (planName: string) => {
    // 1. 登录检查
    if (!user) {
      toast("Please sign in to upgrade.", { icon: "🔒" });
      login();
      return;
    }

    if (!user.googleUserId) {
      toast.error("User session expired. Please re-login.");
      return;
    }

    // 2. 状态锁定
    setLoadingPlan(planName);
    const toastId = toast.loading("Preparing secure checkout...");

    // 3. 构建参数 (对接后端 PayTypeConvert.getProductInfo)
    // 格式: plan_initiate_monthly / plan_elite_yearly 等
    const planKey = `plan_${planName.toLowerCase()}_${isYearly ? "yearly" : "monthly"
      }`;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stripe/getPayUrl`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: planKey,
            googleUserId: user.googleUserId,
          }),
        }
      );

      const resData = await response.json();

      if (resData.code === 200 && resData.data) {
        toast.success("Redirecting to Stripe...", { id: toastId });
        window.location.href = resData.data;
      } else {
        throw new Error(resData.msg || "Server response error");
      }
    } catch (error: any) {
      console.error("Checkout Error:", error);
      toast.error(error.message || "Failed to initiate payment. Try again.", {
        id: toastId,
      });
      setLoadingPlan(null);
    }
  };

  return (
    <section className="py-32 bg-[#020204] text-white overflow-hidden relative font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      {/* 背景动态流光 */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        {/* --- Header --- */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Flame className="w-3 h-3 text-orange-500" /> Powered by H100
              Clusters
            </div>
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-8 leading-[0.9]">
              UNLEASH YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
                ZENITH VISION
              </span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Transform imagination into pixels with professional-grade AI
              models. Select a plan to elevate your creative mastery.
            </p>
          </motion.div>

          {/* Toggle Switch */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <span
              className={`text-xs font-black tracking-widest ${!isYearly ? "text-white" : "text-zinc-600"
                }`}
            >
              MONTHLY
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-20 h-10 bg-zinc-900 rounded-full p-1.5 border border-white/10 group transition-all"
            >
              <motion.div
                animate={{ x: isYearly ? 40 : 0 }}
                className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              />
            </button>
            <span
              className={`text-xs font-black tracking-widest ${isYearly ? "text-white" : "text-zinc-600"
                }`}
            >
              YEARLY{" "}
              <span className="text-indigo-400 ml-1 text-[10px] bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                SAVE 25%
              </span>
            </span>
          </div>
        </div>

        {/* --- Pricing Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32 items-end">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative flex flex-col p-1 rounded-[40px] transition-all duration-500 ${plan.isPopular ? "scale-105 z-20" : "z-10"
                }`}
            >
              <div
                className={`relative flex flex-col h-full p-10 rounded-[39px] bg-[#0A0A0C]/90 backdrop-blur-3xl border border-white/5 transition-all duration-500 ${plan.border}`}
              >
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                      {plan.icon}
                    </div>
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                      {plan.highlight}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black italic tracking-tight mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-6xl font-black tracking-tighter">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-zinc-600 font-bold text-sm uppercase">
                      / mo
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[11px] font-bold text-indigo-400">
                    <ZapIcon className="w-3 h-3 fill-current" /> {plan.credits}{" "}
                    HIGH-SPEED CREDITS
                  </div>
                  <p className="mt-6 text-sm text-zinc-500 leading-relaxed font-medium">
                    {plan.desc}
                  </p>
                </div>

                <div className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-4">
                      <div className="mt-1 w-4 h-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-indigo-400" />
                      </div>
                      <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors uppercase tracking-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleCheckout(plan.name)}
                  disabled={loadingPlan !== null}
                  className={`w-full py-5 rounded-[22px] font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${plan.btnClass}`}
                >
                  {loadingPlan === plan.name ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    `Upgrade to ${plan.name}`
                  )}
                </button>
              </div>

              <div
                className={`absolute inset-0 bg-gradient-to-br ${plan.theme} opacity-0 group-hover:opacity-100 rounded-[40px] blur-3xl transition-opacity duration-700 -z-10`}
              />
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mb-40 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6 p-10 bg-zinc-900/30 border border-white/5 rounded-[40px] group hover:bg-zinc-900/50 transition-all">
              <div className="w-16 h-16 rounded-[22px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
                <ShieldCheck className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 tracking-tight italic">
                  IRONCLAD GUARANTEE
                </h4>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                  Not satisfied? We offer a 7-day refund policy for all plans if
                  you've used less than 20 credits. Your satisfaction is our
                  priority.
                </p>
              </div>
            </div>
            <div className="flex gap-6 p-10 bg-zinc-900/30 border border-white/5 rounded-[40px] group hover:bg-zinc-900/50 transition-all">
              <div className="w-16 h-16 rounded-[22px] bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
                <Lock className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 tracking-tight italic">
                  SECURE INFRASTRUCTURE
                </h4>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                  Payments are processed via Stripe with 256-bit SSL encryption.
                  We never store your sensitive card information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- FAQ --- */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4">
              Questions?
            </h3>
            <div className="h-1 w-12 bg-indigo-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-white/5 rounded-[28px] bg-white/[0.02] overflow-hidden transition-all hover:border-white/10"
              >
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === i ? null : i)
                  }
                  className="w-full flex items-center justify-between p-7 text-left"
                >
                  <span className="font-bold text-sm md:text-base text-zinc-300 uppercase tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full border transition-all duration-300 ${activeAccordion === i
                      ? "bg-indigo-500 border-indigo-500 rotate-180"
                      : "border-white/10 bg-white/5"
                      }`}
                  >
                    <Plus
                      className={`w-4 h-4 transition-transform ${activeAccordion === i ? "rotate-45" : ""
                        }`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {activeAccordion === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-7 pb-7 text-sm text-zinc-500 leading-relaxed border-t border-white/5 pt-6 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* --- Trusted Partners --- */}
        <div className="mt-40 pt-20 border-t border-white/5 flex flex-col items-center">
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-20 grayscale transition-all hover:opacity-40">
            <span className="font-black text-3xl tracking-tighter">STRIPE</span>
            <span className="font-black text-3xl tracking-tighter">VISA</span>
            <span className="font-black text-3xl tracking-tighter">MASTER</span>
            <span className="font-black text-3xl tracking-tighter">PAYPAL</span>
          </div>
          <p className="mt-12 text-[10px] text-zinc-700 uppercase tracking-[0.5em] font-black">
            Encrypted & Verified Digital Experience
          </p>
        </div>
      </div>
    </section>
  );
}
