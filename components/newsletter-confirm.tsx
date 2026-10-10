"use client"

import { useActionState } from "react"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { confirmAction } from "@/lib/newsletter/actions"
import type {
  ConfirmationInspection,
  ConfirmState,
} from "@/lib/newsletter/types"

type NewsletterConfirmProps = {
  token: string
  inspection: ConfirmationInspection
}

type View = "prompt" | "confirmed" | "expired" | "invalid" | "failed"

const initialState: ConfirmState = { status: "idle" }

function resolveView(
  inspection: ConfirmationInspection,
  state: ConfirmState
): View {
  if (
    state.status === "confirmed" ||
    state.status === "expired" ||
    state.status === "invalid"
  ) {
    return state.status
  }

  return inspection.status === "valid" ? "prompt" : inspection.status
}

function NewsletterConfirm({ token, inspection }: NewsletterConfirmProps) {
  const t = useTranslations("newsletterConfirm")
  const [state, formAction, pending] = useActionState(
    confirmAction,
    initialState
  )
  const view = resolveView(inspection, state)
  const email = inspection.status === "valid" ? inspection.email : ""

  return (
    <div className="w-full max-w-md rounded-3xl border border-hairline-strong bg-ink-raised/50 p-8 text-center">
      <p className="text-sm text-paper-dim">{t("label")}</p>
      <h1 className="mt-3 text-[clamp(1.75rem,4vw,2.25rem)]">
        {t(`${view}.title`)}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-paper-dim">
        {view === "prompt" ? t("prompt.text", { email }) : t(`${view}.text`)}
      </p>

      {view === "prompt" ? (
        <form action={formAction} className="mt-8">
          <input type="hidden" name="token" value={token} />
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center rounded-full bg-paper px-7 py-3.5 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:bg-blush disabled:cursor-wait disabled:opacity-60"
          >
            {pending ? t("prompt.pending") : t("prompt.action")}
          </button>
          {state.status === "failed" ? (
            <p role="alert" className="mt-4 text-sm text-rose">
              {t("failed.text")}
            </p>
          ) : null}
        </form>
      ) : (
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full border border-hairline-strong px-6 py-3 text-sm text-paper transition-colors duration-300 hover:border-paper/50 hover:bg-paper/5"
        >
          {t("back")}
        </Link>
      )}
    </div>
  )
}

export { NewsletterConfirm }
