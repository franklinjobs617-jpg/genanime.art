import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { ArrowRight, CheckCircle2, AlertCircle, Camera, Upload, Zap, Download } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Como Transformar Foto em Anime Online Grátis: Guia 2026",
  description: "Aprenda como transformar foto em anime online e grátis com este guia passo a passo. Descubra as melhores técnicas de IA para criar avatares incríveis em segundos.",
  alternates: {
    canonical: "https://genanime.art/pt/como-fazer-anime-ia"
  }
};

export default async function TutorialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  if (locale !== 'pt') {
    notFound();
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-indigo-500/30">
      
      <main className="container mx-auto max-w-3xl px-6 pt-32 pb-12">
        
        {/* Header */}
        <header className="mb-12 border-b border-white/10 pb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
            Como Transformar Foto em <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Anime Online Grátis</span>
          </h1>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span>Por: Equipe GenAnime</span>
            <span>•</span>
            <span>Atualizado: Janeiro 2026</span>
          </div>
        </header>

        {/* Intro Box */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 mb-12 shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            O que você vai aprender:
          </h3>
          <ul className="grid gap-3 text-zinc-400 text-sm">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Escolher a foto ideal para IA</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Tutorial passo a passo (Celular e PC)</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Truques para melhorar a qualidade</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Dicas de privacidade e segurança</li>
          </ul>
        </div>

        {/* Steps */}
        <section className="space-y-12 mb-16 relative">
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/5 md:hidden"></div>
          
          {/* Step 1 */}
          <div className="relative pl-12 md:pl-0">
            <div className="absolute left-0 top-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-sm md:hidden">1</div>
            <div className="md:flex gap-8 items-start">
               <div className="hidden md:flex w-12 h-12 bg-indigo-600 rounded-2xl items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-indigo-500/20">1</div>
               <div>
                 <h3 className="text-2xl font-bold text-white mb-4">Prepare e envie sua foto</h3>
                 <p className="text-zinc-400 leading-relaxed mb-6">
                   Acesse nossa ferramenta e clique em "Upload". <strong className="text-indigo-300">Dica de Ouro:</strong> Fotos com iluminação clara (luz natural) geram resultados 40% melhores. Evite sombras fortes no rosto.
                 </p>
                 <div className="aspect-video bg-[#0A0A0A] rounded-xl border border-white/10 flex items-center justify-center text-zinc-600">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 opacity-50" />
                     <img src="/interface-upload-transformar-foto-em-desenho.webp" alt="" />
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pl-12 md:pl-0">
            <div className="absolute left-0 top-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-sm md:hidden">2</div>
            <div className="md:flex gap-8 items-start">
               <div className="hidden md:flex w-12 h-12 bg-indigo-600 rounded-2xl items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-indigo-500/20">2</div>
               <div>
                 <h3 className="text-2xl font-bold text-white mb-4">Escolha seu estilo favorito</h3>
                 <p className="text-zinc-400 leading-relaxed mb-6">
                   Selecione entre <span className="text-white font-semibold">Ghibli</span> (para paisagens), <span className="text-white font-semibold">Shonen</span> (para ação) ou <span className="text-white font-semibold">Avatar</span> (para redes sociais). Cada modelo foi treinado especificamente para diferentes tipos de composição.
                 </p>
               </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative pl-12 md:pl-0">
            <div className="absolute left-0 top-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-sm md:hidden">3</div>
            <div className="md:flex gap-8 items-start">
               <div className="hidden md:flex w-12 h-12 bg-indigo-600 rounded-2xl items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-indigo-500/20">3</div>
               <div>
                 <h3 className="text-2xl font-bold text-white mb-4">Aguarde a mágica e baixe</h3>
                 <p className="text-zinc-400 leading-relaxed mb-6">
                   Em cerca de 5 a 10 segundos, nossa IA processará sua imagem. Você poderá baixar em alta resolução (HD) sem marca d'água.
                 </p>
                 <div className="bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-xl flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-400 block mb-1 text-sm">Privacidade Garantida</strong>
                      <p className="text-emerald-100/60 text-xs">
                        Suas fotos são processadas em tempo real e deletadas automaticamente após o download. Seguimos a LGPD.
                      </p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mb-20">
          <Link 
            href="/generator" 
            className="inline-flex items-center px-10 py-5 bg-white text-indigo-950 rounded-full font-bold text-lg hover:bg-zinc-100 transition-all transform hover:scale-105 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
          >
            <Camera className="w-5 h-5 mr-2" />
            Começar Transformação Agora
          </Link>
          <p className="mt-4 text-xs text-zinc-500">Não precisa de cartão de crédito • Grátis</p>
        </section>

        {/* Comparison Table */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-center">Comparativo de Estilos: Qual escolher?</h2>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left border-collapse bg-[#0A0A0A]">
              <thead>
                <tr className="bg-white/5 text-zinc-200">
                  <th className="p-4 font-bold border-b border-white/10 text-sm">Estilo</th>
                  <th className="p-4 font-bold border-b border-white/10 text-sm">Melhor para...</th>
                  <th className="p-4 font-bold border-b border-white/10 text-sm">Vibe Visual</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400 text-sm">
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">Shonen</td>
                  <td className="p-4">Selfies e Ação</td>
                  <td className="p-4">Linhas fortes e vibrantes</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">Ghibli</td>
                  <td className="p-4">Natureza e Pets</td>
                  <td className="p-4">Nostálgico e Aquarela</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">Avatar</td>
                  <td className="p-4">Perfil Social</td>
                  <td className="p-4">Foco no rosto e iluminação</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl">
              <h3 className="font-bold text-white mb-2">Preciso de um PC potente?</h3>
              <p className="text-zinc-400 text-sm">
                Não! Todo o processamento é feito em nossa nuvem. Você pode usar qualquer celular Android ou iPhone básico com 4G/5G.
              </p>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl">
              <h3 className="font-bold text-white mb-2">Minhas fotos ficam salvas?</h3>
              <p className="text-zinc-400 text-sm">
                De jeito nenhum! Seguimos rigorosamente a LGPD. Suas fotos são deletadas automaticamente após a geração.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
