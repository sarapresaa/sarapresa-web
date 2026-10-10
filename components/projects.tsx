"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { m, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"

import { ProjectArt } from "@/components/art/project-art"
import { SectionShell } from "@/components/section-shell"
import { cn } from "@/lib/utils"

type ProjectItem = {
  id: string
  title: string
  kind: string
  year: string
  description: string
  role: string
  tags: string[]
  link?: string
}

/*
 * Real screenshots win over the illustrated covers. To add one, drop the file
 * in /public/projects and map the project id to its path, e.g.
 *   mensora: "/projects/mensora.png"
 */
const screenshots: Partial<Record<string, string>> = {}

const GITHUB_URL = "https://github.com/sarapresaa"

function ProjectPanel({ item }: { item: ProjectItem }) {
  const t = useTranslations("projects")
  const coverRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])
  const screenshot = screenshots[item.id]

  return (
    <article
      id={`project-${item.id}`}
      data-project={item.id}
      data-spotlight
      className="group scroll-mt-28 rounded-[1.75rem] border border-hairline bg-ink-raised/50 p-3 md:p-4"
    >
      <div
        ref={coverRef}
        className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]"
      >
        <m.div
          style={{ y }}
          className="absolute inset-x-0 -inset-y-[6%] transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.04]"
        >
          {screenshot ? (
            <Image
              src={screenshot}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <ProjectArt id={item.id} className="size-full" />
          )}
        </m.div>
      </div>

      <div className="grid gap-5 px-2 pt-7 pb-3 md:px-4 md:pt-8 md:pb-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="text-[clamp(1.6rem,2.3vw,2.1rem)]">{item.title}</h3>
          <p className="text-sm text-paper-faint">
            {item.kind}, {item.year}
          </p>
        </div>

        <p className="max-w-[36em] text-base leading-relaxed text-paper-dim">
          {item.description}
        </p>

        {item.role ? (
          <p className="max-w-[36em] text-sm leading-relaxed text-paper-dim">
            <span className="text-paper">{t("roleLabel")}.</span> {item.role}
          </p>
        ) : null}

        <ul className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-hairline-strong px-2.5 py-1 font-mono text-xs text-paper-dim"
            >
              {tag}
            </li>
          ))}
        </ul>

        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex w-fit items-center gap-2 text-sm text-paper"
          >
            <span className="link-sweep pb-0.5">{t("linkLabel")}</span>
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={16}
              strokeWidth={2}
              className="transition-transform duration-500 ease-out-expo group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
        ) : null}
      </div>
    </article>
  )
}

function Projects() {
  const t = useTranslations("projects")
  const items = t.raw("items") as ProjectItem[]
  const [activeId, setActiveId] = useState(items[0]?.id ?? "")
  const listRef = useRef<HTMLDivElement>(null)

  // The index in the rail follows whichever project crosses mid-screen.
  useEffect(() => {
    const panels =
      listRef.current?.querySelectorAll<HTMLElement>("[data-project]")

    if (!panels) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.project

          if (entry.isIntersecting && id) {
            setActiveId(id)
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    )

    panels.forEach((panel) => observer.observe(panel))

    return () => observer.disconnect()
  }, [])

  return (
    <SectionShell
      id="projects"
      label={t("label")}
      heading={t("heading")}
      rail={
        <ul className="mt-12 hidden lg:block">
          {items.map((item) => {
            const isActive = item.id === activeId

            return (
              <li key={item.id}>
                <a
                  href={`#project-${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-baseline justify-between gap-4 border-t border-hairline py-4 text-[0.95rem] transition-colors duration-500",
                    isActive
                      ? "text-paper"
                      : "text-paper-faint hover:text-paper-dim"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-px bg-blush transition-[width] duration-500 ease-out-expo",
                        isActive ? "w-8" : "w-0"
                      )}
                    />
                    {item.title}
                  </span>
                  <span className="tabular-nums">{item.year}</span>
                </a>
              </li>
            )
          })}
        </ul>
      }
    >
      <div ref={listRef} className="flex flex-col gap-10 md:gap-16">
        {items.map((item) => (
          <ProjectPanel key={item.id} item={item} />
        ))}
      </div>

      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-12 inline-flex items-center gap-2 rounded-full border border-hairline-strong px-6 py-3 text-sm text-paper transition-colors duration-300 hover:border-paper/50 hover:bg-paper/5"
      >
        {t("moreLabel")}
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          size={16}
          strokeWidth={2}
          className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </SectionShell>
  )
}

export { Projects }
