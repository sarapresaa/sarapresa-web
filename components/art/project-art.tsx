"use client"

import type { ReactNode } from "react"
import { m, useReducedMotion } from "framer-motion"

type ArtProps = { className?: string }

const draw = {
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true, margin: "0px 0px -15% 0px" },
} as const

function Frame({
  id,
  from,
  to,
  className,
  children,
}: {
  id: string
  from: string
  to: string
  className?: string
  children: ReactNode
}) {
  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill={`url(#${id}-bg)`} />
      {children}
    </svg>
  )
}

function MensoraArt({ className }: ArtProps) {
  const bars = [88, 132, 104, 164, 122, 190, 148, 176, 112]

  return (
    <Frame id="mensora" from="#3d3a4e" to="#7d5c6b" className={className}>
      <circle cx="540" cy="70" r="150" className="fill-blush/10" />
      <rect
        x="56"
        y="52"
        width="528"
        height="296"
        rx="22"
        className="fill-ink/70 stroke-paper/15"
      />
      <text x="84" y="92" className="fill-paper-dim font-sans text-[13px]">
        kWh
      </text>

      {bars.map((height, index) => (
        <m.rect
          key={index}
          x={86 + index * 30}
          y={318 - height}
          width="18"
          height={height}
          rx="6"
          className="fill-rose/55"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{
            duration: 1,
            delay: index * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ originY: 1 }}
        />
      ))}
      <m.path
        d="M95 232 C 125 196, 150 214, 185 178 S 245 130, 275 156 S 335 100, 365 120"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        className="stroke-blush"
        {...draw}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <circle cx="365" cy="120" r="6" className="fill-blush" />
      <circle cx="365" cy="120" r="14" className="fill-blush/25" />

      <circle
        cx="486"
        cy="124"
        r="42"
        fill="none"
        strokeWidth="9"
        className="stroke-paper/10"
      />
      <m.circle
        cx="486"
        cy="124"
        r="42"
        fill="none"
        strokeWidth="9"
        strokeLinecap="round"
        className="stroke-blush"
        transform="rotate(-90 486 124)"
        {...draw}
        whileInView={{ pathLength: 0.7 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <path
        d="M489 108 L477 128 L486 128 L483 142 L496 120 L487 120 Z"
        className="fill-paper"
      />

      {[0, 1, 2].map((row) => (
        <g key={row} transform={`translate(430 ${210 + row * 40})`}>
          <rect
            width="56"
            height="26"
            rx="13"
            className={row === 0 ? "fill-rose" : "fill-paper/12"}
          />
          <circle
            cx={row === 0 ? 43 : 13}
            cy="13"
            r="9"
            className="fill-paper"
          />
          <rect
            x="68"
            y="9"
            width="48"
            height="8"
            rx="4"
            className="fill-paper/20"
          />
        </g>
      ))}
    </Frame>
  )
}

function SigArt({ className }: ArtProps) {
  return (
    <Frame id="sig" from="#241d2e" to="#3d3a4e" className={className}>
      <path
        d="M-20 290 C 120 250, 200 330, 330 280 S 560 230, 680 270"
        fill="none"
        strokeWidth="34"
        className="stroke-mauve/35"
      />
      <ellipse cx="520" cy="96" rx="82" ry="46" className="fill-rose/12" />
      <ellipse cx="96" cy="120" rx="64" ry="38" className="fill-rose/10" />

      <g fill="none" strokeWidth="2" className="stroke-paper/14">
        <path d="M0 80 H640 M0 168 H640 M0 360 H640" />
        <path d="M110 0 V400 M250 0 V400 M392 0 V400 M540 0 V400" />
        <path d="M0 40 L300 400 M120 0 L520 400" />
      </g>

      <m.path
        d="M142 330 C 142 240, 250 250, 250 168 S 392 150, 392 96 S 470 70, 540 80"
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-blush"
        {...draw}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <circle cx="142" cy="330" r="11" className="fill-paper" />
      <circle cx="142" cy="330" r="22" className="fill-paper/20" />
      <path
        d="M540 40 C 520 40, 508 54, 508 70 C 508 92, 540 118, 540 118 C 540 118, 572 92, 572 70 C 572 54, 560 40, 540 40 Z"
        className="fill-rose"
      />
      <circle cx="540" cy="70" r="11" className="fill-ink" />

      {[
        [250, 168],
        [392, 250],
        [110, 168],
      ].map(([x, y], index) => (
        <g key={index} transform={`translate(${x} ${y})`}>
          <circle r="16" className="fill-ink-raised stroke-blush/60" />
          <path
            d="M-6 0 H6 M0 -6 V6"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="stroke-blush"
          />
        </g>
      ))}

      <rect
        x="36"
        y="32"
        width="248"
        height="44"
        rx="22"
        className="fill-ink/80 stroke-paper/20"
      />
      <circle
        cx="64"
        cy="54"
        r="8"
        fill="none"
        strokeWidth="2"
        className="stroke-paper-dim"
      />
      <path
        d="M70 60 L78 68"
        strokeWidth="2"
        strokeLinecap="round"
        className="stroke-paper-dim"
      />
      <rect
        x="92"
        y="49"
        width="110"
        height="9"
        rx="4.5"
        className="fill-paper/25"
      />

      <rect
        x="392"
        y="296"
        width="212"
        height="76"
        rx="18"
        className="fill-ink/80 stroke-paper/20"
      />
      <rect
        x="412"
        y="316"
        width="120"
        height="9"
        rx="4.5"
        className="fill-paper/40"
      />
      <rect
        x="412"
        y="338"
        width="84"
        height="8"
        rx="4"
        className="fill-paper/20"
      />
      <rect
        x="548"
        y="318"
        width="38"
        height="28"
        rx="14"
        className="fill-rose"
      />
    </Frame>
  )
}

function BingoArt({ className }: ArtProps) {
  const prefersReducedMotion = useReducedMotion()
  const marked = new Set([1, 6, 8, 12, 14, 17, 21, 23])
  const letters = ["B", "I", "N", "G", "O"]

  return (
    <Frame id="bingo" from="#7d5c6b" to="#241d2e" className={className}>
      <g transform="translate(64 52)">
        <rect
          width="272"
          height="296"
          rx="22"
          className="fill-ink/75 stroke-paper/15"
        />
        {letters.map((letter, index) => (
          <text
            key={letter}
            x={36 + index * 50}
            y="44"
            textAnchor="middle"
            className="fill-blush font-display text-[24px]"
          >
            {letter}
          </text>
        ))}
        {Array.from({ length: 25 }, (_, index) => {
          const column = index % 5
          const row = Math.floor(index / 5)
          const isMarked = marked.has(index)

          return (
            <g
              key={index}
              transform={`translate(${14 + column * 50} ${62 + row * 46})`}
            >
              <rect
                width="44"
                height="40"
                rx="10"
                className={isMarked ? "fill-rose" : "fill-paper/8"}
              />
              {isMarked ? (
                <circle cx="22" cy="20" r="9" className="fill-ink/40" />
              ) : (
                <rect
                  x="14"
                  y="17"
                  width="16"
                  height="6"
                  rx="3"
                  className="fill-paper/20"
                />
              )}
            </g>
          )
        })}
      </g>

      <g
        fill="none"
        strokeWidth="2"
        strokeDasharray="5 7"
        className="stroke-blush/60"
      >
        <path d="M468 200 L552 108" />
        <path d="M468 200 L560 200" />
        <path d="M468 200 L552 292" />
      </g>
      <m.circle
        r="5"
        className="fill-blush"
        cx={468}
        cy={200}
        initial={{ x: 84, y: -92 }}
        whileInView={
          prefersReducedMotion ? undefined : { x: [84, 0], y: [-92, 0] }
        }
        viewport={{ once: false }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.circle
        r="5"
        className="fill-blush"
        cx={468}
        cy={200}
        initial={{ x: 46 }}
        whileInView={prefersReducedMotion ? undefined : { x: [0, 92] }}
        viewport={{ once: false }}
        transition={{
          duration: 2.4,
          delay: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <rect
        x="408"
        y="160"
        width="76"
        height="80"
        rx="16"
        className="fill-ink/80 stroke-blush/50"
      />
      <rect
        x="424"
        y="178"
        width="44"
        height="8"
        rx="4"
        className="fill-paper/45"
      />
      <rect
        x="424"
        y="196"
        width="44"
        height="8"
        rx="4"
        className="fill-paper/25"
      />
      <circle cx="446" cy="222" r="4" className="fill-rose" />

      {[
        [552, 108],
        [560, 200],
        [552, 292],
      ].map(([x, y], index) => (
        <g key={index} transform={`translate(${x} ${y})`}>
          <circle r="22" className="fill-ink-raised stroke-paper/25" />
          <circle r="7" className="fill-rose" />
        </g>
      ))}
      <text x="408" y="272" className="fill-paper-dim font-mono text-[12px]">
        TCP
      </text>
    </Frame>
  )
}

function PortfolioArt({ className }: ArtProps) {
  return (
    <Frame id="portfolio" from="#3d3a4e" to="#c4919a" className={className}>
      <rect
        x="64"
        y="44"
        width="512"
        height="312"
        rx="20"
        className="fill-ink/85 stroke-paper/20"
      />
      <circle cx="94" cy="72" r="5" className="fill-paper/30" />
      <circle cx="112" cy="72" r="5" className="fill-paper/30" />
      <circle cx="130" cy="72" r="5" className="fill-paper/30" />
      <path d="M64 92 H576" className="stroke-paper/12" />

      <m.path
        d="M104 168 C 112 140, 134 134, 128 156 C 122 178, 98 186, 112 200 C 126 214, 146 190, 156 176 C 150 190, 156 200, 168 190 C 178 180, 178 168, 190 168 C 200 168, 196 188, 214 178"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-paper"
        {...draw}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      />

      <rect
        x="104"
        y="226"
        width="206"
        height="14"
        rx="7"
        className="fill-paper/80"
      />
      <rect
        x="104"
        y="250"
        width="160"
        height="14"
        rx="7"
        className="fill-paper/80"
      />
      <rect
        x="104"
        y="286"
        width="118"
        height="8"
        rx="4"
        className="fill-paper/30"
      />
      <rect
        x="104"
        y="312"
        width="86"
        height="26"
        rx="13"
        className="fill-blush"
      />

      <defs>
        <linearGradient id="portfolio-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8b4b8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7d5c6b" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M380 338 V196 C 380 150, 410 120, 444 120 C 478 120, 508 150, 508 196 V338 Z"
        fill="url(#portfolio-arch)"
      />
      <path
        d="M392 346 V204 C 392 164, 418 138, 448 138"
        fill="none"
        strokeWidth="1.5"
        className="stroke-blush/50"
      />
    </Frame>
  )
}

const artById = {
  mensora: MensoraArt,
  sig: SigArt,
  bingo: BingoArt,
  portfolio: PortfolioArt,
} as const

type ProjectArtProps = ArtProps & { id: string }

function ProjectArt({ id, className }: ProjectArtProps) {
  const Art = artById[id as keyof typeof artById]

  return Art ? <Art className={className} /> : null
}

export { ProjectArt }
