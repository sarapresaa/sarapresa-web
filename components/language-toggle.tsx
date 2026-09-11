"use client"

import { cn } from "@/lib/utils"

export type Language = "pt" | "en"

function LanguageToggle({
  language,
  onChange,
  className,
}: {
  language: Language
  onChange: (language: Language) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-white/50 uppercase",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange("pt")}
        aria-pressed={language === "pt"}
        className={cn(
          "transition-colors hover:text-white",
          language === "pt" && "text-white"
        )}
      >
        PT
      </button>
      <span className="text-white/25" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => onChange("en")}
        aria-pressed={language === "en"}
        className={cn(
          "transition-colors hover:text-white",
          language === "en" && "text-white"
        )}
      >
        EN
      </button>
    </div>
  )
}

export { LanguageToggle }
