import { fetchAPI } from "../client";
import type { PageAttributes, StrapiListResponse } from "../types";

/**
 * Fetch a Page entry by its slug.
 *
 * Deeply populates the Dynamic Zone blocks so we get all nested data.
 * Cached indefinitely — use `revalidateTag("page-{slug}")` to bust.
 */
export async function getPageBySlug(
  slug: string
): Promise<PageAttributes | null> {
  const res = await fetchAPI<StrapiListResponse<PageAttributes>>(
    "/api/pages",
    {
      filters: { slug: { $eq: slug } },
      populate: {
        seo: {
          populate: {
            ogImage: { fields: ["url", "alternativeText", "width", "height"] },
          },
        },
        blocks: {
          on: {
            "blocks.hero": {
              populate: {
                backgroundImage: {
                  fields: ["url", "alternativeText", "width", "height", "formats"],
                },
                ctaButtons: { populate: "*" },
              },
            },
            "blocks.about-cards": {
              populate: {
                cards: { populate: "*" },
              },
            },
            "blocks.team": {
              populate: {
                image: {
                  fields: ["url", "alternativeText", "width", "height", "formats"],
                },
                stats: { populate: "*" },
              },
            },
            "blocks.feedback-form": {
              populate: {
                benefits: { populate: "*" },
              },
            },
          },
        },
      },
    },
    {
      next: { revalidate: false, tags: ["pages", `page-${slug}`] },
    }
  );

  const entry = res.data[0];
  return entry ? entry.attributes : null;
}

/**
 * Fetch all page slugs (for static generation with generateStaticParams).
 */
export async function getAllPageSlugs(): Promise<string[]> {
  const res = await fetchAPI<StrapiListResponse<{ slug: string }>>(
    "/api/pages",
    {
      fields: ["slug"],
      pagination: { pageSize: 100 },
    },
    {
      next: { revalidate: false, tags: ["pages"] },
    }
  );

  return res.data.map((entry) => entry.attributes.slug);
}
