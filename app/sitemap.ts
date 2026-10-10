import type { MetadataRoute } from "next"

import { routing } from "@/i18n/routing"
import {
  PORTRAIT_PATH,
  SITE_URL,
  languageAlternates,
  localePath,
  localeUrl,
  pathAlternates,
} from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const home: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages: languageAlternates() },
    images: [`${SITE_URL}${PORTRAIT_PATH}`],
  }))

  const privacy: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${SITE_URL}${localePath(locale, "/privacy")}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.3,
    alternates: { languages: pathAlternates("/privacy") },
  }))

  return [...home, ...privacy]
}
