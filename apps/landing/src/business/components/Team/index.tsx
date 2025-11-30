import Image from "next/image";
import { Button } from "@workspace/ui/components/base/button";

export default function Team() {
  return (
    <section id="team" className="w-full mt-20">
      <div className="w-full rounded-[3rem] bg-[#f4f5f7] p-6 md:p-10 lg:p-14 shadow-[0_30px_80px_rgba(5,6,26,0.08)] space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-[2.75rem] text-[#05061a] font-semibold">
            Команда Унії
          </h2>
          <p className="text-base md:text-lg text-gray-500 mt-4">
            Об’єднуємо менторів, викладачів та студентів, щоб продовжувати
            впливати на освіту в Україні.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
          <div className="relative min-h-[260px] md:min-h-[320px] lg:min-h-[380px] rounded-[2rem] overflow-hidden shadow-[0_25px_60px_rgba(5,6,26,0.18)]">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1900&q=80"
              alt="Команда Унії на зустрічі"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </div>

          <article className="bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(5,6,26,0.08)] p-6 md:p-8 flex flex-col gap-6">
            <div className="flex items-center">
              <Image
                src="/icons/heart_pulse.svg"
                alt="Heart pulse icon"
                width={44}
                height={44}
                priority
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl leading-tight text-[#05061a] font-medium">
              Цей проєкт є частиною ГО «Молодіжна ініціатива Унія»
              </h3>
              <p className="text-base leading-relaxed text-gray-600">
                Ми прагнемо зробити якісну освіту доступнішою, поєднуючи сучасні
                технології, науковий підхід та активну громадську участь. Разом
                ми будуємо майбутнє, де знання стають інструментом змін.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[#05061a]">
              {[
                { label: "Учасники спільноти", value: "450+" },
                { label: "Партнери та ментори", value: "35" },
                { label: "Проєкти на підтримці", value: "12" },
                { label: "Місяців розвитку", value: "24" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-[#f8f8fb] p-4 flex flex-col gap-1"
                >
                  <span className="text-2xl font-semibold">{stat.value}</span>
                  <span className="text-xs uppercase tracking-wide text-gray-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div id="blog" className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(5,6,26,0.12)] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl text-[#05061a] font-medium mb-3">
              Стань частиною команди вже сьогодні
            </h3>
            <p className="text-gray-600">
              Приєднуйся, щоб створювати нові освітні рішення, підтримувати
              студентів та розвивати цифрову культуру в університетах.
            </p>
          </div>
          <Button className="w-full md:w-auto" variant="default" shadow="lg">
            Взяти участь
          </Button>
        </div>
      </div>
    </section>
  );
}


