import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { emailCopy } from "@/emails/_shared/copy"
import { createMailer } from "@/lib/newsletter/mailer"

type EmailsApi = Parameters<typeof createMailer>[0]["emails"]

const siteUrl = "https://example.com"
const email = "sara@example.com"

type SentEmail = {
  payload: Record<string, string>
  options: { idempotencyKey?: string }
}

function createFakeEmails(error: { name: string } | null = null) {
  const sent: SentEmail[] = []

  const emails = {
    async send(payload: SentEmail["payload"], options: SentEmail["options"]) {
      sent.push({ payload, options })

      return error
        ? { data: null, error, headers: null }
        : { data: { id: "email_1" }, error: null, headers: null }
    },
  } as unknown as EmailsApi

  return { emails, sent }
}

function mailerWith(error: { name: string } | null = null) {
  const fake = createFakeEmails(error)
  const mailer = createMailer({
    emails: fake.emails,
    from: "Sara Presa <hello@news.example.com>",
    replyTo: "info@example.com",
    siteUrl,
  })

  return { mailer, sent: fake.sent }
}

describe("mailer", () => {
  it("sends the Portuguese confirmation with a working link", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendConfirmation({
      email,
      locale: "pt",
      token: "abc.def",
    })

    const { payload } = sent[0]
    const link = `${siteUrl}/newsletter/confirm?token=abc.def`

    assert.equal(payload.to, email)
    assert.equal(payload.from, "Sara Presa <hello@news.example.com>")
    assert.equal(payload.replyTo, "info@example.com")
    assert.equal(payload.subject, emailCopy.confirmation.pt.subject)
    assert.match(payload.html, /lang="pt"/)
    assert.ok(payload.html.includes(link))
    assert.ok(payload.text.includes(link))
  })

  it("sends the English confirmation with a locale-prefixed link", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendConfirmation({
      email,
      locale: "en",
      token: "abc.def",
    })

    const { payload } = sent[0]

    assert.equal(payload.subject, emailCopy.confirmation.en.subject)
    assert.match(payload.html, /lang="en"/)
    assert.ok(
      payload.html.includes(`${siteUrl}/en/newsletter/confirm?token=abc.def`)
    )
  })

  it("shows the signature image from the site instead of plain text", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendConfirmation({ email, locale: "pt", token: "abc.def" })

    const { html } = sent[0].payload

    assert.ok(html.includes(`src="${siteUrl}/sara-presa-signature.png"`))
    assert.match(html, /alt="Sara Presa"/)
  })

  it("never offers an unsubscribe link in a transactional email", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendConfirmation({ email, locale: "pt", token: "abc.def" })

    assert.ok(!sent[0].payload.html.includes("RESEND_UNSUBSCRIBE_URL"))
  })

  it("derives the idempotency key from the token alone", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendConfirmation({ email, locale: "pt", token: "token-a" })
    await mailer.sendConfirmation({ email, locale: "pt", token: "token-a" })
    await mailer.sendConfirmation({ email, locale: "pt", token: "token-b" })

    const keys = sent.map(({ options }) => options.idempotencyKey)

    assert.equal(keys[0], keys[1])
    assert.notEqual(keys[0], keys[2])
    assert.ok(!keys[0]?.includes(email))
    assert.ok(!keys[0]?.includes("token-a"))
  })

  it("sends the welcome email with one key per address", async () => {
    const { mailer, sent } = mailerWith()

    await mailer.sendWelcome({ email, locale: "pt" })
    await mailer.sendWelcome({ email, locale: "pt" })
    await mailer.sendWelcome({ email: "other@example.com", locale: "pt" })

    const keys = sent.map(({ options }) => options.idempotencyKey)

    assert.equal(sent[0].payload.subject, emailCopy.welcome.pt.subject)
    assert.equal(keys[0], keys[1])
    assert.notEqual(keys[0], keys[2])
  })

  it("fails with the Resend error name when delivery is rejected", async () => {
    const { mailer } = mailerWith({ name: "validation_error" })

    await assert.rejects(
      mailer.sendConfirmation({ email, locale: "pt", token: "abc.def" }),
      (error: Error) =>
        error.message.includes("validation_error") &&
        !error.message.includes(email)
    )
  })
})
