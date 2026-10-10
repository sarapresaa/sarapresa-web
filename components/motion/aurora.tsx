"use client"

import { m, useScroll, useTransform } from "framer-motion"

/**
 * Page-long glow in the brand palette. It sits behind every section, so the
 * mauve / rose / blush identity carries past the hero instead of stopping
 * at the first screen. Blobs drift with scroll; nothing re-renders.
 */
function Aurora() {
  const { scrollYProgress } = useScroll()
  const roseY = useTransform(scrollYProgress, [0, 1], ["8vh", "-55vh"])
  const mauveY = useTransform(scrollYProgress, [0, 1], ["60vh", "-30vh"])
  const blushX = useTransform(scrollYProgress, [0, 1], ["0vw", "-18vw"])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <m.div
        style={{ y: roseY }}
        className="absolute -top-[10%] -right-[18%] size-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgb(196_145_154/0.2),transparent)]"
      />
      <m.div
        style={{ y: mauveY }}
        className="absolute top-0 -left-[22%] size-[64vmax] rounded-full bg-[radial-gradient(closest-side,rgb(125_92_107/0.26),transparent)]"
      />
      <m.div
        style={{ x: blushX }}
        className="absolute -bottom-[25%] left-[30%] size-[56vmax] rounded-full bg-[radial-gradient(closest-side,rgb(232_180_184/0.1),transparent)]"
      />
    </div>
  )
}

export { Aurora }
