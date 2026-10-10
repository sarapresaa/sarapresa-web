"use client"

import { useRef, type PointerEvent as ReactPointerEvent } from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion"
import { useTranslations } from "next-intl"

import { Magnetic } from "@/components/motion/magnetic"
import { RevealText } from "@/components/motion/reveal-text"

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Hero() {
  const t = useTranslations("hero")
  const sectionRef = useRef<HTMLElement>(null)

  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.4)
  const smoothX = useSpring(pointerX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(pointerY, { stiffness: 50, damping: 20 })
  const glowX = useTransform(smoothX, (value) => value * 100)
  const glowY = useTransform(smoothY, (value) => value * 100)
  const glow = useMotionTemplate`radial-gradient(38rem circle at ${glowX}% ${glowY}%, rgb(232 180 184 / 0.2), transparent 62%)`
  const portraitShiftX = useTransform(smoothX, [0, 1], [-14, 14])
  const portraitShiftY = useTransform(smoothY, [0, 1], [-10, 10])
  const outlineShiftX = useTransform(smoothX, [0, 1], [10, -10])
  const outlineShiftY = useTransform(smoothY, [0, 1], [8, -8])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const portraitScroll = useTransform(scrollYProgress, [0, 1], [0, 90])

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width)
    pointerY.set((event.clientY - rect.top) / rect.height)
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      onPointerMove={handlePointerMove}
      className="hero-surface min-h-svh"
    >
      <m.div
        aria-hidden="true"
        style={{ backgroundImage: glow }}
        className="pointer-events-none absolute inset-0 z-[-1]"
      />

      <div className="mx-auto grid min-h-svh max-w-[1360px] items-center gap-12 px-6 pt-28 pb-24 md:px-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10 lg:pt-24">
        <div className="flex flex-col items-start">
          <h1 className="block text-[1rem] leading-none tracking-normal">
            <span
              id="hero-signature"
              aria-hidden="true"
              className="block aspect-[515/174] w-[min(78vw,340px)]"
              style={{ marginLeft: "calc(min(78vw, 340px) * -0.0796)" }}
            />
            <span className="sr-only">Sara Presa, {t("h1Suffix")}</span>
          </h1>

          <RevealText
            as="p"
            immediate
            delay={1.15}
            className="mt-8 max-w-[14em] font-display text-[clamp(2.3rem,4.2vw,4.25rem)] leading-[1.06] text-balance"
          >
            {t("subtitle")}
          </RevealText>

          <m.p
            initial="hidden"
            animate="visible"
            custom={2.3}
            variants={rise}
            className="mt-8 flex max-w-md items-start gap-3 text-base leading-relaxed text-paper-dim md:text-[1.0625rem]"
          >
            <span
              aria-hidden="true"
              className="relative mt-[0.55em] flex size-2 shrink-0"
            >
              <span className="absolute inline-flex size-full rounded-full bg-rose opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-blush" />
            </span>
            {t("role")}
          </m.p>

          <m.div
            initial="hidden"
            animate="visible"
            custom={2.5}
            variants={rise}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:bg-blush"
              >
                {t("contactCta")}
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={18}
                  strokeWidth={2}
                  className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full border border-hairline-strong px-7 py-3.5 text-[0.9375rem] text-paper transition-colors duration-300 hover:border-paper/50 hover:bg-paper/5"
            >
              {t("projectsCta")}
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={18}
                strokeWidth={2}
                className="transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5"
              />
            </a>
          </m.div>
        </div>

        <m.div
          style={{ y: portraitScroll }}
          className="relative mx-auto w-full max-w-[26rem] lg:max-w-none lg:justify-self-end lg:pl-6"
        >
          <div className="relative mx-auto w-full max-w-[27rem]">
            <m.div
              aria-hidden="true"
              style={{ x: outlineShiftX, y: outlineShiftY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 1.2 }}
              className="absolute inset-0 translate-x-5 translate-y-5 rounded-t-[999px] rounded-b-3xl border border-blush/35"
            />
            <m.div
              style={{ x: portraitShiftX, y: portraitShiftY }}
              className="relative"
            >
              <m.div
                initial={{
                  clipPath: "inset(100% 0% 0% 0% round 999px 999px 24px 24px)",
                }}
                animate={{
                  clipPath: "inset(0% 0% 0% 0% round 999px 999px 24px 24px)",
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.35,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="relative aspect-[4/5.2] w-full overflow-hidden bg-ink-high"
              >
                <m.div
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 2.2,
                    delay: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/sara-presa.jpg"
                    alt={t("portraitAlt")}
                    fill
                    priority
                    sizes="(min-width: 1024px) 36vw, 90vw"
                    className="object-cover object-[50%_8%]"
                  />
                </m.div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-mauve/15"
                />
              </m.div>
            </m.div>
          </div>

          <m.p
            initial="hidden"
            animate="visible"
            custom={2.7}
            variants={rise}
            className="mx-auto mt-6 max-w-[27rem] text-right text-sm text-paper-faint"
          >
            {t("location")}
          </m.p>
        </m.div>
      </div>

      <m.div
        aria-hidden="true"
        initial="hidden"
        animate="visible"
        custom={3}
        variants={rise}
        className="absolute inset-x-0 bottom-7 hidden flex-col items-center gap-3 text-xs text-paper-faint lg:flex"
      >
        {t("scroll")}
        <span className="scroll-cue" />
      </m.div>
    </section>
  )
}

export { Hero }
