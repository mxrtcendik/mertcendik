import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
