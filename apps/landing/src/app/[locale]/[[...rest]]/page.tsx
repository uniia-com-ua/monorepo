import StrapiPageView from "@/components/layouts/StrapiPageView";
import { isDevelopment } from "@/lib/helpers";
import { isValidLocale } from "@/lib/i18n/routing";
import {
  fetchAllPages,
  fetchPage,
  fetchPageSeo,
} from "@/lib/strapi-api/content/server";
import { ROOT_PAGE_PATH } from "@workspace/shared-data";
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

  if (params.length > 0) {
    return params;
  }

  // @todo: handle static export
}

export async function generateMetadata(
  props: PageProps<"/[locale]/[[...rest]]">,
) {
  const { locale, rest } = await props.params;

  if (!isValidLocale(locale)) {
    return;
  }

  const fullPath = ROOT_PAGE_PATH + (rest ?? []).join("/");

  const page = await fetchPageSeo("api::page.page", fullPath, locale);
  if (!page || !page.data?.seo) return null;

  return {
    title: page.data.seo.title,
    description: page.data.seo.description,
    openGraph: {
      title: page.data.seo.title,
      description: page.data.seo.description,
    },
  };
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
