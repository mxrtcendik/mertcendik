"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="size-5" />;
  }

  const isLight = (theme === "system" ? resolvedTheme : theme) === "light";

  return (
    <button
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring cursor-pointer transition-colors focus-visible:ring-1 focus-visible:outline-none"
      aria-label="Toggle theme"
    >
      {isLight ? (
        <SunIcon className="size-5" />
      ) : (
        <MoonIcon className="size-5" />
      )}
    </button>
  );
}
