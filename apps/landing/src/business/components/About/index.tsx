"use client";

import { Button } from "@workspace/ui/components/base/button";
import { useScrollTo } from "@workspace/ui/hooks/use-scroll-to";
import { useInView } from "@workspace/ui/hooks/use-in-view";
import { cn } from "@workspace/ui/lib/utils";

export interface AboutCard {
  id: string;
  title: string;
  description: string;
  variant: "light" | "dark";
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
    <section ref={sectionRef} id="about" className="w-full mt-section-gap">
      <div className="w-full rounded-section bg-section-bg p-6 md:p-10 lg:p-14 shadow-section">
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 animate-on-scroll",
            isInView && "is-visible"
          )}
        >
          <h2 className="text-3xl md:text-4xl text-foreground font-semibold">
            {heading}
          </h2>
          {subheading && (
            <p className="text-base md:text-lg text-muted-foreground mt-4">
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
                  "rounded-4xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden animate-on-scroll animate-card-pop",
                  isDark
                    ? "bg-section-bg-dark text-white shadow-card-elevated"
                    : "bg-card text-card-foreground shadow-card",
                  isInView && "is-visible",
                  `stagger-${index + 2}`
                )}
              >
                {isDark && (
                  <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                  >
                    <div className="absolute -top-16 -right-16 w-[280px] h-[280px] rounded-full bg-gradient-to-br from-primary/50 via-primary/20 to-transparent blur-3xl animate-blob-1" />
                    <div className="absolute -bottom-14 -left-14 w-[240px] h-[240px] rounded-full bg-gradient-to-tr from-highlight/40 via-highlight/10 to-transparent blur-3xl animate-blob-2" />
                    <div className="absolute top-1/2 left-1/2 w-[320px] h-[180px] rounded-full bg-gradient-to-r from-primary/20 via-transparent to-highlight/20 blur-2xl animate-blob-3" />
                  </div>
                )}

                <div
                  className={isDark ? "relative z-10 space-y-4" : "space-y-4"}
                >
                  <h3 className="text-2xl leading-tight font-medium">
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
