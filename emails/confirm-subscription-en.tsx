import { ConfirmSubscriptionEmail } from "./_shared/confirm-subscription"
import { previewConfirmUrl, previewSiteUrl } from "./_shared/preview-data"

export default function ConfirmSubscriptionEn() {
  return (
    <ConfirmSubscriptionEmail
      locale="en"
      confirmUrl={previewConfirmUrl}
      siteUrl={previewSiteUrl}
    />
  )
}
