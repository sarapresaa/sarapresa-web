import type { ContactState, ContactValues } from "@/lib/contact/types"

export const EMPTY_CONTACT_VALUES: ContactValues = {
  firstName: "",
  lastName: "",
  email: "",
  category: "",
  message: "",
}

export const INITIAL_CONTACT_STATE: ContactState = {
  status: "idle",
  values: EMPTY_CONTACT_VALUES,
  errors: {},
}
