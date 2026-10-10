import "server-only"

import { Resend } from "resend"

import { parseNewsletterConfig } from "@/lib/newsletter/config"
import { createContactDirectory } from "@/lib/newsletter/contacts"
import { createMailer } from "@/lib/newsletter/mailer"
import type { NewsletterDeps } from "@/lib/newsletter/service"
import { SITE_URL } from "@/lib/seo"

function reportError(error: unknown) {
  console.error("[newsletter]", error)
}

function createDeps(): NewsletterDeps {
  const config = parseNewsletterConfig(process.env)
  const resend = new Resend(config.apiKey)

  return {
    tokenSecret: config.tokenSecret,
    now: Date.now,
    reportError,
    mailer: createMailer({
      emails: resend.emails,
      from: config.from,
      replyTo: config.replyTo,
      siteUrl: SITE_URL,
    }),
    directory: createContactDirectory(resend.contacts, {
      topicId: config.topicId,
      segmentByLocale: config.segmentByLocale,
    }),
  }
}

let cachedDeps: NewsletterDeps | undefined

export function getNewsletterDeps(): NewsletterDeps | null {
  try {
    cachedDeps ??= createDeps()

    return cachedDeps
  } catch (error) {
    reportError(error)

    return null
  }
}
