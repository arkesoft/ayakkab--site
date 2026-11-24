import { siteConfig } from "@/site.config";
import { fill } from "./utils";

export type QuoteLine = {
  code: string;
  name: string;
  color: string;
  series: number;
  seriesPairs: number;
};

/** wa.me bağlantısı üretir. Numara site.config.ts içinden gelir. */
export function waLink(message: string) {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Tek model için "toptan fiyat al" mesajı. */
export function productMessage(
  template: string,
  product: { code: string; name: string },
) {
  return fill(template, { code: product.code, name: product.name });
}

/** Teklif listesinin tamamı için hazır mesaj. */
export function quoteListMessage(
  strings: { intro: string; outro: string; seriesShort: string; pairs: string },
  lines: QuoteLine[],
) {
  const body = lines
    .map(
      (line, i) =>
        `${i + 1}. ${line.code} — ${line.name} / ${line.color} — ${line.series} ${strings.seriesShort} (${line.series * line.seriesPairs} ${strings.pairs})`,
    )
    .join("\n");

  const total = lines.reduce((sum, l) => sum + l.series * l.seriesPairs, 0);

  return `${strings.intro}\n\n${body}\n\n= ${total} ${strings.pairs}\n\n${strings.outro}`;
}
