import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";
import { locales } from "@/i18n/config";
import { products } from "@/data/products";

const pages = ["", "collection", "wholesale", "about", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.siteUrl;

  const staticEntries = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${base}/${locale}${page ? `/${page}` : ""}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.7,
    })),
  );

  const productEntries = locales.flatMap((locale) =>
    products.map((product) => ({
      url: `${base}/${locale}/collection/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticEntries, ...productEntries];
}
