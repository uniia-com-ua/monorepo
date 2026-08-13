import Team from "@/business/components/Team";
import { getStrapiMedia } from "@/lib/strapi-api/media";
import { PageBuilderComponentProps } from "@/types/general";
import { Data } from "@workspace/strapi-types";

export async function StrapiTeamBlock({
  component,
}: PageBuilderComponentProps & {
  component: Data.Component<"blocks.team">;
}) {
  const {
    heading,
    subheading,
    image,
    infoDescription,
    infoTitle,
    stats,
    ctaButton,
    ctaDescription,
    ctaTitle,
  } = component;

  const {
    image: imageData,
    url: imageUrl,
    blurDataUrl: imageBlurDataUrl,
  } = await getStrapiMedia(image, true);

  return (
    <Team
      heading={heading || ""}
      subheading={subheading || ""}
      image={imageUrl}
      imageBlurData={imageBlurDataUrl}
      imageAlt={imageData?.alternativeText ?? "Команда"}
      infoTitle={infoTitle || ""}
      infoDescription={infoDescription || ""}
      stats={
        stats?.map((s) => ({ value: s.value || "0", label: s.label || "" })) ??
        []
      }
      ctaTitle={ctaTitle || ""}
      ctaDescription={ctaDescription || ""}
      ctaButtonText={ctaButton?.text || ""}
    />
  );
}
