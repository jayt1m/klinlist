import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PwaRegister from "@/components/PwaRegister";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://klinlist.vercel.app";

const title = "КлинЛист — медицинские калькуляторы для врачей";
const description =
  "Бесплатные клинические калькуляторы и медицинские шкалы (CHA₂DS₂-VASc, GRACE, SCORE2, СКФ и другие) для ежедневной практики врача — на основе действующих клинических рекомендаций.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — КлинЛист",
  },
  description,
  keywords: [
    "медицинский калькулятор",
    "клинические калькуляторы",
    "шкала CHA2DS2-VASc",
    "шкала GRACE",
    "SCORE2",
    "клинические рекомендации",
    "калькулятор СКФ",
    "калькулятор для врачей",
  ],
  authors: [{ name: "КлинЛист" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "КлинЛист",
    title,
    description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "КлинЛист",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <PwaRegister />
        <Analytics />
      </body>
    </html>
  );
}
