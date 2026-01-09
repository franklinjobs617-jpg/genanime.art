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

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* 背景遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            onClick={handleDismiss}
          />

          {/* 弹窗主体 */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              // 关键修改：
              // 1. pointer-events-auto: 恢复点击事件（因为父级禁用了）
              // 2. w-[calc(100%-32px)]: 保证移动端左右留出边距
              // 3. max-h-[85vh]: 防止高度超出屏幕
              // 4. overflow-y-auto: 内容过多时可滚动
              className="pointer-events-auto relative w-[calc(100%-32px)] max-w-sm max-h-[85vh] overflow-y-auto rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl scrollbar-hide"
              onClick={handleContentClick}
            >
              <div className="p-5 md:p-6 text-white">
                {/* 关闭按钮 */}
                <button
                  onClick={handleDismiss}
                  className="absolute top-3 right-3 p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-full transition-colors touch-manipulation"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* 标题区域 */}
                <div className="flex items-center gap-3 mb-5 pr-8">
                  <div className="w-10 h-10 md:w-11 md:h-11 bg-purple-600/20 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Welcome to AI Creation</h3>
                    <p className="text-xs text-zinc-500">Create amazing anime art</p>
                  </div>
                </div>

                {/* 步骤列表 */}
                <div className="space-y-3 mb-6">
                  <Step number={1} text="Choose your style from the sidebar" />
                  <Step number={2} text="Describe what you want to create" />
                  <Step number={3} text="Click Generate and enjoy" />
                </div>

                {/* 开始按钮 */}
                <button
                  onClick={handleDismiss}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl transition-colors active:scale-[0.98]"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-xs text-zinc-500 text-center mt-4 pb-1">
                  You have 2 free generations to try
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 bg-zinc-800 rounded-lg flex items-center justify-center text-xs font-medium text-zinc-400 shrink-0 mt-0.5">
        {number}
      </div>
      <p className="text-sm text-zinc-400 leading-tight">{text}</p>
    </div>
  )
}