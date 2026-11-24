import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/site.config";
import { timeline } from "@/data/timeline";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pick } from "@/lib/utils";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { PageHeader } from "@/components/layout/PageHeader";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);
  return {
    title: dict.about.kicker,
    description: dict.about.intro,
    alternates: { canonical: `/${locale}/about` },
    openGraph: { title: dict.about.title, description: dict.about.intro },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        kicker={dict.about.kicker}
        title={dict.about.title}
        intro={dict.about.intro}
      />

      <section className="shell pb-section">
        {/* Perde animasyonu yok: bu görsel sayfanın LCP öğesi. */}
        <Parallax distance={40} className="relative aspect-3/2 w-full bg-[var(--c-bg-alt)] md:aspect-21/9">
          <Media
            image={{ src: "/images/hero-atolye.jpg" }}
            alt=""
            sizes="100vw"
            quality={74}
            priority
          />
        </Parallax>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="kicker">{siteConfig.brand.foundedYear} —</p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {dict.about.storyParagraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 90} className="mt-7 first:mt-0">
                <p className="lede">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Üretim süreci */}
      <section className="bg-[var(--c-bg-alt)] py-section">
        <div className="shell">
          <Reveal>
            <p className="kicker">{dict.about.processKicker}</p>
            <h2 className="display-md mt-4 max-w-[20ch]">{dict.about.processTitle}</h2>
          </Reveal>

          <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
            {dict.about.process.map((step, index) => (
              <Reveal key={step.title} delay={index * 70} as="li">
                <div className="flex items-baseline gap-4 border-t border-[var(--c-line)] pt-5">
                  <span className="text-xs tabular-nums text-[var(--c-accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[0.9375rem] font-medium tracking-[0.08em] uppercase">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-[42ch] text-sm leading-relaxed text-[var(--c-ink-soft)]">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Zaman çizelgesi */}
      <section className="shell py-section">
        <Reveal>
          <p className="kicker">{dict.about.timelineKicker}</p>
          <h2 className="display-md mt-4">{dict.about.timelineTitle}</h2>
        </Reveal>

        <ol className="mt-12 border-t border-[var(--c-line)]">
          {timeline.map((entry, index) => (
            <Reveal key={entry.year} delay={index * 60} as="li">
              <div className="grid gap-2 border-b border-[var(--c-line)] py-7 sm:grid-cols-12 sm:gap-6">
                <span className="font-display text-3xl leading-none text-[var(--c-accent)] sm:col-span-2 sm:text-4xl">
                  {entry.year}
                </span>
                <h3 className="text-[0.9375rem] font-medium tracking-[0.06em] uppercase sm:col-span-4">
                  {pick(entry.title, locale)}
                </h3>
                <p className="max-w-[56ch] text-sm leading-relaxed text-[var(--c-ink-soft)] sm:col-span-6">
                  {pick(entry.body, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Değerler */}
      <section className="bg-[var(--c-bg-deep)] py-section text-[var(--c-on-deep)]">
        <div className="shell">
          <Reveal>
            <p className="text-[0.625rem] font-medium tracking-[0.24em] uppercase opacity-60">
              {dict.about.valuesKicker}
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {dict.about.values.map((value, index) => (
              <Reveal key={value.title} delay={index * 90} as="li">
                <h3 className="display-md">{value.title}</h3>
                <p className="mt-4 max-w-[38ch] text-sm leading-relaxed opacity-70">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
