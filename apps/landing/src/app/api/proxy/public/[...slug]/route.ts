import { getEnvVar } from "@/lib/env-vars";
import {
  createStrapiAuthHeader,
  isStrapiEndpointAllowed,
} from "@/lib/strapi-api/request-auth";
import { NextResponse } from "next/server";

async function handler(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;

  const path = Array.isArray(slug) ? slug.join("/") : slug;

  const isAccessible = isStrapiEndpointAllowed(path, req.method as any);
  if (!isAccessible) {
    return NextResponse.json(
      {
        error: {
          message: `Path \`${path}\` is not accessible`,
          name: "Forbidden",
        },
      },
      { status: 403 },
    );
  }

  const strapiUrl = getEnvVar("STRAPI_URL", true);

  const { search } = new URL(req.url);
  const url = `${strapiUrl}/${path}${search}`;
  const isReadOnly = ["GET", "HEAD"].includes(req.method ?? "GET");

  const clonnedReq = req.clone();

  let body: string | Blob | undefined = undefined;
  if (!isReadOnly) {
    const contentType = clonnedReq.headers.get("content-type");

    if (contentType?.includes("multipart/form-data")) {
      // File upload - preserve FormData as blob
      body = await clonnedReq.blob();
    } else {
      // Regular API call - use text for JSON
      body = await clonnedReq.text();
    }
  }

  const authHeader = await createStrapiAuthHeader({ isReadOnly });

  console.log(`[Strapi Proxy] ${req.method} ${url} (readOnly: ${isReadOnly})`);

  const response = await fetch(url, {
    headers: {
      ...Object.fromEntries(clonnedReq.headers.entries()),
      ...authHeader,
    },
    body,
    method: req.method,
  });

  const headers = new Headers(response.headers);
  headers.delete("content-encoding");
  headers.delete("content-length");

  return new NextResponse(response.body, {
    status: response.status,
    headers,
  });
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
