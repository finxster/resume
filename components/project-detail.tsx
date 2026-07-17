"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, Cloud, ExternalLink, FileText, Github, ImageIcon, Laptop, X, type LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLang, tx, type Lang } from "@/lib/i18n"
import { getDict } from "@/lib/dictionary"
import { getProject, type Deployment, type ProjectStatus, type Project } from "@/lib/projects"
import { LlmIcon, TechIcon, llmMeta } from "@/components/brand-icon"
import { cn } from "@/lib/utils"

const statusStyles: Record<ProjectStatus, string> = {
  active: "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  paused: "text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10",
  sunset: "text-muted-foreground border-border bg-muted",
}

// name === undefined => a local project (label comes from the dictionary).
const deploymentMeta: Record<Deployment, { name?: string; icon: LucideIcon }> = {
  "cloudflare-pages": { name: "Cloudflare Pages", icon: Cloud },
  "cloudflare-workers": { name: "Cloudflare Workers", icon: Cloud },
  "github-pages": { name: "GitHub Pages", icon: Github },
  replit: { name: "Replit", icon: Cloud },
  aws: { name: "AWS", icon: Cloud },
  local: { icon: Laptop },
}

export default function ProjectDetail({ slug }: { slug: string }) {
  const { lang } = useLang()
  const dict = getDict(lang)
  const t = dict.projectsSection
  const project = getProject(slug)
  if (!project) return null

  const statusLabel = {
    active: t.statusActive,
    paused: t.statusPaused,
    sunset: t.statusSunset,
  }[project.status]

  const period =
    project.end === undefined
      ? `${project.start} — ${dict.timeline.now}`
      : project.end === project.start
        ? `${project.start}`
        : `${project.start} — ${project.end}`

  return (
    <main className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-12 md:py-20 max-w-4xl">
        <Link
          href="/#projects"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" /> {t.backToProjects}
        </Link>

        <div className="flex items-start gap-5 mb-6">
          {project.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.logo} alt="" className="h-16 w-16 rounded-2xl object-contain border bg-card p-2" />
          ) : (
            <div className="h-16 w-16 shrink-0 rounded-2xl border bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground">
              {project.name.slice(0, 2)}
            </div>
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">{project.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-medium", statusStyles[project.status])}>
                {statusLabel}
              </span>
              <span className="text-muted-foreground tabular-nums">{period}</span>
              {project.deployment && (() => {
                const dep = deploymentMeta[project.deployment]
                const Icon = dep.icon
                return (
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />
                    {dep.name ? `${t.hostedOn} ${dep.name}` : t.runsLocally}
                  </span>
                )
              })()}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground md:text-lg leading-relaxed mb-8">{tx(project.description, lang)}</p>

        <div className="flex flex-wrap gap-3 mb-12">
          {project.link && (
            <Button asChild>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                {t.viewProject} <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          {project.github && (
            <Button variant="outline" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> {t.viewCode} <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          {project.brandDoc && (
            <Button variant="outline" asChild>
              <a href={project.brandDoc} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" /> {t.viewBrand} <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">{t.technologies}</h2>
          <div className="flex flex-wrap gap-2">
            {(project.stack ?? project.tech).map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1.5 px-3 py-1 font-normal">
                <TechIcon tech={tag} colored className="h-3.5 w-3.5" />
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        {project.llms.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">{t.builtWith}</h2>
          <div className="flex flex-wrap gap-3">
            {project.llms.map((llm) => (
              <span key={llm} className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-muted-foreground">
                <LlmIcon llm={llm} colored className="h-4 w-4" /> {llmMeta[llm].label}
              </span>
            ))}
          </div>
        </section>
        )}

        <section>
          <h2 className="text-xl font-bold mb-4">{t.screenshots}</h2>
          {project.screenshots && project.screenshots.length > 0 ? (
            <Gallery screenshots={project.screenshots} lang={lang} />
          ) : (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-dashed py-16 text-muted-foreground">
              <ImageIcon className="h-5 w-5" />
              <span className="text-sm">{t.screenshotsSoon}</span>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

type Screenshot = NonNullable<Project["screenshots"]>[number]

function Gallery({ screenshots, lang }: { screenshots: Screenshot[]; lang: Lang }) {
  // null = closed; otherwise the index of the open screenshot.
  const [open, setOpen] = useState<number | null>(null)
  const count = screenshots.length

  const close = useCallback(() => setOpen(null), [])
  const go = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  )

  // Keyboard nav + lock body scroll while the lightbox is open.
  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowRight") go(1)
      else if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close, go])

  const current = open === null ? null : screenshots[open]

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        {screenshots.map((shot, i) => (
          <figure key={shot.src} className="space-y-2">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden rounded-xl border bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-zoom-in"
              aria-label={tx(shot.caption, lang)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={tx(shot.caption, lang)}
                loading="lazy"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </button>
            <figcaption className="text-sm text-muted-foreground">{tx(shot.caption, lang)}</figcaption>
          </figure>
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={tx(current.caption, lang)}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(-1) }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(1) }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <figure className="flex max-h-full max-w-5xl flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={tx(current.caption, lang)}
              className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
            <figcaption className="text-center text-sm text-white/70">
              {tx(current.caption, lang)}
              {count > 1 && <span className="ml-2 tabular-nums text-white/40">{open! + 1} / {count}</span>}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
