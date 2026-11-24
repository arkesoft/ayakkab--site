import type {
  CategoryId,
  ColorId,
  GenderId,
  Localized,
  MaterialId,
  SeasonId,
} from "./taxonomy";

/* -----------------------------------------------------------------------
 *  ÜRÜNLER
 *  `src` boş bırakılan görsel slotları otomatik olarak tema renklerinde
 *  yer tutucuya düşer. Fotoğraf eklemek için public/images/ altına koyup
 *  src alanını doldurun. Detaylar: GORSELLER.md
 * -------------------------------------------------------------------- */

export type ProductImage = {
  /** public/images/... yolu. Boşsa yer tutucu gösterilir. */
  src?: string;
  /** Yer tutucu tonu (0–3). Izgarada ritim oluşturur. */
  tone?: 0 | 1 | 2 | 3;
};

export type Product = {
  code: string;
  slug: string;
  name: Localized;
  gender: GenderId;
  category: CategoryId;
  season: SeasonId;
  /** Filtrede kullanılan ana saya malzemesi */
  material: MaterialId;
  colors: ColorId[];
  sizeRange: string;
  /** Bir serideki çift sayısı */
  seriesPairs: number;
  seriesNote: Localized;
  moq: number;
  construction: { upper: Localized; lining: Localized; sole: Localized };
  description: Localized;
  images: ProductImage[];
  featured?: boolean;
};

const L = {
  deriAstar: { tr: "Hakiki deri astar", en: "Genuine leather lining" },
  tekstilAstar: { tr: "Tekstil astar", en: "Textile lining" },
  kurkAstar: { tr: "Kürk astar", en: "Shearling lining" },
  yarmaAstar: { tr: "Yarma deri astar", en: "Split leather lining" },
};

const S = {
  termo: { tr: "Termo kauçuk taban", en: "Thermo rubber sole" },
  kaucuk: { tr: "Kauçuk taban", en: "Rubber sole" },
  eva: { tr: "EVA enjeksiyon taban", en: "Injected EVA sole" },
  neolit: { tr: "Neolit taban", en: "Neolite sole" },
  tpr: { tr: "TPR taban", en: "TPR sole" },
  deriFors: { tr: "Deri taban, kauçuk fors", en: "Leather sole with rubber insert" },
  krep: { tr: "Krep kauçuk taban", en: "Crepe rubber sole" },
  poli: { tr: "Poliüretan taban", en: "Polyurethane sole" },
};

const U = {
  dana: { tr: "Dana derisi", en: "Calf leather" },
  nubuk: { tr: "Nubuk deri", en: "Nubuck leather" },
  suet: { tr: "Süet", en: "Suede" },
  rugan: { tr: "Rugan", en: "Patent leather" },
  keci: { tr: "Keçi derisi", en: "Goat leather" },
  antik: { tr: "Antik efektli dana derisi", en: "Antiqued calf leather" },
  yagli: { tr: "Yağlı dana derisi", en: "Oiled calf leather" },
};

const seri8 = { tr: "8'li asorti seri", en: "8-pair assorted series" };
const seri10 = { tr: "10'lu asorti seri", en: "10-pair assorted series" };
const seri12 = { tr: "12'li asorti seri", en: "12-pair assorted series" };

