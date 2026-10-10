"use client"

import { m } from "framer-motion"

function Rule() {
  return (
    <m.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="h-px origin-left bg-hairline-strong"
    />
  )
}

export { Rule }
