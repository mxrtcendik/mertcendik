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

const isDev = process.env.NODE_ENV === "development";
const analytics =
  Boolean(process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN) && !isDev;

// Inline scripts are allowed because Next.js and the theme script use them.
// Everything else is limited to this site, plus YouTube embeds and Cloudflare
// Web Analytics when it's turned on.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${analytics ? " https://static.cloudflareinsights.com" : ""}${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' https:",
  "font-src 'self'",
  `connect-src 'self'${analytics ? " https://cloudflareinsights.com" : ""}${isDev ? " ws: wss:" : ""}`,
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains",
        },
      ]),
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
