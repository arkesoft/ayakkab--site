import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.brand.name;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Paylaşım görseli — tema renkleriyle, ek dosya gerektirmeden üretilir. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const active = isLocale(locale) ? locale : defaultLocale;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1f1912",
          color: "#ece3d6",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 18, opacity: 0.9 }}>
          {siteConfig.brand.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 72, lineHeight: 1.1, maxWidth: 900 }}>
            {siteConfig.brand.tagline[active]}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 26,
              opacity: 0.6,
              fontFamily: "sans-serif",
            }}
          >
            {siteConfig.brand.foundedYear} · İkitelli, İstanbul
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(236,227,214,0.25)",
            paddingTop: 24,
            fontSize: 22,
            opacity: 0.55,
            fontFamily: "sans-serif",
          }}
        >
          {siteConfig.seo.siteUrl.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size,
  );
}
