"use client"

import { Sparkles, Coins, ImagePlus } from "lucide-react"

interface PromptConsoleProps {
  activePrompt: string
  setActivePrompt: (val: string) => void
  isGenerating: boolean
  handleGenerate: () => Promise<boolean>
  credits: number
  activeQuantity: number
  canGenerate: boolean
  isGuest: boolean
  remainingGuestGenerations: number
  onLoginRequired: () => void
}

export default function PromptConsole({
  activePrompt,
  setActivePrompt,
  isGenerating,
  handleGenerate,
  activeQuantity,
  canGenerate,
  isGuest,
  remainingGuestGenerations,
  onLoginRequired,
}: PromptConsoleProps) {
  const costPerImage = 30
  const totalCost = costPerImage * activeQuantity

  const onGenerate = () => {
    if (!canGenerate && isGuest) {
      onLoginRequired()
      return
    }
    handleGenerate()
  }

  return (
    <div className="w-full">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {/* Textarea */}
        <div className="p-4">
          <textarea
            value={activePrompt}
            onChange={(e) => setActivePrompt(e.target.value)}
            placeholder="Describe what you want to create..."
            rows={3}
            className="w-full bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 resize-none outline-none leading-relaxed"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isGenerating) {
                e.preventDefault()
                onGenerate()
              }
            }}
          />
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <button className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors">
              <ImagePlus className="w-5 h-5" />
            </button>
            <button className="p-2 text-zinc-500 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors">
              <Sparkles className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={onGenerate}
            disabled={isGenerating || !activePrompt.trim()}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 disabled:text-zinc-500 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="hidden sm:inline">Generating...</span>
              </>
            ) : (
              <>
                Generate
                <div className="flex items-center gap-1 pl-2 border-l border-white/20">
                  <Coins className="w-3.5 h-3.5" />
                  <span>{isGuest && remainingGuestGenerations > 0 ? "Free" : totalCost}</span>
                </div>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Guest hint */}
      {isGuest && remainingGuestGenerations > 0 && (
        <p className="text-xs text-zinc-500 mt-2 text-center">
          {remainingGuestGenerations} free generation{remainingGuestGenerations !== 1 ? "s" : ""} remaining
        </p>
      )}
    </div>
  )
}
