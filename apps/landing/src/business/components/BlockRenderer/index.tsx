import type { DynamicBlock } from "@workspace/strapi";
import HeroBlock from "./blocks/HeroBlock";
import AboutCardsBlock from "./blocks/AboutCardsBlock";
import TeamBlock from "./blocks/TeamBlock";
import FeedbackFormBlock from "./blocks/FeedbackFormBlock";

type BlockComponent = React.ComponentType<{ data: never }>;

const blockComponents: Record<string, BlockComponent> = {
  "blocks.hero": HeroBlock as BlockComponent,
  "blocks.about-cards": AboutCardsBlock as BlockComponent,
  "blocks.team": TeamBlock as BlockComponent,
  "blocks.feedback-form": FeedbackFormBlock as BlockComponent,
};

interface BlockRendererProps {
  blocks: DynamicBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        const Component = blockComponents[block.__component];
        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              `[BlockRenderer] Unknown block type: ${block.__component}`
            );
          }
          return null;
        }
        return <Component key={`${block.__component}-${block.id}`} data={block as never} />;
      })}
    </>
  );
}
