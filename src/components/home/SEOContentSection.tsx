"use client";

import { motion } from "framer-motion";
import { Palette, User, Video, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SEOContentSection() {
  const t = useTranslations('SEOContent');
  const defaultFeatures = [
    {
      title: "High-Fidelity Anime Art",
      description:
        "Generate professional-grade illustrations with perfect lighting. The ultimate anime ai art generator for creators.",
      label: "Available Now",
    },
    {
      title: "Character Design",
      description:
        "Create consistent characters from head to toe. Ideal for anime ai generated business woman or fantasy heroes.",
      label: "Available Now",
    },
    {
      title: "AI Anime Video Workflow (Beta)",
      description:
        "Beta waitlist: We are testing anime image-to-video workflows with selected users. Join the waitlist for early access in supported regions.",
      label: "Beta Waitlist",
      button: "Join Beta Waitlist",
    },
  ] as Array<{ title: string; description: string; label: string; button?: string }>;

  const rawFeatures = t.raw('features');
  const featuresData = Array.isArray(rawFeatures) ? rawFeatures : defaultFeatures;

  const getText = (key: string, fallback: string) => {
    try {
      const value = t(key as "seoTitle");
      if (!value || value === key || value === `SEOContent.${key}`) {
        return fallback;
      }
      return value;
    } catch {
      return fallback;
    }
  };

  const seoTitle = getText("seoTitle", "Leading the");
  const seoHighlight = getText("seoHighlight", "AI Anime Revolution");
  const seoParagraph1 = getText(
    "seoParagraph1",
    "Our platform is the most versatile <strong>anime ai art generator</strong>. We specialize in high-resolution image creation, from <strong>ai generated animated sprite</strong> sheets to professional character designs. Whether you need a full-body <strong>anime ai generated business woman</strong> or a custom mascot via our <strong>ai animal generator</strong>, we have you covered."
  );
  const seoParagraph2 = getText(
    "seoParagraph2",
    "Motion workflows are now in controlled beta. We are testing <strong>ai video generator anime opening</strong> experiences with waitlist users first, then expanding by region. If your use case is image-to-video for <strong>ai generator anime</strong>, join the waitlist for rollout updates."
  );

  const iconMap = [Palette, User, Video];

  const features = featuresData.map((f, i) => ({
    ...f,
    icon: iconMap[i],
    isComingSoon: i === 2
  }));

  return (
    <section className="py-24 bg-[#050505] text-zinc-300 relative border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 flex flex-col ${f.isComingSoon
                ? "bg-zinc-900/10 border-white/5 grayscale"
                : "bg-[#0F0F0F] border-white/5 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/10"
                }`}
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${f.isComingSoon
                      ? "bg-zinc-950 border-white/5 text-zinc-600"
                      : "bg-zinc-900 border-white/5 text-zinc-100 group-hover:bg-purple-500/10 group-hover:text-purple-400"
                      }`}
                  >
                    {f.isComingSoon ? <Lock className="w-5 h-5" /> : <f.icon className="w-6 h-6" />}
                  </div>
                  <span
                    className={`text-[10px] font-mono border px-3 py-1 rounded-full uppercase tracking-wider ${f.isComingSoon
                      ? "border-zinc-800 text-zinc-600"
                      : "border-purple-500/20 bg-purple-500/10 text-purple-400"
                      }`}
                  >
                    {f.label}
                  </span>
                </div>

                <h3
                  className={`text-xl font-bold mb-3 ${f.isComingSoon
                    ? "text-zinc-600"
                    : "text-white group-hover:text-purple-300"
                    }`}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {f.description}
                </p>

                {f.isComingSoon && f.button && (
                  <button className="mt-6 text-xs font-bold text-zinc-500 border border-zinc-800 rounded-lg py-2 hover:bg-zinc-800 transition-colors">
                    {f.button}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEO Text Block - 依然包含视频关键词 */}
        <div className="max-w-5xl mx-auto relative">
          <div className="bg-zinc-900/30 backdrop-blur-sm p-8 md:p-14 rounded-[40px] border border-white/5 relative">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {seoTitle}{" "}
                <span className="text-purple-400">{seoHighlight}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-zinc-400 text-sm leading-7">
              <p dangerouslySetInnerHTML={{ __html: seoParagraph1 }} />
              <p dangerouslySetInnerHTML={{ __html: seoParagraph2 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
