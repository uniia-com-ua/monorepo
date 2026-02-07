"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@workspace/ui/components/base/button";
import { useScrollTo } from "@workspace/ui/hooks/use-scroll-to";

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

export default function Header({ logoUrl, navItems = [], ctaButton }: HeaderProps) {
  const scrollTo = useScrollTo();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-sm h-(--header-height)">
      <div className="mx-auto max-w-container px-4 flex h-full gap-5 items-center justify-between">
        <div className="flex items-center gap-9">
          <Link
            href="/"
            className="flex items-center select-none"
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

          {navItems.length > 0 && (
            <nav className="hidden md:flex items-center gap-5">
              {navItems.map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  type="button"
                  onClick={
                    item.scrollTo
                      ? () => scrollTo(item.scrollTo!)
                      : undefined
                  }
                  {...(item.href && !item.scrollTo
                    ? { asChild: true }
                    : {})}
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

        <div className="flex items-center gap-5">
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
      </div>
    </header>
  );
}
