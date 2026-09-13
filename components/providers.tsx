"use client"

import type { ReactNode } from "react"
import { ReactLenis } from "lenis/react"

function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}

export { Providers }
