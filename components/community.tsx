"use client"

import { useTranslations } from "next-intl"

import { RevealText } from "@/components/motion/reveal-text"
import { Rule } from "@/components/motion/rule"
import { cn } from "@/lib/utils"

type Comment = {
  name: string
  platform: "Instagram" | "TikTok" | "YouTube"
  comment: string
}

// Real comments, kept in the language they were written in.
const comments: Comment[] = [
  {
    name: "@norberto_presa",
    platform: "Instagram",
    comment: "Não há nada como seguir os sonhos e fazer o que se gosta ❤️",
  },
  {
    name: "@giovannescaa",
    platform: "Instagram",
    comment: "OMG não sabia que cantavas assim 😍😍",
  },
  {
    name: "@cardooso.sj",
    platform: "Instagram",
    comment: "Ameiii, incrível mesmo, continua ehhehe 😍 ❤️",
  },
  {
    name: "@alicercaalves",
    platform: "Instagram",
    comment: "Lindooooo continua 🔥🔥",
  },
  {
    name: "@julianaleitew",
    platform: "Instagram",
    comment: "aiiiii que linda!!!!! 🥹🤝",
  },
  { name: "nicole ☆", platform: "TikTok", comment: "girl, u ARE PRETTY" },
  {
    name: "@geirinhas0811",
    platform: "TikTok",
    comment: "Ayoooo, continua que está espetacular!!",
  },
  {
    name: "Constança Caixinha",
    platform: "TikTok",
    comment: "Incrível! Continua! ✨",
  },
  {
    name: "Rita Gameiro",
    platform: "TikTok",
    comment: "Adoro 🥹🥹🥹🥹🥹💗💗💗💗💗",
  },
  {
    name: "@SantiagoSantos-wo4jo",
    platform: "YouTube",
    comment:
      "Que video incrível 🔥🔥🔥 Tu consegues Sara tamos todos aqui para ti ❤️",
  },
  {
    name: "@CarolinaCorreia-x7n",
    platform: "YouTube",
    comment:
      "Força Sara, tu consegues oque quiseres! Estamos todos a apoiar-te! ❤️",
  },
  {
    name: "Pipa",
    platform: "TikTok",
    comment:
      "adorei ver o teu vídeo. Muita sorte para tudo sara! beijinhos ❤️🤝",
  },
]

const avatarStyles = [
  "from-mauve to-rose text-paper",
  "from-slate to-mauve text-paper",
  "from-rose to-blush text-ink",
]

const rows = [comments.slice(0, 6), comments.slice(6)]

function initials(name: string) {
  return name.replace(/^@/, "").slice(0, 2).toUpperCase()
}

function CommentCard({ item, index }: { item: Comment; index: number }) {
  return (
    <li className="w-[min(78vw,21rem)] shrink-0 rounded-2xl border border-hairline bg-ink-raised/60 p-5">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-medium",
            avatarStyles[index % avatarStyles.length]
          )}
        >
          {initials(item.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-paper">{item.name}</p>
          <p className="text-xs text-paper-faint">{item.platform}</p>
        </div>
      </div>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-paper-dim">
        {item.comment}
      </p>
    </li>
  )
}

function MarqueeRow({
  items,
  reverse,
  duration,
  offset,
}: {
  items: Comment[]
  reverse?: boolean
  duration: string
  offset: number
}) {
  return (
    <div className="marquee marquee-mask overflow-hidden">
      <div
        className="marquee-track"
        data-direction={reverse ? "reverse" : undefined}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {[false, true].map((isCopy) => (
          <ul
            key={String(isCopy)}
            aria-hidden={isCopy || undefined}
            className="flex shrink-0 gap-4"
          >
            {items.map((item, index) => (
              <CommentCard key={item.name} item={item} index={index + offset} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

function Community() {
  const t = useTranslations("community")

  return (
    <section id="community" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1360px] px-6 md:px-10">
        <Rule />
        <div className="grid gap-8 pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <p className="text-sm text-paper-dim">{t("label")}</p>
            <RevealText
              as="h2"
              className="mt-5 text-[clamp(2.2rem,3.9vw,3.6rem)]"
            >
              {t("heading")}
            </RevealText>
          </div>
          <p className="max-w-md self-end text-base leading-relaxed text-paper-dim lg:justify-self-end">
            {t("subtext")}
          </p>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-4">
        <MarqueeRow items={rows[0]} duration="75s" offset={0} />
        <MarqueeRow items={rows[1]} duration="90s" offset={1} reverse />
      </div>

      <p className="mx-auto mt-10 max-w-[1360px] px-6 text-xs text-paper-faint md:px-10">
        {t("note")}
      </p>
    </section>
  )
}

export { Community }
