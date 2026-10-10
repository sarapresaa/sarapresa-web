"use server"

import { getNewsletterDeps } from "@/lib/newsletter/runtime"
import {
  confirmSubscription,
  requestSubscription,
} from "@/lib/newsletter/service"
import type { ConfirmState, SubscribeState } from "@/lib/newsletter/types"

export async function subscribeAction(
  _previous: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "")
  const deps = getNewsletterDeps()

  if (!deps) {
    return { status: "failed", email }
  }

  const status = await requestSubscription(Object.fromEntries(formData), deps)

  return { status, email }
}

export async function confirmAction(
  _previous: ConfirmState,
  formData: FormData
): Promise<ConfirmState> {
  const token = formData.get("token")
  const deps = getNewsletterDeps()

  if (typeof token !== "string") {
    return { status: "invalid" }
  }

  if (!deps) {
    return { status: "failed" }
  }

  return { status: await confirmSubscription(token, deps) }
}
