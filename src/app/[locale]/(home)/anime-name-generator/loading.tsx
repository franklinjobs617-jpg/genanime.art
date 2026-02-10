export default function Loading() {
  return (
    <div className="min-h-screen bg-[#030305] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="h-12 bg-zinc-800 rounded-lg animate-pulse mb-6 max-w-2xl mx-auto" />
          <div className="h-6 bg-zinc-800 rounded animate-pulse mb-4 max-w-xl mx-auto" />
          <div className="h-6 bg-zinc-800 rounded animate-pulse max-w-lg mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5">
              <div className="h-6 bg-zinc-800 rounded animate-pulse mb-4" />
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-zinc-800 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-zinc-900/50 rounded-xl p-6 border border-white/5">
                  <div className="h-8 bg-zinc-800 rounded animate-pulse mb-3" />
                  <div className="h-4 bg-zinc-800 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}