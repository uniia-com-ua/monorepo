import type { UID } from "@workspace/strapi-types";
import { StrapiAboutBlock } from "./components/blocks/StrapiAboutBlock";
import { StrapiFeedbackForm } from "./components/blocks/StrapiFeedbackForm";
import { StrapiHeroBlock } from "./components/blocks/StrapiHeroBlock";
import { StrapiTeamBlock } from "./components/blocks/StrapiTeamBlock";

export const PageContentComponents: Partial<
  Record<UID.Component, React.ComponentType<any>>
> = {
  "blocks.hero": StrapiHeroBlock,
  "blocks.about-cards": StrapiAboutBlock,
  "blocks.team": StrapiTeamBlock,
  "blocks.feedback-form": StrapiFeedbackForm,
};
