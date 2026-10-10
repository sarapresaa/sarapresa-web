"use client"

import { useState } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  ArrowUpRight01Icon,
  Copy01Icon,
  CopyCheckIcon,
  Download01Icon,
  GithubIcon,
  InstagramIcon,
  Linkedin01Icon,
  PinterestIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons"
import { useLocale, useTranslations } from "next-intl"

import { ContactForm } from "@/components/contact-form"
import { Magnetic } from "@/components/motion/magnetic"
import { NewsletterCard } from "@/components/newsletter-card"
import { RevealText } from "@/components/motion/reveal-text"
import { Rule } from "@/components/motion/rule"
import { EMAIL } from "@/lib/seo"
import { socials, type Social } from "@/lib/socials"

type SocialLink = Social & { icon: IconSvgElement }

const workLinks: SocialLink[] = [
  { ...socials.github, icon: GithubIcon },
  { ...socials.linkedin, icon: Linkedin01Icon },
]

const contentLinks: SocialLink[] = [
  { ...socials.instagram, icon: InstagramIcon },
  { ...socials.tiktok, icon: TiktokIcon },
  { ...socials.youtube, icon: YoutubeIcon },
  { ...socials.pinterest, icon: PinterestIcon },
]

function CopyEmailButton() {
  const t = useTranslations("linkHub")
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      return
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-full border border-hairline-strong px-5 py-2.5 text-sm text-paper transition-colors duration-300 hover:border-paper/50 hover:bg-paper/5"
    >
      <HugeiconsIcon
        icon={copied ? CopyCheckIcon : Copy01Icon}
        size={16}
        strokeWidth={1.8}
      />
      <span aria-live="polite">{copied ? t("copied") : t("copy")}</span>
    </button>
  )
}

function SocialCard({ name, handle, url, icon }: SocialLink) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-spotlight
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 rounded-2xl border border-hairline bg-ink-raised/50 p-4 transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-blush/40 sm:min-h-[8.75rem] sm:grid-cols-[1fr_auto] sm:grid-rows-[auto_1fr] sm:p-5"
    >
      <span className="grid size-11 place-items-center rounded-full bg-paper/8 text-paper transition-colors duration-500 group-hover:bg-blush group-hover:text-ink sm:col-start-1 sm:row-start-1">
        <HugeiconsIcon icon={icon} size={21} strokeWidth={1.6} />
      </span>
      <span className="min-w-0 sm:col-span-2 sm:row-start-2 sm:self-end">
        <span className="block text-lg font-medium tracking-[-0.02em] text-paper">
          {name}
        </span>
        <span className="mt-0.5 block truncate text-sm text-paper-faint">
          {handle}
        </span>
      </span>
      <HugeiconsIcon
        icon={ArrowUpRight01Icon}
        size={18}
        strokeWidth={2}
        className="text-paper-faint transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper sm:col-start-2 sm:row-start-1 sm:self-start"
      />
    </a>
  )
}

function SocialGroup({ label, links }: { label: string; links: SocialLink[] }) {
  return (
    <div>
      <p className="text-sm text-paper-faint">{label}</p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.name}>
            <SocialCard {...link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function LinkHub() {
  const t = useTranslations("linkHub")
  const locale = useLocale()
  const soon = t.raw("soon") as string[]

  return (
    <section
      id="contact"
      className="relative px-6 pt-24 pb-24 md:px-10 md:pt-36"
    >
      <div className="mx-auto max-w-[1280px]">
        <Rule />

        <div className="pt-12">
          <p className="text-sm text-paper-dim">{t("label")}</p>
          <RevealText
            as="h2"
            className="mt-5 text-[clamp(3.25rem,10vw,9rem)] leading-[0.95] tracking-[-0.045em]"
          >
            {t("heading")}
          </RevealText>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="flex flex-col gap-12 lg:sticky lg:top-28 lg:self-start">
            <p className="max-w-md text-lg leading-relaxed text-paper-dim">
              {t("lead")}
            </p>

            <div className="flex flex-col items-start gap-6">
              <p className="text-sm text-paper-faint">{t("emailLabel")}</p>
              <Magnetic strength={0.12}>
                <a
                  href={`mailto:${EMAIL}`}
                  className="link-sweep pb-1 font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-tight break-all text-paper transition-colors duration-500 hover:text-blush"
                >
                  {EMAIL}
                </a>
              </Magnetic>
              <div className="flex flex-wrap items-center gap-3">
                <CopyEmailButton />
                <a
                  href={`/cv-${locale}.pdf`}
                  download
                  className="group inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-blush"
                >
                  {t("cv")}
                  <HugeiconsIcon
                    icon={Download01Icon}
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>

        <div className="mt-32 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h3 className="text-[clamp(2rem,3.4vw,3rem)]">
              {t("followLabel")}
            </h3>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-paper-dim">
              {t("followIntro")}
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <a
              href={socials.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              data-spotlight
              className="group flex items-center justify-between gap-6 rounded-3xl border border-hairline-strong bg-gradient-to-br from-mauve/40 via-ink-raised/60 to-ink-raised/40 p-5 transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-blush/50 md:p-6"
            >
              <span className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-mauve to-rose text-paper">
                  <HugeiconsIcon
                    icon={YoutubeIcon}
                    size={26}
                    strokeWidth={1.6}
                  />
                </span>
                <span>
                  <span className="block text-xl font-medium tracking-[-0.025em] text-paper md:text-2xl">
                    {t("latestVideo")}
                  </span>
                  <span className="mt-0.5 block text-sm text-paper-dim">
                    {t("latestVideoHint")}
                  </span>
                </span>
              </span>
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-hairline-strong text-paper transition-colors duration-500 group-hover:border-blush group-hover:bg-blush group-hover:text-ink">
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={20}
                  strokeWidth={2}
                  className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>

            <SocialGroup label={t("groups.work")} links={workLinks} />
            <SocialGroup label={t("groups.content")} links={contentLinks} />

            <NewsletterCard />

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
              <p className="mr-1 text-sm text-paper-faint">{t("soonLabel")}</p>
              <ul className="flex flex-wrap gap-2">
                {soon.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-paper/6 px-3.5 py-1.5 text-sm text-paper-dim"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { LinkHub }
