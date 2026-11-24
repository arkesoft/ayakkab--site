"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { products } from "@/data/products";
import { categories, colors as allColors, materials, seasons } from "@/data/taxonomy";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cx, pick } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

type Filters = {
  category: string | null;
  season: string | null;
  material: string | null;
  color: string | null;
};

const EMPTY: Filters = { category: null, season: null, material: null, color: null };

export function CollectionView({
  locale,
  dict,
  initialCategory = null,
}: {
  locale: Locale;
  dict: Pick<Dictionary, "collection" | "common">;
  /** Ana sayfadaki koleksiyon kartlarından gelen ?category=... değeri. */
  initialCategory?: string | null;
}) {
  const [filters, setFilters] = useState<Filters>({ ...EMPTY, category: initialCategory });
  const [openOnMobile, setOpenOnMobile] = useState(false);
  const reduce = useReducedMotion();
  // İlk boyamada ızgara saydam başlamasın — LCP'yi geciktirir.
  const first = useRef(true);

  useEffect(() => {
    first.current = false;
  }, []);

  const visible = useMemo(
    () =>
      products.filter(
        (product) =>
          (!filters.category || product.category === filters.category) &&
          (!filters.season || product.season === filters.season) &&
          (!filters.material || product.material === filters.material) &&
          (!filters.color || product.colors.includes(filters.color as never)),
      ),
    [filters],
  );

  const activeCount = Object.values(filters).filter(Boolean).length;
  const signature = `${filters.category}|${filters.season}|${filters.material}|${filters.color}`;

  const set = (key: keyof Filters, value: string | null) =>
    setFilters((current) => ({ ...current, [key]: current[key] === value ? null : value }));

  const groups = [
    {
      key: "category" as const,
      label: dict.collection.filterCategory,
      options: categories.map((item) => ({ id: item.id, label: pick(item.label, locale) })),
    },
    {
      key: "season" as const,
      label: dict.collection.filterSeason,
      options: seasons.map((item) => ({ id: item.id, label: pick(item.label, locale) })),
    },
    {
      key: "material" as const,
      label: dict.collection.filterMaterial,
      options: materials.map((item) => ({ id: item.id, label: pick(item.label, locale) })),
    },
  ];

  return (
    <div className="shell grid gap-10 pb-24 lg:grid-cols-12 lg:gap-12">
      {/* Filtre sütunu */}
      <aside className="lg:col-span-3">
        <h2 className="sr-only">{dict.collection.filters}</h2>
        <div className="flex items-center justify-between lg:hidden">
          <p className="text-sm text-[var(--c-ink-soft)]">
            {visible.length}{" "}
            {visible.length === 1 ? dict.collection.resultsOne : dict.collection.resultsMany}
          </p>
          <button
            type="button"
            onClick={() => setOpenOnMobile((v) => !v)}
            aria-expanded={openOnMobile}
            className="flex items-center gap-2 border border-[var(--c-line)] px-4 py-2.5 text-[0.6875rem] tracking-[0.2em] uppercase"
          >
            {openOnMobile ? dict.collection.hideFilters : dict.collection.showFilters}
            {activeCount > 0 && (
              <span className="grid size-4 place-items-center rounded-full bg-[var(--c-accent)] text-[0.625rem] text-[var(--c-on-accent)]">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        <div
          className={cx(
            "mt-6 space-y-8 lg:sticky lg:top-28 lg:mt-0 lg:block",
            openOnMobile ? "block" : "hidden",
          )}
        >
          {groups.map((group) => (
            <fieldset key={group.key}>
              <legend className="kicker">{group.label}</legend>
              <div className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2.5 lg:flex-col lg:gap-2.5">
                {group.options.map((option) => {
                  const active = filters[group.key] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => set(group.key, option.id)}
                      aria-pressed={active}
                      className={cx(
                        "text-left text-sm transition-colors duration-300",
                        active
                          ? "text-[var(--c-ink)] underline decoration-[var(--c-accent)] decoration-1 underline-offset-[6px]"
                          : "text-[var(--c-ink-soft)] hover:text-[var(--c-ink)]",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}

          <fieldset>
            <legend className="kicker">{dict.collection.filterColor}</legend>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {allColors.map((color) => {
                const active = filters.color === color.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => set("color", color.id)}
                    aria-pressed={active}
                    aria-label={pick(color.label, locale)}
                    title={pick(color.label, locale)}
                    className={cx(
                      "size-6 rounded-full ring-1 transition-all duration-300",
                      active
                        ? "ring-[var(--c-ink)] ring-offset-2 ring-offset-[var(--c-bg)]"
                        : "ring-[var(--c-line)] hover:ring-[var(--c-ink-soft)]",
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          </fieldset>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters(EMPTY)}
              className="text-[0.6875rem] tracking-[0.18em] text-[var(--c-ink-soft)] uppercase underline underline-offset-4 transition-colors hover:text-[var(--c-ink)]"
            >
              {dict.collection.clear}
            </button>
          )}
        </div>
      </aside>

      {/* Izgara */}
      <div className="lg:col-span-9">
        <h2 className="sr-only">{dict.collection.title}</h2>
        <p className="mb-8 hidden text-sm text-[var(--c-ink-soft)] lg:block">
          {visible.length}{" "}
          {visible.length === 1 ? dict.collection.resultsOne : dict.collection.resultsMany}
        </p>

        <AnimatePresence mode="wait">
          {visible.length > 0 ? (
            <motion.ul
              key={signature}
              initial={reduce || first.current ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut" }}
              className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
            >
              {visible.map((product, index) => (
                <li key={product.slug}>
                  <ProductCard
                    product={product}
                    locale={locale}
                    priority={index < 3}
                    sizes="(min-width: 1024px) 27vw, 46vw"
                  />
                </li>
              ))}
            </motion.ul>
          ) : (
            <motion.div
              key="empty"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border border-[var(--c-line)] px-8 py-20 text-center"
            >
              <h2 className="font-display text-2xl sm:text-3xl">
                {dict.collection.emptyTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[var(--c-ink-soft)]">
                {dict.collection.emptyBody}
              </p>
              <Button
                variant="outline"
                size="md"
                className="mt-8"
                onClick={() => setFilters(EMPTY)}
              >
                {dict.collection.clear}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
