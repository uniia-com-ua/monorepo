"use client";

import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { Button } from "@workspace/ui/components/base/button";
import { Locale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { type FC, Suspense, useTransition } from "react";

const LOCALES_TRANSLATIONS: Record<Locale, string> = {
  en: "ENG",
  uk: "UKR",
};

interface LocaleSwitcherProps {
  locale: Locale;
}

const LocaleSwitcherActual: FC<LocaleSwitcherProps> = ({ locale }) => {
  const [, startTransition] = useTransition();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLocaleChange = (newLocale: Locale) => {
    const queryParams = searchParams.toString();

    startTransition(() => {
      router.replace(
        queryParams.length > 0 ? `${pathname}?${queryParams}` : pathname,
        { locale: newLocale, scroll: true },
      );
    });
  };

  return (
    <Button
      variant="ghost"
      type="button"
      onClick={() => handleLocaleChange(locale === "en" ? "uk" : "en")}
    >
      {LOCALES_TRANSLATIONS[locale === "en" ? "uk" : "en"]}
    </Button>
  );
};

const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ locale }) => {
  return (
    <Suspense>
      <LocaleSwitcherActual locale={locale} />
    </Suspense>
  );
};

export default LocaleSwitcher;
