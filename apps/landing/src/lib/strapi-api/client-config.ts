import { StrapiConfig, createStrapiConfig } from "./config";

export const STRAPI_CLIENT_CONFIG = createStrapiConfig(
  {
    "api::page.page": {
      path: "/pages",
      allowedMethods: ["GET"],
    },
    "api::global.global": {
      path: "/globals",
      allowedMethods: ["GET"],
    },
  },
  {},
);

export const ALLOWED_STRAPI_ENDPOINTS: StrapiConfig["allowedEndpoints"] =
  STRAPI_CLIENT_CONFIG.allowedEndpoints;
export const STRAPI_ENDPOINTS: StrapiConfig["endpoints"] =
  STRAPI_CLIENT_CONFIG.endpoints;
