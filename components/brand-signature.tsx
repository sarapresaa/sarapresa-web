"use client"

import { useCallback, useEffect, useLayoutEffect, useRef } from "react"
import { useLenis } from "lenis/react"
import { useTranslations } from "next-intl"

import { Signature } from "@/components/signature"
import { usePathname } from "@/i18n/navigation"

/*
 * The hand-written "Sara Presa" is both the hero's name and the header's logo.
 * It is ONE fixed element: it starts exactly on the invisible #hero-signature
 * slot in the hero, then, as you scroll, glides and shrinks into the left of
 * the header and stays there. Scroll back up and it returns to the hero.
 *
 * Geometry is written straight to the element's style inside the same frame
 * Lenis updates the scroll position, so it can never lag behind the page.
 */

/** Width the signature image is laid out at; everything else is a scale of it. */
const BASE_WIDTH = 340
/** Transparent padding of sara-presa-signature.png, as fractions of its size. */
const INK_LEFT = 0.0796
const INK_WIDTH = 0.864
const INK_CENTER_Y = 0.465
const RATIO = 174 / 515
/** Size of the written name once it sits in the header. */
const DOCK_INK_WIDTH = 112
const HEADER_HEIGHT = 72
/** Scroll distance (px) over which the signature travels, at least. */
const MIN_TRAVEL = 220

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

/** Where the signature sits in the header (matches the header's own padding). */
function dockGeometry() {
  const viewport = document.documentElement.clientWidth
  const inset = viewport >= 768 ? 40 : 24
  const left = Math.max(0, (viewport - 1360) / 2) + inset
  const width = DOCK_INK_WIDTH / INK_WIDTH

  return {
    x: left - INK_LEFT * width,
    y: HEADER_HEIGHT / 2 - INK_CENTER_Y * width * RATIO,
    scale: width / BASE_WIDTH,
  }
}

function BrandSignature() {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  const update = useCallback(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const dock = dockGeometry()
    const slot = document.getElementById("hero-signature")
    let { x, y, scale } = dock
    let progress = 1

    // No hero on this page (e.g. the 404 page): the logo is simply docked.
    if (slot) {
      const rect = slot.getBoundingClientRect()
      const scrolled = window.scrollY
      const travel = Math.max(MIN_TRAVEL, rect.top + scrolled - dock.y)

      progress = clamp(scrolled / travel, 0, 1)

      const eased = easeInOutCubic(progress)

      x = lerp(rect.left, dock.x, eased)
      y = lerp(rect.top, dock.y, eased)
      scale = lerp(rect.width / BASE_WIDTH, dock.scale, eased)
    }

    element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    element.style.opacity = "1"
    // Only clickable once docked, so it never blocks the page mid-flight.
    element.style.pointerEvents = progress > 0.9 ? "auto" : "none"
  }, [])

  // Place it before the first paint, then follow the scroll.
  useLayoutEffect(() => {
    update()
  }, [update, pathname])

  useLenis(update, [update])

  useEffect(() => {
    // Native scrolling (touch) doesn't go through Lenis, and the hero can
    // reflow after fonts or images load, so re-measure on those too.
    const home = document.getElementById("home")
    const observer = new ResizeObserver(() => update())
    const frame = requestAnimationFrame(update)

    if (home) {
      observer.observe(home)
    }

    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    document.fonts?.ready.then(update)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [update, pathname])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[55] origin-top-left opacity-0 will-change-transform"
      style={{ width: BASE_WIDTH }}
    >
      <a href="#home" aria-label={t("home")} className="block">
        <Signature />
      </a>
    </div>
  )
}

export { BrandSignature }
