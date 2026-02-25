import { fetchAPI } from "../client";
import type { GlobalAttributes, StrapiResponse } from "../types";

/**
 * Fetch the Global single type (header, footer, default SEO).
 *
 * Cached indefinitely — use `revalidateTag("global")` to bust.
 */
export async function getGlobal(): Promise<GlobalAttributes> {
  const res = await fetchAPI<StrapiResponse<GlobalAttributes>>(
    "/api/global",
    {
      populate: {
        header: {
          populate: {
            logo: { fields: ["url", "alternativeText", "width", "height"] },
            navItems: { populate: "*" },
            ctaButton: { populate: "*" },
          },
        },
        footer: {
          populate: {
            columns: { populate: { links: { populate: "*" } } },
            socialLinks: { populate: "*" },
          },
        },
        defaultSeo: {
          populate: {
            ogImage: { fields: ["url", "alternativeText", "width", "height"] },
          },
        },
      },
    },
    {
      next: { revalidate: false, tags: ["global"] },
    }
  );

  return res.data;
}
