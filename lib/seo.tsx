import { siteConfig } from "@/site.config";
import type { Product } from "@/data/products";
import { colorMap, materialMap } from "@/data/taxonomy";
import type { Locale } from "@/i18n/config";
import { pick } from "./utils";

const url = siteConfig.seo.siteUrl;

export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brand.name,
    url,
    foundingDate: String(siteConfig.brand.foundedYear),
    description: siteConfig.brand.tagline[locale],
    telephone: siteConfig.contact.phoneHref,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: (siteConfig.contact.address[locale] ?? siteConfig.contact.address.tr)
        .split("\n")[0],
      addressLocality: "Başakşehir",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    sameAs: siteConfig.social.map((item) => item.href),
  };
}

export function productJsonLd(product: Product, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pick(product.name, locale),
    sku: product.code,
    mpn: product.code,
    description: pick(product.description, locale),
    brand: { "@type": "Brand", name: siteConfig.brand.name },
    material: pick(materialMap[product.material].label, locale),
    color: product.colors.map((id) => pick(colorMap[id].label, locale)).join(", "),
    size: product.sizeRange,
    image: product.images
      .filter((image) => image.src)
      .map((image) => `${url}${image.src}`),
    url: `${url}/${locale}/collection/${product.slug}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "TRY",
      priceSpecification: {
        "@type": "PriceSpecification",
        valueAddedTaxIncluded: false,
        description: "Toptan fiyat talep üzerine / Wholesale price on request",
      },
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: product.moq,
        unitText: "pair",
      },
      seller: { "@type": "Organization", name: siteConfig.brand.name },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${url}${item.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
