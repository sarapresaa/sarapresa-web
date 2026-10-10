import type { Metadata, Viewport } from "next"
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import "../globals.css"
import { routing } from "@/i18n/routing"
import { Aurora } from "@/components/motion/aurora"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { Spotlight } from "@/components/motion/spotlight"
import { Providers } from "@/components/providers"
import { SiteNav } from "@/components/site-nav"
import { SkipLink } from "@/components/skip-link"
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
  const t = await getTranslations({ locale, namespace: "hero" })

  const title = "Sara Presa"
  const description = t("subtitle")
  const ogLocale = locale === "pt" ? "pt_PT" : "en_US"

  return {
    metadataBase: new URL("https://sarapresaa.pt"),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        pt: "/pt",
        en: "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: title,
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sara Presa",
  url: "https://sarapresaa.pt",
  email: "info@sarapresaa.pt",
  jobTitle: "Information Technology student",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aveiro",
    addressCountry: "PT",
  },
  alumniOf: "Universidade de Aveiro",
  sameAs: [
    "https://github.com/sarapresaa",
    "https://www.linkedin.com/in/sarapresaa/",
    "https://www.instagram.com/sarapresaa",
    "https://www.tiktok.com/@sarapresaa.oficial",
    "https://www.youtube.com/@sarapresaa",
    "https://pt.pinterest.com/sarapresaa/",
  ],
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
      lang={locale}
      className={cn("dark antialiased", jakarta.variable, geistMono.variable)}
    >
      <body>
        <NextIntlClientProvider>
          <Providers>
            <SkipLink />
            <ScrollProgress />
            <Aurora />
            <Spotlight />
            <SiteNav />
            {children}
            <div aria-hidden="true" className="grain" />
          </Providers>
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  )
}
