import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts, getStrapiMediaUrl } from "@workspace/strapi";

export const metadata: Metadata = {
  title: "Блог",
  description: "Новини, статті та оновлення від команди Унії",
};

export default async function BlogPage() {
  let posts;
  let hasPosts = false;

  if (process.env.STRAPI_URL) {
    try {
      const res = await getBlogPosts(1, 12);
      posts = res.data;
      hasPosts = posts.length > 0;
    } catch (error) {
      console.error("[BlogPage] Failed to fetch blog posts:", error);
    }
  }

  return (
    <div className="container max-w-container px-4 mx-auto py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl text-foreground font-semibold">
          Блог
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mt-4">
          Новини, статті та оновлення від команди Унії
        </p>
      </div>

      {!hasPosts ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            Поки що тут порожньо. Скоро з&apos;являться нові статті!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts!.map((post) => {
            const attrs = post.attributes;
            const coverUrl = attrs.cover
              ? getStrapiMediaUrl(attrs.cover.url)
              : null;

            return (
              <Link
                key={post.id}
                href={`/blog/${attrs.slug}`}
                className="group"
              >
                <article className="bg-card rounded-3xl shadow-card overflow-hidden transition-shadow hover:shadow-card-elevated">
                  {coverUrl && (
                    <div className="relative aspect-video">
                      <Image
                        src={coverUrl}
                        alt={attrs.cover?.alternativeText || attrs.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-3">
                    <h2 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {attrs.title}
                    </h2>
                    {attrs.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {attrs.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
                      {attrs.author && <span>{attrs.author}</span>}
                      {attrs.publishedAt && (
                        <time dateTime={attrs.publishedAt}>
                          {new Date(attrs.publishedAt).toLocaleDateString(
                            "uk-UA",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
