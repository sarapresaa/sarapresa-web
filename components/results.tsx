"use client"

import { useTranslations } from "next-intl"

import { Counter } from "@/components/motion/counter"
import { SectionShell } from "@/components/section-shell"
import { cn } from "@/lib/utils"

type ResultItem = {
  value: string
  label: string
  period: string
}

function Results() {
  const t = useTranslations("results")
  const items = t.raw("items") as ResultItem[]

  return (
    <SectionShell id="results" label={t("label")} heading={t("heading")}>
      <ul className="grid grid-cols-1 border-t border-hairline sm:grid-cols-2">
        {items.map((item, index) => (
          <li
            key={item.label}
            className={cn(
              "border-b border-hairline py-10 sm:py-12",
              index % 2 === 0 ? "sm:pr-8" : "sm:border-l sm:pl-10"
            )}
          >
            <p className="font-display text-[clamp(3.25rem,6vw,5.5rem)] leading-none font-light tracking-[-0.045em] text-paper tabular-nums">
              <Counter value={item.value} />
            </p>
            <p className="mt-5 text-base text-paper">{item.label}</p>
            {item.period ? (
              <p className="mt-1 text-sm text-paper-faint">{item.period}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}

export { Results }
