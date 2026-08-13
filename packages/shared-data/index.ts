export const ROOT_PAGE_PATH = "/";

export const normalizePageFullPath = (
  paths: (string | undefined | null)[],
  locale?: string | null,
) => {
  const filteredPaths = paths.filter(Boolean) as string[];
  const rawPath = [ROOT_PAGE_PATH, ...filteredPaths]
    .join("/")
    .replaceAll(/\/+/g, "/");
  // Strip trailing slash except for the root path itself
  const fullPath = rawPath !== "/" ? rawPath.replace(/\/$/, "") : rawPath;

  if (locale) {
    // make sure not to add same locale twice
    if (fullPath.startsWith(`/${locale}/`) || fullPath === `/${locale}`) {
      return fullPath;
    }

    return `/${locale}${fullPath === "/" ? "" : fullPath}`;
  }

  return fullPath;
};

export type StrapiCacheTag<TUid extends string = string> = `strapi:${TUid}`;

export const strapiCacheTag = <TUid extends string>(
  uid: TUid,
): StrapiCacheTag<TUid> => `strapi:${uid}`;
