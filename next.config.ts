import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // --- 添加以下配置来隐藏开发工具按钮 ---
  devIndicators: {
    appIsrStatus: false, // 隐藏你截图中的那个路由/状态指示器
    buildActivity: false, // 隐藏右下角的编译加载小图标
  },
  // ------------------------------------
  
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/stripePayment.html',
        destination: '/stripePayment',
      },
    ];
  },
};

export default withNextIntl(nextConfig);