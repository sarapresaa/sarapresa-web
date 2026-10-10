import { CONTACT_FIELDS } from "@/lib/contact/constants"
import { contactFormSchema, toFieldErrors } from "@/lib/contact/schema"
import { INITIAL_CONTACT_STATE } from "@/lib/contact/state"
import type {
  ContactMailer,
  ContactState,
  ContactValues,
} from "@/lib/contact/types"

export type ContactDeps = {
  mailer: ContactMailer
  reportError: (error: unknown) => void
}

function readValues(input: Record<string, unknown>): ContactValues {
  const values = { ...INITIAL_CONTACT_STATE.values }

  for (const field of CONTACT_FIELDS) {
    const value = input[field]

    values[field] = typeof value === "string" ? value : ""
  }

  return values
}

export async function submitContactMessage(
  input: Record<string, unknown>,
  deps: ContactDeps
): Promise<ContactState> {
  if (typeof input.referralCode === "string" && input.referralCode !== "") {
    return { ...INITIAL_CONTACT_STATE, status: "sent" }
  }

  const values = readValues(input)
  const form = contactFormSchema.safeParse(input)

  if (!form.success) {
    const errors = toFieldErrors(form.error)

    return {
      status: Object.keys(errors).length > 0 ? "invalid" : "failed",
      values,
      errors,
    }
  }

  try {
    await deps.mailer.sendMessage(form.data)
  } catch (error) {
    deps.reportError(error)

    return { status: "failed", values, errors: {} }
  }

  return { ...INITIAL_CONTACT_STATE, status: "sent" }
}
