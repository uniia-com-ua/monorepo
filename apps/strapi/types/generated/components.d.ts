import type { Schema, Struct } from "@strapi/strapi";

export interface BlocksAboutCardItem extends Struct.ComponentSchema {
  collectionName: "components_blocks_about_card_items";
  info: {
    displayName: "about-card-item";
  };
  attributes: {
    cta: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    scrollTarget: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<["light", "dark"]> &
      Schema.Attribute.Required;
  };
}

export interface BlocksAboutCards extends Struct.ComponentSchema {
  collectionName: "components_blocks_about_cards";
  info: {
    displayName: "about-cards";
    icon: "apps";
  };
  attributes: {
    cards: Schema.Attribute.Component<"blocks.about-card-item", true> &
      Schema.Attribute.Required;
    heading: Schema.Attribute.String;
    subheading: Schema.Attribute.Text;
  };
}

export interface BlocksBenefitItem extends Struct.ComponentSchema {
  collectionName: "components_blocks_benefit_items";
  info: {
    displayName: "benefit-item";
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFeedbackForm extends Struct.ComponentSchema {
  collectionName: "components_blocks_feedback_forms";
  info: {
    displayName: "feedback-form";
    icon: "envelop";
  };
  attributes: {
    benefits: Schema.Attribute.Component<"blocks.benefit-item", true>;
    benefitsHeading: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: "components_blocks_heroes";
  info: {
    displayName: "hero";
    icon: "cast";
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<"images" | "files" | "videos">;
    ctaButtons: Schema.Attribute.Component<"shared.cta-button", true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksStatItem extends Struct.ComponentSchema {
  collectionName: "components_blocks_stat_items";
  info: {
    displayName: "stat-item";
    icon: "dashboard";
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface BlocksTeam extends Struct.ComponentSchema {
  collectionName: "components_blocks_teams";
  info: {
    displayName: "team";
    icon: "user";
  };
  attributes: {
    ctaButton: Schema.Attribute.Component<"shared.cta-button", false>;
    ctaDescription: Schema.Attribute.Text;
    ctaTitle: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<"images" | "videos">;
    infoDescription: Schema.Attribute.Text;
    infoTitle: Schema.Attribute.String;
    stats: Schema.Attribute.Component<"blocks.stat-item", true>;
    subheading: Schema.Attribute.Text;
  };
}

export interface FooterColumn extends Struct.ComponentSchema {
  collectionName: "components_footer_columns";
  info: {
    displayName: "column";
    icon: "bulletList";
  };
  attributes: {
    links: Schema.Attribute.Component<"shared.link", true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterSocialLink extends Struct.ComponentSchema {
  collectionName: "components_footer_social_links";
  info: {
    displayName: "social-link";
    icon: "twitter";
  };
  attributes: {
    icon: Schema.Attribute.Media<"images">;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: "components_global_footers";
  info: {
    displayName: "footer";
    icon: "stack";
  };
  attributes: {
    columns: Schema.Attribute.Component<"footer.column", true>;
    copyright: Schema.Attribute.String;
    socialLinks: Schema.Attribute.Component<"footer.social-link", true>;
  };
}

export interface GlobalHeader extends Struct.ComponentSchema {
  collectionName: "components_global_headers";
  info: {
    displayName: "header";
    icon: "pin";
  };
  attributes: {
    ctaButton: Schema.Attribute.Component<"shared.cta-button", false>;
    logo: Schema.Attribute.Media<"images">;
    navItems: Schema.Attribute.Component<"shared.nav-item", true>;
  };
}

export interface SharedCtaButton extends Struct.ComponentSchema {
  collectionName: "components_shared_cta_buttons";
  info: {
    displayName: "cta-button";
    icon: "chartBubble";
  };
  attributes: {
    href: Schema.Attribute.String;
    scrollTo: Schema.Attribute.String;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ["default", "glass", "white", "secondary"]
    >;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: "components_shared_links";
  info: {
    displayName: "link";
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: "components_shared_media";
  info: {
    displayName: "Media";
    icon: "file-video";
  };
  attributes: {
    file: Schema.Attribute.Media<"images" | "files" | "videos">;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: "components_shared_nav_items";
  info: {
    displayName: "nav-item";
    icon: "bulletList";
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    scrollTo: Schema.Attribute.String;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: "components_shared_quotes";
  info: {
    displayName: "Quote";
    icon: "indent";
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: "components_shared_rich_texts";
  info: {
    description: "";
    displayName: "Rich text";
    icon: "align-justify";
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: "components_shared_seos";
  info: {
    description: "";
    displayName: "seo";
    icon: "allergies";
    name: "Seo";
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    keywords: Schema.Attribute.String;
    ogImage: Schema.Attribute.Media<"images">;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: "components_shared_sliders";
  info: {
    description: "";
    displayName: "Slider";
    icon: "address-book";
  };
  attributes: {
    files: Schema.Attribute.Media<"images", true>;
  };
}

declare module "@strapi/strapi" {
  export namespace Public {
    export interface ComponentSchemas {
      "blocks.about-card-item": BlocksAboutCardItem;
      "blocks.about-cards": BlocksAboutCards;
      "blocks.benefit-item": BlocksBenefitItem;
      "blocks.feedback-form": BlocksFeedbackForm;
      "blocks.hero": BlocksHero;
      "blocks.stat-item": BlocksStatItem;
      "blocks.team": BlocksTeam;
      "footer.column": FooterColumn;
      "footer.social-link": FooterSocialLink;
      "global.footer": GlobalFooter;
      "global.header": GlobalHeader;
      "shared.cta-button": SharedCtaButton;
      "shared.link": SharedLink;
      "shared.media": SharedMedia;
      "shared.nav-item": SharedNavItem;
      "shared.quote": SharedQuote;
      "shared.rich-text": SharedRichText;
      "shared.seo": SharedSeo;
      "shared.slider": SharedSlider;
    }
  }
}
