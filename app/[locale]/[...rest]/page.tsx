import { notFound } from "next/navigation"

/**
 * Any unknown path under /pt or /en lands here and renders the branded
 * not-found page (with a real 404 status) instead of Next's default one.
 */
export default function CatchAllPage() {
  notFound()
}
