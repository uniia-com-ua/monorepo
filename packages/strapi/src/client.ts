import qs from "qs";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

function getStrapiURL(): string {
  const url = process.env.STRAPI_URL;
  if (!url) {
    throw new Error(
      "Missing STRAPI_URL environment variable. Set it in .env.local"
    );
  }
  return url.replace(/\/$/, ""); // strip trailing slash
}

function getAuthHeaders(): Record<string, string> {
  const token = process.env.STRAPI_API_TOKEN;
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

// ---------------------------------------------------------------------------
// Core fetch utility
// ---------------------------------------------------------------------------

export interface FetchAPIOptions {
  /** Next.js extended fetch options */
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

/**
 * Low-level function to call any Strapi REST API endpoint.
 *
 * @param path   - API path, e.g. `/api/pages`
 * @param params - Query parameters (filters, populate, sort, etc.)
 * @param opts   - Next.js fetch cache options
 */
export async function fetchAPI<T = unknown>(
  path: string,
  params: Record<string, unknown> = {},
  opts: FetchAPIOptions = {}
): Promise<T> {
  const baseUrl = getStrapiURL();
  const queryString = qs.stringify(params, { encodeValuesOnly: true });
  const url = `${baseUrl}${path}${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    next: opts.next,
  });

  if (!res.ok) {
    throw new Error(
      `Strapi API error: ${res.status} ${res.statusText} — ${url}`
    );
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Helper: resolve Strapi media URL
// ---------------------------------------------------------------------------

/**
 * Convert a relative Strapi media URL to an absolute URL.
 * If the url is already absolute, returns it as-is.
 */
export function getStrapiMediaUrl(url: string | undefined | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${getStrapiURL()}${url}`;
}
