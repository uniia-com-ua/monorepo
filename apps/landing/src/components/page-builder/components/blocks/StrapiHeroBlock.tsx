import Hero from "@/business/components/Hero";
import { getStrapiMedia } from "@/lib/strapi-api/media";
import { PageBuilderComponentProps } from "@/types/general";
import { Data } from "@workspace/strapi-types";
import { heroShimmer } from "@workspace/ui/lib/shimmer";
import "server-only";
import { PageBuilder } from "../../dev-preview";

export const StrapiHeroBlock = PageBuilder.new(
  "blocks.hero",
  async ({ component }) => {
    const { title, subtitle, ctaButtons, backgroundImage } = component;
    const { url: backgroundImageUrl, blurDataUrl } = await getStrapiMedia(
      backgroundImage,
      true,
    );

    return (
      <Hero
        title={title || ""}
        subtitle={subtitle || ""}
        backgroundImage={backgroundImageUrl}
        backgroundBlurData={
          blurDataUrl ?? (backgroundImageUrl ? heroShimmer : undefined)
        }
        ctaButtons={ctaButtons?.map((btn) => ({
          text: btn.text || "",
          href: btn.href || "",
          scrollTo: btn.scrollTo || "",
          variant: btn.variant ?? undefined,
        }))}
      />
    );
  },
);

StrapiHeroBlock.fallback = {
  id: 0,
  title: "Welcome to Our Website",
  subtitle: "This is a fallback hero block content.",
  ctaButtons: [
    { id: 1, text: "Learn More", href: "/learn-more" },
    { id: 2, text: "Get Started", href: "/get-started" },
  ],
  backgroundImage: null,
};
