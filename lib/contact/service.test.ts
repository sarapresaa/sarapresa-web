import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { submitContactMessage, type ContactDeps } from "@/lib/contact/service"
import { INITIAL_CONTACT_STATE } from "@/lib/contact/state"
import type { ContactMessage } from "@/lib/contact/schema"

const input = {
  firstName: "  Maria ",
  lastName: "Silva",
  email: " Maria@Example.COM ",
  category: "collaboration",
  message: "Gostava de propor uma parceria.\r\nPodemos falar?",
  locale: "pt",
  referralCode: "",
}

function createDeps(overrides: Partial<ContactDeps> = {}) {
  const sent: ContactMessage[] = []
  const errors: unknown[] = []

  const deps: ContactDeps = {
    reportError: (error) => errors.push(error),
    mailer: {
      async sendMessage(message) {
        sent.push(message)
      },
    },
    ...overrides,
  }

  return { deps, sent, errors }
}

describe("submitContactMessage", () => {
  it("sends the normalized message and clears the form", async () => {
    const { deps, sent } = createDeps()

    const state = await submitContactMessage(input, deps)

    assert.deepEqual(state, { ...INITIAL_CONTACT_STATE, status: "sent" })
    assert.equal(sent.length, 1)
    assert.equal(sent[0].firstName, "Maria")
    assert.equal(sent[0].email, "maria@example.com")
    assert.equal(
      sent[0].message,
      "Gostava de propor uma parceria.\nPodemos falar?"
    )
  })

  it("returns field errors and keeps what was typed", async () => {
    const { deps, sent } = createDeps()

    const state = await submitContactMessage(
      { ...input, email: "maria@example", message: "Olá" },
      deps
    )

    assert.equal(state.status, "invalid")
    assert.deepEqual(state.errors, { email: "invalid", message: "tooShort" })
    assert.equal(state.values.email, "maria@example")
    assert.equal(state.values.firstName, "  Maria ")
    assert.equal(sent.length, 0)
  })

  it("pretends to succeed when the honeypot is filled", async () => {
    const { deps, sent } = createDeps()

    const state = await submitContactMessage(
      { ...input, referralCode: "spam" },
      deps
    )

    assert.equal(state.status, "sent")
    assert.equal(sent.length, 0)
  })

  it("answers a bot with success even when its other fields are invalid", async () => {
    const { deps, sent } = createDeps()

    const state = await submitContactMessage(
      { referralCode: "spam", email: "nope" },
      deps
    )

    assert.equal(state.status, "sent")
    assert.equal(sent.length, 0)
  })

  it("reports a failure and keeps the values when the email cannot be sent", async () => {
    const failure = new Error("resend down")
    const { deps, errors } = createDeps({
      mailer: {
        async sendMessage() {
          throw failure
        },
      },
    })

    const state = await submitContactMessage(input, deps)

    assert.equal(state.status, "failed")
    assert.equal(state.values.lastName, "Silva")
    assert.deepEqual(state.errors, {})
    assert.deepEqual(errors, [failure])
  })

  it("fails without sending when only the locale is wrong", async () => {
    const { deps, sent } = createDeps()

    const state = await submitContactMessage({ ...input, locale: "fr" }, deps)

    assert.equal(state.status, "failed")
    assert.equal(sent.length, 0)
  })

  it("treats values that are not text as empty", async () => {
    const { deps } = createDeps()

    const state = await submitContactMessage(
      { ...input, firstName: new Blob(["x"]), message: 42 },
      deps
    )

    assert.equal(state.status, "invalid")
    assert.equal(state.values.firstName, "")
    assert.equal(state.values.message, "")
    assert.equal(state.errors.firstName, "required")
    assert.equal(state.errors.message, "required")
  })
})
