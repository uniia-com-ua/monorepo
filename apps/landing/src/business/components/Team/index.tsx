"use client";

import Image from "next/image";
import { Button } from "@workspace/ui/components/base/button";
import { useInView } from "@workspace/ui/hooks/use-in-view";
import { cn } from "@workspace/ui/lib/utils";

export interface TeamStat {
  value: string;
  label: string;
}

export interface TeamProps {
  heading?: string;
  subheading?: string;
  image?: string;
  imageAlt?: string;
  /** Base64 blur placeholder for image */
  imageBlurData?: string;
  infoTitle?: string;
  infoDescription?: string;
  stats?: TeamStat[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
}

export default function Team({
  heading = "Команда Унії",
  subheading,
  image,
  imageAlt = "Команда Унії на зустрічі",
  imageBlurData,
  infoTitle,
  infoDescription,
  stats = [],
  ctaTitle,
  ctaDescription,
  ctaButtonText,
}: TeamProps) {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({
    threshold: 0.1,
  });

  return (
    <section ref={sectionRef} id="team" className="w-full mt-section-gap">
      <div className="w-full rounded-section bg-section-bg p-6 md:p-10 lg:p-14 shadow-section space-y-10">
        <div
          className={cn(
            "text-center max-w-3xl mx-auto animate-on-scroll",
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

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
          {image && (
            <div
              className={cn(
                "relative min-h-[260px] md:min-h-[320px] lg:min-h-[380px] rounded-4xl overflow-hidden shadow-card-elevated animate-on-scroll stagger-2",
                isInView && "is-visible"
              )}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                placeholder={imageBlurData ? "blur" : "empty"}
                blurDataURL={imageBlurData}
              />
            </div>
          )}

          <article
            className={cn(
              "bg-card rounded-4xl shadow-card p-6 md:p-8 flex flex-col gap-6 animate-on-scroll stagger-3",
              isInView && "is-visible"
            )}
          >
            <div className="flex items-center">
              <Image
                src="/icons/heart_pulse.svg"
                alt="Heart pulse icon"
                width={44}
                height={44}
                priority
              />
            </div>
            {(infoTitle || infoDescription) && (
              <div className="space-y-4">
                {infoTitle && (
                  <h3 className="text-2xl leading-tight text-foreground font-medium">
                    {infoTitle}
                  </h3>
                )}
                {infoDescription && (
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {infoDescription}
                  </p>
                )}
              </div>
            )}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 text-foreground">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-muted p-4 flex flex-col gap-1"
                  >
                    <span className="text-2xl font-semibold">
                      {stat.value}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>

        {ctaTitle && (
          <div
            id="blog"
            className={cn(
              "bg-card rounded-4xl shadow-popup p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-on-scroll stagger-4",
              isInView && "is-visible"
            )}
          >
            <div>
              <h3 className="text-2xl text-foreground font-medium mb-3">
                {ctaTitle}
              </h3>
              {ctaDescription && (
                <p className="text-muted-foreground">{ctaDescription}</p>
              )}
            </div>
            {ctaButtonText && (
              <Button
                className="w-full md:w-auto"
                variant="default"
                shadow="lg"
              >
                {ctaButtonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
