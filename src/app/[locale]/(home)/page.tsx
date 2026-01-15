import dynamic from 'next/dynamic';
import Hero from "@/components/home/Hero";

/**
 * 优化策略：
 * 1. 移除所有 skeleton loaders - 避免 CLS (Cumulative Layout Shift)
 * 2. 保持 SSR - 所有内容对 Google 爬虫可见
 * 3. 使用 dynamic import - 代码分割，减小初始 bundle
 * 4. SEO 关键组件（FAQ, SEOContent）完全可被爬取
 */

// 所有组件使用 dynamic import 进行代码分割，但不禁用 SSR
const FeatureSection = dynamic(() => import("@/components/home/FeatureSection"));
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"));
const PromptLibraryPreview = dynamic(() => import("@/components/home/PromptLibraryPreview"));
const CoreFeatures = dynamic(() => import("@/components/home/CoreFeatures"));

// SEO 关键组件 - 必须保证完整 SSR
const SEOContentSection = dynamic(() => import("@/components/home/SEOContentSection"));
const FAQSection = dynamic(() => import("@/components/home/FAQSection"));

const CallToAction = dynamic(() => import("@/components/home/CallToAction"));

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      <Hero />

      <FeatureSection />
      <HowItWorks />
      <PromptLibraryPreview />
      <CoreFeatures />

      <SEOContentSection />

      <FAQSection />

      <CallToAction />
    </main>
  );
}