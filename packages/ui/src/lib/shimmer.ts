/**
 * Generate a shimmer placeholder for images
 * Used as blurDataURL for Next.js Image component
 */

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#e5e7eb" offset="20%" />
      <stop stop-color="#f3f4f6" offset="50%" />
      <stop stop-color="#e5e7eb" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#e5e7eb" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

/**
 * Generate a shimmer placeholder data URL
 * @param width - Width of the placeholder
 * @param height - Height of the placeholder
 * @returns Base64 encoded data URL for use as blurDataURL
 */
export function getShimmerPlaceholder(width = 700, height = 475): string {
  return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;
}

/**
 * Default shimmer placeholder for common use cases
 */
export const defaultShimmer = getShimmerPlaceholder(700, 475);

/**
 * Hero section shimmer (wider aspect ratio)
 */
export const heroShimmer = getShimmerPlaceholder(1920, 1080);

/**
 * Card/thumbnail shimmer
 */
export const cardShimmer = getShimmerPlaceholder(400, 300);
