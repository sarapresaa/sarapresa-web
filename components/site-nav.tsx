"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useLocale, useTranslations } from "next-intl"

import { LanguageToggle } from "@/components/language-toggle"

const navItems = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "journey", href: "#journey" },
  { key: "certificates", href: "#certificates" },
  { key: "community", href: "#community" },
  { key: "contact", href: "#contact" },
] as const

function SiteNav() {
  const t = useTranslations("footer")
  const locale = useLocale()
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 200, 500], [0, 0, 1])
  const y = useTransform(scrollY, [0, 500], [-16, 0])
  const pointerEvents = useTransform(scrollY, (value) =>
    value > 400 ? "auto" : "none"
  )

  return (
    <motion.header
      style={{ opacity, y, pointerEvents }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#0f0d14]/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-4 md:justify-between md:px-10">
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          {navItems.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-xs tracking-wide text-white/60 uppercase transition-colors hover:text-white"
            >
              {t(`nav.${key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={`/cv-${locale}.pdf`}
            download
            className="text-xs tracking-wide text-white/60 uppercase transition-colors hover:text-white"
          >
            CV
          </a>
          <a
            href="https://github.com/sarapresaa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-wide text-white/60 uppercase transition-colors hover:text-white"
          >
            GitHub
          </a>
          <LanguageToggle />
        </div>
      </div>
    </motion.header>
  )
}

export { SiteNav }
