"use client";

import { Zap, Crown, ArrowRight, LogIn, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";

interface PlansBannerProps {
  isGuest?: boolean;
  onLogin?: () => void;
}

export default function PlansBanner({ isGuest, onLogin }: PlansBannerProps) {
  return (
    <div className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden relative group">
      {/* ... Desktop 部分保持不变，或者也可以同步修改 ... */}
      <div className="hidden lg:flex items-center justify-between px-5 py-4 relative z-10">
        {/* 省略 Desktop 代码，集中看下面的 Mobile 修改 */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-lg flex items-center justify-center border border-amber-500/10">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">
              {isGuest ? "Sign in to get more credits" : "Free Plan Active"}
            </p>
            <p className="text-xs text-zinc-400">
              {isGuest
                ? "Create art and save your progress"
                : "Unlock faster speeds & commercial rights"}
            </p>
          </div>
        </div>

        {isGuest ? (
          <button
            onClick={onLogin}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        ) : (
          <Link
            href="/pricing"
            className="group/btn relative flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            <Crown className="w-4 h-4 text-yellow-200 fill-yellow-200" />
            <span>Upgrade Plan</span>
            <ArrowRight className="w-4 h-4 opacity-70 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      <div className="lg:hidden p-5 relative z-10">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-xl flex items-center justify-center border border-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Zap className="w-6 h-6 text-amber-400 fill-amber-400/20" />
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-bold text-white tracking-wide">
              {isGuest ? "Sign in to start creating" : "Unlock Pro Features"}
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed px-2">
              {isGuest
                ? "Get free credits and save your artwork forever"
                : "Priority queue, commercial rights & more"}
            </p>
          </div>

          <div className="w-full pt-2">
            {isGuest ? (
              /* 
                                方案一：高亮白色按钮（推荐）
                                既然背景很黑，白色就是最强对比。
                                配合黑色文字，看起来非常像主要的 CTA 按钮。
                            */
              <button
                onClick={onLogin}
                className="w-full flex justify-center items-center gap-2 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white text-sm font-black rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] active:scale-[0.98]"
              >
                <LogIn className="w-4 h-4 stroke-[3px]" />
                Sign In Now
              </button>
            ) : (
              /* 
                                方案二（备选）：如果你觉得白色太素，可以用亮蓝色/靛蓝渐变 
                                注释掉上面的，使用下面的看看效果
                            */
              /*
                            <button
                                onClick={onLogin}
                                className="w-full flex justify-center items-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40 active:scale-[0.98]"
                            >
                                <LogIn className="w-4 h-4" />
                                Sign In to Create
                            </button>
                            */
              <Link
                href="/pricing"
                className="w-full flex justify-center items-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-purple-900/40 active:scale-[0.98] transition-all"
              >
                <Crown className="w-4 h-4 text-yellow-200 fill-yellow-200" />
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
