"use client"

import { useEffect, useState } from "react"
import { m, useMotionValue, useSpring } from "framer-motion"

import { useMediaQuery } from "@/lib/use-media-query"

function CustomCursor() {
  const isFinePointer = useMediaQuery("(pointer: fine)")
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const enabled = isFinePointer && !prefersReducedMotion

  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 })

  useEffect(() => {
    if (!enabled) {
      return
    }

    document.documentElement.classList.add("custom-cursor-active")

    function handleMove(event: MouseEvent) {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
    }

    function handleOver(event: MouseEvent) {
      const target = event.target as HTMLElement
      setIsHovering(!!target.closest("a, button"))
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseover", handleOver)

    return () => {
      document.documentElement.classList.remove("custom-cursor-active")
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseover", handleOver)
    }
  }, [enabled, cursorX, cursorY])

  if (!enabled) {
    return null
  }

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-white mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: isHovering ? 48 : 14,
        height: isHovering ? 48 : 14,
        transition: "width 0.25s ease, height 0.25s ease",
      }}
    />
  )
}

export { CustomCursor }
