import Image from "next/image";
import Link from "next/link";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumnData {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  url: string;
  icon?: {
    url: string;
    alternativeText?: string | null;
  } | null;
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
    <footer className="text-foreground w-full bg-white">
      {/* ---- Top section ---- */}
      <div className="max-w-container mx-auto px-4 pb-8 pt-12 md:pb-10 md:pt-16">
        <div className="grid grid-cols-2 items-start gap-8 md:grid-cols-4 md:gap-12">
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
                {socialLinks.map((social, index) => (
                  <a
                    key={social.url || index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted hover:bg-muted/80 flex h-10 w-10 items-center justify-center rounded-sm transition-colors"
                    aria-label={social.icon?.alternativeText || "Social link"}
                  >
                    {social.icon?.url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/api/cms-media${social.icon.url}`}
                        alt={social.icon.alternativeText || ""}
                        className="h-5 w-auto max-w-7"
                      />
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation columns */}
          {columns.map((col, index) => (
            <div key={`${col.title}-${index}`}>
              <h4 className="text-foreground mb-4 text-base font-semibold">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, linkIndex) => (
                  <li key={`${link.href}-${linkIndex}`}>
                    <Link
                      href={link.href}
                      className="text-foreground/60 hover:text-foreground text-sm transition-colors"
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
      <div className="border-border border-t">
        <div className="max-w-container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row">
          <p className="text-foreground/50 text-sm">
            {copyright || `uniia.com.ua © ${year}`}
          </p>

          {bottomLinks.length > 0 && (
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {bottomLinks.map((link, index) => (
                <Link
                  key={`${link.href}-${index}`}
                  href={link.href}
                  className="text-foreground/50 hover:text-foreground text-sm transition-colors"
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
