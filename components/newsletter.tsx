"use client"

import { useState } from "react"
import { m, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Newsletter() {
  const t = useTranslations("newsletter")
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      className="bg-gradient-to-b from-[#1a1720] to-[#0f0d14] px-6 py-[100px] md:px-10"
      style={{ width: "100%" }}
    >
      <div className="mx-auto max-w-[600px] text-center">
        <m.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          variants={fadeUp}
          className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase"
        >
          {t("label")}
        </m.p>

        <m.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.1}
          variants={fadeUp}
          className="mt-4 text-3xl font-medium text-white sm:text-4xl md:text-5xl"
        >
          {t("heading")}
        </m.h2>

        <m.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.2}
          variants={fadeUp}
          className="mt-4 text-sm text-white/60 sm:text-base"
        >
          {t("subtext")}
        </m.p>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.3}
          variants={fadeUp}
          className="mt-8"
        >
          {submitted ? (
            <m.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-base font-medium text-white"
            >
              {t("success")}
            </m.p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("placeholder")}
                className="flex-1"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  color: "white",
                  fontSize: "15px",
                  width: "100%",
                }}
              />
              <button
                type="submit"
                className="newsletter-button shrink-0 whitespace-nowrap text-white"
                style={{
                  borderRadius: "12px",
                  padding: "16px 28px",
                  fontWeight: 500,
                  border: "none",
                }}
              >
                {t("button")}
              </button>
            </form>
          )}
        </m.div>

        <m.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.4}
          variants={fadeUp}
          className="mt-6"
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
          }}
        >
          {t("disclaimer")}
        </m.p>
      </div>
    </section>
  )
}

export { Newsletter }
