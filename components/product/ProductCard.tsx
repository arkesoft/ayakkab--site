import Link from "next/link";
import type { Product } from "@/data/products";
import { categoryMap, colorMap } from "@/data/taxonomy";
import type { Locale } from "@/i18n/config";
import { cx, localePath, pick } from "@/lib/utils";
import { Media } from "@/components/ui/Media";

type ProductCardProps = {
  product: Product;
  locale: Locale;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function ProductCard({
  product,
  locale,
  priority,
  sizes = "(min-width: 1024px) 30vw, 48vw",
  className,
}: ProductCardProps) {
  const [primary, secondary] = product.images;
  const name = pick(product.name, locale);
  const category = categoryMap[product.category];

  return (
    <Link
      href={localePath(locale, `collection/${product.slug}`)}
      className={cx("group block", className)}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-[var(--c-bg-alt)]">
        <div className="absolute inset-0 transition-[opacity,transform] duration-[1100ms] ease-out group-hover:scale-[1.04] group-hover:opacity-0 group-focus-visible:opacity-0">
          <Media
            image={primary}
            alt={name}
            sizes={sizes}
            priority={priority}
            caption={product.code}
          />
        </div>
        {secondary && (
          <div className="absolute inset-0 scale-[1.04] opacity-0 transition-[opacity,transform] duration-[1100ms] ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100">
            <Media image={secondary} alt="" sizes={sizes} caption={product.code} />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.625rem] tracking-[0.22em] text-[var(--c-ink-soft)] uppercase">
            {product.code}
          </p>
          <h3 className="mt-1.5 truncate font-display text-xl leading-tight font-normal sm:text-[1.375rem]">
            {name}
          </h3>
          <p className="mt-1 text-xs text-[var(--c-ink-soft)]">
            {category ? pick(category.label, locale) : ""} · {product.sizeRange}
          </p>
        </div>

        <ul className="mt-1 flex shrink-0 gap-1.5" aria-hidden="true">
          {product.colors.slice(0, 4).map((id) => (
            <li
              key={id}
              className="size-2.5 rounded-full ring-1 ring-[var(--c-line)]"
              style={{ backgroundColor: colorMap[id]?.hex }}
            />
          ))}
        </ul>
      </div>
    </Link>
  );
}
