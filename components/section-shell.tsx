import type { ReactNode } from "react"

import { RevealText } from "@/components/motion/reveal-text"
import { Rule } from "@/components/motion/rule"

type SectionShellProps = {
  id: string
  label: string
  heading: string
  rail?: ReactNode
  children: ReactNode
}

function SectionShell({
  id,
  label,
  heading,
  rail,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1280px]">
        <Rule />
        <div className="grid gap-14 pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <header className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm text-paper-dim">{label}</p>
            <RevealText
              as="h2"
              className="mt-5 text-[clamp(2.2rem,3.9vw,3.6rem)]"
            >
              {heading}
            </RevealText>
            {rail}
          </header>
          <div>{children}</div>
        </div>
      </div>
    </section>
  )
}

export { SectionShell }
