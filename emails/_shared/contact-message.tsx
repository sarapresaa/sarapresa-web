import { Fragment } from "react"

import type { ContactCategory } from "@/lib/contact/constants"
import type { Locale } from "@/lib/seo"

import { Detail, Divider, Label, Quote, TextLink, Title } from "./blocks"
import { emailCopy } from "./copy"
import { EmailFrame } from "./frame"

type ContactMessageEmailProps = {
  firstName: string
  lastName: string
  email: string
  category: ContactCategory
  message: string
  senderLocale: Locale
  siteUrl: string
}

export function ContactMessageEmail({
  firstName,
  lastName,
  email,
  category,
  message,
  senderLocale,
  siteUrl,
}: ContactMessageEmailProps) {
  const copy = emailCopy.contact
  const lines = message.split("\n")

  return (
    <EmailFrame
      locale="pt"
      siteUrl={siteUrl}
      preview={copy.preview}
      footer="contact"
    >
      <Title>{copy.title}</Title>
      <Detail label={copy.sender}>{`${firstName} ${lastName}`}</Detail>
      <Detail label={copy.email}>
        <TextLink href={`mailto:${email}`}>{email}</TextLink>
      </Detail>
      <Detail label={copy.category}>{copy.categories[category]}</Detail>
      <Detail label={copy.language}>{copy.languages[senderLocale]}</Detail>

      <Divider />

      <Label>{copy.message}</Label>
      <Quote>
        {lines.map((line, index) => (
          <Fragment key={`${index}-${line}`}>
            {index > 0 ? <br /> : null}
            {line}
          </Fragment>
        ))}
      </Quote>
    </EmailFrame>
  )
}
