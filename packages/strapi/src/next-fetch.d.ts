/**
 * Extend the global fetch RequestInit with Next.js-specific options.
 * This allows using `next: { revalidate, tags }` in fetch calls.
 */
declare global {
  interface RequestInit {
    next?: {
      revalidate?: number | false;
      tags?: string[];
    };
  }
}

export {};
