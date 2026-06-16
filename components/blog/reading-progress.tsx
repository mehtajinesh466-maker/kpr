"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const article = document.getElementById("article-content");
      if (!article) return;

      const rect = article.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = article.offsetHeight;
      const scrolled = window.scrollY - articleTop;
      const viewportHeight = window.innerHeight;

      const total = articleHeight - viewportHeight;
      if (total <= 0) {
        setProgress(100);
        return;
      }

      const pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
      setProgress(pct);
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
