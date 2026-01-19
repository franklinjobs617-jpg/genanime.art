import React from "react";
import {
  ArrowRight,
  Sparkles,
  Zap,
  HelpCircle,
  Upload,
  Brain,
  Palette,
  Star,
  Layers,
  Wand2,
  ChevronRight,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";

// --- 1. 内容字典 (SEO 深度优化版) ---
const DICTIONARIES: any = {
  en: {
    meta: {
      title:
        "Image to Prompt Generator for Anime - Free AI Extractor | GenAnime",
      description:
        "The best free images to prompt generator for anime. Instantly reverse engineer prompts for Flux AI, Midjourney, and Stable Diffusion. See real examples with our screenshot guide. No signup required.",
    },
    hero: {
      badge: "Free AI Tool",
      h1: "Image to Prompt Generator",
      h1_sub: "for Anime Art",
      subtitle:
        "Stop guessing how your favorite anime art was made. Upload any image and let our AI reverse-engineer the perfect prompt for Flux, Midjourney, or Niji V6.",
      cta: "Upload Image & Extract Prompt",
      note: "Compatible with all major AI models",
    },
    // 新增：深度 SEO 文本块
    seo_intro: {
      title: "How Does Anime Prompt Extraction Work?",
      p1: "In the world of AI art, the 'prompt' is your source code. But often, we see a masterpiece and wonder: 'What magic words created this?' This is where our **image to prompt generator** comes in.",
      p2: "Unlike generic photo analyzers, GenAnime's engine is specifically trained on 100,000+ anime aesthetic pairs. We don't just see 'a girl'; we identify 'Kyoto Animation style', 'cinematic lighting', 'volumetric fog', and specific artist influences.",
      p3: "Whether you are using **Flux AI** for realistic textures or **Midjourney Niji** for stylized illustration, our tool bridges the gap between visual inspiration and text generation.",
    },
    features: {
      title: "Why Artists Choose Our Extractor",
      list: [
        {
          icon: Brain,
          title: "Anime-Specific Vision",
          desc: "Trained on Danbooru tags and Niji aesthetics, not just real-world photos. It knows the difference between 'cel shading' and 'digital painting'.",
        },
        {
          icon: Zap,
          title: "Flux AI Ready",
          desc: "The current meta belongs to Flux. Our output prompts are optimized with natural language structures that Flux AI understands best.",
        },
        {
          icon: Layers,
          title: "Style & Artist Detection",
          desc: "Instantly identify the art style (e.g., 90s retro, cyberpunk, watercolor) and potential artist references to mimic the vibe.",
        },
        {
          icon: Star,
          title: "100% Free Utility",
          desc: "We believe in empowering the community. This images to prompt generator is free to use without daily credit limits.",
        },
      ],
    },
    // 新增：模型兼容性板块
    compatibility: {
      title: "One Prompt, Any Model",
      subtitle:
        "Our reverse-engineered prompts are versatile. Use them across:",
      models: [
        {
          name: "Flux.1 (Dev/Schnell)",
          desc: "Best for text adherence and hands.",
        },
        {
          name: "Midjourney v6 & Niji 6",
          desc: "Best for artistic composition.",
        },
        {
          name: "Stable Diffusion XL",
          desc: "Best for local control and LoRAs.",
        },
        { name: "DALL-E 3", desc: "Best for simple prompt following." },
      ],
    },
    steps: {
      title: "How to Reverse Engineer Anime Art",
      list: [
        {
          num: "01",
          title: "Upload Reference Image",
          desc: "Select any anime illustration, screenshot, or AI-generated image. High-resolution images yield better detail detection.",
          img: "/ScreenShot_2026-01-19_185738_548.png",
          alt: "Upload anime image to prompt extraction tool interface showing drag and drop area"
        },
        {
          num: "02",
          title: "AI Aesthetic Analysis",
          desc: "Our engine scans for composition, lighting, color palette, and character traits (hair color, eye shape, clothing).",
          img: "/ScreenShot_2026-01-19_185750_124.png",
          alt: "AI analysis screen showing technical tags and visual elements detected from anime image"
        },
        {
          num: "03",
          title: "Copy & Remix",
          desc: "Get the raw prompt. Copy it directly or use our built-in modifier to tweak the hair color or setting before generating.",
          img: "/ScreenShot_2026-01-19_185803_171.png",
          alt: "Generated prompt results displayed in text editor with copy and edit functionality"
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "What is the best image to prompt generator for anime?",
          a: "GenAnime is widely considered the best choice for anime because our Vision Model is fine-tuned specifically on 2D art data, whereas tools like CLIP Interrogator are trained on real photos.",
        },
        {
          q: "Can I use this for Flux AI prompts?",
          a: "Yes! Flux AI prefers natural language descriptions over comma-separated tags. Our tool outputs descriptive sentences perfect for Flux workflows.",
        },
        {
          q: "Is this reverse image prompt tool free?",
          a: "Yes, it is completely free. We monetize through our premium generation features, allowing us to keep this utility tool free for the community.",
        },
        {
          q: "Does it work on screenshots?",
          a: "Yes, you can upload screenshots from anime shows. The AI will attempt to describe the scene, style, and characters present.",
        },
      ],
    },
    cta: {
      title: "Ready to Create Your Masterpiece?",
      desc: "Stop staring at a blank text box. Turn your inspiration into a prompt instantly.",
      btn: "Start Generating Now",
    },
    tags: [
      "image to prompt",
      "anime prompt extractor",
      "flux ai image to prompt",
      "midjourney compatible",
      "free ai tool",
    ],
  },
  es: {
    meta: {
      title: "Generador de Imagen a Prompt para Anime - Gratis | GenAnime",
      description:
        "El mejor generador de imagen a prompt gratuito para anime. Ingeniería inversa de prompts para Flux AI, Midjourney y Stable Diffusion. Consulta ejemplos reales con nuestra guía de capturas de pantalla.",
    },
    hero: {
      badge: "Herramienta IA Gratis",
      h1: "Generador de Imagen a Prompt",
      h1_sub: "para Arte Anime",
      subtitle:
        "Deja de adivinar cómo se hizo ese arte. Sube cualquier imagen y deja que nuestra IA haga ingeniería inversa del prompt perfecto para Flux o Midjourney.",
      cta: "Subir Imagen y Extraer",
      note: "Compatible con todos los modelos principales",
    },
    seo_intro: {
      title: "¿Cómo funciona la extracción de prompts?",
      p1: "En el mundo del arte IA, el 'prompt' es tu código fuente. A menudo vemos una obra maestra y nos preguntamos: '¿Qué palabras mágicas crearon esto?'. Aquí es donde entra nuestro **generador de imagen a prompt**.",
      p2: "A diferencia de los analizadores genéricos, el motor de GenAnime está entrenado en más de 100,000 pares de estética anime. No solo vemos 'una chica'; identificamos 'estilo Kyoto Animation', 'iluminación cinematográfica' y niebla volumétrica.",
      p3: "Ya sea que uses **Flux AI** para texturas realistas o **Midjourney Niji** para ilustraciones estilizadas, nuestra herramienta cierra la brecha entre la inspiración visual y el texto.",
    },
    features: {
      title: "Por qué los Artistas Nos Eligen",
      list: [
        {
          icon: Brain,
          title: "Visión Específica de Anime",
          desc: "Entrenado en etiquetas Danbooru y estética Niji. Conoce la diferencia entre 'cel shading' y 'pintura digital'.",
        },
        {
          icon: Zap,
          title: "Listo para Flux AI",
          desc: "El meta actual pertenece a Flux. Nuestros prompts están optimizados con estructuras de lenguaje natural que Flux entiende mejor.",
        },
        {
          icon: Layers,
          title: "Detección de Estilo",
          desc: "Identifica instantáneamente el estilo artístico (ej. retro 90s, cyberpunk) y referencias de artistas.",
        },
        {
          icon: Star,
          title: "Utilidad 100% Gratis",
          desc: "Creemos en empoderar a la comunidad. Este generador es gratuito sin límites diarios de crédito.",
        },
      ],
    },
    compatibility: {
      title: "Un Prompt, Cualquier Modelo",
      subtitle:
        "Nuestros prompts de ingeniería inversa son versátiles. Úsalos en:",
      models: [
        {
          name: "Flux.1 (Dev/Schnell)",
          desc: "Mejor para adherencia al texto y manos.",
        },
        {
          name: "Midjourney v6 & Niji 6",
          desc: "Mejor para composición artística.",
        },
        {
          name: "Stable Diffusion XL",
          desc: "Mejor para control local y LoRAs.",
        },
        { name: "DALL-E 3", desc: "Mejor para seguimiento simple de prompts." },
      ],
    },
    steps: {
      title: "Cómo hacer Ingeniería Inversa de Anime",
      list: [
        {
          num: "01",
          title: "Subir Imagen de Referencia",
          desc: "Selecciona cualquier ilustración o captura de anime. Las imágenes de alta resolución dan mejores detalles.",
          img: "/ScreenShot_2026-01-19_185738_548.webp",
          alt: "Interfaz de herramienta de extracción de prompt mostrando área de arrastrar y soltar"
        },
        {
          num: "02",
          title: "Análisis Estético IA",
          desc: "Nuestro motor escanea composición, iluminación, paleta de colores y rasgos del personaje.",
          img: "/ScreenShot_2026-01-19_185750_124.webp",
          alt: "Pantalla de análisis IA mostrando etiquetas técnicas y elementos visuales detectados"
        },
        {
          num: "03",
          title: "Copiar y Remixar",
          desc: "Obtén el prompt crudo. Cópialo directamente o usa nuestro modificador integrado para ajustar detalles.",
          img: "/ScreenShot_2026-01-19_185803_171.webp",
          alt: "Resultados de prompt generados mostrados en editor de texto con funcionalidad de copiar y editar"
        },
      ],
    },
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        {
          q: "¿Cuál es el mejor generador de imagen a prompt?",
          a: "GenAnime es considerado la mejor opción para anime porque nuestro Modelo de Visión está ajustado específicamente en datos de arte 2D.",
        },
        {
          q: "¿Puedo usar esto para Flux AI?",
          a: "¡Sí! Flux AI prefiere descripciones en lenguaje natural. Nuestra herramienta genera oraciones descriptivas perfectas para flujos de trabajo Flux.",
        },
        {
          q: "¿Es gratis esta herramienta?",
          a: "Sí, es completamente gratis. Monetizamos a través de nuestras funciones de generación premium.",
        },
        {
          q: "¿Funciona en capturas de pantalla?",
          a: "Sí, puedes subir capturas de series de anime. La IA intentará describir la escena y el estilo.",
        },
      ],
    },
    cta: {
      title: "¿Listo para Crear tu Obra Maestra?",
      desc: "Deja de mirar un cuadro de texto vacío. Convierte tu inspiración en un prompt al instante.",
      btn: "Empezar a Generar Ahora",
    },
    tags: [
      "imagen a prompt",
      "extractor anime",
      "flux ai prompt",
      "midjourney compatible",
    ],
  },
};

