"use client";

import { Button } from "@workspace/ui/components/base/button";
import { useCallback } from "react";

type CardConfig = {
  title: string;
  description: string;
  variant: "light" | "dark";
  cta?: string;
};

const cards: CardConfig[] = [
  {
    title: "Наша місія — сучасна цифрова освіта для кожного",
    description:
      "Унія — це простір, у якому освіта стає стилем життя. Ми віримо, що якісна освіта має бути доступною, інтерактивною та цікавою.",
    variant: "light",
    cta: "Дізнатись більше",
  },
  {
    title: "Разом змінюємо освіту",
    description:
      "Викладачі, студенти, дослідники та всі, хто цінує якісні знання, можуть долучитися, обмінюватися досвідом і розвивати освіту разом із нами.",
    variant: "dark",
  },
  {
    title: "Проводимо онлайн та офлайн лекції",
    description:
      "Організовуємо лекції онлайн і офлайн для вашого комфорту та зручності навчання.",
    variant: "dark",
  },
  {
    title: "Створюємо онлайн-платформу для студентів",
    description:
      "Об’єднуємо знання та інновації, щоб зробити навчання доступним і зручним для кожного студента.",
    variant: "light",
    cta: "Розпочати",
  },
];

export default function About() {
  const scrollToTeam = useCallback(() => {
    const section = document.getElementById("team");
    if (!section) return;

    const yOffset = 100;
    const y =
      section.getBoundingClientRect().top + window.scrollY - yOffset;

    window.scrollTo({
      top: y > 0 ? y : 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <section id="about" className="w-full mt-10">
      <div className="w-full rounded-[3rem] bg-[#f4f5f7] p-11 shadow-[0_30px_80px_rgba(5,6,26,0.08)]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-[2.75rem] text-[#05061a] font-semibold">
            Про Унію
          </h2>
          <p className="text-base md:text-lg text-gray-500 mt-4">
            Ми створюємо екосистему, де освіта поєднує технології та людей.
            Кожен може долучитись, поділитись досвідом та прокачати свої
            навички.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card) => {
            const isDark = card.variant === "dark";

            return (
              <article
                key={card.title}
                className={[
                  "rounded-[2rem] p-6 md:p-8 flex flex-col gap-6",
                  isDark
                    ? "bg-[#05061a] text-white shadow-[0_25px_60px_rgba(5,6,26,0.35)]"
                    : "bg-white text-[#05061a] shadow-[0_20px_40px_rgba(5,6,26,0.08)]",
                ].join(" ")}
              >
                <div className="space-y-4">
                  <h3 className="text-2xl leading-tight font-medium">
                    {card.title}
                  </h3>
                  <p
                    className={[
                      "text-base leading-relaxed",
                      isDark ? "text-white/70" : "text-gray-600",
                    ].join(" ")}
                  >
                    {card.description}
                  </p>
                </div>

                {card.cta && (
                  <div className="pt-2">
                    <Button
                      variant={isDark ? "white" : "default"}
                      className={isDark ? "text-[#05061a]" : ""}
                      onClick={
                        card.title ===
                        "Наша місія — сучасна цифрова освіта для кожного"
                          ? scrollToTeam
                          : undefined
                      }
                    >
                      {card.cta}
                    </Button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


