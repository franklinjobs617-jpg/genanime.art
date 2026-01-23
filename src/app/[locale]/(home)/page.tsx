import dynamic from 'next/dynamic';
import Hero from "@/components/home/Hero";

// 优化动态导入 - 保持SSR但延迟加载非关键组件
const FeatureSection = dynamic(() => import("@/components/home/FeatureSection"), {
  loading: () => <div className="h-96 bg-[#050505] animate-pulse" />
});

const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"), {
  loading: () => <div className="h-96 bg-[#050505] animate-pulse" />
});

const PromptLibraryPreview = dynamic(() => import("@/components/home/PromptLibraryPreview"), {
  loading: () => <div className="h-96 bg-[#050505] animate-pulse" />
});

const CoreFeatures = dynamic(() => import("@/components/home/CoreFeatures"), {
  loading: () => <div className="h-96 bg-[#050505] animate-pulse" />
});

const SEOContentSection = dynamic(() => import("@/components/home/SEOContentSection"), {
  loading: () => <div className="h-64 bg-[#050505] animate-pulse" />
});

const FAQSection = dynamic(() => import("@/components/home/FAQSection"), {
  loading: () => <div className="h-96 bg-[#050505] animate-pulse" />
});

const CallToAction = dynamic(() => import("@/components/home/CallToAction"), {
  loading: () => <div className="h-64 bg-[#050505] animate-pulse" />
});

const BrHomePage = dynamic(() => import("@/components/home/br/BrHomePage"), {
  loading: () => <div className="min-h-screen bg-[#050505] animate-pulse" />
});

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  if (locale === 'pt') {
    return <BrHomePage />;
  }

  return (
    <main className="relative min-h-screen bg-[#050505]">
      <Hero />
      
      <FeatureSection />
      <HowItWorks />
      <PromptLibraryPreview />
      <CoreFeatures />
      <SEOContentSection />
      <FAQSection />
      <CallToAction />

      {locale === 'en' && (
        <div className="w-full flex justify-center items-center py-6 bg-[#050505]">
          <a 
            href="https://theresanaiforthat.com/ai/animeai/?ref=featured&v=7340698" 
            target="_blank" 
            rel="nofollow"
            className="hover:opacity-80 transition-opacity" 
          >
            <img 
              width="300" 
              src="https://media.theresanaiforthat.com/featured-on-taaft.png?width=600" 
              alt="Verified on There's An AI For That" 
              loading='lazy'
            />
          </a>
        </div>
      )}
    </main>
  );
}