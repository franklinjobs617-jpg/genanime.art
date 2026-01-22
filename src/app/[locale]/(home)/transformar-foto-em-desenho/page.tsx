import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { PenTool, ArrowRight, Zap, Check, Clock, DollarSign, PenLine } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image"; // ✅ 1. 引入 Image 组件

export const metadata: Metadata = {
  title: "IA para Transformar Foto em Desenho Online e Grátis (2026)",
  description: "Transforme fotos em desenhos realistas com IA. Converta foto em esboço a lápis, nanquim ou arte digital em segundos. Ferramenta gratuita para artistas e criativos.",
  alternates: {
    canonical: "https://genanime.art/pt/transformar-foto-em-desenho"
  },
  keywords: ["transformar foto em desenho", "foto para esboço", "converter foto em desenho online", "ia desenho", "sketch ai", "foto em desenho gratis"]
};

// ✅ 2. 定义风格数据和图片路径 (如果没有本地图片，先用 Unsplash 占位)
const STYLES = [
  { 
    name: "Esboço a Lápis", 
    image: "/br/transformar-foto-em-esboco-a-lapis-ia.webp", // ⚠️ 请替换成你的实际图片路径，例如 "/images/sketch_preview.jpg"
    description: "Traços suaves de grafite"
  },
  { 
    name: "Nanquim Artístico", 
    image: "/br/foto-convertida-em-desenho-nanquim-artistico.webp", // ⚠️ 请替换成你的实际图片路径
    description: "Alto contraste e linhas pretas"
  },
  { 
    name: "Aquarela Suave", 
    image: "/br/efeito-aquarela-suave-em-foto-online.webp", // ⚠️ 请替换成你的实际图片路径
    description: "Cores fluidas e artísticas"
  },
  { 
    name: "Linha de Anime", 
    image: "/br/transformar-foto-em-desenho-anime-online.webp", // ⚠️ 请替换成你的实际图片路径
    description: "Contornos limpos e digitais"
  }
];

