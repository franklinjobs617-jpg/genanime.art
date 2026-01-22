import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Download, Copy, Zap, Search, Filter, Image as ImageIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "+1000 Imagens de Anime IA Grátis para Download (2026)",
  description: "Baixe gratuitamente mais de 1000 imagens de anime geradas por IA. Alta resolução (4K), diversos estilos (Cyberpunk, Ghibli, Shonen) e prompts incluídos.",
  alternates: {
    canonical: "https://genanime.art/pt/imagens-de-anime-ia"
  },
  keywords: ["imagens de anime grátis", "anime ai art download", "wallpaper anime 4k", "fundo de tela anime", "anime generated images"]
};

// Simulated Gallery Data
const galleryImages = [
  { id: 1, src: "/gallery/feature-waifu.webp", prompt: "cyberpunk girl, neon lights, rain, high detail", style: "Cyberpunk" },
  { id: 2, src: "/gallery/anime_zen_solitude.webp", prompt: "zen garden, anime style, peaceful, cherry blossom", style: "Scenery" },
  { id: 3, src: "/gallery/style_makoto_scenery.webp", prompt: "makoto shinkai style, clouds, blue sky, train station", style: "Ghibli" },
  { id: 4, src: "/artStyles/style_retro_cel_90s.webp", prompt: "90s anime, retro aesthetic, vhs glitch, city pop", style: "Retro" },
  { id: 5, src: "/artStyles/style_game_splash_elite.webp", prompt: "game splash art, warrior, magic effects, dynamic pose", style: "Game Art" },
  { id: 6, src: "/gallery/anime_cyber_noir.webp", prompt: "noir detective, rain, cybernetic arm, mysterious", style: "Noir" },
  { id: 7, src: "/gallery/Realism.webp", prompt: "realistic anime portrait, 8k, detailed eyes, soft lighting", style: "Realism" },
  { id: 8, src: "/gallery/Avatar.webp", prompt: "anime avatar, cute girl, pastel colors, headphones", style: "Avatar" },
];

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  if (locale !== 'pt') {
    notFound();
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-pink-500/30">
      
      <main className="container mx-auto max-w-7xl px-6 pt-32 pb-12">
        
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            +1000 Imagens de <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Anime IA Grátis</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Galeria com curadoria de artes geradas por nossa Inteligência Artificial. 
            Livre para uso comercial e pessoal. Copie o prompt e crie a sua!
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-10 relative">
             <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-zinc-500" />
             </div>
             <input 
               type="text" 
               placeholder="Buscar por estilo (ex: cyberpunk, ghibli)..." 
               className="w-full bg-[#0A0A0A] border border-white/10 rounded-full py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all"
             />
             <div className="absolute inset-y-0 right-2 flex items-center">
                <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                   <Filter className="w-4 h-4 text-zinc-400" />
                </button>
             </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
             {["Tudo", "4K Wallpaper", "Cyberpunk", "Waifu", "Scenery", "Dark"].map((tag, i) => (
               <button 
                 key={tag} 
                 className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${i === 0 ? "bg-pink-600 border-pink-500 text-white" : "bg-[#0A0A0A] border-white/10 text-zinc-400 hover:bg-white/5 hover:border-white/20"}`}
               >
                 {tag}
               </button>
             ))}
          </div>
        </header>

        {/* Gallery Grid */}
        <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4 mb-20">
           {galleryImages.map((img) => (
             <div key={img.id} className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/10 hover:border-pink-500/30 transition-all">
                <img 
                  src={img.src} 
                  alt={img.prompt} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                   <div className="mb-3">
                      <span className="inline-block px-2 py-0.5 bg-pink-500/20 text-pink-300 text-[10px] font-bold rounded mb-2 border border-pink-500/20">
                        {img.style}
                      </span>
                      <p className="text-xs text-zinc-300 line-clamp-2 italic opacity-80">"{img.prompt}"</p>
                   </div>
                   
                   <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-white text-black rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
                         <Download className="w-3 h-3" /> Baixar 4K
                      </button>
                      <button className="px-3 py-2 bg-white/10 backdrop-blur text-white rounded-lg hover:bg-white/20 transition-colors" title="Copiar Prompt">
                         <Copy className="w-3 h-3" />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* SEO Content */}
        <article className="max-w-4xl mx-auto bg-[#0A0A0A] rounded-3xl p-8 md:p-12 border border-white/5">
           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
             <ImageIcon className="w-6 h-6 text-pink-500" />
             Sobre Nossa Galeria de Arte IA
           </h2>
           <div className="prose prose-invert prose-sm max-w-none text-zinc-400">
             <p>
               Bem-vindo à maior biblioteca de imagens de anime geradas por Inteligência Artificial do Brasil. 
               Aqui no GenAnime ART, acreditamos que a arte deve ser acessível a todos. Por isso, disponibilizamos 
               milhares de gerações criadas com nossos modelos exclusivos (baseados em Stable Diffusion XL e Niji V6).
             </p>
             <p>
               Você pode usar estas imagens como:
             </p>
             <ul className="grid md:grid-cols-2 gap-2 mt-4 mb-6">
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full" /> Wallpapers para PC e Celular (4K)</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full" /> Referência para desenhos</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full" /> Capas de vídeos (Thumbnails)</li>
               <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full" /> Assets para jogos indie</li>
             </ul>
             <p className="text-xs text-zinc-600 border-t border-white/5 pt-4 mt-4">
               * Todas as imagens são de domínio público (CC0) ou livre uso, já que foram geradas por IA. Divirta-se!
             </p>
           </div>
        </article>

      </main>
    </div>
  );
}
