import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  title: "СГ-ТРАНС | Система автоматизации процессов",
  description:
    "Система автоматизации транспортно-экспедиционных процессов Республиканского унитарного предприятия по транспортировке и обеспечению сжиженными нефтяными газами",
  keywords: [
    "СГ-ТРАНС",
    "автоматизация процессов",
    "транспортировка газов",
    "железнодорожные перевозки",
    "сжиженные углеводородные газы",
    "Беларусь",
    "Новополоцк",
  ],
  authors: [{ name: "РУП СГ-ТРАНС" }],
  creator: "РУП СГ-ТРАНС",
  publisher: "РУП СГ-ТРАНС",
  robots: "noindex, nofollow", // Внутренняя система, не индексируем
  openGraph: {
    title: "СГ-ТРАНС | Система автоматизации процессов",
    description: "Система автоматизации транспортно-экспедиционных процессов РУП СГ-ТРАНС",
    siteName: "СГ-ТРАНС",
    locale: "ru_BY",
    type: "website",
  },
  other: {
    "application-name": "СГ-ТРАНС",
    "msapplication-TileColor": "#2563eb",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
