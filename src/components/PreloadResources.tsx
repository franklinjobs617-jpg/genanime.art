import { Suspense } from 'react';

interface PreloadResourcesProps {
  images?: string[];
  fonts?: string[];
}

export default function PreloadResources({ images = [], fonts = [] }: PreloadResourcesProps) {
  return (
    <Suspense fallback={null}>
      {/* 预加载关键图片 */}
      {images.map((src, index) => (
        <link
          key={`preload-image-${index}`}
          rel="preload"
          as="image"
          href={src}
          type="image/webp"
        />
      ))}
      
      {/* 预加载字体 */}
      {fonts.map((href, index) => (
        <link
          key={`preload-font-${index}`}
          rel="preload"
          as="font"
          href={href}
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}
      
      {/* DNS 预解析 */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Suspense>
  );
}