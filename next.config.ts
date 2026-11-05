import type { NextConfig } from "next";

// Old post slugs, kept so links shared before the rename still work.
const renamedPosts: Record<string, string> = {
  "a-click-does-nothing": "a-button-you-have-to-hold",
  "bigger-than-the-icon": "make-the-target-bigger",
  "cache-the-redirect": "caching-the-redirect",
  "clip-path": "revealing-with-clip-path",
  "keep-a-response": "reduced-motion-feedback",
  "the-default": "the-default-is-what-ships",
  "the-first-frames": "why-ease-in-feels-slow",
  "the-link-is-the-time": "meeting-time-in-the-url",
  "the-other-theme": "check-the-other-theme",
  "the-press": "making-a-button-feel-pressed",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(renamedPosts).map(([from, to]) => ({
      source: `/blog/${from}`,
      destination: `/blog/${to}`,
      permanent: true,
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/blog/[slug]/opengraph-image": ["./content/blog/**/*"],
    "/blog/[slug]/opengraph-image/[__metadata_id__]": ["./content/blog/**/*"],
  },
};

export default nextConfig;

import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
