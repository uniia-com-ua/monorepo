import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStrapiMediaUrl, getAllPageSlugs } from "@workspace/strapi";
import BlockRenderer from "../../business/components/BlockRenderer";
import { getPageSafe } from "../../business/lib/get-page-safe";
import { getGlobalSafe } from "../../business/lib/get-global-safe";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!process.env.STRAPI_URL) return [];

  try {
    const slugs = await getAllPageSlugs();
    return slugs
      .filter((s) => s !== "/") // homepage handled by /page.tsx
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageSafe(slug);
  if (!page?.seo) return {};

  const global = await getGlobalSafe();

  return {
    title: page.seo.title || global.defaultSeo.title,
    description: page.seo.description || global.defaultSeo.description,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      images: page.seo.ogImage
        ? [{ url: getStrapiMediaUrl(page.seo.ogImage.url) }]
        : [],
    },
  };
}

export default async function DynamicPage({ params }: PageParams) {
  const { slug } = await params;
  const page = await getPageSafe(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="container max-w-container px-4 mx-auto flex flex-col items-center justify-center">
      <BlockRenderer blocks={page.blocks} />
    </div>
  );
}
