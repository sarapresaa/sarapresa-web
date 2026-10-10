import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { emailCopy } from "@/emails/_shared/copy"
import { createContactMailer } from "@/lib/contact/mailer"
import type { ContactMessage } from "@/lib/contact/schema"

type EmailsApi = Parameters<typeof createContactMailer>[0]["emails"]

type SentEmail = {
  payload: Record<string, string>
  options: { idempotencyKey?: string }
}

const message: ContactMessage = {
  firstName: "Maria",
  lastName: "Silva",
  email: "maria@example.com",
  category: "internship",
  message: "Olá Sara,\nGostava de falar contigo sobre um estágio.",
  locale: "en",
  referralCode: "",
}

function mailerWith(error: { name: string } | null = null) {
  const sent: SentEmail[] = []

  const emails = {
    async send(payload: SentEmail["payload"], options: SentEmail["options"]) {
      sent.push({ payload, options })

      return error
        ? { data: null, error, headers: null }
        : { data: { id: "email_1" }, error: null, headers: null }
    },
  } as unknown as EmailsApi

  const mailer = createContactMailer({
    emails,
    from: "Sara Presa <hello@news.example.com>",
    to: "inbox@example.com",
    siteUrl: "https://example.com",
  })

  return { mailer, sent }
}

describe("contact mailer", () => {
  it("delivers to the inbox with the visitor as reply-to", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendMessage(message)

    const { payload } = sent[0]

    assert.equal(payload.to, "inbox@example.com")
    assert.equal(payload.from, "Sara Presa <hello@news.example.com>")
    assert.equal(payload.replyTo, "maria@example.com")
  })

  it("puts the category and the name in the subject", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendMessage(message)

    const subject = sent[0].payload.subject

    assert.ok(subject.includes(emailCopy.contact.categories.internship))
    assert.ok(subject.includes("Maria Silva"))
    assert.ok(!/[\r\n]/.test(subject))
  })

  it("shows every field and the site language in the email", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendMessage(message)

    const { html, text } = sent[0].payload

    for (const part of [
      "Maria Silva",
      "maria@example.com",
      emailCopy.contact.categories.internship,
      emailCopy.contact.languages.en,
      "Gostava de falar contigo sobre um estágio.",
    ]) {
      assert.ok(html.includes(part), `html is missing ${part}`)
      assert.ok(text.includes(part), `text is missing ${part}`)
    }
  })

  it("keeps the line breaks of the message", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendMessage(message)

    assert.match(sent[0].payload.html, /Olá Sara,(<!-- -->)?<br\s*\/?>/)
  })

  it("escapes markup typed by the visitor", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendMessage({
      ...message,
      message: '<script>alert("x")</script> <a href="https://evil.example">link</a>',
    })

    const { html } = sent[0].payload

    assert.ok(!html.includes("<script>alert"))
    assert.ok(!html.includes('<a href="https://evil.example">'))
    assert.ok(html.includes("&lt;script&gt;"))
  })

  it("uses the contact footer and no unsubscribe link", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendMessage(message)

    const { html } = sent[0].payload

    assert.ok(html.includes(emailCopy.footer.pt.contact))
    assert.ok(!html.includes("RESEND_UNSUBSCRIBE_URL"))
  })

  it("derives an idempotency key from the content without leaking it", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendMessage(message)
    await mailer.sendMessage(message)
    await mailer.sendMessage({ ...message, message: "Outra mensagem diferente." })

    const keys = sent.map(({ options }) => options.idempotencyKey)

    assert.equal(keys[0], keys[1])
    assert.notEqual(keys[0], keys[2])
    assert.ok(!keys[0]?.includes("maria"))
    assert.ok(!keys[0]?.includes("estágio"))
  })

  it("fails with the Resend error name and without the visitor data", async () => {
    const { mailer } = mailerWith({ name: "validation_error" })

    await assert.rejects(
      mailer.sendMessage(message),
      (error: Error) =>
        error.message.includes("validation_error") &&
        !error.message.includes("maria@example.com") &&
        !error.message.includes("estágio")
    )
  })
})
