"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/data/products";
import { colorMap } from "@/data/taxonomy";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const STORAGE_KEY = "lorva.quote.v1";

export type QuoteEntry = {
  /** `${slug}__${colorId}` */
  key: string;
  slug: string;
  colorId: string;
  /** kaç seri */
  series: number;
};

/** Ekranda gösterilecek hâle getirilmiş satır. */
export type ResolvedLine = QuoteEntry & {
  code: string;
  name: string;
  colorLabel: string;
  colorHex: string;
  seriesPairs: number;
  pairs: number;
};

export type QuoteStrings = Pick<
  Dictionary,
  "quote" | "common" | "whatsapp" | "a11y" | "product" | "nav"
>;

type QuoteContextValue = {
  entries: QuoteEntry[];
  lines: ResolvedLine[];
  count: number;
  totalPairs: number;
  ready: boolean;
  isOpen: boolean;
  lastAdded: string | null;
  open: () => void;
  close: () => void;
  add: (slug: string, colorId: string, series?: number) => void;
  remove: (key: string) => void;
  setSeries: (key: string, series: number) => void;
  clear: () => void;
  strings: QuoteStrings;
  locale: Locale;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

function readStorage(): QuoteEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is QuoteEntry =>
        !!item &&
        typeof item === "object" &&
        typeof (item as QuoteEntry).slug === "string" &&
        typeof (item as QuoteEntry).colorId === "string",
    );
  } catch {
    return [];
  }
}

export function QuoteProvider({
  children,
  strings,
  locale,
}: {
  children: ReactNode;
  strings: QuoteStrings;
  locale: Locale;
}) {
  const [entries, setEntries] = useState<QuoteEntry[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    setEntries(readStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      /* özel sekme / dolu depolama — sessizce geç */
    }
  }, [entries, ready]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const add = useCallback((slug: string, colorId: string, series = 1) => {
    const key = `${slug}__${colorId}`;
    setEntries((current) => {
      const existing = current.find((entry) => entry.key === key);
      if (existing) {
        return current.map((entry) =>
          entry.key === key
            ? { ...entry, series: Math.min(99, entry.series + series) }
            : entry,
        );
      }
      return [...current, { key, slug, colorId, series }];
    });
    setLastAdded(key);
    window.setTimeout(() => setLastAdded((k) => (k === key ? null : k)), 2200);
  }, []);

  const remove = useCallback((key: string) => {
    setEntries((current) => current.filter((entry) => entry.key !== key));
  }, []);

  const setSeries = useCallback((key: string, series: number) => {
    const next = Math.max(1, Math.min(99, series));
    setEntries((current) =>
      current.map((entry) => (entry.key === key ? { ...entry, series: next } : entry)),
    );
  }, []);

  const clear = useCallback(() => setEntries([]), []);

  const lines = useMemo<ResolvedLine[]>(() => {
    return entries.flatMap((entry) => {
      const product = products.find((p) => p.slug === entry.slug);
      if (!product) return [];
      const color = colorMap[entry.colorId];
      return [
        {
          ...entry,
          code: product.code,
          name: product.name[locale] ?? product.name.tr,
          colorLabel: color ? (color.label[locale] ?? color.label.tr) : entry.colorId,
          colorHex: color?.hex ?? "#999",
          seriesPairs: product.seriesPairs,
          pairs: product.seriesPairs * entry.series,
        },
      ];
    });
  }, [entries, locale]);

  const value = useMemo<QuoteContextValue>(
    () => ({
      entries,
      lines,
      count: lines.length,
      totalPairs: lines.reduce((sum, line) => sum + line.pairs, 0),
      ready,
      isOpen,
      lastAdded,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      remove,
      setSeries,
      clear,
      strings,
      locale,
    }),
    [entries, lines, ready, isOpen, lastAdded, add, remove, setSeries, clear, strings, locale],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useQuote must be used inside <QuoteProvider>");
  return context;
}
