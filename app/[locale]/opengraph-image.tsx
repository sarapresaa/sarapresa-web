import { ImageResponse } from "next/og"
import { getTranslations } from "next-intl/server"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "hero" })

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #3d3a4e 0%, #7d5c6b 45%, #c4919a 100%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-2px",
          }}
        >
          Sara Presa
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
            maxWidth: 900,
            display: "flex",
          }}
        >
          {t("subtitle")}
        </div>
      </div>
    ),
    { ...size }
  )
}
