import type { ComponentType } from "react"

export type IssueProps = { siteUrl: string }

export type IssueModule = {
  subject: string
  previewText: string
  default: ComponentType<IssueProps>
}
