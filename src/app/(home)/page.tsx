import Hero from "@/components/home/Hero";
import FeatureSection from "@/components/home/FeatureSection";
import HowItWorks from "@/components/home/HowItWorks";
import CoreFeatures from "@/components/home/CoreFeatures";
import PromptLibraryPreview from "@/components/home/PromptLibraryPreview";
import CallToAction from "@/components/home/CallToAction";
import SEOContentSection from "@/components/home/SEOContentSection";
import FAQSection from "@/components/home/FAQSection";

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
      <Hero />

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
