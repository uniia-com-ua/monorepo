"use client";

import { useInView } from "@workspace/ui/hooks/use-in-view";
import { cn } from "@workspace/ui/lib/utils";

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Animation type */
  animation?: "fade-up" | "fade-in" | "scale-in";
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Custom threshold for intersection observer */
  threshold?: number;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

export function AnimatedSection({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
  as: Component = "div",
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold,
    delay,
  });

  const animationClass = {
    "fade-up": "animate-on-scroll",
    "fade-in": "animate-on-scroll animate-fade-in",
    "scale-in": "animate-on-scroll animate-scale-in",
  }[animation];

  return (
    // @ts-expect-error - dynamic component type
    <Component
      ref={ref}
      className={cn(animationClass, isInView && "is-visible", className)}
    >
      {children}
    </Component>
  );
}
