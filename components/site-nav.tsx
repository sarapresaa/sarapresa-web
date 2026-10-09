"use client"

import { useState } from "react"
import { m, useScroll, useTransform } from "framer-motion"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 200, 500], [0, 0, 1])
  const y = useTransform(scrollY, [0, 500], [-16, 0])
  const pointerEvents = useTransform(scrollY, (value) =>
    value > 400 ? "auto" : "none"
  )
  const visibility = useTransform(opacity, (value) =>
    value > 0 ? "visible" : "hidden"
  )

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <m.header
      style={{ opacity, y, pointerEvents, visibility }}
      className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#0f0d14]/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <nav className="hidden items-center gap-x-5 lg:flex">
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

        <div className="hidden items-center gap-5 lg:flex">
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

        <div className="flex w-full items-center justify-between lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            className="-mr-2 flex size-11 items-center justify-center text-white/70 transition-colors hover:text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M6 6l12 12M18 6l-12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav-menu"
          className="flex flex-col border-t border-white/5 px-6 py-2 lg:hidden"
        >
          {navItems.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={closeMenu}
              className="py-3 text-sm tracking-wide text-white/70 uppercase transition-colors hover:text-white"
            >
              {t(`nav.${key}`)}
            </a>
          ))}
          <a
            href={`/cv-${locale}.pdf`}
            download
            onClick={closeMenu}
            className="py-3 text-sm tracking-wide text-white/70 uppercase transition-colors hover:text-white"
          >
            CV
          </a>
          <a
            href="https://github.com/sarapresaa"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="py-3 text-sm tracking-wide text-white/70 uppercase transition-colors hover:text-white"
          >
            GitHub
          </a>
        </nav>
      )}
    </m.header>
  )
}

export { SiteNav }
