import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Portuguese is served at "/", so "/pt" is a duplicate of the same page.
      // Send people and crawlers to the one canonical URL. The generated
      // icon / social-share image routes keep their /pt/... URLs on purpose.
      { source: "/pt", destination: "/", permanent: true },
      {
        source: "/pt/:path((?!opengraph-image|icon|apple-icon).*)",
        destination: "/:path",
        permanent: true,
      },
    ]
  },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
