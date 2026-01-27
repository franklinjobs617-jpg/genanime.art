import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Ad Background Anime Generator - Create Stunning Anime Ads | AnimeAI',
  description: 'Generate professional anime backgrounds for ads with AI. Create eye-catching anime-style advertising backgrounds in seconds. Free to try, commercial license included!',
  keywords: [
    'ai ad background anime',
    'anime advertising backgrounds',
    'ai anime ad generator',
    'anime marketing backgrounds',
    'anime ad design tool',
    'commercial anime backgrounds',
    'ai generated anime ads',
    'anime style advertising'
  ],
  openGraph: {
    title: 'AI Ad Background Anime Generator - Professional Advertising Backgrounds',
    description: 'Transform your advertising with AI-generated anime backgrounds. Professional quality, commercial licensing, created in seconds.',
    type: 'website',
    url: 'https://animeai.art/ai-ad-background-anime',
    images: [
      {
        url: '/gallery/cyberpunk-street.webp',
        width: 1200,
        height: 630,
        alt: 'AI Generated Anime Advertising Background Examples'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Ad Background Anime Generator | AnimeAI',
    description: 'Create stunning anime advertising backgrounds with AI. Professional quality, commercial license included.',
    images: ['/gallery/cyberpunk-street.webp']
  },
  alternates: {
    canonical: 'https://animeai.art/ai-ad-background-anime'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};