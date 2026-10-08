"use client"

import { motion, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"

type ProjectItem = {
  title: string
  meta: string
  description: string
  role: string
  tags: string[]
  link?: string
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Projects() {
  const t = useTranslations("projects")
  const items = t.raw("items") as ProjectItem[]

  return (
    <section id="projects" className="bg-[#0f0d14] px-6 py-[120px] md:px-10">
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

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.2 + index * 0.1}
              variants={fadeUp}
              className="project-card"
            >
              <div className="project-image-placeholder">
                {t("imagePlaceholder")}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium text-white">
                  {item.title}
                </h3>
                <div className="mt-1 text-xs text-white/40">{item.meta}</div>

                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {item.description}
                </p>
                {item.role && (
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {item.role}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
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

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {t("linkLabel")}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Projects }
