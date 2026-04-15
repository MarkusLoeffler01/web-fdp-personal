import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const anybody = localFont({
  variable: "--font-anybody",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Anybody-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Anybody-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Anybody-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Anybody-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Anybody-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Markus Löffler",
    template: "%s | Markus Löffler",
  },
  description:
    "Persoenliche politische Seite mit News, Themen, Haltung und direktem Kontakt.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://fdp.m-loeffler.de",
    siteName: "Markus Löffler",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={anybody.variable}>
      <body className="site-body">
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
