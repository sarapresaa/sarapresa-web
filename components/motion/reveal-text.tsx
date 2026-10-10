"use client"

import { Fragment } from "react"
import { m, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

type RevealTextProps = {
  children: string
  as?: "h1" | "h2" | "h3" | "p"
  className?: string
  delay?: number
  /** Play on mount (hero) instead of when scrolled into view. */
  immediate?: boolean
}

const wordVariants: Variants = {
  hidden: { y: "112%" },
  visible: {
    y: "0%",
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
  },
}

/**
 * Headline reveal: every word rises out of its own mask, staggered. The text
 * stays real DOM text (selectable, indexable); only the transform animates.
 */
function RevealText({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const words = children.split(" ")

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
  }

  const trigger = immediate
    ? ({ animate: "visible" } as const)
    : ({
        whileInView: "visible",
        viewport: { once: true, margin: "0px 0px -12% 0px" },
      } as const)

  return (
    <Tag className={className}>
      <m.span
        className="inline"
        initial="hidden"
        variants={container}
        {...trigger}
      >
        {words.map((word, index) => (
          <Fragment key={index}>
            <span
              className={cn(
                "inline-block overflow-hidden align-bottom",
                "-mb-[0.16em] pb-[0.16em]"
              )}
            >
              <m.span className="inline-block" variants={wordVariants}>
                {word}
              </m.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </m.span>
    </Tag>
  )
}

export { RevealText }
