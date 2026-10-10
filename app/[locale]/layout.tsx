import type { Metadata, Viewport } from "next"
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import "../globals.css"
import { routing } from "@/i18n/routing"
import { BrandSignature } from "@/components/brand-signature"
import { Aurora } from "@/components/motion/aurora"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { Spotlight } from "@/components/motion/spotlight"
import { Providers } from "@/components/providers"
import { SiteNav } from "@/components/site-nav"
import { SkipLink } from "@/components/skip-link"
import {
  HANDLE,
  HREFLANG,
  OG_LOCALES,
  SITE_NAME,
  SITE_URL,
  languageAlternates,
  localeUrl,
} from "@/lib/seo"
import { cn } from "@/lib/utils"

// One family for everything: clean, friendly and refined next to the
// handwritten signature. Geist Mono is only used for tech tags.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const viewport: Viewport = {
  themeColor: "#120e18",
  colorScheme: "dark",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: "meta" })
  const title = t("title")
  const description = t("description")
  const url = localeUrl(locale)

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${SITE_NAME}` },
    description,
    keywords: t.raw("keywords") as string[],
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    alternates: {
      canonical: url,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "profile",
      firstName: "Sara",
      lastName: "Presa",
      username: HANDLE,
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales
        .filter((other) => other !== locale)
        .map((other) => OG_LOCALES[other]),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    // Optional: set these env vars after claiming the site in Google Search
    // Console / Bing Webmaster Tools (see the README).
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : undefined,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html
      lang={HREFLANG[locale]}
      className={cn("dark antialiased", jakarta.variable, geistMono.variable)}
    >
      <body>
        <NextIntlClientProvider>
          <Providers>
            <SkipLink />
            <ScrollProgress />
            <Aurora />
            <Spotlight />
            <BrandSignature />
            <SiteNav />
            {children}
            <div aria-hidden="true" className="grain" />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
