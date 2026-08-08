import qs from "qs";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

function getStrapiURL(): string {
  const url = process.env.STRAPI_URL;
  if (!url) {
    throw new Error(
      "Missing STRAPI_URL environment variable. Set it in .env.local",
    );
  }
  return url.replace(/\/$/, ""); // strip trailing slash
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};

  const token = process.env.STRAPI_API_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const cfId = process.env.CF_ACCESS_CLIENT_ID;
  const cfSecret = process.env.CF_ACCESS_CLIENT_SECRET;

  if (cfId && cfSecret) {
    headers["CF-Access-Client-Id"] = cfId;
    headers["CF-Access-Client-Secret"] = cfSecret;
  }

  return headers;
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
  opts: FetchAPIOptions = {},
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
      `Strapi API error: ${res.status} ${res.statusText} — ${url}`,
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

/**
 * Fetch an image from Strapi and return it as a base64 data URL.
 * Useful for generating blur placeholders from thumbnail images.
 *
 * @param url - Strapi media URL (relative or absolute)
 * @returns Base64 data URL or undefined if fetch fails
 */
export async function getStrapiImageAsBase64(
  url: string | undefined | null,
): Promise<string | undefined> {
  if (!url) return undefined;

  try {
    const fullUrl = getStrapiMediaUrl(url);
    const res = await fetch(fullUrl, {
      headers: getAuthHeaders(),
      next: { revalidate: 86400 },
    });

    if (!res.ok) return undefined;

    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const contentType = res.headers.get("content-type") || "image/jpeg";

    return `data:${contentType};base64,${base64}`;
  } catch {
    return undefined;
  }
}

/**
 * Return a proxy path that routes through `/api/cms-media/…` so that
 * Next.js Image Optimization (and the browser) can reach files behind
 * Cloudflare Access without needing CF-Access-* headers on the client.
 *
 * Use this instead of {@link getStrapiMediaUrl} when the URL will be passed
 * to `<Image src={…} />` or rendered as `<img>`.
 */
export function getStrapiMediaProxyUrl(url: string | undefined | null): string {
  if (!url) return "";

  let path = url;
  if (path.startsWith("http")) {
    const base = getStrapiURL();
    path = path.replace(base, "");
  }

  if (!path.startsWith("/")) path = `/${path}`;
  return `/api/cms-media${path}`;
}
