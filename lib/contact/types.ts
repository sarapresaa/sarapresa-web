import type { ContactField } from "@/lib/contact/constants"
import type { ContactFieldErrors, ContactMessage } from "@/lib/contact/schema"

export type ContactMailer = {
  sendMessage(message: ContactMessage): Promise<void>
}

export type ContactValues = Record<ContactField, string>

export type ContactStatus = "idle" | "sent" | "invalid" | "failed"

export type ContactState = {
  status: ContactStatus
  values: ContactValues
  errors: ContactFieldErrors
}
