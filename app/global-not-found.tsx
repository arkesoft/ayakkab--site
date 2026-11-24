import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import { siteConfig } from "@/site.config";
import { defaultLocale, dir } from "@/i18n/config";
import { NotFoundScreen } from "@/components/layout/NotFoundScreen";
import "./globals.css";

/* Hiçbir rotaya uymayan adresler buraya düşer ve 404 durum kodu döner.
   Kendi <html> belgesini üretmesi gerekiyor: kök düzen dil segmentinde. */

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-display-src",
  // Yedek fontun ölçüleri gerçek fonta eşitleniyor: serif geç gelse bile
  // satır yüksekliği ve genişlik değişmediği için metin yeniden akmaz.
  display: "swap",
  adjustFontFallback: true,
});

const sans = Figtree({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-sans-src",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: `404 — ${siteConfig.brand.name}`,
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html
      lang={defaultLocale}
      dir={dir(defaultLocale)}
      data-theme={siteConfig.theme}
      className={`${display.variable} ${sans.variable}`}
    >
      <body>
        <NotFoundScreen withBrand />
      </body>
    </html>
  );
}
