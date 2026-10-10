import { z } from "zod"

import { emailSchema, localeSchema } from "@/lib/email/schema"

export const subscribeFormSchema = z.object({
  email: emailSchema,
  locale: localeSchema,
  referralCode: z.string().default(""),
})
