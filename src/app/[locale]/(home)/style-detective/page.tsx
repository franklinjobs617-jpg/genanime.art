import React, { useState, useCallback } from "react";
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
  Loader2,
  CheckCircle2,
  Database,
  Search,
  X
} from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

// --- Types --- 
interface StyleModel {
  name: string;
  keywords: string[];
  description: string;
  recommendedBaseModel: string;
  recommendedLoras: Array<{
    name: string;
    weight: number;
  }>;
}

interface AnalysisResult {
  prompt: string;
  keywords: string[];
  styleMatches: Array<{
    model: StyleModel;
    matchPercentage: number;
  }>;
  recommendedBaseModel: string;
  recommendedLoras: Array<{
    name: string;
    weight: number;
  }>;
}

// --- 预设风格模型库 --- 
const STYLE_MODELS: StyleModel[] = [
  {
    name: "Makoto Style",
    keywords: ["makoto shinkai", "ethereal lighting", "lush backgrounds", "emotional atmosphere", "scenic", "anime scenery", "highly detailed clouds"],
    description: "Characterized by beautiful lighting, detailed backgrounds, and emotional storytelling",
    recommendedBaseModel: "Seedream 4.0",
    recommendedLoras: [
      { name: "Makoto Ethereal", weight: 0.8 },
      { name: "Vibrant Anime", weight: 0.5 }
    ]
  },
  {
    name: "Kyoto Animation Style",
    keywords: ["kyoto animation", "k-on", "moe", "soft colors", "detailed character designs", "cute expressions", "slice of life"],
    description: "Known for its cute character designs, soft color palettes, and slice-of-life themes",
    recommendedBaseModel: "Pony-Diffusion-V6",
    recommendedLoras: [
      { name: "Vibrant Anime", weight: 0.7 },
      { name: "Avatar Portrait", weight: 0.4 }
    ]
  },
  {
    name: "Ghibli Style",
    keywords: ["studio ghibli", "hayao miyazaki", "whimsical", "fantasy", "detailed environments", "hand-drawn", "organic shapes"],
    description: "Whimsical fantasy worlds with detailed environments and hand-drawn aesthetics",
    recommendedBaseModel: "Seedream 4.0",
    recommendedLoras: [
      { name: "Makoto Ethereal", weight: 0.9 },
      { name: "Realism", weight: 0.3 }
    ]
  },
  {
    name: "Retro 90s Anime",
    keywords: ["90s anime", "retro aesthetic", "cel animation", "vintage finish", "lo-fi", "vhs effect", "classic anime"],
    description: "Nostalgic cel-shaded animation with vintage aesthetics",
    recommendedBaseModel: "Animagine-XL-3.1",
    recommendedLoras: [
      { name: "Retro 90s", weight: 0.85 },
      { name: "Sketch Black White", weight: 0.3 }
    ]
  },
  {
    name: "Game Art Style",
    keywords: ["game splash art", "riot games style", "dynamic pose", "detailed background", "rim lighting", "cinematic composition", "highly detailed"],
    description: "Dynamic and detailed art style commonly found in video game splash screens",
    recommendedBaseModel: "Flux.1-Dev",
    recommendedLoras: [
      { name: "Elite Game Splash", weight: 0.8 },
      { name: "Realism", weight: 0.5 }
    ]
  }
];

// --- 辅助函数：计算关键词相似度 --- 
const calculateKeywordSimilarity = (promptKeywords: string[], modelKeywords: string[]): number => {
  if (promptKeywords.length === 0 || modelKeywords.length === 0) return 0;
  
  let matchedKeywords = 0;
  const promptKeywordsLower = promptKeywords.map(keyword => keyword.toLowerCase());
  
  for (const modelKeyword of modelKeywords) {
    const modelKeywordLower = modelKeyword.toLowerCase();
    if (promptKeywordsLower.some(promptKeyword => 
      promptKeyword.includes(modelKeywordLower) || 
      modelKeywordLower.includes(promptKeyword)
    )) {
      matchedKeywords++;
    }
  }
  
  return Math.round((matchedKeywords / modelKeywords.length) * 100);
};

