import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { JsonLd, organizationJsonLd } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import {
  Collections,
  Featured,
  Figures,
  Reviews,
  Showroom,
  Story,
  WholesaleBand,
} from "@/components/home/HomeSections";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <JsonLd data={organizationJsonLd(locale)} />
      <Hero locale={locale} dict={dict} />
      <Collections locale={locale} dict={dict} />
      <Featured locale={locale} dict={dict} />
      <Story locale={locale} dict={dict} />
      <Figures locale={locale} dict={dict} />
      <WholesaleBand locale={locale} dict={dict} />
      <Showroom locale={locale} dict={dict} />
      <Reviews dict={dict} />
    </>
  );
}
