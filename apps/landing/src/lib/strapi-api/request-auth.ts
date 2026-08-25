import { getEnvVar } from "@/lib/env-vars";
import { ALLOWED_STRAPI_ENDPOINTS } from "./client-config";
import { StrapiHttpMethod } from "./config";

export const isStrapiEndpointAllowed = (
  path: string,
  method: StrapiHttpMethod,
): boolean => {
  return ALLOWED_STRAPI_ENDPOINTS[method].some(
    (allowedEndpoint) => path.startsWith(allowedEndpoint) ?? false,
  );
};
export const formatStrapiAuthHeader = (apiToken?: string) => {
  if (!apiToken) {
    return {} as Record<string, string>;
  }

  return {
    Authorization: `Bearer ${apiToken}`,
  };
};

export const createStrapiAuthHeader = async ({
  isReadOnly,
}: {
  isReadOnly: boolean;
}) => {
  const apiToken = getEnvVar(
    isReadOnly ? "STRAPI_API_TOKEN" : "STRAPI_API_CUSTOM_TOKEN",
  );

  return formatStrapiAuthHeader(apiToken);
};
