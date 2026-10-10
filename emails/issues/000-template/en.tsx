import {
  ButtonLink,
  Divider,
  Label,
  Paragraph,
  Title,
} from "../../_shared/blocks"
import { EmailFrame } from "../../_shared/frame"
import type { IssueProps } from "../../_shared/issue"
import { previewSiteUrl } from "../../_shared/preview-data"

export const subject = "Issue title"

export const previewText = "A line that shows next to the subject in the inbox."

export default function Issue({ siteUrl }: IssueProps) {
  return (
    <EmailFrame
      locale="en"
      siteUrl={siteUrl}
      preview={previewText}
      footer="subscribers"
    >
      <Label>Issue 000</Label>
      <Title>{subject}</Title>
      <Paragraph>
        This is a template. Duplicate this folder, change the number and the
        text, and write your first issue.
      </Paragraph>

      <Divider />

      <Label>New video</Label>
      <Paragraph>
        Introduce the main piece of the issue here: the new video, the project
        or the most important news.
      </Paragraph>
      <ButtonLink href={siteUrl}>Watch now</ButtonLink>

      <Divider />

      <Label>In the making</Label>
      <Paragraph>
        A short note about what you are preparing, so people look forward to the
        next issue.
      </Paragraph>
      <Paragraph>Until next time, Sara</Paragraph>
    </EmailFrame>
  )
}

Issue.PreviewProps = { siteUrl: previewSiteUrl } satisfies IssueProps
