"use client";

import { motion } from "framer-motion";

export default function LoadingSkeleton() {
    return (
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-black/40 border border-white/5 group">

            {/* 1. 动态扫描光束 (Scanning Beam) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-500/10 to-transparent translate-y-[-100%] animate-[scan_2.5s_ease-in-out_infinite]" />

            {/* 2. 核心呼吸光晕 (Breathing Core) */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-indigo-500/20 rounded-full blur-[60px] animate-pulse" />
            </div>

            {/* 3. 科技感网格背景 (Grid) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* 4. 中心状态文字 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <motion.div
                    initial={{ opacity: 0.5, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    className="flex flex-col items-center gap-3"
                >
                    {/* 一个极简的跳动 Logo 或 形状 */}
                    <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ height: [10, 24, 10] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="w-1.5 bg-indigo-400/80 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.5)]"
                            />
                        ))}
                    </div>

                    <span className="text-xs font-medium text-indigo-200/80 tracking-widest uppercase mt-2">
                        Creating Art
                    </span>
                </motion.div>
            </div>

            {/* 5. 底部隐形进度条 */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                />
            </div>

            {/* 需要在 tailwind.config.js 中添加 keyframes: scan */}
            <style jsx global>{`
                @keyframes scan {
                    0% { transform: translateY(-100%) rotate(45deg); }
                    100% { transform: translateY(200%) rotate(45deg); }
                }
            `}</style>
        </div>
    );
}