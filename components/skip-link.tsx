"use client"

import { useTranslations } from "next-intl"

function SkipLink() {
  const t = useTranslations("a11y")

  return (
    <a
      href="#main"
      className="fixed top-4 left-4 z-[100] -translate-y-24 rounded-full bg-blush px-5 py-2.5 text-sm font-medium text-ink transition-transform focus-visible:translate-y-0"
    >
      {t("skip")}
    </a>
  )
}

export { SkipLink }
