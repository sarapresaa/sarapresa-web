"use client"

import { m, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"

type TimelineItem = {
  period: string
  title: string
  description: string
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Timeline() {
  const t = useTranslations("timeline")
  const items = t.raw("items") as TimelineItem[]

  return (
    <section id="journey" className="bg-[#0f0d14] px-6 py-[120px] md:px-10">
      <div className="mx-auto max-w-[900px]">
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

        <div className="mt-16 flex flex-col">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <m.div
                key={item.period}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={0.2 + index * 0.1}
                variants={fadeUp}
                className="relative pb-12 pl-8 last:pb-0"
                style={{
                  borderLeft: isLast
                    ? "1px dashed rgba(125, 92, 107, 0.3)"
                    : "1px solid rgba(125, 92, 107, 0.4)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-1 block rounded-full"
                  style={{
                    left: "-4px",
                    width: 8,
                    height: 8,
                    backgroundColor: "#7d5c6b",
                    opacity: isLast ? 0.5 : 1,
                  }}
                />

                <div
                  className="uppercase"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {item.period}
                </div>

                <div
                  className="mt-2"
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 500,
                    color: isLast ? "rgba(255,255,255,0.8)" : "white",
                  }}
                >
                  {item.title}
                </div>

                <p
                  className="mt-2"
                  style={{
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.7,
                  }}
                >
                  {item.description}
                </p>
              </m.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { Timeline }
