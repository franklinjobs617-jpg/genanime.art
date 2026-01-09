"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, LogIn } from "lucide-react";

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
  const handleLogin = () => {
    onLogin();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-sm"
          >
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-purple-400" />
                </div>

                <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                  Free Trial Ended
                </h3>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  You've used your 2 free generations. Sign in to continue
                  creating amazing anime art with more credits.
                </p>

                <button
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-zinc-100 text-zinc-900 font-medium rounded-xl transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Sign in with Google
                </button>

                <p className="text-xs text-zinc-600 mt-4">
                  New users get 100 free credits
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