// --- 内容字典 (SEO 深度优化版) --- 
const DICTIONARIES: any = {
  en: {
    meta: {
      title: "Style Detective - AI Anime Style Analyzer | GenAnime",
      description: "Upload any anime image and let our AI analyze its style. Get recommended models, LoRAs, and prompts for perfect replication.",
    },
    hero: {
      badge: "AI-Powered Tool",
      h1: "Style Detective",
      h1_sub: "for Anime Art",
      subtitle: "Upload any anime image and let our AI analyze its style. Get recommended models, LoRAs, and prompts for perfect replication.",
      cta: "Upload Image & Analyze",
      note: "Supports all anime art styles",
    },
    steps: {
      title: "How It Works",
      list: [
        {
          num: "01",
          title: "Upload Reference Image",
          desc: "Select any anime illustration, screenshot, or AI-generated image. High-resolution images yield better results.",
          icon: Upload,
        },
        {
          num: "02",
          title: "AI Style Analysis",
          desc: "Our engine scans the image, extracts visual features, and identifies style characteristics.",
          icon: Brain,
        },
        {
          num: "03",
          title: "Style Matching",
          desc: "We compare the extracted features with our style database to find the closest matches.",
          icon: Search,
        },
        {
          num: "04",
          title: "Get Recommendations",
          desc: "Receive detailed analysis with recommended models, LoRAs, and custom prompts.",
          icon: Database,
        },
        {
          num: "05",
          title: "Apply to Generator",
          desc: "One-click sync to our Alchemist generator with all settings pre-configured.",
          icon: Wand2,
        },
      ],
    },
    analysis: {
      analyzing: "Analyzing image style...",
      extracting: "Extracting style keywords...",
      matching: "Matching with style database...",
      generating: "Generating recommendations...",
      success: "Style analysis completed!",
      error: "Analysis failed. Please try again with a different image.",
    },
  },
  es: {
    meta: {
      title: "Style Detective - Analizador de Estilos de Anime | GenAnime",
      description: "Sube cualquier imagen de anime y deja que nuestra IA analice su estilo. Obtén modelos recomendados, LoRAs y prompts para una replicación perfecta.",
    },
    hero: {
      badge: "Herramienta de IA",
      h1: "Style Detective",
      h1_sub: "para Arte Anime",
      subtitle: "Sube cualquier imagen de anime y deja que nuestra IA analice su estilo. Obtén modelos recomendados, LoRAs y prompts para una replicación perfecta.",
      cta: "Subir Imagen y Analizar",
      note: "Compatible con todos los estilos de arte anime",
    },
    steps: {
      title: "Cómo Funciona",
      list: [
        {
          num: "01",
          title: "Subir Imagen de Referencia",
          desc: "Selecciona cualquier ilustración de anime, captura de pantalla o imagen generada por IA. Las imágenes de alta resolución dan mejores resultados.",
          icon: Upload,
        },
        {
          num: "02",
          title: "Análisis de Estilo IA",
          desc: "Nuestro motor escanea la imagen, extrae características visuales e identifica características de estilo.",
          icon: Brain,
        },
        {
          num: "03",
          title: "Coincidencia de Estilo",
          desc: "Comparamos las características extraídas con nuestra base de datos de estilos para encontrar las coincidencias más cercanas.",
          icon: Search,
        },
        {
          num: "04",
          title: "Obtener Recomendaciones",
          desc: "Recibe un análisis detallado con modelos recomendados, LoRAs y prompts personalizados.",
          icon: Database,
        },
        {
          num: "05",
          title: "Aplicar al Generador",
          desc: "Sincronización de un clic con nuestro generador Alchemist con todas las configuraciones preconfiguradas.",
          icon: Wand2,
        },
      ],
    },
    analysis: {
      analyzing: "Analizando estilo de imagen...",
      extracting: "Extrayendo palabras clave de estilo...",
      matching: "Coincidiendo con base de datos de estilos...",
      generating: "Generando recomendaciones...",
      success: "¡Análisis de estilo completado!",
      error: "El análisis falló. Por favor, inténtalo de nuevo con una imagen diferente.",
    },
  },
};

// --- 页面组件 --- 
export default async function StyleDetectivePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = DICTIONARIES[locale] || DICTIONARIES.en;
  
  return (
    <article className="min-h-screen bg-[#020203] text-zinc-300 selection:bg-indigo-500/40 pb-20 font-sans">
      <Toaster position="bottom-right" reverseOrder={false} />
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
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <StyleDetectiveClient locale={locale} />
            <p className="text-xs text-zinc-500 mt-2">{t.hero.note}</p>
          </div>
        </div>
      </header>

      {/* --- How It Works Section --- */}
      <section className="py-20 bg-[#050505]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.steps.title}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.steps.list.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-indigo-400">{step.num}</span>
                      <h3 className="text-lg font-bold text-white">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}

