import Footer from "@/business/components/Footer";
import { fetchGlobalConfig } from "@/lib/strapi-api/content/server";
import { formatStrapiMediaUrl } from "@/lib/strapi-api/media";
import { Locale } from "next-intl";
import { use } from "react";
import "server-only";

export function StrapiFooter({ locale }: { locale: Locale }) {
  const response = use(
    fetchGlobalConfig(locale, {
      footer: "smart",
    }),
  );

  if (response?.data?.footer == null) {
    return null;
  }

  const { copyright, columns, socialLinks } = response.data.footer;

  return (
    <Footer
      copyright={copyright ?? undefined}
      columns={
        columns?.map((column) => ({
          title: column.title || "",
          links:
            column.links?.map((link) => ({
              label: link.label || "",
              href: link.href || "",
            })) || [],
        })) || []
      }
      socialLinks={
        socialLinks?.map((link) => ({
          url: link.url || "",
          icon: {
            url: formatStrapiMediaUrl(link.icon?.url) || "",
            alternativeText: link.icon?.alternativeText || undefined,
          },
        })) || []
      }
    />
  );
}
