import { createHmac, timingSafeEqual } from "node:crypto"

import { z } from "zod"

import { emailSchema, localeSchema } from "@/lib/newsletter/schema"
import type { Locale } from "@/lib/seo"

export const CONFIRMATION_TTL_MS = 48 * 60 * 60 * 1000

const PURPOSE = "newsletter-confirmation"

const claimsSchema = z.object({
  purpose: z.literal(PURPOSE),
  email: emailSchema,
  locale: localeSchema,
  expiresAt: z.number(),
})

export type ConfirmationPayload = { email: string; locale: Locale }

export type TokenVerification =
  | { status: "valid"; payload: ConfirmationPayload }
  | { status: "expired" }
  | { status: "invalid" }

function sign(encodedClaims: string, secret: string) {
  return createHmac("sha256", secret).update(encodedClaims).digest("base64url")
}

function hasValidSignature(
  encodedClaims: string,
  signature: string,
  secret: string
) {
  const expected = Buffer.from(sign(encodedClaims, secret))
  const received = Buffer.from(signature)

  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  )
}

export function createConfirmationToken(
  payload: ConfirmationPayload,
  secret: string,
  now: number = Date.now()
) {
  const claims = {
    purpose: PURPOSE,
    email: payload.email,
    locale: payload.locale,
    expiresAt: now + CONFIRMATION_TTL_MS,
  }
  const encodedClaims = Buffer.from(JSON.stringify(claims)).toString(
    "base64url"
  )

  return `${encodedClaims}.${sign(encodedClaims, secret)}`
}

export function verifyConfirmationToken(
  token: string,
  secret: string,
  now: number = Date.now()
): TokenVerification {
  const parts = token.split(".")

  if (parts.length !== 2) {
    return { status: "invalid" }
  }

  const [encodedClaims, signature] = parts

  if (!hasValidSignature(encodedClaims, signature, secret)) {
    return { status: "invalid" }
  }

  let decoded: unknown

  try {
    decoded = JSON.parse(Buffer.from(encodedClaims, "base64url").toString())
  } catch {
    return { status: "invalid" }
  }

  const claims = claimsSchema.safeParse(decoded)

  if (!claims.success) {
    return { status: "invalid" }
  }

  if (now > claims.data.expiresAt) {
    return { status: "expired" }
  }

  return {
    status: "valid",
    payload: { email: claims.data.email, locale: claims.data.locale },
  }
}
