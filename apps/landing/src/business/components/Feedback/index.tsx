"use client";

import { useCallback, useState } from "react";
import { Button } from "@workspace/ui/components/base/button";
import { useInView } from "@workspace/ui/hooks/use-in-view";
import { cn } from "@workspace/ui/lib/utils";

export interface FeedbackProps {
  title: string;
  subtitle?: string;
  benefitsHeading?: string;
  benefits?: string[];
}

export default function Feedback({
  title,
  subtitle,
  benefitsHeading = "Що отримаєш",
  benefits = [],
}: FeedbackProps) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatus("sent");
      event.currentTarget.reset();
      setTimeout(() => setStatus("idle"), 4000);
    },
    []
  );

  return (
    <section ref={sectionRef} id="contact" className="w-full mt-section-gap mb-12">
      <div className="w-full rounded-section bg-section-bg-dark text-white p-6 md:p-10 lg:p-14 shadow-section-dark relative overflow-hidden">
        {/* Decorative gradient shapes */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-primary/50 via-primary/20 to-transparent blur-3xl animate-blob-1" />
          <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-highlight/40 via-highlight/10 to-transparent blur-3xl animate-blob-2" />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[300px] rounded-full bg-gradient-to-r from-primary/20 via-transparent to-highlight/20 blur-2xl animate-blob-3" />
          <div className="absolute top-10 left-16 w-20 h-20 rounded-full bg-primary/35 blur-xl animate-blob-4" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div
            className={cn(
              "space-y-6 animate-on-scroll",
              isInView && "is-visible"
            )}
          >
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-base md:text-lg text-white/80">{subtitle}</p>
            )}
            {benefits.length > 0 && (
              <div
                className="inline-block bg-white/95 text-foreground m-8 px-6 py-4 rounded-3xl shadow-popup rotate-4 relative"
                style={{ transformOrigin: "left top" }}
              >
                <div className="absolute -top-3 -left-3 size-6 bg-highlight rounded-full shadow-md" />
                <p className="text-lg font-semibold mb-3">{benefitsHeading}</p>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  {benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className={cn(
              "bg-card rounded-4xl shadow-form p-6 md:p-8 flex flex-col gap-5 text-card-foreground animate-on-scroll stagger-2",
              isInView && "is-visible"
            )}
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-section-text-subtle"
              >
                Імʼя та прізвище
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Олександр Шевченко"
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-section-text-subtle"
              >
                Електронна пошта
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@uniia.com"
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-section-text-subtle"
              >
                Повідомлення
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Розкажіть коротко про свою пропозицію або питання..."
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full md:w-auto">
                Надіслати повідомлення
              </Button>
              {status === "sent" && (
                <p className="text-sm text-success">
                  Дякуємо! Ми скоро з вами звʼяжемось.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
