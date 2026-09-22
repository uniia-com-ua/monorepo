import "server-only";
import { PageBuilder } from "../../dev-preview";

export const StrapiRichText = PageBuilder.new(
  "shared.rich-text",
  ({ component }) => {
    const { body } = component;

    return (
      <div
        className="prose prose-lg text-foreground max-w-none"
        dangerouslySetInnerHTML={{ __html: body || "" }}
      />
    );
  },
);

StrapiRichText.fallback = {
  id: 0,
  body: `
  <h2>Why Next.js?</h2>

  <p>
    <a href="https://nextjs.org/">Next.js</a> has become one of the most
    popular React frameworks for building modern web applications. It
    provides routing, server-side rendering, static generation, caching,
    and many other features without requiring developers to assemble
    everything themselves.
  </p>

  <p>
    One of its biggest advantages is that you can choose how each page
    should be rendered. A mostly static website can take advantage of
    static generation, while dynamic pages can be rendered on the server
    when necessary.
  </p>
  `,
};
