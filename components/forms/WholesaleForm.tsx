"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { categories } from "@/data/taxonomy";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cx, pick } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { WhatsAppMark } from "@/components/ui/icons";

type Field = "company" | "person" | "phone" | "email" | "location" | "quantity" | "message";

const EMPTY: Record<Field, string> = {
  company: "",
  person: "",
  phone: "",
  email: "",
  location: "",
  quantity: "",
  message: "",
};

export function WholesaleForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Pick<Dictionary, "wholesale" | "whatsapp" | "common">;
}) {
  const t = dict.wholesale.form;
  const [values, setValues] = useState(EMPTY);
  const [interest, setInterest] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const reduce = useReducedMotion();

  const update = (field: Field, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    if (!values.company.trim()) next.company = t.required;
    if (!values.person.trim()) next.person = t.required;
    if (!values.phone.trim()) next.phone = t.required;
    else if (values.phone.replace(/\D/g, "").length < 10) next.phone = t.invalidPhone;
    if (!values.email.trim()) next.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = t.invalidEmail;
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`field-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus("sending");
    // Demo: backend yok. Gerçek sitede burada e-posta/CRM'e POST edilir.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("done");
  };

  if (status === "done") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border border-[var(--c-line)] bg-[var(--c-bg)] px-7 py-12 text-center sm:px-12"
        role="status"
      >
        <span aria-hidden="true" className="mx-auto block h-px w-10 bg-[var(--c-accent)]" />
        <h3 className="display-md mt-6">{t.successTitle}</h3>
        <p className="mx-auto mt-4 max-w-[46ch] text-sm leading-relaxed text-[var(--c-ink-soft)]">
          {t.successBody}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setValues(EMPTY);
              setInterest([]);
              setStatus("idle");
            }}
          >
            {t.successReset}
          </Button>
          <ButtonAnchor
            href={waLink(dict.whatsapp.generic)}
            target="_blank"
            rel="noopener noreferrer"
            variant="solid"
            size="md"
          >
            <WhatsAppMark />
            {dict.common.whatsappWrite}
          </ButtonAnchor>
        </div>
      </motion.div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={onSubmit} noValidate className="border border-[var(--c-line)] bg-[var(--c-bg)] p-6 sm:p-10">
      {hasErrors && (
        <p role="alert" className="mb-6 border-l-2 border-[var(--c-accent)] pl-4 text-sm text-[var(--c-accent)]">
          {t.errorSummary}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="company" label={t.company} placeholder={t.companyPh} value={values.company} error={errors.company} onChange={update} required />
        <TextField id="person" label={t.person} placeholder={t.personPh} value={values.person} error={errors.person} onChange={update} required />
        <TextField id="phone" type="tel" label={t.phone} placeholder={t.phonePh} value={values.phone} error={errors.phone} onChange={update} required />
        <TextField id="email" type="email" label={t.email} placeholder={t.emailPh} value={values.email} error={errors.email} onChange={update} required />
        <TextField id="location" label={t.location} placeholder={t.locationPh} value={values.location} error={errors.location} onChange={update} />
        <TextField id="quantity" label={t.quantity} placeholder={t.quantityPh} value={values.quantity} error={errors.quantity} onChange={update} />
      </div>

      <fieldset className="mt-8">
        <legend className="kicker">{t.interest}</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = interest.includes(category.id);
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setInterest((current) =>
                    active
                      ? current.filter((id) => id !== category.id)
                      : [...current, category.id],
                  )
                }
                className={cx(
                  "border px-4 py-2 text-xs transition-colors duration-300",
                  active
                    ? "border-[var(--c-ink)] bg-[var(--c-ink)] text-[var(--c-bg)]"
                    : "border-[var(--c-line)] text-[var(--c-ink-soft)] hover:border-[var(--c-ink-soft)]",
                )}
              >
                {pick(category.label, locale)}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8">
        <label htmlFor="field-message" className="kicker">
          {t.message}
        </label>
        <textarea
          id="field-message"
          rows={4}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder={t.messagePh}
          className="mt-3 w-full resize-y border border-[var(--c-line)] bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--c-ink-soft)]/60 focus:border-[var(--c-ink)]"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="solid" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Spinner />
              {t.submitting}
            </>
          ) : (
            t.submit
          )}
        </Button>
        <a
          href={waLink(dict.whatsapp.generic)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-xs text-[var(--c-ink-soft)]"
        >
          {t.orWhatsapp}
        </a>
      </div>
    </form>
  );
}

function TextField({
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
  type = "text",
  required,
}: {
  id: Field;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (field: Field, value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="kicker">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={`field-${id}`}
        type={type}
        value={value}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `error-${id}` : undefined}
        placeholder={placeholder}
        onChange={(event) => onChange(id, event.target.value)}
        className={cx(
          "mt-3 h-11 w-full border bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-[var(--c-ink-soft)]/60",
          error
            ? "border-[var(--c-accent)]"
            : "border-[var(--c-line)] focus:border-[var(--c-ink)]",
        )}
      />
      {error && (
        <p id={`error-${id}`} className="mt-2 text-xs text-[var(--c-accent)]">
          {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-3.5 animate-spin rounded-full border border-current border-t-transparent"
    />
  );
}
