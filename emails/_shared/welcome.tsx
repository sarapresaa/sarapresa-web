import type { Locale } from "@/lib/seo"

import { ButtonLink, MutedParagraph, Paragraph, Title } from "./blocks"
import { emailCopy } from "./copy"
import { EmailFrame } from "./frame"

type WelcomeEmailProps = {
  locale: Locale
  siteUrl: string
}

export function WelcomeEmail({ locale, siteUrl }: WelcomeEmailProps) {
  const copy = emailCopy.welcome[locale]

  return (
    <EmailFrame
      locale={locale}
      siteUrl={siteUrl}
      preview={copy.preview}
      footer="transactional"
    >
      <Title>{copy.title}</Title>
      <Paragraph>{copy.body}</Paragraph>
      <ButtonLink href={siteUrl}>{copy.action}</ButtonLink>
      <MutedParagraph>{copy.reply}</MutedParagraph>
    </EmailFrame>
  )
}
