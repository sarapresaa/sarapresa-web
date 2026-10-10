import { parseArgs } from "node:util"

import { createElement } from "react"
import { Resend } from "resend"

import type { IssueModule } from "@/emails/_shared/issue"
import { routing } from "@/i18n/routing"
import { parseNewsletterConfig } from "@/lib/newsletter/config"
import { renderEmail } from "@/lib/newsletter/render"
import { localeSchema } from "@/lib/newsletter/schema"
import { SITE_URL, type Locale } from "@/lib/seo"

const ISSUE_PATTERN = /^[a-z0-9-]+$/
const TARGETS = ["test", "subscribers"] as const
const UNSUBSCRIBE_VARIABLE = "{{{RESEND_UNSUBSCRIBE_URL}}}"

type Target = (typeof TARGETS)[number]

type Options = {
  issue: string
  locale: Locale
  target: Target
  dryRun: boolean
}

class UsageError extends Error {}

function parseOptions(): Options {
  const { values } = parseArgs({
    options: {
      issue: { type: "string" },
      locale: { type: "string" },
      target: { type: "string", default: "test" },
      "dry-run": { type: "boolean", default: false },
    },
  })

  if (!values.issue || !ISSUE_PATTERN.test(values.issue)) {
    throw new UsageError(
      "--issue must be a folder name inside emails/issues, for example 000-template"
    )
  }

  const locale = localeSchema.safeParse(values.locale)

  if (!locale.success) {
    throw new UsageError(
      `--locale must be one of: ${routing.locales.join(", ")}`
    )
  }

  const target = TARGETS.find((candidate) => candidate === values.target)

  if (!target) {
    throw new UsageError(`--target must be one of: ${TARGETS.join(", ")}`)
  }

  return {
    issue: values.issue,
    locale: locale.data,
    target,
    dryRun: values["dry-run"],
  }
}

async function loadIssue(issue: string, locale: Locale): Promise<IssueModule> {
  const loaded: Partial<IssueModule> = await import(
    `../emails/issues/${issue}/${locale}.tsx`
  )

  if (
    typeof loaded.subject !== "string" ||
    typeof loaded.previewText !== "string" ||
    typeof loaded.default !== "function"
  ) {
    throw new UsageError(
      `emails/issues/${issue}/${locale}.tsx must export subject, previewText and a default component`
    )
  }

  return loaded as IssueModule
}

function assertPublicSiteUrl() {
  if (new URL(SITE_URL).hostname === "localhost") {
    throw new UsageError(
      "NEXT_PUBLIC_SITE_URL points to localhost. Set it to the public site URL before drafting for subscribers."
    )
  }
}

async function main() {
  const options = parseOptions()
  const issue = await loadIssue(options.issue, options.locale)
  const { html, text } = await renderEmail(
    createElement(issue.default, { siteUrl: SITE_URL })
  )

  if (options.dryRun) {
    console.log(
      JSON.stringify(
        {
          subject: issue.subject,
          previewText: issue.previewText,
          siteUrl: SITE_URL,
          htmlBytes: html.length,
          textBytes: text.length,
          hasUnsubscribeVariable: html.includes(UNSUBSCRIBE_VARIABLE),
        },
        null,
        2
      )
    )
    return
  }

  if (options.target === "subscribers") {
    assertPublicSiteUrl()
  }

  const config = parseNewsletterConfig(process.env)
  const segmentId =
    options.target === "test"
      ? config.testSegmentId
      : config.segmentByLocale[options.locale]

  if (!segmentId) {
    throw new UsageError("NEWSLETTER_SEGMENT_TEST is not set")
  }

  const resend = new Resend(config.apiKey)
  const { data, error } = await resend.broadcasts.create({
    name: `${options.issue} (${options.locale})`,
    segmentId,
    topicId: config.topicId,
    from: config.from,
    replyTo: config.replyTo,
    subject: issue.subject,
    previewText: issue.previewText,
    html,
    text,
  })

  if (error) {
    throw new Error(`Resend create broadcast failed: ${error.name}`)
  }

  console.log(
    `Draft ${data.id} created for the ${options.target} audience. Review it in Broadcasts on the Resend dashboard and send it from there.`
  )
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
