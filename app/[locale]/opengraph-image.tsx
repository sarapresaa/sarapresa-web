import { readFile } from "node:fs/promises"
import path from "node:path"

import { ImageResponse } from "next/og"
import { getTranslations } from "next-intl/server"

import { PORTRAIT_PATH, SITE_NAME } from "@/lib/seo"

export const alt = "Sara Presa (@sarapresaa), influencer and content creator"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

let portrait: Promise<string> | undefined

function loadPortrait() {
  portrait ??= readFile(
    path.join(process.cwd(), "public", PORTRAIT_PATH.slice(1))
  ).then((file) => `data:image/jpeg;base64,${file.toString("base64")}`)

  return portrait
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta" })
  const hero = await getTranslations({ locale, namespace: "hero" })
  const photo = await loadPortrait()

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 88px 0 80px",
        color: "#f6edef",
        background:
          "radial-gradient(circle at 82% 38%, rgba(196,145,154,0.55), rgba(18,14,24,0) 52%), radial-gradient(circle at 12% 90%, rgba(125,92,107,0.6), rgba(18,14,24,0) 50%), #120e18",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#e8b4b8",
            marginBottom: 22,
          }}
        >
          @sarapresaa
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 118,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -4,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 42,
            fontWeight: 600,
            lineHeight: 1.15,
          }}
        >
          {t("jobTitle")}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 27,
            lineHeight: 1.35,
            color: "#bcadb4",
          }}
        >
          {hero("location")}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 6,
            fontSize: 27,
            color: "#e8b4b8",
          }}
        >
          sarapresaa.pt
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: 380,
          height: 510,
          borderRadius: "190px 190px 28px 28px",
          overflow: "hidden",
          border: "3px solid rgba(232,180,184,0.55)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt=""
          width={380}
          height={510}
          style={{ objectFit: "cover", objectPosition: "50% 8%" }}
        />
      </div>
    </div>,
    { ...size }
  )
}
