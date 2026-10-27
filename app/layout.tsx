import { ErrorBoundary } from "@/components/error-boundary";
import { Header } from "@/components/header";
import { SkipToContent } from "@/components/skip-to-content";
import { ThemeColor } from "@/components/theme-color";
import { ThemeProvider } from "@/components/theme-provider";
import { personalInfo } from "@/lib/constants";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

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
    description: personalInfo.about,
    card: "summary_large_image",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var dark=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);var d=document.documentElement;if(dark)d.classList.add("dark");else d.classList.remove("dark");}catch(e){}})();`;

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
      "https://x.com/mrtcendik",
      "https://linkedin.com/in/mertcendik",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <ThemeColor />
          <ErrorBoundary>
            <SkipToContent />
            <main id="main-content" className="mx-auto max-w-3xl px-4 py-12">
              <Header />
              {children}
            </main>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
