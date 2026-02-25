import { Metadata } from "next";
import AnimeNameGeneratorClient from "./components/AnimeNameGeneratorClient";
import StorageErrorBoundary from "./components/StorageErrorBoundary";

export const metadata: Metadata = {
  title: "Anime Name Generator - Create Authentic Japanese Character Names | Free Tool",
  description: "Generate authentic anime character names with meanings and cultural context. Free anime name generator with male, female, and unisex options across traditional, modern, fantasy, and sci-fi styles. Perfect for stories, games, and creative projects.",
  keywords: [
    "anime name generator",
    "anime character name generator",
    "random anime name generator",
    "japanese name generator",
    "anime names generator",
    "manga character names",
    "japanese character names",
    "anime name creator",
    "fantasy name generator",
    "japanese names with meanings",
    "anime character creator",
    "japanese name meanings",
    "anime name ideas",
    "character name generator",
    "japanese anime names",
    "free name generator",
    "anime character names male",
    "anime character names female",
    "unisex anime names",
    "traditional japanese names",
    "modern anime names",
    "fantasy anime names",
    "sci-fi character names"
  ].join(", "),
  openGraph: {
    title: "Anime Name Generator - Create Authentic Japanese Character Names",
    description: "Generate authentic anime character names with meanings and cultural context. Free tool with male, female, and unisex options across multiple anime styles.",
    type: "website",
    url: "https://genanime.art/anime-name-generator",
    siteName: "GenAnime.art",
    images: [
      {
        url: "/anime-name-generator-og.jpg",
        width: 1200,
        height: 630,
        alt: "Anime Name Generator - Create Authentic Japanese Names with Meanings"
      }
    ],
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Anime Name Generator - Create Authentic Japanese Character Names",
    description: "Generate authentic anime character names with meanings and cultural context. Free tool with multiple styles and gender options.",
    images: ["/anime-name-generator-og.jpg"],
    creator: "@genanime_art"
  },
  alternates: {
    canonical: "https://genanime.art/anime-name-generator"
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
  classification: "Free Anime Name Generator Tool",
};

export default function AnimeNameGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Anime Name Generator",
    "alternateName": "Japanese Character Name Generator",
    "description": "Generate authentic anime character names with meanings and cultural context. Free anime name generator with male, female, and unisex options across traditional, modern, fantasy, and sci-fi styles.",
    "url": "https://genanime.art/anime-name-generator",
    "applicationCategory": "Entertainment",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "creator": {
      "@type": "Organization",
      "name": "GenAnime.art",
      "url": "https://genanime.art"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GenAnime.art",
      "url": "https://genanime.art"
    },
    "keywords": "anime name generator, japanese names, character names, manga names, anime character creator, japanese name meanings",
    "featureList": [
      "Generate authentic Japanese anime names",
      "Male, female, and unisex name options",
      "Traditional, modern, fantasy, and sci-fi styles",
      "Name meanings and cultural context",
      "Favorites and history tracking",
      "Copy and share functionality",
      "Pronunciation guide",
      "Free to use"
    ],
    "screenshot": "https://genanime.art/anime-name-generator-screenshot.jpg",
    "applicationSubCategory": "Name Generator",
    "downloadUrl": "https://genanime.art/anime-name-generator",
    "installUrl": "https://genanime.art/anime-name-generator",
    "memoryRequirements": "Minimal",
    "processorRequirements": "Any modern browser",
    "storageRequirements": "Local storage for favorites and history"
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://genanime.art"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://genanime.art/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Anime Name Generator",
        "item": "https://genanime.art/anime-name-generator"
      }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the anime name generator work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our anime name generator uses a comprehensive database of authentic Japanese names with meanings and cultural context. You can select gender preferences (male, female, unisex, or random) and style categories (traditional, modern, fantasy, or sci-fi) to generate names that fit your specific needs."
        }
      },
      {
        "@type": "Question",
        "name": "Are the generated anime names authentic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all names in our database are based on authentic Japanese naming conventions. Each name includes proper kanji characters, romanized readings, and cultural meanings to ensure authenticity and cultural respect."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use these names for commercial projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the names generated by our tool are free to use for any purpose, including commercial projects like games, stories, manga, or anime. The names are based on traditional Japanese naming patterns and are not copyrighted."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between the style categories?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional style uses classical Japanese naming patterns with virtue-based meanings. Modern style features contemporary names with nature themes. Fantasy style includes mystical elements perfect for supernatural characters. Sci-fi style offers futuristic names suitable for cyberpunk or space settings."
        }
      },
      {
        "@type": "Question",
        "name": "How many names can I generate at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can generate between 1 and 20 names at once. We recommend generating 6-10 names for the best variety and selection. The tool prevents duplicates within each generation batch."
        }
      }
    ]
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

      {/* Static SEO content - crawlable by Google, visually hidden */}
      <section className="sr-only" aria-hidden="false">
        <h1>Anime Name Generator - Free Japanese Character Names with Meanings</h1>
        <p>
          Generate authentic anime character names with kanji, romanized readings, and cultural meanings.
          Choose your character type — Hero, Warrior, Mage, Villain, Idol, or Mysterious — and get
          Japanese names that match your character concept instantly. Free to use for stories, games, manga, and creative projects.
        </p>
        <h2>Random Anime Character Generator by Type</h2>
        <ul>
          <li><strong>Hero</strong> – Modern Japanese names for brave protagonists and main characters in shonen and adventure anime.</li>
          <li><strong>Warrior</strong> – Traditional Japanese names with strength and honor meanings, ideal for samurai and fighter characters.</li>
          <li><strong>Mage</strong> – Fantasy-inspired names with mystical and elemental meanings, perfect for wizards and magic users.</li>
          <li><strong>Villain</strong> – Dark and powerful names suited for antagonists and anti-heroes in any anime genre.</li>
          <li><strong>Idol</strong> – Bright, contemporary Japanese names for performers, idols, and slice-of-life characters.</li>
          <li><strong>Mysterious</strong> – Enigmatic names with layered meanings for complex or unknown characters.</li>
        </ul>
        <h2>Generate Anime Character Art from Any Name</h2>
        <p>
          Unlike other anime name generators, every name includes a one-click button to generate
          AI character art. Turn your character name into a full visual character using our
          AI anime art generator — no other tool offers this.
        </p>
        <h2>Frequently Asked Questions</h2>
        <dl>
          <dt>Are the generated anime names authentic?</dt>
          <dd>Yes. All names use real Japanese kanji with proper romanized readings and cultural meanings.</dd>
          <dt>What is a random anime character generator?</dt>
          <dd>A tool that instantly creates unique Japanese character names. Our generator goes further by letting you generate character art from any name with one click.</dd>
          <dt>Can I use these names commercially?</dt>
          <dd>Yes. All generated names are free to use for any purpose including games, stories, manga, and anime.</dd>
          <dt>How many names can I generate at once?</dt>
          <dd>Up to 20 names per batch. The default is 6 for the best variety and selection.</dd>
        </dl>
      </section>

      {/* Main Content */}
      <main role="main" aria-label="Anime Name Generator">
        <StorageErrorBoundary>
          <AnimeNameGeneratorClient />
        </StorageErrorBoundary>
      </main>
    </>
  );
}