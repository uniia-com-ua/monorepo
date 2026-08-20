import { StrapiLocalization } from "@/types/api";
import { ROOT_PAGE_PATH, normalizePageFullPath } from "@workspace/shared-data";
import { StrapiMedia } from "@workspace/strapi";
import { Data, UID } from "@workspace/strapi-types";
import mergeWith from "lodash/mergeWith";
import { Metadata } from "next";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getEnvVar } from "./env-vars";
import { FALLBACK_HOME_PAGE } from "./fallbacks";
import { isValidLocale, routing } from "./i18n/routing";
import { fetchPageSeo } from "./strapi-api/content/server";
import { formatStrapiMediaUrl } from "./strapi-api/media";

type TranslationFunction = Awaited<ReturnType<typeof getTranslations>>;

function getDefaultMetadata(siteUrl: string, t: TranslationFunction) {
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: t("metaKeywords"),

    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "16x16 32x32" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
    },

    metadataBase: new URL(siteUrl),
  } as Metadata;
}
function getDefaulOgMeta(
  locale: Locale | undefined,
  fullPath: string | undefined,
  t: TranslationFunction,
) {
  return {
    type: "website",
    locale: locale,
    siteName: t("og.siteName"),
    title: t("og.title"),
    description: t("og.description"),

    url: [routing.defaultLocale !== locale ? locale : null, fullPath]
      .filter(Boolean)
      .join("/"),
  } as Metadata["openGraph"];
}
function getDefaultTwitterMeta(t: TranslationFunction) {
  return {
    card: "summary",
    title: t("twitter.title"),
    description: t("twitter.description"),
  } as Metadata["twitter"];
}
function getMetaAlternates(
  seo: Data.Component<"shared.seo"> | null | undefined,
  fullPath: string | undefined,
  locale: Locale,
  localizations?: StrapiLocalization[],
) {
  const canonicalUrl = fullPath ?? "";
  let languages: Record<string, string> = {};

  if (localizations && localizations.length > 0) {
    for (const localization of localizations) {
      if (!localization.locale || !isValidLocale(localization.locale)) {
        continue;
      }

      languages[localization.locale] = normalizePageFullPath(
        [canonicalUrl],
        localization.locale,
      );
    }

    languages[locale] = normalizePageFullPath(
      [canonicalUrl],
      locale === routing.defaultLocale ? undefined : locale,
    );

    if (locale === routing.defaultLocale || languages[routing.defaultLocale]) {
      languages[routing.defaultLocale] = normalizePageFullPath([canonicalUrl]);
      languages["x-default"] = normalizePageFullPath([canonicalUrl]);
    }
  }

  const canonical = normalizePageFullPath(
    [canonicalUrl],
    locale === routing.defaultLocale ? undefined : locale,
  );

  return {
    canonical,
    languages,
  };
}
function getSocialMedia(
  seo: Data.Component<"shared.seo"> | null | undefined,
  canonicalUrl: string | undefined,
): {
  openGraph: Metadata["openGraph"];
  twitter: Metadata["twitter"];
} {
  const ogImageSeo = seo?.ogImage as StrapiMedia | undefined;

  return {
    twitter: {
      card: "summary",
      title: seo?.title ?? undefined,
      description: seo?.description ?? undefined,
      images: ogImageSeo
        ? [formatStrapiMediaUrl(ogImageSeo.url) ?? ""]
        : undefined,
    },
    openGraph: {
      type: "website",
      title: seo?.title ?? undefined,
      description: seo?.description ?? undefined,
      url: canonicalUrl ?? undefined,
      images: ogImageSeo
        ? [
            {
              url: formatStrapiMediaUrl(ogImageSeo.url) ?? "",
              width: ogImageSeo.width,
              height: ogImageSeo.height,
              alt: ogImageSeo.alternativeText ?? undefined,
            },
          ]
        : undefined,
    },
  };
}

export async function getMetadataFromStrapi({
  fullPath,
  locale,
  uid = "api::page.page",
  customMetadata,
}: {
  fullPath?: string;
  locale: Locale;
  customMetadata?: Metadata;
  uid?: Extract<UID.ContentType, "api::page.page">;
}): Promise<Metadata | null> {
  const t = await getTranslations({
    locale,
    namespace: "seo",
  });
  const siteUrl = getEnvVar("NEXT_PUBLIC_SITE_URL", true)!;

  let defaultMeta: Metadata = getDefaultMetadata(siteUrl, t);
  const defaultOgMeta: Metadata["openGraph"] = getDefaulOgMeta(
    locale,
    fullPath,
    t,
  );
  const defaultTwitterMeta: Metadata["twitter"] = getDefaultTwitterMeta(t);

  if (!fullPath) {
    return {
      ...defaultMeta,
      openGraph: defaultOgMeta,
      twitter: defaultTwitterMeta,
    };
  }

  try {
    return await fetchStrapiMetadata(
      locale,
      fullPath,
      defaultMeta,
      defaultOgMeta,
      defaultTwitterMeta,
      customMetadata,
      uid,
    );
  } catch (error: unknown) {
    console.error("Error fetching metadata from Strapi:", error);

    return {
      ...defaultMeta,
      openGraph: defaultOgMeta,
    };
  }
}

const seoMerger = (defaultValue: unknown, strapiValue: unknown) =>
  strapiValue ?? defaultValue;

async function fetchStrapiMetadata(
  locale: Locale,
  fullPath: string,
  defaultMeta: Metadata,
  defaultOgMeta: Metadata["openGraph"],
  defaultTwitterMeta: Metadata["twitter"],

  customMetadata?: Metadata,
  uid: Extract<UID.ContentType, "api::page.page"> = "api::page.page",
): Promise<Metadata | null> {
  const res = await fetchPageSeo(uid, fullPath, locale);
  const { seo, localizations } = res?.data ?? {};

  const strapiMeta =
    fullPath === ROOT_PAGE_PATH
      ? (seo ?? FALLBACK_HOME_PAGE.seo)
      : {
          title: seo?.title,
          description: seo?.description,
          keywords: seo?.keywords,
        };
  const alternates = getMetaAlternates(seo, fullPath, locale, localizations);
  const socialMedia = getSocialMedia(seo, alternates.canonical);

  return {
    ...mergeWith(defaultMeta, strapiMeta, seoMerger),
    openGraph: mergeWith(defaultOgMeta, socialMedia.openGraph, seoMerger),
    twitter: mergeWith(defaultTwitterMeta, socialMedia.twitter, seoMerger),
    alternates,
    ...customMetadata,
  };
}
