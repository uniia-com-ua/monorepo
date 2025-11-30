"use client";

import { useCallback, useState } from "react";
import { Button } from "@workspace/ui/components/base/button";

export default function Feedback() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sent");
    event.currentTarget.reset();
    setTimeout(() => setStatus("idle"), 4000);
  }, []);

  return (
    <section id="contact" className="w-full mt-5 mb-12">
      <div className="w-full rounded-[3rem] bg-[#05061a] text-white p-6 md:p-10 lg:p-14 shadow-[0_30px_80px_rgba(5,6,26,0.35)]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-[2.75rem] font-semibold leading-tight">
              Маєш ідеї або хочеш долучитися?
            </h2>
            <p className="text-base md:text-lg text-white/80">
              Напиши нам, якщо хочеш стати ментором, поділитися кейсом чи
              запропонувати співпрацю. Ми відповімо протягом найближчих днів.
            </p>
            <div
              className="inline-block bg-white/95 text-[#05061a] m-8 px-6 py-4 rounded-[1.5rem] shadow-[0_20px_50px_rgba(5,6,26,0.35)] rotate-4 relative"
              style={{ transformOrigin: "left top" }}
            >
              <div className="absolute -top-3 -left-3 size-6 bg-[#FFB703] rounded-full shadow-md" />
              <p className="text-lg font-semibold mb-3">Що отримаєш</p>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>Особисту відповідь від команди</li>
                <li>Наступні кроки щодо співпраці</li>
                <li>Доступ до спільноти Унії</li>
              </ul>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(5,6,26,0.25)] p-6 md:p-8 flex flex-col gap-5 text-[#05061a]"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Імʼя та прізвище
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Олександр Шевченко"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-[#05061a] outline-none focus:ring-2 focus:ring-[#146EF4]/40 focus:border-[#146EF4]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Електронна пошта
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@uniia.com"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-[#05061a] outline-none focus:ring-2 focus:ring-[#146EF4]/40 focus:border-[#146EF4]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">
                Повідомлення
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Розкажіть коротко про свою пропозицію або питання..."
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-[#05061a] outline-none focus:ring-2 focus:ring-[#146EF4]/40 focus:border-[#146EF4] resize-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full md:w-auto">
                Надіслати повідомлення
              </Button>
              {status === "sent" && (
                <p className="text-sm text-green-500">
                  Дякуємо! Ми скоро з вами звʼяжемось.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}


