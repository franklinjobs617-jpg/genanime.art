import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Upload, ArrowRight, Zap, Image as ImageIcon, Star, Sparkles, Smartphone, Ghost, Cpu } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transformar Foto em Anime Online Grátis - IA 2026 - GenAnime",
  description: "Transforme foto em anime instantaneamente com nossa IA avançada. Use o gerador estilo Studio Ghibli e Shonen. Grátis, sem registro e 100% online em 2026.",
  alternates: {
    canonical: "https://genanime.art/pt/transformar-foto-em-anime"
  }
};

export default async function HubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  if (locale !== 'pt') {
    notFound();
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-indigo-500/30">
      
      <main className="container mx-auto max-w-6xl px-6 pt-32 pb-20">
        {/* Header */}
        <header className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold mb-8 backdrop-blur-sm">
            <Sparkles className="w-3 h-3" />
            <span>IA ANIME 2026</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
            Transformar Foto em <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300">Anime com IA</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Converta suas fotos em personagens de anime em segundos. Estilo real, Ghibli e Shonen de forma gratuita.
          </p>
        </header>

        {/* Tool Box */}
        <section className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-16 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] max-w-4xl mx-auto mb-24 relative overflow-hidden group">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
          
          <div className="flex flex-col items-center gap-8 relative z-10">
            <Link href="/generator" className="w-full md:w-auto min-w-[300px] group/btn">
              <button className="w-full py-4 px-8 bg-white text-black hover:bg-zinc-200 rounded-full font-bold text-lg transition-all transform group-hover/btn:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3">
                <Upload className="w-5 h-5" />
                <span>Enviar Foto Agora</span>
              </button>
              <p className="text-center text-xs text-zinc-500 mt-3 font-medium">(Grátis e Sem Registro)</p>
            </Link>

            {/* Preview Slider Placeholder */}
            <div className="w-full aspect-video bg-zinc-900 rounded-2xl border border-white/10 relative overflow-hidden group cursor-ew-resize shadow-inner">
               <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <span className="text-sm font-medium">Preview Slider: Original vs Anime</span>
                  </div>
               </div>
               {/* Mock Slider Handle */}
               <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/50 flex items-center justify-center">
                  <div className="w-8 h-8 bg-black/50 backdrop-blur rounded-full border border-white/20 flex items-center justify-center shadow-lg">
                    <div className="w-1 h-4 bg-white/50 rounded-full" />
                  </div>
               </div>
            </div>

            <p className="text-center text-xs text-zinc-600">
              Tecnologia IA baseada em RVC v3 e GPT-SoVITS para máxima precisão.
            </p>
          </div>
        </section>

        {/* Article Content */}
        <article className="max-w-5xl mx-auto space-y-24">
          
          {/* Guide Section */}
          <section id="guia" className="space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Como a IA transforma sua foto em anime?</h2>
              <p className="text-zinc-400 text-lg">
                Nossa tecnologia preserva suas características faciais enquanto aplica a estética japonesa.
              </p>
            </div>
            
            {/* Bento Grid Features */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
                    <Ghost className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Studio Ghibli</h3>
                  <p className="text-zinc-500 text-sm mb-4">Ideal para paisagens e fotos nostálgicas.</p>
                  <div className="text-xs font-mono text-green-400 bg-green-400/5 px-2 py-1 rounded inline-block">98% Precisão</div>
                </div>

                <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6">
                    <Smartphone className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Shonen Clássico</h3>
                  <p className="text-zinc-500 text-sm mb-4">Perfeito para perfis de gamer e ação.</p>
                  <div className="text-xs font-mono text-pink-400 bg-pink-400/5 px-2 py-1 rounded inline-block">95% Precisão</div>
                </div>

                <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                    <Cpu className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Cyberpunk</h3>
                  <p className="text-zinc-500 text-sm mb-4">Estilo futurista com neon e glitch.</p>
                  <div className="text-xs font-mono text-cyan-400 bg-cyan-400/5 px-2 py-1 rounded inline-block">92% Precisão</div>
                </div>
            </div>

            {/* Freshness Update */}
            <div className="bg-emerald-900/10 border border-emerald-500/10 p-6 rounded-2xl flex gap-4 items-start backdrop-blur-sm">
              <Zap className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-emerald-400 block mb-1 text-lg">Última Atualização</strong>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Adicionamos o filtro 'Vibe Verão 2026', otimizado para fotos com fundo de praia e céu azul intenso, perfeito para quem quer atualizar o perfil do Instagram agora mesmo.
                </p>
              </div>
            </div>
          </section>

          {/* Spokes Grid */}
          <section className="grid md:grid-cols-3 gap-6">
            <Link href="/foto-de-perfil-anime" className="group bg-[#0A0A0A] p-8 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all hover:-translate-y-1">
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Foto de Perfil</h3>
              <p className="text-sm text-zinc-500 mb-6 leading-relaxed">Crie o PFP perfeito para Discord e WhatsApp.</p>
              <div className="inline-flex items-center text-indigo-400 font-bold text-xs uppercase tracking-wider group-hover:gap-2 transition-all">
                Ver estilos <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
            <Link href="/filtro-ia-ghibli" className="group bg-[#0A0A0A] p-8 rounded-3xl border border-white/5 hover:border-green-500/30 transition-all hover:-translate-y-1">
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-green-400 transition-colors">Filtro Ghibli</h3>
              <p className="text-sm text-zinc-500 mb-6 leading-relaxed">Transforme paisagens com a magia do Studio Ghibli.</p>
              <div className="inline-flex items-center text-green-400 font-bold text-xs uppercase tracking-wider group-hover:gap-2 transition-all">
                Testar filtro <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
            <Link href="/como-fazer-anime-ia" className="group bg-[#0A0A0A] p-8 rounded-3xl border border-white/5 hover:border-pink-500/30 transition-all hover:-translate-y-1">
              <h3 className="mb-3 text-xl font-bold text-white group-hover:text-pink-400 transition-colors">Guia Completo</h3>
              <p className="text-sm text-zinc-500 mb-6 leading-relaxed">Aprenda a criar animes perfeitos passo a passo.</p>
              <div className="inline-flex items-center text-pink-400 font-bold text-xs uppercase tracking-wider group-hover:gap-2 transition-all">
                Ler guia <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center tracking-tight">Perguntas Frequentes</h2>
            <div className="grid gap-4">
              <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold text-white mb-2">É realmente grátis?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Sim, você pode gerar imagens gratuitamente todos os dias sem precisar cadastrar cartão de crédito.</p>
              </div>
              <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold text-white mb-2">Funciona no celular?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">Perfeitamente. Nossa ferramenta é otimizada para navegadores móveis (Chrome, Safari) em Android e iOS.</p>
              </div>
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
