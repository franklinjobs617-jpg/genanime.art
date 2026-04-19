"use client";

import { useMemo, useState } from "react";
import { Copy, Check, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { SeedancePromptTemplate } from "@/lib/seedancePrompts";
import { SEEDANCE_CATEGORY_LABELS } from "@/lib/seedancePrompts";

interface PromptLibraryClientProps {
  templates: SeedancePromptTemplate[];
}

const CATEGORY_ORDER: SeedancePromptTemplate["category"][] = [
  "opening",
  "action",
  "romance",
  "ad",
  "loop",
];

function buildWorkflowHref(template: SeedancePromptTemplate): string {
  const params = new URLSearchParams({
    seedPrompt: template.prompt,
    negativePrompt: template.negativePrompt,
    cameraMotion: template.camera,
    duration: template.duration,
    aspectRatio: template.aspectRatio,
    templateTitle: template.title,
  });
  return `/anime-image-to-video?${params.toString()}`;
}

export default function PromptLibraryClient({
  templates,
}: PromptLibraryClientProps) {
  const [activeCategory, setActiveCategory] = useState<
    SeedancePromptTemplate["category"] | "all"
  >("all");
  const [query, setQuery] = useState("");
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  const filteredTemplates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return templates.filter((template) => {
      const categoryMatches =
        activeCategory === "all" || template.category === activeCategory;

      if (!normalizedQuery) {
        return categoryMatches;
      }

      const searchableContent = [
        template.title,
        template.category,
        template.useCase,
        template.prompt,
        template.camera,
      ]
        .join(" ")
        .toLowerCase();

      return categoryMatches && searchableContent.includes(normalizedQuery);
    });
  }, [templates, activeCategory, query]);

  const copyPromptPack = async (template: SeedancePromptTemplate) => {
    const pack = [
      `Title: ${template.title}`,
      `Use Case: ${template.useCase}`,
      `Prompt: ${template.prompt}`,
      `Negative Prompt: ${template.negativePrompt}`,
      `Camera Motion: ${template.camera}`,
      `Duration: ${template.duration}`,
      `Aspect Ratio: ${template.aspectRatio}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(pack);
      setCopiedItemId(template.id);
      window.setTimeout(() => setCopiedItemId(null), 1800);
    } catch (error) {
      console.error("Failed to copy prompt pack:", error);
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          <CategoryChip
            label="All"
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {CATEGORY_ORDER.map((category) => (
            <CategoryChip
              key={category}
              label={SEEDANCE_CATEGORY_LABELS[category]}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search prompt title, use case, or style..."
          className="w-full lg:w-[360px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/50"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <article
            key={template.id}
            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                  {SEEDANCE_CATEGORY_LABELS[template.category]}
                </span>
                <h3 className="text-xl font-black text-white mt-3">
                  {template.title}
                </h3>
                <p className="text-sm text-zinc-400 mt-2">{template.useCase}</p>
              </div>

              <button
                type="button"
                onClick={() => copyPromptPack(template)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-xs font-bold hover:bg-white/10 transition-colors"
              >
                {copiedItemId === template.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <PromptBlock label="Prompt" value={template.prompt} />
            <PromptBlock label="Negative Prompt" value={template.negativePrompt} />

            <dl className="grid grid-cols-3 gap-3 text-xs">
              <MetaPill label="Camera" value={template.camera} />
              <MetaPill label="Duration" value={template.duration} />
              <MetaPill label="Aspect" value={template.aspectRatio} />
            </dl>

            <Link
              href={buildWorkflowHref(template)}
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              Use in Anime Image-to-Video Workflow
              <ArrowRight className="w-4 h-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-xs font-bold tracking-wider uppercase border transition-colors ${
        active
          ? "bg-white text-black border-white"
          : "bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:border-white/20"
      }`}
    >
      {label}
    </button>
  );
}

function PromptBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <h4 className="text-[11px] font-bold tracking-wider uppercase text-zinc-500">
        {label}
      </h4>
      <p className="text-sm text-zinc-300 bg-black/30 border border-white/5 rounded-xl p-3 leading-relaxed">
        {value}
      </p>
    </div>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
      <dt className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold mb-1">
        {label}
      </dt>
      <dd className="text-zinc-200 leading-snug">{value}</dd>
    </div>
  );
}
