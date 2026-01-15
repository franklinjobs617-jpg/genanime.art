"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Zap, Gift, LayoutGrid } from "lucide-react";
import React from "react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({
  open,
  onClose,
  onLogin,
}: LoginModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop: High blur for focus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0 }}
              className="pointer-events-auto w-full max-w-[380px]"
            >
              {/* Card Container */}
              <div className="relative bg-[#0C0C0E] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">

                {/* 1. Top Lighting Effect (Ambient Glow) */}
                <div className="absolute top-0 inset-x-0 h-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-2 text-zinc-500 hover:text-zinc-200 transition-colors z-10 hover:bg-white/[0.03] rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative p-6 flex flex-col items-center">

                  {/* 2. Header Section */}
                  <div className="mb-6 flex flex-col items-center text-center space-y-3">
                    <div className="relative w-12 h-12 bg-white/[0.03] border border-white/[0.08] rounded-xl flex items-center justify-center shadow-inner">
                      {/* Glow behind icon */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-xl opacity-50" />
                      <Sparkles className="w-5 h-5 text-zinc-100 relative z-10" strokeWidth={1.5} />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-white tracking-tight">
                        Unlock Pro Features
                      </h2>
                      <p className="text-[13px] text-zinc-400 mt-1">
                        Sign in to continue your creative journey
                      </p>
                    </div>
                  </div>

                  {/* 3. Middle Section: The "Bento" List (Key Improvement) */}
                  <div className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl p-1 mb-6">
                    <BenefitItem
                      icon={<Gift />}
                      title="Monthly Credits"
                      desc="Get 10 free generations"
                    />
                    <div className="h-px bg-white/[0.04] mx-3" /> {/* Divider */}
                    <BenefitItem
                      icon={<Zap />}
                      title="Fast Queue"
                      desc="Priority GPU access"
                    />
                    <div className="h-px bg-white/[0.04] mx-3" /> {/* Divider */}
                    <BenefitItem
                      icon={<LayoutGrid />}
                      title="Personal Gallery"
                      desc="Save and organize artworks"
                    />
                  </div>

                  {/* 4. Action Button */}
                  <button
                    onClick={() => {
                      onLogin();
                      onClose();
                    }}
                    className="group w-full flex items-center justify-center gap-3 bg-white hover:bg-[#F2F2F2] text-black font-medium h-10 rounded-lg transition-all duration-200 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.4)] active:scale-[0.98]"
                  >
                    <GoogleIcon className="w-4 h-4" />
                    <span className="text-sm">Continue with Google</span>
                  </button>

                  <p className="mt-4 text-[10px] text-zinc-600 text-center">
                    Secure authentication via Google Workspace
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Improved Benefit Item Component
function BenefitItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4 p-3 hover:bg-white/[0.04] rounded-lg transition-colors group cursor-default">
      {/* Icon - Simplified without box background */}
      <div className="text-zinc-500 group-hover:text-purple-400 transition-colors">
        {React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5" })
          : icon}
      </div>

      {/* Text Content */}
      <div className="flex flex-col text-left">
        <span className="text-[13px] font-medium text-zinc-200 group-hover:text-white transition-colors">
          {title}
        </span>
        <span className="text-[11px] text-zinc-500 group-hover:text-zinc-400 transition-colors">
          {desc}
        </span>
      </div>
    </div>
  );
}

// Google Logo SVG
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}