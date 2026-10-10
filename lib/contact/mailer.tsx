import type { Resend } from "resend"

import { ContactMessageEmail } from "@/emails/_shared/contact-message"
import { emailCopy } from "@/emails/_shared/copy"
import type { ContactMessage } from "@/lib/contact/schema"
import type { ContactMailer } from "@/lib/contact/types"
import { fingerprint } from "@/lib/email/fingerprint"
import { renderEmail } from "@/lib/email/render"

type ContactMailerOptions = {
  emails: Pick<Resend["emails"], "send">
  from: string
  to: string
  siteUrl: string
}

export function createContactMailer({
  emails,
  from,
  to,
  siteUrl,
}: ContactMailerOptions): ContactMailer {
  return {
    async sendMessage(message: ContactMessage) {
      const { html, text } = await renderEmail(
        <ContactMessageEmail
          firstName={message.firstName}
          lastName={message.lastName}
          email={message.email}
          category={message.category}
          message={message.message}
          senderLocale={message.locale}
          siteUrl={siteUrl}
        />
      )
      const subject = [
        `${emailCopy.contact.subject}: ${emailCopy.contact.categories[message.category]}`,
        `${message.firstName} ${message.lastName}`,
      ].join(" | ")
      const content = [message.email, message.category, message.message].join(
        "\n"
      )

      const result = await emails.send(
        { from, to, replyTo: message.email, subject, html, text },
        { idempotencyKey: `contact-${fingerprint(content)}` }
      )

      if (result.error) {
        throw new Error(`Resend send email failed: ${result.error.name}`)
      }
    },
  }
}
