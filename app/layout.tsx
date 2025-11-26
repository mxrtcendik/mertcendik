import { CommandMenu } from "@/components/command-menu";
import { ErrorBoundary } from "@/components/error-boundary";
import { SkipToContent } from "@/components/skip-to-content";
import { ThemeProvider } from "@/components/theme-provider";
import { personalInfo } from "@/lib/constants";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(personalInfo.baseUrl),
  title: {
    default: personalInfo.name,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.about,
  openGraph: {
    title: personalInfo.name,
    description: personalInfo.about,
    url: personalInfo.baseUrl,
    siteName: personalInfo.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: personalInfo.name,
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    url: personalInfo.baseUrl,
    jobTitle: personalInfo.title,
    sameAs: [
      "https://github.com/mxrtcendik",
      "https://x.com/mxrtcendik",
      "https://linkedin.com/in/mertcendik",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <SkipToContent />
            <CommandMenu />
            <main id="main-content" className="mx-auto max-w-3xl px-4 py-12">
              {children}
            </main>
            <Analytics />
            <SpeedInsights />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
