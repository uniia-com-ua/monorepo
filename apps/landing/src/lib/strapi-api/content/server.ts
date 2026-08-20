import { FALLBACK_GLOBAL } from "@/lib/fallbacks";
import { PublicStrapiClient } from "@/lib/strapi-api";
import type { CustomFetchOptions } from "@/types/general";
import { strapiCacheTag } from "@workspace/shared-data";
import { FallbackResult, UID } from "@workspace/strapi-types";
import type { Locale } from "next-intl";
import "server-only";
import { StrapiClientParams } from "../client/base";

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

export async function fetchGlobalConfig(
  locale?: Locale,
  populate: StrapiClientParams<"api::global.global">["populate"] = {
    header: "smart",
    footer: "smart",
  },
  defaults: FallbackResult<"api::global.global"> = FALLBACK_GLOBAL,
) {
  try {
    return await PublicStrapiClient.fetchOne(
      "api::global.global",
      undefined,
      {
        locale,
        populate,
      },
      {
        next: {
          revalidate: 600,
          tags: [strapiCacheTag("api::global.global")],
        },
      },
    );
  } catch (error: unknown) {
    console.error(`[fetchGlobalConfig] Failed to fetch global config:`, error);

    return {
      data: defaults,
      meta: {},
    };
  }
}
