/* Dil yapılandırması. Yeni dil eklemek için:
 *  1) i18n/dictionaries/<kod>.ts dosyasını tr.ts'i kopyalayarak oluştur
 *  2) aşağıdaki `locales` dizisine kodu ekle
 *  3) i18n/dictionaries/index.ts içindeki haritaya ekle
 *  RTL diller (ar, he, fa) otomatik olarak dir="rtl" alır.
 */

export const locales = ["tr", "en"] as const;

/** Hazırda bekleyen diller — sözlük dosyası eklenince `locales` içine taşı. */
export const plannedLocales = ["ru", "ar"] as const;

export type Locale = (typeof locales)[number];
export type AnyLocale = Locale | (typeof plannedLocales)[number];

export const defaultLocale: Locale = "tr";

export const localeNames: Record<AnyLocale, string> = {
  tr: "Türkçe",
  en: "English",
  ru: "Русский",
  ar: "العربية",
};

/** Dil seçicide gösterilen kısa kod. */
export const localeShort: Record<AnyLocale, string> = {
  tr: "TR",
  en: "EN",
  ru: "RU",
  ar: "AR",
};

const rtlLocales: readonly string[] = ["ar", "he", "fa", "ur"];

export function dir(locale: string): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** OpenGraph / hreflang için tam dil kodu. */
export const localeTags: Record<AnyLocale, string> = {
  tr: "tr_TR",
  en: "en_US",
  ru: "ru_RU",
  ar: "ar_AE",
};
