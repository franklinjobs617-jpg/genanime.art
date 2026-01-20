import dynamic from 'next/dynamic';
import Hero from "@/components/home/Hero";
const FeatureSection = dynamic(() => import("@/components/home/FeatureSection"));
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"));
const PromptLibraryPreview = dynamic(() => import("@/components/home/PromptLibraryPreview"));
const CoreFeatures = dynamic(() => import("@/components/home/CoreFeatures"));
const SEOContentSection = dynamic(() => import("@/components/home/SEOContentSection"));
const FAQSection = dynamic(() => import("@/components/home/FAQSection"));
const CallToAction = dynamic(() => import("@/components/home/CallToAction"));
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
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