import StrapiPageView from "@/components/layouts/StrapiPageView";
import { isDevelopment } from "@/lib/helpers";
import { isValidLocale } from "@/lib/i18n/routing";
import { getMetadataFromStrapi } from "@/lib/metadata";
import {
  fetchAllPages,
  fetchPage,
  fetchPageSeo,
} from "@/lib/strapi-api/content/server";
import { ROOT_PAGE_PATH } from "@workspace/shared-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { use } from "react";

export const dynamic = "force-static";
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (isDevelopment()) {
    return [{ locale: "en" }];
  }

  const results = await fetchAllPages("api::page.page", locale);

  const params =
    results?.data.map((page) => ({
      locale: page.locale,
      rest:
        page.slug === "/" ? [] : (page.slug?.split("/").filter(Boolean) ?? []),
    })) ?? [];

  return params;
}

export async function generateMetadata(
  props: PageProps<"/[locale]/[[...rest]]">,
): Promise<Metadata | null> {
  const { locale, rest } = await props.params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const fullPath = ROOT_PAGE_PATH + (rest ?? []).join("/");

  return getMetadataFromStrapi({
    locale,
    fullPath,
  });
}

export default function StaticStrapiPage(
  props: PageProps<"/[locale]/[[...rest]]">,
) {
  const params = use(props.params);
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  return <StrapiPageView params={params} />;
}
