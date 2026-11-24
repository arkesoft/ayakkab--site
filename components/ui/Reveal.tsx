"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cx } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** ms cinsinden gecikme — sıralı belirme için */
  delay?: number;
  /** "text" yumuşak yukarı kayma, "image" perde açılması */
  variant?: "text" | "image";
  as?: ElementType;
  className?: string;
};

/**
 * Kaydırmada bir kez tetiklenen yumuşak belirme.
 * IntersectionObserver + CSS geçişi: ana iş parçacığını meşgul etmez,
 * prefers-reduced-motion açıkken tamamen devre dışı kalır.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "text",
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cx(variant === "image" ? "reveal-img" : "reveal", className)}
    >
      {children}
    </Tag>
  );
}
