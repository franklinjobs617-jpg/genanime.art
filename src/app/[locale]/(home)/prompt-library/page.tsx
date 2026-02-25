import { Metadata } from "next";
import PromptLibraryClient from "./components/PromptLibraryClient";

export const metadata: Metadata = {
  title: "Anime Art Style Prompts for AI - Free Prompt Library | GenAnime.art",
  description:
    "Browse 100+ curated anime art style prompts for AI image generators. Ready-to-use prompts for Stable Diffusion, Midjourney, and DALL-E. Copy and generate stunning anime art instantly.",
  keywords: [
    "anime art style prompts for ai",
    "anime prompts for ai art",
    "stable diffusion anime prompts",
    "midjourney anime prompts",
    "anime character prompts",
    "ai anime art prompts",
    "anime prompt library",
    "niji journey prompts",
    "anime diffusion prompts",
    "kawaii ai prompts",
    "cyberpunk anime prompts",
    "anime landscape prompts",
    "best anime prompts",
    "free anime prompts",
    "anime prompt generator",
  ].join(", "),
  openGraph: {
    title: "Anime Art Style Prompts for AI - Free Prompt Library",
    description:
      "100+ curated anime art style prompts for Stable Diffusion, Midjourney, and DALL-E. Copy and generate stunning anime art instantly.",
    type: "website",
    url: "https://genanime.art/prompt-library",
    siteName: "GenAnime.art",
    images: [
      {
        url: "/prompt-library-og.jpg",
        width: 1200,
        height: 630,
        alt: "Anime Art Style Prompts for AI - GenAnime.art Prompt Library",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anime Art Style Prompts for AI - Free Prompt Library",
    description:
      "100+ curated anime art style prompts for Stable Diffusion, Midjourney, and DALL-E.",
    images: ["/prompt-library-og.jpg"],
    creator: "@genanime_art",
  },
  alternates: {
    canonical: "https://genanime.art/prompt-library",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: "GenAnime.art Team" }],
  category: "Entertainment",
};

export default function PromptLibraryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Anime Art Style Prompts for AI",
    description:
      "A curated library of anime art style prompts for AI image generators including Stable Diffusion, Midjourney, and DALL-E. Browse, copy, and generate stunning anime art.",
    url: "https://genanime.art/prompt-library",
    inLanguage: "en-US",
    isAccessibleForFree: true,
    creator: {
      "@type": "Organization",
      name: "GenAnime.art",
      url: "https://genanime.art",
    },
    about: {
      "@type": "Thing",
      name: "Anime AI Art Prompts",
      description:
        "Optimized text prompts for generating anime-style artwork using AI image generators",
    },
    keywords:
      "anime art style prompts for ai, stable diffusion anime prompts, midjourney anime prompts, ai anime art",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://genanime.art",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://genanime.art/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Prompt Library",
        item: "https://genanime.art/prompt-library",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are anime art style prompts for AI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Anime art style prompts for AI are text descriptions used with AI image generators like Stable Diffusion, Midjourney, or DALL-E to produce anime-style artwork. They typically include style keywords like 'anime style', 'cel shading', quality boosters like 'masterpiece, best quality', and subject descriptions.",
        },
      },
      {
        "@type": "Question",
        name: "Which AI generators work best with anime prompts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stable Diffusion (especially with Niji models), Midjourney with --niji flag, and DALL-E 3 all produce excellent anime-style results. Our prompts are optimized for all three platforms.",
        },
      },
      {
        "@type": "Question",
        name: "How do I write a good anime prompt for AI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A good anime AI prompt follows this formula: Quality tags (masterpiece, best quality) + Subject (1girl, white hair) + Style (anime style, cel shading) + Lighting (cinematic lighting) + Negative prompt (worst quality, bad anatomy). Browse our library for ready-to-use examples.",
        },
      },
      {
        "@type": "Question",
        name: "Are these anime prompts free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all prompts in our library are completely free to copy and use for any purpose, including personal and commercial projects.",
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Static SEO content - crawlable by Google */}
      <section className="sr-only" aria-hidden="false">
        <h1>Anime Art Style Prompts for AI - Free Prompt Library</h1>
        <p>
          Browse our curated collection of anime art style prompts for AI image
          generators. Copy ready-to-use prompts for Stable Diffusion, Midjourney,
          Niji Journey, and DALL-E to generate stunning anime artwork instantly.
          All prompts are free and optimized for the best results.
        </p>

        <h2>What Are Anime Art Style Prompts for AI?</h2>
        <p>
          Anime art style prompts for AI are carefully crafted text descriptions
          that guide AI image generators to produce anime-style artwork. Each
          prompt in our library includes quality boosters, subject descriptions,
          style keywords, and lighting tags — everything you need to generate
          professional-quality anime art.
        </p>

        <h2>Anime Prompt Categories</h2>
        <ul>
          <li>
            <strong>Anime Girl Prompts</strong> – Kawaii, shojo, and moe-style
            character prompts with detailed hair and outfit descriptions.
          </li>
          <li>
            <strong>Cyberpunk Anime Prompts</strong> – Futuristic neon-lit
            cityscapes and cyberpunk character prompts for Stable Diffusion.
          </li>
          <li>
            <strong>Anime Landscape Prompts</strong> – Makoto Shinkai-inspired
            scenery, cherry blossoms, and atmospheric environment prompts.
          </li>
          <li>
            <strong>Mecha Anime Prompts</strong> – Giant robot and mecha suit
            prompts inspired by Gundam and Evangelion aesthetics.
          </li>
          <li>
            <strong>Portrait Anime Prompts</strong> – Close-up character
            portraits with dramatic lighting and detailed facial expressions.
          </li>
          <li>
            <strong>Kawaii Prompts</strong> – Cute chibi and pastel-colored
            anime art prompts for a soft, adorable aesthetic.
          </li>
        </ul>

        <h2>How to Write Anime Prompts for AI Art</h2>
        <p>
          The best anime art style prompts for AI follow a proven formula:
          start with quality tags (masterpiece, best quality, ultra-detailed),
          then describe your subject (1girl, long white hair, school uniform),
          add style keywords (anime style, cel shading, studio ghibli), and
          finish with lighting (cinematic lighting, soft light, golden hour).
          Use negative prompts to exclude (worst quality, bad anatomy, blurry).
        </p>

        <h2>Frequently Asked Questions</h2>
        <dl>
          <dt>What AI generators work with anime prompts?</dt>
          <dd>
            Stable Diffusion, Midjourney (--niji flag), and DALL-E 3 all support
            anime art styles. Our prompts are tested and optimized for all three.
          </dd>
          <dt>Can I generate anime art directly from these prompts?</dt>
          <dd>
            Yes. Click any prompt card and use the "Generate" button to create
            anime art instantly using our built-in AI generator — no other tool
            needed.
          </dd>
          <dt>Are the prompts free to use commercially?</dt>
          <dd>
            All prompts are free for personal and commercial use. Copy, remix,
            and use them in any project.
          </dd>
        </dl>
      </section>

      {/* Main Content */}
      <main role="main" aria-label="Anime Art Prompt Library">
        <PromptLibraryClient />
      </main>
    </>
  );
}
