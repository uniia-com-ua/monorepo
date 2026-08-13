import About from "@/business/components/About";
import { PageBuilderComponentProps } from "@/types/general";
import { Data } from "@workspace/strapi-types";
import "server-only";

export function StrapiAboutBlock({
  component,
}: PageBuilderComponentProps & {
  component: Data.Component<"blocks.about-cards">;
}) {
  const { heading, subheading, cards } = component;

  return (
    <About
      heading={heading || ""}
      subheading={subheading || ""}
      cards={
        cards?.map((card) => ({
          id: String(card.id),
          title: card.title || "",
          description: card.description || "",
          variant: card.variant || "default",
          cta: card.cta || undefined,
          scrollTarget: card.scrollTarget || undefined,
        })) || []
      }
    />
  );
}
