import { Link } from "@/i18n/routing";
import { Sparkles, Workflow, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

const FAQ_ITEMS = [
  {
    question: "Is this an official Seedance website?",
    answer:
      "No. GenAnime is an independent workflow layer for anime creators. We are not affiliated with ByteDance or CapCut.",
  },
  {
    question: "What can I do here today?",
    answer:
      "You can use anime-focused prompt templates and generate structured image-to-video prompt packs. Final video rendering availability depends on your model access.",
  },
  {
    question: "Why use this instead of just browsing official docs?",
    answer:
      "This hub is focused on practical anime use-cases: scene templates, camera motion presets, and a faster workflow from image concept to video prompt pack.",
  },
  {
    question: "Is Seedance support fully available in every region?",
    answer:
      "Model access and rollout may vary by region and account tier. You can still use templates and workflow builder outputs today.",
  },
];

export default function SeedanceHubPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Seedance Workflow Hub for Anime Creators",
    url: "https://genanime.art/seedance",
    description:
      "Practical Seedance workflow hub for anime creators: prompts, camera motion guides, and image-to-video prompt-pack tools.",
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "GenAnime",
      url: "https://genanime.art",
    },
  };

  return (
    <main className="min-h-screen bg-[#030305] text-zinc-200 font-sans pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4" />
            Seedance Anime Workflow Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tight">
            Seedance for Anime Creators:
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Practical Workflow, Not Just Theory
            </span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed mt-6 max-w-3xl mx-auto">
            Use this Seedance hub to move from idea to execution: anime prompt templates,
            camera-motion guidance, and a structured image-to-video prompt-pack builder.
          </p>
          <p className="text-zinc-500 text-xs mt-4">
            Independent workflow guide. Not affiliated with ByteDance or CapCut.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/anime-image-to-video"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors"
            >
              Start Anime Image-to-Video Workflow
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/seedance-anime-prompts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-200 font-bold hover:bg-white/10 transition-colors"
            >
              Browse Seedance Anime Prompts
            </Link>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <FeatureCard
            icon={<Workflow className="w-5 h-5 text-indigo-300" />}
            title="Workflow-first"
            description="Designed for creators who want output fast: prompt templates + guided execution."
          />
          <FeatureCard
            icon={<Target className="w-5 h-5 text-indigo-300" />}
            title="Anime-specific"
            description="Focused on anime openings, action clips, romance scenes, loops, and ad creatives."
          />
          <FeatureCard
            icon={<CheckCircle2 className="w-5 h-5 text-indigo-300" />}
            title="Production-ready outputs"
            description="Get clean prompt structures you can copy directly into your Seedance workflow."
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          <JourneyCard
            title="1. Find proven templates"
            description="Open categorized anime Seedance prompts and copy a structure that already works."
            linkText="Open prompt library"
            href="/seedance-anime-prompts"
          />
          <JourneyCard
            title="2. Build your prompt pack"
            description="Use the workflow builder to generate a master prompt, negative prompt, shot list, and settings."
            linkText="Open workflow builder"
            href="/anime-image-to-video"
          />
        </section>

        <section className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-black text-white mb-6">Seedance FAQ</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="group bg-black/20 border border-white/5 rounded-xl p-4"
              >
                <summary className="cursor-pointer list-none text-zinc-200 font-semibold">
                  {item.question}
                </summary>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
      <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
    </article>
  );
}

function JourneyCard({
  title,
  description,
  linkText,
  href,
}: {
  title: string;
  description: string;
  linkText: string;
  href: string;
}) {
  return (
    <article className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{description}</p>
      <Link href={href} className="text-sm font-bold text-indigo-300 hover:text-indigo-200">
        {linkText} →
      </Link>
    </article>
  );
}
