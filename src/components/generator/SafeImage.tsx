"use client"

import { useState, useEffect } from "react"
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
}

export default function SafeImage({
    src,
    alt,
    className = "",
    priority = false,
    fill = false,
    sizes,
    placeholder = 'empty',
    blurDataURL
}: SafeImageProps) {
    // 关键修复 1: 当 src 改变时，我们需要重置状态
    const [status, setStatus] = useState<'loading' | 'error' | 'loaded'>('loading')

    useEffect(() => {
        if (!src) {
            setStatus('loading')
            return
        }
        // 每次 src 变化，先重置为 loading
        setStatus('loading')
    }, [src])

    return (
        <div className={`relative overflow-hidden bg-zinc-950 ${className}`}>
            {/* 加载中状态 - 增加 z-index 确保盖在图片上 */}
            {status === 'loading' && src && (
                <div className="absolute inset-0 z-10 bg-zinc-900">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-indigo-500/40 animate-spin" />
                    </div>
                </div>
            )}

            {/* 无 src 时的占位状态 */}
            {!src && (
                <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-indigo-500/20 animate-spin" />
                </div>
            )}

            {status === 'error' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-700 bg-zinc-950 z-20">
                    <ImageOff className="w-8 h-8 opacity-20" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30 text-center px-4">
                        Visual Lost in Space
                    </span>
                </div>
            ) : (
                src && (
                    <Image
                        key={src} // 关键修复 2: 使用 key 强制重新渲染 Image 标签
                        src={src}
                        alt={alt}
                        fill={fill}
                        width={!fill ? 1024 : undefined}
                        height={!fill ? 1024 : undefined}
                        priority={priority} // 关键修复 3: 生成页面的新图片应设为 true
                        sizes={sizes}
                        placeholder={placeholder}
                        blurDataURL={blurDataURL}
                        onLoad={(img) => {
                            // 关键修复 4: 某些浏览器下缓存图片的处理
                            if (img.currentTarget.naturalWidth !== 0) {
                                setStatus('loaded')
                            }
                        }}
                        onError={() => setStatus('error')}
                        className={`
                            object-cover transition-all duration-700 ease-out
                            ${status === 'loaded' ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-lg'}
                        `}
                    />
                )
            )}

            <style jsx global>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    )
}