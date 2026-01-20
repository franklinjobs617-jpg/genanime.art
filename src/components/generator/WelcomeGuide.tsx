"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react"; // 确保你已经安装了 lucide-react

export default function WelcomeGuide() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 检查 localStorage 中是否有标记，如果访问过则不显示
    const hasVisited = localStorage.getItem("has_visited_generator");
    if (!hasVisited) {
      // 延迟显示通知，避免打断初始加载
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000); // 1秒后显示

      return () => clearTimeout(timer); // 清理定时器
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    // 用户手动关闭后，设置标记，下次不再显示
    localStorage.setItem("has_visited_generator", "true");
  };

  // 如果没有手动关闭，则8秒后自动关闭
  useEffect(() => {
    if (show) {
      const autoDismissTimer = setTimeout(() => {
        setShow(false);
        localStorage.setItem("has_visited_generator", "true");
      }, 8000); // 8秒后自动关闭

      return () => clearTimeout(autoDismissTimer); // 清理定时器
    }
  }, [show]); // 依赖 `show` 状态

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          // 关键的 CSS 修改在这里：
          // - 移除 `left-1/2 transform -translate-x-1/2`
          // - 添加 `mx-auto` 实现水平居中
          // - 添加 `px-4` 作为外部水平边距，确保在小屏幕上有足够的间距
          // - `w-auto` 让宽度自适应，由 `max-w` 限制
          className="fixed top-4 mx-auto w-auto max-w-full sm:max-w-md z-[9999] pointer-events-auto px-4"
        >
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-3 sm:p-4 flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0">
              <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-white text-sm truncate">
                  Welcome to AI Creation
                </h3>
                <button
                  onClick={handleDismiss}
                  className="p-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 rounded-full transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-zinc-400 mt-1 sm:mt-1.5 break-words">
                You have 2 free generations to try. Describe what you want to create and click Generate!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}