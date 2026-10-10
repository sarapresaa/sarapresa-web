import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { describe, it } from "node:test"

import { emailCopy } from "@/emails/_shared/copy"
import { routing } from "@/i18n/routing"
import { CONTACT_CATEGORIES } from "@/lib/contact/constants"

const categories = [...CONTACT_CATEGORIES].sort()

function siteLabels(locale: string): Record<string, string> {
  const messages = JSON.parse(readFileSync(`messages/${locale}.json`, "utf8"))

  return messages.contactForm.categories
}

describe("contact categories", () => {
  for (const locale of routing.locales) {
    it(`has a ${locale} label for every category and nothing extra`, () => {
      assert.deepEqual(Object.keys(siteLabels(locale)).sort(), categories)
    })
  }

  it("has an email label for every category and nothing extra", () => {
    assert.deepEqual(Object.keys(emailCopy.contact.categories).sort(), categories)
  })

  it("never leaves a label empty", () => {
    for (const locale of routing.locales) {
      for (const label of Object.values(siteLabels(locale))) {
        assert.ok(label.trim().length > 0)
      }
    }
  })
})
