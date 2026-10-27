"use client";

import { useTheme } from "@/components/theme-provider";
import { useEffect } from "react";

const colors = {
  light: "#ffffff",
  dark: "#0a0a0a",
};

export function ThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;

    const color = colors[resolvedTheme];
    const metas = document.querySelectorAll('meta[name="theme-color"]');

    if (metas.length === 0) {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = color;
      document.head.appendChild(meta);
      return;
    }

    metas.forEach((meta) => {
      meta.setAttribute("content", color);
    });
  }, [resolvedTheme]);

  return null;
}
