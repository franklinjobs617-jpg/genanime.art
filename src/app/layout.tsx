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
  verification: {
    google: "pEHfl8MakrsZkiDbz3dltBl_McGyAi8BLCvQrLo_eQ4",
  },
  title: "AI Anime Generator | Anime AI Art & Image Generator 2026 ",
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

        <Providers>
          {children}
          <ScrollToTop />
          <FeedbackWidget />
        </Providers>
      </body>
    </html>
  );
}