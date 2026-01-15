"use client";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020203]">
            <div className="flex flex-col items-center">

                <div className="relative w-16 h-16">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/50 blur-sm rounded-[100%] animate-[shadow_0.6s_infinite_alternate]" />

                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.5)] animate-[bounce-slime_0.6s_infinite_alternate]">
                        <div className="absolute top-4 left-3 w-1.5 h-3 bg-white rounded-full opacity-80" />
                        <div className="absolute top-4 right-3 w-1.5 h-3 bg-white rounded-full opacity-80" />
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm font-bold text-white tracking-widest">LOADING</p>
                    <p className="text-[10px] text-zinc-500 mt-1 font-mono">Preparing your canvas...</p>
                </div>
            </div>

            {/* CSS 动画定义 */}
            <style jsx>{`
                @keyframes bounce-slime {
                    0% { transform: translateY(0) scale(1.1, 0.9); }
                    100% { transform: translateY(-20px) scale(0.9, 1.1); }
                }
                @keyframes shadow {
                    0% { transform: translateX(-50%) scale(1); opacity: 0.8; }
                    100% { transform: translateX(-50%) scale(0.5); opacity: 0.3; }
                }
            `}</style>
        </div>
    );
}