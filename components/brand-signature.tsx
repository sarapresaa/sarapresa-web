"use client"

import { useCallback, useEffect, useLayoutEffect, useRef } from "react"
import { useLenis } from "lenis/react"
import { useTranslations } from "next-intl"

import { Signature } from "@/components/signature"
import { usePathname } from "@/i18n/navigation"
import { clamp } from "@/lib/utils"

const BASE_WIDTH = 340
const INK_LEFT = 0.0796
const INK_WIDTH = 0.864
const INK_CENTER_Y = 0.465
const HEIGHT_TO_WIDTH = 174 / 515
const DOCK_INK_WIDTH = 112
const HEADER_HEIGHT = 72
const MIN_TRAVEL = 220
const DOCKED_PROGRESS = 0.9
const CONTENT_MAX_WIDTH = 1360
const MD_BREAKPOINT = 768
const HEADER_INSET_MD = 40
const HEADER_INSET_BASE = 24

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function dockGeometry() {
  const viewport = document.documentElement.clientWidth
  const inset = viewport >= MD_BREAKPOINT ? HEADER_INSET_MD : HEADER_INSET_BASE
  const left = Math.max(0, (viewport - CONTENT_MAX_WIDTH) / 2) + inset
  const width = DOCK_INK_WIDTH / INK_WIDTH

  return {
    x: left - INK_LEFT * width,
    y: HEADER_HEIGHT / 2 - INK_CENTER_Y * width * HEIGHT_TO_WIDTH,
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
    element.style.pointerEvents = progress > DOCKED_PROGRESS ? "auto" : "none"
  }, [])

  useLayoutEffect(() => {
    update()
  }, [update, pathname])

  useLenis(update, [update])

  useEffect(() => {
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
