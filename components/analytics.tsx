import Script from "next/script";

const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;

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
