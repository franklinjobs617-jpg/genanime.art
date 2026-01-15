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
                <div className="w-16 h-16 rounded-3xl bg-[#09090b] flex items-center justify-center border border-white/10 shadow-2xl">
                    <Terminal className="w-6 h-6 text-indigo-500" />
                </div>

                {/* 2. 标题 - 极简，甚至可以不要，这里保留作为引导 */}
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                        What will you imagine?
                    </h3>
                    <p className="text-sm text-zinc-500 font-medium">
                        Type a prompt or try a sample below
                    </p>
                </div>

                {/* 3. 提示词胶囊 (MJ 风格的核心) */}
                <div className="flex flex-wrap justify-center gap-3 w-full">
                    {STARTER_PROMPTS.map((prompt, idx) => (
                        <button
                            key={idx}
                            onClick={() => onUsePrompt(prompt)}
                            className="
                                group relative flex items-center gap-3 px-5 py-3 rounded-2xl
                                bg-[#09090b] border border-white/5
                                hover:bg-white/5 hover:border-white/10 hover:shadow-[0_0_20px_rgba(79,70,229,0.1)]
                                transition-all duration-300 ease-out
                                max-w-full
                            "
                        >
                            {/* 图标：很小，不起眼 */}
                            <ImageIcon className="w-3.5 h-3.5 text-zinc-600 group-hover:text-indigo-400 transition-colors shrink-0" />

                            {/* 文字：使用 mono 字体模仿代码/参数感 */}
                            <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-100 truncate transition-colors">
                                {prompt}
                            </span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}