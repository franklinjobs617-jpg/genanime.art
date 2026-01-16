"use client"

import { Zap } from "lucide-react"
import { Link } from "@/i18n/routing"

interface PlansBannerProps {
    isGuest?: boolean;
    onLogin?: () => void;
}

export default function PlansBanner({ isGuest, onLogin }: PlansBannerProps) {
    return (
        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="hidden lg:flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-zinc-200">
                            {isGuest ? "Sign in to get more credits" : "You're on the free plan"}
                        </p>
                        <p className="text-xs text-zinc-500">
                            {isGuest
                                ? "Choose a plan to continue creating art after your trials"
                                : "Upgrade for priority generations and more credits"}
                        </p>
                    </div>
                </div>
                {isGuest ? (
                    <button
                        onClick={onLogin}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors border border-white/10"
                    >
                        Sign In
                    </button>
                ) : (
                    <Link
                        href="/pricing"
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        Upgrade
                    </Link>
                )}
            </div>

            <div className="lg:hidden p-5">
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-zinc-200">
                            {isGuest ? "Sign in to get more credits" : "You're on the free plan"}
                        </p>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            {isGuest ? "New users get 10 free credits" : "Upgrade for priority generations and more"}
                        </p>
                    </div>
                    {isGuest ? (
                        <button
                            onClick={onLogin}
                            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors text-center"
                        >
                            Sign In
                        </button>
                    ) : (
                        <Link
                            href="/pricing"
                            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors text-center"
                        >
                            Upgrade
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
