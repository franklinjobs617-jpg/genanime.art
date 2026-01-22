import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Download, ArrowRight, Sparkles, User, Heart, Shield, Camera, Info, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "+500 Fotos de Perfil Anime (PFP) para Discord e WhatsApp 2026",
  description: "Encontre a foto de perfil anime (PFP) perfeita. Milhares de opções para Discord, WhatsApp e TikTok. Use nossa IA para criar seu próprio avatar anime grátis!",
  alternates: {
    canonical: "https://genanime.art/pt/foto-de-perfil-anime"
  },
  keywords: ["foto de perfil anime", "anime pfp", "foto de perfil discord anime", "metadinhas anime", "avatar anime", "pfp anime boy", "pfp anime girl", "dark anime pfp"]
};

export default async function PfpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  if (locale !== 'pt') {
    notFound();
  }

  // Gallery Data
  const galleryItems = [
    { id: 1, color: "bg-indigo-900", tag: "Aesthetic", title: "Vaporwave Boy" },
    { id: 2, color: "bg-zinc-900", tag: "Dark", title: "Sad Goth Girl" },
    { id: 3, color: "bg-pink-900", tag: "Metadinhas", title: "Casal Parte 1" },
    { id: 4, color: "bg-blue-900", tag: "Metadinhas", title: "Casal Parte 2" },
    { id: 5, color: "bg-red-900", tag: "Shonen", title: "Fire Power" },
    { id: 6, color: "bg-emerald-900", tag: "Retro", title: "Lofi Study" },
    { id: 7, color: "bg-purple-900", tag: "Cyberpunk", title: "Neon City" },
    { id: 8, color: "bg-orange-900", tag: "Aesthetic", title: "Sunset Vibes" },
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-indigo-500/30">
      
      <main className="container mx-auto max-w-6xl px-6 pt-32 pb-12">
        {/* Hero */}
        <header className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
            +500 Fotos de Perfil <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Anime (PFP) 2026</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A melhor coleção de avatares para Discord, WhatsApp e TikTok.
          </p>
          
          {/* Style Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {["Tudo", "Aesthetic", "Dark", "Metadinhas", "Masculino", "Feminino"].map((tag, i) => (
              <button key={tag} className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${i === 0 ? "bg-indigo-600 border-indigo-500 text-white" : "bg-[#0A0A0A] border-white/10 text-zinc-400 hover:bg-white/5 hover:border-white/20"}`}>
                {tag}
              </button>
            ))}
          </div>
        </header>

        {/* Gallery Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {galleryItems.map((item) => (
            <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/10 cursor-pointer hover:border-indigo-500/50 transition-all">
              <div className={`absolute inset-0 ${item.color} opacity-20`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <User className="w-12 h-12 text-zinc-700 opacity-50" />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end duration-300">
                <span className="text-xs font-bold text-white mb-2">{item.title}</span>
                <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
                  <Download className="w-3 h-3" /> Baixar
                </button>
              </div>
              
              {/* Tag */}
              <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-bold uppercase text-white/80 border border-white/10">
                {item.tag}
              </div>
            </div>
          ))}
        </section>

        {/* Hub CTA */}
        <section className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-3xl p-10 md:p-16 text-center mb-20 relative overflow-hidden border border-indigo-500/20">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight">Quer um Avatar Exclusivo?</h2>
            <p className="text-indigo-200/80 mb-8 max-w-2xl mx-auto text-lg">
              Não use a mesma foto que todo mundo. Use nossa IA para transformar sua selfie em um PFP único.
            </p>
            <Link href="/transformar-foto-em-anime" className="inline-flex items-center px-8 py-4 bg-white text-indigo-950 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)]">
              <Camera className="w-5 h-5 mr-2" />
              Criar Meu Anime PFP Agora
            </Link>
          </div>
        </section>

        {/* Semantic Content */}
        <article className="max-w-4xl mx-auto space-y-16">
          
          {/* Expert Experience */}
          <section>
            <div className="flex items-start gap-4 p-8 bg-[#0A0A0A] rounded-3xl border border-white/5">
              <div className="p-3 bg-indigo-500/10 rounded-full text-indigo-400 shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Dica de Especialista</h3>
                <p className="text-zinc-400 leading-relaxed">
                  "Eu gerencio três servidores de anime no Discord e notei que a maioria das pessoas usa imagens de baixa resolução que ficam borradas no círculo do perfil. Para um PFP perfeito, eu sempre recomendo exportar em <strong>128x128px</strong> com foco total no rosto."
                </p>
              </div>
            </div>
          </section>

          {/* Size Guide Table */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Tamanhos Recomendados por Plataforma (2026)</h2>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left border-collapse bg-[#0A0A0A]">
                <thead>
                  <tr className="bg-white/5 text-zinc-200">
                    <th className="p-4 font-bold border-b border-white/10 text-sm">Plataforma</th>
                    <th className="p-4 font-bold border-b border-white/10 text-sm">Tamanho Recomendado</th>
                    <th className="p-4 font-bold border-b border-white/10 text-sm">Formato</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-400 text-sm">
                  <tr className="border-b border-white/5">
                    <td className="p-4 font-medium text-white">Discord</td>
                    <td className="p-4 font-mono text-indigo-400">128 x 128 px</td>
                    <td className="p-4">PNG / GIF</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 font-medium text-white">WhatsApp</td>
                    <td className="p-4 font-mono text-indigo-400">640 x 640 px</td>
                    <td className="p-4">JPG / PNG</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">TikTok</td>
                    <td className="p-4 font-mono text-indigo-400">200 x 200 px</td>
                    <td className="p-4">JPG</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-white mb-8">Perguntas Frequentes</h2>
            <div className="grid gap-4">
              <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold text-white mb-2">Posso usar essas fotos no Discord de graça?</h3>
                <p className="text-zinc-400 text-sm">Com certeza! Todas as imagens sugeridas aqui e as criadas pela nossa ferramenta de IA são gratuitas para uso pessoal.</p>
              </div>
              <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold text-white mb-2">Como criar um PFP combinando (Metadinha)?</h3>
                <p className="text-zinc-400 text-sm">Use nosso Gerador e selecione o modo "Couple" ou "Casal". Você pode enviar uma foto com seu amigo/namorado e a IA transformará ambos em anime mantendo a harmonia do estilo.</p>
              </div>
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
