"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useQuote } from "./quote-context";
import { quoteListMessage, waLink } from "@/lib/whatsapp";
import { localePath } from "@/lib/utils";
import { buttonClass } from "@/components/ui/Button";
import { CloseMark, WhatsAppMark } from "@/components/ui/icons";

export function QuotePanel() {
  const {
    isOpen,
    close,
    lines,
    count,
    totalPairs,
    remove,
    setSeries,
    clear,
    strings,
    locale,
  } = useQuote();
  const reduce = useReducedMotion();

  const href = lines.length
    ? waLink(
        quoteListMessage(
          {
            intro: strings.whatsapp.listIntro,
            outro: strings.whatsapp.listOutro,
            seriesShort: strings.quote.seriesShort,
            pairs: strings.common.pairs,
          },
          lines.map((line) => ({
            code: line.code,
            name: line.name,
            color: line.colorLabel,
            series: line.series,
            seriesPairs: line.seriesPairs,
          })),
        ),
      )
    : "#";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={strings.quote.title}>
          <motion.button
            type="button"
            aria-label={strings.common.close}
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
            className="absolute inset-0 w-full cursor-default bg-black/45 backdrop-blur-[1px]"
          />

          <motion.aside
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduce ? 0.15 : 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[26.5rem] flex-col bg-[var(--c-bg)] shadow-2xl"
          >
            <header className="flex items-start justify-between gap-4 border-b border-[var(--c-line)] px-6 py-5">
              <div>
                <p className="kicker">{strings.quote.subtitle}</p>
                <h2 className="mt-1.5 font-display text-[1.75rem] leading-none">
                  {strings.quote.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={strings.common.close}
                className="-mr-2 -mt-1 p-2 text-[var(--c-ink-soft)] transition-colors hover:text-[var(--c-ink)]"
              >
                <CloseMark size={18} />
              </button>
            </header>

            {count === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="block h-px w-10 bg-[var(--c-line)]" />
                <h3 className="mt-6 font-display text-2xl">
                  {strings.quote.empty}
                </h3>
                <p className="mt-3 max-w-[22rem] text-sm leading-relaxed text-[var(--c-ink-soft)]">
                  {strings.quote.emptyBody}
                </p>
                <Link
                  href={localePath(locale, "collection")}
                  onClick={close}
                  className={`${buttonClass("outline", "md")} mt-8`}
                >
                  {strings.quote.emptyCta}
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-[var(--c-line)] overflow-y-auto">
                  {lines.map((line) => (
                    <li key={line.key} className="px-6 py-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[0.625rem] tracking-[0.22em] text-[var(--c-ink-soft)] uppercase">
                            {line.code}
                          </p>
                          <p className="mt-1 truncate font-display text-lg leading-tight">
                            {line.name}
                          </p>
                          <p className="mt-1.5 flex items-center gap-2 text-xs text-[var(--c-ink-soft)]">
                            <span
                              aria-hidden="true"
                              className="inline-block size-3 rounded-full border border-[var(--c-line)]"
                              style={{ backgroundColor: line.colorHex }}
                            />
                            {line.colorLabel}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(line.key)}
                          aria-label={`${strings.quote.remove} — ${line.code}`}
                          className="p-1.5 text-[var(--c-ink-soft)] transition-colors hover:text-[var(--c-accent)]"
                        >
                          <CloseMark size={14} />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border border-[var(--c-line)]">
                          <button
                            type="button"
                            onClick={() => setSeries(line.key, line.series - 1)}
                            aria-label={strings.quote.decrease}
                            disabled={line.series <= 1}
                            className="grid size-9 place-items-center text-[var(--c-ink-soft)] transition-colors hover:text-[var(--c-ink)] disabled:opacity-35"
                          >
                            <svg width="10" height="2" viewBox="0 0 10 2" aria-hidden="true">
                              <path d="M0 1h10" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                          </button>
                          <span className="min-w-9 text-center text-sm tabular-nums">
                            {line.series}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSeries(line.key, line.series + 1)}
                            aria-label={strings.quote.increase}
                            className="grid size-9 place-items-center text-[var(--c-ink-soft)] transition-colors hover:text-[var(--c-ink)]"
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                              <path d="M0 5h10M5 0v10" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs text-[var(--c-ink-soft)]">
                          {line.series} × {line.seriesPairs} ={" "}
                          <span className="text-[var(--c-ink)]">
                            {line.pairs} {strings.common.pairs}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="safe-bottom border-t border-[var(--c-line)] px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="kicker">{strings.quote.totalPairs}</span>
                    <span className="font-display text-2xl">
                      {totalPairs}{" "}
                      <span className="text-sm text-[var(--c-ink-soft)]">
                        {strings.common.pairs}
                      </span>
                    </span>
                  </div>

                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${buttonClass("solid", "lg")} mt-4 w-full`}
                  >
                    <WhatsAppMark />
                    {strings.quote.send}
                  </a>

                  <div className="mt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={clear}
                      className="text-[0.6875rem] tracking-[0.14em] text-[var(--c-ink-soft)] uppercase transition-colors hover:text-[var(--c-ink)]"
                    >
                      {strings.quote.clearAll}
                    </button>
                    <span className="text-[0.6875rem] text-[var(--c-ink-soft)]">
                      {count} {strings.quote.lines}
                    </span>
                  </div>

                  <p className="mt-4 text-[0.6875rem] leading-relaxed text-[var(--c-ink-soft)]">
                    {strings.quote.note}
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

