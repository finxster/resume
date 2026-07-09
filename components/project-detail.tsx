"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLang, tx } from "@/lib/i18n"
import { getDict } from "@/lib/dictionary"
import { getProject, type ProjectStatus } from "@/lib/projects"
import { LlmIcon, TechIcon, llmMeta } from "@/components/brand-icon"
import { cn } from "@/lib/utils"

const statusStyles: Record<ProjectStatus, string> = {
  active: "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  paused: "text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10",
  sunset: "text-muted-foreground border-border bg-muted",
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
            <img src={project.logo} alt="" className="h-16 w-16 rounded-2xl object-contain border bg-card" />
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
                <Github className="mr-2 h-4 w-4" /> {t.viewCode}
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
            <div className="grid gap-6 sm:grid-cols-2">
              {project.screenshots.map((shot) => (
                <figure key={shot.src} className="space-y-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.src}
                    alt={tx(shot.caption, lang)}
                    loading="lazy"
                    className="w-full rounded-xl border bg-card object-cover"
                  />
                  <figcaption className="text-sm text-muted-foreground">{tx(shot.caption, lang)}</figcaption>
                </figure>
              ))}
            </div>
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
