import { getEnvVar } from "@/lib/env-vars";

export const isProduction = () => getEnvVar("NODE_ENV") === "production";
export const isDevelopment = () => getEnvVar("NODE_ENV") === "development";
