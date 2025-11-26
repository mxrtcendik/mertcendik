"use client";

import { Moon, Sun } from "lucide-react";
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
      className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
      aria-label="Toggle theme"
    >
      {isLight ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}
