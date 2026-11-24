"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/site.config";
import { locales, localeShort, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cx, localePath } from "@/lib/utils";
import { useQuote } from "@/components/quote/quote-context";

type HeaderProps = {
  locale: Locale;
  dict: Pick<Dictionary, "nav" | "common" | "a11y">;
};

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useQuote();
  const reduce = useReducedMotion();

  const nav = [
    { href: localePath(locale, "collection"), label: dict.nav.collection },
    { href: localePath(locale, "wholesale"), label: dict.nav.wholesale },
    { href: localePath(locale, "about"), label: dict.nav.about },
    { href: localePath(locale, "contact"), label: dict.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Ana sayfada hero fotoğrafının üzerinde şeffaf durur.
  const isHome = pathname === localePath(locale);
  const light = isHome && !scrolled && !menuOpen;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:bg-[var(--c-ink)] focus:px-4 focus:py-2 focus:text-xs focus:tracking-[0.2em] focus:text-[var(--c-bg)] focus:uppercase"
      >
        {dict.common.skipToContent}
      </a>

      <header
        className={cx(
          "fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,color] duration-500",
          light
            ? "border-b border-transparent text-white"
            : "border-b border-[var(--c-line)] bg-[var(--c-bg)]/92 text-[var(--c-ink)] backdrop-blur-md",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
          <Link
            href={localePath(locale)}
            aria-label={siteConfig.brand.name}
            className="font-display text-xl leading-none font-normal sm:text-[1.4rem]"
            style={{
              letterSpacing: siteConfig.brand.logoTracking,
              textIndent: siteConfig.brand.logoTracking,
            }}
          >
            {siteConfig.brand.name}
          </Link>

          <nav aria-label={dict.nav.menu} className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "link-underline text-[0.6875rem] tracking-[0.2em] uppercase transition-opacity",
                    active ? "opacity-100" : "opacity-70 hover:opacity-100",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <LocaleSwitcher current={locale} label={dict.a11y.changeLanguage} />

            <button
              type="button"
              onClick={open}
              className="relative flex items-center gap-2 text-[0.6875rem] tracking-[0.2em] uppercase"
            >
              <span className="hidden sm:inline">{dict.nav.openQuote}</span>
              <span className="sm:hidden">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
                  <path
                    d="M1 3.5h14V17H1zM4.5 1h7v3h-7zM4.5 8.5h7M4.5 12.5h4.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
                <span className="sr-only">{dict.nav.openQuote}</span>
              </span>
              <span
                aria-hidden="true"
                className={cx(
                  "grid size-5 place-items-center rounded-full border text-[0.625rem] tabular-nums transition-colors",
                  "max-sm:absolute max-sm:-top-1.5 max-sm:-right-2 max-sm:size-4",
                  count > 0
                    ? "border-transparent bg-[var(--c-accent)] text-[var(--c-on-accent)]"
                    : "border-current opacity-55 max-sm:hidden",
                )}
              >
                {count}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.menu}
              className="-mr-2 p-2 lg:hidden"
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                <path
                  d={menuOpen ? "M3 1l14 12M17 1L3 13" : "M0 1h20M0 13h20"}
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
            className="fixed inset-0 z-[55] bg-[var(--c-bg)] pt-16 lg:hidden"
          >
            <nav className="shell flex h-full flex-col justify-center pb-24" aria-label={dict.nav.menu}>
              {nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.08 + index * 0.07, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-[var(--c-line)] py-5 font-display text-[2rem] leading-none"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LocaleSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();

  const swap = (target: Locale) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  return (
    <div className="flex items-center gap-1.5 text-[0.6875rem] tracking-[0.14em]" aria-label={label}>
      {locales.map((code, index) => (
        <span key={code} className="flex items-center gap-1.5">
          {index > 0 && <span aria-hidden="true" className="opacity-30">/</span>}
          <Link
            href={swap(code)}
            hrefLang={code}
            aria-current={code === current ? "true" : undefined}
            className={cx(
              "transition-opacity",
              code === current ? "opacity-100" : "opacity-70 hover:opacity-100",
            )}
          >
            {localeShort[code]}
          </Link>
        </span>
      ))}
    </div>
  );
}
