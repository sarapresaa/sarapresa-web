import type { Metadata } from "next"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import { NewsletterConfirm } from "@/components/newsletter-confirm"
import { routing } from "@/i18n/routing"
import { getNewsletterDeps } from "@/lib/newsletter/runtime"
import { inspectConfirmation } from "@/lib/newsletter/service"
import type { ConfirmationInspection } from "@/lib/newsletter/types"

type PageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ token?: string | string[] }>
}

export async function generateMetadata({
  params,
}: Pick<PageProps, "params">): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: "newsletterConfirm" })

  return {
    title: t("title"),
    robots: { index: false, follow: false },
    referrer: "no-referrer",
  }
}

export default async function NewsletterConfirmPage({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const { token } = await searchParams
  const rawToken = Array.isArray(token) ? token[0] : token
  const deps = getNewsletterDeps()
  const inspection: ConfirmationInspection = deps
    ? inspectConfirmation(rawToken, deps)
    : { status: "failed" }

  return (
    <main
      id="main"
      className="relative flex min-h-svh flex-col items-center justify-center px-6 py-32"
    >
      <NewsletterConfirm token={rawToken ?? ""} inspection={inspection} />
    </main>
  )
}
