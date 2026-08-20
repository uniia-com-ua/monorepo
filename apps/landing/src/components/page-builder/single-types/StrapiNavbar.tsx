import Header from "@/business/components/Header";
import { fetchGlobalConfig } from "@/lib/strapi-api/content/server";
import { formatStrapiMediaUrl } from "@/lib/strapi-api/media";
import { Locale } from "next-intl";
import { use } from "react";
import "server-only";

export function StrapiNavbar({ locale }: { locale: Locale }) {
  const response = use(
    fetchGlobalConfig(locale, {
      header: "smart",
    }),
  );

  if (response?.data?.header == null) {
    return null;
  }

  const { logo, navItems, ctaButton } = response.data.header;

  return (
    <Header
      logoUrl={logo ? formatStrapiMediaUrl(logo.url) : undefined}
      navItems={navItems?.map((item) => ({
        label: item.label || "",
        href: item.href || undefined,
        scrollTo: item.scrollTo || undefined,
      }))}
      // @ts-expect-error strapi gives us a CTA button variants but header component doesnt care about it prob @FIXME:?
      ctaButton={ctaButton ?? undefined}
    />
  );
}
