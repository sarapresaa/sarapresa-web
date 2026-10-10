import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { confirmationUrl } from "@/lib/newsletter/links"

const baseUrl = "https://example.com"

describe("confirmation url", () => {
  it("leaves the default locale unprefixed", () => {
    const url = new URL(
      confirmationUrl({ baseUrl, locale: "pt", token: "abc.def" })
    )

    assert.equal(url.origin, baseUrl)
    assert.equal(url.pathname, "/newsletter/confirm")
  })

  it("prefixes the path for other locales", () => {
    const url = new URL(
      confirmationUrl({ baseUrl, locale: "en", token: "abc.def" })
    )

    assert.equal(url.pathname, "/en/newsletter/confirm")
  })

  it("carries the token as an encoded query parameter", () => {
    const token = "a b&c=d.e"
    const url = new URL(confirmationUrl({ baseUrl, locale: "pt", token }))

    assert.equal(url.searchParams.get("token"), token)
  })
})
