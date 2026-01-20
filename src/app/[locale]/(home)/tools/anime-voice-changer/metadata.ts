import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free AI Anime Voice Changer & Generator - Real-time RVC | GenAnime",
  description: "Transform your voice into anime characters with our free AI voice changer. Real-time RVC technology, text-to-speech generation, Discord compatible. No sign-up required.",
  keywords: [
    "anime voice changer",
    "AI voice generator", 
    "real-time voice conversion",
    "RVC voice changer",
    "anime text to speech",
    "Discord voice changer",
    "free voice changer",
    "anime character voices",
    "waifu voice generator",
    "voice transformation tool"
  ],
  alternates: {
    canonical: 'https://genanime.art/tools/anime-voice-changer',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://genanime.art/tools/anime-voice-changer',
    siteName: 'GenAnime - AI Anime Tools',
    title: "Free AI Anime Voice Changer & Generator - Real-time RVC",
    description: "Transform your voice into anime characters with our free AI voice changer. Real-time RVC technology, text-to-speech generation, Discord compatible. No sign-up required.",
    images: [
      {
        url: 'https://genanime.art/feature-voice-changer.webp',
        width: 1200,
        height: 630,
        alt: 'Free AI Anime Voice Changer & Generator',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free AI Anime Voice Changer & Generator - Real-time RVC",
    description: "Transform your voice into anime characters with our free AI voice changer. Real-time RVC technology, text-to-speech generation, Discord compatible. No sign-up required.",
    images: ['https://genanime.art/feature-voice-changer.webp'],
    creator: '@GenAnime',
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
  other: {
    'application-name': 'GenAnime Voice Changer',
    'apple-mobile-web-app-title': 'Anime Voice Changer',
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#6366f1',
  }
};