import { localePath, type Locale } from "@/lib/seo"

type ConfirmationUrlInput = {
  baseUrl: string
  locale: Locale
  token: string
}

export function confirmationUrl({
  baseUrl,
  locale,
  token,
}: ConfirmationUrlInput) {
  const url = new URL(localePath(locale, "/newsletter/confirm"), baseUrl)
  url.searchParams.set("token", token)

  return url.toString()
}
