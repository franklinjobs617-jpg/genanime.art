import { Metadata } from "next";
import RandomAnimeCharacterClient from "./components/RandomAnimeCharacterClient";

export const metadata: Metadata = {
  title: "Random Anime Character Generator - Free Character Creator | GenAnime.art",
  description:
    "Generate random anime characters instantly. Get unique names, archetypes, abilities, and backstories — then create their portrait with AI. Free random anime character generator.",
  keywords: [
    "random anime character generator",
    "random anime generator",
    "anime character creator",
    "anime character generator",
    "random anime character",
    "anime oc generator",
    "anime character maker",
    "random anime character creator",
    "anime character randomizer",
    "anime name and character generator",
  ].join(", "),
  openGraph: {
    title: "Random Anime Character Generator - Free Character Creator",
    description:
      "Generate random anime characters with names, abilities, and backstories. Create their AI portrait with one click.",
    type: "website",
    url: "https://genanime.art/random-anime-character-generator",
    siteName: "GenAnime.art",
    images: [
      {
        url: "/random-anime-character-og.jpg",
        width: 1200,
        height: 630,
        alt: "Random Anime Character Generator - GenAnime.art",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Random Anime Character Generator - Free Character Creator",
    description:
      "Generate random anime characters with names, abilities, and backstories. Create AI portraits instantly.",
    images: ["/random-anime-character-og.jpg"],
    creator: "@genanime_art",
  },
  alternates: {
    canonical: "https://genanime.art/random-anime-character-generator",
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

export default function RandomAnimeCharacterGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Random Anime Character Generator",
    description:
      "Generate random anime characters with authentic Japanese names, archetypes, special abilities, and backstories. Create AI character portraits with one click.",
    url: "https://genanime.art/random-anime-character-generator",
    applicationCategory: "Entertainment",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    creator: {
      "@type": "Organization",
      name: "GenAnime.art",
      url: "https://genanime.art",
    },
    featureList: [
      "8 unique character archetypes",
      "Authentic Japanese names with meanings",
      "Random hair and eye color combinations",
      "Unique special abilities per archetype",
      "Character backstory generation",
      "One-click AI portrait generation",
      "Generate 1 to 6 characters at once",
      "Free to use",
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://genanime.art" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://genanime.art/tools" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Random Anime Character Generator",
        item: "https://genanime.art/random-anime-character-generator",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a random anime character generator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A random anime character generator creates unique anime characters instantly, including their name, archetype (Hero, Villain, Mage, etc.), appearance traits, special ability, and backstory. Our generator also lets you create an AI portrait of your character with one click.",
        },
      },
      {
        "@type": "Question",
        name: "What character types can I generate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can generate 8 archetypes: Hero, Warrior, Mage, Villain, Idol, Ninja, Healer, and Mysterious. Each archetype has unique outfits, abilities, and backstory templates.",
        },
      },
      {
        "@type": "Question",
        name: "Can I generate art of my random anime character?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every generated character has a 'Generate Character Art' button that sends the character's appearance details to our AI image generator, creating a portrait in seconds.",
        },
      },
      {
        "@type": "Question",
        name: "How many characters can I generate at once?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can generate 1, 2, 3, 4, or 6 characters at once. Each generation produces completely unique characters.",
        },
      },
    ],
  };

  return (
    <>
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

      {/* Static SEO content */}
      <section className="sr-only" aria-hidden="false">
        <h1>Random Anime Character Generator — Free Anime OC Creator</h1>
        <p>
          Generate random anime characters instantly with our free tool. Each character includes
          an authentic Japanese name with meaning, a unique archetype, appearance traits, a special
          ability, and a backstory. Unlike other generators, you can also create an AI portrait of
          your character with one click.
        </p>

        <h2>8 Anime Character Archetypes</h2>
        <ul>
          <li><strong>Hero</strong> – Determined protagonists with limitless potential, inspired by shonen anime leads.</li>
          <li><strong>Warrior</strong> – Stoic fighters with blade-based abilities and samurai aesthetics.</li>
          <li><strong>Mage</strong> – Intellectual magic users with elemental and reality-bending powers.</li>
          <li><strong>Villain</strong> – Charismatic antagonists with dark abilities and compelling motivations.</li>
          <li><strong>Idol</strong> – Energetic performers whose voice and presence are their greatest power.</li>
          <li><strong>Ninja</strong> – Silent assassins with shadow manipulation and stealth abilities.</li>
          <li><strong>Healer</strong> – Empathetic support characters with life-restoring powers.</li>
          <li><strong>Mysterious</strong> – Enigmatic figures with unknown origins and reality-altering abilities.</li>
        </ul>

        <h2>What Each Random Anime Character Includes</h2>
        <ul>
          <li>Authentic Japanese name with kanji, romanized reading, and meaning</li>
          <li>Character archetype with matching emoji and color theme</li>
          <li>Random hair color and eye color combination</li>
          <li>Archetype-appropriate outfit description</li>
          <li>Three personality traits</li>
          <li>Unique special ability with description</li>
          <li>Original backstory paragraph</li>
          <li>Ready-to-use AI art prompt for portrait generation</li>
        </ul>

        <h2>How to Use the Random Anime Character Generator</h2>
        <p>
          Select how many characters you want (1 to 6), then click Generate. Each character card
          shows the full profile. Click "Generate Character Art" to create an AI portrait, or
          "Copy Art Prompt" to use the prompt in your preferred AI image generator.
        </p>

        <h2>Frequently Asked Questions</h2>
        <dl>
          <dt>Is this random anime character generator free?</dt>
          <dd>Yes, generating characters is completely free. AI portrait generation uses credits.</dd>
          <dt>Can I use generated characters for my manga or story?</dt>
          <dd>Yes. All generated characters are free to use for any creative project.</dd>
          <dt>What makes this different from other anime character generators?</dt>
          <dd>
            Every character connects directly to our AI image generator, so you can see your
            character visually in seconds — no other tool offers this.
          </dd>
        </dl>
      </section>

      <main role="main" aria-label="Random Anime Character Generator">
        <RandomAnimeCharacterClient />
      </main>
    </>
  );
}
