import ImageToVideoWorkflowClient from "@/components/seedance/ImageToVideoWorkflowClient";
import { Link } from "@/i18n/routing";

const FAQ_ITEMS = [
  {
    question: "Does this page render final video files directly?",
    answer:
      "No. This tool generates structured Seedance-ready prompt packs (master prompt, negative prompt, shot list, settings). You run final rendering in your model workflow.",
  },
  {
    question: "Can I use my own reference image?",
    answer:
      "Yes. You can upload a reference image for context while creating your prompt pack. The current tool focuses on prompt-pack generation quality.",
  },
  {
    question: "Who should use this page?",
    answer:
      "Creators who already have anime image concepts and want a faster, repeatable path to image-to-video prompts.",
  },
];

export default function AnimeImageToVideoPage() {
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to build Seedance anime image-to-video prompt packs",
    description:
      "Create a structured prompt pack from anime image concept, motion settings, and scene goals.",
    step: [
      {
        "@type": "HowToStep",
        name: "Define subject and scene",
        text: "Describe the character and environment clearly.",
      },
      {
        "@type": "HowToStep",
        name: "Set motion and camera strategy",
        text: "Choose motion strength, camera movement, duration, and aspect ratio.",
      },
      {
        "@type": "HowToStep",
        name: "Generate and export prompt pack",
        text: "Copy the master prompt, negative prompt, shot list, and settings into your rendering flow.",
      },
    ],
  };

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

  return (
    <main className="min-h-screen bg-[#030305] text-zinc-200 font-sans pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="container mx-auto px-6 max-w-7xl">
        <header className="max-w-4xl mb-10">
          <span className="inline-flex px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-wider">
            Anime Image-to-Video Workflow
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tight mt-4">
            Turn Anime Image Ideas into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              {" "}
              Seedance Prompt Packs
            </span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed mt-5 max-w-3xl">
            Build an executable prompt pack in minutes: master prompt, negative prompt,
            shot list, and export settings. This is the fastest path from anime concept to
            image-to-video workflow execution.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/seedance-anime-prompts"
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-200 font-bold hover:bg-white/10 transition-colors"
            >
              Browse Seedance Prompt Templates
            </Link>
            <Link
              href="/seedance"
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-200 font-bold hover:bg-white/10 transition-colors"
            >
              Back to Seedance Hub
            </Link>
          </div>
        </header>

        <ImageToVideoWorkflowClient />

        <section className="mt-12 bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-black text-white mb-6">Workflow FAQ</h2>
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
