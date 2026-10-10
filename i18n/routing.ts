import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  // Portuguese lives at "/" (a real page, not a redirect, so the bare domain
  // keeps all its ranking signals); English lives at "/en".
  localePrefix: "as-needed",
})
