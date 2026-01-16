"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check, ChevronDown } from "lucide-react";

const languages = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "es", label: "Español" },
];

export default function LanguageSwitcher({ isMobile = false }: { isMobile?: boolean }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const onSelectChange = (nextLocale: string) => {
        setIsOpen(false);
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    const currentLabel = languages.find((lang) => lang.code === locale)?.label || "English";

    if (isMobile) {
        return (
            <div className="w-full mt-4 border-t border-white/5 pt-4">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3 px-2">
                    Language
                </p>
                <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => onSelectChange(lang.code)}
                            disabled={isPending}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${locale === lang.code
                                ? "bg-white text-black border-white"
                                : "bg-zinc-900/50 text-zinc-400 border-white/5 hover:bg-zinc-800"
                                }`}
                        >
                            <span>{lang.label}</span>
                            {locale === lang.code && <Check className="w-3.5 h-3.5" />}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors group"
            >
                <div className="p-1.5 bg-zinc-800 rounded-full text-zinc-400 group-hover:text-white transition-colors border border-white/5">
                    <Globe className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors uppercase tracking-wide">
                    {locale}
                </span>
                <ChevronDown
                    className={`w-3 h-3 text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-[#0a0a0c] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[80]"
                    >
                        <div className="p-1.5 space-y-0.5">
                            <div className="px-2 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                                Select Language
                            </div>
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => onSelectChange(lang.code)}
                                    className={`w-full flex items-center justify-between px-2 py-2 text-xs rounded-lg transition-colors ${locale === lang.code
                                        ? "bg-white/10 text-white font-medium"
                                        : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                                        }`}
                                >
                                    <span>{lang.label}</span>
                                    {locale === lang.code && <Check className="w-3 h-3 text-white" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
