import type { NextConfig } from "next";

// GitHub Pages project site is served under /<repo>/. basePath handles routing
// and _next assets; public-folder images must be prefixed manually (Next does
// NOT apply basePath to <Image>/<img> src) — exposed via NEXT_PUBLIC_BASE_PATH.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/optilife2.0" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true, // static export has no image optimizer endpoint
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
