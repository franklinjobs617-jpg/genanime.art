import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Anime AI Art Gallery: Prompts, Styles & Remixes | Community Showcase",
  description: "Explore thousands of AI-generated anime artworks with prompts. Copy prompts, view settings, and remix high-quality images directly in our Anime AI Generator.",
  alternates: {
    canonical: 'https://genanime.art/gallery',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://genanime.art/gallery',
    siteName: 'AnimeAI - AI Anime Generator',
    title: "Anime AI Art Gallery: Prompts, Styles & Remixes | Community Showcase",
    description: "Explore thousands of AI-generated anime artworks with prompts. Copy prompts, view settings, and remix high-quality images directly in our Anime AI Generator.",
    images: [
      {
        url: 'https://genanime.art/images/prompts/anime_waifu_16.webp',
        width: 1200,
        height: 630,
        alt: 'Anime AI Art Gallery',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anime AI Art Gallery: Prompts, Styles & Remixes | Community Showcase",
    description: "Explore thousands of AI-generated anime artworks with prompts. Copy prompts, view settings, and remix high-quality images directly in our Anime AI Generator.",
    images: ['https://genanime.art/images/prompts/anime_waifu_16.webp'],
    creator: '@AnimeAI',
  },
};