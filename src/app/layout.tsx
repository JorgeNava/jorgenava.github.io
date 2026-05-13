import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jorge Nava — Arquitecto de Software",
  description:
    "Diseño y construyo productos digitales que escalan — desde la arquitectura hasta el pixel. CEO de One Spark, consultoría digital en Jalisco, México.",
  openGraph: {
    title: "Jorge Nava — Arquitecto de Software",
    description: "Diseño y construyo productos digitales que escalan.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${dmSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-bg text-fg antialiased overflow-x-hidden">
        <CustomCursor />
        <ScrollProgress />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
