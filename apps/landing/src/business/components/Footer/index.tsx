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
}

export default function Footer({
  columns = [],
  socialLinks = [],
  copyright,
}: FooterProps) {
  return (
    <footer className="w-full bg-section-bg-dark text-white mt-0">
      <div className="max-w-container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start">
          {/* Logo & socials */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="Унія">
              <Image
                src="/icons/Logo.svg"
                alt="Унія"
                width={104}
                height={44}
                className="brightness-0 invert"
              />
            </Link>
            {socialLinks.length > 0 && (
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors text-sm"
                    aria-label={social.platform}
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Columns */}
          {columns.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {columns.map((col) => (
                <div key={col.title}>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
                    {col.title}
                  </h4>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">
            {copyright || `© ${new Date().getFullYear()} Унія. Всі права захищені.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
