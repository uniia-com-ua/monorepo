import { Button } from "@workspace/ui/components/base/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className={`relative w-full h-[calc(100vh-200px)] flex items-center rounded-[3rem] justify-center overflow-hidden`}>
      {/* Фонове зображення */}
      <Image
        src="https://cms.uniia.com.ua/uploads/large_main_image_62cce1a3bf.webp"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />

      {/* Напівпрозорий градієнт */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Контент */}
      <div className="relative z-10 container mx-auto mt-[calc(100vh-700px)] px-4 text-center flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 max-w-2xl">
          Карбуй освіту
        </h1>
        <p className="text-md text-gray-200 mb-8">
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
