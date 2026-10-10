"use client"

import type { ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUp01Icon } from "@hugeicons/core-free-icons"
import { useTranslations } from "next-intl"

import { socialList } from "@/lib/socials"

const navItems = [
  { key: "home", href: "#home" },
  { key: "projects", href: "#projects" },
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "journey", href: "#journey" },
  { key: "certificates", href: "#certificates" },
  { key: "community", href: "#community" },
  { key: "contact", href: "#contact" },
] as const

function FooterLink({
  href,
  external,
  children,
}: {
  href: string
  external?: boolean
  children: ReactNode
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      className="link-sweep inline-block pb-0.5 text-paper-dim transition-colors duration-300 hover:text-paper"
    >
      {children}
    </a>
  )
}

function Footer() {
  const t = useTranslations("footer")
  const tA11y = useTranslations("a11y")

  return (
    <footer className="relative overflow-hidden px-6 pt-8 md:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="h-px bg-hairline-strong" />

        <div className="flex flex-col gap-12 py-14 md:flex-row md:items-start md:justify-between">
          <nav className="flex flex-col gap-10 text-[0.9375rem] sm:flex-row sm:gap-20">
            <ul className="grid grid-flow-col grid-rows-4 gap-x-14 gap-y-3">
              {navItems.map(({ key, href }) => (
                <li key={key}>
                  <FooterLink href={href}>{t(`nav.${key}`)}</FooterLink>
                </li>
              ))}
            </ul>
            <ul className="grid grid-flow-col grid-rows-4 gap-x-14 gap-y-3">
              {socialList.map(({ name, url }) => (
                <li key={name}>
                  <FooterLink href={url} external>
                    {name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#home"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-hairline-strong px-5 py-2.5 text-sm text-paper transition-colors duration-300 hover:border-paper/50 hover:bg-paper/5"
          >
            {tA11y("toTop")}
            <HugeiconsIcon
              icon={ArrowUp01Icon}
              size={16}
              strokeWidth={2}
              className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-1"
            />
          </a>
        </div>

        <div className="flex flex-col gap-2 pb-6 text-xs text-paper-faint md:flex-row md:justify-between">
          <span>{t("copyright")}</span>
          <span>{t("madeWith")}</span>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.16em] bg-gradient-to-b from-paper/40 to-transparent bg-clip-text text-center font-display text-[clamp(3.5rem,14.2vw,16rem)] leading-[0.9] font-semibold tracking-[-0.05em] whitespace-nowrap text-transparent select-none"
      >
        Sara Presa
      </p>
    </footer>
  )
}

export { Footer }
