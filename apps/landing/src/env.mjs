import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,

  server: {
    STRAPI_URL: z.string().url().optional(),
    STRAPI_REST_READONLY_API_KEY: z.string().optional(),
    STRAPI_REST_CUSTOM_API_KEY: z.string().optional(),
  },
  client: {},
  shared: {
    NODE_ENV: z.enum(["development", "production"]),
  },

  runtimeEnv: {
    // Server-side environment variables
    STRAPI_URL: process.env.STRAPI_URL,
    STRAPI_REST_READONLY_API_KEY: process.env.STRAPI_REST_READONLY_API_KEY,
    STRAPI_REST_CUSTOM_API_KEY: process.env.STRAPI_REST_CUSTOM_API_KEY,

    // Shared environment variables
    NODE_ENV: process.env.NODE_ENV,
  },
});
