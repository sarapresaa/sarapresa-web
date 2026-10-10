"use client"

import { Fragment, useRef } from "react"
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"

type WordProps = {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  floor: number
}

function Word({ children, progress, range, floor }: WordProps) {
  const opacity = useTransform(progress, range, [floor, 1])

  return <m.span style={{ opacity }}>{children}</m.span>
}

type ScrollWordsProps = {
  text: string
  className?: string
  /**
   * Opacity of a word before it is "read". Keep it high enough that unread
   * text still passes contrast: ~0.5 for body text, ~0.4 for large display text.
   */
  floor?: number
}

/**
 * Reading-pace text: each word brightens as the paragraph crosses the
 * viewport, so the copy is "read" by scrolling. Falls back to plain text
 * when the visitor prefers reduced motion.
 */
function ScrollWords({ text, className, floor = 0.5 }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "end 58%"],
  })
  const words = text.split(" ")

  if (prefersReducedMotion) {
    return <p className={className}>{text}</p>
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => {
        const start = index / words.length
        const end = Math.min(1, start + 2 / words.length)

        return (
          <Fragment key={index}>
            <Word progress={scrollYProgress} range={[start, end]} floor={floor}>
              {word}
            </Word>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        )
      })}
    </p>
  )
}

export { ScrollWords }
