import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  ContactConfigError,
  parseContactConfig,
} from "@/lib/contact/config"
import { EMAIL } from "@/lib/seo"

const sender = "Sara Presa <hello@news.example.com>"

describe("contact config", () => {
  it("reuses the newsletter sender and defaults to the site inbox", () => {
    assert.deepEqual(
      parseContactConfig({
        RESEND_API_KEY: "re_test_key",
        NEWSLETTER_FROM: sender,
      }),
      { apiKey: "re_test_key", from: sender, to: EMAIL }
    )
  })

  it("prefers a dedicated sender and recipient when they are set", () => {
    assert.deepEqual(
      parseContactConfig({
        RESEND_API_KEY: "re_test_key",
        NEWSLETTER_FROM: sender,
        CONTACT_FROM: "Site <site@example.com>",
        CONTACT_TO: "inbox@example.com",
      }),
      {
        apiKey: "re_test_key",
        from: "Site <site@example.com>",
        to: "inbox@example.com",
      }
    )
  })

  it("names every missing variable without echoing values", () => {
    assert.throws(
      () => parseContactConfig({}),
      (error: Error) =>
        error instanceof ContactConfigError &&
        error.message.includes("RESEND_API_KEY") &&
        error.message.includes("CONTACT_FROM")
    )
  })

  it("asks for a sender when only the key is present", () => {
    assert.throws(
      () => parseContactConfig({ RESEND_API_KEY: "re_secret_value" }),
      (error: Error) =>
        error.message.includes("CONTACT_FROM") &&
        !error.message.includes("re_secret_value")
    )
  })

  it("rejects a blank variable instead of silently ignoring it", () => {
    assert.throws(
      () =>
        parseContactConfig({
          RESEND_API_KEY: "re_test_key",
          NEWSLETTER_FROM: sender,
          CONTACT_TO: "",
        }),
      /CONTACT_TO/
    )
  })
})
