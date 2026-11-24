"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ProductImage } from "@/data/products";
import { cx } from "@/lib/utils";
import { Media } from "@/components/ui/Media";

type GalleryProps = {
  images: ProductImage[];
  alt: string;
  code: string;
  labels: { previous: string; next: string; gallery: string };
};

export function Gallery({ images, alt, code, labels }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const total = images.length;
  const go = (next: number) => setIndex((next + total) % total);

  return (
    <div>
      <div className="relative aspect-4/5 overflow-hidden bg-[var(--c-bg-alt)]">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Media
              image={images[index]}
              alt={index === 0 ? alt : ""}
              caption={code}
              priority={index === 0}
              quality={74}
              sizes="(min-width: 1024px) 52vw, 100vw"
            />
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={labels.previous}
              className="pointer-events-auto grid size-10 place-items-center rounded-full bg-[var(--c-bg)]/85 text-[var(--c-ink)] backdrop-blur-sm transition-opacity hover:bg-[var(--c-bg)]"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M15 8H2M7 3L2 8l5 5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={labels.next}
              className="pointer-events-auto grid size-10 place-items-center rounded-full bg-[var(--c-bg)]/85 text-[var(--c-ink)] backdrop-blur-sm transition-opacity hover:bg-[var(--c-bg)]"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {total > 1 && (
        <ul className="mt-3 flex gap-3" aria-label={labels.gallery}>
          {images.map((image, i) => (
            <li key={i} className="w-20 sm:w-24">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                className={cx(
                  "relative block aspect-4/5 w-full overflow-hidden bg-[var(--c-bg-alt)] transition-opacity duration-300",
                  i === index ? "opacity-100" : "opacity-45 hover:opacity-80",
                )}
              >
                <Media image={image} alt="" sizes="96px" compact />
                <span className="sr-only">{i + 1}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
