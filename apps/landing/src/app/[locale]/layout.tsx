import ServerProviders from "@/components/providers/ServerProviders";
import { isValidLocale, routing } from "@/lib/i18n/routing";
import "@workspace/ui/globals.css";
import { cn } from "@workspace/ui/lib/utils";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Script from "next/script";

export function generateStaticParams() {
  const locales = routing.locales.map((locale) => ({ locale }));

  return locales;
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

  const CSR_ENVs = ["NODE_ENV"];

  return (
    <html lang={locale}>
      <head>
        <Script id="csr-config" strategy="beforeInteractive">
          {`
         window.CSR_CONFIG = window.CSR_CONFIG || {};
         window.CSR_CONFIG = ${JSON.stringify({
           ...CSR_ENVs.reduce(
             (acc, curr) => {
               acc[curr] = process.env?.[curr];

               return acc;
             },
             {} as Record<string, string | undefined>,
           ),
         })};
       `}
        </Script>
      </head>
      <body
        className={cn(
          "pt-(--header-height) font-sans antialiased",
          ukraineSans.variable,
          fontMono.variable,
        )}
      >
        <ServerProviders>{children}</ServerProviders>
      </body>
    </html>
  );
}
