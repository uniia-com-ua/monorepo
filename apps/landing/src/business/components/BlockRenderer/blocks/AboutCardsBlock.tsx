import type { AboutCardsBlock as AboutCardsBlockData } from "@workspace/strapi";
import About from "../../About";

interface Props {
  data: AboutCardsBlockData;
}

export default function AboutCardsBlock({ data }: Props) {
  return (
    <About
      heading={data.heading}
      subheading={data.subheading}
      cards={data.cards.map((card) => ({
        id: String(card.id),
        title: card.title,
        description: card.description,
        variant: card.variant,
        cta: card.cta,
        scrollTarget: card.scrollTarget,
      }))}
    />
  );
}
