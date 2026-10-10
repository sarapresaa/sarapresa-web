import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"

export default async function NotFound() {
  const t = await getTranslations("notFound")

  return (
    <main
      id="main"
      className="relative flex min-h-svh flex-col items-center justify-center px-6 text-center"
    >
      <p className="bg-gradient-to-br from-mauve via-rose to-blush bg-clip-text font-display text-[clamp(6rem,22vw,14rem)] leading-none font-semibold tracking-[-0.06em] text-transparent">
        404
      </p>
      <h1 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)]">{t("title")}</h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-paper-dim">
        {t("text")}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-paper px-7 py-3.5 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:bg-blush"
      >
        {t("cta")}
      </Link>
    </main>
  )
}
