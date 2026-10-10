import type { CSSProperties } from "react"

export const colors = {
  ink: "#120e18",
  inkRaised: "#1a1423",
  rose: "#c4919a",
  blush: "#e8b4b8",
  paper: "#f6edef",
  paperDim: "#bcadb4",
  paperFaint: "#8f808a",
  hairline: "#2a2430",
} as const

export const fontFamily =
  '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

export const styles = {
  body: {
    margin: 0,
    padding: "32px 0",
    backgroundColor: colors.ink,
    color: colors.paper,
    fontFamily,
  },
  container: {
    maxWidth: "560px",
    margin: "0 auto",
    padding: "0 20px",
  },
  header: {
    padding: "8px 4px 24px",
  },
  signature: {
    display: "block",
    border: 0,
    color: colors.paper,
    fontSize: "15px",
    fontWeight: 600,
  },
  card: {
    padding: "36px 32px",
    backgroundColor: colors.inkRaised,
    border: `1px solid ${colors.hairline}`,
    borderRadius: "24px",
  },
  label: {
    margin: "0 0 12px",
    color: colors.blush,
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    margin: "0 0 16px",
    color: colors.paper,
    fontSize: "30px",
    fontWeight: 600,
    letterSpacing: "-0.03em",
    lineHeight: "1.15",
  },
  paragraph: {
    margin: "0 0 20px",
    color: colors.paperDim,
    fontSize: "16px",
    lineHeight: "1.65",
  },
  muted: {
    margin: "0 0 12px",
    color: colors.paperFaint,
    fontSize: "14px",
    lineHeight: "1.6",
  },
  action: {
    margin: "8px 0 28px",
  },
  button: {
    padding: "14px 28px",
    backgroundColor: colors.paper,
    borderRadius: "999px",
    color: colors.ink,
    fontSize: "15px",
    fontWeight: 600,
    textDecoration: "none",
  },
  link: {
    color: colors.blush,
    wordBreak: "break-all",
  },
  divider: {
    margin: "28px 0",
    border: 0,
    borderTop: `1px solid ${colors.hairline}`,
  },
  footer: {
    padding: "24px 4px 0",
  },
  footerText: {
    margin: "0 0 8px",
    color: colors.paperFaint,
    fontSize: "13px",
    lineHeight: "1.6",
  },
  footerLink: {
    color: colors.paperDim,
    fontSize: "13px",
    textDecoration: "underline",
  },
} satisfies Record<string, CSSProperties>
