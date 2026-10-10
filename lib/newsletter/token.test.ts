import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  CONFIRMATION_TTL_MS,
  createConfirmationToken,
  verifyConfirmationToken,
} from "@/lib/newsletter/token"

const secret = "test-secret-with-at-least-thirty-two-chars"
const now = Date.UTC(2026, 9, 10)
const subscriber = { email: "sara@example.com", locale: "pt" } as const

describe("confirmation token", () => {
  it("round-trips the subscriber", () => {
    const token = createConfirmationToken(subscriber, secret, now)

    assert.deepEqual(verifyConfirmationToken(token, secret, now), {
      status: "valid",
      payload: subscriber,
    })
  })

  it("rejects a token signed with another secret", () => {
    const token = createConfirmationToken(subscriber, secret, now)
    const otherSecret = "another-secret-with-at-least-thirty-two-chars"

    assert.deepEqual(verifyConfirmationToken(token, otherSecret, now), {
      status: "invalid",
    })
  })

  it("rejects a payload swapped under an existing signature", () => {
    const original = createConfirmationToken(subscriber, secret, now)
    const forged = createConfirmationToken(
      { email: "victim@example.com", locale: "pt" },
      secret,
      now
    )
    const swapped = `${forged.split(".")[0]}.${original.split(".")[1]}`

    assert.deepEqual(verifyConfirmationToken(swapped, secret, now), {
      status: "invalid",
    })
  })

  it("accepts the token on the last valid millisecond", () => {
    const token = createConfirmationToken(subscriber, secret, now)

    assert.equal(
      verifyConfirmationToken(token, secret, now + CONFIRMATION_TTL_MS).status,
      "valid"
    )
  })

  it("reports expiry after the time to live", () => {
    const token = createConfirmationToken(subscriber, secret, now)

    assert.deepEqual(
      verifyConfirmationToken(token, secret, now + CONFIRMATION_TTL_MS + 1),
      { status: "expired" }
    )
  })

  it("rejects malformed tokens", () => {
    for (const token of ["", "abc", ".", "a.b.c", "a.b"]) {
      assert.deepEqual(verifyConfirmationToken(token, secret, now), {
        status: "invalid",
      })
    }
  })

  it("rejects a correctly signed payload with an unsupported locale", () => {
    const token = createConfirmationToken(
      { email: subscriber.email, locale: "xx" as never },
      secret,
      now
    )

    assert.deepEqual(verifyConfirmationToken(token, secret, now), {
      status: "invalid",
    })
  })
})
