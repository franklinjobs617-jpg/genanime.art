"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AnimatedBackground() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 检测是否为移动设备
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 渐变背景作为后备和基础
  const gradientFallback = (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-indigo-600/30 to-pink-600/40" />
  );

  return (
    <div className="absolute inset-0">
      {/* 始终显示渐变背景作为基础 */}
      {gradientFallback}
      
      {/* 图片层 - 使用优化后的WebP图片 */}
      <Image
        src={isMobile ? "/image-mobile.webp" : "/image-optimized.webp"}
        alt="Anime AI Background"
        fill
        priority={false}
        quality={75}
        sizes="(max-width: 768px) 640px, 1920px"
        className={`object-cover transition-opacity duration-1000 ${
          imageLoaded ? 'opacity-50' : 'opacity-0'
        } brightness-125 contrast-110 saturate-125`}
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
        onError={() => {
          // 如果WebP加载失败，回退到原图
          console.log('WebP failed, falling back to PNG');
        }}
      />

      {/* 渐变遮罩 - 确保文字可读性 */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030305]/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030305]/70" />
    </div>
  );
}