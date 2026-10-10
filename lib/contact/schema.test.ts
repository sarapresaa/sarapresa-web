import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { CONTACT_LIMITS } from "@/lib/contact/constants"
import { contactFormSchema, toFieldErrors } from "@/lib/contact/schema"

const valid = {
  firstName: "Maria",
  lastName: "Silva",
  email: "maria@example.com",
  category: "internship",
  message: "Gostava de falar contigo sobre uma oportunidade.",
  locale: "pt",
}

function errorsFor(overrides: Record<string, unknown>) {
  const result = contactFormSchema.safeParse({ ...valid, ...overrides })

  assert.equal(result.success, false)

  return result.success ? {} : toFieldErrors(result.error)
}

describe("contact form schema", () => {
  it("accepts a complete message and defaults the honeypot to empty", () => {
    assert.deepEqual(contactFormSchema.parse(valid), {
      ...valid,
      referralCode: "",
    })
  })

  it("normalizes whitespace, the address and line endings", () => {
    const parsed = contactFormSchema.parse({
      ...valid,
      firstName: "  Maria  ",
      email: " Maria@Example.COM ",
      message: "  Primeira linha\r\nSegunda linha\r\n  ",
    })

    assert.equal(parsed.firstName, "Maria")
    assert.equal(parsed.email, "maria@example.com")
    assert.equal(parsed.message, "Primeira linha\nSegunda linha")
  })

  it("turns line breaks and control characters in a name into one space", () => {
    const parsed = contactFormSchema.parse({
      ...valid,
      firstName: "Maria\nJoão\u0000",
    })

    assert.equal(parsed.firstName, "Maria João")
  })

  it("keeps line breaks in the message but drops other control characters", () => {
    const parsed = contactFormSchema.parse({
      ...valid,
      message: "Olá\u0000 tudo bem?\nGostava de falar contigo.",
    })

    assert.equal(parsed.message, "Olá tudo bem?\nGostava de falar contigo.")
  })
})

describe("contact field errors", () => {
  it("flags blank fields as required", () => {
    assert.deepEqual(
      errorsFor({
        firstName: "   ",
        lastName: "",
        email: "",
        category: "",
        message: "",
      }),
      {
        firstName: "required",
        lastName: "required",
        email: "required",
        category: "required",
        message: "required",
      }
    )
  })

  it("flags missing fields as required", () => {
    const result = contactFormSchema.safeParse({ locale: "pt" })

    assert.equal(result.success, false)
    assert.deepEqual(result.success ? {} : toFieldErrors(result.error), {
      firstName: "required",
      lastName: "required",
      email: "required",
      category: "required",
      message: "required",
    })
  })

  it("flags an address that is not valid", () => {
    assert.deepEqual(errorsFor({ email: "maria@example" }), {
      email: "invalid",
    })
  })

  it("flags a category outside the list", () => {
    assert.deepEqual(errorsFor({ category: "sales" }), {
      category: "invalid",
    })
  })

  it("flags a message that is too short", () => {
    assert.deepEqual(errorsFor({ message: "Olá" }), { message: "tooShort" })
  })

  it("flags a message that is too long", () => {
    assert.deepEqual(
      errorsFor({ message: "a".repeat(CONTACT_LIMITS.messageMax + 1) }),
      { message: "tooLong" }
    )
  })

  it("flags a name that is too long", () => {
    assert.deepEqual(
      errorsFor({ lastName: "a".repeat(CONTACT_LIMITS.name + 1) }),
      { lastName: "tooLong" }
    )
  })

  it("accepts a message exactly at both limits", () => {
    const shortest = "a".repeat(CONTACT_LIMITS.messageMin)
    const longest = "a".repeat(CONTACT_LIMITS.messageMax)

    assert.equal(
      contactFormSchema.safeParse({ ...valid, message: shortest }).success,
      true
    )
    assert.equal(
      contactFormSchema.safeParse({ ...valid, message: longest }).success,
      true
    )
  })
})
