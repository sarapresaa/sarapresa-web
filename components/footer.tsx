"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

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

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/sarapresaa" },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@sarapresaa.oficial",
  },
  { name: "YouTube", href: "https://www.youtube.com/@sarapresaa" },
  { name: "Pinterest", href: "https://pt.pinterest.com/sarapresaa/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/sarapresaa/" },
  { name: "GitHub", href: "https://github.com/sarapresaa" },
] as const

function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="bg-[#0a0810] px-6 py-[60px] md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Image
            src="/signature.png"
            alt="Sara Presa"
            width={160}
            height={54}
            className="h-auto w-[160px]"
            style={{ filter: "brightness(2) contrast(1.2)" }}
          />

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {navItems.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="text-white/60 transition-colors hover:text-white"
                style={{ fontSize: "14px" }}
              >
                {t(`nav.${key}`)}
              </a>
            ))}
          </nav>
        </div>

        <div
          className="my-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        />

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 uppercase transition-colors hover:text-white"
              style={{ fontSize: "13px", letterSpacing: "0.05em" }}
            >
              {social.name}
            </a>
          ))}
        </div>

        <div
          className="my-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        />

        <div className="flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
            {t("copyright")}
          </span>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
            {t("madeWith")}
          </span>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
