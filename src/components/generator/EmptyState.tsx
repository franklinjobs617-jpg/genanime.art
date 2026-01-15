"use client";

import { Terminal, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
    onUsePrompt: (prompt: string) => void;
}

const STARTER_PROMPTS = [
    "hyper-realistic portrait of a cyberpunk samurai, neon rain --ar 16:9",
    "minimalist vector logo of a fox, flat design, orange and white",
    "studio ghibli style, cozy cottage in forest, summer noon --niji 6",
    "isometric 3d render of a gaming room setup, blender, clay material"
];

export default function EmptyState({ onUsePrompt }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl flex flex-col items-center gap-8"
            >
                {/* 1. 极其克制的图标展示 - 类似 Discord/Terminal 的感觉 */}
                <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50">
                    <Terminal className="w-6 h-6 text-zinc-400" />
                </div>

                {/* 2. 标题 - 极简，甚至可以不要，这里保留作为引导 */}
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-medium text-zinc-200">
                        What will you imagine?
                    </h3>
                    <p className="text-sm text-zinc-500">
                        Type /imagine or select a sample below
                    </p>
                </div>

                {/* 3. 提示词胶囊 (MJ 风格的核心) */}
                <div className="flex flex-wrap justify-center gap-2.5 w-full">
                    {STARTER_PROMPTS.map((prompt, idx) => (
                        <button
                            key={idx}
                            onClick={() => onUsePrompt(prompt)}
                            className="
                                group relative flex items-center gap-3 px-4 py-2.5 rounded-full
                                bg-zinc-900 border border-zinc-800
                                hover:bg-zinc-800 hover:border-zinc-600 hover:text-white
                                transition-all duration-200 ease-out
                                max-w-full
                            "
                        >
                            {/* 图标：很小，不起眼 */}
                            <ImageIcon className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />

                            {/* 文字：使用 mono 字体模仿代码/参数感 */}
                            <span className="text-[13px] font-mono text-zinc-400 group-hover:text-zinc-200 truncate transition-colors">
                                {prompt}
                            </span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}