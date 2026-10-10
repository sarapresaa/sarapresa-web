"use client"

import { useEffect } from "react"
import Image from "next/image"
import {
  animate,
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion"

/** How tall the pen should be riding at this point of the word (0 to 1). */
function penHeight(progress: number) {
  // Taller strokes where the S and the P rise above the x-height.
  const rise =
    Math.exp(-(((progress - 0.07) / 0.07) ** 2)) +
    Math.exp(-(((progress - 0.57) / 0.07) ** 2))

  return (
    58 + 30 * Math.sin(progress * 58) * (0.5 + 0.5 * Math.min(1, rise + 0.4))
  )
}

/**
 * "Sara Presa", written live. The signature is a raster image, so the ink is
 * revealed by a feathered mask that follows a glowing pen tip bobbing along
 * the stroke, a close approximation of handwriting.
 */
function Signature({ delay = 0.5 }: { delay?: number }) {
  const prefersReducedMotion = useReducedMotion()
  const progress = useMotionValue(prefersReducedMotion ? 1 : 0)

  useEffect(() => {
    if (prefersReducedMotion) {
      progress.jump(1)
      return
    }

    const controls = animate(progress, 1, {
      duration: 2.5,
      delay,
      ease: [0.5, 0, 0.3, 1],
    })

    return () => controls.stop()
  }, [delay, prefersReducedMotion, progress])

  const edge = useTransform(progress, [0, 1], [0, 108])
  const mask = useMotionTemplate`linear-gradient(to right, #000 calc(${edge}% - 8%), transparent ${edge}%)`
  const penLeft = useTransform(progress, (value) => `${value * 100}%`)
  const penTop = useTransform(progress, (value) => `${penHeight(value)}%`)
  const penOpacity = useTransform(progress, [0, 0.03, 0.96, 1], [0, 1, 1, 0])

  return (
    // Spans only: this lives inside the page's <h1>, which allows phrasing
    // content. The image alt carries the name for search engines and readers.
    <span className="relative -ml-[8%] block w-[min(78vw,340px)]">
      <m.span
        className="block"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        <Image
          src="/sara-presa-signature.png"
          alt="Sara Presa"
          width={500}
          height={169}
          priority
          className="h-auto w-full"
          style={{ filter: "brightness(2.2) contrast(1.15)" }}
        />
      </m.span>
      <m.span
        aria-hidden="true"
        style={{ left: penLeft, top: penTop, opacity: penOpacity }}
        className="pointer-events-none absolute block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush shadow-[0_0_14px_5px_rgb(232_180_184/0.55)]"
      />
    </span>
  )
}

export { Signature }
