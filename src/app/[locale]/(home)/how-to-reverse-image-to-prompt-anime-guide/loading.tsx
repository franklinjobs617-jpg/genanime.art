export default function Loading() {
  return (
    <div className="min-h-screen bg-[#020203] text-zinc-300">
      {/* Header skeleton */}
      <header className="relative w-full py-28 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
            <div className="w-3 h-3 bg-purple-400/50 rounded animate-pulse" />
            <div className="w-24 h-3 bg-purple-400/30 rounded animate-pulse" />
          </div>
          <div className="space-y-4 mb-8">
            <div className="h-16 bg-white/10 rounded-lg animate-pulse mx-auto max-w-4xl" />
            <div className="h-12 bg-white/5 rounded-lg animate-pulse mx-auto max-w-3xl" />
          </div>
          <div className="h-6 bg-zinc-400/20 rounded animate-pulse mx-auto max-w-2xl mb-8" />
          <div className="flex items-center justify-center gap-6">
            <div className="w-20 h-4 bg-zinc-500/30 rounded animate-pulse" />
            <div className="w-1 h-1 bg-zinc-700 rounded-full" />
            <div className="w-16 h-4 bg-zinc-500/30 rounded animate-pulse" />
            <div className="w-1 h-1 bg-zinc-700 rounded-full" />
            <div className="w-20 h-4 bg-zinc-500/30 rounded animate-pulse" />
          </div>
        </div>
      </header>

      {/* Content skeleton */}
      <main className="max-w-4xl mx-auto px-6">
        <div className="space-y-8">
          <div className="h-32 bg-zinc-900/50 rounded-3xl animate-pulse" />
          <div className="h-64 bg-zinc-900/30 rounded-3xl animate-pulse" />
          <div className="grid gap-4">
            <div className="h-8 bg-zinc-800/50 rounded animate-pulse" />
            <div className="h-6 bg-zinc-800/30 rounded animate-pulse" />
            <div className="h-6 bg-zinc-800/30 rounded animate-pulse w-3/4" />
          </div>
        </div>
      </main>
    </div>
  );
}