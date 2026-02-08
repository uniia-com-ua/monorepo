"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@workspace/ui/components/base/button";
import { useScrollTo } from "@workspace/ui/hooks/use-scroll-to";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerTitle,
} from "@workspace/ui/components/drawer";

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

  const handleNavClick = useCallback(
    (item: HeaderNavItem) => {
      if (item.scrollTo) {
        scrollTo(item.scrollTo);
        setIsOpen(false);
      }
    },
    [scrollTo]
  );

  const handleCtaClick = useCallback(() => {
    if (ctaButton?.scrollTo) {
      scrollTo(ctaButton.scrollTo);
      setIsOpen(false);
    }
  }, [ctaButton, scrollTo]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-sm h-(--header-height)">
      <div className="mx-auto max-w-container px-4 flex h-full gap-5 items-center justify-between">
        <div className="flex items-center gap-9">
          <Link
            href="/"
            className={`flex items-center select-none transition-opacity duration-300 ${
              isOpen ? "md:opacity-100 opacity-0" : "opacity-100"
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
            <nav className="hidden md:flex items-center gap-5">
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
        <div className="hidden md:flex items-center gap-5">
          <Button variant="ghost" type="button">
            ENG
          </Button>
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
            <div className="flex items-center justify-between p-4 border-b border-border">
              <DrawerTitle className="sr-only">Навігаційне меню</DrawerTitle>
              <Link
                href="/"
                className="flex items-center select-none"
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
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Закрити меню"
                >
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
                        className="flex items-center w-full px-4 py-3 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleNavClick(item)}
                        className="flex items-center w-full px-4 py-3 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors text-left"
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="p-4 border-t border-border space-y-3">
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
