import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos", // for mock/test images
      },
      {
        protocol: "https",
        hostname: "*.telegram.org", // Telegram CDN (real user photos)
      },
      {
        protocol: "https",
        hostname: "t.me", // sometimes Telegram uses this domain
      },
    ],
  },
};

export default nextConfig;
