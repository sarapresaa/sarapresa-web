"use client"

import { useEffect, useRef } from "react"
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion"

type ParsedValue = {
  prefix: string
  number: number
  decimals: number
  separator: string
  suffix: string
}

function parseValue(value: string): ParsedValue {
  const match = value.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/)

  if (!match) {
    return { prefix: "", number: 0, decimals: 0, separator: ".", suffix: value }
  }

  const [, prefix, raw, suffix] = match
  const separator = raw.includes(",") ? "," : "."
  const decimals = raw.includes(separator) ? raw.split(separator)[1].length : 0

  return {
    prefix,
    number: Number(raw.replace(",", ".")),
    decimals,
    separator,
    suffix,
  }
}

function format(parsed: ParsedValue, current: number) {
  const text = current.toFixed(parsed.decimals).replace(".", parsed.separator)

  return `${parsed.prefix}${text}${parsed.suffix}`
}

function Counter({ value }: { value: string }) {
  const parsed = parseValue(value)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" })
  const count = useMotionValue(parsed.number)
  const text = useTransform(count, (current) => format(parsed, current))

  useMotionValueEvent(text, "change", (latest) => {
    if (ref.current) {
      ref.current.textContent = latest
    }
  })

  useEffect(() => {
    if (!isInView) {
      return
    }

    count.jump(0)
    const controls = animate(count, parsed.number, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    })

    return () => controls.stop()
  }, [isInView, count, parsed.number])

  return <span ref={ref}>{format(parsed, parsed.number)}</span>
}

export { Counter }
