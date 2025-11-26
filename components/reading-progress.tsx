"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScrollable = documentHeight - windowHeight;
      const scrollProgress =
        totalScrollable > 0 ? scrollTop / totalScrollable : 0;
      setProgress(Math.min(scrollProgress * 100, 100));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="bg-muted fixed top-0 right-0 left-0 z-50 h-1">
      <div
        className="bg-foreground h-full transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
