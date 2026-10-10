"use client"

import { useLocale, useTranslations } from "next-intl"

import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

function LanguageToggle() {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations("nav")

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="flex items-center text-sm"
    >
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          {index > 0 ? (
            <span aria-hidden="true" className="px-0.5 text-paper-faint/50">
              /
            </span>
          ) : null}
          <Link
            href={pathname}
            locale={loc}
            hrefLang={loc}
            aria-current={locale === loc ? "true" : undefined}
            className={cn(
              "rounded-md px-1.5 py-1 font-medium transition-colors duration-300",
              locale === loc
                ? "text-paper"
                : "text-paper-faint hover:text-paper"
            )}
          >
            {loc.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  )
}

export { LanguageToggle }
