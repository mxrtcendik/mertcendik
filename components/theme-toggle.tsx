"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react/ssr";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="-m-2.5 size-11" aria-hidden />;
  }

  const isLight = (theme === "system" ? resolvedTheme : theme) === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring -m-2.5 flex size-11 cursor-pointer items-center justify-center transition-[color,transform] duration-150 focus-visible:ring-1 focus-visible:outline-none active:scale-[0.97]"
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
