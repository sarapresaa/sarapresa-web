import type { Locale } from "@/lib/seo"

export type Subscriber = { email: string; locale: Locale }

export type SubscriberDirectory = {
  subscribe(subscriber: Subscriber): Promise<void>
}

export type Mailer = {
  sendConfirmation(input: Subscriber & { token: string }): Promise<void>
  sendWelcome(subscriber: Subscriber): Promise<void>
}

export type SubscribeStatus = "sent" | "invalid" | "failed"
export type ConfirmStatus = "confirmed" | "expired" | "invalid" | "failed"

export type SubscribeState = {
  status: "idle" | SubscribeStatus
  email: string
}

export type ConfirmState = { status: "idle" | ConfirmStatus }

export type ConfirmationInspection =
  | { status: "valid"; email: string }
  | { status: "expired" | "invalid" | "failed" }
