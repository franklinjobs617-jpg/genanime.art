"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ShieldCheck,
  Crown,
  Rocket,
  Zap,
  Plus,
  Loader2,
  Lock,
  Globe,
  Sparkles,
  ArrowRight,
  Minus,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

// --- 配置部分 ---

interface PlanFeatures {
  text: string;
  highlight?: boolean;
}

interface Plan {
  name: string;
  key: string;
  price: { monthly: number; yearly: number };
  desc: string;
  credits: number;
  badge?: string;
  isPopular?: boolean;
  features: PlanFeatures[];
  icon: React.ReactNode;
  // 样式配置
  themeColor: string; // 图标颜色
  themeBg: string;    // 图标背景
  borderColor: string; // 边框颜色
  buttonStyle: string;
}

const plans: Plan[] = [
  {
    name: "Starter",
    key: "initiate", 
    price: { monthly: 12, yearly: 9 },
    desc: "Perfect for exploring AI art creation",
    credits: 120,
    badge: "Best Value",
    icon: <Rocket className="w-6 h-6" />,
    themeColor: "text-emerald-400",
    themeBg: "bg-emerald-900/30",
    borderColor: "group-hover:border-emerald-500/50",
    buttonStyle: "bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    features: [
      { text: "120 Credits monthly (~60 images)" },
      { text: "All AI models included" },
      { text: "HD quality (1024x1024)" },
      { text: "Personal use license" },
      { text: "Email support" },
    ],
  },
  {
    name: "Pro",
    key: "elite",
    price: { monthly: 29, yearly: 24 },
    desc: "Unleash your creativity with premium features",
    credits: 450,
    badge: "MOST POPULAR",
    isPopular: true,
    icon: <Crown className="w-6 h-6" />,
    themeColor: "text-amber-300",
    themeBg: "bg-amber-900/30",
    borderColor: "border-amber-500/50",
    buttonStyle: "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_auto] hover:bg-right text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    features: [
      { text: "450 Credits monthly (~225 images)" },
      { text: "⚡ 3x Faster generation", highlight: true },
      { text: "🏢 Commercial license included", highlight: true },
      { text: "4K Ultra-HD upscaling" },
      { text: "No watermarks", highlight: true },
      { text: "Priority queue access" },
      { text: "Advanced editing tools" },
    ],
  },
  {
    name: "Studio",
    key: "zenith",
    price: { monthly: 59, yearly: 49 },
    desc: "Professional-grade tools for teams & agencies",
    credits: 1200,
    badge: "For Teams",
    icon: <ShieldCheck className="w-6 h-6" />,
    themeColor: "text-purple-400",
    themeBg: "bg-purple-900/30",
    borderColor: "group-hover:border-purple-500/50",
    buttonStyle: "bg-purple-600 hover:bg-purple-500 text-white hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]",
    features: [
      { text: "1200 Credits monthly (~600 images)" },
      { text: "🚀 10x Faster with dedicated GPUs", highlight: true },
      { text: "📄 Full enterprise license", highlight: true },
      { text: "8K Professional upscaling" },
      { text: "Batch processing (50+ images)" },
      { text: "Custom model training" },
      { text: "API access included" },
      { text: "24/7 priority support" },
    ],
  },
];

const faqs = [
  {
    question: "Can I really make money with AI art?",
    answer: "Absolutely! Our creators sell AI art on Etsy, Fiverr, social media, and print-on-demand platforms. Many earn $500-2000+ monthly. The Pro plan includes commercial rights so you can sell everything you create.",
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer: "We offer a 7-day money-back guarantee. If you've used less than 20 credits and aren't happy with the quality, we'll refund you completely. No questions asked.",
  },
  {
    question: "How fast is the generation compared to free tools?",
    answer: "Pro users get 3x faster generation, and Studio users get 10x faster with dedicated GPUs. What takes 2-3 minutes on free tools takes 20-30 seconds with us.",
  },
  {
    question: "Do credits roll over if I don't use them all?",
    answer: "Yes! On Pro and Studio plans, unused credits roll over for up to 3 months. You'll never lose credits you've paid for.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, cancel anytime from your dashboard. No contracts, no cancellation fees. If you cancel, you keep access until your current billing period ends.",
  },
  {
    question: "What's included in commercial rights?",
    answer: "Full ownership of everything you create. Sell on marketplaces, use for client work, create merchandise, or license to others. No royalties or restrictions.",
  },
];

