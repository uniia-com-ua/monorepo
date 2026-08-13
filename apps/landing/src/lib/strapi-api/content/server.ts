import { PublicStrapiClient } from "@/lib/strapi-api";
import type { CustomFetchOptions } from "@/types/general";
import { UID } from "@workspace/strapi-types";
import type { Locale } from "next-intl";
import "server-only";

export async function fetchPage(
  fullPath: string,
  locale?: Locale,
  requestInit?: RequestInit,
  options?: CustomFetchOptions,
) {
  try {
    return await PublicStrapiClient.fetchOneByFullPath(
      "api::page.page",
      fullPath,
      {
        locale,
        populate: {
          seo: "smart",
          blocks: "smart",
        },
      },
      {
        ...requestInit,
        next: {
          ...requestInit?.next,
          revalidate: requestInit?.next?.revalidate ?? 120,
        },
      },
      options,
    );
  } catch (error: unknown) {
    console.error(`[fetchPage] Failed to fetch page "${fullPath}":`, error);
  }
}

export async function fetchAllPages(
  uid: Extract<UID.ContentType, "api::page.page"> = "api::page.page",
  locale?: Locale,
  params?: Record<string, unknown>,
  requestInit?: RequestInit,
) {
  try {
    return await PublicStrapiClient.fetchAll(
      uid,
      {
        locale,
        fields: ["slug", "locale", "updatedAt", "createdAt"],
        populate: {},
        status: "published",
        ...params,
      },
      requestInit,
    );
  } catch (error: unknown) {
    console.error(`[fetchAllPages] Failed to fetch all pages:`, error);

    return { data: [] };
  }
}

export async function fetchPageSeo(
  uid: Extract<UID.ContentType, "api::page.page"> = "api::page.page",
  fullPath: string | null,
  locale?: Locale,
) {
  try {
    return await PublicStrapiClient.fetchOneByFullPath(uid, fullPath, {
      locale,
      populate: {
        seo: "smart",
        localizations: true,
      },
    });
  } catch (error: unknown) {
    console.error(
      `[fetchPageSeo] Failed to fetch page SEO for "${fullPath}":`,
      error,
    );
  }
}
