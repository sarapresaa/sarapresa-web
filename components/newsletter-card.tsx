"use client"

import { useActionState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Loading03Icon,
  Mail01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { useLocale, useTranslations } from "next-intl"

import { FieldError, FormCard } from "@/components/form-card"
import { Link } from "@/i18n/navigation"
import { subscribeAction } from "@/lib/newsletter/actions"
import type { SubscribeState } from "@/lib/newsletter/types"

const initialState: SubscribeState = { status: "idle", email: "" }

function NewsletterCard() {
  const t = useTranslations("newsletter")
  const locale = useLocale()
  const [state, formAction, pending] = useActionState(
    subscribeAction,
    initialState
  )

  const sent = state.status === "sent"
  const errorKey =
    state.status === "invalid" || state.status === "failed"
      ? state.status
      : null
  const describedBy = errorKey
    ? "newsletter-error newsletter-hint"
    : "newsletter-hint"

  return (
    <FormCard
      titleId="newsletter-title"
      icon={sent ? Tick02Icon : Mail01Icon}
      title={sent ? t("sent.title") : t("headline")}
      focusTitle={sent}
    >
      {sent ? (
        <p className="mt-3 max-w-md text-base leading-relaxed text-ink/85">
          {t("sent.text")}
        </p>
      ) : (
        <form action={formAction} aria-busy={pending} className="mt-7">
          <label
            htmlFor="newsletter-email"
            className="mb-2.5 block text-sm font-semibold"
          >
            {t("emailLabel")}
          </label>

          <div
            data-invalid={errorKey === "invalid" ? "true" : undefined}
            className="flex flex-col gap-2 rounded-3xl bg-paper p-1.5 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-ink data-[invalid=true]:outline-2 data-[invalid=true]:outline-offset-4 data-[invalid=true]:outline-ink sm:flex-row sm:items-center sm:rounded-full"
          >
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              readOnly={pending}
              defaultValue={state.email}
              placeholder={t("placeholder")}
              aria-invalid={errorKey === "invalid" ? true : undefined}
              aria-describedby={describedBy}
              className="h-12 w-full min-w-0 bg-transparent px-5 text-base text-ink outline-none placeholder:text-ink/60 sm:flex-1"
            />
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[calc(var(--radius-3xl)-0.375rem)] bg-ink px-7 text-[0.9375rem] font-semibold text-paper transition-colors duration-300 hover:bg-ink-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper disabled:cursor-wait disabled:opacity-80 sm:rounded-full"
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
          </div>

          <input type="hidden" name="locale" value={locale} />
          <div aria-hidden="true" className="sr-only">
            <input
              type="text"
              name="referralCode"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {errorKey ? (
            <FieldError id="newsletter-error" alert className="mt-4">
              {t(`errors.${errorKey}`)}
            </FieldError>
          ) : null}

          <p
            id="newsletter-hint"
            className="mt-4 max-w-lg text-sm leading-relaxed text-ink/85"
          >
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
        </form>
      )}
    </FormCard>
  )
}

export { NewsletterCard }
