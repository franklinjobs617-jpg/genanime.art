"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import {
  Menu,
  X,
  LogOut,
  User as UserIcon,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import LanguageSwitcher from "./LanguageSwitcher";

import { useTranslations } from "next-intl";

export default function Header() {
  const { user, isLoading, login, logout } = useAuth();
  const { theme } = useTheme();
  const t = useTranslations("Navigation");

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("generator"), href: "/generator" },
    { name: t("voiceChanger"), href: "/tools/anime-voice-changer" },
    { name: t("pricing"), href: "/pricing" },
    { name: t("blog"), href: "/blog" },

    {
      name: t("promptLibrary"),
      href: "/prompt-library",
    },
    {
      name: t("aiGuide"),
      href: "/blog/how-to-make-anime-art-ai-rtx-8090-guide",
    },
    {
      name: t("howToExtract"),
      href: "/how-to-reverse-image-to-prompt-anime-guide",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ease-in-out ${
        isScrolled || isMobileMenuOpen
          ? "bg-[#050505]/90 backdrop-blur-xl py-3 shadow-lg shadow-black/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-white tracking-tight group relative z-[70]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="group-hover:opacity-80 transition-opacity">
            Anime<span className="text-indigo-400 font-black">AI</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                isScrolled
                  ? "text-zinc-400 hover:text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:gap-6 relative z-[70]">
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse border border-white/10"></div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/pricing"
                  className="px-3 py-1.5 bg-zinc-900 rounded-full text-xs font-bold text-zinc-300 border border-white/10 select-none hover:bg-zinc-800 transition-colors"
                >
                  {user.credits} Credits
                </Link>

                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none group p-1 rounded-full transition-colors hover:bg-white/5"
                  >
                    <UserAvatar user={user} />
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-[#111] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
                          <p className="text-sm font-semibold text-white truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-zinc-500 truncate mt-0.5">
                            {user.email}
                          </p>
                        </div>
                        <div className="p-2 space-y-1">
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg"
                          >
                            <UserIcon className="w-4 h-4" /> My Profile
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg"
                          >
                            <Settings className="w-4 h-4" /> Settings
                          </Link>
                        </div>
                        <div className="p-2 border-t border-zinc-800">
                          <button
                            onClick={() => {
                              logout();
                              setIsDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg"
                          >
                            <LogOut className="w-4 h-4" /> Log out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <button
                onClick={login}
                className="text-sm font-bold bg-white text-black px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-all"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Actions - 按钮始终在最上层 */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7 text-indigo-400" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#050505] z-[55] flex flex-col p-6 pt-28 h-[100dvh]"
          >
            {/* 装饰性背景 */}
            <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

            <nav className="flex flex-col gap-2 relative z-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xl md:text-2xl font-black italic text-zinc-300 py-4 border-b border-white/5 hover:text-white transition-all flex justify-between items-center group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="truncate pr-4">{link.name}</span>
                  <ChevronDown className="w-5 h-5 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="mt-8">
                {user ? (
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <UserAvatar user={user} size="large" />
                      <div className="overflow-hidden">
                        <div className="text-white font-bold text-lg truncate">
                          {user.name}
                        </div>
                        <div className="text-sm text-zinc-500 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/pricing"
                      className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 hover:bg-black/60 transition-colors"
                    >
                      <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
                        Balance
                      </span>
                      <span className="text-indigo-400 font-black">
                        {user.credits} Credits
                      </span>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-4 bg-zinc-800 hover:bg-red-500/10 hover:text-red-400 text-white rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 border border-white/5"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      login();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-5 bg-white text-black rounded-2xl font-black text-xl text-center shadow-xl active:scale-95 transition-transform"
                  >
                    Login with Google
                  </button>
                )}
              </div>

              {/* Mobile Language Switcher */}
              <LanguageSwitcher isMobile={true} />
            </nav>

            {/* 底部版权或简单信息 */}
            <div className="mt-auto text-center pb-8 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
              © 2026 AnimeAI Labs
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// 头像组件
function UserAvatar({
  user,
  size = "small",
}: {
  user: any;
  size?: "small" | "large";
}) {
  const [imgError, setImgError] = useState(false);
  useEffect(() => {
    setImgError(false);
  }, [user.picture]);

  const sizeClasses = size === "small" ? "w-9 h-9" : "w-16 h-16";
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div
      className={`${sizeClasses} rounded-full overflow-hidden border border-white/20 relative flex-shrink-0 bg-zinc-800 shadow-lg shadow-black/20`}
    >
      {user.picture && !imgError ? (
        <img
          src={user.picture}
          alt={user.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black">
          {initial}
        </div>
      )}
    </div>
  );
}
