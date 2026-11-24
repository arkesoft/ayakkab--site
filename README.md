# LORVA — ayakkabı üreticisi demo sitesi

Aykosan'daki (İkitelli, İstanbul) ayakkabı üreticileri ve toptancıları için
hazırlanmış tanıtım demosu. **LORVA kurgusal bir markadır**; gerçek hiçbir
firmanın adı, logosu veya görseli kullanılmamıştır. Yorum alanları bilerek
"müşteri yorumu buraya gelecek" yer tutucusuyla bırakılmıştır.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · backend yok.

---

## Çalıştırma

```bash
npm install
npm run dev     # http://localhost:3000
```

Yayın derlemesi:

```bash
npm run build
npm start
```

## Vercel'e yükleme

Klasörü bir Git deposuna koyup Vercel'de "Import Project" demen yeterli.
Ayar gerekmiyor — Next.js otomatik algılanıyor. Yayına aldıktan sonra
`site.config.ts` içindeki `seo.siteUrl` alanını kendi alan adınla değiştir.

---

## Başka bir firma için yeniden markalama

Markaya ait her şey **tek dosyada**: `site.config.ts`.

```
site.config.ts        marka adı, slogan, telefon, WhatsApp, adres,
                      sosyal medya, çalışma saatleri, rakamlar, tema, SEO
data/products.ts      ürünler (model kodu, renk, malzeme, numara, seri)
data/taxonomy.ts      kategori / sezon / malzeme / renk tanımları
data/timeline.ts      Hakkımızda zaman çizelgesi
i18n/dictionaries/    bütün site metinleri (tr.ts, en.ts)
public/images/        fotoğraflar — bkz. GORSELLER.md
                      (20 model, 2 koleksiyon kartı ve showroom şu an geçici
                      stok fotoğrafla duruyor; müşterinin kendi kareleriyle
                      değiştirilecek)
```

### Tema

`site.config.ts` içinde tek satır:

```ts
theme: "krem-taba",       // varsayılan
// theme: "antrasit-altin",
// theme: "beyaz-siyah",
```

Renkler CSS değişkenleriyle yönetiliyor (`app/globals.css`). Yeni bir tema
eklemek için oradaki `[data-theme="..."]` bloklarından birini kopyalayıp
değerleri değiştir, sonra `ThemeName` tipine adını ekle.

### WhatsApp

`site.config.ts` → `contact.whatsapp` alanına ülke kodu dahil, **sadece
rakamlardan** oluşan numarayı yaz (ör. `905321234567`). Teklif listesi ve
"Toptan fiyat al" butonları bu numaraya hazır mesajla gider.

---

## Diller

Şu an TR (varsayılan) ve EN açık. Yeni dil eklemek için:

1. `i18n/dictionaries/tr.ts` dosyasını kopyala, ör. `ru.ts` yap, metinleri çevir.
2. `i18n/dictionaries/index.ts` içindeki haritaya ekle.
3. `i18n/config.ts` → `locales` dizisine kodu ekle.

Arapça için ek bir şey gerekmiyor: `ar` eklendiğinde sayfa otomatik olarak
`dir="rtl"` ile render ediliyor (`i18n/config.ts` → `dir()`).

---

## Teklif listesi

Sepet yerine çalışan toptan akışı:

- Ziyaretçi ürün detayından renk ve seri adedi seçip listeye ekler.
- Liste `localStorage`'da saklanır (`lorva.quote.v1`), cihazda kalır.
- "WhatsApp'tan gönder" model kodlarını, renkleri ve adetleri içeren hazır
  bir mesajla `wa.me` bağlantısını açar.
- Ürün detayındaki "Toptan fiyat al" butonu da o modelin koduyla mesaj açar.

İlgili dosyalar: `components/quote/`, `lib/whatsapp.ts`.

---

## Notlar

- Tüm sayfalar statik üretiliyor; koleksiyon listesi `?category=` filtresi
  için sunucuda render ediliyor.
- Form demo amaçlıdır, hiçbir yere veri göndermez — doğrulama ve başarı
  durumu çalışır hâldedir. Gerçek kullanımda
  `components/forms/WholesaleForm.tsx` içindeki `onSubmit` fonksiyonunu
  kendi e-posta/CRM uç noktana bağla.
- Animasyonlar `prefers-reduced-motion` ayarına saygı duyar.
- Lighthouse (mobil, yayın derlemesi): performans 94–100, erişilebilirlik 100,
  en iyi uygulamalar 100, SEO 100; düzen kayması (CLS) 0.
