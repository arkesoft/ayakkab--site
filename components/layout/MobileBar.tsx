import { siteConfig } from "@/site.config";
import type { Dictionary } from "@/i18n/dictionaries";
import { telHref } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";
import { PhoneMark, WhatsAppMark } from "@/components/ui/icons";

/** Mobilde altta sabit duran WhatsApp çubuğu. */
export function MobileBar({ dict }: { dict: Dictionary }) {
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-[var(--c-line)] bg-[var(--c-bg)]/95 backdrop-blur-md lg:hidden">
      <div className="flex items-stretch gap-px px-3 py-2.5">
        <a
          href={waLink(dict.whatsapp.generic)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 flex-1 items-center justify-center gap-2.5 bg-[var(--c-accent)] text-[0.6875rem] tracking-[0.2em] text-[var(--c-on-accent)] uppercase"
        >
          <WhatsAppMark />
          {dict.common.whatsappWrite}
        </a>
        <a
          href={telHref()}
          aria-label={`${dict.common.call} ${siteConfig.contact.phoneDisplay}`}
          className="ml-2.5 grid h-11 w-12 shrink-0 place-items-center border border-[var(--c-line)] text-[var(--c-ink)]"
        >
          <PhoneMark />
        </a>
      </div>
    </div>
  );
}
