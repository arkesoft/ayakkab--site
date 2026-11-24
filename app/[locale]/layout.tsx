import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import { siteConfig } from "@/site.config";
import { defaultLocale, dir, isLocale, localeTags, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { QuoteProvider } from "@/components/quote/quote-context";
import { QuotePanel } from "@/components/quote/QuotePanel";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { PageTransition } from "@/components/layout/PageTransition";
import "../globals.css";

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const active: Locale = isLocale(locale) ? locale : defaultLocale;
  const dict = getDictionary(active);
  const title = `${siteConfig.brand.name} — ${siteConfig.brand.tagline[active]}`;

  return {
    metadataBase: new URL(siteConfig.seo.siteUrl),
    title: {
      default: title,
      template: siteConfig.seo.titleTemplate,
    },
    description: dict.footer.about,
    keywords: [...siteConfig.seo.keywords],
    alternates: {
      canonical: `/${active}`,
      languages: Object.fromEntries(locales.map((code) => [code, `/${code}`])),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.brand.name,
      locale: localeTags[active],
      title,
      description: dict.footer.about,
      url: `/${active}`,
    },
    twitter: { card: "summary_large_image", title, description: dict.footer.about },
    robots: { index: true, follow: true },
  };
}

export const viewport = {
  themeColor: "#1e1812",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      data-theme={siteConfig.theme}
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <QuoteProvider
          locale={locale}
          strings={{
            quote: dict.quote,
            common: dict.common,
            whatsapp: dict.whatsapp,
            a11y: dict.a11y,
            product: dict.product,
            nav: dict.nav,
          }}
        >
          <Header
            locale={locale}
            dict={{ nav: dict.nav, common: dict.common, a11y: dict.a11y }}
          />
          <main id="main" className="pb-16 lg:pb-0">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer locale={locale} dict={dict} />
          <MobileBar dict={dict} />
          <QuotePanel />
        </QuoteProvider>
      </body>
    </html>
  );
}
