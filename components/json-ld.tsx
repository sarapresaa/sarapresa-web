import type { Locale } from "@/lib/seo"
import { buildStructuredData } from "@/lib/structured-data"

function JsonLd({ locale }: { locale: Locale }) {
  const json = JSON.stringify(buildStructuredData(locale)).replace(
    /</g,
    "\\u003c"
  )

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}

export { JsonLd }
