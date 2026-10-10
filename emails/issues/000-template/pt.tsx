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

export const subject = "Título da edição"

export const previewText =
  "Uma linha que aparece ao lado do assunto na caixa de entrada."

export default function Issue({ siteUrl }: IssueProps) {
  return (
    <EmailFrame
      locale="pt"
      siteUrl={siteUrl}
      preview={previewText}
      footer="subscribers"
    >
      <Label>Edição 000</Label>
      <Title>{subject}</Title>
      <Paragraph>
        Isto é um modelo. Duplica esta pasta, muda o número e o texto, e
        escreve a tua primeira edição.
      </Paragraph>

      <Divider />

      <Label>Novo vídeo</Label>
      <Paragraph>
        Apresenta aqui o conteúdo principal da edição: o vídeo novo, o projeto
        ou a novidade mais importante.
      </Paragraph>
      <ButtonLink href={siteUrl}>Ver agora</ButtonLink>

      <Divider />

      <Label>A construir</Label>
      <Paragraph>
        Uma nota curta sobre o que estás a preparar, para dar vontade de voltar
        na próxima edição.
      </Paragraph>
      <Paragraph>Até à próxima, Sara</Paragraph>
    </EmailFrame>
  )
}

Issue.PreviewProps = { siteUrl: previewSiteUrl } satisfies IssueProps
