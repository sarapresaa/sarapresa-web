"use client"

import { useTranslations } from "next-intl"

import { SectionShell } from "@/components/section-shell"

type Job = {
  title: string
  company: string
  period: string
  description: string
}

type SkillGroup = {
  label: string
  items: string[]
}

type LanguageItem = {
  name: string
  level: string
}

function Experience() {
  const t = useTranslations("experience")
  const jobs = t.raw("jobs") as Job[]
  const skillGroups = t.raw("skillGroups") as SkillGroup[]
  const languages = t.raw("languages") as LanguageItem[]
  const activities = t.raw("activities") as string[]

  return (
    <SectionShell id="experience" label={t("label")} heading={t("heading")}>
      <h3 className="font-sans text-sm font-normal tracking-normal text-paper-dim">
        {t("experienceLabel")}
      </h3>

      <ul className="mt-5 border-t border-hairline">
        {jobs.map((job) => (
          <li
            key={job.title}
            data-spotlight
            className="grid gap-x-8 gap-y-3 border-b border-hairline py-8 md:grid-cols-[10.5rem_minmax(0,1fr)]"
          >
            <p className="text-sm leading-relaxed text-paper-faint">
              {job.period}
            </p>
            <div>
              <h4 className="font-display text-[1.4rem] leading-tight">
                {job.title}
              </h4>
              <p className="mt-1 text-sm text-blush">{job.company}</p>
              <p className="mt-4 max-w-[36em] text-[0.9375rem] leading-relaxed text-paper-dim">
                {job.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-10">
        <div>
          <h3 className="font-sans text-sm font-normal tracking-normal text-paper-dim">
            {t("skillsLabel")}
          </h3>
          <div className="mt-5 flex flex-col gap-6">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs text-paper-faint">{group.label}</p>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-hairline-strong px-2.5 py-1 font-mono text-xs text-paper transition-colors duration-300 hover:border-blush/60 hover:text-blush"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-paper-faint">{t("skillsNote")}</p>
        </div>

        <div className="flex flex-col gap-12">
          <div>
            <h3 className="font-sans text-sm font-normal tracking-normal text-paper-dim">
              {t("languagesLabel")}
            </h3>
            <ul className="mt-5 border-t border-hairline">
              {languages.map((language) => (
                <li
                  key={language.name}
                  className="flex items-baseline justify-between border-b border-hairline py-3 text-[0.9375rem]"
                >
                  <span className="text-paper">{language.name}</span>
                  <span className="text-paper-faint">{language.level}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-normal tracking-normal text-paper-dim">
              {t("activitiesLabel")}
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-[0.9375rem] leading-relaxed text-paper">
              {activities.map((activity) => (
                <li key={activity}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

export { Experience }
