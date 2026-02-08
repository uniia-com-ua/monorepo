// Client
export { fetchAPI, getStrapiMediaUrl } from "./client";
export type { FetchAPIOptions } from "./client";

// Types
export type {
  // Strapi generics
  StrapiResponse,
  StrapiListResponse,
  StrapiEntity,
  StrapiMedia,
  StrapiMediaFormat,
  // Shared components
  SeoComponent,
  LinkComponent,
  NavItemComponent,
  CtaButtonComponent,
  // Global
  GlobalAttributes,
  GlobalHeader,
  GlobalFooter,
  FooterColumn,
  SocialLink,
  // Blocks
  DynamicBlock,
  HeroBlock,
  AboutCardsBlock,
  AboutCardItem,
  TeamBlock,
  StatItem,
  FeedbackFormBlock,
  BenefitItem,
  FaqBlock,
  FaqItem,
  // Page
  PageAttributes,
  // Blog
  BlogPostAttributes,
} from "./types";

// Fetchers
export { getGlobal } from "./fetchers/global";
export { getPageBySlug, getAllPageSlugs } from "./fetchers/pages";
export { getBlogPosts, getBlogPost, getAllBlogSlugs } from "./fetchers/blog";
