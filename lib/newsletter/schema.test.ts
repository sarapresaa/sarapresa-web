import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { subscribeFormSchema } from "@/lib/newsletter/schema"

describe("subscribe form schema", () => {
  it("accepts a supported locale and defaults the honeypot to empty", () => {
    assert.deepEqual(
      subscribeFormSchema.parse({ email: "sara@example.com", locale: "en" }),
      { email: "sara@example.com", locale: "en", referralCode: "" }
    )
  })

  it("normalizes the address", () => {
    assert.equal(
      subscribeFormSchema.parse({ email: " Sara@Example.COM ", locale: "pt" })
        .email,
      "sara@example.com"
    )
  })

  it("rejects an unsupported locale", () => {
    const result = subscribeFormSchema.safeParse({
      email: "sara@example.com",
      locale: "fr",
    })

    assert.equal(result.success, false)
  })
})
