import { StrapiImageMedia } from "@/types/api";

const LOCAL_STRAPI_MEDIA_URL = "http://127.0.0.1:1337";
const APP_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const formatStrapiMediaUrl = (imageUrl?: string) => {
  if (!imageUrl) return undefined;

  if (!imageUrl.startsWith("http") && imageUrl.includes("/uploads")) {
    if (typeof window === "undefined") {
      return `/api/cms-media${imageUrl}`;
    }

    const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(
      window.location.hostname,
    );

    if (isLocalhost) {
      return `${LOCAL_STRAPI_MEDIA_URL}${imageUrl}`;
    }

    return imageUrl;
  }

  return imageUrl;
};

export const getStrapiMedia = async (
  strapiImage: StrapiImageMedia,
  generateBlurData: boolean = false,
) => {
  if (!strapiImage)
    return { image: undefined, url: undefined, blurDataUrl: undefined };

  const imageUrl = formatStrapiMediaUrl(strapiImage.url);
  let blurDataUrl: string | undefined = undefined;

  if (generateBlurData && strapiImage.formats?.thumbnail?.url) {
    const thumbnailUrl = formatStrapiMediaUrl(
      strapiImage.formats.thumbnail.url,
    );

    if (thumbnailUrl) {
      const response = await fetch(new URL(thumbnailUrl, APP_ORIGIN));
      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const mimeType = strapiImage.formats.thumbnail.mime || "image/jpeg";
      blurDataUrl = `data:${mimeType};base64,${base64}`;
    }
  }

  return { image: strapiImage, url: imageUrl, blurDataUrl };
};
