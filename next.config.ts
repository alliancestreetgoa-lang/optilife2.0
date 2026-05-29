import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves a static export — Next's image optimizer endpoint
  // (/_next/image) doesn't exist there, so serve images unoptimized.
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
