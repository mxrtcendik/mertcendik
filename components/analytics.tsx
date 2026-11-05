import Script from "next/script";

const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

// Cloudflare Web Analytics: no cookies, so no consent banner. It only loads
// in production, and only when a token is set (see README, "Analytics").
export function Analytics() {
  if (!token || process.env.NODE_ENV !== "production") return null;

  return (
    <Script
      strategy="afterInteractive"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token, spa: true })}
    />
  );
}
