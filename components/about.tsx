"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function About() {
  const t = useTranslations("about")
  const paragraphs = t("body").split("\n\n")
  const skills = t.raw("skills") as string[]

  return (
    <section id="about" className="bg-[#1a1720] px-6 py-[120px] md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase"
          >
            {t("label")}
          </motion.p>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.1}
            variants={fadeUp}
            className="mt-4 text-3xl font-medium text-white sm:text-4xl md:text-5xl"
          >
            {t("heading")}
          </motion.h2>

          <div className="mt-6 flex flex-col gap-4">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={0.2 + index * 0.08}
                variants={fadeUp}
                className="text-sm leading-relaxed text-white/70 sm:text-base"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.2 + paragraphs.length * 0.08 + 0.1}
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-2"
          >
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full text-white"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "6px 16px",
                  fontSize: "13px",
                }}
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden rounded-[20px]"
          style={{ aspectRatio: "3 / 4" }}
        >
          <Image
            src="/hero.jpg"
            alt="Sara Presa"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </motion.div>
      </div>
    </section>
  )
}

export { About }
