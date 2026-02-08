"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface UseInViewOptions {
  /** Trigger only once (default: true) */
  once?: boolean;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Threshold for intersection (0-1) */
  threshold?: number;
  /** Delay before triggering animation (ms) */
  delay?: number;
}

export function useInView<T extends HTMLElement = HTMLElement>({
  once = true,
  rootMargin = "-120px",
  threshold = 0.15,
  delay = 0,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (!entry) return;

      if (entry.isIntersecting) {
        if (delay > 0) {
          setTimeout(() => {
            setIsInView(true);
            if (once) setHasAnimated(true);
          }, delay);
        } else {
          setIsInView(true);
          if (once) setHasAnimated(true);
        }
      } else if (!once) {
        setIsInView(false);
      }
    },
    [once, delay]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || (once && hasAnimated)) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, once, hasAnimated, handleIntersection]);

  return { ref, isInView };
}
