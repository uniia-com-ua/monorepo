import type { HeroBlock as HeroBlockData } from "@workspace/strapi";
import { getStrapiMediaUrl } from "@workspace/strapi";
import Hero from "../../Hero";

interface Props {
  data: HeroBlockData;
}

export default function HeroBlock({ data }: Props) {
  return (
    <Hero
      title={data.title}
      subtitle={data.subtitle}
      backgroundImage={getStrapiMediaUrl(data.backgroundImage?.url)}
      ctaButtons={data.ctaButtons?.map((btn) => ({
        text: btn.text,
        href: btn.href,
        scrollTo: btn.scrollTo,
        variant: btn.variant,
      })) ?? []}
    />
  );
}
