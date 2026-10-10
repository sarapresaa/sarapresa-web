"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUpRight01Icon,
  Cancel01Icon,
  Download01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons"
import { AnimatePresence, animate, m, useMotionValue } from "framer-motion"
import { useLenis } from "lenis/react"
import { useLocale, useTranslations } from "next-intl"

import { LanguageToggle } from "@/components/language-toggle"
import { cn } from "@/lib/utils"

const navItems = [
  { key: "projects", href: "#projects" },
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "community", href: "#community" },
  { key: "contact", href: "#contact" },
] as const

type NavKey = (typeof navItems)[number]["key"]

// Sections without their own nav entry highlight the closest one.
const sectionToNav: Record<string, NavKey> = {
  projects: "projects",
  about: "about",
  journey: "about",
  experience: "experience",
  certificates: "experience",
  results: "community",
  community: "community",
  contact: "contact",
}

const sectionIds = Object.keys(sectionToNav)

const GITHUB_URL = "https://github.com/sarapresaa"

function useActiveSection() {
  const [active, setActive] = useState<NavKey | null>(null)

  useEffect(() => {
    // A section is "current" while it crosses the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(
              entry.target.id === "home"
                ? null
                : (sectionToNav[entry.target.id] ?? null)
            )
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )

    for (const id of ["home", ...sectionIds]) {
      const element = document.getElementById(id)

      if (element) {
        observer.observe(element)
      }
    }

    return () => observer.disconnect()
  }, [])

  return active
}

function SiteNav() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const active = useActiveSection()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  const listRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef<Partial<Record<NavKey, HTMLAnchorElement | null>>>({})
  const indicatorX = useMotionValue(0)
  const indicatorWidth = useMotionValue(0)
  const indicatorOpacity = useMotionValue(0)

  // Slide the highlight under the active link. Motion values only: moving
  // the indicator never re-renders the nav.
  useEffect(() => {
    const list = listRef.current

    if (!list) {
      return
    }

    function place(immediate: boolean) {
      // Measure the <li>: its offsetParent is the <ul>, the <a>'s is the <li>.
      const link = active ? linkRefs.current[active]?.parentElement : null

      if (!link) {
        animate(indicatorOpacity, 0, { duration: 0.3 })
        return
      }

      const spring = { type: "spring", stiffness: 380, damping: 34 } as const

      if (immediate || indicatorOpacity.get() === 0) {
        indicatorX.jump(link.offsetLeft)
        indicatorWidth.jump(link.offsetWidth)
      } else {
        animate(indicatorX, link.offsetLeft, spring)
        animate(indicatorWidth, link.offsetWidth, spring)
      }

      animate(indicatorOpacity, 1, { duration: 0.3 })
    }

    place(false)

    const observer = new ResizeObserver(() => place(true))
    observer.observe(list)

    return () => observer.disconnect()
  }, [active, indicatorOpacity, indicatorWidth, indicatorX])

  return (
    <>
      <m.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Soft blur that fades out below the bar, so the bar has no edge. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/80 via-ink/40 to-transparent [mask-image:linear-gradient(to_bottom,#000_35%,transparent)] backdrop-blur-md"
        />

        <div className="relative mx-auto grid h-[4.5rem] max-w-[1360px] grid-cols-2 items-center gap-4 px-6 md:px-10 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left slot: the hand-written logo flies in here (brand-signature). */}
          <div aria-hidden="true" className="h-10" />

          <nav
            aria-label={t("label")}
            className="hidden rounded-full border border-hairline bg-ink/50 p-1 backdrop-blur-xl lg:block"
          >
            <ul ref={listRef} className="relative flex items-center">
              <m.li
                aria-hidden="true"
                style={{
                  x: indicatorX,
                  width: indicatorWidth,
                  opacity: indicatorOpacity,
                }}
                className="absolute inset-y-0 left-0 rounded-full bg-paper/10"
              />
              {navItems.map(({ key, href }) => (
                <li key={key} className="relative">
                  <a
                    ref={(element) => {
                      linkRefs.current[key] = element
                    }}
                    href={href}
                    aria-current={active === key ? "location" : undefined}
                    className={cn(
                      "block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      active === key
                        ? "text-paper"
                        : "text-paper-dim hover:text-paper"
                    )}
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 justify-self-end">
            <a
              href={`/cv-${locale}.pdf`}
              download
              className="group hidden items-center gap-1.5 rounded-full border border-hairline-strong px-4 py-2 text-sm text-paper transition-colors duration-300 hover:border-paper/50 hover:bg-paper/5 lg:inline-flex"
            >
              {t("cv")}
              <HugeiconsIcon
                icon={Download01Icon}
                size={15}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isMenuOpen}
              aria-label={t("openMenu")}
              className="flex size-10 items-center justify-center rounded-full border border-hairline-strong text-paper transition-colors hover:bg-paper/5 lg:hidden"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <MobileMenu active={active} locale={locale} onClose={closeMenu} />
        ) : null}
      </AnimatePresence>
    </>
  )
}

type MobileMenuProps = {
  active: NavKey | null
  locale: string
  onClose: () => void
}

function MobileMenu({ active, locale, onClose }: MobileMenuProps) {
  const t = useTranslations("nav")
  const lenis = useLenis()
  const panelRef = useRef<HTMLDivElement>(null)

  // Freeze page scroll (Lenis owns it), trap focus, close on Escape, and put
  // focus back where it was when the menu closes.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    lenis?.stop()

    const panel = panelRef.current
    const focusable = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button") ?? [])

    focusable()[0]?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
        return
      }

      if (event.key !== "Tab") {
        return
      }

      const items = focusable()
      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      lenis?.start()
      previouslyFocused?.focus()
    }
  }, [lenis, onClose])

  const origin = "calc(100% - 2.25rem) 2.25rem"

  return (
    <m.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("menu")}
      initial={{ clipPath: `circle(0px at ${origin})` }}
      animate={{ clipPath: `circle(150vmax at ${origin})` }}
      exit={{ clipPath: `circle(0px at ${origin})` }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[60] flex flex-col bg-ink-raised px-6 pt-24 pb-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t("closeMenu")}
        className="absolute top-4 right-6 flex size-10 items-center justify-center rounded-full border border-hairline-strong text-paper"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={1.6} />
      </button>

      <ul className="flex flex-1 flex-col justify-center gap-1">
        {navItems.map(({ key, href }, index) => (
          <li key={key} className="overflow-hidden">
            <m.a
              href={href}
              onClick={onClose}
              aria-current={active === key ? "location" : undefined}
              initial={{ y: "110%" }}
              animate={{
                y: "0%",
                transition: {
                  duration: 0.8,
                  delay: 0.25 + index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              exit={{ y: "110%", transition: { duration: 0.3 } }}
              className={cn(
                "block py-1.5 text-[clamp(2.1rem,9.5vw,3rem)] leading-tight font-medium tracking-[-0.035em]",
                active === key ? "text-blush" : "text-paper"
              )}
            >
              {t(key)}
            </m.a>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-hairline pt-6 text-sm">
        <a
          href={`/cv-${locale}.pdf`}
          download
          className="flex items-center gap-2 text-paper"
        >
          {t("cv")}
          <HugeiconsIcon icon={Download01Icon} size={16} strokeWidth={1.8} />
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-paper-dim"
        >
          GitHub
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            size={16}
            strokeWidth={1.8}
          />
        </a>
      </div>
    </m.div>
  )
}

export { SiteNav }
