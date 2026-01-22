"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { UploadCloud, X, Copy, Sparkles, Loader2, ImageIcon, Wand2, Check, Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const LoginModal = dynamic(() => import("@/components/LoginModel"), {
    ssr: false,
});

interface ImagePromptConsoleProps {
    onApplyPrompt: (prompt: string) => void;
    onSuccess?: () => void;
    imageFile?: File | null;
}

const GUEST_FREE_LIMIT = 2;
const COST_PER_ANALYSIS = 2;

export default function ImagePromptConsole({ onApplyPrompt, onSuccess, imageFile }: ImagePromptConsoleProps) {
    const t = useTranslations('Generator.imagePrompt');
    const { user, login, refreshUser } = useAuth();
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [fullPrompt, setFullPrompt] = useState("");
    const [isDragOver, setIsDragOver] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // 当接收到外部图片文件时，自动处理和分析
    useEffect(() => {
        if (imageFile) {
            handleFile(imageFile);
        }
    }, [imageFile]);

    const analyzeImage = async (file: File) => {
        // Pre-check limits
        if (!user) {
            const guestCount = Number(localStorage.getItem("guest_generations") || "0");
            if (guestCount >= GUEST_FREE_LIMIT) {
                setShowLoginModal(true);
                toast.error(t('freeLimitReached'));
                return;
            }
        } else {
            if ((Number(user.credits) || 0) < COST_PER_ANALYSIS) {
                toast.custom((toastItem) => (
                    <div className="bg-zinc-900 border border-amber-500/30 rounded-xl p-4 shadow-2xl max-w-md">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                <Coins className="w-5 h-5 text-amber-500" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-white mb-1">{t('insufficientCredits')}</h4>
                                <p className="text-xs text-zinc-400 mb-3">
                                    {t('analysisCost', { count: COST_PER_ANALYSIS })}
                                </p>
                                <button
                                    onClick={() => {
                                        toast.dismiss(toastItem.id);
                                        window.location.href = '/pricing';
                                    }}
                                    className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
                                >
                                    {t('getMoreCredits')}
                                </button>
                            </div>
                            <button onClick={() => toast.dismiss(toastItem.id)} className="text-zinc-500 hover:text-zinc-400">✕</button>
                        </div>
                    </div>
                ), { duration: 6000 });
                return;
            }
        }

        setIsAnalyzing(true);
        try {
            const reader = new FileReader();
            const base64Promise = new Promise<string>((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
            });
            reader.readAsDataURL(file);
            const base64Image = await base64Promise;

            const response = await fetch("/api/analyze-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: base64Image,
                    googleUserId: user?.googleUserId
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    setShowLoginModal(true);
                    throw new Error(t('freeLimitReached'));
                }
                if (response.status === 403) {
                    toast.custom((toastItem) => (
                        <div className="bg-zinc-900 border border-amber-500/30 rounded-xl p-4 shadow-2xl max-w-md">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                    <Coins className="w-5 h-5 text-amber-500" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-white mb-1">{t('insufficientCredits')}</h4>
                                    <p className="text-xs text-zinc-400 mb-3">
                                        {t('analysisCost', { count: COST_PER_ANALYSIS })}
                                    </p>
                                    <button
                                        onClick={() => {
                                            toast.dismiss(toastItem.id);
                                            window.location.href = '/pricing';
                                        }}
                                        className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
                                    >
                                        {t('getMoreCredits')}
                                    </button>
                                </div>
                                <button onClick={() => toast.dismiss(toastItem.id)} className="text-zinc-500 hover:text-zinc-400">✕</button>
                            </div>
                        </div>
                    ), { duration: 6000 });
                    throw new Error("Insufficient credits");
                }
                throw new Error(JSON.stringify({ error: data.error || "Failed to analyze image", errorType: data.errorType || "general" }));
            }

            setTags(data.tags || []);
            setFullPrompt(data.prompt || "");
            toast.success(t('analysisComplete'));

            // Call success callback to sync UI and credits
            if (onSuccess) onSuccess();
        } catch (error: any) {
            console.error("Analysis error:", error);
            
            let errorMessage = error.message || "Failed to analyze image. Please try again.";
            try {
              const errorData = JSON.parse(error.message);
              if (errorData.errorType) {
                switch (errorData.errorType) {
                  case "content_filter":
                    errorMessage = "Content not allowed: Please ensure your image doesn't contain adult or inappropriate content";
                    break;
                  case "insufficient_credits":
                    errorMessage = t("insufficientCredits");
                    break;
                  case "rate_limit":
                    errorMessage = "Rate limit exceeded. Please try again later.";
                    break;
                  case "user_not_found":
                    errorMessage = "User not found. Please log in again.";
                    break;
                  default:
                    errorMessage = errorData.error || "Failed to analyze image. Please try again.";
                }
              } else {
                errorMessage = errorData.error || "Failed to analyze image. Please try again.";
              }
            } catch (parseErr) {
              errorMessage = error.message || "Failed to analyze image. Please try again.";
            }
            
            toast.error(errorMessage);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }
        setImage(file);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        analyzeImage(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) handleFile(files[0]);
    };

    const handlePaste = useCallback((e: ClipboardEvent) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                const file = items[i].getAsFile();
                if (file) handleFile(file);
                break;
            }
        }
    }, [previewUrl]);

    useEffect(() => {
        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, [handlePaste]);

    // When tags change, update fullPrompt
    const updateFullPromptFromTags = (newTags: string[]) => {
        setFullPrompt(newTags.join(", "));
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
        updateFullPromptFromTags(newTags);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(fullPrompt);
        setIsCopied(true);
        toast.success("Prompt copied to clipboard");
        setTimeout(() => setIsCopied(false), 2000);
    };

    const reset = () => {
        setImage(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setTags([]);
        setFullPrompt("");
        setIsAnalyzing(false);
    };

    return (
        <div className="w-full max-w-8xl mx-auto relative z-20">
            <motion.div
                layout
                className="relative flex flex-col w-full rounded-[24px] bg-[#121215] border border-white/5 overflow-hidden min-h-[300px]"
            >
                <AnimatePresence mode="wait">
                    {!previewUrl ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => inputRef.current?.click()}
                            className={`
                                flex-1 flex flex-col items-center justify-center p-10 cursor-pointer transition-all duration-300
                                ${isDragOver ? "bg-violet-500/10 border-violet-500/50" : "bg-black/20 hover:bg-black/30"}
                                border-2 border-dashed border-violet-500/30 m-4 rounded-2xl backdrop-blur-xl
                            `}
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                                className="hidden"
                            />
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-500/15 to-blue-500/15 flex items-center justify-center mb-5 ring-1 ring-white/10">
                                <UploadCloud className="w-7 h-7 text-violet-300" />
                            </div>
                            <h3 className="text-lg font-black text-white mb-2 text-center">{t('title')}</h3>
                            <p className="text-zinc-400 text-center max-w-md text-sm">
                                {t('description')}
                            </p>
                            <div className="mt-4 text-[11px] font-medium text-zinc-500">
                                Click to upload, drag & drop, or paste (Ctrl+V)
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col md:flex-row h-full min-h-[450px]"
                        >
                            {/* Left: Image Side */}
                            <div className="w-full md:w-1/3 p-6 relative group flex flex-col">
                                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black relative flex-shrink-0">
                                    <img src={previewUrl} alt="Analyzed" className="w-full h-full object-cover" />

                                    {isAnalyzing && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                                            <div className="relative">
                                                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                                                <div className="absolute inset-0 animate-ping opacity-20 scale-150">
                                                    <Loader2 className="w-10 h-10 text-indigo-500" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-indigo-400 font-bold text-sm">{t('extractingConcepts')}</span>
                                                <div className="w-32 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                                        animate={{ x: ["-100%", "100%"] }}
                                                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500 to-transparent h-20 w-full -top-20 animate-[scan_2s_linear_infinite]" />
                                            </div>
                                        </div>
                                    )}

                                    {!isAnalyzing && (
                                        <button
                                            onClick={reset}
                                            className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="mt-4 flex flex-col gap-2">
                                    <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                                        {t('sourceInspiration')}
                                    </h4>
                                    <p className="text-[11px] text-zinc-500 leading-relaxed italic">
                                        {t('sourceInspirationDesc')}
                                    </p>
                                </div>
                            </div>

                            {/* Right: Tags/Prompt Side */}
                            <div className="w-full md:w-2/3 p-6 flex flex-col border-l border-white/5">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-zinc-400">
                                        <Wand2 className="w-4 h-4 text-indigo-400" />
                                        {t('analyzedPrompt')}
                                    </h4>
                                    <button
                                        onClick={handleCopy}
                                        disabled={isAnalyzing || !fullPrompt}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-[11px] font-bold transition-all border border-white/5"
                                    >
                                        {isCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                        {isCopied ? t('copied') : t('copyPrompt')}
                                    </button>
                                </div>

                                {/* Main Editable Textarea */}
                                <div className="relative group/text mb-6">
                                    <textarea
                                        value={fullPrompt}
                                        onChange={(e) => setFullPrompt(e.target.value)}
                                        placeholder={isAnalyzing ? "Analyzing image..." : "Analyzed prompt appears here..."}
                                        disabled={isAnalyzing}
                                        className="
                                            w-full h-40 bg-black/30 border border-white/10 rounded-2xl p-4
                                            text-base text-zinc-200 placeholder-zinc-700
                                            focus:outline-none focus:border-indigo-500/40 focus:bg-indigo-500/5
                                            transition-all resize-none custom-scrollbar leading-relaxed font-light
                                        "
                                    />
                                    {!isAnalyzing && fullPrompt && (
                                        <div className="absolute top-3 right-3 opacity-0 group-hover/text:opacity-100 transition-opacity">
                                            <div className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] text-indigo-400 font-bold uppercase">
                                                {t('editable')}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 flex-1">
                                    <h5 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                                        {t('refineWithTags')}
                                    </h5>
                                    <div className="flex flex-wrap gap-2 content-start">
                                        {isAnalyzing ? (
                                            Array(12).fill(0).map((_, i) => (
                                                <div key={i} className="h-7 w-16 bg-white/5 rounded-full animate-pulse" />
                                            ))
                                        ) : (
                                            tags.map((tag, i) => (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    key={i}
                                                    className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all cursor-default"
                                                >
                                                    <span className="text-[12px] font-medium text-zinc-400 group-hover:text-indigo-300">{tag}</span>
                                                    <button
                                                        onClick={() => removeTag(i)}
                                                        className="p-0.5 rounded-full hover:bg-indigo-500/20 text-zinc-600 group-hover:text-indigo-500/60 hover:text-indigo-400 transition-colors"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </motion.div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={() => onApplyPrompt(fullPrompt)}
                                        disabled={isAnalyzing || !fullPrompt.trim()}
                                        className="w-full group relative flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black uppercase tracking-widest text-sm hover:shadow-2xl hover:shadow-indigo-500/40 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-lg shadow-indigo-500/10"
                                    >
                                        <Sparkles className="w-5 h-5 fill-white group-hover:rotate-12 transition-transform" />
                                        <span>{t('applyToGenerator')}</span>

                                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={login}
            />
        </div>
    );
}
