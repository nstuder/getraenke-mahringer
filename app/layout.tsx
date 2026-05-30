import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/templates/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Getränkeservice Mahringer",
    default: "Getränkeservice Mahringer - Ihr Getränkepartner in Mannheim",
  },
  description: "Getränkeservice Mahringer in Mannheim: Lieferservice, Verleihservice und eine große Auswahl an alkoholfreien Getränken, Bier, Wein und Sekt.",
  keywords: ["Getränkeservice", "Mannheim", "Lieferservice", "Getränkehandel", "Verleihservice", "Bier", "Wein", "Sekt", "Alkoholfreie Getränke"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
