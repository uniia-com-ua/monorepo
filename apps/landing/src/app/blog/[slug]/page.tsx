import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getBlogPost,
  getAllBlogSlugs,
  getStrapiMediaProxyUrl,
} from "@workspace/strapi";

interface BlogPostPageParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!process.env.STRAPI_URL) return [];

  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageParams): Promise<Metadata> {
  const { slug } = await params;

  if (!process.env.STRAPI_URL) return {};

  try {
    const post = await getBlogPost(slug);
    if (!post) return {};

    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.cover
          ? [{ url: getStrapiMediaProxyUrl(post.cover.url) }]
          : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: BlogPostPageParams) {
  const { slug } = await params;

  if (!process.env.STRAPI_URL) {
    notFound();
  }

  let post;
  try {
    post = await getBlogPost(slug);
  } catch (error) {
    console.error(`[BlogPostPage] Failed to fetch post "${slug}":`, error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const coverUrl = post.cover ? getStrapiMediaProxyUrl(post.cover.url) : null;

  return (
    <div className="container max-w-container px-4 mx-auto py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        &larr; Назад до блогу
      </Link>

      <article className="max-w-3xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            {post.author && <span>{post.author}</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("uk-UA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </div>
        </header>

        {coverUrl && (
          <div className="relative aspect-video rounded-3xl overflow-hidden mb-10 shadow-card">
            <Image
              src={coverUrl}
              alt={post.cover?.alternativeText || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
