"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import RedesignedSidebar from "@/components/generator/RedesignedSidebar"
import PromptConsole from "@/components/generator/PromptConsole"
import WelcomeGuide from "@/components/generator/WelcomeGuide"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Settings, Coins, Sparkles, Home } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"

const PlansBanner = dynamic(() => import("@/components/generator/PlansBanner"), {
    loading: () => <div className="h-32 bg-white/5 rounded-2xl animate-pulse" />,
})
const GenerationResultCard = dynamic(() => import("@/components/generator/GenerationResultCard"), {
    ssr: false,
})
const LoginModal = dynamic(() => import("@/components/LoginModel"), {
    ssr: false,
})

const GUEST_FREE_GENERATIONS = 2
const COST_PER_GENERATION = 30

export default function GeneratorClient() {
    const searchParams = useSearchParams()
    const { user, isLoading: authLoading, login, refreshUser } = useAuth()

    const [activePrompt, setActivePrompt] = useState("")
    const [activeStyle, setActiveStyle] = useState("Vibrant Anime")
    const [activeRatio, setActiveRatio] = useState("1:1")
    const [activeQuantity, setActiveQuantity] = useState(1)
    const [activeModel, setActiveModel] = useState("Seedream 4.0")
    const [isGenerating, setIsGenerating] = useState(false)
    const [history, setHistory] = useState<
        Array<{ id: string; urls: string[]; prompt: string; timestamp: number; style: string; ratio: string }>
    >([])
    const [mobileSheetOpen, setMobileSheetOpen] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)

    // Guest generation tracking
    const [guestGenerations, setGuestGenerations] = useState(0)

    // Load guest generations count and history from localStorage
    useEffect(() => {
        const savedGuestCount = localStorage.getItem("guest_generations")
        if (savedGuestCount) {
            setGuestGenerations(Number.parseInt(savedGuestCount, 10))
        }

        const savedHistory = localStorage.getItem("anime-gen-history")
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory))
            } catch (e) {
                console.error(e)
            }
        }
    }, [])

    // Load prompt from URL
    useEffect(() => {
        const prompt = searchParams.get("prompt")
        if (prompt) setActivePrompt(decodeURIComponent(prompt))
    }, [searchParams])

    // Save history to localStorage
    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem("anime-gen-history", JSON.stringify(history))
        }
    }, [history])

    // Check if user can generate
    const canGenerate = useCallback(() => {
        if (user) {
            return user.credits >= COST_PER_GENERATION
        }
        return guestGenerations < GUEST_FREE_GENERATIONS
    }, [user, guestGenerations])

    const handleGenerate = useCallback(async (): Promise<boolean> => {
        if (!activePrompt.trim() || isGenerating) return false

        if (!user && guestGenerations >= GUEST_FREE_GENERATIONS) {
            setShowLoginModal(true)
            return false
        }

        if (user && user.credits < COST_PER_GENERATION) {
            return false
        }

        setIsGenerating(true)
        setMobileSheetOpen(false)

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: activePrompt,
                    style: activeStyle,
                    ratio: activeRatio,
                    quantity: activeQuantity,
                }),
            })
            if (!response.ok) throw new Error("Generation failed")
            const data = await response.json()
            const urls = data.images || (Array.isArray(data.urls) ? data.urls : [data.url])

            setHistory((prev) => [
                {
                    id: Date.now().toString(),
                    urls,
                    prompt: activePrompt,
                    timestamp: Date.now(),
                    style: activeStyle,
                    ratio: activeRatio,
                },
                ...prev,
            ])

            if (!user) {
                const newCount = guestGenerations + 1
                setGuestGenerations(newCount)
                localStorage.setItem("guest_generations", newCount.toString())
            } else {
                await refreshUser()
            }

            return true
        } catch (err) {
            console.error(err)
            return false
        } finally {
            setIsGenerating(false)
        }
    }, [activePrompt, activeStyle, activeRatio, activeQuantity, isGenerating, user, guestGenerations, refreshUser])

    const handleRegenerate = useCallback(
        (prompt: string, style: string, ratio: string) => {
            setActivePrompt(prompt)
            setActiveStyle(style)
            setActiveRatio(ratio)
            setTimeout(() => handleGenerate(), 100)
        },
        [handleGenerate],
    )

    const groupHistoryByDate = () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const todayItems = history.filter((item) => item.timestamp >= today.getTime())
        const olderItems = history.filter((item) => item.timestamp < today.getTime())
        return { today: todayItems, older: olderItems }
    }

    const { today: todayHistory, older: olderHistory } = groupHistoryByDate()

    const displayCredits = user ? user.credits : `${GUEST_FREE_GENERATIONS - guestGenerations}/${GUEST_FREE_GENERATIONS}`
    const remainingGuestGenerations = GUEST_FREE_GENERATIONS - guestGenerations

    return (
        <div className="flex h-[100dvh] bg-[#050507] text-zinc-100 overflow-hidden font-sans">
            <WelcomeGuide />
            <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={login} />

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-[280px] border-r border-white/5 bg-[#08080a]">
                <RedesignedSidebar
                    activeStyle={activeStyle}
                    setActiveStyle={setActiveStyle}
                    activeRatio={activeRatio}
                    setActiveRatio={setActiveRatio}
                    activeQuantity={activeQuantity}
                    setActiveQuantity={setActiveQuantity}
                    activeModel={activeModel}
                    setActiveModel={setActiveModel}
                />
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden bg-[#050507]">

                {/* --- Header --- */}
                <header className="flex items-center justify-between px-4 lg:px-8 h-16 border-b border-white/5 bg-[#08080a]/80 backdrop-blur-xl z-30">

                    {/* Left: Mobile Nav + Logo */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Sidebar Trigger */}
                        <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
                            <SheetTrigger asChild>
                                <button className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-all border border-white/5">
                                    <Settings className="w-5 h-5 text-zinc-400" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] p-0 bg-[#08080a] border-r border-white/10">
                                <RedesignedSidebar
                                    activeStyle={activeStyle}
                                    setActiveStyle={setActiveStyle}
                                    activeRatio={activeRatio}
                                    setActiveRatio={setActiveRatio}
                                    activeQuantity={activeQuantity}
                                    setActiveQuantity={setActiveQuantity}
                                    activeModel={activeModel}
                                    setActiveModel={setActiveModel}
                                />
                            </SheetContent>
                        </Sheet>

                        {/* --- BRAND LOGO (Return to Home) --- */}
                        <Link href="/" className="flex items-center gap-2.5 group transition-opacity hover:opacity-80">
                            <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="hidden sm:block text-xl font-bold tracking-tighter text-white">
                                Anime<span className="text-indigo-400">AI</span>
                            </span>
                        </Link>
                    </div>

                    {/* Right: Credits & User */}
                    <div className="flex items-center gap-3">
                        {/* Credits Pill */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 shadow-inner">
                            <Coins className="w-4 h-4 text-amber-400" />
                            <span className="text-sm font-bold tabular-nums text-zinc-200">{displayCredits}</span>
                        </div>

                        {/* Auth Area */}
                        {authLoading ? (
                            <div className="w-9 h-9 rounded-full bg-zinc-800 animate-pulse border border-white/5" />
                        ) : user ? (
                            <div className="flex items-center gap-2 pl-2">
                                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-500/30 hover:border-indigo-500 transition-colors cursor-pointer">
                                    {user.picture ? (
                                        <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-xs font-black uppercase">
                                            {user.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={login}
                                className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-full transition-all shadow-lg shadow-indigo-500/20"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </header>

                {/* Scrollable Workspace */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative">

                    {/* Background Decorative Light */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-indigo-500/5 blur-[120px] pointer-events-none" />

                    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 space-y-8">

                        {/* Console Area */}
                        <section>
                            <div className="flex items-center gap-2 mb-4 text-zinc-500">
                                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
                                    <Home className="w-3 h-3" /> Home
                                </Link>
                                <span className="text-zinc-800">/</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Generator Studio</span>
                            </div>

                            <PromptConsole
                                activePrompt={activePrompt}
                                setActivePrompt={setActivePrompt}
                                isGenerating={isGenerating}
                                handleGenerate={handleGenerate}
                                credits={user?.credits ?? 0}
                                activeQuantity={activeQuantity}
                                canGenerate={canGenerate()}
                                isGuest={!user}
                                remainingGuestGenerations={remainingGuestGenerations}
                                onLoginRequired={() => setShowLoginModal(true)}
                            />
                        </section>

                        {/* Upsell/Plans Banner */}
                        <AnimatePresence>
                            {((!user && guestGenerations > 0) || (user && user.credits < 100)) && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                                    <PlansBanner isGuest={!user} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Results Grid */}
                        <div className="space-y-8">
                            {/* Active Generating Placeholder */}
                            <AnimatePresence mode="popLayout">
                                {isGenerating && (
                                    <motion.div
                                        key="generating"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="relative rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/5 aspect-video flex flex-col items-center justify-center gap-4 shadow-2xl"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse" />
                                            <div className="w-14 h-14 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin relative z-10" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-base font-bold text-white tracking-tight">Casting your vision...</p>
                                            <p className="text-xs text-zinc-500 mt-1 font-medium italic">Our GPU clusters are processing your prompt</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* History Rendering */}
                            {[
                                { label: "Today's Creations", data: todayHistory },
                                { label: "Earlier History", data: olderHistory }
                            ].map((group, gIdx) => group.data.length > 0 && (
                                <div key={group.label} className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px flex-1 bg-white/5" />
                                        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">{group.label}</h3>
                                        <div className="h-px flex-1 bg-white/5" />
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        {group.data.map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <GenerationResultCard
                                                    url={item.urls[0]}
                                                    prompt={item.prompt}
                                                    style={item.style}
                                                    ratio={item.ratio}
                                                    onRegenerate={() => handleRegenerate(item.prompt, item.style, item.ratio)}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {!isGenerating && history.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 text-center bg-white/[0.02] rounded-[40px] border border-dashed border-white/5">
                                    <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-6 border border-indigo-500/20">
                                        <Sparkles className="w-10 h-10 text-indigo-500/50" />
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-300">Ready to start?</h3>
                                    <p className="text-sm text-zinc-500 mt-2 max-w-xs leading-relaxed">
                                        Type a description above and choose a style to generate your first anime art.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
