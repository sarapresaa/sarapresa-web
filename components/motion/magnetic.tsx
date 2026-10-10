"use client"

import {
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react"
import { m, useMotionValue, useSpring } from "framer-motion"

type MagneticProps = {
  children: ReactNode
  strength?: number
}

function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 })

  function handleMove(event: ReactPointerEvent<HTMLDivElement>) {
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
      className="inline-block"
    >
      {children}
    </m.div>
  )
}

export { Magnetic }
