import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Next Level — Your mood, your match",
  description:
    "A football archive app. Relive historic nights by mood — Nostalgia, Drama, or Legends — then stay in the room for minute 109.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/CartographMonoCF-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Geneva.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
