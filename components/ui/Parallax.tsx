"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  /** Toplam kayma miktarı (px). Küçük tutuyoruz — hareket fark edilmemeli. */
  distance?: number;
  className?: string;
};

/**
 * Görsellerde çok hafif derinlik. Sadece ekranda görünürken hesaplar,
 * rAF ile tek bir transform yazar, reduced-motion'da hiç çalışmaz.
 */
export function Parallax({ children, distance = 44, className }: ParallaxProps) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = outer.current;
    const layer = inner.current;
    if (!host || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = host.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // -1 (altta) .. 1 (üstte)
      const progress = (rect.top + rect.height / 2 - viewport / 2) / (viewport / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      layer.style.transform = `translate3d(0, ${(clamped * distance).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!active || frame) return;
      frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        // Yükleme anında transform yazmıyoruz: ilk boyamadan sonra katmanı
        // oynatmak hero metninin yeniden boyanmasına ve LCP'nin gecikmesine
        // yol açıyor. Hareket ilk kaydırmayla başlıyor.
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(host);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [distance]);

  return (
    <div ref={outer} className={cx("overflow-hidden", className)}>
      <div
        ref={inner}
        className="parallax-layer absolute inset-x-0"
        style={{ top: -distance, height: `calc(100% + ${distance * 2}px)` }}
      >
        {children}
      </div>
    </div>
  );
}
