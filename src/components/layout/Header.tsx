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
import LanguageSwitcher from "./LanguageSwitcher";

import { useTranslations } from "next-intl";

export default function Header() {
  const { user, isLoading, login, logout } = useAuth();
  const t = useTranslations("Navigation");

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSeedanceOpen, setIsSeedanceOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const seedanceRef = useRef<HTMLDivElement>(null);

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
      if (
        seedanceRef.current &&
        !seedanceRef.current.contains(event.target as Node)
      ) {
        setIsSeedanceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainLinks = [
    { name: t("home"), href: "/" },
    { name: t("generator"), href: "/generator" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("pricing"), href: "/pricing" },
  ];

  const seedanceLinks = [
    { name: "Seedance Hub", href: "/seedance" },
    { name: "Seedance Prompts", href: "/seedance-anime-prompts" },
    { name: "Anime Image to Video", href: "/anime-image-to-video" },
  ];

  const mobileHeaderClasses = isMobileMenuOpen
    ? "bg-[#050505] border-b border-white/10 lg:bg-transparent lg:border-transparent"
    : "bg-[#050505]/88 backdrop-blur-xl border-b border-white/10 lg:bg-transparent lg:backdrop-blur-none lg:border-transparent";

  const desktopHeaderClasses =
    isScrolled || isMobileMenuOpen
      ? "lg:bg-[#090b13]/45 lg:backdrop-blur-md lg:py-3 lg:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      : "lg:bg-transparent lg:py-5";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[120] h-16 lg:h-auto py-0 transition-all duration-300 ease-in-out ${mobileHeaderClasses} ${desktopHeaderClasses}`}
    >
      <div className="container mx-auto h-full lg:h-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg sm:text-xl font-bold text-white tracking-tight group relative z-[130]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="group-hover:opacity-80 transition-opacity">
            Anime<span className="text-indigo-400 font-black">AI</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-xl">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                isScrolled
                  ? "text-zinc-300 hover:text-white"
                  : "text-white/85 hover:text-white"
              }`}
              onClick={() => setIsSeedanceOpen(false)}
            >
              <span className="px-3 py-2 rounded-full hover:bg-white/10 transition-colors inline-flex">
                {link.name}
              </span>
            </Link>
          ))}

          <div className="relative" ref={seedanceRef}>
            <button
              type="button"
              onClick={() => setIsSeedanceOpen((prev) => !prev)}
              className="text-sm font-semibold text-white"
            >
              <span className="px-3.5 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 hover:bg-indigo-500/30 transition-colors inline-flex items-center gap-1.5">
                Seedance
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${isSeedanceOpen ? "rotate-180" : ""}`}
                />
              </span>
            </button>

            <AnimatePresence>
              {isSeedanceOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-[#101012] border border-zinc-800 rounded-2xl shadow-2xl p-2 z-[90]"
                >
                  {seedanceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                      onClick={() => setIsSeedanceOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-3 lg:gap-6 relative z-[130]">
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

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors border border-white/10 bg-white/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-indigo-300" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full h-[calc(100dvh-4rem)] z-[110] lg:hidden bg-[#060608] border-t border-white/10"
          >
            <div className="absolute top-[-20%] right-[-12%] w-[280px] h-[280px] bg-indigo-600/15 blur-[110px] rounded-full pointer-events-none" />
            <div className="h-full min-h-0 overflow-y-auto px-5 py-5 pb-[calc(env(safe-area-inset-bottom)+20px)] space-y-6">
              <nav className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 px-1 pb-1">
                  Main
                </div>
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-base font-semibold text-zinc-100 hover:bg-white/10 transition-colors flex items-center justify-between"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="truncate pr-4">{link.name}</span>
                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-70 flex-shrink-0" />
                  </Link>
                ))}
              </nav>

              <nav className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 px-1 pb-1">
                  Seedance
                </div>
                {seedanceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/10 transition-colors flex items-center justify-between"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="truncate pr-4">{link.name}</span>
                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-60 flex-shrink-0" />
                  </Link>
                ))}
              </nav>

              <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-5">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={user} />
                      <div className="overflow-hidden">
                        <div className="text-white font-semibold text-sm truncate">
                          {user.name}
                        </div>
                        <div className="text-xs text-zinc-500 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/pricing"
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-zinc-400">Credits</span>
                      <span className="text-indigo-300 font-bold">{user.credits}</span>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-zinc-200 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center justify-center gap-2"
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
                    className="w-full rounded-xl bg-white text-black px-4 py-3.5 text-sm font-bold hover:bg-zinc-200 transition-colors"
                  >
                    Login with Google
                  </button>
                )}
              </div>

              <LanguageSwitcher isMobile={true} />

              <div className="pt-2 text-center text-zinc-600 text-[10px] font-semibold tracking-wider">
                © 2026 AnimeAI Labs
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// 头像组件
interface HeaderUser {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  credits?: string | number;
}

function UserAvatar({
  user,
  size = "small",
}: {
  user: HeaderUser;
  size?: "small" | "large";
}) {
  const [failedImageSources, setFailedImageSources] = useState<
    Record<string, boolean>
  >({});
  const pictureSource = user.picture || "";
  const hasImageError = pictureSource ? failedImageSources[pictureSource] : false;

  const sizeClasses = size === "small" ? "w-9 h-9" : "w-16 h-16";
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div
      className={`${sizeClasses} rounded-full overflow-hidden border border-white/20 relative flex-shrink-0 bg-zinc-800 shadow-lg shadow-black/20`}
    >
      {pictureSource && !hasImageError ? (
        <img
          src={pictureSource}
          alt={user.name ?? "User avatar"}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={() =>
            setFailedImageSources((previous) => ({
              ...previous,
              [pictureSource]: true,
            }))
          }
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black">
          {initial}
        </div>
      )}
    </div>
  );
}
