"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"

import { LanguageToggle } from "@/components/language-toggle"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

const wordUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 2.0 + index * 0.06,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

function Hero() {
  const t = useTranslations("hero")
  const subtitleWords = t("subtitle").split(" ")

  return (
    <section className="hero-gradient relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          opacity: 0.25,
          mixBlendMode: "luminosity",
        }}
      />

      <motion.div
        className="absolute top-6 right-6 md:top-10 md:right-10"
        initial="hidden"
        animate="visible"
        custom={0.2}
        variants={fadeUp}
      >
        <LanguageToggle />
      </motion.div>

      <motion.div
        className="w-[75vw] max-w-[500px]"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
      >
        <div className="relative">
          <motion.div
            initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
          >
            <Image
              src="/signature.png"
              alt="Sara Presa"
              width={500}
              height={169}
              priority
              className="h-auto w-full"
              style={{ filter: "brightness(2) contrast(1.2)" }}
            />
          </motion.div>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-10 block size-2.5 -translate-y-1/2 rounded-full bg-white"
            style={{ boxShadow: "0 0 12px 4px rgba(255,255,255,0.6)" }}
            initial={{ left: "0%", opacity: 0 }}
            animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
      </motion.div>

      <p
        aria-label={t("subtitle")}
        className="mt-8 text-balance"
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.75)",
          maxWidth: "520px",
          textAlign: "center",
        }}
      >
        {subtitleWords.map((word, index) => (
          <span key={index} aria-hidden="true">
            <motion.span
              className="inline-block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={wordUp}
            >
              {word}
            </motion.span>{" "}
          </span>
        ))}
      </p>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial="hidden"
        animate="visible"
        custom={2.4}
        variants={fadeUp}
      >
        <motion.div
          className="text-white/70"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

export { Hero }
