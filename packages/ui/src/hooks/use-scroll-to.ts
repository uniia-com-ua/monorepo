"use client";

import { useCallback } from "react";

/**
 * Hook for smooth scrolling to a section by its ID.
 * Uses a consistent offset equal to the header height + some breathing room.
 */
export function useScrollTo() {
  const scrollTo = useCallback((targetId: string) => {
    const section = document.getElementById(targetId);
    if (!section) return;

    const headerOffset = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--header-height"
      )
    );
    // Convert rem to px
    const remInPx =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const yOffset = headerOffset * remInPx + 8;

    const y =
      section.getBoundingClientRect().top + window.scrollY - yOffset;

    window.scrollTo({
      top: Math.max(y, 0),
      behavior: "smooth",
    });
  }, []);

  return scrollTo;
}