export default async function DesenhoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  if (locale !== 'pt') {
    notFound();
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-indigo-500/30">
      
      <main className="container mx-auto max-w-5xl px-6 pt-32 pb-12">
        
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-white">
            Transformar Foto em <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Desenho Online</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Crie artes incríveis a partir das suas fotos favoritas. De esboços a lápis a pinturas digitais, tudo em segundos com Inteligência Artificial.
          </p>
        </header>

        {/* ✅ 3. 风格墙 (Style Wall) - 图片版 */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
           {STYLES.map((style, i) => (
             <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:border-indigo-500/50 hover:shadow-indigo-500/20 transition-all bg-[#0A0A0A] cursor-pointer">
                
                {/* 背景图片 */}
                {/* ⚠️ 这里的 src 需要是一个有效的图片路径。如果没有图片，可以用下面的 fallback 颜色块测试 */}
                <div className="absolute inset-0 bg-zinc-800">
                    {/* 如果你有真实图片，请把这段注释打开，并确保 STYLES 里的路径是正确的 */}
                    <Image 
                      src={style.image} 
                      alt={style.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    /> 
                </div>

                {/* 渐变遮罩 (Gradient Overlay) - 保证文字可读性 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* 底部文字内容 */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                   <p className="text-sm font-bold text-white mb-0.5">{style.name}</p>
                   <p className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1">
                     {style.description}
                   </p>
                </div>

                {/* 悬浮图标 */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="bg-white/10 backdrop-blur p-1.5 rounded-full">
                      <ArrowRight className="w-3 h-3 text-white" />
                   </div>
                </div>
             </div>
           ))}
        </section>

        {/* ... (下面的 CTA, Article, FAQ 等保持不变) ... */}
        
        {/* CTA */}
        <section className="bg-[#0A0A0A] rounded-3xl p-10 md:p-16 text-center mb-20 shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)] border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
             <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Pronto para transformar sua foto?</h2>
             <p className="text-zinc-400 mb-8 max-w-lg mx-auto">Acesse nosso gerador e escolha o seu estilo artístico favorito gratuitamente.</p>
             <Link href="/generator" className="inline-flex items-center px-8 py-4 bg-white hover:bg-zinc-200 text-black rounded-full font-black text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]">
               <PenTool className="w-5 h-5 mr-2" />
               Começar Desenho Agora
             </Link>
          </div>
        </section>

        {/* Article Content */}
        <article className="space-y-16 max-w-4xl mx-auto">
          {/* Tech Explanation */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Como a IA transforma foto em desenho com perfeição?</h2>
            <p className="text-zinc-400 leading-relaxed">
              Nossos algoritmos detectam as bordas principais e a profundidade da sua imagem. Em vez de apenas remover a cor, a IA "re-desenha" a imagem traço por traço, simulando a pressão de um lápis real ou a fluidez de um pincel de aquarela.
            </p>
          </section>

          {/* Expert Quote */}
          <section className="bg-[#0A0A0A] p-8 rounded-2xl border border-white/10 shadow-sm relative">
            <div className="flex gap-4">
               <div className="p-3 bg-white/5 rounded-full h-fit border border-white/10">
                  <PenLine className="w-6 h-6 text-zinc-400" />
               </div>
               <div>
                  <p className="text-zinc-300 italic text-lg leading-relaxed mb-4">
                    "Como ilustrador digital, uso a IA do GenAnime para acelerar meus 'thumbnails' e estudos de composição. O que me impressiona no estilo de nanquim é a limpeza das linhas: a IA não apenas 'suja' a foto, ela reconstrói os contornos. Para fotos de arquitetura ou monumentos, recomendo o modo 'Esboço a Lápis' para capturar detalhes que filtros comuns ignorariam."
                  </p>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">— Ilustrador Profissional</p>
               </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section>
             <h2 className="text-2xl font-bold text-white mb-6">Desenho à Mão vs. IA Generativa</h2>
             <div className="overflow-hidden rounded-xl border border-white/10 shadow-sm">
               <table className="w-full text-left border-collapse bg-[#0A0A0A]">
                 <thead>
                   <tr className="bg-white/5 text-zinc-300">
                     <th className="p-4 font-bold border-b border-white/10">Característica</th>
                     <th className="p-4 font-bold border-b border-white/10">Desenho Tradicional</th>
                     <th className="p-4 font-bold border-b border-white/10 bg-white/5 text-indigo-300">GenAnime IA</th>
                   </tr>
                 </thead>
                 <tbody className="text-zinc-400 text-sm">
                   <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                     <td className="p-4 font-medium flex items-center gap-2 text-white"><Clock className="w-4 h-4"/> Tempo de Produção</td>
                     <td className="p-4">2 a 10 horas</td>
                     <td className="p-4 font-bold bg-white/5 text-white">3 segundos</td>
                   </tr>
                   <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                     <td className="p-4 font-medium flex items-center gap-2 text-white"><DollarSign className="w-4 h-4"/> Custo Médio</td>
                     <td className="p-4">R$ 150 - R$ 500</td>
                     <td className="p-4 font-bold bg-white/5 text-green-400">Grátis</td>
                   </tr>
                   <tr className="hover:bg-white/5 transition-colors">
                     <td className="p-4 font-medium flex items-center gap-2 text-white"><Check className="w-4 h-4"/> Precisão de Traço</td>
                     <td className="p-4">Variável</td>
                     <td className="p-4 font-bold bg-white/5 text-white">Matemática / Perfeita</td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </section>

          {/* FAQ */}
          <section id="faq">
            <h2 className="text-2xl font-bold text-white mb-8">Dúvidas Frequentes</h2>
            <div className="space-y-4">
               <div className="bg-[#0A0A0A] border border-white/5 p-6 rounded-xl hover:border-indigo-500/30 transition-colors">
                  <h3 className="font-bold text-white">O desenho gerado tem resolução boa para imprimir?</h3>
                  <p className="text-zinc-400 text-sm mt-2">Sim! Nossa IA trabalha com upscaling inteligente. Ao escolher o estilo de desenho, a imagem é processada para manter as linhas nítidas, sendo ideal para quadros de até 30x40cm com ótima qualidade visual.</p>
               </div>
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}