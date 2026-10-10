import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { fingerprint } from "@/lib/email/fingerprint"

describe("fingerprint", () => {
  it("is stable for the same input", () => {
    assert.equal(
      fingerprint("sara@example.com"),
      fingerprint("sara@example.com")
    )
  })

  it("differs when the input differs", () => {
    assert.notEqual(
      fingerprint("sara@example.com"),
      fingerprint("sara@example.org")
    )
  })

  it("is 32 lowercase hex characters", () => {
    assert.match(fingerprint("anything"), /^[0-9a-f]{32}$/)
  })

  it("does not leak the input", () => {
    assert.ok(!fingerprint("sara@example.com").includes("sara"))
  })
})
