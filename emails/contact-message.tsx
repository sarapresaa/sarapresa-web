import { ContactMessageEmail } from "./_shared/contact-message"
import { previewSiteUrl } from "./_shared/preview-data"

export default function ContactMessagePreview() {
  return (
    <ContactMessageEmail
      firstName="Maria"
      lastName="Silva"
      email="maria.silva@example.com"
      category="internship"
      message={
        "Olá Sara,\nVi o teu portefólio e gostava de falar contigo sobre uma oportunidade de estágio na nossa equipa.\n\nTens disponibilidade para uma conversa esta semana?"
      }
      senderLocale="pt"
      siteUrl={previewSiteUrl}
    />
  )
}
