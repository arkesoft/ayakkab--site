"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/site.config";
import { defaultLocale, isLocale } from "@/i18n/config";
import { localePath } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";

/* 404 metinleri burada duruyor: sözlüğün tamamını istemci paketine
   taşımamak için (404 hem global hem dil içi 404'te kullanılıyor). */
const COPY = {
  tr: {
    title: "Bu sayfa kalıptan çıkmamış",
    body: "Aradığınız sayfa taşınmış ya da hiç olmamış olabilir. Koleksiyona göz atın.",
    cta: "Koleksiyonu gör",
    home: "Ana sayfaya dön",
  },
  en: {
    title: "This page never came off the last",
    body: "The page you are looking for may have moved, or may never have existed. Have a look at the collection instead.",
    cta: "See the collection",
    home: "Back to home",
  },
};

export function NotFoundScreen({ withBrand = false }: { withBrand?: boolean }) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : defaultLocale;
  const copy = COPY[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <>
      {withBrand && (
        <div className="shell flex h-16 items-center border-b border-[var(--c-line)] md:h-20">
          <Link
            href={localePath(locale)}
            className="font-display text-xl leading-none"
            style={{
              letterSpacing: siteConfig.brand.logoTracking,
              textIndent: siteConfig.brand.logoTracking,
            }}
          >
            {siteConfig.brand.name}
          </Link>
        </div>
      )}

      <section className="shell flex min-h-[72svh] flex-col items-start justify-center py-24">
        <p className="font-display text-[clamp(5rem,22vw,13rem)] leading-none text-[var(--c-accent-soft)]">
          404
        </p>
        <h1 className="display-md mt-6 max-w-[18ch]">{copy.title}</h1>
        <p className="lede mt-5 max-w-[48ch]">{copy.body}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={localePath(locale, "collection")} variant="solid" size="lg">
            {copy.cta}
          </ButtonLink>
          <ButtonLink href={localePath(locale)} variant="outline" size="lg">
            {copy.home}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
