import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create Anime Art - Professional AI Image Generator & Tool",
  description: "Turn your imagination into reality. Support for Pony Diffusion, Niji Style, and Scenery generation. Fast, uncensored creativity, and high-resolution downloads.",
  alternates: {
    canonical: 'https://genanime.art/generator',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://genanime.art/generator',
    siteName: 'AnimeAI - AI Anime Generator',
    title: "Create Anime Art - Professional AI Image Generator & Tool",
    description: "Turn your imagination into reality. Support for Pony Diffusion, Niji Style, and Scenery generation. Fast, uncensored creativity, and high-resolution downloads.",
    images: [
      {
        url: 'https://genanime.art/images/prompts/anime_waifu_16.webp',
        width: 1200,
        height: 630,
        alt: 'Create Anime Art - Professional AI Image Generator',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Create Anime Art - Professional AI Image Generator & Tool",
    description: "Turn your imagination into reality. Support for Pony Diffusion, Niji Style, and Scenery generation. Fast, uncensored creativity, and high-resolution downloads.",
    images: ['https://genanime.art/images/prompts/anime_waifu_16.webp'],
    creator: '@AnimeAI',
  },
};