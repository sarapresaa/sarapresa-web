export const CONTACT_CATEGORIES = [
  "internship",
  "collaboration",
  "project",
  "marketing",
  "question",
  "other",
] as const

export const CONTACT_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "category",
  "message",
] as const

export const CONTACT_LIMITS = {
  name: 60,
  email: 254,
  messageMin: 10,
  messageMax: 2000,
} as const

export type ContactCategory = (typeof CONTACT_CATEGORIES)[number]
export type ContactField = (typeof CONTACT_FIELDS)[number]
