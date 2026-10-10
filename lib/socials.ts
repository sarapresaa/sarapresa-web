export type SocialKey =
  "github" | "linkedin" | "instagram" | "tiktok" | "youtube" | "pinterest"

export type Social = {
  name: string
  handle: string
  url: string
}

export const socials: Record<SocialKey, Social> = {
  github: {
    name: "GitHub",
    handle: "@sarapresaa",
    url: "https://github.com/sarapresaa",
  },
  linkedin: {
    name: "LinkedIn",
    handle: "sarapresaa",
    url: "https://www.linkedin.com/in/sarapresaa/",
  },
  instagram: {
    name: "Instagram",
    handle: "@sarapresaa",
    url: "https://www.instagram.com/sarapresaa",
  },
  tiktok: {
    name: "TikTok",
    handle: "@sarapresaa.oficial",
    url: "https://www.tiktok.com/@sarapresaa.oficial",
  },
  youtube: {
    name: "YouTube",
    handle: "@sarapresaa",
    url: "https://www.youtube.com/@sarapresaa",
  },
  pinterest: {
    name: "Pinterest",
    handle: "@sarapresaa",
    url: "https://pt.pinterest.com/sarapresaa/",
  },
}

export const socialList: Social[] = Object.values(socials)
