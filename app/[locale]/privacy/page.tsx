import type { Metadata } from "next"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { EMAIL, SITE_URL, localePath, pathAlternates } from "@/lib/seo"

type PageProps = { params: Promise<{ locale: string }> }

type PolicySection = {
  title: string
  paragraphs: string[]
  items?: string[]
}

const backLinkClassName =
  "inline-flex items-center rounded-full border border-hairline-strong px-5 py-2.5 text-sm text-paper transition-colors duration-300 hover:border-paper/50 hover:bg-paper/5"

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: "privacy" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}${localePath(locale, "/privacy")}`,
      languages: pathAlternates("/privacy"),
    },
  }
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const t = await getTranslations("privacy")
  const sections = t.raw("sections") as PolicySection[]

  return (
    <main id="main" className="relative px-6 pt-36 pb-24 md:px-10 md:pt-44">
      <article className="mx-auto max-w-2xl">
        <p className="text-sm text-paper-dim">{t("label")}</p>
        <h1 className="mt-4 text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] tracking-[-0.04em]">
          {t("title")}
        </h1>
        <p className="mt-4 text-sm text-paper-faint">{t("updated")}</p>

        <div className="mt-14 flex flex-col gap-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-medium tracking-[-0.025em] text-paper md:text-2xl">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-base leading-relaxed text-paper-dim"
                >
                  {paragraph}
                </p>
              ))}
              {section.items ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-paper-dim marker:text-paper-faint">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section>
            <h2 className="text-xl font-medium tracking-[-0.025em] text-paper md:text-2xl">
              {t("contact.title")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-paper-dim">
              {t("contact.text")}
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="link-sweep mt-3 inline-block pb-0.5 text-base text-paper transition-colors duration-300 hover:text-blush"
            >
              {EMAIL}
            </a>
          </section>
        </div>

        <Link href="/" className={`${backLinkClassName} mt-14`}>
          {t("back")}
        </Link>
      </article>
    </main>
  )
}
