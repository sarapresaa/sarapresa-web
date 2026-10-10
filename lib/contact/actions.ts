"use server"

import { getContactDeps } from "@/lib/contact/runtime"
import { submitContactMessage } from "@/lib/contact/service"
import type { ContactState } from "@/lib/contact/types"

export async function contactAction(
  _previous: ContactState,
  formData: FormData
): Promise<ContactState> {
  return submitContactMessage(Object.fromEntries(formData), getContactDeps())
}
