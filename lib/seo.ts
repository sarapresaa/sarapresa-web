import { routing } from "@/i18n/routing"

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sarapresaa.pt"
).replace(/\/+$/, "")

export const SITE_NAME = "Sara Presa"
export const HANDLE = "sarapresaa"
export const EMAIL = "info@sarapresaa.pt"

export const ALTERNATE_NAMES = ["Sara Presaa", "sarapresaa", "@sarapresaa"]

export const PORTRAIT_PATH = "/sara-presa.jpg"

export type Locale = (typeof routing.locales)[number]

export const OG_LOCALES: Record<Locale, string> = {
  pt: "pt_PT",
  en: "en_US",
}

export const HREFLANG: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en",
}

export function localeUrl(locale: string) {
  return locale === routing.defaultLocale
    ? `${SITE_URL}/`
    : `${SITE_URL}/${locale}`
}

export function languageAlternates() {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [HREFLANG[locale], localeUrl(locale)])
    ),
    "x-default": localeUrl(routing.defaultLocale),
  }
}
