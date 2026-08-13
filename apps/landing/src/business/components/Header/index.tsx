"use client";

import LocaleSwitcher from "@/components/elementary/LocaleSwitcher";
import { Button } from "@workspace/ui/components/base/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer";
import { useScrollTo } from "@workspace/ui/hooks/use-scroll-to";
import { Menu, X } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

export interface HeaderNavItem {
  label: string;
  href?: string;
  scrollTo?: string;
}

export interface HeaderCtaButton {
  text: string;
  href?: string;
  scrollTo?: string;
}

export interface HeaderProps {
  logoUrl?: string;
  navItems?: HeaderNavItem[];
  ctaButton?: HeaderCtaButton;
}

export default function Header({
  logoUrl,
  navItems = [],
  ctaButton,
}: HeaderProps) {
  const scrollTo = useScrollTo();
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();

  const handleNavClick = useCallback(
    (item: HeaderNavItem) => {
      if (item.scrollTo) {
        scrollTo(item.scrollTo);
        setIsOpen(false);
      }
    },
    [scrollTo],
  );

  const handleCtaClick = useCallback(() => {
    if (ctaButton?.scrollTo) {
      scrollTo(ctaButton.scrollTo);
      setIsOpen(false);
    }
  }, [ctaButton, scrollTo]);

  return (
    <header className="bg-background/70 h-(--header-height) fixed inset-x-0 top-0 z-50 backdrop-blur-sm">
      <div className="max-w-container mx-auto flex h-full items-center justify-between gap-5 px-4">
        <div className="flex items-center gap-9">
          <Link
            href="/"
            className={`flex select-none items-center transition-opacity duration-300 ${
              isOpen ? "opacity-0 md:opacity-100" : "opacity-100"
            }`}
            aria-label="Унія"
          >
            <Image
              src={logoUrl || "/icons/Logo.svg"}
              alt="Унія"
              width={104}
              height={44}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          {navItems.length > 0 && (
            <nav className="hidden items-center gap-2 md:flex min-[820px]:gap-5">
              {navItems.map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  type="button"
                  onClick={
                    item.scrollTo ? () => scrollTo(item.scrollTo!) : undefined
                  }
                  {...(item.href && !item.scrollTo ? { asChild: true } : {})}
                >
                  {item.href && !item.scrollTo ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    item.label
                  )}
                </Button>
              ))}
            </nav>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">
          <LocaleSwitcher locale={locale} />
          {ctaButton && (
            <Button
              variant="secondary"
              type="button"
              onClick={
                ctaButton.scrollTo
                  ? () => scrollTo(ctaButton.scrollTo!)
                  : undefined
              }
            >
              {ctaButton.text}
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Drawer
          direction="right"
          open={isOpen}
          onOpenChange={setIsOpen}
          modal={false}
        >
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Відкрити меню"
            >
              <Menu className="size-6" />
            </Button>
          </DrawerTrigger>

          <DrawerContent className="h-full w-[85vw] max-w-sm">
            {/* Mobile Menu Header */}
            <div className="border-border flex items-center justify-between border-b p-4">
              <DrawerTitle className="sr-only">Навігаційне меню</DrawerTitle>
              <Link
                href="/"
                className="flex select-none items-center"
                aria-label="Унія"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={logoUrl || "/icons/Logo.svg"}
                  alt="Унія"
                  width={90}
                  height={38}
                  priority
                />
              </Link>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" aria-label="Закрити меню">
                  <X className="size-6" />
                </Button>
              </DrawerClose>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <li key={i}>
                    {item.href && !item.scrollTo ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-foreground/80 hover:text-foreground hover:bg-muted flex w-full items-center rounded-lg px-4 py-3 text-lg font-medium transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleNavClick(item)}
                        className="text-foreground/80 hover:text-foreground hover:bg-muted flex w-full items-center rounded-lg px-4 py-3 text-left text-lg font-medium transition-colors"
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="border-border space-y-3 border-t p-4">
              {ctaButton && (
                <Button
                  variant="secondary"
                  type="button"
                  className="w-full"
                  onClick={handleCtaClick}
                >
                  {ctaButton.text}
                </Button>
              )}
              <Button variant="ghost" type="button" className="w-full">
                ENG
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
