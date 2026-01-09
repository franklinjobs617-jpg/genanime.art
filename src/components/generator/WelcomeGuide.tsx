"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, ArrowRight } from "lucide-react"

export default function WelcomeGuide() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem("has_visited_generator")
    if (!hasVisited) {
      setShow(true)
    }
  }, [])

  const handleDismiss = () => {
    setShow(false)
    localStorage.setItem("has_visited_generator", "true")
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={handleDismiss}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-sm"
          >
            <div className="relative bg-zinc-900 border border-zinc-800 text-white p-6 rounded-2xl shadow-2xl">
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 bg-purple-600/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">Welcome to AI Creation</h3>
                  <p className="text-xs text-zinc-500">Create amazing anime art</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Step number={1} text="Choose your style from the sidebar" />
                <Step number={2} text="Describe what you want to create" />
                <Step number={3} text="Click Generate and enjoy" />
              </div>

              <button
                onClick={handleDismiss}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-zinc-500 text-center mt-4">You have 2 free generations to try</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 bg-zinc-800 rounded-lg flex items-center justify-center text-xs font-medium text-zinc-400">
        {number}
      </div>
      <p className="text-sm text-zinc-400">{text}</p>
    </div>
  )
}
