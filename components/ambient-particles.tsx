"use client"

import { m } from "framer-motion"

import { useHasMounted } from "@/lib/use-has-mounted"
import { useMediaQuery } from "@/lib/use-media-query"

const PARTICLE_COUNT = 18
const COLORS = ["#7d5c6b", "#c4919a", "#e8b4b8"]

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000
  return x - Math.floor(x)
}

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: seededRandom(i * 2 + 1) * 100,
  size: 2 + seededRandom(i * 2 + 2) * 4,
  color: COLORS[i % COLORS.length],
  duration: 18 + seededRandom(i * 3 + 1) * 14,
  delay: -(seededRandom(i * 3 + 2) * 20),
  driftX: (seededRandom(i * 3 + 3) - 0.5) * 60,
}))

function AmbientParticles() {
  const hasMounted = useHasMounted()
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  if (!hasMounted || prefersReducedMotion) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {particles.map((particle) => (
        <m.span
          key={particle.id}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: 0.5,
          }}
          initial={{ y: "110vh" }}
          animate={{ y: "-10vh", x: [0, particle.driftX, 0] }}
          transition={{
            y: {
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            },
            x: {
              duration: particle.duration / 2,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </div>
  )
}

export { AmbientParticles }