// --- 客户端组件 --- 
function StyleDetectiveClient({ locale }: { locale: string }) {
  const t = DICTIONARIES[locale] || DICTIONARIES.en;
  const router = useRouter();
  
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState<string>("");

  // --- 处理图片上传 --- 
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setAnalysisResult(null);
  };

  // --- 模拟分析过程 --- 
  const simulateAnalysisProcess = useCallback(async (): Promise<AnalysisResult> => {
    // 步骤 1: 模拟调用图转提示词接口
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentAnalysisStep(t.analysis.analyzing);
    
    // 步骤 2: 模拟提取关键词
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentAnalysisStep(t.analysis.extracting);
    
    // 步骤 3: 模拟风格匹配
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCurrentAnalysisStep(t.analysis.matching);
    
    // 步骤 4: 模拟生成推荐
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentAnalysisStep(t.analysis.generating);
    
    // 模拟生成结果
    const mockPrompt = "beautiful anime girl in a scenic landscape with ethereal lighting, lush backgrounds, highly detailed clouds, emotional atmosphere";
    const mockKeywords = ["beautiful", "anime girl", "scenic landscape", "ethereal lighting", "lush backgrounds", "highly detailed clouds", "emotional atmosphere"];
    
    // 计算风格匹配度
    const styleMatches = STYLE_MODELS.map(model => ({
      model,
      matchPercentage: calculateKeywordSimilarity(mockKeywords, model.keywords)
    })).sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    // 获取最佳匹配
    const bestMatch = styleMatches[0];
    
    return {
      prompt: mockPrompt,
      keywords: mockKeywords,
      styleMatches,
      recommendedBaseModel: bestMatch.model.recommendedBaseModel,
      recommendedLoras: bestMatch.model.recommendedLoras
    };
  }, [t.analysis]);

  // --- 处理分析 --- 
  const handleAnalyze = async () => {
    if (!image) {
      toast.error("Please upload an image first.");
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const result = await simulateAnalysisProcess();
      setAnalysisResult(result);
      toast.success(t.analysis.success);
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error(t.analysis.error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- 处理一键同步到生成页 --- 
  const handleApplyToAlchemist = () => {
    if (!analysisResult) return;
    
    // 构建路由参数
    const params = new URLSearchParams({
      prompt: analysisResult.prompt,
      model: analysisResult.recommendedBaseModel,
      mode: "text-to-image"
    });
    
    // 添加 LoRA 信息（这里简化处理，实际项目中可能需要更复杂的参数传递）
    analysisResult.recommendedLoras.forEach((lora, index) => {
      params.append(`lora${index}`, `${lora.name}:${lora.weight}`);
    });
    
    // 跳转到生成页
    router.push(`/generator?${params.toString()}`);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 图片上传区域 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Upload Image</h3>
            <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 text-center hover:border-indigo-500/50 transition-all duration-300">
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full max-h-64 object-contain"
                  />
                  <button
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                      setAnalysisResult(null);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
                  <p className="text-zinc-400 mb-4">Drag and drop your image here, or click to browse</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className={`
                  px-6 py-3 rounded-full font-bold transition-all duration-300 cursor-pointer
                  ${image ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}
                `}
              >
                {image ? 'Change Image' : t.hero.cta}
              </label>
            </div>
          </div>

          {/* 分析按钮 */}
          <div className="mb-8">
            <motion.button
              onClick={handleAnalyze}
              disabled={!image || isAnalyzing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2
                ${(!image || isAnalyzing) 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20'}
              `}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{currentAnalysisStep}</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  <span>Analyze Style</span>
                </>
              )}
            </motion.button>
          </div>

          {/* 分析结果 */}
          <AnimatePresence>
            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="border-t border-zinc-800 pt-8">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Analysis Results
                  </h3>

                  {/* 风格匹配度 */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-semibold text-white">Style Matches</h4>
                    <div className="space-y-4">
                      {analysisResult.styleMatches.map((match, index) => (
                        <div key={index} className="bg-zinc-900/80 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                <Palette className="w-5 h-5 text-indigo-400" />
                              </div>
                              <h5 className="font-semibold text-white">{match.model.name}</h5>
                            </div>
                            <span className="font-bold text-indigo-400">{match.matchPercentage}%</span>
                          </div>
                          <div className="w-full bg-zinc-800 rounded-full h-2 mt-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${match.matchPercentage}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                              className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 推荐设置 */}
                  <div className="space-y-6 mt-8">
                    <h4 className="text-lg font-semibold text-white">Recommendations</h4>
                    <div className="bg-zinc-900/80 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Database className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-white">Recommended Base Model</h5>
                          <p className="text-zinc-400 text-sm">{analysisResult.recommendedBaseModel}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="font-semibold text-white mb-3">Recommended LoRA Combination</h5>
                        <div className="space-y-3">
                          {analysisResult.recommendedLoras.map((lora, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-zinc-300">{lora.name}</span>
                              <span className="text-sm text-indigo-400">Weight: {lora.weight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 关键词云 */}
                  <div className="space-y-6 mt-8">
                    <h4 className="text-lg font-semibold text-white">Keyword Cloud</h4>
                    <div className="bg-zinc-900/80 rounded-xl p-4">
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.map((keyword, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-sm"
                          >
                            {keyword}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 一键应用按钮 */}
                  <div className="mt-8">
                    <motion.button
                      onClick={handleApplyToAlchemist}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Wand2 className="w-5 h-5" />
                      <span>Apply to Alchemist</span>
                    </motion.button>
                    <p className="text-xs text-zinc-500 text-center mt-2">
                      This will open the generator with all settings pre-configured
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}