export const products: Product[] = [
  /* ------------------------------- ZENNE ------------------------------ */
  {
    code: "LRV-2417",
    slug: "lrv-2417",
    name: { tr: "Mila Merdane", en: "Mila Flat" },
    gender: "kadin",
    category: "zenne",
    season: "dort-mevsim",
    material: "dana-derisi",
    colors: ["siyah", "taba", "vizon"],
    sizeRange: "36–40",
    seriesPairs: 8,
    seriesNote: seri8,
    moq: 48,
    construction: { upper: U.dana, lining: L.deriAstar, sole: S.kaucuk },
    description: {
      tr: "Yumuşak kalıpla çalışılan, gün boyu giyilen merdane. Ayak bileği kesimi alçak tutuldu, astarın tamamı deri.",
      en: "A soft-lasted flat built for all-day wear. The collar sits low and the lining is leather throughout.",
    },
    images: [
      { src: "/images/urun-lrv-2417.jpg" },
      { src: "/images/urun-lrv-2417-2.jpg" },
    ],
  },
  {
    code: "LRV-2423",
    slug: "lrv-2423",
    name: { tr: "Vera Babet", en: "Vera Ballerina" },
    gender: "kadin",
    category: "zenne",
    season: "ilkbahar-yaz",
    material: "keci-derisi",
    colors: ["pudra", "krem", "siyah"],
    sizeRange: "36–40",
    seriesPairs: 8,
    seriesNote: seri8,
    moq: 48,
    construction: { upper: U.keci, lining: L.deriAstar, sole: S.tpr },
    description: {
      tr: "İnce keçi derisiyle çalışılan klasik babet. Hafif, katlanabilir taban; vitrinde ilk elde alınan modellerden.",
      en: "A classic ballerina in fine goat leather. Light, with a flexible sole — one of the first models buyers pick up.",
    },
    images: [
      { src: "/images/urun-lrv-2423.jpg" },
      { src: "/images/urun-lrv-2423-2.jpg" },
    ],
  },
  {
    code: "LRV-2431",
    slug: "lrv-2431",
    name: { tr: "Lima Loafer", en: "Lima Loafer" },
    gender: "kadin",
    category: "zenne",
    season: "dort-mevsim",
    material: "rugan",
    colors: ["siyah", "beyaz", "bordo"],
    sizeRange: "36–40",
    seriesPairs: 8,
    seriesNote: seri8,
    moq: 48,
    construction: { upper: U.rugan, lining: L.deriAstar, sole: S.neolit },
    description: {
      tr: "Ruganla çalışılan kadın loafer. Tokası metal döküm, taban neolit — ofis grubunun en çok dönen modeli.",
      en: "A women's loafer in patent leather with a cast metal trim on a Neolite sole — the fastest mover in the office group.",
    },
    images: [
      { src: "/images/urun-lrv-2431.jpg" },
      { src: "/images/urun-lrv-2431-2.jpg" },
    ],
  },
  {
    code: "LRV-2438",
    slug: "lrv-2438",
    name: { tr: "Ela Slingback", en: "Ela Slingback" },
    gender: "kadin",
    category: "zenne",
    season: "sonbahar-kis",
    material: "dana-derisi",
    colors: ["siyah", "vizon", "bordo"],
    sizeRange: "36–40",
    seriesPairs: 8,
    seriesNote: seri8,
    moq: 48,
    construction: { upper: U.dana, lining: L.deriAstar, sole: S.deriFors },
    description: {
      tr: "Bilekten tokalı slingback, alçak topuk. Arka bandı ayağı sıkmayacak genişlikte; ofisten davete geçen modellerden.",
      en: "A buckled slingback on a low heel. The back strap is cut wide enough not to pinch — a model that moves from the office to an evening out.",
    },
    images: [
      { src: "/images/urun-lrv-2438.jpg" },
      { src: "/images/urun-lrv-2438-2.jpg" },
    ],
  },
  {
    code: "LRV-2444",
    slug: "lrv-2444",
    name: { tr: "Nar Merdane", en: "Nar Flat" },
    gender: "kadin",
    category: "zenne",
    season: "dort-mevsim",
    material: "antik-deri",
    colors: ["taba", "kahve", "siyah"],
    sizeRange: "36–40",
    seriesPairs: 8,
    seriesNote: seri8,
    moq: 48,
    construction: { upper: U.antik, lining: L.deriAstar, sole: S.kaucuk },
    description: {
      tr: "Antik efektli deri, el perdahıyla bitirilir; her çift birbirinden biraz farklı durur. Taban kauçuk, dikişli.",
      en: "Antiqued leather finished by hand, so no two pairs are identical. Stitched rubber sole.",
    },
    images: [
      { src: "/images/urun-lrv-2444.jpg" },
      { src: "/images/urun-lrv-2444-2.jpg" },
    ],
  },

  /* -------------------------------- BOT ------------------------------- */
  {
    code: "LRV-3102",
    slug: "lrv-3102",
    name: { tr: "Tora Bot", en: "Tora Boot" },
    gender: "kadin",
    category: "bot",
    season: "sonbahar-kis",
    material: "dana-derisi",
    colors: ["siyah", "antrasit", "kahve"],
    sizeRange: "36–41",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.dana, lining: L.deriAstar, sole: S.termo },
    description: {
      tr: "Yan fermuarlı bilek bot, 6 cm topuk. Termo taban kışta kaymaz; konç yüksekliği pantolon altında kalacak şekilde ayarlandı.",
      en: "A side-zip ankle boot on a 6 cm heel. The thermo sole grips in winter and the shaft height sits neatly under trousers.",
    },
    images: [{ src: "/images/urun-bot-siyah.jpg" }, { src: "/images/urun-bot-siyah-2.jpg" }],
    featured: true,
  },
  {
    code: "LRV-3110",
    slug: "lrv-3110",
    name: { tr: "Ren Bilek Bot", en: "Ren Ankle Boot" },
    gender: "kadin",
    category: "bot",
    season: "sonbahar-kis",
    material: "suet",
    colors: ["vizon", "siyah"],
    sizeRange: "36–41",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.suet, lining: L.kurkAstar, sole: S.termo },
    description: {
      tr: "Kürk astarlı süet bot. Sıcak tutar ama şişkin durmaz; konç içi astarı yüne dönmeyecek kalitede seçildi.",
      en: "A shearling-lined suede boot. Warm without looking bulky; the shaft lining is chosen not to mat over the season.",
    },
    images: [
      { src: "/images/urun-lrv-3110.jpg" },
      { src: "/images/urun-lrv-3110-2.jpg" },
    ],
  },
  {
    code: "LRV-3118",
    slug: "lrv-3118",
    name: { tr: "Demir Postal", en: "Demir Work Boot" },
    gender: "erkek",
    category: "bot",
    season: "sonbahar-kis",
    material: "yagli-deri",
    colors: ["kahve", "siyah"],
    sizeRange: "40–45",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.yagli, lining: L.deriAstar, sole: S.kaucuk },
    description: {
      tr: "Yağlı deri saya, dikiş-yapıştırma monte. Ağır kullanım için; tabanı sökülüp yenilenebilir.",
      en: "Oiled leather upper, stitched-and-cemented construction. Built for hard wear, and the sole can be replaced.",
    },
    images: [
      { src: "/images/urun-lrv-3118.jpg" },
      { src: "/images/urun-lrv-3118-2.jpg" },
    ],
  },
  {
    code: "LRV-3125",
    slug: "lrv-3125",
    name: { tr: "Kaya Chelsea", en: "Kaya Chelsea" },
    gender: "erkek",
    category: "bot",
    season: "sonbahar-kis",
    material: "nubuk",
    colors: ["taba", "antrasit"],
    sizeRange: "40–45",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.nubuk, lining: L.deriAstar, sole: S.krep },
    description: {
      tr: "Krep tabanlı chelsea. Yan lastikleri iki kat dokuma; altı ay sonra da ayağa oturmaya devam eder.",
      en: "A crepe-soled chelsea. The side elastics are double-woven, so the fit holds six months in.",
    },
    images: [
      { src: "/images/urun-lrv-3125.jpg" },
      { src: "/images/urun-lrv-3125-2.jpg" },
    ],
  },
  {
    code: "LRV-3133",
    slug: "lrv-3133",
    name: { tr: "Zeyn Tokalı Bot", en: "Zeyn Buckle Boot" },
    gender: "kadin",
    category: "bot",
    season: "sonbahar-kis",
    material: "nubuk",
    colors: ["kahve", "bordo"],
    sizeRange: "36–41",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.nubuk, lining: L.yarmaAstar, sole: S.termo },
    description: {
      tr: "Çift tokalı bilek bot, 5 cm topuk. Konç dikişleri çift iğne; yoğun kullanımda açılmıyor.",
      en: "A double-buckle ankle boot on a 5 cm heel. Double-needle stitching on the shaft keeps its shape under heavy use.",
    },
    images: [
      { src: "/images/urun-lrv-3133.jpg" },
      { src: "/images/urun-lrv-3133-2.jpg" },
    ],
  },

  /* ------------------------------ SNEAKER ----------------------------- */
  {
    code: "LRV-4201",
    slug: "lrv-4201",
    name: { tr: "Ova Sneaker", en: "Ova Sneaker" },
    gender: "erkek",
    category: "sneaker",
    season: "dort-mevsim",
    material: "dana-derisi",
    colors: ["beyaz", "siyah", "lacivert"],
    sizeRange: "40–45",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.dana, lining: L.deriAstar, sole: S.kaucuk },
    description: {
      tr: "Sade court form, iki renk saya. Taban kauçuk ve beyazlığını koruyan karışım; en çok tekrar sipariş alan modelimiz.",
      en: "A clean court shape in two-tone leather on a rubber compound that keeps its white. Our most reordered model.",
    },
    images: [{ src: "/images/urun-sneaker.jpg" }, { src: "/images/urun-sneaker-2.jpg" }],
    featured: true,
  },
  {
    code: "LRV-4208",
    slug: "lrv-4208",
    name: { tr: "Ova Sneaker Kadın", en: "Ova Sneaker Women" },
    gender: "kadin",
    category: "sneaker",
    season: "dort-mevsim",
    material: "dana-derisi",
    colors: ["beyaz", "vizon"],
    sizeRange: "36–41",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.dana, lining: L.deriAstar, sole: S.kaucuk },
    description: {
      tr: "Ova'nın kadın kalıbı. Burun formu biraz daha dar, taban 4 mm ince.",
      en: "The women's last of the Ova. Slightly narrower toe and a sole 4 mm thinner.",
    },
    images: [
      { src: "/images/urun-lrv-4208.jpg" },
      { src: "/images/urun-lrv-4208-2.jpg" },
    ],
  },
  {
    code: "LRV-4215",
    slug: "lrv-4215",
    name: { tr: "Tay Retro", en: "Tay Retro" },
    gender: "erkek",
    category: "sneaker",
    season: "dort-mevsim",
    material: "suet",
    colors: ["gri", "lacivert", "taba"],
    sizeRange: "40–45",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.suet, lining: L.tekstilAstar, sole: S.eva },
    description: {
      tr: "Süet ve tekstil karma saya, retro form. EVA taban sayesinde çift ağırlığı 320 gr.",
      en: "A retro shape in mixed suede and textile. The EVA sole brings each shoe down to 320 g.",
    },
    images: [
      { src: "/images/urun-lrv-4215.jpg" },
      { src: "/images/urun-lrv-4215-2.jpg" },
    ],
  },
  {
    code: "LRV-4222",
    slug: "lrv-4222",
    name: { tr: "Pera Court", en: "Pera Court" },
    gender: "kadin",
    category: "sneaker",
    season: "ilkbahar-yaz",
    material: "dana-derisi",
    colors: ["siyah", "beyaz"],
    sizeRange: "36–41",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.dana, lining: L.deriAstar, sole: S.poli },
    description: {
      tr: "Kalın tabanlı kadın court. Yaz grubunda beyaz çalışılıyor, isteğe göre renk açılıyor.",
      en: "A chunky-soled women's court. White for the summer group, other colours opened on request.",
    },
    images: [
      { src: "/images/urun-lrv-4222.jpg" },
      { src: "/images/urun-lrv-4222-2.jpg" },
    ],
  },
  {
    code: "LRV-4230",
    slug: "lrv-4230",
    name: { tr: "Kent Runner", en: "Kent Runner" },
    gender: "erkek",
    category: "sneaker",
    season: "dort-mevsim",
    material: "nubuk",
    colors: ["antrasit", "kahve"],
    sizeRange: "40–45",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.nubuk, lining: L.tekstilAstar, sole: S.eva },
    description: {
      tr: "Günlük yürüyüş için hafif runner. Nubuk saya, iç taban çıkarılabilir ve yıkanabilir.",
      en: "A light runner for everyday walking. Nubuck upper with a removable, washable footbed.",
    },
    images: [
      { src: "/images/urun-lrv-4230.jpg" },
      { src: "/images/urun-lrv-4230-2.jpg" },
    ],
  },

  /* ------------------------------ KLASİK ------------------------------ */
  {
    code: "LRV-5304",
    slug: "lrv-5304",
    name: { tr: "Sadri Bağcıklı", en: "Sadri Derby" },
    gender: "erkek",
    category: "klasik",
    season: "dort-mevsim",
    material: "dana-derisi",
    colors: ["siyah", "kahve", "lacivert"],
    sizeRange: "39–45",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.dana, lining: L.deriAstar, sole: S.deriFors },
    description: {
      tr: "Klasik derby kalıbı, üç gözlü bağcık. Deri taban, topuk altında kauçuk fors var — asfaltta ses yapmaz.",
      en: "A classic derby last with three eyelets. Leather sole with a rubber insert at the heel, so it stays quiet on pavement.",
    },
    images: [
      { src: "/images/urun-lrv-5304.jpg" },
      { src: "/images/urun-lrv-5304-2.jpg" },
    ],
  },
  {
    code: "LRV-5311",
    slug: "lrv-5311",
    name: { tr: "Bey Loafer", en: "Bey Loafer" },
    gender: "erkek",
    category: "klasik",
    season: "dort-mevsim",
    material: "rugan",
    colors: ["siyah", "bordo"],
    sizeRange: "39–45",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.rugan, lining: L.deriAstar, sole: S.deriFors },
    description: {
      tr: "Davet ve smokin grubunun modeli. Rugan saya, el dikişi püskül; kutusu ve kesesi dahil çıkar.",
      en: "The model for the black-tie group. Patent upper with a hand-stitched tassel; ships with box and dust bag.",
    },
    images: [
      { src: "/images/urun-klasik-takim.jpg" },
      { src: "/images/urun-klasik-takim-2.jpg" },
    ],
    featured: true,
  },
  {
    code: "LRV-5319",
    slug: "lrv-5319",
    name: { tr: "Marin Casual", en: "Marin Casual" },
    gender: "erkek",
    category: "klasik",
    season: "ilkbahar-yaz",
    material: "yagli-deri",
    colors: ["kahve", "taba"],
    sizeRange: "40–45",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.yagli, lining: L.deriAstar, sole: S.kaucuk },
    description: {
      tr: "Marin form, el dikişli burun. Yağlı deri kullandıkça açılır, ayağın formunu alır.",
      en: "A boat shape with a hand-stitched apron. The oiled leather opens up with wear and takes the shape of the foot.",
    },
    images: [{ src: "/images/urun-marin.jpg" }, { src: "/images/urun-marin-2.jpg" }],
    featured: true,
  },
  {
    code: "LRV-5326",
    slug: "lrv-5326",
    name: { tr: "Efe Oxford", en: "Efe Oxford" },
    gender: "erkek",
    category: "klasik",
    season: "sonbahar-kis",
    material: "antik-deri",
    colors: ["kahve", "bordo"],
    sizeRange: "39–45",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.antik, lining: L.deriAstar, sole: S.deriFors },
    description: {
      tr: "Kapalı bağcık, perforasyonlu burun. Antik deri elde boyanır; renk tonu partiden partiye kasten değişir.",
      en: "Closed lacing with a perforated cap. The antiqued leather is hand-coloured, so the tone shifts deliberately between batches.",
    },
    images: [
      { src: "/images/urun-lrv-5326.jpg" },
      { src: "/images/urun-lrv-5326-2.jpg" },
    ],
  },
  {
    code: "LRV-5334",
    slug: "lrv-5334",
    name: { tr: "Arya Ofis", en: "Arya Office" },
    gender: "kadin",
    category: "klasik",
    season: "dort-mevsim",
    material: "dana-derisi",
    colors: ["siyah", "lacivert"],
    sizeRange: "36–40",
    seriesPairs: 8,
    seriesNote: seri8,
    moq: 48,
    construction: { upper: U.dana, lining: L.deriAstar, sole: S.neolit },
    description: {
      tr: "3 cm topuklu kapalı ofis modeli. Gün boyu ayakta duran için iç taban yastıklı.",
      en: "A closed office model on a 3 cm heel, with a cushioned footbed for people who are on their feet all day.",
    },
    images: [
      { src: "/images/urun-lrv-5334.jpg" },
      { src: "/images/urun-lrv-5334-2.jpg" },
    ],
  },

  /* ----------------------------- SANDALET ----------------------------- */
  {
    code: "LRV-6402",
    slug: "lrv-6402",
    name: { tr: "Dalya Sandalet", en: "Dalya Sandal" },
    gender: "kadin",
    category: "sandalet",
    season: "ilkbahar-yaz",
    material: "keci-derisi",
    colors: ["taba", "krem", "siyah"],
    sizeRange: "36–40",
    seriesPairs: 8,
    seriesNote: seri8,
    moq: 48,
    construction: { upper: U.keci, lining: L.deriAstar, sole: S.tpr },
    description: {
      tr: "İnce bantlı düz sandalet. Bant içleri deri kaplı, ayağı kesmez; yaz grubunun açılış modeli.",
      en: "A flat sandal on fine straps, leather-backed so they do not cut into the foot. The opener of the summer group.",
    },
    images: [
      { src: "/images/urun-lrv-6402.jpg" },
      { src: "/images/urun-lrv-6402-2.jpg" },
    ],
  },
  {
    code: "LRV-6409",
    slug: "lrv-6409",
    name: { tr: "Side Terlik", en: "Side Slide" },
    gender: "kadin",
    category: "sandalet",
    season: "ilkbahar-yaz",
    material: "dana-derisi",
    colors: ["siyah", "taba", "beyaz"],
    sizeRange: "36–40",
    seriesPairs: 8,
    seriesNote: seri8,
    moq: 48,
    construction: { upper: U.dana, lining: L.deriAstar, sole: S.eva },
    description: {
      tr: "Tek bantlı terlik, metal tokalı. Düz taban, deri astar; plajdan şehre geçen modellerden.",
      en: "A single-band slide with a metal trim. Flat sole, leather lining — a model that carries from the coast into town.",
    },
    images: [
      { src: "/images/urun-lrv-6409.jpg" },
      { src: "/images/urun-lrv-6409-2.jpg" },
    ],
  },
  {
    code: "LRV-6416",
    slug: "lrv-6416",
    name: { tr: "Koy Sandalet", en: "Koy Sandal" },
    gender: "erkek",
    category: "sandalet",
    season: "ilkbahar-yaz",
    material: "yagli-deri",
    colors: ["kahve", "siyah"],
    sizeRange: "40–45",
    seriesPairs: 12,
    seriesNote: seri12,
    moq: 48,
    construction: { upper: U.yagli, lining: L.deriAstar, sole: S.kaucuk },
    description: {
      tr: "Çift tokalı erkek sandaleti, anatomik iç taban. Tokalar paslanmaz; denize girilen yerlerde de çalışıyor.",
      en: "A two-buckle men's sandal on a contoured footbed. The buckles are stainless, so it works in seaside resorts too.",
    },
    images: [
      { src: "/images/urun-lrv-6416.jpg" },
      { src: "/images/urun-lrv-6416-2.jpg" },
    ],
  },
  {
    code: "LRV-6423",
    slug: "lrv-6423",
    name: { tr: "Mira Dolgu", en: "Mira Wedge" },
    gender: "kadin",
    category: "sandalet",
    season: "ilkbahar-yaz",
    material: "suet",
    colors: ["vizon", "krem"],
    sizeRange: "36–40",
    seriesPairs: 8,
    seriesNote: seri8,
    moq: 48,
    construction: { upper: U.suet, lining: L.deriAstar, sole: S.poli },
    description: {
      tr: "7 cm dolgu topuk, hasır kaplama. Yüksek ama yürünebilir; düğün ve davet sezonunda talep görüyor.",
      en: "A 7 cm raffia-wrapped wedge. High but walkable — it moves through the wedding season.",
    },
    images: [
      { src: "/images/urun-lrv-6423.jpg" },
      { src: "/images/urun-lrv-6423-2.jpg" },
    ],
  },
];

/* --- Yardımcılar ------------------------------------------------------ */

export const featuredProducts = products.filter((p) => p.featured);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
  const others = products.filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/** Kategori kartlarında kullanılan kapak görselleri. */
export const categoryCovers: Record<string, ProductImage> = {
  zenne: { src: "/images/koleksiyon-zenne.jpg" },
  bot: { src: "/images/urun-bot-siyah.jpg" },
  sneaker: { src: "/images/urun-sneaker.jpg" },
  klasik: { src: "/images/urun-klasik-takim.jpg" },
  sandalet: { src: "/images/koleksiyon-sandalet.jpg" },
};
