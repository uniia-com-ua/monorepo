import type { TeamBlock as TeamBlockData } from "@workspace/strapi";
import { getStrapiMediaUrl } from "@workspace/strapi";
import { cardShimmer } from "@workspace/ui/lib/shimmer";
import Team from "../../Team";

interface Props {
  data: TeamBlockData;
}

export default function TeamBlock({ data }: Props) {
  return (
    <Team
      heading={data.heading}
      subheading={data.subheading}
      image={getStrapiMediaUrl(data.image?.url)}
      imageAlt={data.image?.alternativeText ?? "Команда"}
      imageBlurData={data.image ? cardShimmer : undefined}
      infoTitle={data.infoTitle}
      infoDescription={data.infoDescription}
      stats={data.stats?.map((s) => ({ value: s.value, label: s.label })) ?? []}
      ctaTitle={data.ctaTitle}
      ctaDescription={data.ctaDescription}
      ctaButtonText={data.ctaButtonText}
    />
  );
}
