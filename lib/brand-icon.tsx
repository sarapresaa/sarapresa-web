import { ImageResponse } from "next/og"

/** The "SP" monogram as a square PNG, for the web manifest's app icons. */
function brandIcon(size: number) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #7d5c6b, #c4919a)",
        color: "white",
        fontSize: size * 0.4,
        fontWeight: 700,
        letterSpacing: -size * 0.012,
      }}
    >
      SP
    </div>,
    { width: size, height: size }
  )
}

export { brandIcon }
