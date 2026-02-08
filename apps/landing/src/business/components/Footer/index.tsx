import Link from "next/link";
import Image from "next/image";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumnData {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface FooterProps {
  columns?: FooterColumnData[];
  socialLinks?: FooterSocialLink[];
  copyright?: string;
  bottomLinks?: FooterLink[];
}

/* ------------------------------------------------------------------ */
/*  Footer component                                                  */
/* ------------------------------------------------------------------ */

export default function Footer({
  columns = [],
  socialLinks = [],
  copyright,
  bottomLinks = [],
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-foreground">
      {/* ---- Top section ---- */}
      <div className="max-w-container mx-auto px-4 pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start">
          {/* Logo & socials */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Унія">
              <Image
                src="/icons/logo_inverted.svg"
                alt="Унія"
                width={124}
                height={44}
                className="ml-2"
              />
            </Link>

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-muted rounded-sm hover:bg-muted/80 transition-colors"
                    aria-label={social.platform}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/icons/${social.platform.toLowerCase()}_inverted.svg`}
                      alt={social.platform}
                      className="h-5 w-auto max-w-7"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-base font-semibold text-foreground mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div className="border-t border-border">
        <div className="max-w-container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/50">
            {copyright || `uniia.com.ua © ${year}`}
          </p>

          {bottomLinks.length > 0 && (
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {bottomLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
