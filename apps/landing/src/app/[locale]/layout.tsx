import { isValidLocale, routing } from "@/lib/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";

export function generateStaticParams() {
  const locales = routing.locales.map((locale) => ({ locale }));

  return locales;
}

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
      <body>{/* @TODO: rest of the layout  */}</body>
    </html>
  );
}
