import PromptLibraryClient from "@/components/seedance/PromptLibraryClient";
import { Link } from "@/i18n/routing";
import { SEEDANCE_PROMPT_TEMPLATES } from "@/lib/seedancePrompts";
export { metadata } from "./metadata";

export default function SeedanceAnimePromptsPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Seedance Anime Prompts Library",
    url: "https://genanime.art/seedance-anime-prompts",
    description:
      "Curated Seedance anime prompts for openings, action scenes, romance clips, loops, and ad creatives.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: SEEDANCE_PROMPT_TEMPLATES.map((template, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: template.title,
        description: template.useCase,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-[#030305] text-zinc-200 font-sans pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <section className="container mx-auto px-6 max-w-7xl">
        <header className="max-w-4xl mb-12">
          <span className="inline-flex px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-wider">
            Seedance Prompt Library
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tight mt-4">
            Best Seedance Anime Prompts:
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              {" "}
              Copy, Adapt, Execute
            </span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed mt-5 max-w-3xl">
            Use categorized Seedance anime prompt templates for real scenarios:
            openings, action clips, romance scenes, ambient loops, and ad creatives.
            Each template includes negative prompts, camera motion, duration, and aspect ratio.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/anime-image-to-video"
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
            >
              Open Workflow Builder
            </Link>
            <Link
              href="/seedance"
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-200 font-bold hover:bg-white/10 transition-colors"
            >
              Back to Seedance Hub
            </Link>
          </div>
        </header>

        <PromptLibraryClient templates={SEEDANCE_PROMPT_TEMPLATES} />
      </section>
    </main>
  );
}
