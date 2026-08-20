import Feedback from "@/business/components/Feedback";
import { PageBuilderComponentProps } from "@/types/general";
import { Data } from "@workspace/strapi-types";
import "server-only";

export function StrapiFeedbackForm({
  component,
}: PageBuilderComponentProps & {
  component: Data.Component<"blocks.feedback-form">;
}) {
  const { title, subtitle, benefitsHeading, benefits } = component;

  return (
    <Feedback
      title={title || ""}
      subtitle={subtitle || ""}
      benefitsHeading={benefitsHeading || ""}
      benefits={benefits?.filter((b) => !!b.text).map((b) => b.text!) ?? []}
    />
  );
}
