import { previewSiteUrl } from "./_shared/preview-data"
import { WelcomeEmail } from "./_shared/welcome"

export default function WelcomePt() {
  return <WelcomeEmail locale="pt" siteUrl={previewSiteUrl} />
}
