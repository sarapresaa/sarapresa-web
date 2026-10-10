"use client"

import { useActionState, useEffect, useRef, type ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Loading03Icon,
  Message01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { useLocale, useTranslations } from "next-intl"

import { controlClassName, FieldError, FormCard } from "@/components/form-card"
import { SelectField } from "@/components/select-field"
import { Link } from "@/i18n/navigation"
import { contactAction } from "@/lib/contact/actions"
import {
  CONTACT_CATEGORIES,
  CONTACT_LIMITS,
  type ContactField,
} from "@/lib/contact/constants"
import type { ContactFieldError } from "@/lib/contact/schema"
import { INITIAL_CONTACT_STATE } from "@/lib/contact/state"
import { EMAIL } from "@/lib/seo"

function fieldId(field: ContactField) {
  return `contact-${field}`
}

function errorKey(field: ContactField, code: ContactFieldError) {
  if (field === "category") {
    return "category"
  }

  return field === "email" && code === "invalid" ? "email" : code
}

type FieldProps = {
  field: ContactField
  label: string
  error?: string
  wide?: boolean
  children: ReactNode
}

function Field({ field, label, error, wide = false, children }: FieldProps) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label
        id={`${fieldId(field)}-label`}
        htmlFor={fieldId(field)}
        className="mb-2 block text-sm font-semibold"
      >
        {label}
      </label>
      {children}
      {error ? (
        <FieldError id={`${fieldId(field)}-error`} className="mt-2">
          {error}
        </FieldError>
      ) : null}
    </div>
  )
}

function ContactForm() {
  const t = useTranslations("contactForm")
  const locale = useLocale()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, pending] = useActionState(
    contactAction,
    INITIAL_CONTACT_STATE
  )

  useEffect(() => {
    if (state.status === "invalid") {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus()
    }
  }, [state])

  if (state.status === "sent") {
    return (
      <FormCard
        titleId="contact-title"
        icon={Tick02Icon}
        title={t("sent.title")}
        focusTitle
      >
        <p className="mt-3 max-w-md text-base leading-relaxed text-ink/85">
          {t("sent.text")}
        </p>
      </FormCard>
    )
  }

  function messageFor(field: ContactField) {
    const code = state.errors[field]

    if (!code) {
      return undefined
    }

    return t(`errors.${errorKey(field, code)}`, {
      min: CONTACT_LIMITS.messageMin,
      max:
        field === "message" ? CONTACT_LIMITS.messageMax : CONTACT_LIMITS.name,
    })
  }

  function controlProps(field: ContactField) {
    const invalid = Boolean(state.errors[field])

    return {
      id: fieldId(field),
      name: field,
      defaultValue: state.values[field],
      required: true,
      "aria-invalid": invalid ? true : undefined,
      "aria-describedby": invalid ? `${fieldId(field)}-error` : undefined,
    }
  }

  return (
    <FormCard
      titleId="contact-title"
      icon={Message01Icon}
      title={t("headline")}
    >
      <form
        ref={formRef}
        action={formAction}
        aria-busy={pending}
        noValidate
        className="mt-7 grid gap-5 sm:grid-cols-2"
      >
        <Field
          field="firstName"
          label={t("firstName")}
          error={messageFor("firstName")}
        >
          <input
            {...controlProps("firstName")}
            type="text"
            autoComplete="given-name"
            autoCapitalize="words"
            maxLength={CONTACT_LIMITS.name}
            className={`${controlClassName} h-12 text-ink`}
          />
        </Field>

        <Field
          field="lastName"
          label={t("lastName")}
          error={messageFor("lastName")}
        >
          <input
            {...controlProps("lastName")}
            type="text"
            autoComplete="family-name"
            autoCapitalize="words"
            maxLength={CONTACT_LIMITS.name}
            className={`${controlClassName} h-12 text-ink`}
          />
        </Field>

        <Field
          field="email"
          label={t("email")}
          error={messageFor("email")}
          wide
        >
          <input
            {...controlProps("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={CONTACT_LIMITS.email}
            placeholder={t("emailPlaceholder")}
            className={`${controlClassName} h-12 text-ink`}
          />
        </Field>

        <Field
          field="category"
          label={t("category")}
          error={messageFor("category")}
          wide
        >
          <SelectField
            id={fieldId("category")}
            name="category"
            labelId={`${fieldId("category")}-label`}
            options={CONTACT_CATEGORIES.map((category) => ({
              value: category,
              label: t(`categories.${category}`),
            }))}
            placeholder={t("categoryPlaceholder")}
            defaultValue={state.values.category}
            invalid={Boolean(state.errors.category)}
            describedBy={
              state.errors.category ? `${fieldId("category")}-error` : undefined
            }
          />
        </Field>

        <Field
          field="message"
          label={t("message")}
          error={messageFor("message")}
          wide
        >
          <textarea
            {...controlProps("message")}
            rows={5}
            maxLength={CONTACT_LIMITS.messageMax}
            className={`${controlClassName} min-h-36 resize-y py-3.5 leading-relaxed text-ink`}
          />
        </Field>

        <input type="hidden" name="locale" value={locale} />
        <div aria-hidden="true" className="sr-only">
          <input
            type="text"
            name="referralCode"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="sm:col-span-2">
          {state.status === "failed" ? (
            <FieldError id="contact-error" alert className="mb-4">
              {t("errors.failed", { email: EMAIL })}
            </FieldError>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-8 text-[0.9375rem] font-semibold text-paper transition-colors duration-300 hover:bg-ink-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-80 sm:w-auto"
          >
            {pending ? (
              <HugeiconsIcon
                icon={Loading03Icon}
                size={18}
                strokeWidth={2}
                className="animate-spin motion-reduce:animate-none"
              />
            ) : null}
            {pending ? t("pending") : t("submit")}
          </button>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/85">
            {t.rich("hint", {
              link: (chunks) => (
                <Link
                  href="/privacy"
                  className="font-semibold underline underline-offset-2 transition-colors duration-300 hover:text-ink-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </form>
    </FormCard>
  )
}

export { ContactForm }
