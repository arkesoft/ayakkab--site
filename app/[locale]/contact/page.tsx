import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/site.config";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { mailHref, telHref } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonAnchor } from "@/components/ui/Button";
import { WhatsAppMark } from "@/components/ui/icons";

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
    title: dict.contact.kicker,
    description: dict.contact.intro,
    alternates: { canonical: `/${locale}/contact` },
    openGraph: { title: dict.contact.title, description: dict.contact.intro },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const hours = siteConfig.contact.hours[locale] ?? siteConfig.contact.hours.tr;

  return (
    <>
      <PageHeader
        kicker={dict.contact.kicker}
        title={dict.contact.title}
        intro={dict.contact.intro}
      />

      <section className="shell pb-16">
        <div className="grid gap-10 border-t border-[var(--c-line)] pt-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <Reveal>
            <h2 className="kicker">{dict.contact.addressTitle}</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed whitespace-pre-line">
              {siteConfig.contact.address[locale] ?? siteConfig.contact.address.tr}
            </p>
            <a
              href={siteConfig.contact.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 inline-block text-[0.6875rem] tracking-[0.18em] text-[var(--c-accent)] uppercase"
            >
              {dict.contact.directions}
            </a>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="kicker">{dict.contact.hoursTitle}</h2>
            <dl className="mt-4 space-y-2 text-[0.9375rem]">
              {hours.map(([day, time]) => (
                <div key={day} className="flex justify-between gap-4 border-b border-[var(--c-line)] pb-2">
                  <dt className="text-[var(--c-ink-soft)]">{day}</dt>
                  <dd className="shrink-0 tabular-nums">{time}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={160}>
            <h2 className="kicker">{dict.contact.phoneTitle}</h2>
            <a href={telHref()} className="link-underline mt-4 inline-block text-[0.9375rem]">
              {siteConfig.contact.phoneDisplay}
            </a>
            <h2 className="kicker mt-7">{dict.contact.emailTitle}</h2>
            <a href={mailHref()} className="link-underline mt-4 inline-block text-[0.9375rem] break-all">
              {siteConfig.contact.email}
            </a>
          </Reveal>

          <Reveal delay={240}>
            <h2 className="kicker">{dict.contact.socialTitle}</h2>
            <ul className="mt-4 space-y-2 text-[0.9375rem]">
              {siteConfig.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ButtonAnchor
              href={waLink(dict.whatsapp.generic)}
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
              size="md"
              className="mt-7 w-full sm:w-auto"
            >
              <WhatsAppMark />
              {dict.common.whatsappWrite}
            </ButtonAnchor>
          </Reveal>
        </div>
      </section>

      <section className="shell pb-section">
        <Reveal variant="image">
          <div className="relative aspect-4/3 w-full overflow-hidden border border-[var(--c-line)] bg-[var(--c-bg-alt)] sm:aspect-21/9">
            <iframe
              src={siteConfig.contact.mapEmbedUrl}
              title={dict.contact.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.45] contrast-[1.05]"
            />
          </div>
        </Reveal>
        <p className="mt-4 text-xs text-[var(--c-ink-soft)]">{dict.contact.mapNote}</p>
      </section>
    </>
  );
}
