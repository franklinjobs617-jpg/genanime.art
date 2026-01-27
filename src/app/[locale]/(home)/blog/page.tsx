import { Link } from "@/i18n/routing";
import { Calendar, BookOpen, Sparkles } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Mastering Anime AI Without an RTX 8090",
    excerpt: "Stop waiting for next-gen GPUs. Learn how to generate top-tier anime art using professional workflows and cloud acceleration.",
    date: "Jan 25, 2026",
    readTime: "15 min read",
    category: "AI Guide",
    slug: "/blog/how-to-make-anime-art-ai-rtx-8090-guide"
  },
  {
    id: 2,
    title: "How to Reverse Engineer Anime Prompts from Images",
    excerpt: "Learn the techniques to extract high-quality prompts from existing anime images to recreate similar styles and compositions.",
    date: "Jan 19, 2026",
    readTime: "12 min read",
    category: "Tutorial",
    slug: "/image-to-prompt"
  },
  {
    id: 4,
    title: "AI Ad Backgrounds: Scaling Luxury Brand Assets",
    excerpt: "How enterprise brands are using generative anime backgrounds to drive 2.4x higher conversion rates in digital advertising.",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    category: "Enterprise",
    slug: "/ai-ad-background-anime"
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#020204] text-zinc-200 font-sans pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" />
            Anime AI Insights
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Anime AI</span> Guides
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Expert tips, tutorials, and insights on creating stunning anime art with AI technology.
            Stay updated with the latest trends and techniques in anime generation.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <Link
              href={post.slug}
              key={post.id}
              className="group bg-[#0A0A0C] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-zinc-500 text-sm ml-auto">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-black text-white mb-4 group-hover:text-indigo-300 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-zinc-400 mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-500 text-sm">
                    <BookOpen className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="text-indigo-400 group-hover:translate-x-2 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* More posts section if we had more */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-white/10 transition-all">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}