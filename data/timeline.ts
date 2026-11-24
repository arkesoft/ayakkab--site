import type { Localized } from "./taxonomy";

/** Hakkımızda sayfasındaki zaman çizelgesi. */
export const timeline: { year: string; title: Localized; body: Localized }[] = [
  {
    year: "1987",
    title: { tr: "Gedikpaşa'da iki tezgâh", en: "Two benches in Gedikpaşa" },
    body: {
      tr: "Baba-oğul bir atölye olarak kurulduk. Günde otuz çift, tek model.",
      en: "Founded as a father-and-son workshop. Thirty pairs a day, a single model.",
    },
  },
  {
    year: "1994",
    title: { tr: "İkitelli'ye taşınma", en: "The move to İkitelli" },
    body: {
      tr: "Üretim 400 m²'lik yeni atölyeye taşındı; ilk saya hattı kuruldu.",
      en: "Production moved to a 400 m² workshop and the first closing line was set up.",
    },
  },
  {
    year: "2003",
    title: { tr: "İlk ihracat", en: "First export order" },
    body: {
      tr: "Almanya'ya ilk konteyner. O yıl üç ülkeye çalıştık.",
      en: "The first container to Germany. We shipped to three countries that year.",
    },
  },
  {
    year: "2011",
    title: { tr: "Aykosan showroom", en: "The Aykosan showroom" },
    body: {
      tr: "Bütün koleksiyonun numunesinin durduğu showroom açıldı.",
      en: "A showroom opened holding a sample of the entire collection.",
    },
  },
  {
    year: "2018",
    title: { tr: "Kalıphane içeri alındı", en: "Last-making brought in house" },
    body: {
      tr: "Form ve kalıp üretimi kendi çatımız altına girdi; numune süresi yarıya indi.",
      en: "Shape and last production came under our own roof; sample lead time halved.",
    },
  },
  {
    year: "2024",
    title: { tr: "2.400 m², 19 ülke", en: "2,400 m², 19 countries" },
    body: {
      tr: "Günlük kapasite 1.800 çifte çıktı. Yurt dışı payı toplam üretimin yarısı.",
      en: "Daily capacity reached 1,800 pairs. Exports now make up half of output.",
    },
  },
];
