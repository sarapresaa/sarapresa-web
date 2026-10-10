import type { ReactElement } from "react"
import type { Resend } from "resend"

import { ConfirmSubscriptionEmail } from "@/emails/_shared/confirm-subscription"
import { emailCopy } from "@/emails/_shared/copy"
import { WelcomeEmail } from "@/emails/_shared/welcome"
import { fingerprint } from "@/lib/email/fingerprint"
import { renderEmail } from "@/lib/email/render"
import { confirmationUrl } from "@/lib/newsletter/links"
import type { Mailer } from "@/lib/newsletter/types"

type MailerOptions = {
  emails: Pick<Resend["emails"], "send">
  from: string
  replyTo: string
  siteUrl: string
}

type Message = {
  to: string
  subject: string
  element: ReactElement
  idempotencyKey: string
}

export function createMailer({
  emails,
  from,
  replyTo,
  siteUrl,
}: MailerOptions): Mailer {
  async function deliver({ to, subject, element, idempotencyKey }: Message) {
    const { html, text } = await renderEmail(element)
    const result = await emails.send(
      { from, to, replyTo, subject, html, text },
      { idempotencyKey }
    )

    if (result.error) {
      throw new Error(`Resend send email failed: ${result.error.name}`)
    }
  }

  return {
    sendConfirmation({ email, locale, token }) {
      return deliver({
        to: email,
        subject: emailCopy.confirmation[locale].subject,
        element: (
          <ConfirmSubscriptionEmail
            locale={locale}
            confirmUrl={confirmationUrl({ baseUrl: siteUrl, locale, token })}
            siteUrl={siteUrl}
          />
        ),
        idempotencyKey: `confirmation-${fingerprint(token)}`,
      })
    },
    sendWelcome({ email, locale }) {
      return deliver({
        to: email,
        subject: emailCopy.welcome[locale].subject,
        element: <WelcomeEmail locale={locale} siteUrl={siteUrl} />,
        idempotencyKey: `welcome-${fingerprint(email)}`,
      })
    },
  }
}
