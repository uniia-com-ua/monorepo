import { fetchAPI } from "../client";
import type {
  BlogPostAttributes,
  StrapiListResponse,
  StrapiResponse,
} from "../types";

const BLOG_REVALIDATE = 60; // seconds

/**
 * Fetch a paginated list of published blog posts.
 */
export async function getBlogPosts(
  page = 1,
  pageSize = 12
): Promise<StrapiListResponse<BlogPostAttributes>> {
  return fetchAPI<StrapiListResponse<BlogPostAttributes>>(
    "/api/blog-posts",
    {
      sort: ["publishedAt:desc"],
      pagination: { page, pageSize },
      populate: {
        cover: {
          fields: ["url", "alternativeText", "width", "height", "formats"],
        },
        category: { fields: ["name", "slug"] },
      },
    },
    {
      next: { revalidate: BLOG_REVALIDATE, tags: ["blog"] },
    }
  );
}

/**
 * Fetch a single blog post by slug.
 */
export async function getBlogPost(
  slug: string
): Promise<BlogPostAttributes | null> {
  const res = await fetchAPI<StrapiListResponse<BlogPostAttributes>>(
    "/api/blog-posts",
    {
      filters: { slug: { $eq: slug } },
      populate: {
        cover: {
          fields: ["url", "alternativeText", "width", "height", "formats"],
        },
        category: { fields: ["name", "slug"] },
      },
    },
    {
      next: { revalidate: BLOG_REVALIDATE, tags: ["blog", `blog-${slug}`] },
    }
  );

  const entry = res.data[0];
  return entry ? entry.attributes : null;
}

/**
 * Fetch all blog post slugs (for generateStaticParams).
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const res = await fetchAPI<StrapiListResponse<{ slug: string }>>(
    "/api/blog-posts",
    {
      fields: ["slug"],
      sort: ["publishedAt:desc"],
      pagination: { pageSize: 200 },
    },
    {
      next: { revalidate: BLOG_REVALIDATE, tags: ["blog"] },
    }
  );

  return res.data.map((entry) => entry.attributes.slug);
}
