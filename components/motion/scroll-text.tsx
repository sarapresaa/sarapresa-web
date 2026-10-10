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

export type ScrollTextBlock = {
  text: string
  className: string
  /**
   * Opacity of a word before it is "read". Keep it high enough that unread
   * text still passes contrast: ~0.5 for body text, ~0.4 for large display text.
   */
  floor: number
}

/** Where the reading line sits, as a fraction of the viewport height. */
const READ_LINE = 0.64
/**
 * Distance (px) of scroll over which ONE word fades from dim to lit. Kept
 * small so words light up one after another (about three at a time).
 */
const FEATHER = 14

type MeasuredWord = {
  element: HTMLElement
  floor: number
  /**
   * Where this word crosses the reading line, in px from the top of the
   * block: its line's top plus its position along the line, so every word
   * has its own spot and words light up strictly in reading order.
   */
  offset: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Text that lights up as you read it, word by word. ONE reading line crosses
 * the whole block and every word has its own spot on it: each word above the
 * line is lit, each below is dim, so the lit front moves through the text one
 * word after another in order (a paragraph can never be brighter than the
 * paragraph above it, and a line never lights up all at once). Words are measured relative to the
 * block, so layout shifts above it can't desync the effect, and opacity is
 * written straight to the DOM in the same frame Lenis scrolls.
 *
 * Without JS (or with reduced motion) all text is simply fully visible.
 */
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
            // Distance between two lines of this paragraph.
            pitch: parseFloat(getComputedStyle(paragraph).lineHeight) || 24,
          }
          paragraphs.set(paragraph, info)
        }

        const rect = element.getBoundingClientRect()
        const along = clamp((rect.left - info.left) / info.width, 0, 1)

        return {
          element,
          floor: Number(element.dataset.floor),
          // A word's slot spans one line pitch from its start to its end of
          // line, so the next line's first word comes right after this one's
          // last: strictly one word after another, never a whole line at once.
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
    const line = window.innerHeight * READ_LINE

    for (const word of wordsRef.current) {
      const y = top + word.offset
      const lit = clamp((line - y) / FEATHER, 0, 1)
      const opacity = String(
        Math.round((word.floor + (1 - word.floor) * lit) * 100) / 100
      )

      // Only words inside the fade band actually change from frame to frame.
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

    // Native (touch) scrolling bypasses Lenis; fonts and resizes reflow text.
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
