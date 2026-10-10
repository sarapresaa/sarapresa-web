"use client"

import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"
import { useReducedMotion } from "framer-motion"
import { useLenis } from "lenis/react"

import { clamp } from "@/lib/utils"

type ScrollTextBlock = {
  text: string
  className: string
  floor: number
}

type MeasuredWord = {
  element: HTMLElement
  floor: number
  offset: number
}

const READ_LINE_RATIO = 0.64
const FEATHER_PX = 14
const FALLBACK_LINE_HEIGHT_PX = 24

function ScrollText({
  blocks,
  className,
}: {
  blocks: ScrollTextBlock[]
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<MeasuredWord[]>([])

  const measure = useCallback(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const box = container.getBoundingClientRect()
    const paragraphs = new Map<
      Element,
      { left: number; width: number; pitch: number }
    >()

    wordsRef.current = Array.from(
      container.querySelectorAll<HTMLElement>("[data-word]"),
      (element) => {
        const paragraph = element.closest("p") ?? container
        let info = paragraphs.get(paragraph)

        if (!info) {
          const rect = paragraph.getBoundingClientRect()

          info = {
            left: rect.left,
            width: rect.width,
            pitch:
              parseFloat(getComputedStyle(paragraph).lineHeight) ||
              FALLBACK_LINE_HEIGHT_PX,
          }
          paragraphs.set(paragraph, info)
        }

        const rect = element.getBoundingClientRect()
        const along = clamp((rect.left - info.left) / info.width, 0, 1)

        return {
          element,
          floor: Number(element.dataset.floor),
          offset: rect.top - box.top + along * info.pitch,
        }
      }
    )
  }, [])

  const update = useCallback(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const top = container.getBoundingClientRect().top
    const line = window.innerHeight * READ_LINE_RATIO

    for (const word of wordsRef.current) {
      const y = top + word.offset
      const lit = clamp((line - y) / FEATHER_PX, 0, 1)
      const opacity = String(
        Math.round((word.floor + (1 - word.floor) * lit) * 100) / 100
      )

      if (word.element.style.opacity !== opacity) {
        word.element.style.setProperty("opacity", opacity)
      }
    }
  }, [])

  const remeasure = useCallback(() => {
    measure()
    update()
  }, [measure, update])

  useLayoutEffect(() => {
    if (!prefersReducedMotion) {
      remeasure()
    }
  }, [prefersReducedMotion, remeasure])

  useLenis(() => {
    if (!prefersReducedMotion) {
      update()
    }
  }, [prefersReducedMotion, update])

  useEffect(() => {
    const container = containerRef.current

    if (prefersReducedMotion || !container) {
      return
    }

    const observer = new ResizeObserver(remeasure)

    observer.observe(container)
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", remeasure)
    document.fonts?.ready.then(remeasure)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", remeasure)
    }
  }, [prefersReducedMotion, remeasure, update])

  return (
    <div ref={containerRef} className={className}>
      {blocks.map((block, blockIndex) => {
        const words = block.text.split(" ")

        return (
          <p key={blockIndex} className={block.className}>
            {words.map((word, index) => (
              <Fragment key={index}>
                <span data-word data-floor={block.floor}>
                  {word}
                </span>
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}

export { ScrollText }
