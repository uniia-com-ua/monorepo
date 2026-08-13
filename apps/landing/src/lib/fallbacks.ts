import { FallbackResult, Result } from "@workspace/strapi-types";

// ? type this to attributes of api::global.global
export const FALLBACK_GLOBAL: FallbackResult<"api::global.global"> = {
  header: {
    logo: null,
    navItems: [
      { label: "Про проєкт", scrollTo: "about" },
      { label: "Команда", scrollTo: "team" },
      { label: "Блог", scrollTo: "blog" },
    ],
    ctaButton: { text: "Розпочати", scrollTo: "blog" },
  },
  footer: {
    columns: [
      {
        title: "Унія",
        links: [
          { label: "Про проєкт", href: "/about" },
          { label: "Команда", href: "/team" },
          { label: "Блог", href: "/blog" },
          { label: "Часті питання", href: "/faq" },
        ],
      },
    ],
    socialLinks: [
      { url: "https://instagram.com/uniia" },
      { url: "https://facebook.com/uniia" },
      { url: "https://linkedin.com/company/uniia" },
    ],
    copyright: `uniia.com.ua © ${new Date().getFullYear()}`,
  },
  defaultSeo: {
    title: "Унія — Карбуй освіту",
    description:
      "Перша онлайн-платформа для студентів українських університетів",
  },
};
