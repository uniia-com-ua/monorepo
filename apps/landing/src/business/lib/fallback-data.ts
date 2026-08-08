/**
 * Fallback data used when Strapi is unavailable or not yet configured.
 * This ensures the app can still render during development.
 */
import type { GlobalAttributes, PageAttributes } from "@workspace/strapi";

export const FALLBACK_GLOBAL: GlobalAttributes = {
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
    bottomLinks: [
      { label: "Про проєкт", href: "/about" },
      { label: "Команда", href: "/team" },
      { label: "Партнерам", href: "/partners" },
      { label: "Блог", href: "/blog" },
      { label: "Обробка персональних даних", href: "/privacy" },
    ],
  },
  defaultSeo: {
    title: "Унія — Карбуй освіту",
    description:
      "Перша онлайн-платформа для студентів українських університетів",
  },
};

export const FALLBACK_HOME_PAGE: PageAttributes = {
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
      // backgroundImage: {
      //   id: 1,
      //   url: "https://cms.uniia.com.ua/uploads/large_main_image_62cce1a3bf.webp",
      //   alternativeText: "Hero background",
      //   width: 1920,
      //   height: 1080,
      //   formats: null,
      // },
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
      ctaButtonText: "Взяти участь",
    },
    {
      __component: "blocks.faq",
      id: 5,
      heading: "Питання і відповіді",
      items: [
        {
          id: 1,
          question: "Як почати навчання?",
          answer:
            "Після швидкої реєстрації ви можете обрати свій курс та почати використовувати нашу платформу для власного навчання на повну",
        },
        {
          id: 2,
          question: "Чи є у вас мобільний застосунок?",
          answer:
            "Зараз ми працюємо над мобільною версією нашої платформи, щоб ви могли навчатися в будь-який зручний для вас час",
        },
        {
          id: 3,
          question: "Чи є обмеження на доступ до контенту?",
          answer:
            "Немає обмежень — вся інформація на платформі Унія є відкритою та безкоштовною для всіх користувачів",
        },
      ],
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
};
