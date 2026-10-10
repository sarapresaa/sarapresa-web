import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { emailSchema, subscribeFormSchema } from "@/lib/newsletter/schema"

describe("email schema", () => {
  it("trims and lowercases the address", () => {
    assert.equal(emailSchema.parse("  Sara@Example.COM "), "sara@example.com")
  })

  it("rejects text that is not an address", () => {
    assert.equal(emailSchema.safeParse("not-an-email").success, false)
  })

  it("rejects addresses longer than 254 characters", () => {
    const address = `${"a".repeat(250)}@example.com`

    assert.equal(emailSchema.safeParse(address).success, false)
  })
})

describe("subscribe form schema", () => {
  it("accepts a supported locale and defaults the honeypot to empty", () => {
    assert.deepEqual(
      subscribeFormSchema.parse({ email: "sara@example.com", locale: "en" }),
      { email: "sara@example.com", locale: "en", referralCode: "" }
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
