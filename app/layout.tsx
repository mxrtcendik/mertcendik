import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mert Cendik",
  description:
    "I'm a Design Engineer crafting fast, reliable, production-ready software. I care deeply about performance, DX, and building things that truly ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <main className="mx-auto max-w-3xl px-4 py-12">{children}</main>
      </body>
    </html>
  );
}
