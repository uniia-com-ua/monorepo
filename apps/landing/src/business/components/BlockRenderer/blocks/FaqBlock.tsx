import type { FaqBlock as FaqBlockData } from "@workspace/strapi";
import Faq from "../../Faq";

interface Props {
  data: FaqBlockData;
}

export default function FaqBlock({ data }: Props) {
  return (
    <Faq
      heading={data.heading}
      items={data.items.map((item) => ({
        id: String(item.id),
        question: item.question,
        answer: item.answer,
      }))}
    />
  );
}
