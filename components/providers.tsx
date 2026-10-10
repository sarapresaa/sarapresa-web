"use client"

import type { ReactNode } from "react"
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion"
import { ReactLenis } from "lenis/react"

function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <ReactLenis
          root
          options={{
            lerp: 0.09,
            smoothWheel: true,
            // Same-page links glide, and land below the floating nav.
            anchors: { offset: -72, duration: 1.4 },
          }}
        >
          {children}
        </ReactLenis>
      </MotionConfig>
    </LazyMotion>
  )
}

export { Providers }
