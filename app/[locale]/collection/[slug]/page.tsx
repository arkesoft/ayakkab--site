import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getRelated, products } from "@/data/products";
import { categoryMap, colorMap, genderMap, materialMap, seasonMap } from "@/data/taxonomy";
import { siteConfig } from "@/site.config";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath, pick } from "@/lib/utils";
import { JsonLd, breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { Gallery } from "@/components/product/Gallery";
import { AddToQuote } from "@/components/product/AddToQuote";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const active = isLocale(locale) ? locale : defaultLocale;
  const product = getProduct(slug);
  if (!product) return { title: getDictionary(active).product.notFound };

  const name = pick(product.name, active);
  const description = pick(product.description, active);
  const image = product.images.find((item) => item.src)?.src;

  return {
    title: `${name} · ${product.code}`,
    description,
    alternates: { canonical: `/${active}/collection/${slug}` },
    openGraph: {
      title: `${name} — ${siteConfig.brand.name}`,
      description,
      type: "website",
      images: image ? [{ url: image, width: 1200, height: 1500, alt: name }] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const product = getProduct(slug);
  if (!product) notFound();

  const dict = getDictionary(locale);
  const name = pick(product.name, locale);
  const related = getRelated(product, 4);

  const specs: [string, string][] = [
    [dict.product.sizeRange, product.sizeRange],
    [
      dict.product.series,
      `${pick(product.seriesNote, locale)} (${product.sizeRange})`,
    ],
    [dict.product.upper, pick(product.construction.upper, locale)],
    [dict.product.lining, pick(product.construction.lining, locale)],
    [dict.product.sole, pick(product.construction.sole, locale)],
    [dict.product.moq, `${product.moq} ${dict.common.pairs}`],
  ];

  const meta = [
    pick(genderMap[product.gender].label, locale),
    pick(categoryMap[product.category].label, locale),
    pick(seasonMap[product.season].label, locale),
    pick(materialMap[product.material].label, locale),
  ].join(" · ");

  return (
    <>
      <JsonLd data={productJsonLd(product, locale)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: siteConfig.brand.name, path: `/${locale}` },
          { name: dict.collection.title, path: `/${locale}/collection` },
          { name, path: `/${locale}/collection/${product.slug}` },
        ])}
      />

      <div className="shell pt-24 pb-6 md:pt-32">
        <Link
          href={localePath(locale, "collection")}
          className="link-underline inline-flex items-center gap-2.5 text-[0.6875rem] tracking-[0.2em] text-[var(--c-ink-soft)] uppercase"
        >
          <span aria-hidden="true" className="rotate-180">
            <ArrowRight size={13} />
          </span>
          {dict.product.backToCollection}
        </Link>
      </div>

      <article className="shell grid gap-10 pb-20 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Gallery
            images={product.images}
            alt={name}
            code={product.code}
            labels={{
              previous: dict.product.previous,
              next: dict.product.next,
              gallery: dict.product.gallery,
            }}
          />
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="text-[0.6875rem] tracking-[0.24em] text-[var(--c-ink-soft)] uppercase">
              {dict.product.code} {product.code}
            </p>
            <h1 className="display-md mt-3">{name}</h1>
            <p className="mt-3 text-sm text-[var(--c-ink-soft)]">{meta}</p>

            <p className="mt-6 text-[0.9375rem] leading-relaxed text-[var(--c-ink-soft)]">
              {pick(product.description, locale)}
            </p>

            <div className="mt-9">
              <AddToQuote product={product} locale={locale} />
            </div>

            <section className="mt-12">
              <h2 className="kicker">{dict.product.detailsTitle}</h2>
              <dl className="mt-5 divide-y divide-[var(--c-line)] border-t border-[var(--c-line)] text-sm">
                {specs.map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-6 py-3.5">
                    <dt className="shrink-0 text-[var(--c-ink-soft)]">{label}</dt>
                    <dd className="text-right">{value}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="shrink-0 text-[var(--c-ink-soft)]">{dict.product.colors}</dt>
                  <dd className="flex flex-wrap justify-end gap-x-3 gap-y-1.5 text-right">
                    {product.colors.map((id) => (
                      <span key={id} className="inline-flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="inline-block size-2.5 rounded-full ring-1 ring-[var(--c-line)]"
                          style={{ backgroundColor: colorMap[id]?.hex }}
                        />
                        {pick(colorMap[id].label, locale)}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </article>

      <section className="bg-[var(--c-bg-alt)] py-section">
        <div className="shell">
          <Reveal>
            <h2 className="display-md">{dict.product.relatedTitle}</h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {related.map((item, index) => (
              <li key={item.slug}>
                <Reveal delay={index * 70}>
                  <ProductCard
                    product={item}
                    locale={locale}
                    sizes="(min-width: 1024px) 22vw, 46vw"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
