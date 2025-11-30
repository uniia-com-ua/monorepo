import { Button } from "@workspace/ui/components/base/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className={`relative w-full h-[calc(100vh-182px)] flex items-center rounded-[3rem] justify-center overflow-hidden`}>
      {/* Фонове зображення */}
      <Image
        src="https://cms.uniia.com.ua/uploads/large_main_image_62cce1a3bf.webp"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />

      {/* Напівпрозорий градієнт (нижня половина) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/90 pointer-events-none" style={{
        backgroundPosition: '0 60%',
        backgroundSize: '100% 200%'
      }} />

      {/* Контент */}
      <div className="relative z-10 max-w-container mx-auto px-4 text-center flex flex-col items-center justify-center pb-25 mt-auto mb-12 w-full" style={{ alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
        <h1 className="text-[2.5rem] md:text-[3.5rem] text-white mb-1 max-w-2xl">
          Карбуй освіту
        </h1>
        <p className="text-[13px] font-light text-gray-200 mb-6">
          Перша онлайн-платформа для студентів українських університетів <Image src="/icons/ua-flag.svg" alt="Ukraine" width={20} height={20} className="inline-block mb-0.5" />
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button>
            Розпочати
          </Button>
          <Button variant="glass">
            Дізнатись більше
          </Button>
        </div>
      </div>
    </div>
  );
}
