import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { WholesaleForm } from "@/components/forms/WholesaleForm";

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
    title: dict.wholesale.kicker,
    description: dict.wholesale.intro,
    alternates: { canonical: `/${locale}/wholesale` },
    openGraph: { title: dict.wholesale.kicker, description: dict.wholesale.intro },
  };
}

export default async function WholesalePage({
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
        kicker={dict.wholesale.kicker}
        title={dict.wholesale.title}
        intro={dict.wholesale.intro}
      />

      {/* Adımlar */}
      <section className="shell pb-section">
        <Reveal>
          <p className="kicker border-t border-[var(--c-line)] pt-6">
            {dict.wholesale.stepsKicker}
          </p>
        </Reveal>

        <ol className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
          {dict.wholesale.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 80} as="li">
              <span className="font-display block text-4xl leading-none text-[var(--c-accent-soft)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 text-[0.9375rem] font-medium tracking-[0.1em] uppercase">
                {step.title}
              </h2>
              <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-[var(--c-ink-soft)]">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Şartlar */}
      <section className="bg-[var(--c-bg-deep)] py-section text-[var(--c-on-deep)]">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-[0.625rem] font-medium tracking-[0.24em] uppercase opacity-60">
                {dict.wholesale.termsKicker}
              </p>
              <h2 className="display-md mt-4">{dict.wholesale.termsTitle}</h2>
            </Reveal>
          </div>

          <ul className="lg:col-span-7 lg:col-start-6">
            {dict.wholesale.terms.map((term, index) => (
              <Reveal key={term} delay={index * 60} as="li">
                <p className="flex gap-5 border-b border-current/15 py-4 text-sm leading-relaxed opacity-80">
                  <span aria-hidden="true" className="tabular-nums opacity-60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {term}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Form */}
      <section className="bg-[var(--c-bg-alt)] py-section">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="kicker">{dict.wholesale.formKicker}</p>
              <h2 className="display-md mt-4">{dict.wholesale.formTitle}</h2>
              <p className="lede mt-5">{dict.wholesale.formIntro}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={120}>
              <WholesaleForm
                locale={locale}
                dict={{
                  wholesale: dict.wholesale,
                  whatsapp: dict.whatsapp,
                  common: dict.common,
                }}
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
