"use client";

import { Crown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface WatermarkNoticeProps {
  onUpgrade: () => void;
}

export default function WatermarkNotice({ onUpgrade }: WatermarkNoticeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 p-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-amber-200 mb-1">
            Watermark Added
          </p>
          <p className="text-xs text-amber-300/80">
            Upgrade to Pro for clean, watermark-free images
          </p>
        </div>
        <button
          onClick={onUpgrade}
          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold rounded-lg transition-colors"
        >
          <Crown className="w-3 h-3 inline mr-1" />
          Remove
        </button>
      </div>
    </motion.div>
  );
}