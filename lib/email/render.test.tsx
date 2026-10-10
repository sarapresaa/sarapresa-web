import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { EmailFrame } from "@/emails/_shared/frame"
import { renderEmail } from "@/lib/email/render"

function subscriberEmail() {
  return (
    <EmailFrame
      locale="pt"
      siteUrl="https://example.com"
      preview="Preview line"
      footer="subscribers"
    >
      Body copy
    </EmailFrame>
  )
}

describe("renderEmail", () => {
  it("keeps the Resend unsubscribe variable literal in subscriber emails", async () => {
    const { html } = await renderEmail(subscriberEmail())

    assert.ok(html.includes('href="{{{RESEND_UNSUBSCRIBE_URL}}}"'))
  })

  it("returns a plain text alternative without markup", async () => {
    const { text } = await renderEmail(subscriberEmail())

    assert.ok(text.includes("Body copy"))
    assert.ok(!text.includes("<"))
  })
})
