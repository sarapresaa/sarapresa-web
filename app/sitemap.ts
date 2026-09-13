import type { MetadataRoute } from "next"

const BASE_URL = "https://sarapresaa.pt"

export default function sitemap(): MetadataRoute.Sitemap {
  return ["pt", "en"].map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
  }))
}
