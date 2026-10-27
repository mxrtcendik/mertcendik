"use client";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="bg-background text-foreground border-border focus:ring-ring fixed top-4 left-4 z-100 -translate-y-16 rounded-md border px-4 py-2 text-sm font-medium shadow-lg transition-transform focus:translate-y-0 focus:ring-2 focus:outline-none"
    >
      Skip to content
    </a>
  );
}
