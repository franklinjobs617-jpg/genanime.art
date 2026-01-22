"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight, Sparkles } from "lucide-react";

interface QuickGeneratorInputProps {
  placeholder?: string;
  defaultStyle?: string;
  buttonText?: string;
  className?: string;
}

export default function QuickGeneratorInput({ 
  placeholder = "Descreva sua imagem...", 
  defaultStyle = "Vibrant Anime",
  buttonText = "Criar",
  className = ""
}: QuickGeneratorInputProps) {
  const [prompt, setPrompt] = useState("");

  return (
    <div className={`flex w-full bg-zinc-900/80 backdrop-blur border border-white/10 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all shadow-xl ${className}`}>
      <input 
        type="text" 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none text-white placeholder-zinc-500 px-4 focus:outline-none min-w-0"
      />
      <Link 
         href={`/generator?prompt=${encodeURIComponent(prompt)}&style=${encodeURIComponent(defaultStyle)}`}
         className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap"
      >
         {buttonText} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
