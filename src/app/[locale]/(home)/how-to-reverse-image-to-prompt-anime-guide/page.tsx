import React from "react";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Search,
  HelpCircle,
  Terminal,
  Info,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";

// --- 1. 元数据生成 (服务端逻辑，支持 SEO) ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs
      ? "Cómo Convertir Foto a Anime con IA: Guía Completa - GenAnime"
      : "Master the Art of Reverse Engineering: Flux AI Image to Prompt - GenAnime",
    description: isEs
      ? "Aprende a usar Flux AI para convertir cualquier imagen en un prompt de alta calidad para anime con ingeniería inversa."
      : "Learn how to deconstruct any anime masterpiece into a high-octane magic spell using Flux AI.",
  };
}

// --- 2. 页面主组件 (服务端组件) ---
export default async function AnimePromptEngineeringGuide({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // 关键：await params 确保在切换语言时获取最新的 locale
  const { locale } = await params;

  // ----------------------------------------------------------------
  // 1. 完整的英文内容 (English Content)
  // ----------------------------------------------------------------
  const englishContent = (
    <>
      <header className="relative w-full py-28 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-8">
            <Sparkles className="w-3 h-3" /> New Feature Release
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            Master the Art of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
              Reverse Engineering
            </span>
            : Flux AI Image to Prompt
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Stop guessing keywords. Learn how to deconstruct any anime
            masterpiece into a high-octane "magic spell" for your next
            generation.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-zinc-500">
            <span>By GenAnime Editorial</span>
            <span className="w-1 h-1 bg-zinc-700 rounded-full" />
            <span>Jan 16, 2026</span>
            <span className="w-1 h-1 bg-zinc-700 rounded-full" />
            <span>12 Min Read</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        <section className="prose prose-invert prose-purple max-w-none mb-20">
          <p className="text-2xl leading-relaxed font-light italic text-zinc-300 border-l-4 border-purple-600 pl-6 my-12">
            "Have you ever stumbled upon a breathtaking masterpiece on Pixiv and
            felt a surge of 'prompt envy'? You see the perfect lighting, the
            intricate cel-shading, but your results fall flat. The secret isn't
            just writing; it's knowing how to reverse engineer."
          </p>
          <p>
            At <strong>GenAnime.art</strong>, we've unlocked the vault. With our
            newly launched <strong>Visual DNA Extraction</strong> tool, we are
            bridging the gap between inspiration and creation. Today, we're
            diving deep into how to use <strong>Flux AI image to prompt</strong>{" "}
            technology to deconstruct any image into a high-octane "magic spell"
            for your next generation.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Search className="text-purple-500" /> What is an Images to Prompt
            Generator?
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-zinc-400">
            <p>
              Before we jump into the "how," let's talk about the "what." An{" "}
              <strong>images to prompt generator</strong> is essentially a
              visual translator. It uses advanced computer vision models to
              "look" at an image and describe it in a language that AI image
              generators understand.
            </p>
            <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl my-8">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest text-purple-400">
                <Info className="w-4 h-4" /> The Anime Specialization
              </h4>
              <p>
                Generic tools often miss the nuance of "Anime." They see "a girl
                with pink hair," but they miss the "absolute territory," the
                "tsundere pout," or the "Makoto Shinkai-style clouds." Our AI at
                GenAnime is different. It is specifically tuned for the nuances
                of Japanese animation styles.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
            The Rise of Flux AI: The New Meta
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed mb-8">
            Flux.1 has changed the game. Unlike older models that rely on a
            chaotic "word salad" of tags, Flux is incredibly smart. It
            understands natural language and complex poses. However, this
            requires a different prompting strategy. By analyzing an existing
            high-quality image, you can discover the specific descriptive
            phrases that Flux craves.
          </p>
          <div className="group relative w-full aspect-[16/7] mb-12 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.15)]">
            <Image
              src="/how-to-reverse-image-to-prompt-flux-ai-anime-tutorial.webp"
              alt="Mastering Flux AI Anime Prompt Engineering Guide Hero Image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">
                  Visual DNA Case Study
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-zinc-400 tracking-widest uppercase">
                Flux.1 Dev
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20 bg-gradient-to-br from-zinc-900 to-black p-10 rounded-[40px] border border-white/5">
          <h2 className="text-3xl font-bold text-white mb-8">
            Introducing GenAnime's Visual DNA Extraction
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center">
                <Terminal className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Technical Tagging
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Uses our custom-tuned WD-14 vision base to identify thousands of
                specific anime traits used by models like Stable Diffusion.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center">
                <Zap className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white">LLM Refinement</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Our "Brain" layer organizes raw tags into a structured,
                professional prompt that mimics how expert artists describe
                scenes.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">
            Step-by-Step Guide
          </h2>
          <div className="space-y-32">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="relative">
                  <span className="text-8xl font-black text-white/5 absolute -top-10 -left-4 select-none">
                    01
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                    Find Your Muse
                  </h3>
                </div>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  Every great creation starts with a spark. Find an image that
                  resonates with your creative vision. This image will serve as
                  the{" "}
                  <span className="text-purple-400 font-medium">
                    Visual DNA
                  </span>{" "}
                  for your next generation.
                </p>
              </div>
              <div className="flex-1 w-full max-w-[500px]">
                <div className="group relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                  <Image
                    src="/find-anime-art-muse-inspiration-genanime.webp"
                    alt="Anime Muse"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse gap-10 items-center">
              <div className="flex-1 lg:text-right">
                <div className="relative">
                  <span className="text-8xl font-black text-white/5 absolute -top-10 -right-4 select-none">
                    02
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                    Upload & Analyze
                  </h3>
                </div>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  Seamlessly drag and drop your muse into the GenAnime console.
                  Our vision engine begins a{" "}
                  <span className="text-blue-400 font-medium">deep-scan</span>{" "}
                  to deconstruct aesthetic data.
                </p>
              </div>
              <div className="lg:flex-[1.5] w-full">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.8rem] bg-zinc-900 border border-white/10">
                  <Image
                    src="/extracting-ai-prompts-from-images-genanime-analysis.webp"
                    alt="AI Analysis"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="flex-1">
                <div className="relative">
                  <span className="text-8xl font-black text-white/5 absolute -top-10 -left-4 select-none">
                    03
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                    Refine with Tag Chips
                  </h3>
                </div>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  Edit tags directly in the analyzed prompt box. Our interactive
                  UI allows you to{" "}
                  <span className="text-purple-400 font-medium">
                    fine-tune every detail
                  </span>
                  .
                </p>
              </div>
              <div className="lg:flex-[2] w-full">
                <div className="relative aspect-[16/8] overflow-hidden rounded-[1.8rem] bg-zinc-900 border border-white/10">
                  <Image
                    src="/refine-anime-ai-tags-interactive-editor-genanime.webp"
                    alt="Refine Tags"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            Pro Tip: The "Remix" Method
          </h2>
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-3xl p-8">
            <p className="text-zinc-300 mb-6">
              Don't just copy. <strong>Remix.</strong> Upload an image of a
              character you like, extract the prompt, but then replace the
              "Subject" tags.
            </p>
            <div className="bg-black/40 rounded-xl p-6 font-mono text-sm border border-white/5">
              <p className="text-purple-300">
                masterpiece, best quality,{" "}
                <span className="text-white underline decoration-blue-500">
                  1boy, solo, white hoodie
                </span>
                , pink long hair, magical girl, frills, holding staff, cinematic
                lighting, (genanime_style:1.2)
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20 py-20 border-t border-white/5">
          <h2 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
            <HelpCircle className="text-blue-500" /> FAQ: Stable Diffusion vs.
            Flux
          </h2>
          <div className="grid gap-6">
            <div className="bg-zinc-900/30 p-8 rounded-3xl border border-white/5">
              <h4 className="text-white font-bold mb-3">
                Q: Does this work for both models?
              </h4>
              <p className="text-zinc-400">
                Absolutely. While Stable Diffusion prefers shorter tags, Flux
                excels with descriptive sentences. Our tool provides a
                structured list that works remarkably well for both.
              </p>
            </div>
          </div>
        </section>

        <footer className="relative rounded-[50px] overflow-hidden bg-gradient-to-r from-purple-600 to-blue-700 p-12 text-center">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Stop Guessing. <br /> Start Creating.
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              {" "}
              Join thousands of artists using GenAnime to bridge the gap between
              imagination and professional AI results.
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center gap-3 bg-white text-purple-700 font-black py-5 px-12 rounded-full text-xl hover:scale-105 transition-all shadow-2xl"
            >
              Try Image-to-Prompt Free <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </footer>

        <div className="mt-20 flex flex-wrap justify-center gap-4 text-[10px] text-zinc-700 uppercase tracking-widest font-bold">
          <span>flux ai image to prompt</span>
          <span>images to prompt generator</span>
          <span>image to prompt ai</span>
          <span>anime prompt reverse engineering</span>
        </div>
      </main>
    </>
  );

  // ----------------------------------------------------------------
  // 2. 完整的西班牙语内容 (Spanish Content)
  // ----------------------------------------------------------------
  const spanishContent = (
    <>
      <header className="relative w-full py-28 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-8">
            <Sparkles className="w-3 h-3" /> Nueva Funcionalidad
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            Cómo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
              Convertir Foto a Anime
            </span>{" "}
            con IA: Guía Completa
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Deja de adivinar palabras clave. Aprende a descomponer cualquier
            imagen en un "hechizo mágico" de alta potencia para tu próxima
            creación.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-zinc-500">
            <span>Por el Equipo Editorial de GenAnime</span>
            <span className="w-1 h-1 bg-zinc-700 rounded-full" />
            <span>Ene 16, 2026</span>
            <span className="w-1 h-1 bg-zinc-700 rounded-full" />
            <span>12 Min de Lectura</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        <section className="prose prose-invert prose-purple max-w-none mb-20">
          <p className="text-2xl leading-relaxed font-light italic text-zinc-300 border-l-4 border-purple-600 pl-6 my-12">
            "¿Alguna vez te has encontrado con una obra maestra deslumbrante en
            Pixiv y sentido un estallido de 'envidia de prompt'? El secreto no
            es solo escribir; es saber cómo hacer ingeniería inversa."
          </p>
          <p>
            En <strong>GenAnime.art</strong>, hemos abierto la bóveda. Con
            nuestra herramienta de <strong>Extracción de ADN Visual</strong>,
            hoy profundizaremos en cómo usar la tecnología de{" "}
            <strong>IA convertir foto a dibujo animado</strong> para descomponer
            cualquier imagen en un "hechizo mágico" para tu próxima creación.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Search className="text-purple-500" /> ¿Qué es un Generador de
            Imágenes a Prompts?
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-zinc-400">
            <p>
              Un <strong>generador de imágenes a prompts</strong> es
              esencialmente un traductor visual. Utiliza modelos avanzados de
              visión por computadora para "mirar" una imagen y describirla en un
              lenguaje que los generadores de imágenes por IA entienden.
            </p>
            <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl my-8">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2 uppercase text-xs tracking-widest text-purple-400">
                <Info className="w-4 h-4" /> Especialización en Anime
              </h4>
              <p>
                Las herramientas genéricas a menudo pierden las sutilezas del
                "Anime". Nuestra IA está específicamente sintonizada para las
                sutilezas de los estilos de animación japonesa como el
                "territorio absoluto" o las "nubes estilo Makoto Shinkai".
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
            El Auge de Flux AI: La Nueva Meta
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed mb-8">
            Flux.1 ha cambiado el juego. Entiende lenguaje natural y poses
            complejas. Al analizar una imagen existente de alta calidad, puedes
            descubrir las frases descriptivas específicas que Flux desea.
          </p>
          <div className="group relative w-full aspect-[16/7] mb-12 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.15)]">
            {/* 注意：此处 src 已更正为英文路径，确保显示图片 */}
            <Image
              src="/how-to-reverse-image-to-prompt-flux-ai-anime-tutorial.webp"
              alt="Guía Flux IA"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-transparent to-transparent opacity-80" />
          </div>
        </section>

        <section className="mb-32">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">
            Guía Paso a Paso
          </h2>
          <div className="space-y-32">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="relative">
                  <span className="text-8xl font-black text-white/5 absolute -top-10 -left-4 select-none">
                    01
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                    Encuentra Tu Inspiración
                  </h3>
                </div>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  Toda gran creación comienza con una chispa. Esta imagen
                  servirá como el{" "}
                  <span className="text-purple-400 font-medium">
                    ADN Visual
                  </span>{" "}
                  para tu próxima generación.
                </p>
              </div>
              <div className="flex-1 w-full max-w-[500px]">
                <div className="group relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                  {/* 注意：此处 src 已更正为英文路径，确保显示图片 */}
                  <Image
                    src="/find-anime-art-muse-inspiration-genanime.webp"
                    alt="Inspiración"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse gap-10 items-center">
              <div className="flex-1 lg:text-right">
                <div className="relative">
                  <span className="text-8xl font-black text-white/5 absolute -top-10 -right-4 select-none">
                    02
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                    Sube y Analiza
                  </h3>
                </div>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  Arrastra tu inspiración a la consola de GenAnime. Nuestro
                  motor realiza un{" "}
                  <span className="text-blue-400 font-medium">
                    escaneo profundo
                  </span>{" "}
                  de los datos estéticos.
                </p>
              </div>
              <div className="lg:flex-[1.5] w-full">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.8rem] bg-zinc-900 border border-white/10">
                  {/* 注意：此处 src 已更正为英文路径，确保显示图片 */}
                  <Image
                    src="/extracting-ai-prompts-from-images-genanime-analysis.webp"
                    alt="Análisis"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="flex-1">
                <div className="relative">
                  <span className="text-8xl font-black text-white/5 absolute -top-10 -left-4 select-none">
                    03
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-4 relative z-10">
                    Refina con Etiquetas
                  </h3>
                </div>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  Edita las etiquetas directamente. Nuestra interfaz te permite{" "}
                  <span className="text-purple-400 font-medium">
                    ajustar cada detalle
                  </span>{" "}
                  antes de generar.
                </p>
              </div>
              <div className="lg:flex-[2] w-full">
                <div className="relative aspect-[16/8] overflow-hidden rounded-[1.8rem] bg-zinc-900 border border-white/10">
                  {/* 注意：此处 src 已更正为英文路径，确保显示图片 */}
                  <Image
                    src="/refine-anime-ai-tags-interactive-editor-genanime.webp"
                    alt="Refinar Etiquetas"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative rounded-[50px] overflow-hidden bg-gradient-to-r from-purple-600 to-blue-700 p-12 text-center">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Deja de Adivinar. <br /> Comienza a Crear.
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Únete a miles de artistas que usan GenAnime para cerrar la brecha
              entre la imaginación y resultados profesionales de IA.
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center gap-3 bg-white text-purple-700 font-black py-5 px-12 rounded-full text-xl hover:scale-105 transition-all shadow-2xl"
            >
              Prueba Convertir Foto a Anime Gratis{" "}
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </footer>

        <div className="mt-20 flex flex-wrap justify-center gap-4 text-[10px] text-zinc-700 uppercase tracking-widest font-bold">
          <span>convertir foto a anime</span>
          <span>generador de prompts desde imagen</span>
          <span>ingeniería inversa de prompts</span>
        </div>
      </main>
    </>
  );

  return (
    <article className="min-h-screen bg-[#020203] text-zinc-300 selection:bg-purple-500/40 pb-20">
      {locale === "es" ? spanishContent : englishContent}
    </article>
  );
}
