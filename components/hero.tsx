"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { NextIntlClientProvider, useTranslations } from "next-intl"

import { LanguageToggle, type Language } from "@/components/language-toggle"
import enMessages from "@/messages/en.json"
import ptMessages from "@/messages/pt.json"

const messages: Record<Language, typeof ptMessages> = {
  pt: ptMessages,
  en: enMessages,
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function HeroContent({
  language,
  onLanguageChange,
}: {
  language: Language
  onLanguageChange: (language: Language) => void
}) {
  const t = useTranslations("hero")

  return (
    <section className="hero-gradient relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <motion.div
        className="absolute top-6 right-6 md:top-10 md:right-10"
        initial="hidden"
        animate="visible"
        custom={0.2}
        variants={fadeUp}
      >
        <LanguageToggle language={language} onChange={onLanguageChange} />
      </motion.div>

      <motion.div
        className="w-[75vw] max-w-[500px]"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
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

      <motion.p
        initial="hidden"
        animate="visible"
        custom={0.4}
        variants={fadeUp}
        className="mt-8 max-w-xl text-base font-light text-balance text-white/70 sm:text-lg md:text-xl"
      >
        {t("subtitle")}
      </motion.p>
    </section>
  )
}

function Hero() {
  const [language, setLanguage] = useState<Language>("pt")

  return (
    <NextIntlClientProvider
      locale={language}
      messages={messages[language]}
      timeZone="Europe/Lisbon"
    >
      <HeroContent language={language} onLanguageChange={setLanguage} />
    </NextIntlClientProvider>
  )
}

export { Hero }
