import type { MetadataRoute } from "next"

import { routing } from "@/i18n/routing"
import {
  PORTRAIT_PATH,
  SITE_URL,
  languageAlternates,
  localeUrl,
} from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routing.locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages: languageAlternates() },
    images: [`${SITE_URL}${PORTRAIT_PATH}`],
  }))
}
