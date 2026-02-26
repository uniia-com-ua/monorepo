import type { HeroBlock as HeroBlockData } from "@workspace/strapi";
import {
  getStrapiMediaProxyUrl,
  getStrapiImageAsBase64,
} from "@workspace/strapi";
import { heroShimmer } from "@workspace/ui/lib/shimmer";
import Hero from "../../Hero";

interface Props {
  data: HeroBlockData;
}

export default async function HeroBlock({ data }: Props) {
  const thumbnailUrl = data.backgroundImage?.formats?.thumbnail?.url;
  const blurDataUrl = thumbnailUrl
    ? await getStrapiImageAsBase64(thumbnailUrl)
    : undefined;

  return (
    <Hero
      title={data.title}
      subtitle={data.subtitle}
      backgroundImage={getStrapiMediaProxyUrl(data.backgroundImage?.url)}
      backgroundBlurData={blurDataUrl ?? (data.backgroundImage ? heroShimmer : undefined)}
      ctaButtons={data.ctaButtons?.map((btn) => ({
        text: btn.text,
        href: btn.href,
        scrollTo: btn.scrollTo,
        variant: btn.variant,
      })) ?? []}
    />
  );
}
