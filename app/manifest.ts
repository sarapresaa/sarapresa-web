import type { MetadataRoute } from "next"

import pt from "@/messages/pt.json"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Sara Presa",
    short_name: "Sara Presa",
    description: pt.meta.description,
    lang: "pt-PT",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#120e18",
    theme_color: "#120e18",
    categories: ["portfolio", "lifestyle"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
