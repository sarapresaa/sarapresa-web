import { subscribeFormSchema } from "@/lib/newsletter/schema"
import {
  createConfirmationToken,
  verifyConfirmationToken,
} from "@/lib/newsletter/token"
import type {
  ConfirmationInspection,
  ConfirmStatus,
  Mailer,
  SubscribeStatus,
  SubscriberDirectory,
} from "@/lib/newsletter/types"

export const CONFIRMATION_COOLDOWN_MS = 15 * 60 * 1000

export type NewsletterDeps = {
  tokenSecret: string
  now: () => number
  reportError: (error: unknown) => void
  mailer: Mailer
  directory: SubscriberDirectory
}

export async function requestSubscription(
  input: Record<string, unknown>,
  deps: NewsletterDeps
): Promise<SubscribeStatus> {
  const form = subscribeFormSchema.safeParse(input)

  if (!form.success) {
    return "invalid"
  }

  const { email, locale, referralCode } = form.data

  if (referralCode !== "") {
    return "sent"
  }

  try {
    const now = deps.now()
    const issuedAt = now - (now % CONFIRMATION_COOLDOWN_MS)
    const token = createConfirmationToken(
      { email, locale },
      deps.tokenSecret,
      issuedAt
    )
    await deps.mailer.sendConfirmation({ email, locale, token })

    return "sent"
  } catch (error) {
    deps.reportError(error)

    return "failed"
  }
}

export function inspectConfirmation(
  token: string | undefined,
  deps: Pick<NewsletterDeps, "tokenSecret" | "now">
): ConfirmationInspection {
  if (!token) {
    return { status: "invalid" }
  }

  const verification = verifyConfirmationToken(
    token,
    deps.tokenSecret,
    deps.now()
  )

  if (verification.status === "valid") {
    return { status: "valid", email: verification.payload.email }
  }

  return { status: verification.status }
}

export async function confirmSubscription(
  token: string,
  deps: NewsletterDeps
): Promise<ConfirmStatus> {
  const verification = verifyConfirmationToken(
    token,
    deps.tokenSecret,
    deps.now()
  )

  if (verification.status !== "valid") {
    return verification.status
  }

  try {
    await deps.directory.subscribe(verification.payload)
  } catch (error) {
    deps.reportError(error)

    return "failed"
  }

  try {
    await deps.mailer.sendWelcome(verification.payload)
  } catch (error) {
    deps.reportError(error)
  }

  return "confirmed"
}
