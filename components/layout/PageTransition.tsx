"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Sayfalar arası yumuşak geçiş.
 *
 * İlk yüklemede içerik hiçbir sarmalayıcıya girmeden basılıyor: AnimatePresence
 * hidrasyon sırasında ağacı yeniden kuruyor, bu da ilk boyamayı (LCP) geciktirip
 * düzen kaymasına yol açıyordu. Sarmalayıcı ancak ziyaretçi ilk kez başka bir
 * sayfaya geçtiğinde devreye giriyor — o anda içerik zaten değiştiği için
 * yeniden kurulmasının bir maliyeti yok.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const firstPath = useRef(pathname);
  const [navigated, setNavigated] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (pathname !== firstPath.current) setNavigated(true);
  }, [pathname]);

  if (!navigated || reduce) return <>{children}</>;

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
