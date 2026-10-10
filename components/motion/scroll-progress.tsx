"use client"

import { m, useScroll, useSpring } from "framer-motion"

/** Hairline reading-progress bar pinned to the top of the viewport. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-mauve via-rose to-blush"
    />
  )
}

export { ScrollProgress }
