import { z } from "zod"

import { EMAIL } from "@/lib/seo"

const requiredText = z.string().min(1)

const envSchema = z.object({
  RESEND_API_KEY: requiredText,
  CONTACT_FROM: requiredText.optional(),
  NEWSLETTER_FROM: requiredText.optional(),
  CONTACT_TO: requiredText.default(EMAIL),
})

export type ContactConfig = {
  apiKey: string
  from: string
  to: string
}

export class ContactConfigError extends Error {}

export function parseContactConfig(
  env: Record<string, string | undefined>
): ContactConfig {
  const parsed = envSchema.safeParse(env)
  const invalid = new Set<string>(
    parsed.success ? [] : parsed.error.issues.map((issue) => String(issue.path[0]))
  )
  const from = env.CONTACT_FROM || env.NEWSLETTER_FROM

  if (!from) {
    invalid.add("CONTACT_FROM")
  }

  if (!parsed.success || !from) {
    throw new ContactConfigError(
      `Invalid contact environment: ${[...invalid].join(", ")}`
    )
  }

  return { apiKey: parsed.data.RESEND_API_KEY, from, to: parsed.data.CONTACT_TO }
}
