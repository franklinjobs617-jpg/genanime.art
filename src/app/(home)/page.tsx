import dynamic from 'next/dynamic';
import Hero from "@/components/home/Hero";

// Lazy load below-the-fold components with loading states
const FeatureSection = dynamic(() => import("@/components/home/FeatureSection"), {
  loading: () => <div className="h-screen bg-[#050505]" />,
  ssr: true
});

const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"), {
  loading: () => <div className="h-screen bg-[#050505]" />,
  ssr: true
});

const PromptLibraryPreview = dynamic(() => import("@/components/home/PromptLibraryPreview"), {
  loading: () => <div className="h-screen bg-[#050505]" />,
  ssr: true
});

const CoreFeatures = dynamic(() => import("@/components/home/CoreFeatures"), {
  loading: () => <div className="h-screen bg-[#050505]" />,
  ssr: true
});

const SEOContentSection = dynamic(() => import("@/components/home/SEOContentSection"), {
  loading: () => <div className="min-h-[400px] bg-[#050505]" />,
  ssr: true
});

const FAQSection = dynamic(() => import("@/components/home/FAQSection"), {
  loading: () => <div className="min-h-[600px] bg-[#050505]" />,
  ssr: true
});

const CallToAction = dynamic(() => import("@/components/home/CallToAction"), {
  loading: () => <div className="h-96 bg-[#050505]" />,
  ssr: true
});

export const metadata = {
  title: "AI Anime Generator | Free Anime AI Art & Image Generator 2026",
  description:
    "Generate stunning anime art with our free AI anime generator. Best anime AI art generator with 2026 . Create waifu, chibi & scenes for free.",

  alternates: {
    canonical: "https://genanime.art/",
  },
};

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
