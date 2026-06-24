import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khrishnanranganathan.com"),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`
  },
  description: profile.intro,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
    url: "https://khrishnanranganathan.com"
  },
  twitter: {
    card: "summary_large_image",
    title: profile.name,
    description: profile.tagline
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-paper font-sans text-ink-900 antialiased">
        {children}
      </body>
    </html>
  );
}
