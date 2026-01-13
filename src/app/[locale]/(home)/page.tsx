import dynamic from 'next/dynamic';
import Hero from "@/components/home/Hero";

// Lazy load below-the-fold components
const FeatureSection = dynamic(() => import("@/components/home/FeatureSection"), {
  loading: () => <div className="min-h-[400px] bg-[#050505]" />
});

const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"), {
  loading: () => <div className="min-h-[400px] bg-[#050505]" />
});

const PromptLibraryPreview = dynamic(() => import("@/components/home/PromptLibraryPreview"), {
  loading: () => <div className="min-h-[600px] bg-[#050505]" />
});

const CoreFeatures = dynamic(() => import("@/components/home/CoreFeatures"), {
  loading: () => <div className="min-h-[600px] bg-[#050505]" />
});

const SEOContentSection = dynamic(() => import("@/components/home/SEOContentSection"));

const FAQSection = dynamic(() => import("@/components/home/FAQSection"));

const CallToAction = dynamic(() => import("@/components/home/CallToAction"));



export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* Critical: Load immediately */}
      <Hero />

      {/* Non-critical: Lazy loaded */}
      <FeatureSection />

      <HowItWorks />

      <PromptLibraryPreview />

      <CoreFeatures />

      <SEOContentSection />

      <FAQSection />

      <CallToAction />
    </div>
  );
}