export default function PremiumPricing() {
  const [isYearly, setIsYearly] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const { user, login } = useAuth();

  const handleCheckout = async (planName: string, planKey: string) => {
    if (!user) {
      toast("Please sign in to upgrade.", { icon: "🔒" });
      login();
      return;
    }

    if (!user.googleUserId) {
      toast.error("User session expired. Please re-login.");
      return;
    }

    setLoadingPlan(planName);
    const toastId = toast.loading("Securing connection...");
    const typeParam = `plan_${planKey}_${isYearly ? "yearly" : "monthly"}`;

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
        toast.success("Redirecting to Stripe...", { id: toastId });
        window.location.href = resData.data;
      } else {
        throw new Error(resData.msg || "Server response error");
      }
    } catch (error: any) {
      console.error("Checkout Error:", error);
      toast.error(error.message || "Payment initiation failed.", { id: toastId });
      setLoadingPlan(null);
    }
  };

  return (
    <section className="relative py-32 bg-[#050505] text-white overflow-hidden font-sans selection:bg-indigo-500/30 min-h-screen">
      <Toaster position="top-center" toastOptions={{ style: { background: '#18181b', color: '#fff', border: '1px solid #3f3f46' } }} />

      {/* --- Ambient Background (更柔和的光晕) --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fuchsia-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* 这里的 Grid 只作为页面的大背景，不做在卡片里 */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* 修复：顶部 Badge 增加对比度 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase tracking-widest mb-8 shadow-lg backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> 
              <span className="bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent">🔥 Limited Time: 50% OFF First Month</span>
            </div>
            
            {/* 修复：标题文字颜色，不再使用深色渐变 */}
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8 leading-[0.9] text-white drop-shadow-xl">
              CREATE STUNNING <br />
              {/* 改为白色到浅灰的渐变，防止在黑底消失 */}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-orange-400 to-red-500">
                AI ARTWORK
              </span>
            </h2>
            
            <p className="text-zinc-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Join 50,000+ creators making money with AI art. Start earning from your first image.
            </p>
          </motion.div>

          {/* Toggle Switch */}
          <div className="mt-12 flex items-center justify-center gap-5 select-none">
            <span className={`text-xs font-bold tracking-widest transition-colors duration-300 ${!isYearly ? "text-white" : "text-zinc-500"}`}>MONTHLY</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 bg-zinc-800 rounded-full border border-zinc-600 p-1 cursor-pointer hover:border-zinc-500 transition-colors shadow-inner"
            >
              <motion.div
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-5 h-5 bg-white rounded-full shadow-md"
              />
            </button>
            <span className={`text-xs font-bold tracking-widest transition-colors duration-300 ${isYearly ? "text-white" : "text-zinc-500"}`}>
              YEARLY 
              <span className="ml-2 px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] rounded-full">
                SAVE 25%
              </span>
            </span>
          </div>
        </div>

        {/* --- Social Proof Section --- */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">50K+</div>
                <div className="text-sm text-zinc-400">Active Creators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">2M+</div>
                <div className="text-sm text-zinc-400">Images Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">$500K+</div>
                <div className="text-sm text-zinc-400">Creator Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white mb-2">4.9★</div>
                <div className="text-sm text-zinc-400">User Rating</div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-400">
              <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/50 rounded-full">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>127 people upgraded today</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/50 rounded-full">
                <Crown className="w-3 h-3 text-amber-400" />
                <span>Featured on ProductHunt</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- Pricing Cards --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-32 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative group ${plan.isPopular ? "lg:-mt-8 lg:mb-8 z-10" : "z-0"}`}
            >
              {/* Popular Glow Effect */}
              {plan.isPopular && (
                <div className="absolute inset-0 -m-[1px] bg-gradient-to-b from-amber-300 via-orange-500 to-amber-700 rounded-[33px] blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              {plan.isPopular && (
                 <div className="absolute top-0 inset-x-0 h-full bg-amber-600/10 blur-[80px] rounded-[40px] z-[-1]" />
              )}

              {/* Card Container - 移除内部网格，使用纯净深色背景 */}
              <div className={`
                relative h-full flex flex-col rounded-[32px] p-0.5 transition-colors duration-300 
                ${!plan.isPopular ? "bg-zinc-800/50 border border-zinc-800 hover:border-zinc-700" : "bg-black"}
                ${plan.borderColor}
              `}>
                <div className="flex-1 flex flex-col p-8 rounded-[30px] bg-[#0c0c0e] relative overflow-hidden">
                  
                  {/* 仅保留极淡的噪点，去掉讨厌的线条网格 */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />

                  {/* Header Badge & Icon */}
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center border
                      ${plan.themeBg} ${plan.themeColor} border-white/5 shadow-inner
                    `}>
                      {plan.icon}
                    </div>
                    {plan.badge && (
                      <span className={`
                        text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border
                        ${plan.isPopular 
                          ? "bg-amber-400 text-black border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.3)]" 
                          : "bg-zinc-800 border-zinc-700 text-zinc-500"}
                      `}>
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Plan Name & Price */}
                  <h3 className="text-2xl font-black italic tracking-tight text-white mb-2 relative z-10">{plan.name}</h3>
                  <div className="flex items-baseline gap-1.5 mb-3 relative z-10">
                    <span className="text-5xl font-black tracking-tighter text-white">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                    <span className="text-zinc-500 font-bold text-sm uppercase">/ mo</span>
                  </div>
                  <p className="text-zinc-400 text-sm font-medium mb-8 min-h-[40px] leading-relaxed relative z-10">{plan.desc}</p>

                  {/* Credits Box - 增加亮度和对比度 */}
                  <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 flex items-center justify-between relative z-10 group-hover:border-zinc-600 transition-colors shadow-lg">
                     <div className="flex flex-col">
                       <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Monthly Credits</span>
                       <span className="text-[10px] text-zinc-500 mt-0.5">≈ {Math.floor(plan.credits / 2)} images</span>
                     </div>
                     <span className="text-lg font-black text-white flex items-center gap-2">
                        <Zap className={`w-5 h-5 ${plan.isPopular ? "text-amber-400 fill-amber-400" : "text-emerald-400 fill-emerald-400"}`} /> 
                        {plan.credits}
                     </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent w-full mb-8" />

                  {/* Features */}
                  <ul className="space-y-4 mb-10 flex-1 relative z-10">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3.5 group/item">
                        {/* Checkmark Container */}
                        <div className={`
                          mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-300
                          ${feature.highlight 
                            ? `${plan.themeBg} ${plan.themeColor} border-transparent` 
                            : "bg-zinc-900 border-zinc-800 text-zinc-600 group-hover/item:border-zinc-700 group-hover/item:text-zinc-400"}
                        `}>
                          <Check className="w-3 h-3 stroke-[3px]" />
                        </div>
                        {/* Feature Text - 提高亮度 */}
                        <span className={`text-sm transition-colors duration-300 ${feature.highlight ? "text-white font-bold" : "text-zinc-400 font-medium group-hover/item:text-zinc-300"}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <button
                    onClick={() => handleCheckout(plan.name, plan.key)}
                    disabled={loadingPlan !== null}
                    className={`
                      w-full py-4 rounded-xl font-black text-sm uppercase tracking-[0.1em] flex items-center justify-center gap-2 group/btn relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                      ${plan.buttonStyle}
                      ${loadingPlan && "opacity-70 cursor-not-allowed"}
                    `}
                  >
                    {loadingPlan === plan.name ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span className="relative z-10">Start Creating Now</span>
                        <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />
                      </>
                    )}
                  </button>
                  
                  {/* Value Proposition */}
                  <div className="mt-4 text-center">
                    <div className="text-xs text-zinc-500 mb-1">
                      ${((isYearly ? plan.price.yearly : plan.price.monthly) / (plan.credits / 2)).toFixed(2)} per image
                    </div>
                    <div className="flex items-center justify-center gap-2 text-emerald-400">
                      <Check className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Cancel anytime</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Guarantee & Security --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-32">
            <div className="flex gap-5 items-start p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all group">
                <div className="p-3.5 bg-emerald-600 rounded-2xl group-hover:bg-emerald-500 transition-colors">
                    <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <div>
                    <h4 className="font-bold text-white mb-2 text-lg">7-Day Money-Back</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Not happy? Get a full refund within 7 days, no questions asked. We're that confident you'll love it.
                    </p>
                </div>
            </div>
            <div className="flex gap-5 items-start p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all group">
                <div className="p-3.5 bg-amber-600 rounded-2xl group-hover:bg-amber-500 transition-colors">
                    <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                    <h4 className="font-bold text-white mb-2 text-lg">Commercial Rights</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Own everything you create. Sell on Etsy, use for clients, or license to others. No royalties ever.
                    </p>
                </div>
            </div>
            <div className="flex gap-5 items-start p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all group">
                <div className="p-3.5 bg-purple-600 rounded-2xl group-hover:bg-purple-500 transition-colors">
                    <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                    <h4 className="font-bold text-white mb-2 text-lg">Lightning Fast</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Generate images 3-10x faster than free tools. More creations = more earning potential.
                    </p>
                </div>
            </div>
        </div>

        {/* --- FAQ Section --- */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black italic tracking-tighter mb-4 text-white">FAQ</h3>
            <p className="text-zinc-400">Common questions about billing and licenses.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`group border rounded-2xl bg-zinc-900/20 overflow-hidden transition-all duration-300 ${activeAccordion === i ? 'border-zinc-600 bg-zinc-900/60' : 'border-zinc-800 hover:border-zinc-700'}`}
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-bold text-sm transition-colors ${activeAccordion === i ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full transition-colors ${activeAccordion === i ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                     {activeAccordion === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeAccordion === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* --- Trusted Footer --- */}
        <div className="mt-32 pt-16 border-t border-zinc-900/50 flex flex-col items-center">
            <div className="flex gap-10 items-center opacity-30 hover:opacity-60 transition-opacity duration-500 grayscale">
                <span className="font-black text-xl tracking-tighter text-white">STRIPE</span>
                <span className="font-black text-xl tracking-tighter text-white">VISA</span>
                <span className="font-black text-xl tracking-tighter text-white">MASTERCARD</span>
                <span className="font-black text-xl tracking-tighter text-white">PAYPAL</span>
            </div>
            <p className="mt-8 text-[10px] text-zinc-600 uppercase tracking-widest font-bold flex items-center gap-2">
               <Lock className="w-3 h-3" /> Encrypted Secure Checkout
            </p>
        </div>

      </div>
    </section>
  );
}