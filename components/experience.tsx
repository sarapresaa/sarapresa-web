"use client"

import { m, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"

type Job = {
  title: string
  company: string
  period: string
  description: string
}

type LanguageItem = {
  name: string
  level: string
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full text-white"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.15)",
        padding: "4px 12px",
        fontSize: "12px",
      }}
    >
      {children}
    </span>
  )
}

function Experience() {
  const t = useTranslations("experience")
  const jobs = t.raw("jobs") as Job[]
  const skills = t.raw("skills") as string[]
  const languages = t.raw("languages") as LanguageItem[]
  const activities = t.raw("activities") as string[]

  return (
    <section id="experience" className="bg-[#1a1720] px-6 py-[120px] md:px-10">
      <div className="mx-auto max-w-6xl">
        <m.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          variants={fadeUp}
          className="text-center text-xs font-medium tracking-[0.2em] text-white/50 uppercase"
        >
          {t("label")}
        </m.p>

        <m.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.1}
          variants={fadeUp}
          className="mt-4 text-center text-3xl font-medium text-white sm:text-4xl md:text-5xl"
        >
          {t("heading")}
        </m.h2>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <m.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.2}
              variants={fadeUp}
              className="text-lg font-medium text-white/80"
            >
              {t("experienceLabel")}
            </m.h3>

            <div className="mt-6 flex flex-col gap-4">
              {jobs.map((job, index) => (
                <m.div
                  key={job.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  custom={0.3 + index * 0.1}
                  variants={fadeUp}
                  className="education-card"
                >
                  <div className="text-base font-medium text-white">
                    {job.title}
                  </div>
                  <div className="mt-1 text-sm text-white/50">
                    {job.company}
                  </div>
                  <div className="mt-1 text-xs text-white/50">
                    {job.period}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {job.description}
                  </p>
                </m.div>
              ))}
            </div>
          </div>

          <div>
            <m.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.2}
              variants={fadeUp}
              className="text-lg font-medium text-white/80"
            >
              {t("skillsLabel")}
            </m.h3>

            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.3}
              variants={fadeUp}
              className="mt-6 flex flex-wrap gap-2"
            >
              {skills.map((skill) => (
                <Pill key={skill}>{skill}</Pill>
              ))}
            </m.div>
            <m.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.35}
              variants={fadeUp}
              className="mt-2 text-xs text-white/50"
            >
              {t("skillsNote")}
            </m.p>

            <m.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.4}
              variants={fadeUp}
              className="mt-10 text-lg font-medium text-white/80"
            >
              {t("languagesLabel")}
            </m.h3>

            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.45}
              variants={fadeUp}
              className="mt-6 flex flex-wrap gap-2"
            >
              {languages.map((lang) => (
                <Pill key={lang.name}>
                  {lang.name} ({lang.level})
                </Pill>
              ))}
            </m.div>

            <m.h3
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.5}
              variants={fadeUp}
              className="mt-10 text-lg font-medium text-white/80"
            >
              {t("activitiesLabel")}
            </m.h3>

            <m.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.55}
              variants={fadeUp}
              className="mt-6 flex flex-col gap-2"
            >
              {activities.map((activity) => (
                <li
                  key={activity}
                  className="text-sm text-white/70"
                  style={{ paddingLeft: "16px", textIndent: "-16px" }}
                >
                  — {activity}
                </li>
              ))}
            </m.ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Experience }
