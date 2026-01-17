"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles } from "lucide-react"

export default function WelcomeGuide() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem("has_visited_generator")
    if (!hasVisited) {
      // Show the notification after a short delay to not interrupt initial load
      const timer = setTimeout(() => {
        setShow(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setShow(false)
    localStorage.setItem("has_visited_generator", "true")
  }

  // Auto-dismiss after 8 seconds if not manually dismissed
  useEffect(() => {
    if (show) {
      const autoDismissTimer = setTimeout(() => {
        setShow(false)
        localStorage.setItem("has_visited_generator", "true")
      }, 8000)

      return () => clearTimeout(autoDismissTimer)
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-32px)] max-w-md z-[9999] pointer-events-auto"
        >
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0">
              <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-white text-sm">Welcome to AI Creation</h3>
                <button
                  onClick={handleDismiss}
                  className="p-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 rounded-full transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-xs text-zinc-400 mt-1.5">
                You have 2 free generations to try. Describe what you want to create and click Generate!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}