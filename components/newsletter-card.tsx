"use client"

import { useActionState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AlertCircleIcon,
  Mail01Icon,
  SentIcon,
} from "@hugeicons/core-free-icons"
import { useLocale, useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { subscribeAction } from "@/lib/newsletter/actions"
import type { SubscribeState } from "@/lib/newsletter/types"

const initialState: SubscribeState = { status: "idle", email: "" }

function SentNotice() {
  const t = useTranslations("newsletter.sent")

  return (
    <div
      role="status"
      className="mt-5 flex items-start gap-3 rounded-2xl bg-paper/6 p-4"
    >
      <HugeiconsIcon
        icon={SentIcon}
        size={20}
        strokeWidth={1.8}
        className="mt-0.5 shrink-0 text-blush"
      />
      <div>
        <p className="font-medium text-paper">{t("title")}</p>
        <p className="mt-1 text-sm leading-relaxed text-paper-dim">
          {t("text")}
        </p>
      </div>
    </div>
  )
}

function NewsletterForm() {
  const t = useTranslations("newsletter")
  const locale = useLocale()
  const [state, formAction, pending] = useActionState(
    subscribeAction,
    initialState
  )

  if (state.status === "sent") {
    return <SentNotice />
  }

  const errorKey =
    state.status === "invalid" || state.status === "failed"
      ? state.status
      : null

  return (
    <form action={formAction} className="mt-5 flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          {t("emailLabel")}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          defaultValue={state.email}
          placeholder={t("placeholder")}
          aria-invalid={errorKey === "invalid" ? true : undefined}
          aria-describedby="newsletter-feedback"
          className="h-12 min-w-0 flex-1 rounded-full border border-hairline-strong bg-ink/60 px-5 text-base text-paper transition-colors duration-300 outline-none placeholder:text-paper-faint focus:border-blush/60 aria-invalid:border-rose"
        />
        <button
          type="submit"
          disabled={pending}
          className="h-12 rounded-full bg-paper px-6 text-sm font-medium text-ink transition-colors duration-300 hover:bg-blush disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? t("pending") : t("submit")}
        </button>
      </div>

      <input type="hidden" name="locale" value={locale} />
      <div aria-hidden="true" className="sr-only">
        <input type="text" name="referralCode" tabIndex={-1} autoComplete="off" />
      </div>

      {errorKey ? (
        <p
          id="newsletter-feedback"
          role="alert"
          className="flex items-center gap-2 text-sm text-rose"
        >
          <HugeiconsIcon icon={AlertCircleIcon} size={16} strokeWidth={1.8} />
          {t(`errors.${errorKey}`)}
        </p>
      ) : (
        <p id="newsletter-feedback" className="text-sm text-paper-faint">
          {t.rich("hint", {
            link: (chunks) => (
              <Link
                href="/privacy"
                className="text-paper-dim underline underline-offset-2 transition-colors duration-300 hover:text-paper"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      )}
    </form>
  )
}

function NewsletterCard() {
  const t = useTranslations("newsletter")

  return (
    <section
      aria-labelledby="newsletter-title"
      data-spotlight
      className="rounded-3xl border border-hairline-strong bg-ink-raised/50 p-5 md:p-6"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper/8 text-paper">
          <HugeiconsIcon icon={Mail01Icon} size={21} strokeWidth={1.6} />
        </span>
        <div>
          <h3
            id="newsletter-title"
            className="text-xl font-medium tracking-[-0.025em] text-paper md:text-2xl"
          >
            {t("title")}
          </h3>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-paper-dim">
            {t("text")}
          </p>
        </div>
      </div>

      <NewsletterForm />
    </section>
  )
}

export { NewsletterCard }
