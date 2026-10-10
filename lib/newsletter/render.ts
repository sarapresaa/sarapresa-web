import type { ReactElement } from "react"
import { render } from "react-email"

export async function renderEmail(email: ReactElement) {
  const [html, text] = await Promise.all([
    render(email),
    render(email, { plainText: true }),
  ])

  return { html, text }
}
