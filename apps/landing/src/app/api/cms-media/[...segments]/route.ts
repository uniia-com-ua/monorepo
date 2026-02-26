import { type NextRequest, NextResponse } from "next/server";

/**
 * Proxy for Strapi media files that sit behind Cloudflare Access.
 *
 * Next.js Image Optimization fetches remote images server-side but cannot
 * attach CF-Access-* headers. This route fetches on behalf of the optimizer
 * and returns the raw binary with aggressive caching.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ segments: string[] }> },
) {
  const { segments } = await params;
  const path = "/" + segments.join("/");
  const strapiUrl = process.env.STRAPI_URL;

  if (!strapiUrl) {
    return NextResponse.json(
      { error: "STRAPI_URL not configured" },
      { status: 500 },
    );
  }

  const headers: Record<string, string> = {};

  const cfId = process.env.CF_ACCESS_CLIENT_ID;
  const cfSecret = process.env.CF_ACCESS_CLIENT_SECRET;
  if (cfId && cfSecret) {
    headers["CF-Access-Client-Id"] = cfId;
    headers["CF-Access-Client-Secret"] = cfSecret;
  }

  const upstream = await fetch(`${strapiUrl}${path}`, { headers });

  if (!upstream.ok) {
    return new NextResponse(null, { status: upstream.status });
  }

  const contentType =
    upstream.headers.get("content-type") || "application/octet-stream";
  const body = await upstream.arrayBuffer();

  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
