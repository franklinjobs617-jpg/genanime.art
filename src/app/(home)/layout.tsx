import { Plus_Jakarta_Sans } from 'next/font/google'; // Pollo.ai style font
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata = {
  title: 'AI Anime Generator | Anime AI Art & Image Generator 2026',
  description: 'Create stunning anime art with our AI anime generator. Best anime AI art generator & image generator 2026. Generate waifu, chibi & scenes for free.',
  keywords: [
    'ai video generator anime opening',
    'anime ai art generator',
    'anime ai image generator',
    'ai art generator anime',
    'ai image generator anime',
    'anime art ai generated rtx 8090',
    'ai animal generator',
    'ai anime generator',
    'ai animation generator',
    'anime ai generator',
    'anime ai art generator',
    'anime ai image generator'
  ],
  alternates: {
    canonical: 'https://genanime.art/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans bg-[#050505] text-white antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}