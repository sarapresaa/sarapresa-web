import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { emailSchema, localeSchema } from "@/lib/email/schema"

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

describe("locale schema", () => {
  it("accepts the supported locales", () => {
    assert.equal(localeSchema.parse("pt"), "pt")
    assert.equal(localeSchema.parse("en"), "en")
  })

  it("rejects an unsupported locale", () => {
    assert.equal(localeSchema.safeParse("fr").success, false)
  })
})
