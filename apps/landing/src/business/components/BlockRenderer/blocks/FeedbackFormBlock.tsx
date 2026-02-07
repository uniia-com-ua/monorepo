import type { FeedbackFormBlock as FeedbackFormBlockData } from "@workspace/strapi";
import Feedback from "../../Feedback";

interface Props {
  data: FeedbackFormBlockData;
}

export default function FeedbackFormBlock({ data }: Props) {
  return (
    <Feedback
      title={data.title}
      subtitle={data.subtitle}
      benefitsHeading={data.benefitsHeading}
      benefits={data.benefits?.map((b) => b.text) ?? []}
    />
  );
}
