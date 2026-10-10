"use client"

import { useTranslations } from "next-intl"

import { ScrollText } from "@/components/motion/scroll-text"
import { SectionShell } from "@/components/section-shell"

function About() {
  const t = useTranslations("about")
  const paragraphs = t("body").split("\n\n")
  const skills = t.raw("skills") as string[]
  const lastIndex = paragraphs.length - 1

  return (
    <SectionShell id="about" label={t("label")} heading={t("heading")}>
      <ScrollText
        className="flex flex-col gap-8"
        blocks={paragraphs.map((text, index) => {
          const isStatement = index === 0 || index === lastIndex

          return {
            text,
            floor: isStatement ? 0.4 : 0.5,
            className: isStatement
              ? "font-display text-[clamp(1.5rem,2.1vw,1.95rem)] leading-[1.32] font-normal tracking-[-0.025em] text-paper"
              : "max-w-[34em] text-base leading-[1.75] text-paper md:text-[1.0625rem]",
          }
        })}
      />

      <div className="mt-20">
        <p className="text-sm text-paper-dim">{t("skillsLabel")}</p>
        <ul className="mt-5 grid grid-cols-1 border-t border-hairline sm:grid-cols-2 sm:gap-x-10">
          {skills.map((skill) => (
            <li
              key={skill}
              className="group border-b border-hairline py-4 font-display text-lg text-paper transition-colors duration-500 hover:text-blush"
            >
              <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  )
}

export { About }
