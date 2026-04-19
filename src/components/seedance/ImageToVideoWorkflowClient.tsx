"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Copy, Check, Sparkles, Upload } from "lucide-react";

type MotionStrength = "subtle" | "balanced" | "dynamic";
type AspectRatio = "16:9" | "9:16" | "1:1";
type Duration = "5s" | "8s" | "12s";

interface PromptPack {
  masterPrompt: string;
  negativePrompt: string;
  shotList: string[];
  settings: string[];
}

export default function ImageToVideoWorkflowClient() {
  const searchParams = useSearchParams();
  const [subject, setSubject] = useState(
    searchParams.get("subject") || "anime protagonist"
  );
  const [scene, setScene] = useState(
    searchParams.get("scene") || "neon city rooftop at dusk"
  );
  const [styleMood, setStyleMood] = useState("cinematic anime, high detail");
  const [cameraMotion, setCameraMotion] = useState(
    searchParams.get("cameraMotion") || "slow push-in + slight orbit"
  );
  const [motionStrength, setMotionStrength] =
    useState<MotionStrength>("balanced");
  const [duration, setDuration] = useState<Duration>(
    (searchParams.get("duration") as Duration) || "8s"
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(
    (searchParams.get("aspectRatio") as AspectRatio) || "16:9"
  );
  const [goalPlatform, setGoalPlatform] = useState("YouTube Shorts");
  const [seedPrompt, setSeedPrompt] = useState(searchParams.get("seedPrompt") || "");
  const [seedNegativePrompt, setSeedNegativePrompt] = useState(
    searchParams.get("negativePrompt") || ""
  );
  const [referenceImageName, setReferenceImageName] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const promptPack = useMemo<PromptPack>(() => {
    const motionDirective = getMotionDirective(motionStrength);
    const styleChunk = styleMood.trim() || "cinematic anime, clean line art";
    const seedChunk = seedPrompt.trim();

    const masterPrompt = [
      seedChunk,
      `${subject} in ${scene}`,
      styleChunk,
      `${motionDirective}`,
      `camera movement: ${cameraMotion}`,
      "maintain character consistency, coherent frames, cinematic continuity",
    ]
      .filter(Boolean)
      .join(", ");

    const negativePrompt =
      seedNegativePrompt.trim() ||
      "flicker, jitter, face drift, deformed hands, random artifacts, text watermark, abrupt cuts, unstable lighting";

    const shotList = [
      `Shot 1 (setup): Establish ${scene} with ${subject}, gentle environmental motion.`,
      `Shot 2 (focus): Medium shot of ${subject}, emphasize expression and silhouette.`,
      `Shot 3 (payoff): Stronger ${cameraMotion} to highlight climax and visual hook.`,
    ];

    const settings = [
      `Duration: ${duration}`,
      `Aspect Ratio: ${aspectRatio}`,
      `Motion Strength: ${motionStrength}`,
      `Platform Goal: ${goalPlatform}`,
      "Continuity Hint: lock identity traits (hair, outfit, face geometry) across shots.",
    ];

    return {
      masterPrompt,
      negativePrompt,
      shotList,
      settings,
    };
  }, [
    subject,
    scene,
    styleMood,
    cameraMotion,
    motionStrength,
    duration,
    aspectRatio,
    goalPlatform,
    seedPrompt,
    seedNegativePrompt,
  ]);

  const onReferenceImageChange = (file: File | undefined) => {
    if (!file) {
      setReferenceImageName("");
      return;
    }
    setReferenceImageName(file.name);
  };

  const generatePack = () => {
    setHasGenerated(true);
  };

  const copyText = async (content: string, key: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1600);
    } catch (error) {
      console.error("Failed to copy content:", error);
    }
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-8">
      <article className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
        <header>
          <h2 className="text-2xl md:text-3xl font-black text-white">
            Anime Image-to-Video Prompt Pack Builder
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Real function: this page generates a structured Seedance-ready prompt pack.
            It does not render final video in-browser.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Subject"
            value={subject}
            onChange={setSubject}
            placeholder="anime swordswoman"
          />
          <Field
            label="Scene"
            value={scene}
            onChange={setScene}
            placeholder="rainy neon street at night"
          />
        </div>

        <Field
          label="Style / Mood"
          value={styleMood}
          onChange={setStyleMood}
          placeholder="cinematic anime, dramatic rim light"
        />

        <Field
          label="Camera Motion"
          value={cameraMotion}
          onChange={setCameraMotion}
          placeholder="slow push-in + slight orbit"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectField
            label="Motion Strength"
            value={motionStrength}
            onChange={(value) => setMotionStrength(value as MotionStrength)}
            options={[
              { value: "subtle", label: "Subtle" },
              { value: "balanced", label: "Balanced" },
              { value: "dynamic", label: "Dynamic" },
            ]}
          />
          <SelectField
            label="Duration"
            value={duration}
            onChange={(value) => setDuration(value as Duration)}
            options={[
              { value: "5s", label: "5s" },
              { value: "8s", label: "8s" },
              { value: "12s", label: "12s" },
            ]}
          />
          <SelectField
            label="Aspect Ratio"
            value={aspectRatio}
            onChange={(value) => setAspectRatio(value as AspectRatio)}
            options={[
              { value: "16:9", label: "16:9" },
              { value: "9:16", label: "9:16" },
              { value: "1:1", label: "1:1" },
            ]}
          />
        </div>

        <Field
          label="Platform Goal"
          value={goalPlatform}
          onChange={setGoalPlatform}
          placeholder="TikTok ad / Reels / Shorts"
        />

        <details className="bg-black/30 border border-white/10 rounded-xl p-4">
          <summary className="cursor-pointer text-sm font-bold text-zinc-300">
            Advanced Seedance Inputs (optional)
          </summary>
          <div className="space-y-4 mt-4">
            <textarea
              value={seedPrompt}
              onChange={(event) => setSeedPrompt(event.target.value)}
              rows={4}
              placeholder="Paste a base Seedance prompt template..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/50"
            />
            <textarea
              value={seedNegativePrompt}
              onChange={(event) => setSeedNegativePrompt(event.target.value)}
              rows={3}
              placeholder="Paste your negative prompt template..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/50"
            />
          </div>
        </details>

        <label className="block">
          <span className="text-xs font-bold tracking-wider uppercase text-zinc-500">
            Reference Image (optional)
          </span>
          <div className="mt-2 border border-dashed border-white/20 rounded-xl p-4 bg-black/20">
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <Upload className="w-4 h-4" />
              <span>{referenceImageName || "Upload image for context only"}</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => onReferenceImageChange(event.target.files?.[0])}
              className="mt-3 block w-full text-xs text-zinc-400 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border file:border-white/10 file:bg-white/5 file:text-zinc-200 file:cursor-pointer"
            />
          </div>
        </label>

        <button
          type="button"
          onClick={generatePack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Generate Prompt Pack
        </button>
      </article>

      <article className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 space-y-5">
        <header>
          <h3 className="text-xl md:text-2xl font-black text-white">
            Generated Seedance Prompt Pack
          </h3>
          <p className="text-sm text-zinc-400 mt-2">
            Use this output directly in Seedance workflow tools.
          </p>
        </header>

        {!hasGenerated ? (
          <div className="rounded-xl border border-white/10 bg-black/20 p-5 text-sm text-zinc-500">
            Fill your scene inputs and click{" "}
            <strong className="text-zinc-300">Generate Prompt Pack</strong>.
          </div>
        ) : (
          <>
            <PackBlock
              title="Master Prompt"
              value={promptPack.masterPrompt}
              copied={copiedKey === "master"}
              onCopy={() => copyText(promptPack.masterPrompt, "master")}
            />
            <PackBlock
              title="Negative Prompt"
              value={promptPack.negativePrompt}
              copied={copiedKey === "negative"}
              onCopy={() => copyText(promptPack.negativePrompt, "negative")}
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Shot List
                </h4>
                <CopyButton
                  copied={copiedKey === "shots"}
                  onClick={() => copyText(promptPack.shotList.join("\n"), "shots")}
                />
              </div>
              <ol className="space-y-2">
                {promptPack.shotList.map((shot, index) => (
                  <li
                    key={shot}
                    className="bg-black/30 border border-white/5 rounded-lg p-3 text-sm text-zinc-300"
                  >
                    <span className="text-indigo-300 font-semibold mr-2">
                      {index + 1}.
                    </span>
                    {shot}
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Settings
                </h4>
                <CopyButton
                  copied={copiedKey === "settings"}
                  onClick={() =>
                    copyText(promptPack.settings.join("\n"), "settings")
                  }
                />
              </div>
              <ul className="space-y-2">
                {promptPack.settings.map((setting) => (
                  <li
                    key={setting}
                    className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-zinc-300"
                  >
                    {setting}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </article>
    </section>
  );
}

function getMotionDirective(motionStrength: MotionStrength): string {
  if (motionStrength === "subtle") {
    return "subtle motion, stable composition, minimal camera acceleration";
  }
  if (motionStrength === "dynamic") {
    return "dynamic movement, stronger camera energy, action-oriented pacing";
  }
  return "balanced motion, smooth transitions, moderate camera energy";
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold tracking-wider uppercase text-zinc-500">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/50"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold tracking-wider uppercase text-zinc-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 focus:border-indigo-500/50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-zinc-900">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function PackBlock({
  title,
  value,
  copied,
  onCopy,
}: {
  title: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          {title}
        </h4>
        <CopyButton copied={copied} onClick={onCopy} />
      </div>
      <p className="bg-black/30 border border-white/5 rounded-xl p-3 text-sm text-zinc-300 leading-relaxed">
        {value}
      </p>
    </div>
  );
}

function CopyButton({
  copied,
  onClick,
}: {
  copied: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-zinc-300 hover:bg-white/10 transition-colors"
    >
      {copied ? (
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
  );
}
