"use client"

import { useState } from "react"
import { ImageOff, Loader2 } from "lucide-react"

interface SafeImageProps {
    src: string
    alt: string
    className?: string
}

export default function SafeImage({ src, alt, className }: SafeImageProps) {
    const [status, setStatus] = useState<'loading' | 'error' | 'loaded'>('loading')

    return (
        <div className={`relative overflow-hidden bg-zinc-950 ${className}`}>
            {status === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 animate-pulse">
                    <Loader2 className="w-5 h-5 text-indigo-500/20 animate-spin" />
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
                <img
                    src={src}
                    alt={alt}
                    className={`
                        w-full h-full object-cover transition-opacity duration-500
                        ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}
                    `}
                    onLoad={() => setStatus('loaded')}
                    onError={() => setStatus('error')}
                />
            )}
        </div>
    )
}
