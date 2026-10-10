import type { ReactNode } from "react"

import { RevealText } from "@/components/motion/reveal-text"
import { Rule } from "@/components/motion/rule"
import { cn } from "@/lib/utils"

type SectionShellProps = {
  id: string
  label: string
  heading: string
  /** Optional short text under the heading, in the left rail. */
  intro?: string
  /** Extra content under the heading in the left rail (e.g. an index). */
  rail?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Shared layout for the content sections: a sticky left rail (what this is)
 * next to the content (the detail), under a hairline that draws itself.
 */
function SectionShell({
  id,
  label,
  heading,
  intro,
  rail,
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("relative px-6 py-24 md:px-10 md:py-36", className)}
    >
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
            {intro ? (
              <p className="mt-6 max-w-sm text-base leading-relaxed text-paper-dim">
                {intro}
              </p>
            ) : null}
            {rail}
          </header>
          <div>{children}</div>
        </div>
      </div>
    </section>
  )
}

export { SectionShell }
