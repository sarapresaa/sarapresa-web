# Portefólio de Sara Presa

🇵🇹 Português abaixo · 🇬🇧 [English version below](#-sara-presa-portfolio)

Portefólio pessoal bilingue (PT/EN), construído para a minha candidatura a estágio curricular em Tecnologias da Informação, e também como espaço para mostrar o meu trabalho como criadora de conteúdo.

🌐 **[Visitar o portefólio](https://sarapresaa.pt)**

## Tecnologias

- [Next.js](https://nextjs.org/) 16 (App Router) + [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [next-intl](https://next-intl.dev/) — traduções PT/EN
- [Framer Motion](https://www.framer.com/motion/) — animações
- [Lenis](https://lenis.darkroom.engineering/) — scroll suave

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
app/[locale]/   páginas e layout (uma rota por idioma: /pt e /en)
components/     componentes React de cada secção do site
i18n/           configuração do next-intl (idiomas suportados, navegação)
lib/            funções auxiliares
messages/       textos do site em PT (pt.json) e EN (en.json)
public/         imagens e outros ficheiros estáticos
```

## Variáveis de ambiente

Este projeto ainda não precisa de nenhuma variável de ambiente. Quando a newsletter for ligada a um serviço de envio de emails, essa configuração (chave de API) vai ficar num ficheiro `.env.local` (nunca é enviado para o GitHub) — este README será atualizado nessa altura com o nome exato da variável e onde a obter.

## Autora

[Sara Presa](https://github.com/sarapresaa)

## Contactos

🌐 [sarapresaa.pt](https://sarapresaa.pt) · 💼 [LinkedIn](https://www.linkedin.com/in/sarapresaa/) · 💻 [GitHub](https://github.com/sarapresaa) · ✉️ info@sarapresaa.pt

---

# 🇬🇧 Sara Presa — Portfolio

🇬🇧 English · 🇵🇹 [Versão em português acima](#portefólio-de-sara-presa)

Bilingual personal portfolio (PT/EN), built for my application to a curricular internship in Information Technology, and also as a space to showcase my work as a content creator.

🌐 **[Visit the portfolio](https://sarapresaa.pt)**

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router) + [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [next-intl](https://next-intl.dev/) — PT/EN translations
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Lenis](https://lenis.darkroom.engineering/) — smooth scrolling

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
app/[locale]/   pages and layout (one route per language: /pt and /en)
components/     React components for each section of the site
i18n/           next-intl configuration (supported locales, navigation)
lib/            helper functions
messages/       site copy in PT (pt.json) and EN (en.json)
public/         images and other static files
```

## Environment variables

This project doesn't need any environment variables yet. Once the newsletter form is connected to a real email service, that configuration (an API key) will live in a `.env.local` file (never committed to GitHub) — this README will be updated at that point with the exact variable name and where to get it.

## Author

[Sara Presa](https://github.com/sarapresaa)

## Contact

🌐 [sarapresaa.pt](https://sarapresaa.pt) · 💼 [LinkedIn](https://www.linkedin.com/in/sarapresaa/) · 💻 [GitHub](https://github.com/sarapresaa) · ✉️ info@sarapresaa.pt
