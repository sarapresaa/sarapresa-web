import type { ReactNode } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { AlertCircleIcon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

function focusOnMount(node: HTMLElement | null) {
  node?.focus()
}

type FormCardProps = {
  titleId: string
  icon: IconSvgElement
  title: string
  focusTitle?: boolean
  children: ReactNode
}

function FormCard({
  titleId,
  icon,
  title,
  focusTitle = false,
  children,
}: FormCardProps) {
  return (
    <section
      aria-labelledby={titleId}
      className="rounded-3xl bg-gradient-to-br from-blush from-45% to-rose p-6 text-ink md:p-8"
    >
      <span className="grid size-12 place-items-center rounded-full bg-ink text-blush">
        <HugeiconsIcon icon={icon} size={22} strokeWidth={1.8} />
      </span>

      <h3
        id={titleId}
        ref={focusTitle ? focusOnMount : undefined}
        tabIndex={focusTitle ? -1 : undefined}
        className="mt-6 max-w-xl text-[clamp(1.5rem,2.8vw,2rem)] leading-[1.15] font-semibold tracking-[-0.03em] text-ink outline-none"
      >
        {title}
      </h3>

      {children}
    </section>
  )
}

type FieldErrorProps = {
  id: string
  alert?: boolean
  className?: string
  children: ReactNode
}

function FieldError({
  id,
  alert = false,
  className,
  children,
}: FieldErrorProps) {
  return (
    <p
      id={id}
      role={alert ? "alert" : undefined}
      className={cn("flex items-start gap-2 text-sm font-semibold", className)}
    >
      <HugeiconsIcon
        icon={AlertCircleIcon}
        size={18}
        strokeWidth={2}
        className="mt-px shrink-0"
      />
      {children}
    </p>
  )
}

export { FieldError, FormCard }
