import { Metadata } from "next";
import AnimeNameGeneratorClient from "./components/AnimeNameGeneratorClient";
import StorageErrorBoundary from "./components/StorageErrorBoundary";

const FAQ_JSON_LD_ITEMS = [
  {
    q: "What is an anime name generator?",
    a: "An anime name generator creates character-style names based on anime-inspired naming patterns. On this page, each output includes kanji, romaji, and meaning so you can use names directly in writing, games, and character design.",
  },
  {
    q: "How is this different from a random anime name generator?",
    a: "A basic random generator gives unfiltered name output. This page adds intent-based modes, style filters, meaning focus, and from-my-name logic so results match your task with fewer retries.",
  },
  {
    q: "Can I generate male and female anime names separately?",
    a: "Yes. Choose Male or Female mode in Step 1 to force output direction. If you want broader exploration, use Random or Character mode.",
  },
  {
    q: "Can I generate anime names from my real name?",
    a: "Yes. Select From My Name mode and enter your input name. The generator prioritizes outputs with closer phonetic patterns while preserving anime-style readability.",
  },
  {
    q: "Can I get anime names with meaning and kanji?",
    a: "Yes. Every result card includes kanji, romaji, and meaning. You can also set a meaning focus like nature, power, mystery, light, or nobility for more controlled outputs.",
  },
  {
    q: "Can I generate only last names / surnames?",
    a: "Yes. Switch to Last Name mode to prioritize surname-style output. This is useful for family systems, clan naming, and worldbuilding tasks.",
  },
  {
    q: "Can I use generated names for commercial projects?",
    a: "Yes, the tool is free and generated names can be used in creator and commercial workflows. Before release, always run your own legal and brand checks for final compliance.",
  },
  {
    q: "What should I do if I need anime attack/ability names?",
    a: "Use Fantasy style plus meaning focus as a temporary workaround for dramatic naming tone. For dedicated attack/ability naming, route users to your planned attack-name spoke page.",
  },
];

export const metadata: Metadata = {
  title: "Anime Name Generator - Free Anime Character Names",
  description:
    "Free anime name generator for random, character, male, female, from-my-name, and last-name modes. Generate anime names with kanji, romaji, and meaning.",
  keywords: [
    "anime name generator",
    "anime character name generator",
    "random anime name generator",
    "female anime name generator",
    "male anime name generator",
    "anime name generator with meaning",
    "anime last name generator",
    "anime name generator from my name",
  ].join(", "),
  openGraph: {
    title: "Anime Name Generator - Free Anime Character Names",
    description:
      "Generate anime names by mode and style. Includes random, male/female, from-my-name, and last-name output.",
    type: "website",
    url: "https://genanime.art/anime-name-generator/",
    siteName: "GenAnime.art",
    images: [
      {
        url: "/anime-name-generator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Anime Name Generator",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anime Name Generator - Free Tool",
    description:
      "Generate anime names with random/male/female/from-my-name/last-name modes and meaning output.",
    images: ["/anime-name-generator-og.jpg"],
    creator: "@genanime_art",
  },
  alternates: {
    canonical: "https://genanime.art/anime-name-generator/",
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
};

export default function AnimeNameGeneratorPage() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Anime Name Generator",
    description:
      "Free anime name generator with random, character, male, female, from-my-name, and last-name modes.",
    url: "https://genanime.art/anime-name-generator/",
    applicationCategory: "Entertainment",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_JSON_LD_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://genanime.art/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Anime Name Generator",
        item: "https://genanime.art/anime-name-generator/",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="sr-only" aria-hidden="false">
        <h1>Anime Name Generator</h1>
        <p>
          Generate anime character names instantly — random, male/female, with
          meaning, or from your name.
        </p>
        <h2>What is an Anime Name Generator?</h2>
        <p>
          It helps creators generate usable anime names with kanji, romaji, and
          meaning in one workflow.
        </p>
        <h2>Random / Male / Female Anime Name Generator</h2>
        <p>
          Use Random for broad ideation, Male/Female for direct targeting, and
          Character mode for general naming tasks.
        </p>
        <h2>Anime Name Generator From My Name</h2>
        <p>
          Enter your base name and generate anime-style outputs with phonetic
          similarity.
        </p>
        <h2>Anime Names With Meaning</h2>
        <p>
          Add meaning focus to guide output by narrative tone and story intent.
        </p>
        <h2>Use Cases</h2>
        <p>
          Ideal for OC naming, protagonist drafts, game NPC pools, and story
          worldbuilding.
        </p>
        <h2>FAQ</h2>
        <ul>
          {FAQ_JSON_LD_ITEMS.map((item) => (
            <li key={item.q}>
              <strong>{item.q}</strong> {item.a}
            </li>
          ))}
        </ul>
      </section>

      <main role="main" aria-label="Anime Name Generator">
        <StorageErrorBoundary>
          <AnimeNameGeneratorClient />
        </StorageErrorBoundary>
      </main>
    </>
  );
}
