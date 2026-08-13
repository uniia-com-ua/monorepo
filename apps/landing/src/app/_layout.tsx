import { getStrapiMediaProxyUrl } from "@workspace/strapi";
import "@workspace/ui/globals.css";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Footer from "../business/components/Footer/index.js";
import Header from "../business/components/Header/index.js";
import { getGlobalSafe } from "../business/lib/get-global-safe.js";

const ukraineSans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/e-Ukraine/e-Ukraine-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/e-Ukraine/e-Ukraine-UltraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/e-Ukraine/e-Ukraine-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/e-Ukraine/e-Ukraine-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/e-Ukraine/e-Ukraine-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/e-Ukraine/e-Ukraine-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalSafe();
  const seo = global.defaultSeo;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://uniia.com.ua",
    ),
    title: {
      default: seo.title,
      template: `%s | ${seo.title}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImage
        ? [{ url: getStrapiMediaProxyUrl(seo.ogImage.url) }]
        : [],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const global = await getGlobalSafe();

  return (
    <html lang="uk">
      <body
        className={`${ukraineSans.variable} ${fontMono.variable} pt-(--header-height) font-sans antialiased`}
      >
        <Header
          logoUrl={
            global.header?.logo
              ? getStrapiMediaProxyUrl(global.header.logo.url)
              : undefined
          }
          navItems={global.header?.navItems ?? []}
          ctaButton={global.header?.ctaButton ?? null}
        />
        {children}
        <Footer
          columns={global.footer?.columns ?? []}
          socialLinks={global.footer?.socialLinks ?? []}
          copyright={global.footer?.copyright ?? ""}
          bottomLinks={global.footer?.bottomLinks ?? []}
        />
      </body>
    </html>
  );
}
