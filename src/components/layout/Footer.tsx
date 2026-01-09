import Link from "next/link";
import { Github, Twitter, MessageSquare, Sparkles, Send } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "AI Generator", href: "/generator" },
      { name: "Community Gallery", href: "/gallery" },
      { name: "Pricing Plans", href: "/pricing" },
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "How to make Anime Art", href: "/blog/how-to-make-anime-art-ai-rtx-8090-guide" },
      { name: "FAQ", href: "/faq" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ]
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 text-zinc-400 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* 1. Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-black text-white italic group">
              Anime<span className="text-indigo-500 font-black not-italic">AI</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-zinc-500 font-medium">
              The world's most advanced AI anime art generator. Create stunning high-fidelity illustrations, characters, and wallpapers in seconds using state-of-the-art cloud H100 clusters.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Github className="w-4 h-4" />} />
              <SocialLink href="#" icon={<MessageSquare className="w-4 h-4" />} />
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">Tools</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 col-span-2 md:col-span-1">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs font-bold uppercase tracking-widest text-zinc-600">
            &copy; {currentYear} AnimeAI Lab. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-600">
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
            <div className="flex items-center gap-2 text-indigo-500/50">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Service Online
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-zinc-500 hover:text-white hover:translate-x-1 transition-all inline-block"
    >
      {children}
    </Link>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all shadow-lg shadow-black/20"
    >
      {icon}
    </a>
  );
}