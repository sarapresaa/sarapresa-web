import en from "@/messages/en.json"
import pt from "@/messages/pt.json"
import {
  ALTERNATE_NAMES,
  EMAIL,
  HREFLANG,
  PORTRAIT_PATH,
  SITE_NAME,
  SITE_URL,
  localeUrl,
  type Locale,
} from "@/lib/seo"
import { socialList } from "@/lib/socials"

const messages = { en, pt }

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`
const PORTRAIT_ID = `${SITE_URL}/#portrait`

const LANGUAGE_CODES = ["pt-PT", "en", "it", "es"]

function stripEmoji(value: string) {
  return value.replace(/[^\p{L}\p{N}\s/&+.-]/gu, "").trim()
}

function buildStructuredData(locale: Locale) {
  const m = messages[locale]
  const pageUrl = localeUrl(locale)

  const knowsAbout = Array.from(
    new Set([
      ...m.about.skills.map(stripEmoji),
      ...m.experience.skillGroups.flatMap((group) => group.items),
    ])
  )

  const portrait = {
    "@type": "ImageObject",
    "@id": PORTRAIT_ID,
    url: `${SITE_URL}${PORTRAIT_PATH}`,
    contentUrl: `${SITE_URL}${PORTRAIT_PATH}`,
    width: 1718,
    height: 2588,
    caption: m.hero.portraitAlt,
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: ALTERNATE_NAMES,
        description: m.meta.description,
        inLanguage: Object.values(HREFLANG),
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profilepage`,
        url: pageUrl,
        name: m.meta.title,
        description: m.meta.description,
        inLanguage: HREFLANG[locale],
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        primaryImageOfPage: { "@id": PORTRAIT_ID },
        dateModified: new Date().toISOString(),
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_NAME,
        givenName: "Sara",
        familyName: "Presa",
        alternateName: ALTERNATE_NAMES,
        url: SITE_URL,
        mainEntityOfPage: { "@id": `${pageUrl}#profilepage` },
        image: portrait,
        email: EMAIL,
        jobTitle: m.meta.jobTitle,
        description: m.meta.description,
        homeLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Aveiro",
            addressCountry: "PT",
          },
        },
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "Universidade de Aveiro",
            url: "https://www.ua.pt",
          },
          {
            "@type": "EducationalOrganization",
            name: "Conservatório de Música de Aveiro Calouste Gulbenkian",
          },
        ],
        knowsLanguage: m.experience.languages.map(
          (_, index) => LANGUAGE_CODES[index]
        ),
        knowsAbout,
        sameAs: socialList.map((social) => social.url),
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#projects`,
        name: m.projects.heading,
        itemListElement: m.projects.items.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: project.title,
            description: project.description,
            url: `${pageUrl}#project-${project.id}`,
            programmingLanguage: project.tags,
            dateCreated: project.year,
            author: { "@id": PERSON_ID },
            ...("link" in project && project.link
              ? { codeRepository: project.link }
              : {}),
          },
        })),
      },
    ],
  }
}

export { buildStructuredData }
