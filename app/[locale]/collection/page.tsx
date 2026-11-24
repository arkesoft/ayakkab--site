import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/layout/PageHeader";
import { CollectionView } from "@/components/collection/CollectionView";

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
    title: dict.collection.title,
    description: dict.collection.intro,
    alternates: { canonical: `/${locale}/collection` },
    openGraph: { title: dict.collection.title, description: dict.collection.intro },
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ locale }, { category }] = await Promise.all([params, searchParams]);
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        kicker={dict.collection.kicker}
        title={dict.collection.title}
        intro={dict.collection.intro}
      />
      {/* Izgara sunucuda basılıyor; filtreler istemcide çalışıyor. */}
      <CollectionView
        locale={locale}
        dict={{ collection: dict.collection, common: dict.common }}
        initialCategory={category ?? null}
      />
    </>
  );
}
