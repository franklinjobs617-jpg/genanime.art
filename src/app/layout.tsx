import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import ScrollToTop from "@/components/ToTop";
import FeedbackWidget from "@/components/feedweight";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://genanime.art'),
  verification: {
    google: "pEHfl8MakrsZkiDbz3dltBl_McGyAi8BLCvQrLo_eQ4",
  },
  title: "AI Anime Generator | Free Anime AI Art & Image Generator 2026",
  description:
    "Create stunning anime art with our AI anime generator. Best anime AI art generator & image generator with RTX 8090 speed. Generate waifu, chibi & scenes for free.",
  keywords: [
    "ai video generator anime opening",
    "anime ai art generator",
    "anime ai image generator",
    "ai art generator anime",
    "ai image generator anime",
    "anime art ai generated rtx 8090",
    "ai animal generator",
    "ai anime generator",
    "ai animation generator",
    "anime ai generator",
    "anime ai art generator",
    "anime ai image generator",
  ],
  alternates: {
    canonical: "https://genanime.art/",
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://genanime.art/',
    siteName: 'AnimeAI - AI Anime Generator',
    title: 'AI Anime Generator | Free Anime AI Art & Image Generator 2026',
    description: 'Create stunning anime art with our AI anime generator. Best anime AI art generator & image generator with RTX 8090 speed. Generate waifu, chibi & scenes for free.',
    images: [
      {
        url: 'https://genanime.art/prompts/images/anime_waifu_16.webp',
        width: 1200,
        height: 630,
        alt: 'AnimeAI - AI Anime Art Generator',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Anime Generator | Free Anime AI Art & Image Generator 2026',
    description: 'Create stunning anime art with our AI anime generator. Best anime AI art generator & image generator with RTX 8090 speed.',
    images: ['https://genanime.art/prompts/images/anime_waifu_16.webp'],
    creator: '@AnimeAI',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased selection:bg-indigo-500/30">

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9LHJ5181VL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9LHJ5181VL');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uymbouho2n");
          `}
        </Script>

        {/* JSON-LD Structured Data for Rich Search Results */}
        <Script
          id="structured-data-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AnimeAI - AI Anime Generator",
              "alternateName": "Anime AI Art Generator",
              "url": "https://genanime.art",
              "description": "Create stunning anime art with our AI anime generator. Best anime AI art generator & image generator with RTX 8090 speed.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://genanime.art/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        <Script
          id="structured-data-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AnimeAI",
              "url": "https://genanime.art",
              "logo": "https://genanime.art/logo.png",
              "description": "Leading AI-powered anime art generator platform",
              "sameAs": [
                "https://twitter.com/AnimeAI",
                "https://www.facebook.com/AnimeAI"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Support",
                "email": "support@genanime.art"
              }
            })
          }}
        />

        <Script
          id="structured-data-webapp"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "AnimeAI Generator",
              "url": "https://genanime.art/generator",
              "description": "Free AI anime art generator - Create stunning anime illustrations, waifu, chibi characters with advanced AI technology",
              "applicationCategory": "DesignApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free tier with 2 generations"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "15420",
                "bestRating": "5",
                "worstRating": "1"
              },
              "featureList": [
                "AI-powered anime art generation",
                "Multiple anime styles (Vibrant, Retro 90s, Cyberpunk, Makoto Shinkai)",
                "Custom aspect ratios (1:1, 2:3, 16:9)",
                "High-resolution output (up to 8K)",
                "Free tier available",
                "Fast generation with RTX 8090 speed"
              ]
            })
          }}
        />

        <Script
          id="structured-data-breadcrumb"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
                  "name": "Generator",
                  "item": "https://genanime.art/generator"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Gallery",
                  "item": "https://genanime.art/gallery"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Prompt Library",
                  "item": "https://genanime.art/prompt-library"
                }
              ]
            })
          }}
        />

        <Providers>
          {children}
          <ScrollToTop />
          <FeedbackWidget />
        </Providers>
      </body>
    </html>
  );
}