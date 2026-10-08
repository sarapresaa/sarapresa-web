"use client"

import { motion, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"

type EducationEntry = {
  title: string
  tags: string[]
}

const educationMeta = [
  {
    id: "degree",
    institution: "ESTGA — Universidade de Aveiro",
    period: "2023 — 2027",
  },
  {
    id: "highschool",
    institution: "Escola Secundária Dr. Mário Sacramento",
    period: "2019 — 2023",
  },
  {
    id: "conservatory",
    institution: "Conservatório de Música de Aveiro Calouste Gulbenkian",
    period: "2014 — 2024",
  },
] as const

const certificateList = [
  {
    name: "Inside LVMH Certificate – Creation & Branding, Retail & Client Experience",
    institution: "LVMH",
    date: "Out 2025",
  },
  {
    name: "It's All About Trends 2026 – Digital Trends & AI",
    institution: "Lisbon Digital School",
    date: "Jan 2026",
  },
  {
    name: "O Teu Futuro é Digital",
    institution: "Lisbon Digital School",
    date: "Mai 2025",
  },
  {
    name: "Storytelling para Marketing Digital",
    institution: "Santander Open Academy",
    date: "Dez 2024",
  },
  {
    name: "Workshop: IntraEmpreendedorismo – Inovação e Proatividade",
    institution: "Universidade de Aveiro",
    date: "Nov 2025",
  },
  { name: "Ads Made Easy", institution: "ClubLifeDesign", date: "Jan 2025" },
  {
    name: "The Power of Instagram",
    institution: "ClubLifeDesign",
    date: "Nov 2024",
  },
] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Certificates() {
  const t = useTranslations("certificates")
  const education = t.raw("education") as Record<string, EducationEntry>

  return (
    <section id="certificates" className="bg-[#1a1720] px-6 py-[120px] md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          variants={fadeUp}
          className="text-center text-xs font-medium tracking-[0.2em] text-white/50 uppercase"
        >
          {t("label")}
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.1}
          variants={fadeUp}
          className="mt-4 text-center text-3xl font-medium text-white sm:text-4xl md:text-5xl"
        >
          {t("heading")}
        </motion.h2>

        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.2}
          variants={fadeUp}
          className="mt-16 text-lg font-medium text-white/80"
        >
          {t("educationLabel")}
        </motion.h3>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {educationMeta.map((meta, index) => {
            const entry = education[meta.id]
            return (
              <motion.div
                key={meta.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={0.3 + index * 0.1}
                variants={fadeUp}
                className="education-card"
              >
                <div className="text-base font-medium text-white">
                  {entry.title}
                </div>
                <div className="mt-2 text-sm text-white/50">
                  {meta.institution}
                </div>
                <div className="mt-1 text-xs text-white/35">
                  {meta.period}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full text-white"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "4px 12px",
                        fontSize: "12px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          variants={fadeUp}
          className="mt-20 text-lg font-medium text-white/80"
        >
          {t("certificatesLabel")}
        </motion.h3>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificateList.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.1 + index * 0.05}
              variants={fadeUp}
              className="cert-card"
            >
              <span
                aria-hidden="true"
                className="absolute top-4 right-4"
                style={{ color: "#c4919a", fontSize: "12px" }}
              >
                ✦
              </span>
              <div
                className="pr-4"
                style={{ fontSize: "15px", fontWeight: 700, color: "white" }}
              >
                {cert.name}
              </div>
              <div
                className="mt-2"
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}
              >
                {cert.institution}
              </div>
              <div
                className="mt-1"
                style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}
              >
                {cert.date}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.2}
          variants={fadeUp}
          className="mt-8 text-center"
        >
          <a
            href="https://www.linkedin.com/in/sarapresaa/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            {t("moreNote")}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export { Certificates }
