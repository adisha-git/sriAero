import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Not a static export: the quote form posts to the /api/contact route handler, which needs a server (Vercel).
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
