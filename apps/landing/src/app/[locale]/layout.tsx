import ErrorBoundry from "@/components/elementary/ErrorBoundry";
import { StrapiFooter } from "@/components/page-builder/single-types/StrapiFooter";
import { StrapiNavbar } from "@/components/page-builder/single-types/StrapiNavbar";
import ServerProviders from "@/components/providers/ServerProviders";
import { isValidLocale, routing } from "@/lib/i18n/routing";
import { fetchGlobalConfig } from "@/lib/strapi-api/content/server";
import { formatStrapiMediaUrl } from "@/lib/strapi-api/media";
import "@workspace/ui/globals.css";
import { cn } from "@workspace/ui/lib/utils";
import { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const locales = routing.locales.map((locale) => ({ locale }));

  return locales;
}

export async function generateMetadata(props: LayoutProps<"/[locale]">): Promise<Metadata | null> {
  const { locale } = await props.params;
  if (!isValidLocale(locale)) {
    return null;
  }

  const response = await fetchGlobalConfig(locale, {
    defaultSeo: "smart",
  })

  return {
    title: {
      default: response.data?.defaultSeo?.title ?? "",
      template: `%s | ${response.data?.defaultSeo?.title ?? ""}`,
    },
    description: response.data?.defaultSeo?.description ?? "",
    keywords: response.data?.defaultSeo?.keywords ?? "",
    openGraph: {
      title: response.data?.defaultSeo?.title ?? "",
      description: response.data?.defaultSeo?.description ?? "",
      images: response.data?.defaultSeo?.ogImage ? [
        {url: formatStrapiMediaUrl(response.data.defaultSeo.ogImage.url) ?? ""}
      ] : [],
    },
    twitter: {
      title: response.data?.defaultSeo?.title ?? "",
      description: response.data?.defaultSeo?.description ?? "",
      images: response.data?.defaultSeo?.ogImage ? [
        {url: formatStrapiMediaUrl(response.data.defaultSeo.ogImage.url) ?? ""}
      ] : [],
    }
  }
}

const ukraineSans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    {
      path: "../../../public/fonts/e-Ukraine/e-Ukraine-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/e-Ukraine/e-Ukraine-UltraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/e-Ukraine/e-Ukraine-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/e-Ukraine/e-Ukraine-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/e-Ukraine/e-Ukraine-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/e-Ukraine/e-Ukraine-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "pt-(--header-height) font-sans antialiased",
          ukraineSans.variable,
          fontMono.variable,
        )}
      >
        <ServerProviders>
          <ErrorBoundry showErrorMessage>
            <StrapiNavbar locale={locale} />
          </ErrorBoundry>
          {children}
          <ErrorBoundry showErrorMessage>
            <StrapiFooter locale={locale} />
          </ErrorBoundry>
        </ServerProviders>
      </body>
    </html>
  );
}
