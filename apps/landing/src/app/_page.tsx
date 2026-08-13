import { getStrapiMediaProxyUrl } from "@workspace/strapi";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlockRenderer from "../business/components/BlockRenderer/index.js";
import { getGlobalSafe } from "../business/lib/get-global-safe.js";
import { getPageSafe } from "../business/lib/get-page-safe.js";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSafe("/");
  if (!page?.seo) return {};

  const global = await getGlobalSafe();
  const seo = page.seo;

  return {
    title: seo.title || global.defaultSeo.title,
    description: seo.description || global.defaultSeo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImage
        ? [{ url: getStrapiMediaProxyUrl(seo.ogImage.url) }]
        : [],
    },
  };
}

export default async function HomePage() {
  const page = await getPageSafe("/");

  if (!page) {
    notFound();
  }

  return (
    <div className="max-w-container container mx-auto flex flex-col items-center justify-center px-4">
      <BlockRenderer blocks={page.blocks} />
    </div>
  );
}
