import Link from "next/link";
import { siteConfig } from "@/site.config";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, mailHref, telHref } from "@/lib/utils";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const nav = [
    { href: localePath(locale, "collection"), label: dict.nav.collection },
    { href: localePath(locale, "wholesale"), label: dict.nav.wholesale },
    { href: localePath(locale, "about"), label: dict.nav.about },
    { href: localePath(locale, "contact"), label: dict.nav.contact },
  ];

  return (
    <footer className="bg-[var(--c-bg-deep)] text-[var(--c-on-deep)]">
      <div className="shell py-16 pb-28 md:py-24 lg:pb-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p
              className="font-display text-3xl leading-none"
              style={{
                letterSpacing: siteConfig.brand.logoTracking,
                textIndent: siteConfig.brand.logoTracking,
              }}
            >
              {siteConfig.brand.name}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-65">
              {dict.footer.about}
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-[0.625rem] font-medium tracking-[0.24em] uppercase opacity-60">
              {dict.footer.navTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-sm opacity-85 hover:opacity-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-[0.625rem] font-medium tracking-[0.24em] uppercase opacity-60">
              {dict.footer.contactTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm opacity-85">
              <li>
                <a href={telHref()} className="link-underline">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={mailHref()} className="link-underline break-all">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-sm leading-relaxed whitespace-pre-line opacity-65">
              {siteConfig.contact.address[locale] ?? siteConfig.contact.address.tr}
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-[0.625rem] font-medium tracking-[0.24em] uppercase opacity-60">
              {dict.footer.followTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm opacity-85">
              {siteConfig.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-current/15 pt-6 text-[0.6875rem] opacity-65 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand.name}. {dict.footer.rights}
          </p>
          <p>{dict.footer.demoNote}</p>
        </div>
      </div>
    </footer>
  );
}
