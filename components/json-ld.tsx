import type { Locale } from "@/lib/seo"
import { buildStructuredData } from "@/lib/structured-data"

/** Renders the page's schema.org graph as a JSON-LD script tag. */
function JsonLd({ locale }: { locale: Locale }) {
  // "<" is escaped so no string in the data can ever close the script tag.
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
