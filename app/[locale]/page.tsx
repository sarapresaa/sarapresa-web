import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import { About } from "@/components/about"
import { Certificates } from "@/components/certificates"
import { Community } from "@/components/community"
import { Experience } from "@/components/experience"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { JsonLd } from "@/components/json-ld"
import { LinkHub } from "@/components/link-hub"
import { Projects } from "@/components/projects"
import { Results } from "@/components/results"
import { Timeline } from "@/components/timeline"
import { routing } from "@/i18n/routing"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <>
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Timeline />
        <Certificates />
        <Results />
        <Community />
        <LinkHub />
      </main>
      <Footer />
      <JsonLd locale={locale} />
    </>
  )
}
