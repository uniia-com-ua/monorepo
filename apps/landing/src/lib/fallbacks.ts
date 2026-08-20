import { FallbackResult, Result } from "@workspace/strapi-types";

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
} as const;

export const FALLBACK_HOME_PAGE: FallbackResult<"api::page.page"> = {
  slug: "/",
  seo: {
    title: "Унія — Карбуй освіту",
    description:
      "Перша онлайн-платформа для студентів українських університетів",
  },
  blocks: [
    {
      __component: "blocks.hero",
      id: 1,
      title: "Карбуй освіту",
      subtitle:
        "Перша онлайн-платформа для студентів українських університетів",
      backgroundImage: {
        id: 1,
        url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alternativeText: "Hero background",
        width: 1920,
        height: 1080,
        formats: null,
      },
      ctaButtons: [
        { text: "Розпочати", scrollTo: "about" },
        { text: "Дізнатись більше", scrollTo: "about", variant: "glass" },
      ],
    },
    {
      __component: "blocks.about-cards",
      id: 2,
      heading: "Про Унію",
      subheading:
        "Ми створюємо екосистему, де освіта поєднує технології та людей. Кожен може долучитись, поділитись досвідом та прокачати свої навички.",
      cards: [
        {
          id: 1,
          title: "Наша місія — сучасна цифрова освіта для кожного",
          description:
            "Унія — це простір, у якому освіта стає стилем життя. Ми віримо, що якісна освіта має бути доступною, інтерактивною та цікавою.",
          variant: "light",
          cta: "Дізнатись більше",
          scrollTarget: "team",
        },
        {
          id: 2,
          title: "Разом змінюємо освіту",
          description:
            "Викладачі, студенти, дослідники та всі, хто цінує якісні знання, можуть долучитися, обмінюватися досвідом і розвивати освіту разом із нами.",
          variant: "dark",
        },
        {
          id: 3,
          title: "Проводимо онлайн та офлайн лекції",
          description:
            "Організовуємо лекції онлайн і офлайн для вашого комфорту та зручності навчання.",
          variant: "dark",
        },
        {
          id: 4,
          title: "Створюємо онлайн-платформу для студентів",
          description:
            "Об'єднуємо знання та інновації, щоб зробити навчання доступним і зручним для кожного студента.",
          variant: "light",
          cta: "Розпочати",
          scrollTarget: "contact",
        },
      ],
    },
    {
      __component: "blocks.team",
      id: 3,
      heading: "Команда Унії",
      subheading:
        "Об'єднуємо менторів, викладачів та студентів, щоб продовжувати впливати на освіту в Україні.",
      image: {
        id: 2,
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1900&q=80",
        alternativeText: "Команда Унії на зустрічі",
        width: 1900,
        height: 1080,
        formats: null,
      },
      infoTitle: "Цей проєкт є частиною ГО «Молодіжна ініціатива Унія»",
      infoDescription:
        "Ми прагнемо зробити якісну освіту доступнішою, поєднуючи сучасні технології, науковий підхід та активну громадську участь. Разом ми будуємо майбутнє, де знання стають інструментом змін.",
      stats: [
        { id: 1, value: "450+", label: "Учасники спільноти" },
        { id: 2, value: "35", label: "Партнери та ментори" },
        { id: 3, value: "12", label: "Проєкти на підтримці" },
        { id: 4, value: "24", label: "Місяців розвитку" },
      ],
      ctaTitle: "Стань частиною команди вже сьогодні",
      ctaDescription:
        "Приєднуйся, щоб створювати нові освітні рішення, підтримувати студентів та розвивати цифрову культуру в університетах.",
      ctaButton: { text: "Долучитись", scrollTo: "contact" },
    },
    {
      __component: "blocks.feedback-form",
      id: 4,
      title: "Маєш ідеї або хочеш долучитися?",
      subtitle:
        "Напиши нам, якщо хочеш стати ментором, поділитися кейсом чи запропонувати співпрацю. Ми відповімо протягом найближчих днів.",
      benefitsHeading: "Що отримаєш",
      benefits: [
        { id: 1, text: "Особисту відповідь від команди" },
        { id: 2, text: "Наступні кроки щодо співпраці" },
        { id: 3, text: "Доступ до спільноти Унії" },
      ],
    },
  ],
} as const;
