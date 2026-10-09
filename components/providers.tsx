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
            lerp: 0.1,
            duration: 1.2,
            smoothWheel: true,
            anchors: true,
          }}
        >
          {children}
        </ReactLenis>
      </MotionConfig>
    </LazyMotion>
  )
}

export { Providers }
