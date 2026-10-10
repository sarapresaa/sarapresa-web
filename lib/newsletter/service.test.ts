import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  CONFIRMATION_COOLDOWN_MS,
  confirmSubscription,
  inspectConfirmation,
  requestSubscription,
  type NewsletterDeps,
} from "@/lib/newsletter/service"
import {
  CONFIRMATION_TTL_MS,
  createConfirmationToken,
  verifyConfirmationToken,
} from "@/lib/newsletter/token"
import type { Subscriber } from "@/lib/newsletter/types"

const tokenSecret = "test-secret-with-at-least-thirty-two-chars"
const now = Date.UTC(2026, 9, 10)
const subscriber: Subscriber = { email: "sara@example.com", locale: "pt" }

function createDeps(overrides: Partial<NewsletterDeps> = {}) {
  const confirmations: (Subscriber & { token: string })[] = []
  const welcomes: Subscriber[] = []
  const subscribed: Subscriber[] = []
  const errors: unknown[] = []

  const deps: NewsletterDeps = {
    tokenSecret,
    now: () => now,
    reportError: (error) => errors.push(error),
    mailer: {
      async sendConfirmation(input) {
        confirmations.push(input)
      },
      async sendWelcome(input) {
        welcomes.push(input)
      },
    },
    directory: {
      async subscribe(input) {
        subscribed.push(input)
      },
    },
    ...overrides,
  }

  return { deps, confirmations, welcomes, subscribed, errors }
}

const tokenFor = (issuedAt = now) =>
  createConfirmationToken(subscriber, tokenSecret, issuedAt)

describe("requestSubscription", () => {
  it("emails a confirmation link for the normalized address", async () => {
    const { deps, confirmations } = createDeps()

    const status = await requestSubscription(
      { email: "  Sara@Example.COM ", locale: "pt", referralCode: "" },
      deps
    )

    assert.equal(status, "sent")
    assert.equal(confirmations.length, 1)
    assert.deepEqual(
      verifyConfirmationToken(confirmations[0].token, tokenSecret, now),
      { status: "valid", payload: subscriber }
    )
  })

  it("issues the same token to repeated requests inside the cooldown", async () => {
    let clock = now
    const { deps, confirmations } = createDeps({ now: () => clock })
    const request = { ...subscriber }

    await requestSubscription(request, deps)
    clock += CONFIRMATION_COOLDOWN_MS - 1_000
    await requestSubscription(request, deps)

    assert.equal(confirmations.length, 2)
    assert.equal(confirmations[0].token, confirmations[1].token)
  })

  it("issues a fresh token once the cooldown has passed", async () => {
    let clock = now
    const { deps, confirmations } = createDeps({ now: () => clock })
    const request = { ...subscriber }

    await requestSubscription(request, deps)
    clock += CONFIRMATION_COOLDOWN_MS
    await requestSubscription(request, deps)

    assert.notEqual(confirmations[0].token, confirmations[1].token)
  })

  it("rejects an invalid address without sending anything", async () => {
    const { deps, confirmations } = createDeps()

    const status = await requestSubscription(
      { email: "nope", locale: "pt", referralCode: "" },
      deps
    )

    assert.equal(status, "invalid")
    assert.equal(confirmations.length, 0)
  })

  it("pretends to succeed when the honeypot is filled", async () => {
    const { deps, confirmations } = createDeps()

    const status = await requestSubscription(
      { ...subscriber, referralCode: "https://spam.example" },
      deps
    )

    assert.equal(status, "sent")
    assert.equal(confirmations.length, 0)
  })

  it("reports a failure when the email cannot be sent", async () => {
    const failure = new Error("resend down")
    const { deps, errors } = createDeps({
      mailer: {
        async sendConfirmation() {
          throw failure
        },
        async sendWelcome() {},
      },
    })

    const status = await requestSubscription({ ...subscriber }, deps)

    assert.equal(status, "failed")
    assert.deepEqual(errors, [failure])
  })
})

describe("inspectConfirmation", () => {
  it("exposes the address of a valid token", () => {
    const { deps } = createDeps()

    assert.deepEqual(inspectConfirmation(tokenFor(), deps), {
      status: "valid",
      email: subscriber.email,
    })
  })

  it("treats a missing token as invalid", () => {
    const { deps } = createDeps()

    assert.deepEqual(inspectConfirmation(undefined, deps), {
      status: "invalid",
    })
  })

  it("reports an expired token", () => {
    const { deps } = createDeps({ now: () => now + CONFIRMATION_TTL_MS + 1 })

    assert.deepEqual(inspectConfirmation(tokenFor(), deps), {
      status: "expired",
    })
  })
})

describe("confirmSubscription", () => {
  it("subscribes the contact and sends the welcome email", async () => {
    const { deps, subscribed, welcomes } = createDeps()

    const status = await confirmSubscription(tokenFor(), deps)

    assert.equal(status, "confirmed")
    assert.deepEqual(subscribed, [subscriber])
    assert.deepEqual(welcomes, [subscriber])
  })

  it("does not touch Resend for an expired token", async () => {
    const { deps, subscribed } = createDeps({
      now: () => now + CONFIRMATION_TTL_MS + 1,
    })

    assert.equal(await confirmSubscription(tokenFor(), deps), "expired")
    assert.equal(subscribed.length, 0)
  })

  it("does not touch Resend for a forged token", async () => {
    const { deps, subscribed } = createDeps()

    assert.equal(await confirmSubscription("forged.token", deps), "invalid")
    assert.equal(subscribed.length, 0)
  })

  it("fails without a welcome email when the contact cannot be saved", async () => {
    const { deps, welcomes, errors } = createDeps({
      directory: {
        async subscribe() {
          throw new Error("resend down")
        },
      },
    })

    assert.equal(await confirmSubscription(tokenFor(), deps), "failed")
    assert.equal(welcomes.length, 0)
    assert.equal(errors.length, 1)
  })

  it("still confirms when only the welcome email fails", async () => {
    const { deps, errors } = createDeps({
      mailer: {
        async sendConfirmation() {},
        async sendWelcome() {
          throw new Error("resend down")
        },
      },
    })

    assert.equal(await confirmSubscription(tokenFor(), deps), "confirmed")
    assert.equal(errors.length, 1)
  })
})
