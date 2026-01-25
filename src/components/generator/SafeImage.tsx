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
    placeholder?: 'blur' | 'empty'
    blurDataURL?: string
    objectFit?: 'cover' | 'contain'
}

export default function SafeImage({
    src,
    alt,
    className = "",
    priority = false,
    fill = false,
    sizes,
    placeholder = 'empty',
    blurDataURL,
    objectFit = 'cover'
}: SafeImageProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    if (hasError) {
        return (
            <div className={`relative flex flex-col items-center justify-center gap-2 text-zinc-700 bg-zinc-950 ${className}`}>
                <ImageOff className="w-8 h-8 opacity-20" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30 text-center px-4">
                    Visual Lost in Space
                </span>
            </div>
        )
    }

    return (
        <div className={`relative overflow-hidden bg-zinc-950 ${className}`}>
            {/* Loading state */}
            {isLoading && (
                <div className="absolute inset-0 z-10 bg-zinc-900 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-indigo-500/40 animate-spin" />
                </div>
            )}

            <Image
                src={src}
                alt={alt}
                fill={fill}
                width={!fill ? 1024 : undefined}
                height={!fill ? 1024 : undefined}
                priority={priority}
                sizes={sizes}
                placeholder={placeholder}
                blurDataURL={blurDataURL}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false)
                    setHasError(true)
                }}
                className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{
                    objectFit: objectFit
                }}
            />
        </div>
    )
}