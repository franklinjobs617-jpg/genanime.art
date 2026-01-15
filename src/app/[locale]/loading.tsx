export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030305]">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
                </div>

                <div className="flex items-center gap-2 text-white text-xl font-semibold">
                    <span>Loading</span>
                    <div className="flex gap-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce [animation-delay:0.2s]">.</span>
                        <span className="animate-bounce [animation-delay:0.4s]">.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
