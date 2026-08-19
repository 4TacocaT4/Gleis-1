import type { Metadata, Viewport } from "next";
import { Karla, Playfair_Display_SC } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getHours, getPages, getSite } from "@/lib/content";

/**
 * Schriftpaar "Restaurant Menu": Playfair Display SC (Kapitälchen) für
 * Überschriften und Kartenkategorien, Karla für Fliesstext. Beide werden von
 * next/font beim Build heruntergeladen und selbst ausgeliefert — kein
 * externer Font-Request zur Laufzeit, das spart Ladezeit und Cookie-Fragen.
 */
const playfair = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-playfair",
});

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

const isPreviewDeployment = process.env.GITHUB_PAGES === "true";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const { seo } = site;

  return {
    metadataBase: new URL(seo.siteUrl),
    title: {
      default: seo.title,
      template: seo.titleTemplate,
    },
    description: seo.description,
    keywords: seo.keywords,
    applicationName: site.name,
    authors: [{ name: site.name }],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "de_CH",
      url: seo.siteUrl,
      siteName: site.name,
      title: seo.title,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    // Auf der Testfassung (GitHub Pages) zusätzlich zur robots.txt ein
    // noindex im Kopf der Seite: Die Seite trägt echte Betriebsdaten bei
    // unbestätigten Preisen und darf nicht im Index landen.
    robots: isPreviewDeployment
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: "/icon.svg",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#fef2f2",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [site, hours, pages] = await Promise.all([getSite(), getHours(), getPages()]);

  return (
    <html lang="de-CH" className={`${playfair.variable} ${karla.variable}`}>
      <head>
        {/* Ohne JavaScript bleiben alle Inhalte sichtbar. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="pb-20 lg:pb-0">
        <a
          href="#hauptinhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-on-primary"
        >
          Zum Inhalt springen
        </a>

        <Header site={site} hours={hours} />

        <main id="hauptinhalt">{children}</main>

        <Footer content={pages.footer} site={site} />

        <MobileCallBar site={site} />
        <ScrollReveal />
      </body>
    </html>
  );
}
