/* =============================================================================
 *  SITE CONFIG — Markaya ait her şey bu dosyada.
 *  Başka bir firma için siteyi yeniden markalamak istiyorsan sadece burayı
 *  ve data/products.ts dosyasını değiştirmen yeterli.
 *  ---------------------------------------------------------------------------
 *  EVERYTHING brand-related lives here. To rebrand the site for another
 *  company, edit this file and data/products.ts. Nothing else.
 * ========================================================================== */

export type ThemeName = "krem-taba" | "antrasit-altin" | "beyaz-siyah";

export const siteConfig = {
  /* --- Kimlik / Identity ------------------------------------------------ */
  brand: {
    name: "LORVA",
    /** Logoda harfler arası boşluk (em). Uzun isimlerde 0.1 civarı iyi durur. */
    logoTracking: "0.34em",
    /** Logo olarak görsel kullanmak istersen: "/images/logo.svg" yaz, boş bırakırsan yazı logo kullanılır. */
    logoImage: "",
    foundedYear: 1987,
    tagline: {
      tr: "Aykosan'da deri ayakkabı üretimi",
      en: "Leather footwear manufacturing in Aykosan",
    },
    /** Hero başlığı — kısa tut, 3-5 kelime. */
    heroTitle: {
      tr: "Kalıptan rafa,\naynı elden.",
      en: "From last to shelf,\nby the same hands.",
    },
    heroSubtitle: {
      tr: "1987'den beri İstanbul İkitelli'de kadın ve erkek deri ayakkabı üretiyoruz. Toptan ve ihracat.",
      en: "Since 1987 we have been making women's and men's leather footwear in İkitelli, İstanbul. Wholesale and export.",
    },
  },

  /* --- Tema / Theme ------------------------------------------------------
   * Seçenekler: "krem-taba" | "antrasit-altin" | "beyaz-siyah"
   * -------------------------------------------------------------------- */
  theme: "krem-taba" as ThemeName,

  /* --- İletişim / Contact ----------------------------------------------- */
  contact: {
    /** Gösterilen telefon */
    phoneDisplay: "+90 (212) 000 00 00",
    /** tel: bağlantısı için — sadece rakam ve + */
    phoneHref: "+902120000000",
    /** WhatsApp — ülke kodu dahil, sadece rakam. wa.me bu formatı ister. */
    whatsapp: "905000000000",
    email: "info@lorva.example",
    address: {
      tr: "Aykosan Sanayi Sitesi, [Blok] Blok, No: [00]\nİkitelli OSB, Başakşehir / İstanbul",
      en: "Aykosan Industrial Estate, Block [Block], No: [00]\nİkitelli OIZ, Başakşehir / İstanbul",
    },
    /** Google Maps gömme bağlantısı — showroom adresine göre değiştir. */
    mapEmbedUrl:
      "https://www.google.com/maps?q=Aykosan+Sanayi+Sitesi+İkitelli+İstanbul&output=embed",
    mapLinkUrl: "https://www.google.com/maps/search/?api=1&query=Aykosan+Sanayi+Sitesi+İkitelli+İstanbul",
    hours: {
      tr: [
        ["Pazartesi — Cuma", "08:30 — 18:30"],
        ["Cumartesi", "09:00 — 16:00"],
        ["Pazar", "Kapalı"],
      ],
      en: [
        ["Monday — Friday", "08:30 — 18:30"],
        ["Saturday", "09:00 — 16:00"],
        ["Sunday", "Closed"],
      ],
    },
  },

  /* --- Sosyal medya / Social -------------------------------------------- */
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],

  /* --- Rakamlar / Key figures ------------------------------------------- */
  figures: [
    { value: "1987", label: { tr: "Kuruluş", en: "Founded" } },
    { value: "1.800", label: { tr: "Günlük çift kapasite", en: "Pairs per day" }, suffix: "" },
    { value: "19", label: { tr: "İhracat yapılan ülke", en: "Export countries" } },
    { value: "64", label: { tr: "Atölye çalışanı", en: "People in the workshop" } },
  ],

  /* --- Ticari varsayılanlar / Commercial defaults ------------------------ */
  commerce: {
    /** Varsayılan minimum sipariş (çift) — ürün bazında data/products.ts içinde ezilebilir. */
    defaultMoq: 48,
    /** Teklif listesinde bir satır için varsayılan seri adedi. */
    defaultSeriesQty: 1,
  },

  /* --- SEO --------------------------------------------------------------- */
  seo: {
    /** Yayına alınca kendi alan adını yaz. Vercel'de otomatik domain de olur. */
    siteUrl: "https://lorva.example",
    titleTemplate: "%s — LORVA",
    keywords: [
      "ayakkabı imalatı",
      "toptan ayakkabı",
      "İkitelli ayakkabı üreticisi",
      "Aykosan",
      "deri ayakkabı",
      "leather shoe manufacturer Turkey",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
