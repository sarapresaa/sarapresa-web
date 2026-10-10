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

function penHeight(progress: number) {
  const rise =
    Math.exp(-(((progress - 0.07) / 0.07) ** 2)) +
    Math.exp(-(((progress - 0.57) / 0.07) ** 2))

  return (
    58 + 30 * Math.sin(progress * 58) * (0.5 + 0.5 * Math.min(1, rise + 0.4))
  )
}

function Signature() {
  const prefersReducedMotion = useReducedMotion()
  const progress = useMotionValue(prefersReducedMotion ? 1 : 0)

  useEffect(() => {
    if (prefersReducedMotion) {
      progress.jump(1)
      return
    }

    const controls = animate(progress, 1, {
      duration: 2.5,
      delay: 0.5,
      ease: [0.5, 0, 0.3, 1],
    })

    return () => controls.stop()
  }, [prefersReducedMotion, progress])

  const edge = useTransform(progress, [0, 1], [0, 108])
  const mask = useMotionTemplate`linear-gradient(to right, #000 calc(${edge}% - 8%), transparent ${edge}%)`
  const penLeft = useTransform(progress, (value) => `${value * 100}%`)
  const penTop = useTransform(progress, (value) => `${penHeight(value)}%`)
  const penOpacity = useTransform(progress, [0, 0.03, 0.96, 1], [0, 1, 1, 0])

  return (
    <span className="relative block w-full">
      <m.span
        className="block"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        <Image
          src="/sara-presa-signature.png"
          alt=""
          width={515}
          height={174}
          priority
          sizes="340px"
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
