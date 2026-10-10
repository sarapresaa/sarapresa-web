import { routing } from "@/i18n/routing"

/**
 * Canonical origin. Override with NEXT_PUBLIC_SITE_URL (e.g. on a preview
 * deployment) so canonical links, the sitemap and structured data never point
 * at a domain that isn't serving the site yet.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sarapresaa.pt"
).replace(/\/+$/, "")

export const SITE_NAME = "Sara Presa"
export const HANDLE = "sarapresaa"
export const EMAIL = "info@sarapresaa.pt"

/** Spellings people actually type or see (the handle has a double "a"). */
export const ALTERNATE_NAMES = ["Sara Presaa", "sarapresaa", "@sarapresaa"]

/** Portrait used by image search, structured data and the social card. */
export const PORTRAIT_PATH = "/sara-presa.jpg"

export type Locale = (typeof routing.locales)[number]

export const OG_LOCALES: Record<Locale, string> = {
  pt: "pt_PT",
  en: "en_US",
}

/** BCP 47 tags for <html lang> and hreflang (Portugal-targeted Portuguese). */
export const HREFLANG: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en",
}

export function localeUrl(locale: string) {
  return locale === routing.defaultLocale
    ? `${SITE_URL}/`
    : `${SITE_URL}/${locale}`
}

/** hreflang map for one page, including the default-language fallback. */
export function languageAlternates() {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [HREFLANG[locale], localeUrl(locale)])
    ),
    "x-default": localeUrl(routing.defaultLocale),
  }
}
