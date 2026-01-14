import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
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
