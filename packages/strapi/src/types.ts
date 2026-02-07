// ---------------------------------------------------------------------------
// Strapi generic wrappers
// ---------------------------------------------------------------------------

/** Wrapper Strapi returns for a single entity */
export interface StrapiResponse<T> {
  data: StrapiEntity<T>;
  meta: Record<string, unknown>;
}

/** Wrapper Strapi returns for a collection */
export interface StrapiListResponse<T> {
  data: StrapiEntity<T>[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  documentId: string;
  attributes: T;
}

/** Strapi media format (thumbnail, small, medium, large, etc.) */
export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  ext: string;
  mime: string;
}

/** Strapi media field */
export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: Record<string, StrapiMediaFormat> | null;
}

// ---------------------------------------------------------------------------
// Shared components (reusable across content types)
// ---------------------------------------------------------------------------

export interface SeoComponent {
  title: string;
  description: string;
  ogImage?: StrapiMedia | null;
  keywords?: string;
}

export interface LinkComponent {
  label: string;
  href: string;
}

export interface NavItemComponent {
  label: string;
  href?: string;
  scrollTo?: string;
}

export interface CtaButtonComponent {
  text: string;
  href?: string;
  scrollTo?: string;
  variant?: string;
}

// ---------------------------------------------------------------------------
// Global single type
// ---------------------------------------------------------------------------

export interface GlobalHeader {
  logo?: StrapiMedia | null;
  navItems: NavItemComponent[];
  ctaButton: CtaButtonComponent;
}

export interface FooterColumn {
  title: string;
  links: LinkComponent[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface GlobalFooter {
  columns: FooterColumn[];
  socialLinks: SocialLink[];
  copyright: string;
}

export interface GlobalAttributes {
  header: GlobalHeader;
  footer: GlobalFooter;
  defaultSeo: SeoComponent;
}

// ---------------------------------------------------------------------------
// Dynamic Zone block types
// ---------------------------------------------------------------------------

export interface HeroBlock {
  __component: "blocks.hero";
  id: number;
  title: string;
  subtitle: string;
  backgroundImage?: StrapiMedia | null;
  ctaButtons: CtaButtonComponent[];
}

export interface AboutCardItem {
  id: number;
  title: string;
  description: string;
  variant: "light" | "dark";
  cta?: string;
  scrollTarget?: string;
}

export interface AboutCardsBlock {
  __component: "blocks.about-cards";
  id: number;
  heading?: string;
  subheading?: string;
  cards: AboutCardItem[];
}

export interface StatItem {
  id: number;
  value: string;
  label: string;
}

export interface TeamBlock {
  __component: "blocks.team";
  id: number;
  heading?: string;
  subheading?: string;
  image?: StrapiMedia | null;
  infoTitle?: string;
  infoDescription?: string;
  stats: StatItem[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
}

export interface BenefitItem {
  id: number;
  text: string;
}

export interface FeedbackFormBlock {
  __component: "blocks.feedback-form";
  id: number;
  title: string;
  subtitle: string;
  benefitsHeading?: string;
  benefits: BenefitItem[];
}

export type DynamicBlock =
  | HeroBlock
  | AboutCardsBlock
  | TeamBlock
  | FeedbackFormBlock;

// ---------------------------------------------------------------------------
// Page collection type
// ---------------------------------------------------------------------------

export interface PageAttributes {
  slug: string;
  seo?: SeoComponent | null;
  blocks: DynamicBlock[];
}

// ---------------------------------------------------------------------------
// Blog collection type
// ---------------------------------------------------------------------------

export interface BlogPostAttributes {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Rich text (Markdown or HTML)
  cover?: StrapiMedia | null;
  author?: string;
  publishedAt: string;
  category?: {
    data: StrapiEntity<{ name: string; slug: string }> | null;
  };
}
