import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
