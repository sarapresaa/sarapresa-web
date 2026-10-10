import "server-only"

import { Resend } from "resend"

import { parseContactConfig } from "@/lib/contact/config"
import { createContactMailer } from "@/lib/contact/mailer"
import type { ContactDeps } from "@/lib/contact/service"
import { SITE_URL } from "@/lib/seo"

function reportError(error: unknown) {
  console.error("[contact]", error)
}

function createDeps(): ContactDeps {
  const config = parseContactConfig(process.env)
  const resend = new Resend(config.apiKey)

  return {
    reportError,
    mailer: createContactMailer({
      emails: resend.emails,
      from: config.from,
      to: config.to,
      siteUrl: SITE_URL,
    }),
  }
}

function failingDeps(error: unknown): ContactDeps {
  return {
    reportError,
    mailer: {
      async sendMessage() {
        throw error
      },
    },
  }
}

let cachedDeps: ContactDeps | undefined

export function getContactDeps(): ContactDeps {
  if (!cachedDeps) {
    try {
      cachedDeps = createDeps()
    } catch (error) {
      return failingDeps(error)
    }
  }

  return cachedDeps
}
