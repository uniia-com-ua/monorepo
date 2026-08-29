import type { Core } from "@strapi/strapi";

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://*.r2.dev",
            "https://*.r2.cloudflarestorage.com",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "https://*.r2.dev",
            "https://*.r2.cloudflarestorage.com",
          ],
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: env.array("CORS_ORIGINS", ["http://localhost:3000"]),
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "plugin::smart-populate.sanitize-smart-populate",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

export default config;
