"use client";

import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@workspace/ui/components/base/button";

const NAV_ITEMS = [
  { label: "Про проєкт", target: "about" },
  { label: "Команда", target: "team" },
  { label: "Блог", target: "blog" },
] as const;

function Header() {
  const handleScroll = useCallback((target: string) => {
    const section = document.getElementById(target);
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
    <header className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-sm h-[92px]">
      <div className="mx-auto max-w-container px-4 flex h-full gap-5 items-center justify-between">
        <div className="flex items-center gap-9">
          <Link
            href="/"
            className="flex items-center select-none"
            aria-label="Унія"
          >
            <Image
              src="/icons/Logo.svg"
              alt="Унія"
              width={104}
              height={44}
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.target}
                variant="ghost"
                type="button"
                onClick={() => handleScroll(item.target)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <Button variant="ghost" type="button">
            ENG
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => handleScroll("blog")}
          >
            Розпочати
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;