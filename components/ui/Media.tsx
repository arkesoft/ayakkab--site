import Image from "next/image";
import { siteConfig } from "@/site.config";
import type { ProductImage } from "@/data/products";
import { cx } from "@/lib/utils";

/** Her ton kendi iki rengini ve üstüne yazılacak mürekkep rengini taşır. */
function tonePalette(tone: number) {
  return {
    from: `var(--c-tone-${tone}-a)`,
    to: `var(--c-tone-${tone}-b)`,
    ink: `var(--c-tone-${tone}-ink)`,
  };
}

type PlaceholderProps = {
  tone?: 0 | 1 | 2 | 3;
  caption?: string;
  className?: string;
  compact?: boolean;
};

/** Fotoğraf gelene kadar duran, tema renklerinde sade kart. */
export function Placeholder({
  tone = 0,
  caption,
  className,
  compact = false,
}: PlaceholderProps) {
  const { from, to, ink } = tonePalette(tone);

  return (
    <div
      aria-hidden="true"
      className={cx("absolute inset-0 overflow-hidden", className)}
      style={{ background: `linear-gradient(152deg, ${from} 0%, ${to} 100%)` }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(118% 82% at 50% 12%, transparent 38%, ${ink} 165%)`,
          opacity: 0.3,
        }}
      />
      <div
        className="absolute inset-[5.5%] border"
        style={{ borderColor: ink, opacity: 0.3 }}
      />
      <span
        className={cx(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display whitespace-nowrap",
          compact ? "text-base" : "text-xl sm:text-2xl",
        )}
        style={{
          letterSpacing: "0.42em",
          color: ink,
          textIndent: "0.42em",
        }}
      >
        {siteConfig.brand.name}
      </span>
      {caption && !compact && (
        <span
          className="absolute bottom-4 left-4 text-[0.625rem] uppercase sm:bottom-5 sm:left-5"
          style={{ letterSpacing: "0.22em", color: ink }}
        >
          {caption}
        </span>
      )}
    </div>
  );
}

type MediaProps = {
  image?: ProductImage;
  alt: string;
  sizes: string;
  priority?: boolean;
  caption?: string;
  compact?: boolean;
  className?: string;
  quality?: number;
};

/**
 * Ürün/bölüm görseli. `src` varsa next/image, yoksa tema renklerinde yer
 * tutucu. Her iki durumda da üst kapsayıcının oranını doldurur — layout
 * kayması olmaz.
 */
export function Media({
  image,
  alt,
  sizes,
  priority,
  caption,
  compact,
  className,
  quality = 78,
}: MediaProps) {
  if (image?.src) {
    return (
      <Image
        src={image.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        quality={quality}
        className={cx("object-cover", className)}
      />
    );
  }

  return (
    <Placeholder
      tone={image?.tone ?? 0}
      caption={caption}
      compact={compact}
      className={className}
    />
  );
}
