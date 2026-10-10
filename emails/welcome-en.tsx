import { previewSiteUrl } from "./_shared/preview-data"
import { WelcomeEmail } from "./_shared/welcome"

export default function WelcomeEn() {
  return <WelcomeEmail locale="en" siteUrl={previewSiteUrl} />
}
