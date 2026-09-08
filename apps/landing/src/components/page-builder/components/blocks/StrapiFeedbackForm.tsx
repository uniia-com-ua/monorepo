import Feedback from "@/business/components/Feedback";
import "server-only";
import { PageBuilder } from "../../dev-preview";

export const StrapiFeedbackForm = PageBuilder.new(
  "blocks.feedback-form",
  ({ component }) => {
    const { title, subtitle, benefitsHeading, benefits } = component;

    return (
      <Feedback
        title={title || ""}
        subtitle={subtitle || ""}
        benefitsHeading={benefitsHeading || ""}
        benefits={benefits?.filter((b) => !!b.text).map((b) => b.text!) ?? []}
      />
    );
  },
);

StrapiFeedbackForm.fallback = {
  id: 0,
  title: "We value your feedback",
  subtitle: "Please let us know your thoughts and suggestions.",
  benefitsHeading: "Why provide feedback?",
  benefits: [
    { id: 1, text: "Help us improve our services" },
    { id: 2, text: "Share your ideas and suggestions" },
    { id: 3, text: "Contribute to our community" },
  ],
};
