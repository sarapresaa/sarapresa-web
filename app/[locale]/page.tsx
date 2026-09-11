import { setRequestLocale } from "next-intl/server"

import { About } from "@/components/about"
import { Certificates } from "@/components/certificates"
import { Hero } from "@/components/hero"
import { LinkHub } from "@/components/link-hub"
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
      <Timeline />
      <Certificates />
      <LinkHub />
    </>
  )
}
