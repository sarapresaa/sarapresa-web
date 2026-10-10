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

Pré-requisito: [Node.js](https://nodejs.org/) 20 ou superior.

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
```

## Estrutura do projeto

```
app/[locale]/   páginas e layout (português em / e inglês em /en)
components/     componentes React de cada secção do site
i18n/           configuração do next-intl (idiomas suportados, navegação)
lib/            funções auxiliares
messages/       textos do site em PT (pt.json) e EN (en.json)
public/         imagens e outros ficheiros estáticos
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

Requirement: [Node.js](https://nodejs.org/) 20 or later.

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
```

## Project structure

```
app/[locale]/   pages and layout (Portuguese at / and English at /en)
components/     React components for each section of the site
i18n/           next-intl configuration (supported locales, navigation)
lib/            helper functions
messages/       site copy in PT (pt.json) and EN (en.json)
public/         images and other static files
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

## Author

[Sara Presa](https://github.com/sarapresaa)

## Contact

🌐 [sarapresaa.pt](https://sarapresaa.pt) · 💼 [LinkedIn](https://www.linkedin.com/in/sarapresaa/) · 💻 [GitHub](https://github.com/sarapresaa) · ✉️ info@sarapresaa.pt
