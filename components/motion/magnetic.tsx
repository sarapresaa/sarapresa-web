"use client"

import { useRef, type ReactNode } from "react"
import { m, useMotionValue, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

type MagneticProps = {
  children: ReactNode
  className?: string
  /** How far the element follows the pointer (0 to 1). */
  strength?: number
}

/** Pulls its child toward the mouse pointer. Mouse only; touch is untouched. */
function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 })

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !ref.current) {
      return
    }

    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <m.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn("inline-block", className)}
    >
      {children}
    </m.div>
  )
}

export { Magnetic }
