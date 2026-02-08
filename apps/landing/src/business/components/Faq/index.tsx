"use client";

import { useState } from "react";

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

export interface FaqProps {
  heading?: string;
  items: FaqItemData[];
}

export default function Faq({ heading = "Питання і відповіді", items }: FaqProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="faq" className="w-full mt-section-gap px-6 md:px-10 lg:px-14">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl text-foreground font-semibold">
          {heading}
        </h2>
      </div>

      <div className="mx-auto divide-y divide-border">
        {items.map((item) => {
          const isOpen = openIds.has(item.id);

          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left cursor-pointer transition-colors hover:text-primary"
                aria-expanded={isOpen}
              >
                <span className="text-lg md:text-xl font-medium text-foreground">
                  {item.question}
                </span>
                <span
                  className={[
                    "shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-border transition-transform duration-200",
                    isOpen ? "rotate-45" : "",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1V13M1 7H13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                className={[
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0",
                ].join(" ")}
              >
                <p className="text-base text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
