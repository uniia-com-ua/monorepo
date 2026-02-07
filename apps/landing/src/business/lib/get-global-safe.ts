import { getGlobal } from "@workspace/strapi";
import type { GlobalAttributes } from "@workspace/strapi";
import { FALLBACK_GLOBAL } from "./fallback-data";

/**
 * Safely fetch Global data from Strapi.
 * Falls back to hardcoded data if Strapi is unreachable.
 */
export async function getGlobalSafe(): Promise<GlobalAttributes> {
  if (!process.env.STRAPI_URL) {
    return FALLBACK_GLOBAL;
  }

  try {
    return await getGlobal();
  } catch (error) {
    console.error("[getGlobalSafe] Failed to fetch from Strapi:", error);
    return FALLBACK_GLOBAL;
  }
}
