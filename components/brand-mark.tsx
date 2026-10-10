import { cn } from "@/lib/utils"

/**
 * The "SP" monogram: the same mark as the favicon (mauve to rose gradient),
 * so the browser tab and the header read as one brand.
 */
function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-mauve to-rose text-[0.8rem] font-bold tracking-[-0.02em] text-paper shadow-[0_6px_18px_-6px_rgb(196_145_154/0.55)]",
        className
      )}
    >
      SP
    </span>
  )
}

export { BrandMark }
