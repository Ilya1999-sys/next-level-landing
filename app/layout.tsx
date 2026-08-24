import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";
import "@/app/globals.css";

const plexMono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

const plexSans = IBM_Plex_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-plex-sans",
});

export const metadata: Metadata = {
  title: "Next Level — Your mood, your match",
  description:
    "A football archive app. Relive historic nights by mood — Nostalgia, Drama, or Legends — then stay in the room for minute 109.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plexMono.variable} ${plexSans.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
