import "@workspace/ui/globals.css";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import Header from "../business/components/Header";

const ukraineSans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "../../public/fonts/e-Ukraine/e-Ukraine-Thin.otf",        weight: "100", style: "normal" },
    { path: "../../public/fonts/e-Ukraine/e-Ukraine-UltraLight.otf",  weight: "200", style: "normal" },
    { path: "../../public/fonts/e-Ukraine/e-Ukraine-Light.otf",       weight: "300", style: "normal" },
    { path: "../../public/fonts/e-Ukraine/e-Ukraine-Regular.otf",     weight: "400", style: "normal" },
    { path: "../../public/fonts/e-Ukraine/e-Ukraine-Medium.otf",      weight: "500", style: "normal" },
    { path: "../../public/fonts/e-Ukraine/e-Ukraine-Bold.otf",        weight: "700", style: "normal" }
  ],
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ukraineSans.variable} ${fontMono.variable} font-sans antialiased pt-[92px]`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
