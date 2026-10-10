# Portefólio de Sara Presa

🇵🇹 Português abaixo · 🇬🇧 [English version below](#-sara-presa-portfolio)

Portefólio pessoal bilingue (PT/EN), construído para a minha candidatura a estágio curricular em Tecnologias da Informação, e também como espaço para mostrar o meu trabalho como criadora de conteúdo.

🌐 **[Visitar o portefólio](https://sarapresaa.pt)**

## Tecnologias

- [Next.js](https://nextjs.org/) 16 (App Router) + [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [next-intl](https://next-intl.dev/): traduções PT/EN
- [Framer Motion](https://www.framer.com/motion/): animações
- [Lenis](https://lenis.darkroom.engineering/): scroll suave

## Conteúdos

- Apresentação pessoal e percurso académico
- Projetos académicos e pessoais
- Formação e certificados
- Resultados como criadora de conteúdo
- Contactos e CV

## Como correr localmente

Pré-requisito: [Node.js](https://nodejs.org/) 22 ou superior.

```bash
npm install
npm run dev
```

O site fica disponível em [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

```bash
npm run dev        # servidor de desenvolvimento
npm run build      # build de produção
npm run start      # corre o build de produção
npm run lint        # verifica erros de código
npm run typecheck   # verifica tipos do TypeScript
npm run format      # formata o código (Prettier)
npm run test        # testes da lógica da newsletter
npm run email:dev   # pré-visualização dos emails em http://localhost:3001
npm run newsletter:draft   # cria o rascunho de uma edição no Resend
```

## Estrutura do projeto

```
app/[locale]/   páginas e layout (português em / e inglês em /en)
components/     componentes React de cada secção do site
emails/         templates dos emails (React Email) e edições da newsletter
i18n/           configuração do next-intl (idiomas suportados, navegação)
lib/            funções auxiliares
lib/contact/    lógica do formulário de contacto
lib/email/      partes partilhadas dos emails (render, validação)
lib/newsletter/ lógica da newsletter (subscrição, confirmação, envio)
messages/       textos do site em PT (pt.json) e EN (en.json)
public/         imagens e outros ficheiros estáticos
scripts/        scripts de linha de comandos (rascunho de edições)
```

## Variáveis de ambiente e SEO

Todas são opcionais e ficam num ficheiro `.env.local` (nunca é enviado para o GitHub) ou nas definições do alojamento:

| Variável | Para que serve |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Endereço público do site (por defeito `https://sarapresaa.pt`). Define-o num deploy de teste para que o canonical, o sitemap e os dados estruturados não apontem para um domínio que ainda não existe. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Código de verificação do Google Search Console. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Código de verificação do Bing Webmaster Tools. |

O SEO técnico já está feito no código: títulos e descrições por idioma, hreflang, dados estruturados (JSON-LD), `sitemap.xml`, `robots.txt`, `llms.txt` e `llms-full.txt`, manifesto e imagem de partilha. Depois de publicar o site:

1. Verificar o site no [Google Search Console](https://search.google.com/search-console) e enviar `https://sarapresaa.pt/sitemap.xml`.
2. Pedir a indexação de `/` (português) e `/en` (inglês) (ferramenta de inspeção de URL).
3. Pôr o link do site na bio do Instagram, TikTok, YouTube, LinkedIn, Pinterest e GitHub, sempre com o mesmo nome (Sara Presa) e `@sarapresaa`.

## Newsletter

A newsletter usa o [Resend](https://resend.com) para guardar os contactos e enviar os emails, e o [React Email](https://react.email) para os templates. A subscrição tem duplo opt-in: o formulário envia um link de confirmação e o contacto só é criado no Resend quando a pessoa o confirma. Os textos de privacidade estão em `/privacy`.

### Configurar o Resend

1. Criar conta e adicionar o domínio de envio, de preferência um subdomínio (por exemplo `news.sarapresaa.pt`), com os registos DNS que o Resend indicar.
2. Criar o Topic **Newsletter** (subscrição por defeito "Opt-in", que não se pode mudar depois) e os segmentos **PT**, **EN** e **Teste**.
3. Criar uma API key, copiar `.env.example` para `.env.local` e preencher os valores. O comando `openssl rand -base64 32` gera o `NEWSLETTER_TOKEN_SECRET`.
4. Personalizar a página de anulação (logo e cores) nas definições do Resend. É para lá que vai o link "Anular subscrição" que cada edição leva no fim.

| Variável | Para que serve |
| --- | --- |
| `RESEND_API_KEY` | Chave da API do Resend. |
| `NEWSLETTER_FROM` | Remetente, por exemplo `Sara Presa <hello@news.sarapresaa.pt>`. |
| `NEWSLETTER_REPLY_TO` | Para onde vão as respostas (por defeito `info@sarapresaa.pt`). |
| `NEWSLETTER_TOPIC_ID` | ID do Topic Newsletter. |
| `NEWSLETTER_SEGMENT_PT`, `NEWSLETTER_SEGMENT_EN` | IDs dos segmentos por língua. Se só escreveres numa língua, usa o mesmo ID nos dois. |
| `NEWSLETTER_SEGMENT_TEST` | ID do segmento de teste, usado pelo script de rascunhos. |
| `NEWSLETTER_TOKEN_SECRET` | Segredo (32 caracteres ou mais) que assina os links de confirmação. |

Em desenvolvimento, confirmar uma subscrição cria um contacto verdadeiro. Aponta `NEWSLETTER_SEGMENT_PT` e `NEWSLETTER_SEGMENT_EN` para o segmento Teste no `.env.local` e usa `delivered@resend.dev` para testar sem enviar emails a sério.

### Ver os emails em localhost

```bash
npm run dev         # site em http://localhost:3000
npm run email:dev   # emails em http://localhost:3001
```

Mantém os dois a correr: a assinatura do cabeçalho é servida pelo site, no endereço de `NEXT_PUBLIC_SITE_URL` (o `.env.local` também é lido pela pré-visualização). Cada ficheiro de `emails/` aparece na lista da pré-visualização, que também mostra a vista móvel, o código HTML e a compatibilidade com os clientes de email.

### Escrever e enviar uma edição

1. Duplicar `emails/issues/000-template`, mudar o nome da pasta (por exemplo `001-primeira-edicao`) e editar `pt.tsx` e `en.tsx`.
2. Ver o resultado na pré-visualização.
3. Criar o rascunho: `npm run newsletter:draft -- --issue 001-primeira-edicao --locale pt`. Por defeito vai para o segmento Teste. Com `--dry-run` só mostra o resultado, sem tocar no Resend.
4. Rever o rascunho em Broadcasts no dashboard do Resend e enviar de lá.
5. Para os subscritores a sério, usar `--target subscribers`, com `NEXT_PUBLIC_SITE_URL` a apontar para o endereço público (o script recusa se for localhost).

## Formulário de contacto

O formulário da secção "Vamos conversar" envia a mensagem para o teu email através do Resend, com o email do visitante em "responder a". A validação é feita no servidor (campos obrigatórios, limites de tamanho, assunto da lista) e há um campo escondido que apanha robôs. Não envia resposta automática ao visitante, para que o formulário não possa ser usado para mandar emails a terceiros.

Funciona com as variáveis que já tens (`RESEND_API_KEY` e `NEWSLETTER_FROM`). As outras são opcionais:

| Variável | Para que serve |
| --- | --- |
| `CONTACT_FROM` | Remetente das mensagens (por defeito, o `NEWSLETTER_FROM`). |
| `CONTACT_TO` | Onde chegam as mensagens (por defeito `info@sarapresaa.pt`). |

Para testar sem escrever na tua caixa de entrada, corre o site com `CONTACT_TO=delivered@resend.dev`, o endereço de teste do Resend. O formulário não guarda histórico de envios, por isso, para travar abusos, cria no Vercel uma regra de limite de pedidos (rate limit) para o site. A pré-visualização do email que recebes está em `emails/contact-message.tsx` (`npm run email:dev`).

## Autora

[Sara Presa](https://github.com/sarapresaa)

## Contactos

🌐 [sarapresaa.pt](https://sarapresaa.pt) · 💼 [LinkedIn](https://www.linkedin.com/in/sarapresaa/) · 💻 [GitHub](https://github.com/sarapresaa) · ✉️ info@sarapresaa.pt

---

# 🇬🇧 Sara Presa: Portfolio

🇬🇧 English · 🇵🇹 [Versão em português acima](#portefólio-de-sara-presa)

Bilingual personal portfolio (PT/EN), built for my application to a curricular internship in Information Technology, and also as a space to showcase my work as a content creator.

🌐 **[Visit the portfolio](https://sarapresaa.pt)**

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router) + [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [next-intl](https://next-intl.dev/): PT/EN translations
- [Framer Motion](https://www.framer.com/motion/): animations
- [Lenis](https://lenis.darkroom.engineering/): smooth scrolling

## Content

- Personal introduction and academic background
- Academic and personal projects
- Education and certificates
- Results as a content creator
- Contact details and CV

## Running locally

Requirement: [Node.js](https://nodejs.org/) 22 or later.

```bash
npm install
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # run the production build
npm run lint        # check for code issues
npm run typecheck   # check TypeScript types
npm run format      # format code (Prettier)
npm run test        # newsletter logic tests
npm run email:dev   # email preview at http://localhost:3001
npm run newsletter:draft   # create an issue draft in Resend
```

## Project structure

```
app/[locale]/   pages and layout (Portuguese at / and English at /en)
components/     React components for each section of the site
emails/         email templates (React Email) and newsletter issues
i18n/           next-intl configuration (supported locales, navigation)
lib/            helper functions
lib/contact/    contact form logic
lib/email/      shared email pieces (rendering, validation)
lib/newsletter/ newsletter logic (subscribing, confirming, sending)
messages/       site copy in PT (pt.json) and EN (en.json)
public/         images and other static files
scripts/        command-line scripts (issue drafts)
```

## Environment variables and SEO

All are optional and live in a `.env.local` file (never committed to GitHub) or in your hosting settings:

| Variable | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public address of the site (defaults to `https://sarapresaa.pt`). Set it on a preview deployment so the canonical link, sitemap and structured data don't point at a domain that isn't live yet. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification code. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools verification code. |

Technical SEO is already handled in code: per-language titles and descriptions, hreflang, structured data (JSON-LD), `sitemap.xml`, `robots.txt`, `llms.txt` and `llms-full.txt`, a web manifest and a social share image. After you publish the site:

1. Verify the site in [Google Search Console](https://search.google.com/search-console) and submit `https://sarapresaa.pt/sitemap.xml`.
2. Request indexing for `/` (Portuguese) and `/en` (English) (URL inspection tool).
3. Put the site link in the bio of Instagram, TikTok, YouTube, LinkedIn, Pinterest and GitHub, always with the same name (Sara Presa) and `@sarapresaa`.

## Newsletter

The newsletter uses [Resend](https://resend.com) to store contacts and send emails, and [React Email](https://react.email) for the templates. Subscribing is double opt-in: the form emails a confirmation link and the contact is only created in Resend once the person confirms it. The privacy details live at `/privacy`.

### Setting up Resend

1. Create an account and add the sending domain, preferably a subdomain (for example `news.sarapresaa.pt`), with the DNS records Resend gives you.
2. Create the **Newsletter** Topic (default subscription "Opt-in", which can't be changed later) and the **PT**, **EN** and **Test** segments.
3. Create an API key, copy `.env.example` to `.env.local` and fill in the values. `openssl rand -base64 32` generates the `NEWSLETTER_TOKEN_SECRET`.
4. Customize the unsubscribe page (logo and colors) in the Resend settings. That is where the "Unsubscribe" link at the bottom of every issue leads.

| Variable | What it does |
| --- | --- |
| `RESEND_API_KEY` | Resend API key. |
| `NEWSLETTER_FROM` | Sender, for example `Sara Presa <hello@news.sarapresaa.pt>`. |
| `NEWSLETTER_REPLY_TO` | Where replies go (defaults to `info@sarapresaa.pt`). |
| `NEWSLETTER_TOPIC_ID` | ID of the Newsletter Topic. |
| `NEWSLETTER_SEGMENT_PT`, `NEWSLETTER_SEGMENT_EN` | Segment IDs per language. If you only write in one language, use the same ID for both. |
| `NEWSLETTER_SEGMENT_TEST` | ID of the test segment, used by the draft script. |
| `NEWSLETTER_TOKEN_SECRET` | Secret (32 characters or more) that signs the confirmation links. |

In development, confirming a subscription creates a real contact. Point `NEWSLETTER_SEGMENT_PT` and `NEWSLETTER_SEGMENT_EN` at the Test segment in `.env.local` and use `delivered@resend.dev` to test without sending real emails.

### Viewing emails on localhost

```bash
npm run dev         # site at http://localhost:3000
npm run email:dev   # emails at http://localhost:3001
```

Keep both running: the header signature is served by the site, at the address in `NEXT_PUBLIC_SITE_URL` (the preview reads `.env.local` too). Every file in `emails/` shows up in the preview list, which also offers a mobile view, the HTML source and email client compatibility checks.

### Writing and sending an issue

1. Duplicate `emails/issues/000-template`, rename the folder (for example `001-first-issue`) and edit `pt.tsx` and `en.tsx`.
2. Check the result in the preview.
3. Create the draft: `npm run newsletter:draft -- --issue 001-first-issue --locale pt`. It goes to the Test segment by default. With `--dry-run` it only shows the result, without touching Resend.
4. Review the draft under Broadcasts in the Resend dashboard and send it from there.
5. For real subscribers, use `--target subscribers`, with `NEXT_PUBLIC_SITE_URL` pointing at the public address (the script refuses if it is localhost).

## Contact form

The form in the "Let's talk" section emails the message to you through Resend, with the visitor's address as "reply to". Validation happens on the server (required fields, length limits, topic from the list) and a hidden field catches bots. It does not send an automatic reply to the visitor, so the form can't be used to email third parties.

It works with the variables you already have (`RESEND_API_KEY` and `NEWSLETTER_FROM`). The others are optional:

| Variable | What it does |
| --- | --- |
| `CONTACT_FROM` | Sender of the messages (defaults to `NEWSLETTER_FROM`). |
| `CONTACT_TO` | Where the messages arrive (defaults to `info@sarapresaa.pt`). |

To test without writing to your inbox, run the site with `CONTACT_TO=delivered@resend.dev`, Resend's test address. The form keeps no send history, so to curb abuse, add a rate limit rule for the site on Vercel. The preview of the email you receive is in `emails/contact-message.tsx` (`npm run email:dev`).

## Author

[Sara Presa](https://github.com/sarapresaa)

## Contact

🌐 [sarapresaa.pt](https://sarapresaa.pt) · 💼 [LinkedIn](https://www.linkedin.com/in/sarapresaa/) · 💻 [GitHub](https://github.com/sarapresaa) · ✉️ info@sarapresaa.pt
