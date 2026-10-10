import { ConfirmSubscriptionEmail } from "./_shared/confirm-subscription"
import { previewConfirmUrl, previewSiteUrl } from "./_shared/preview-data"

export default function ConfirmSubscriptionPt() {
  return (
    <ConfirmSubscriptionEmail
      locale="pt"
      confirmUrl={previewConfirmUrl}
      siteUrl={previewSiteUrl}
    />
  )
}
