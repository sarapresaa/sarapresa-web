import type { ReactNode } from "react"
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "react-email"

import type { Locale } from "@/lib/seo"

import { emailCopy } from "./copy"
import { styles } from "./theme"

export const UNSUBSCRIBE_URL = "{{{RESEND_UNSUBSCRIBE_URL}}}"

const SIGNATURE_PATH = "/sara-presa-signature.png"
const SIGNATURE_WIDTH = 150
const SIGNATURE_HEIGHT = 51

type EmailFrameProps = {
  locale: Locale
  siteUrl: string
  preview: string
  footer: "subscribers" | "transactional" | "contact"
  children: ReactNode
}

export function EmailFrame({
  locale,
  siteUrl,
  preview,
  footer,
  children,
}: EmailFrameProps) {
  const copy = emailCopy.footer[locale]

  return (
    <Html lang={locale}>
      <Head>
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Link href={siteUrl}>
              <Img
                src={`${siteUrl}${SIGNATURE_PATH}`}
                alt="Sara Presa"
                width={SIGNATURE_WIDTH}
                height={SIGNATURE_HEIGHT}
                style={styles.signature}
              />
            </Link>
          </Section>

          <Section style={styles.card}>{children}</Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>{copy[footer]}</Text>
            {footer === "subscribers" ? (
              <Link href={UNSUBSCRIBE_URL} style={styles.footerLink}>
                {copy.unsubscribe}
              </Link>
            ) : null}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
