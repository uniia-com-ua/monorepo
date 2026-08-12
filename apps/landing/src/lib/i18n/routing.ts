import { type Locale, hasLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ua"],
  defaultLocale: "ua",
});

export const {
  Link,
  redirect: _redirect,
  usePathname,
  useRouter,
} = createNavigation(routing);

// https://next-intl-docs.vercel.app/docs/routing/navigation#redirect
export const redirect: typeof _redirect = _redirect;

export const isValidLocale = (locale: string): locale is Locale => {
  return hasLocale(routing.locales, locale);
};
