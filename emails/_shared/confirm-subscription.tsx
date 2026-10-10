import type { Locale } from "@/lib/seo"

import { ButtonLink, MutedParagraph, Paragraph, TextLink, Title } from "./blocks"
import { emailCopy } from "./copy"
import { EmailFrame } from "./frame"

type ConfirmSubscriptionEmailProps = {
  locale: Locale
  confirmUrl: string
  siteUrl: string
}

export function ConfirmSubscriptionEmail({
  locale,
  confirmUrl,
  siteUrl,
}: ConfirmSubscriptionEmailProps) {
  const copy = emailCopy.confirmation[locale]

  return (
    <EmailFrame
      locale={locale}
      siteUrl={siteUrl}
      preview={copy.preview}
      footer="transactional"
    >
      <Title>{copy.title}</Title>
      <Paragraph>{copy.body}</Paragraph>
      <ButtonLink href={confirmUrl}>{copy.action}</ButtonLink>
      <MutedParagraph>{copy.expiry}</MutedParagraph>
      <MutedParagraph>{copy.ignore}</MutedParagraph>
      <MutedParagraph>
        {copy.fallback} <TextLink href={confirmUrl}>{confirmUrl}</TextLink>
      </MutedParagraph>
    </EmailFrame>
  )
}
