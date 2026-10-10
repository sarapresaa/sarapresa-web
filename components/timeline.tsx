"use client"

import { useRef } from "react"
import { m, useScroll, useSpring, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"

import { SectionShell } from "@/components/section-shell"

type TimelineItem = {
  year: string
  note: string
  title: string
  description: string
}

function TimelineEntry({ item }: { item: TimelineItem }) {
  const ref = useRef<HTMLLIElement>(null)
  // 0 while the entry is still below the reading line, 1 once it has reached it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "start 52%"],
  })
  // Only the large year dims: large text stays above 3:1 contrast even
  // before the entry is reached, and the readable text never fades.
  const yearOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 1])
  const dotScale = useTransform(scrollYProgress, [0, 1], [0.6, 1])
  const dotFill = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgb(232 180 184 / 0)", "rgb(232 180 184 / 1)"]
  )

  return (
    <li ref={ref} className="relative pb-16 pl-9 last:pb-0 md:pl-12">
      <m.span
        aria-hidden="true"
        style={{ scale: dotScale, backgroundColor: dotFill }}
        className="absolute top-[0.9rem] -left-[5px] size-[11px] rounded-full border border-blush"
      />
      <div className="grid gap-x-8 gap-y-2 md:grid-cols-[8.5rem_minmax(0,1fr)]">
        <div>
          <m.p
            style={{ opacity: yearOpacity }}
            className="font-display text-[2.25rem] leading-none font-light tracking-[-0.04em] text-paper tabular-nums md:text-[2.6rem]"
          >
            {item.year}
          </m.p>
          <p className="mt-1.5 text-sm text-paper-faint">{item.note}</p>
        </div>
        <div>
          <h3 className="font-display text-[1.35rem] leading-tight md:text-[1.6rem]">
            {item.title}
          </h3>
          <p className="mt-3 max-w-[34em] text-[0.9375rem] leading-[1.75] text-paper-dim">
            {item.description}
          </p>
        </div>
      </div>
    </li>
  )
}

function Timeline() {
  const t = useTranslations("timeline")
  const items = t.raw("items") as TimelineItem[]
  const listRef = useRef<HTMLOListElement>(null)

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 55%"],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <SectionShell id="journey" label={t("label")} heading={t("heading")}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute top-3 bottom-3 left-0 w-px bg-hairline-strong"
        />
        <m.div
          aria-hidden="true"
          style={{ scaleY: fill }}
          className="absolute top-3 bottom-3 left-0 w-px origin-top bg-gradient-to-b from-mauve via-rose to-blush"
        />
        <ol ref={listRef} className="relative">
          {items.map((item) => (
            <TimelineEntry key={item.year + item.title} item={item} />
          ))}
        </ol>
      </div>
    </SectionShell>
  )
}

export { Timeline }
