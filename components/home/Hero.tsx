import Image from "next/image";
import { siteConfig } from "@/site.config";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const title = siteConfig.brand.heroTitle[locale] ?? siteConfig.brand.heroTitle.tr;

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[var(--c-bg-deep)]">
      <Parallax distance={36} className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-atolye.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={72}
          sizes="100vw"
          className="object-cover object-center"
        />
      </Parallax>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,14,10,.72) 0%, rgba(18,14,10,.22) 34%, rgba(18,14,10,.56) 72%, rgba(18,14,10,.88) 100%)",
        }}
      />

      <div className="shell pb-24 pt-32 md:pb-28">
        <p className="text-[0.625rem] tracking-[0.3em] text-white/70 uppercase">
          {siteConfig.brand.foundedYear} · {siteConfig.brand.tagline[locale]}
        </p>

        <h1 className="display-xl mt-6 max-w-[16ch] whitespace-pre-line text-white">
          {title}
        </h1>

        <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-white/80 md:text-lg">
          {siteConfig.brand.heroSubtitle[locale]}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={localePath(locale, "collection")} variant="solid" size="lg">
            {dict.home.heroCtaPrimary}
          </ButtonLink>
          <ButtonLink href={localePath(locale, "wholesale")} variant="onDark" size="lg">
            {dict.home.heroCtaSecondary}
          </ButtonLink>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="shell hidden pb-8 md:block"
      >
        <span className="flex items-center gap-3 text-[0.625rem] tracking-[0.28em] text-white/55 uppercase">
          <span className="block h-px w-10 bg-white/35" />
          {dict.common.scroll}
        </span>
      </div>
    </section>
  );
}
