"use client"

import { useEffect } from "react"

function Spotlight() {
  useEffect(() => {
    function handleMove(event: PointerEvent) {
      if (!(event.target instanceof Element)) {
        return
      }

      const panel = event.target.closest<HTMLElement>("[data-spotlight]")

      if (!panel) {
        return
      }

      const rect = panel.getBoundingClientRect()
      panel.style.setProperty("--mx", `${event.clientX - rect.left}px`)
      panel.style.setProperty("--my", `${event.clientY - rect.top}px`)
    }

    document.addEventListener("pointermove", handleMove, { passive: true })

    return () => document.removeEventListener("pointermove", handleMove)
  }, [])

  return null
}

export { Spotlight }
