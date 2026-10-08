import { setRequestLocale } from "next-intl/server"

import { About } from "@/components/about"
import { Certificates } from "@/components/certificates"
import { Community } from "@/components/community"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { LinkHub } from "@/components/link-hub"
import { Newsletter } from "@/components/newsletter"
import { Projects } from "@/components/projects"
import { Results } from "@/components/results"
import { Timeline } from "@/components/timeline"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Timeline />
      <Certificates />
      <Results />
      <Community />
      <LinkHub />
      <Newsletter />
      <Footer />
    </>
  )
}
