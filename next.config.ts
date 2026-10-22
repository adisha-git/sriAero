import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: `npm run build` writes the whole site to /out,
  // which can be uploaded to Netlify, Vercel, cPanel or any static host.
  output: "export",
  // `/services` is exported as /services/index.html, which plain static hosts serve without rewrites.
  trailingSlash: true,
  // Images are pre-optimised to WebP by `npm run images`, so Next's runtime optimiser isn't needed.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
