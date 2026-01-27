import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/stripePayment.html",
        destination: "/stripePayment",
      },
      {
        source: "/api/paypal/createOrder",
        destination: "https://api.genanime.art/prod-api/paypal/createOrder",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
