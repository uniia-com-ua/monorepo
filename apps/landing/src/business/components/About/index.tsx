"use client";

import { Button } from "@workspace/ui/components/base/button";
import { useInView } from "@workspace/ui/hooks/use-in-view";
import { useScrollTo } from "@workspace/ui/hooks/use-scroll-to";
import { cn } from "@workspace/ui/lib/utils";

export interface AboutCard {
  id: string;
  title: string;
  description: string;
  variant: "default" | "light" | "dark";
  cta?: string;
  scrollTarget?: string;
}

export interface AboutProps {
  heading?: string;
  subheading?: string;
  cards: AboutCard[];
}

export default function About({
  heading = "Про Унію",
  subheading,
  cards,
}: AboutProps) {
  const scrollTo = useScrollTo();
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
  });

  return (
    <section ref={sectionRef} id="about" className="mt-section-gap w-full">
      <div className="rounded-section bg-section-bg shadow-section w-full p-6 md:p-10 lg:p-14">
        <div
          className={cn(
            "animate-on-scroll mx-auto mb-12 max-w-3xl text-center",
            isInView && "is-visible",
          )}
        >
          <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
            {heading}
          </h2>
          {subheading && (
            <p className="text-muted-foreground mt-4 text-base md:text-lg">
              {subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card, index) => {
            const isDark = card.variant === "dark";

            return (
              <article
                key={card.id}
                className={cn(
                  "rounded-4xl animate-on-scroll animate-card-pop relative flex flex-col gap-6 overflow-hidden p-6 md:p-8",
                  isDark
                    ? "bg-section-bg-dark shadow-card-elevated text-white"
                    : "bg-card text-card-foreground shadow-card",
                  isInView && "is-visible",
                  `stagger-${index + 2}`,
                )}
              >
                {isDark && (
                  <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                  >
                    <div className="from-primary/50 via-primary/20 animate-blob-1 absolute -right-16 -top-16 h-[280px] w-[280px] rounded-full bg-gradient-to-br to-transparent blur-3xl" />
                    <div className="from-highlight/40 via-highlight/10 animate-blob-2 absolute -bottom-14 -left-14 h-[240px] w-[240px] rounded-full bg-gradient-to-tr to-transparent blur-3xl" />
                    <div className="from-primary/20 to-highlight/20 animate-blob-3 absolute left-1/2 top-1/2 h-[180px] w-[320px] rounded-full bg-gradient-to-r via-transparent blur-2xl" />
                  </div>
                )}

                <div
                  className={isDark ? "relative z-10 space-y-4" : "space-y-4"}
                >
                  <h3 className="text-2xl font-medium leading-tight">
                    {card.title}
                  </h3>
                  <p
                    className={[
                      "text-base leading-relaxed",
                      isDark ? "text-white/70" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {card.description}
                  </p>
                </div>

                {card.cta && (
                  <div className={isDark ? "relative z-10 pt-2" : "pt-2"}>
                    <Button
                      variant={isDark ? "white" : "default"}
                      onClick={
                        card.scrollTarget
                          ? () => scrollTo(card.scrollTarget!)
                          : undefined
                      }
                    >
                      {card.cta}
                    </Button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
