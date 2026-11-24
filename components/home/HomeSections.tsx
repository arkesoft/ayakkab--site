import Link from "next/link";
import { siteConfig } from "@/site.config";
import { categories } from "@/data/taxonomy";
import { categoryCovers, featuredProducts } from "@/data/products";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cx, localePath, pick } from "@/lib/utils";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { ProductCard } from "@/components/product/ProductCard";

/* --------------------------------- ortak -------------------------------- */

function SectionHead({
  kicker,
  title,
  action,
  className,
}: {
  kicker: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <Reveal>
        <p className="kicker">{kicker}</p>
        <h2 className="display-md mt-4 max-w-[20ch]">{title}</h2>
      </Reveal>
      {action && <Reveal delay={120}>{action}</Reveal>}
    </div>
  );
}

/* ------------------------------ koleksiyonlar --------------------------- */

export function Collections({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="shell py-section">
      <SectionHead
        kicker={dict.home.collectionsKicker}
        title={dict.home.collectionsTitle}
        action={
          <Link
            href={localePath(locale, "collection")}
            className="link-underline inline-flex items-center gap-2.5 text-[0.6875rem] tracking-[0.2em] uppercase"
          >
            {dict.common.viewAll}
            <ArrowRight />
          </Link>
        }
      />

      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-16 lg:grid-cols-6 lg:gap-x-6">
        {categories.map((category, index) => (
          <li
            key={category.id}
            className={cx(
              index < 3 ? "lg:col-span-2" : "lg:col-span-3",
              index === 4 && "col-span-2",
            )}
          >
            <Reveal delay={index * 80}>
              <Link
                href={`${localePath(locale, "collection")}?category=${category.id}`}
                className="group block"
              >
                <div
                  className={cx(
                    "relative aspect-4/5 overflow-hidden bg-[var(--c-bg-alt)]",
                    index >= 3 && "lg:aspect-3/2",
                    index === 4 && "max-lg:aspect-3/2",
                  )}
                >
                  <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]">
                    <Media
                      image={categoryCovers[category.id]}
                      alt={pick(category.label, locale)}
                      sizes="(min-width: 1024px) 33vw, 48vw"
                      caption={pick(category.label, locale)}
                    />
                  </div>
                </div>
                <h3 className="mt-4 font-display text-[1.375rem] leading-tight sm:text-2xl">
                  {pick(category.label, locale)}
                </h3>
                <p className="mt-1.5 max-w-[34ch] text-xs leading-relaxed text-[var(--c-ink-soft)] sm:text-sm">
                  {pick(category.blurb, locale)}
                </p>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------- öne çıkan modeller ------------------------ */

export function Featured({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-[var(--c-bg-alt)] py-section">
      <div className="shell">
        <SectionHead
          kicker={dict.home.featuredKicker}
          title={dict.home.featuredTitle}
          action={
            <Link
              href={localePath(locale, "collection")}
              className="link-underline inline-flex items-center gap-2.5 text-[0.6875rem] tracking-[0.2em] uppercase"
            >
              {dict.common.viewAll}
              <ArrowRight />
            </Link>
          }
        />

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:mt-16 lg:grid-cols-4 lg:gap-x-8">
          {featuredProducts.map((product, index) => (
            <li key={product.slug}>
              <Reveal delay={index * 70}>
                <ProductCard
                  product={product}
                  locale={locale}
                  sizes="(min-width: 1024px) 22vw, 46vw"
                />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mt-10 text-sm text-[var(--c-ink-soft)]">{dict.home.featuredNote}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- atölye -------------------------------- */

export function Story({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="shell py-section">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal variant="image" className="lg:col-span-7">
          <Parallax distance={30} className="relative aspect-4/3 w-full bg-[var(--c-bg-alt)] lg:aspect-5/4">
            <Media
              image={{ src: "/images/urun-marin.jpg" }}
              alt=""
              sizes="(min-width: 1024px) 56vw, 100vw"
            />
          </Parallax>
        </Reveal>

        <div className="lg:col-span-5">
          <Reveal>
            <p className="kicker">{dict.home.storyKicker}</p>
            <h2 className="display-md mt-4">{dict.home.storyTitle}</h2>
          </Reveal>

          {dict.home.storyBody.map((paragraph, index) => (
            <Reveal key={index} delay={100 + index * 90} className="mt-6">
              <p className="lede">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={300}>
            <ButtonLink
              href={localePath(locale, "about")}
              variant="outline"
              size="md"
              className="mt-9"
            >
              {dict.home.storyCta}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- rakamlar ------------------------------- */

export function Figures({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-[var(--c-bg-deep)] py-20 text-[var(--c-on-deep)] md:py-28">
      <div className="shell">
        <Reveal>
          <p className="text-[0.625rem] tracking-[0.26em] uppercase opacity-62">
            {dict.home.figuresKicker}
          </p>
        </Reveal>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {siteConfig.figures.map((figure, index) => (
            <Reveal
              key={figure.value + index}
              delay={index * 90}
              as="div"
              className="flex flex-col-reverse justify-end"
            >
              <dt className="mt-3 text-xs tracking-[0.12em] uppercase opacity-62">
                {figure.label[locale] ?? figure.label.tr}
              </dt>
              <dd className="font-display text-5xl leading-none md:text-6xl">
                {figure.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------ toptan çağrı ---------------------------- */

export function WholesaleBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="shell py-section">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="kicker">{dict.home.wholesaleKicker}</p>
            <h2 className="display-lg mt-4">{dict.home.wholesaleTitle}</h2>
          </Reveal>

          <Reveal delay={180}>
            <ul className="mt-10 space-y-3">
              {dict.home.wholesaleFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-baseline gap-3 text-sm text-[var(--c-ink-soft)]"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block size-1.5 shrink-0 translate-y-[-2px] rounded-full bg-[var(--c-accent)]"
                  />
                  {fact}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={120}>
            <p className="lede">{dict.home.wholesaleBody}</p>
          </Reveal>

          <ul className="mt-10 divide-y divide-[var(--c-line)] border-y border-[var(--c-line)]">
            {dict.wholesale.steps.slice(0, 3).map((step, index) => (
              <Reveal key={step.title} delay={160 + index * 80} as="li">
                <div className="flex gap-6 py-5">
                  <span className="text-xs tabular-nums text-[var(--c-accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[0.8125rem] font-medium tracking-[0.12em] uppercase">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-[var(--c-ink-soft)]">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={420}>
            <ButtonLink
              href={localePath(locale, "wholesale")}
              variant="solid"
              size="lg"
              className="mt-9"
            >
              {dict.home.wholesaleCta}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- showroom ------------------------------- */

export function Showroom({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-[var(--c-bg-alt)] py-section">
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="kicker">{dict.home.showroomKicker}</p>
            <h2 className="display-md mt-4">{dict.home.showroomTitle}</h2>
            <p className="lede mt-6">{dict.home.showroomBody}</p>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-8 text-sm leading-relaxed whitespace-pre-line text-[var(--c-ink-soft)]">
              {siteConfig.contact.address[locale] ?? siteConfig.contact.address.tr}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={localePath(locale, "contact")} variant="outline" size="md">
                {dict.home.showroomCta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal variant="image" className="lg:col-span-7">
          <Parallax distance={26} className="relative aspect-16/11 w-full bg-[var(--c-bg)]">
            <Media
              image={{ src: "/images/showroom.jpg" }}
              alt=""
              sizes="(min-width: 1024px) 56vw, 100vw"
            />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------- yorum yer tutucu -------------------------- */

export function Reviews({ dict }: { dict: Dictionary }) {
  return (
    <section className="shell py-section">
      <Reveal>
        <p className="kicker">{dict.home.reviewsKicker}</p>
        <h2 className="display-md mt-4 max-w-[22ch]">{dict.home.reviewsTitle}</h2>
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-6">
        {[0, 1, 2].map((index) => (
          <Reveal key={index} delay={index * 90} as="li">
            <div className="h-full border border-dashed border-[var(--c-line)] px-6 py-7">
              <span
                aria-hidden="true"
                className="font-display block text-3xl leading-none text-[var(--c-accent-soft)]"
              >
                &ldquo;
              </span>
              <p className="mt-3 text-sm leading-relaxed text-[var(--c-ink-soft)]">
                {dict.home.reviewsPlaceholder}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
