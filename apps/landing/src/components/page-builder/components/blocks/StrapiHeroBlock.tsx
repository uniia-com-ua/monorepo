import Hero from "@/business/components/Hero";
import { getStrapiMedia } from "@/lib/strapi-api/media";
import { PageBuilderComponentProps } from "@/types/general";
import { Data } from "@workspace/strapi-types";
import { heroShimmer } from "@workspace/ui/lib/shimmer";
import "server-only";

export async function StrapiHeroBlock({
  component,
}: PageBuilderComponentProps & {
  component: Data.Component<"blocks.hero">;
}) {
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
        variant: btn.variant || "primary",
      }))}
    />
  );
}
