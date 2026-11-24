import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/utils";

type Variant = "solid" | "outline" | "quiet" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap uppercase transition-colors duration-500 ease-out disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.625rem] tracking-[0.2em]",
  md: "h-11 px-6 text-[0.6875rem] tracking-[0.2em]",
  lg: "h-13 px-8 text-[0.75rem] tracking-[0.2em]",
};

const variants: Record<Variant, string> = {
  solid:
    "bg-[var(--c-accent)] text-[var(--c-on-accent)] hover:bg-[var(--c-ink)] hover:text-[var(--c-bg)]",
  outline:
    "border border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-ink)] hover:text-[var(--c-bg)]",
  quiet:
    "border border-[var(--c-line)] text-[var(--c-ink)] hover:border-[var(--c-ink)]",
  onDark:
    "border border-[var(--c-on-deep)]/45 text-[var(--c-on-deep)] hover:bg-[var(--c-on-deep)] hover:text-[var(--c-bg-deep)]",
};

export function buttonClass(variant: Variant = "solid", size: Size = "md") {
  return cx(base, sizes[size], variants[variant]);
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link {...rest} className={cx(buttonClass(variant, size), className)}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button {...rest} className={cx(buttonClass(variant, size), className)}>
      {children}
    </button>
  );
}

type ExternalProps = ComponentProps<"a"> & { variant?: Variant; size?: Size };

export function ButtonAnchor({
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: ExternalProps) {
  return (
    <a {...rest} className={cx(buttonClass(variant, size), className)}>
      {children}
    </a>
  );
}
