import { siteConfig } from "@/site.config";
import type { Locale } from "@/i18n/config";
import type { Localized } from "@/data/taxonomy";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** {n} gibi yer tutucuları doldurur. */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(vars[key] ?? `{${key}}`),
  );
}

/** Sözlükte olmayan, veri katmanındaki iki dilli alanlar için. */
export function pick(value: Localized, locale: Locale): string {
  return value[locale] ?? value.tr;
}

export function localePath(locale: Locale, path = "") {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

export function telHref() {
  return `tel:${siteConfig.contact.phoneHref.replace(/\s/g, "")}`;
}

export function mailHref() {
  return `mailto:${siteConfig.contact.email}`;
}
