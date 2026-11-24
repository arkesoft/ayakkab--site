"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/data/products";
import { colorMap } from "@/data/taxonomy";
import type { Locale } from "@/i18n/config";
import { cx, pick } from "@/lib/utils";
import { productMessage, waLink } from "@/lib/whatsapp";
import { useQuote } from "@/components/quote/quote-context";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { WhatsAppMark } from "@/components/ui/icons";

export function AddToQuote({ product, locale }: { product: Product; locale: Locale }) {
  const { add, open, strings } = useQuote();
  const [colorId, setColorId] = useState(product.colors[0]);
  const [series, setSeries] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const reduce = useReducedMotion();

  const name = pick(product.name, locale);
  const waHref = waLink(
    productMessage(strings.whatsapp.singleProduct, { code: product.code, name }),
  );

  const handleAdd = () => {
    add(product.slug, colorId, series);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div>
      <fieldset>
        <legend className="kicker">{strings.product.colors}</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.colors.map((id) => {
            const color = colorMap[id];
            const active = id === colorId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setColorId(id)}
                aria-pressed={active}
                className={cx(
                  "flex items-center gap-2.5 border px-3 py-2 text-xs transition-colors duration-300",
                  active
                    ? "border-[var(--c-ink)] text-[var(--c-ink)]"
                    : "border-[var(--c-line)] text-[var(--c-ink-soft)] hover:border-[var(--c-ink-soft)]",
                )}
              >
                <span
                  aria-hidden="true"
                  className="size-3.5 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: color?.hex }}
                />
                {color ? pick(color.label, locale) : id}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-[var(--c-ink-soft)]">{strings.product.colorsNote}</p>
      </fieldset>

      <div className="mt-8 flex items-center justify-between border-t border-b border-[var(--c-line)] py-4">
        <div>
          <p className="kicker">{strings.product.seriesQty}</p>
          <p className="mt-1.5 text-sm text-[var(--c-ink-soft)]">
            {series} × {product.seriesPairs} ={" "}
            <span className="text-[var(--c-ink)]">
              {series * product.seriesPairs} {strings.common.pairs}
            </span>
          </p>
        </div>
        <div className="flex items-center border border-[var(--c-line)]">
          <button
            type="button"
            onClick={() => setSeries((n) => Math.max(1, n - 1))}
            disabled={series <= 1}
            aria-label={strings.quote.decrease}
            className="grid size-10 place-items-center text-[var(--c-ink-soft)] transition-colors hover:text-[var(--c-ink)] disabled:opacity-35"
          >
            <svg width="10" height="2" viewBox="0 0 10 2" aria-hidden="true">
              <path d="M0 1h10" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
          <span className="min-w-10 text-center text-sm tabular-nums">{series}</span>
          <button
            type="button"
            onClick={() => setSeries((n) => Math.min(99, n + 1))}
            aria-label={strings.quote.increase}
            className="grid size-10 place-items-center text-[var(--c-ink-soft)] transition-colors hover:text-[var(--c-ink)]"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M0 5h10M5 0v10" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <ButtonAnchor
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="solid"
          size="lg"
          className="w-full"
        >
          <WhatsAppMark />
          {strings.common.getWholesalePrice}
        </ButtonAnchor>

        <Button variant="outline" size="lg" onClick={handleAdd} className="w-full">
          {strings.common.addToQuote}
        </Button>
      </div>

      <div className="relative mt-3 h-5" aria-live="polite">
        <AnimatePresence>
          {justAdded && (
            <motion.button
              type="button"
              onClick={open}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 text-center text-xs text-[var(--c-accent)] underline underline-offset-4"
            >
              {strings.common.added} — {strings.nav.openQuote}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
