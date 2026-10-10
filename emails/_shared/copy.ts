export const emailCopy = {
  confirmation: {
    pt: {
      subject: "Confirma a tua subscrição",
      preview: "Falta só um clique para entrares na newsletter.",
      title: "Confirma a tua subscrição",
      body: "Pediste para receber a minha newsletter com projetos, bastidores e vídeos novos. Confirma o teu email para ficar tudo pronto.",
      action: "Confirmar subscrição",
      expiry: "Este link é válido durante 48 horas.",
      ignore: "Se não foste tu, ignora este email e não vais receber nada.",
      fallback: "Se o botão não funcionar, copia este link para o browser:",
    },
    en: {
      subject: "Confirm your subscription",
      preview: "One click left to join the newsletter.",
      title: "Confirm your subscription",
      body: "You asked to receive my newsletter with projects, behind the scenes and new videos. Confirm your email and you're all set.",
      action: "Confirm subscription",
      expiry: "This link is valid for 48 hours.",
      ignore:
        "If this wasn't you, ignore this email and you won't receive anything.",
      fallback: "If the button doesn't work, copy this link into your browser:",
    },
  },
  welcome: {
    pt: {
      subject: "Subscrição confirmada",
      preview: "Estás dentro. Aqui vai o que podes esperar.",
      title: "Estás dentro.",
      body: "A tua subscrição está confirmada. De vez em quando envio projetos, bastidores e vídeos novos, sem spam.",
      reply: "Se quiseres dizer olá, é só responder a este email.",
      leave:
        "Podes anular a subscrição quando quiseres, no link que vai no fim de cada edição.",
      action: "Visitar o site",
    },
    en: {
      subject: "Subscription confirmed",
      preview: "You're in. Here's what to expect.",
      title: "You're in.",
      body: "Your subscription is confirmed. Every now and then I'll send projects, behind the scenes and new videos, no spam.",
      reply: "If you want to say hi, just reply to this email.",
      leave:
        "You can unsubscribe whenever you like, with the link at the bottom of every issue.",
      action: "Visit the site",
    },
  },
  contact: {
    preview: "Mensagem recebida pelo formulário de contacto do site.",
    title: "Nova mensagem",
    sender: "De",
    email: "Email",
    category: "Assunto",
    language: "Língua do site",
    message: "Mensagem",
    subject: "Contacto",
    languages: {
      pt: "Português",
      en: "Inglês",
    },
    categories: {
      internship: "Estágio ou emprego",
      collaboration: "Colaboração ou parceria",
      project: "Projeto web ou freelance",
      question: "Pergunta ou feedback",
      other: "Outro assunto",
    },
  },
  footer: {
    pt: {
      subscribers:
        "Recebes este email porque subscreveste a newsletter da Sara Presa.",
      transactional:
        "Enviado por Sara Presa. Recebeste este email porque foi pedida uma subscrição com este endereço.",
      contact:
        "Mensagem enviada pelo formulário de contacto do site. Responde a este email para falar diretamente com quem escreveu.",
      unsubscribe: "Anular subscrição",
    },
    en: {
      subscribers:
        "You're receiving this email because you subscribed to Sara Presa's newsletter.",
      transactional:
        "Sent by Sara Presa. You received this email because a subscription was requested with this address.",
      contact:
        "Message sent through the site's contact form. Reply to this email to talk directly to the person who wrote.",
      unsubscribe: "Unsubscribe",
    },
  },
} as const
