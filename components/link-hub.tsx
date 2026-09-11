"use client"

import { motion, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"

const featuredLinks = [
  {
    key: "latestVideo",
    href: "https://www.youtube.com/@sarapresaa",
    comingSoon: false,
  },
  { key: "newsletter", href: "#", comingSoon: true },
  { key: "shop", href: "#", comingSoon: true },
  { key: "events", href: "#", comingSoon: true },
  { key: "community", href: "#", comingSoon: true },
] as const

const socialLinks = [
  {
    platform: "Instagram",
    handle: "@sarapresaa",
    href: "https://www.instagram.com/sarapresaa",
  },
  {
    platform: "Pinterest",
    handle: "@sarapresaa",
    href: "https://pt.pinterest.com/sarapresaa/",
  },
  {
    platform: "TikTok",
    handle: "@sarapresaa.oficial",
    href: "https://www.tiktok.com/@sarapresaa.oficial",
  },
  {
    platform: "YouTube",
    handle: "@sarapresaa",
    href: "https://www.youtube.com/@sarapresaa",
  },
  {
    platform: "LinkedIn",
    handle: "sarapresaa",
    href: "https://www.linkedin.com/in/sarapresaa/",
  },
] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function LinkHub() {
  const t = useTranslations("linkHub")

  return (
    <section className="bg-[#1a1720] px-6 py-20 md:px-10">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        custom={0}
        variants={fadeUp}
        className="text-center text-xs font-medium tracking-[0.2em] text-white/50 uppercase"
      >
        {t("sectionLabel")}
      </motion.p>

      <div className="mx-auto mt-10 flex max-w-xl flex-col gap-3">
        {featuredLinks.map(({ key, href, comingSoon }, index) => {
          const title = t(`links.${key}`)
          const animationProps = {
            initial: "hidden" as const,
            whileInView: "visible" as const,
            viewport: { once: true, margin: "-100px" },
            custom: 0.1 + index * 0.08,
            variants: fadeUp,
          }

          const content = (
            <>
              <span className="text-sm font-medium text-white">{title}</span>
              {comingSoon ? (
                <span className="text-[0.65rem] font-medium tracking-[0.15em] text-white/40 uppercase">
                  {t("comingSoon")}
                </span>
              ) : (
                <span className="text-white/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>
              )}
            </>
          )

          if (comingSoon) {
            return (
              <motion.div
                key={key}
                {...animationProps}
                className={cn(
                  "social-card flex cursor-default items-center justify-between opacity-60"
                )}
              >
                {content}
              </motion.div>
            )
          }

          return (
            <motion.a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              {...animationProps}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="social-card group flex items-center justify-between"
            >
              {content}
            </motion.a>
          )
        })}
      </div>

      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
        {socialLinks.map(({ platform, handle, href }, index) => (
          <motion.a
            key={platform}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.5 + index * 0.08}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="social-card group flex-col justify-between gap-6"
          >
            <div>
              <div className="text-sm font-medium text-white">
                {platform}
              </div>
              <div className="mt-1 text-xs text-white/50">{handle}</div>
            </div>
            <span className="self-end text-white/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
              →
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

export { LinkHub }
