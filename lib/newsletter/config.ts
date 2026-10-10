import { z } from "zod"

import { EMAIL, type Locale } from "@/lib/seo"

const requiredText = z.string().min(1)

const envSchema = z.object({
  RESEND_API_KEY: requiredText,
  NEWSLETTER_FROM: requiredText,
  NEWSLETTER_REPLY_TO: requiredText.default(EMAIL),
  NEWSLETTER_TOPIC_ID: requiredText,
  NEWSLETTER_SEGMENT_PT: requiredText,
  NEWSLETTER_SEGMENT_EN: requiredText,
  NEWSLETTER_SEGMENT_TEST: requiredText.optional(),
  NEWSLETTER_TOKEN_SECRET: z.string().min(32),
})

export type NewsletterConfig = {
  apiKey: string
  from: string
  replyTo: string
  topicId: string
  tokenSecret: string
  segmentByLocale: Record<Locale, string>
  testSegmentId: string | undefined
}

export class NewsletterConfigError extends Error {}

export function parseNewsletterConfig(
  env: Record<string, string | undefined>
): NewsletterConfig {
  const parsed = envSchema.safeParse(env)

  if (!parsed.success) {
    const names = new Set(parsed.error.issues.map((issue) => issue.path[0]))

    throw new NewsletterConfigError(
      `Invalid newsletter environment: ${[...names].join(", ")}`
    )
  }

  const values = parsed.data

  return {
    apiKey: values.RESEND_API_KEY,
    from: values.NEWSLETTER_FROM,
    replyTo: values.NEWSLETTER_REPLY_TO,
    topicId: values.NEWSLETTER_TOPIC_ID,
    tokenSecret: values.NEWSLETTER_TOKEN_SECRET,
    segmentByLocale: {
      pt: values.NEWSLETTER_SEGMENT_PT,
      en: values.NEWSLETTER_SEGMENT_EN,
    },
    testSegmentId: values.NEWSLETTER_SEGMENT_TEST,
  }
}
