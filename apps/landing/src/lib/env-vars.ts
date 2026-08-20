import { env } from "@/env.mjs";

/**
 * Wrapper around @t3-oss/env-nextjs to safely access environment variables.
 * @param key Environment variable name to retrieve.
 * @param throwIfMissing Whether to throw an error if the environment variable is missing. Defaults to false.
 * @returns The value of the environment variable, or undefined if not found and throwIfMissing is false.
 */
export const getEnvVar = <K extends keyof typeof env>(
  key: K,
  throwIfMissing: boolean = false,
): (typeof env)[K] | undefined => {
  try {
    const value = env[key];

    if (!value || value === "") {
      throw new Error(`Environment variable ${key} is not defined or empty.`);
    }

    return value;
  } catch (e: unknown) {
    if (throwIfMissing) {
      throw e;
    }
  }
};