// --- 2. Metadata ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = DICTIONARIES[locale] || DICTIONARIES.en;
  return {
    title: t.meta.title,
    description: t.meta.description,
  };
}

// --- 3. 页面组件 ---
export default async function ImageToPromptPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = DICTIONARIES[locale] || DICTIONARIES.en;

  return (
    <article className="min-h-screen bg-[#020203] text-zinc-300 selection:bg-indigo-500/40 pb-20 font-sans">
      {/* --- HERO SECTION (保留了您喜欢的原版高级黑背景) --- */}
      <header className="relative w-full pt-32 pb-24 px-6 overflow-hidden">
        {/* 背景光效 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-900/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-8">
            <Sparkles className="w-3 h-3" /> {t.hero.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            {t.hero.h1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              {t.hero.h1_sub}
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
            {t.hero.subtitle}
          </p>

          {/* Main CTA Button */}
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/generator?mode=upload"
              className="inline-flex items-center gap-3 bg-white text-indigo-950 font-black py-4 px-10 rounded-full text-lg hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
            >
              <Upload className="w-5 h-5" /> {t.hero.cta}
            </Link>
            <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{" "}
              {t.hero.note}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">
        {/* --- SEO DEEP DIVE (新增：长文本介绍，针对SEO优化) --- */}
        <section className="prose prose-invert prose-lg max-w-3xl mx-auto mb-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t.seo_intro.title}
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">{t.seo_intro.p1}</p>
          <p className="text-zinc-300 leading-relaxed font-medium mb-6 text-xl">
            {t.seo_intro.p2}
          </p>
          <p className="text-zinc-400 leading-relaxed">{t.seo_intro.p3}</p>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-6">
            {t.features.list.map((feature: any, idx: number) => (
              <div
                key={idx}
                className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                  <feature.icon className="text-indigo-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- MODEL COMPATIBILITY (新增：展示专业性) --- */}
        <section className="mb-32 bg-gradient-to-br from-zinc-900 to-black p-10 md:p-14 rounded-[40px] border border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t.compatibility.title}
            </h2>
            <p className="text-zinc-400">{t.compatibility.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {t.compatibility.models.map((model: any, idx: number) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/5 p-6 rounded-2xl text-center"
              >
                <Wand2 className="w-8 h-8 mx-auto text-purple-400 mb-4 opacity-80" />
                <h4 className="text-white font-bold mb-2">{model.name}</h4>
                <p className="text-xs text-zinc-500 leading-tight">
                  {model.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- HOW TO STEPS --- */}
     {/* --- HOW TO STEPS (修复版：全图显示，清晰可见) --- */}
        <section className="mb-32">
          <h2 className="text-4xl font-bold text-white mb-20 text-center">
            {t.steps.title}
          </h2>
          <div className="space-y-32">
            {t.steps.list.map((step: any, idx: number) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  idx % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-12 lg:gap-20 items-center group`}
              >
                {/* 文字部分 */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-block px-3 py-1 mb-4 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold tracking-widest">
                    STEP {step.num}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-indigo-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                    {step.desc}
                  </p>
                </div>

                {/* 图片部分 (修复：完整显示不裁剪) */}
                <div className="flex-1 w-full max-w-[650px] relative">
                  {/* 背景光晕 */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[30px] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />
                  
                  {/* 浏览器窗口容器 */}
                  <div className="relative rounded-xl overflow-hidden bg-[#131316] border border-white/10 shadow-2xl">
                    {/* 模拟浏览器头部 */}
                    <div className="h-8 bg-[#1A1A1E] border-b border-white/5 flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F57]" /> 
                      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" /> 
                      <div className="w-3 h-3 rounded-full bg-[#28C840]" /> 
                      <div className="ml-4 flex-1 h-4 bg-white/5 rounded-full max-w-[200px]" />
                    </div>

                    {/* 图片显示区域 */}
                    {/* 1. 使用 aspect-[16/10] 保证高度足够 */}
                    {/* 2. 背景色 bg-[#131316] 设为深色，与您的截图背景融合 */}
                    <div className="relative aspect-[16/10] w-full bg-[#131316] p-1">
                      <Image
                        src={step.img}
                        alt={step.alt || step.title}
                        fill
                        // 🌟 核心修改：
                        // object-contain: 保证图片完整显示，不裁剪
                        // object-center: 图片居中
                        className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
                        sizes="(max-width: 768px) 100vw, 650px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="mb-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
            <HelpCircle className="text-indigo-500" /> {t.faq.title}
          </h2>
          <div className="grid gap-4">
            {t.faq.items.map((item: any, idx: number) => (
              <details
                key={idx}
                className="group bg-zinc-900/30 rounded-2xl border border-white/5 open:bg-zinc-900 transition-all duration-300"
              >
                <summary className="flex justify-between items-center w-full p-6 cursor-pointer list-none text-zinc-200 font-bold text-lg select-none hover:text-white">
                  {item.q}
                  <span className="transform group-open:rotate-180 transition-transform text-indigo-400">
                    ▼
                  </span>
                </summary>
                <div className="px-6 pb-6 text-zinc-400 border-t border-white/5 pt-4 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <footer className="relative rounded-[40px] overflow-hidden bg-[#0A0A0C] border border-white/10 p-12 md:p-20 text-center mb-20">
          {/* Background Mesh */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              {t.cta.title}
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
              {t.cta.desc}
            </p>
            <Link
              href="/generator?mode=upload"
              className="inline-flex items-center gap-3 bg-white text-indigo-950 font-black py-5 px-12 rounded-full text-xl hover:bg-indigo-50 transition-colors"
            >
              {t.cta.btn} <ChevronRight className="w-6 h-6" />
            </Link>
          </div>
        </footer>

        {/* --- SEO KEYWORD CLOUD (Footer) --- */}
        <div className="pb-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-zinc-700 uppercase tracking-widest font-bold">
          {t.tags.map((tag: string, idx: number) => (
            <span key={idx}>#{tag}</span>
          ))}
        </div>
      </main>
    </article>
  );
}
