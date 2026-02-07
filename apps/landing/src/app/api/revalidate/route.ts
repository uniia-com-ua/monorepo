import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation endpoint for Strapi webhooks.
 *
 * POST /api/revalidate
 *
 * Headers:
 *   x-revalidate-secret: <REVALIDATION_SECRET>
 *
 * Body (JSON):
 *   { "tag": "global" | "pages" | "page-/" | "page-about" | "blog" | "blog-my-post" }
 *
 * Strapi webhook should be configured to call this endpoint
 * when content is created, updated, deleted, published, or unpublished.
 */
export async function POST(request: NextRequest) {
  // Validate secret
  const secret = request.headers.get("x-revalidate-secret");
  const expectedSecret = process.env.REVALIDATION_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { error: "REVALIDATION_SECRET not configured on server" },
      { status: 500 }
    );
  }

  if (secret !== expectedSecret) {
    return NextResponse.json(
      { error: "Invalid revalidation secret" },
      { status: 401 }
    );
  }

  // Parse body
  let body: { tag?: string; tags?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Support both single tag and array of tags
  const tags: string[] = [];
  if (body.tag) tags.push(body.tag);
  if (body.tags && Array.isArray(body.tags)) tags.push(...body.tags);

  if (tags.length === 0) {
    return NextResponse.json(
      { error: "No tags provided. Send { tag: \"...\" } or { tags: [\"...\"] }" },
      { status: 400 }
    );
  }

  // Revalidate each tag
  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json({
    revalidated: true,
    tags,
    timestamp: Date.now(),
  });
}
