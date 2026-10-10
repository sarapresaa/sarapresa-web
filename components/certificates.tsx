"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { useTranslations } from "next-intl"

import { SectionShell } from "@/components/section-shell"

type EducationEntry = {
  title: string
  institution: string
  period: string
  tags: string[]
}

type CertificateItem = {
  name: string
  institution: string
  date: string
}

const LINKEDIN_URL = "https://www.linkedin.com/in/sarapresaa/"

function Certificates() {
  const t = useTranslations("certificates")
  const education = t.raw("education") as EducationEntry[]
  const certificates = t.raw("items") as CertificateItem[]

  return (
    <SectionShell id="certificates" label={t("label")} heading={t("heading")}>
      <h3 className="font-sans text-sm font-normal tracking-normal text-paper-dim">
        {t("educationLabel")}
      </h3>

      <ul className="mt-5 border-t border-hairline">
        {education.map((entry) => (
          <li
            key={entry.title}
            data-spotlight
            className="border-b border-hairline py-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h4 className="max-w-[22em] font-display text-[1.35rem] leading-tight">
                {entry.title}
              </h4>
              <p className="text-sm text-paper-faint">{entry.period}</p>
            </div>
            <p className="mt-2 text-sm text-blush">{entry.institution}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-hairline-strong px-2.5 py-1 font-mono text-xs text-paper-dim"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h3 className="mt-20 font-sans text-sm font-normal tracking-normal text-paper-dim">
        {t("certificatesLabel")}
      </h3>

      <ul className="mt-5 border-t border-hairline">
        {certificates.map((certificate) => (
          <li
            key={certificate.name}
            className="group grid gap-x-8 gap-y-1 border-b border-hairline py-5 transition-colors duration-500 hover:border-hairline-strong sm:grid-cols-[minmax(0,1fr)_auto]"
          >
            <p className="text-[0.9375rem] leading-snug text-paper transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
              {certificate.name}
            </p>
            <p className="text-sm text-paper-faint sm:text-right">
              {certificate.institution}
              <span className="mx-2 text-paper-faint/50" aria-hidden="true">
                /
              </span>
              {certificate.date}
            </p>
          </li>
        ))}
      </ul>

      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 inline-flex items-center gap-2 text-sm text-paper-dim transition-colors duration-300 hover:text-paper"
      >
        {t("moreNote")}
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          size={16}
          strokeWidth={2}
          className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </SectionShell>
  )
}

export { Certificates }
