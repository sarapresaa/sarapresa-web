import type { ReactNode } from "react"
import { Button, Heading, Hr, Link, Section, Text } from "react-email"

import { styles } from "./theme"

type BlockProps = { children: ReactNode }

export function Label({ children }: BlockProps) {
  return <Text style={styles.label}>{children}</Text>
}

export function Title({ children }: BlockProps) {
  return (
    <Heading as="h1" style={styles.title}>
      {children}
    </Heading>
  )
}

export function Paragraph({ children }: BlockProps) {
  return <Text style={styles.paragraph}>{children}</Text>
}

export function MutedParagraph({ children }: BlockProps) {
  return <Text style={styles.muted}>{children}</Text>
}

export function ButtonLink({ href, children }: BlockProps & { href: string }) {
  return (
    <Section style={styles.action}>
      <Button href={href} style={styles.button}>
        {children}
      </Button>
    </Section>
  )
}

export function TextLink({ href, children }: BlockProps & { href: string }) {
  return (
    <Link href={href} style={styles.link}>
      {children}
    </Link>
  )
}

export function Detail({ label, children }: BlockProps & { label: string }) {
  return (
    <>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{children}</Text>
    </>
  )
}

export function Quote({ children }: BlockProps) {
  return <Text style={styles.quote}>{children}</Text>
}

export function Divider() {
  return <Hr style={styles.divider} />
}
