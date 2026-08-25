import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,

  server: {
    STRAPI_URL: z.string().url().optional(),
    STRAPI_API_TOKEN: z.string().optional(),
    STRAPI_API_CUSTOM_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production"]),
  },

  runtimeEnv: {
    // Server-side environment variables
    STRAPI_URL: process.env.STRAPI_URL,
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
    STRAPI_API_CUSTOM_TOKEN: process.env.STRAPI_API_CUSTOM_TOKEN,

    // Client-side environment variables
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,

    // Shared environment variables
    NODE_ENV: process.env.NODE_ENV,
  },
});
