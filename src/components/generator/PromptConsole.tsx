"use client";

import {
  Sparkles,
  Coins,
  ImagePlus,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface PromptConsoleProps {
  activePrompt: string;
  setActivePrompt: (val: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  credits: number;
  activeQuantity: number;
  canGenerate: boolean;
  isGuest: boolean;
  remainingGuestGenerations: number;
}

export default function PromptConsole({
  activePrompt,
  setActivePrompt,
  isGenerating,
  onGenerate,
  credits,
  activeQuantity,
  canGenerate,
  isGuest,
  remainingGuestGenerations,
}: PromptConsoleProps) {
  const costPerImage = 2;
  const totalCost = costPerImage * activeQuantity;
  const isInsufficient = !isGuest && credits < totalCost;

  const chips = [
    "ultra-detailed eyes",
    "cinematic lighting",
    "dreamy bokeh",
    "bold outlines",
    "pastel palette",
    "dynamic perspective",
    "neon reflections",
    "painterly textures",
  ];
  const appendChip = (text: string) => {
    const sep = activePrompt.trim().length ? ", " : "";
    setActivePrompt(`${activePrompt}${sep}${text}`);
  };

  return (
    <div className="w-full space-y-3">
      <div
        className={`bg-zinc-900/50 backdrop-blur-xl border transition-all duration-300 rounded-3xl overflow-hidden ${
          isInsufficient
            ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
            : "border-white/5"
        }`}
      >
        <div className="p-6">
          <textarea
            value={activePrompt}
            onChange={(e) => setActivePrompt(e.target.value)}
            placeholder="An ethereal anime girl under sakura petals, vibrant colors, 8k..."
            rows={3}
            className="w-full bg-transparent text-lg text-zinc-100 placeholder:text-zinc-600 resize-none outline-none leading-relaxed font-medium"
          />
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <button className="text-zinc-500 hover:text-indigo-400 transition-colors">
              <ImagePlus className="w-5 h-5" />
            </button>
            <button className="text-zinc-500 hover:text-indigo-400 transition-colors">
              <Sparkles className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <AnimatePresence>
              {isInsufficient && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-red-400"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Low Credits
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={onGenerate}
              disabled={isGenerating || !activePrompt.trim()}
              className={`group flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                isInsufficient
                  ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20 active:scale-95"
              }`}
            >
              {isGenerating ? "Casting..." : "Generate"}
              <div className="flex items-center gap-1.5 pl-3 border-l border-white/20">
                <Coins
                  className={`w-3.5 h-3.5 ${
                    isInsufficient ? "text-zinc-600" : "text-amber-400"
                  }`}
                />
                <span>{isGuest ? "Free" : totalCost}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 底部提示区 */}
      <div className="flex justify-center h-6">
        {isInsufficient ? (
          <Link
            href="/pricing"
            className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-[0.2em] group"
          >
            Top up to continue{" "}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          isGuest && (
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
              {remainingGuestGenerations} free credits remaining
            </p>
          )
        )}
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => appendChip(c)}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              + {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
