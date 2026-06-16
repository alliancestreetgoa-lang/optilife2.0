import type { NextConfig } from "next";

// GitHub Pages project site is served under /<repo>/, so it needs a basePath.
// Netlify (and local dev) serve at the root, so they must NOT have one.
// GitHub Actions sets GITHUB_ACTIONS=true during its build — use that to gate
// the prefix. basePath handles routing and _next assets; public-folder images
// must be prefixed manually (Next does NOT apply basePath to <Image>/<img> src)
// — exposed via NEXT_PUBLIC_BASE_PATH.
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubPages ? "/optilife2.0" : "";

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
