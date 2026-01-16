"use client"

import { useState } from "react"
import { ImageOff, Loader2 } from "lucide-react"
import Image from "next/image"

interface SafeImageProps {
    src: string
    alt: string
    className?: string
    priority?: boolean
    fill?: boolean
    sizes?: string
}

export default function SafeImage({
    src,
    alt,
    className = "",
    priority = false,
    fill = false,
    sizes
}: SafeImageProps) {
    const [status, setStatus] = useState<'loading' | 'error' | 'loaded'>('loading')

    return (
        <div className={`relative overflow-hidden bg-zinc-950 ${className}`}>
            {/* Shimmer Effect */}
            {status === 'loading' && (
                <div className="absolute inset-0 z-10">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-indigo-500/20 animate-spin" />
                    </div>
                </div>
            )}

            {status === 'error' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-700 bg-zinc-950">
                    <ImageOff className="w-8 h-8 opacity-20" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30 text-center px-4">
                        Visual Lost in Space
                    </span>
                </div>
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    fill={fill}
                    width={!fill ? 1024 : undefined}
                    height={!fill ? 1024 : undefined}
                    priority={priority}
                    sizes={sizes}
                    className={`
                        object-cover transition-all duration-700 ease-out
                        ${status === 'loaded' ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-lg'}
                    `}
                    onLoad={() => setStatus('loaded')}
                    onError={() => setStatus('error')}
                />
            )}

            <style jsx global>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    )
}
