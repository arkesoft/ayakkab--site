/* Kategori, sezon, malzeme ve renk tanımları.
 * Ürünler bu id'lere referans verir; etiketler burada tek yerden çevrilir. */

export type Localized = { tr: string; en: string };

export type CategoryId = "zenne" | "bot" | "sneaker" | "klasik" | "sandalet";
export type SeasonId = "ilkbahar-yaz" | "sonbahar-kis" | "dort-mevsim";
export type MaterialId =
  | "dana-derisi"
  | "nubuk"
  | "suet"
  | "rugan"
  | "keci-derisi"
  | "antik-deri"
  | "yagli-deri";
export type ColorId =
  | "siyah"
  | "taba"
  | "kahve"
  | "vizon"
  | "krem"
  | "beyaz"
  | "lacivert"
  | "bordo"
  | "antrasit"
  | "bronz"
  | "hardal"
  | "gri"
  | "pudra";
export type GenderId = "kadin" | "erkek";

export const categories: { id: CategoryId; label: Localized; blurb: Localized }[] = [
  {
    id: "zenne",
    label: { tr: "Zenne & Merdane", en: "Women's Flats" },
    blurb: {
      tr: "Günlük giyilen, yumuşak kalıplı kadın modelleri.",
      en: "Soft-lasted women's models for everyday wear.",
    },
  },
  {
    id: "bot",
    label: { tr: "Bot", en: "Boots" },
    blurb: {
      tr: "Bilek ve yarım boy; kauçuk ve termo tabanlı.",
      en: "Ankle and mid-height, on rubber and thermo soles.",
    },
  },
  {
    id: "sneaker",
    label: { tr: "Sneaker", en: "Sneakers" },
    blurb: {
      tr: "Deri sneaker; enjeksiyon ve yapıştırma taban.",
      en: "Leather sneakers on injected and cemented soles.",
    },
  },
  {
    id: "klasik",
    label: { tr: "Klasik", en: "Classic" },
    blurb: {
      tr: "Bağcıklı, loafer ve ofis modelleri.",
      en: "Derbies, loafers and office models.",
    },
  },
  {
    id: "sandalet",
    label: { tr: "Sandalet", en: "Sandals" },
    blurb: {
      tr: "Yaz grubu; sandalet, terlik ve açık modeller.",
      en: "The summer group: sandals, slides and open models.",
    },
  },
];

export const genders: { id: GenderId; label: Localized }[] = [
  { id: "kadin", label: { tr: "Kadın", en: "Women" } },
  { id: "erkek", label: { tr: "Erkek", en: "Men" } },
];

export const seasons: { id: SeasonId; label: Localized }[] = [
  { id: "ilkbahar-yaz", label: { tr: "İlkbahar / Yaz", en: "Spring / Summer" } },
  { id: "sonbahar-kis", label: { tr: "Sonbahar / Kış", en: "Autumn / Winter" } },
  { id: "dort-mevsim", label: { tr: "Dört Mevsim", en: "All Season" } },
];

export const materials: { id: MaterialId; label: Localized }[] = [
  { id: "dana-derisi", label: { tr: "Dana derisi", en: "Calf leather" } },
  { id: "nubuk", label: { tr: "Nubuk", en: "Nubuck" } },
  { id: "suet", label: { tr: "Süet", en: "Suede" } },
  { id: "rugan", label: { tr: "Rugan", en: "Patent leather" } },
  { id: "keci-derisi", label: { tr: "Keçi derisi", en: "Goat leather" } },
  { id: "antik-deri", label: { tr: "Antik deri", en: "Antiqued leather" } },
  { id: "yagli-deri", label: { tr: "Yağlı deri", en: "Oiled leather" } },
];

export const colors: { id: ColorId; label: Localized; hex: string }[] = [
  { id: "siyah", label: { tr: "Siyah", en: "Black" }, hex: "#16150F" },
  { id: "taba", label: { tr: "Taba", en: "Tan" }, hex: "#9A6A3C" },
  { id: "kahve", label: { tr: "Kahve", en: "Brown" }, hex: "#59371F" },
  { id: "vizon", label: { tr: "Vizon", en: "Mink" }, hex: "#A4886B" },
  { id: "krem", label: { tr: "Krem", en: "Cream" }, hex: "#E3D6C0" },
  { id: "beyaz", label: { tr: "Beyaz", en: "White" }, hex: "#F1EEE8" },
  { id: "lacivert", label: { tr: "Lacivert", en: "Navy" }, hex: "#1F2A3B" },
  { id: "bordo", label: { tr: "Bordo", en: "Burgundy" }, hex: "#5A2027" },
  { id: "antrasit", label: { tr: "Antrasit", en: "Anthracite" }, hex: "#36332E" },
  { id: "bronz", label: { tr: "Bronz", en: "Bronze" }, hex: "#8A6A3B" },
  { id: "hardal", label: { tr: "Hardal", en: "Mustard" }, hex: "#AE8729" },
  { id: "gri", label: { tr: "Gri", en: "Grey" }, hex: "#827C74" },
  { id: "pudra", label: { tr: "Pudra", en: "Powder" }, hex: "#D8B3AE" },
];

/* --- Yardımcılar / lookups ------------------------------------------- */

const byId = <T extends { id: string }>(list: T[]) =>
  Object.fromEntries(list.map((item) => [item.id, item])) as Record<string, T>;

export const categoryMap = byId(categories);
export const seasonMap = byId(seasons);
export const materialMap = byId(materials);
export const colorMap = byId(colors);
export const genderMap = byId(genders);
