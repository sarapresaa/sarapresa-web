import { z } from "zod"

import { routing } from "@/i18n/routing"

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email().max(254))

export const localeSchema = z.enum(routing.locales)

export const subscribeFormSchema = z.object({
  email: emailSchema,
  locale: localeSchema,
  referralCode: z.string().default(""),
})
