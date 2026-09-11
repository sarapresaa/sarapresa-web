"use client"

import { useLocale } from "next-intl"

import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-white/50 uppercase",
        className
      )}
    >
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-2">
          {index > 0 && (
            <span className="text-white/25" aria-hidden="true">
              |
            </span>
          )}
          <Link
            href={pathname}
            locale={loc}
            aria-current={locale === loc}
            className={cn(
              "transition-colors hover:text-white",
              locale === loc && "text-white"
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
