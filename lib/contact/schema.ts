import { z } from "zod"

import {
  CONTACT_CATEGORIES,
  CONTACT_FIELDS,
  CONTACT_LIMITS,
  type ContactField,
} from "@/lib/contact/constants"
import { emailSchema, localeSchema } from "@/lib/email/schema"

export type ContactFieldError = "required" | "invalid" | "tooShort" | "tooLong"

export type ContactFieldErrors = Partial<
  Record<ContactField, ContactFieldError>
>

function stripControlCharacters(value: string, keepLineBreaks: boolean) {
  return Array.from(value)
    .map((char) => {
      const code = char.codePointAt(0) ?? 0

      if (code === 10 && keepLineBreaks) {
        return char
      }

      if (code === 9 || code === 10) {
        return " "
      }

      return code < 32 || code === 127 ? "" : char
    })
    .join("")
}

const nameSchema = z
  .string()
  .transform((value) =>
    stripControlCharacters(value, false).replace(/\s+/g, " ").trim()
  )
  .pipe(z.string().min(1).max(CONTACT_LIMITS.name))

const messageSchema = z
  .string()
  .transform((value) => stripControlCharacters(value, true).trim())
  .pipe(z.string().min(1))
  .pipe(
    z.string().min(CONTACT_LIMITS.messageMin).max(CONTACT_LIMITS.messageMax)
  )

export const contactFormSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: z.string().trim().min(1).pipe(emailSchema),
  category: z.string().min(1).pipe(z.enum(CONTACT_CATEGORIES)),
  message: messageSchema,
  locale: localeSchema,
  referralCode: z.string().default(""),
})

export type ContactMessage = z.infer<typeof contactFormSchema>

function classify(issue: z.core.$ZodIssue): ContactFieldError {
  switch (issue.code) {
    case "invalid_type":
      return "required"
    case "too_small":
      return issue.minimum === 1 ? "required" : "tooShort"
    case "too_big":
      return "tooLong"
    default:
      return "invalid"
  }
}

export function toFieldErrors(error: z.ZodError): ContactFieldErrors {
  const errors: ContactFieldErrors = {}

  for (const issue of error.issues) {
    const field = CONTACT_FIELDS.find(
      (candidate) => candidate === issue.path[0]
    )

    if (field && !errors[field]) {
      errors[field] = classify(issue)
    }
  }

  return errors
}
