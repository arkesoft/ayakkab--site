import { cx } from "@/lib/utils";

/** Alt sayfaların ortak başlık bloğu. */
export function PageHeader({
  kicker,
  title,
  intro,
  className,
  children,
}: {
  kicker: string;
  title: string;
  intro?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={cx("shell pt-28 pb-12 md:pt-40 md:pb-16", className)}>
      {/* Sayfa başlığı bilerek animasyonsuz: ilk boyamayı (LCP) geciktirmesin. */}
      <p className="kicker">{kicker}</p>
      <h1 className="display-lg mt-5 max-w-[18ch]">{title}</h1>
      {intro && <p className="lede mt-7 max-w-[60ch]">{intro}</p>}
      {children}
    </header>
  );
}
