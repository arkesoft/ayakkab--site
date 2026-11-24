# Görseller

Sitedeki bütün görsel alanları dolu. Şu an iki kaynak var:

1. **Sizin verdiğiniz fotoğraflar** — hero ve 4 model.
2. **Geçici stok fotoğraflar** — kalan 20 model, 2 koleksiyon kapağı ve showroom.
   Bunlar Pexels'ten alındı (ticari kullanıma açık, atıf gerekmiyor) ve
   **müşterinin kendi fotoğraflarıyla değiştirilmek üzere** duruyor.

> Demoyu gösterirken şunu söylemek işe yarar: *"Buradaki fotoğraflar geçici,
> yerine sizin kendi modellerinizin fotoğrafları gelecek."*

---

## 1. Sizin verdiğiniz fotoğraflar

| Dosya | Nerede görünüyor | Oran |
|---|---|---|
| `hero-atolye.jpg` | Ana sayfa tam ekran hero · Hakkımızda kapak | 3:2 |
| `urun-bot-siyah.jpg` + `-2` | LRV-3102 Tora Bot · "Bot" koleksiyon kartı | 2:3 |
| `urun-sneaker.jpg` + `-2` | LRV-4201 Ova Sneaker · "Sneaker" koleksiyon kartı | 2:3 |
| `urun-klasik-takim.jpg` + `-2` | LRV-5311 Bey Loafer · "Klasik" koleksiyon kartı | 1:1 |
| `urun-marin.jpg` + `-2` | LRV-5319 Marin Casual · Ana sayfa atölye bölümü | 3:2 |

---

## 2. Değiştirilmesi gereken geçici fotoğraflar

Her model için **iki dosya** var: `urun-lrv-XXXX.jpg` (ana kare) ve
`urun-lrv-XXXX-2.jpg` (ürün kartında hover'da geçilen ikinci kare, şu an ana
karenin yakın kırpımı).

Değiştirmek için: aynı adla yeni dosyayı `public/images/` içine koy. Kod
değişikliği gerekmez — yollar zaten `data/products.ts` içinde tanımlı.

| Dosya | Model | Grup |
|---|---|---|
| `urun-lrv-2417` | Mila Merdane | Zenne & Merdane |
| `urun-lrv-2423` | Vera Babet | Zenne & Merdane |
| `urun-lrv-2431` | Lima Loafer | Zenne & Merdane |
| `urun-lrv-2438` | Ela Slingback | Zenne & Merdane |
| `urun-lrv-2444` | Nar Merdane | Zenne & Merdane |
| `urun-lrv-3110` | Ren Bilek Bot | Bot |
| `urun-lrv-3118` | Demir Postal | Bot |
| `urun-lrv-3125` | Kaya Chelsea | Bot |
| `urun-lrv-3133` | Zeyn Tokalı Bot | Bot |
| `urun-lrv-4208` | Ova Sneaker Kadın | Sneaker |
| `urun-lrv-4215` | Tay Retro | Sneaker |
| `urun-lrv-4222` | Pera Court | Sneaker |
| `urun-lrv-4230` | Kent Runner | Sneaker |
| `urun-lrv-5304` | Sadri Bağcıklı | Klasik |
| `urun-lrv-5326` | Efe Oxford | Klasik |
| `urun-lrv-5334` | Arya Ofis | Klasik |
| `urun-lrv-6402` | Dalya Sandalet | Sandalet |
| `urun-lrv-6409` | Side Terlik | Sandalet |
| `urun-lrv-6416` | Koy Sandalet | Sandalet |
| `urun-lrv-6423` | Mira Dolgu | Sandalet |
| `koleksiyon-zenne` | "Zenne & Merdane" koleksiyon kartı | — |
| `koleksiyon-sandalet` | "Sandalet" koleksiyon kartı | — |
| `showroom` | Ana sayfa showroom bölümü | 16:11 |

**Çekim notu (ürün kareleri):** dikey **4:5** oran (ör. 1200 × 1500 px), düz ve
sade zemin, tek ışık yönü. İlk kare ürünün 3/4 açısı, ikinci kare detay (saya
dikişi, taban yanı veya arkadan görünüş) olsun — kartta hover'da ikinciye
geçiyor, bu yüzden iki karenin farklı olması gerekiyor.

---

## 3. Dikkat: marka görünen fotoğraf kullanmayın

Stok fotoğraf seçerken ayakkabı üzerinde **başka bir markanın logosu veya adı**
görünmemesine dikkat edildi; birkaç aday bu yüzden elendi. Kendi
fotoğraflarınızı koyarken de taban, dil ve iç taban yazılarına bakın — demo
kurgusal bir markayı (LORVA) anlatıyor, kadrajda başka marka olmamalı.

---

## 4. Eklenmesi iyi olacak, şu an sitede yeri olmayan kareler

Bunlar için hazır alan yok ama elinde varsa bölüm açmak kolay:

- **Atölye detayları:** kalıphane, kesimhane, saya dikiş hattı, monte bandı,
  finisaj masası. (Hakkımızda'daki "Üretim" bölümü şu an yalnızca metin —
  her adıma küçük bir kare çok iyi oturur.)
- **Ekip:** ustaların elleri, tezgâh başı portreler. Yüz çekmek istemezsen
  eller ve aletler yeter.
- **Malzeme:** deri topları, taban ve aksesuar kutuları, renk kartelası.
- **Sevkiyat:** kolileme, barkodlama, özel kutu / kese (private label).

---

## 5. Teknik notlar

- Tüm görseller `next/image` ile servis ediliyor; AVIF/WebP'ye otomatik
  dönüştürülüyor. Kaynak dosyayı **1400–1800 px** uzun kenarda, JPEG kalite
  ~80 ile ver; daha büyüğü gereksiz.
- En–boy oranı kapsayıcıdan geliyor, görsel `object-cover` ile kırpılıyor.
  Bu yüzden **layout kayması olmuyor** — oranı tutturmak şart değil ama
  tutturursan kırpma kaybı olmaz.
- Dosya adlarında Türkçe karakter ve boşluk kullanma.
- Logo yerine görsel kullanmak istersen: `public/images/logo.svg` koy ve
  `site.config.ts` → `brand.logoImage` alanına yolunu yaz.
- Paylaşım görseli (Open Graph) koddan üretiliyor
  (`app/[locale]/opengraph-image.tsx`) — ayrı dosya gerekmiyor. Kendi
  görselini koymak istersen bu dosyayı silip aynı klasöre
  `opengraph-image.jpg` (1200 × 630) bırakman yeterli.
