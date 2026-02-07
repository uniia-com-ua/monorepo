"use client";

import { Button } from "@workspace/ui/components/base/button";
import { useScrollTo } from "@workspace/ui/hooks/use-scroll-to";
import Image from "next/image";

interface CtaButton {
  text: string;
  href?: string;
  scrollTo?: string;
  variant?: string;
}

export interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  ctaButtons?: CtaButton[];
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  ctaButtons = [],
}: HeroProps) {
  const scrollTo = useScrollTo();

  return (
    <div
      id="hero"
      className="relative w-full h-[calc(100vh-var(--header-height)*2)] flex items-center rounded-section justify-center overflow-hidden"
    >
      {/* Фонове зображення */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      )}

      {/* Напівпрозорий градієнт (нижня половина) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* Контент */}
      <div className="relative z-10 max-w-container mx-auto px-4 text-center flex flex-col items-center justify-end h-full pb-25 mb-12 w-full">
        <h1 className="text-4xl md:text-5xl text-white mb-1 max-w-2xl">
          {title}
        </h1>
        <p className="text-base md:text-lg font-light text-white/80 mb-6">
          {subtitle}
        </p>
        {ctaButtons.length > 0 && (
          <div className="flex gap-4 flex-wrap justify-center">
            {ctaButtons.map((btn, i) => (
              <Button
                key={i}
                type="button"
                variant={
                  (btn.variant as "default" | "glass" | "secondary") ||
                  (i === 0 ? "default" : "glass")
                }
                onClick={
                  btn.scrollTo ? () => scrollTo(btn.scrollTo!) : undefined
                }
              >
                {btn.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
