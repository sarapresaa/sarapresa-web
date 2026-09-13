"use client"

import { motion, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"

const platformStyles: Record<string, { background: string; color: string }> =
  {
    Instagram: { background: "#E1306C20", color: "#E1306C" },
    TikTok: { background: "rgba(255,255,255,0.1)", color: "white" },
    YouTube: { background: "#FF000020", color: "#FF0000" },
  }

const testimonials = [
  {
    name: "@norberto_presa",
    initials: "NP",
    platform: "Instagram",
    comment: "Não há nada como seguir os sonhos e fazer o que se gosta ❤️",
    avatarColor: "#7d5c6b",
  },
  {
    name: "@giovannescaa",
    initials: "GI",
    platform: "Instagram",
    comment: "OMG não sabia que cantavas assim 😍😍",
    avatarColor: "#c4919a",
  },
  {
    name: "@cardooso.sj",
    initials: "CS",
    platform: "Instagram",
    comment: "Ameiii, incrível mesmo, continua ehhehe 😍 ❤️",
    avatarColor: "#3d3a4e",
  },
  {
    name: "@alicercaalves",
    initials: "AA",
    platform: "Instagram",
    comment: "Lindooooo continua 🔥🔥",
    avatarColor: "#7d5c6b",
  },
  {
    name: "@julianaleitew",
    initials: "JL",
    platform: "Instagram",
    comment: "aiiiii que linda!!!!! 🥹🤝",
    avatarColor: "#c4919a",
  },
  {
    name: "nicole ☆",
    initials: "NI",
    platform: "TikTok",
    comment: "girl, u ARE PRETTY",
    avatarColor: "#3d3a4e",
  },
  {
    name: "@geirinhas0811",
    initials: "GE",
    platform: "TikTok",
    comment: "Ayoooo, continua que está espetacular!!",
    avatarColor: "#7d5c6b",
  },
  {
    name: "Constança Caixinha",
    initials: "CC",
    platform: "TikTok",
    comment: "Incrível! Continua! ✨",
    avatarColor: "#c4919a",
  },
  {
    name: "Rita Gameiro",
    initials: "RG",
    platform: "TikTok",
    comment: "Adoro 🥹🥹🥹🥹🥹💗💗💗💗💗",
    avatarColor: "#3d3a4e",
  },
  {
    name: "@SantiagoSantos-wo4jo",
    initials: "SS",
    platform: "YouTube",
    comment:
      "Que video incrível 🔥🔥🔥 Tu consegues Sara tamos todos aqui para ti ❤️",
    avatarColor: "#7d5c6b",
  },
  {
    name: "@CarolinaCorreia-x7n",
    initials: "CC",
    platform: "YouTube",
    comment:
      "Força Sara, tu consegues oque quiseres! Estamos todos a apoiar-te! ❤️",
    avatarColor: "#c4919a",
  },
  {
    name: "Pipa",
    initials: "PI",
    platform: "TikTok",
    comment: "adorei ver o teu vídeo. Muita sorte para tudo sara! beijinhos ❤️🤝",
    avatarColor: "#3d3a4e",
  },
] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Community() {
  const t = useTranslations("community")

  return (
    <section id="community" className="bg-[#0f0d14] px-6 py-[120px] md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          variants={fadeUp}
          className="text-center text-xs font-medium tracking-[0.2em] text-white/50 uppercase"
        >
          {t("label")}
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.1}
          variants={fadeUp}
          className="mt-4 text-center text-3xl font-medium text-white sm:text-4xl md:text-5xl"
        >
          {t("heading")}
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.2}
          variants={fadeUp}
          className="mx-auto mt-4 max-w-xl text-center text-sm text-white/50 sm:text-base"
        >
          {t("subtext")}
        </motion.p>

        <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {testimonials.map((item, index) => {
            const platform = platformStyles[item.platform]

            return (
              <motion.div
                key={`${item.name}-${index}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={0.1 + index * 0.05}
                variants={fadeUp}
                className="testimonial-card mb-4 break-inside-avoid"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: item.avatarColor }}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <div
                      className="font-bold text-white"
                      style={{ fontSize: "14px" }}
                    >
                      {item.name}
                    </div>
                    <span
                      className="mt-1 inline-block rounded-full"
                      style={{
                        background: platform.background,
                        color: platform.color,
                        padding: "2px 10px",
                        fontSize: "11px",
                      }}
                    >
                      {item.platform}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  {item.comment}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.2 + testimonials.length * 0.05 + 0.1}
          variants={fadeUp}
          className="mt-12 text-center text-xs text-white/30"
        >
          {t("note")}
        </motion.p>
      </div>
    </section>
  )
}

export { Community }
