import { getGlobal } from "@workspace/strapi";
import type { GlobalAttributes } from "@workspace/strapi";
import { FALLBACK_GLOBAL } from "./fallback-data";

/**
 * Safely fetch Global data from Strapi.
 * Falls back to hardcoded data if Strapi is unreachable or returns
 * incomplete data (e.g. unpopulated components come back as null).
 */
export async function getGlobalSafe(): Promise<GlobalAttributes> {
  if (!process.env.STRAPI_URL) {
    return FALLBACK_GLOBAL;
  }

  try {
    const data = await getGlobal();

    return {
      header: data.header ?? FALLBACK_GLOBAL.header,
      footer: data.footer ?? FALLBACK_GLOBAL.footer,
      defaultSeo: data.defaultSeo ?? FALLBACK_GLOBAL.defaultSeo,
    };
  } catch (error) {
    console.error("[getGlobalSafe] Failed to fetch from Strapi:", error);
    return FALLBACK_GLOBAL;
  }
}
