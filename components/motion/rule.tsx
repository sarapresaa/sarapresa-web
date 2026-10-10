"use client"

import { m } from "framer-motion"

import { cn } from "@/lib/utils"

/** A hairline divider that draws itself left to right when it comes into view. */
function Rule({ className }: { className?: string }) {
  return (
    <m.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn("h-px origin-left bg-hairline-strong", className)}
    />
  )
}

export { Rule }
