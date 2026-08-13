import { type Locale, hasLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "uk"],
  defaultLocale: "uk",
  localePrefix: "as-needed",
});

export const isValidLocale = (locale: string): locale is Locale => {
  return hasLocale(routing.locales, locale);
};
