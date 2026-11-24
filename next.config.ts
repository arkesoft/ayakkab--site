import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [72, 74, 78, 82],
  },
  devIndicators: false,
  agentRules: false,
  experimental: {
    globalNotFound: true,
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
