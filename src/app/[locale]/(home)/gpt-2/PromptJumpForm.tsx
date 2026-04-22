"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "@/i18n/routing";

const QUICK_PROMPTS = [
  "cinematic hero poster, centered subject, dramatic rim light, premium campaign quality",
  "clean multilingual product ad with readable typography and high contrast composition",
  "anime editorial cover, controlled palette, fashion lighting, magazine-grade framing",
  "social launch visual set, cohesive style, strong foreground separation, ad-ready result",
  "minimal startup campaign banner, sharp title text, branded accent glow, conversion focus",
];

export default function PromptJumpForm() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedPrompt = prompt.trim();
    if (normalizedPrompt) {
      router.push(`/generator?prompt=${encodeURIComponent(normalizedPrompt)}`);
      return;
    }
    router.push("/generator");
  };

  const handleRandomPrompt = () => {
    const randomPrompt =
      QUICK_PROMPTS[Math.floor(Math.random() * QUICK_PROMPTS.length)];
    setPrompt(randomPrompt);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full rounded-3xl border border-white/10 bg-[#08090d]/88 p-4 shadow-[0_24px_44px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-5"
    >
      <textarea
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Describe any visual idea for ChatGPT Images 2.0 and GPT image 2. We will generate a campaign-ready image."
        rows={3}
        className="w-full resize-none rounded-2xl border border-white/10 bg-[#06070c]/65 px-4 py-3 text-base leading-relaxed text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-indigo-400/50"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleRandomPrompt}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-zinc-200 transition hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white"
        >
          <Sparkles className="h-4 w-4 text-indigo-300" />
          Random prompt
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          Generate
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
