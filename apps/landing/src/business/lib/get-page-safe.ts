import { getPageBySlug } from "@workspace/strapi";
import type { PageAttributes } from "@workspace/strapi";
import { FALLBACK_HOME_PAGE } from "./fallback-data";

/**
 * Safely fetch a Page by slug from Strapi.
 * Falls back to hardcoded data for the homepage if Strapi is unreachable.
 */
export async function getPageSafe(
  slug: string
): Promise<PageAttributes | null> {
  if (!process.env.STRAPI_URL) {
    return slug === "/" ? FALLBACK_HOME_PAGE : null;
  }

  try {
    return await getPageBySlug(slug);
  } catch (error) {
    console.error(`[getPageSafe] Failed to fetch page "${slug}":`, error);
    return slug === "/" ? FALLBACK_HOME_PAGE : null;
  }
}
