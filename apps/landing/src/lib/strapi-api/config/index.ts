import type { UID } from "@workspace/strapi-types";

export type StrapiHttpMethod =
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT";

export type StrapiConfigEntry = {
  path: string;
  allowedMethods?: readonly StrapiHttpMethod[];
};

export type StrapiConfigInput = Partial<
  Record<UID.ContentType, StrapiConfigEntry>
>;
export type StrapiConfigExtraAllowedEndpoints = Partial<
  Record<StrapiHttpMethod, readonly string[]>
>;

export type StrapiConfig = {
  endpoints: Partial<Record<UID.ContentType, string>>;
  allowedEndpoints: Record<StrapiHttpMethod, string[]>;
};

const STRAPI_HTTP_METHODS: readonly StrapiHttpMethod[] = [
  "DELETE",
  "GET",
  "HEAD",
  "OPTIONS",
  "PATCH",
  "POST",
  "PUT",
];

const createEmptyAllowedEndpoints = (): Record<StrapiHttpMethod, string[]> =>
  STRAPI_HTTP_METHODS.reduce(
    (accumulator, method) => ({
      ...accumulator,
      [method]: [],
    }),
    {} as Record<StrapiHttpMethod, string[]>,
  );

const normalizePath = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;

const toAllowedEndpoint = (path: string) => `api${normalizePath(path)}`;

const addUniqueValue = (collection: string[], value: string) => {
  if (!collection.includes(value)) {
    collection.push(value);
  }
};

export const createStrapiConfig = (
  config: StrapiConfigInput,
  extraAllowedEndpoints: StrapiConfigExtraAllowedEndpoints = {},
): StrapiConfig => {
  const endpoints: Partial<Record<UID.ContentType, string>> = {};
  const allowedEndpoints = createEmptyAllowedEndpoints();

  for (const [uid, entry] of Object.entries(config) as Array<
    [UID.ContentType, StrapiConfigEntry]
  >) {
    const path = normalizePath(entry.path);

    endpoints[uid] = path;

    const allowedPath = toAllowedEndpoint(path);
    for (const method of entry.allowedMethods ?? []) {
      addUniqueValue(allowedEndpoints[method], allowedPath);
    }
  }

  for (const [method, paths] of Object.entries(extraAllowedEndpoints) as Array<
    [StrapiHttpMethod, readonly string[]]
  >) {
    for (const path of paths) {
      addUniqueValue(allowedEndpoints[method], path);
    }
  }

  return {
    endpoints,
    allowedEndpoints,
  };
};
