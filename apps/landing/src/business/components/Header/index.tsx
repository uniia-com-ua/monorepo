import Link from "next/link";
import Image from "next/image";
import { Button } from "@workspace/ui/components/base/button";

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-sm h-[92px]">
      <div className="mx-auto max-w-7xl px-4 flex h-full gap-5 items-center justify-between">
        <div className="flex items-center gap-9">
          <Link href="/" className="flex items-center select-none" aria-label="Унія">
            <Image src="/icons/Logo.svg" alt="Унія" width={104} height={44} priority />
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            <Button variant="ghost">Про проєкт</Button>
            <Button variant="ghost">Команда</Button>
            <Button variant="ghost">Блог</Button>
          </nav>
        </div>

        <div className="flex items-center gap-5">
            <Button variant="ghost">ENG</Button>
            <Button variant="secondary">Розпочати</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;