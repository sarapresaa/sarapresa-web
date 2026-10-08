"use client"

import { motion, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"

type ResultItem = {
  value: string
  label: string
  period: string
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Results() {
  const t = useTranslations("results")
  const items = t.raw("items") as ResultItem[]

  return (
    <section className="bg-[#1a1720] px-6 py-[100px] md:px-10">
      <div className="mx-auto max-w-5xl">
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

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.2 + index * 0.1}
              variants={fadeUp}
              className="text-center"
            >
              <div
                className="font-semibold"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  background: "linear-gradient(135deg, #7d5c6b, #c4919a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {item.value}
              </div>
              <div className="mt-2 text-sm text-white/70">{item.label}</div>
              {item.period && (
                <div className="mt-1 text-xs text-white/40">
                  {item.period}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Results }
