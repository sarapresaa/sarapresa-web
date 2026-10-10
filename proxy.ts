import createMiddleware from "next-intl/middleware"

import { routing } from "@/i18n/routing"

export default createMiddleware(routing)

export const config = {
  // Skip API routes, static files (anything with a dot) and the generated
  // icon / social-share image routes, so those never take a redirect hop.
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\..*|(?:pt|en)/(?:opengraph-image|icon|apple-icon)).*)",
  ],
}
