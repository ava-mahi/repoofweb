import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
} as NextConfig;

export default nextConfig;
