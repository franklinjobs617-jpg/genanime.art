import "../globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import ScrollToTop from "@/components/ToTop";
import FeedbackWidget from "@/components/feedweight";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


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

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://genanime.art'),
    verification: {
      google: "pEHfl8MakrsZkiDbz3dltBl_McGyAi8BLCvQrLo_eQ4",
    },
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords'),
    alternates: {
      canonical: `/${locale === 'en' ? '' : locale}`,
      languages: {
        'en': '/',
        'id': '/id',
        'de': '/de'
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'id' ? 'id_ID' : locale === 'de' ? 'de_DE' : 'ru_RU',
      url: 'https://genanime.art/',
      siteName: 'AnimeAI - AI Anime Generator',
      title: t('title'),
      description: t('description'),
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
      title: t('title'),
      description: t('description'),
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
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;
  const messages = await getMessages();
  const st = await getTranslations({ locale, namespace: 'Schema' });

  return (
    <html lang={locale} className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-sans bg-[#050505] text-white antialiased selection:bg-indigo-500/30">
        <NextIntlClientProvider messages={messages}>
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
                "name": st('websiteName'),
                "alternateName": st('alternateName'),
                "url": "https://genanime.art",
                "description": st('description'),
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
                "name": st('websiteName'),
                "url": "https://genanime.art",
                "logo": "https://genanime.art/logo.png",
                "description": st('orgDescription'),
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
                "name": st('webAppName'),
                "url": "https://genanime.art/generator",
                "description": st('webAppDescription'),
                "applicationCategory": "DesignApplication",
                "operatingSystem": "Any",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "description": "Free tier available"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "ratingCount": "15420",
                  "bestRating": "5",
                  "worstRating": "1"
                }
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
                    "name": st('breadcrumbHome'),
                    "item": "https://genanime.art"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": st('breadcrumbGenerator'),
                    "item": "https://genanime.art/generator"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": st('breadcrumbGallery'),
                    "item": "https://genanime.art/gallery"
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": st('breadcrumbLibrary'),
                    "item": "https://genanime.art/prompt-library"
                  }
                ]
              })
            }}
          />

          <Providers>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
            <FeedbackWidget />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}