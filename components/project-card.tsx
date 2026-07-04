"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { useLang, tx } from "@/lib/i18n"
import { getDict } from "@/lib/dictionary"
import type { Project, ProjectStatus } from "@/lib/projects"
import { BrandBadge, llmMeta, resolveTechIcons } from "@/components/brand-icon"
import { cn } from "@/lib/utils"

const statusStyles: Record<ProjectStatus, { dot: string; text: string; pulse?: boolean }> = {
  active: { dot: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400", pulse: true },
  paused: { dot: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" },
  sunset: { dot: "bg-muted-foreground/50", text: "text-muted-foreground" },
}

export default function ProjectCard({ project }: { project: Project }) {
  const { lang } = useLang()
  const t = getDict(lang).projectsSection
  const now = getDict(lang).timeline.now

  const statusLabel = {
    active: t.statusActive,
    paused: t.statusPaused,
    sunset: t.statusSunset,
  }[project.status]
  const status = statusStyles[project.status]
  const techIcons = resolveTechIcons(project.tech)

  const period =
    project.end === undefined
      ? `${project.start} — ${now}`
      : project.end === project.start
        ? `${project.start}`
        : `${project.start} — ${project.end}`

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-primary/30">
      <Link href={`/projects/${project.slug}/`} className="absolute inset-0 z-10" aria-label={project.name} />

      {/* LLMs used to build it — top-right, brand-colored, name on hover */}
      {project.llms.length > 0 && (
        <div className="absolute right-4 top-4 z-20 flex items-center gap-2.5">
          {project.llms.map((llm) => (
            <BrandBadge key={llm} label={llmMeta[llm].label} path={llmMeta[llm].path} hex={llmMeta[llm].hex} className="h-[18px] w-[18px]" />
          ))}
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Logo, or a monogram fallback */}
          {project.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.logo} alt="" className="h-12 w-12 rounded-xl object-contain border bg-card" />
          ) : (
            <div className="h-12 w-12 shrink-0 rounded-xl border bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
              {project.name.slice(0, 2)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold truncate">{project.name}</h3>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <span className={cn("inline-flex items-center gap-1.5 font-medium", status.text)}>
                <span className="relative flex h-2 w-2">
                  {status.pulse && (
                    <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", status.dot)} />
                  )}
                  <span className={cn("relative inline-flex h-2 w-2 rounded-full", status.dot)} />
                </span>
                {statusLabel}
              </span>
              <span className="text-muted-foreground tabular-nums">{period}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">{tx(project.tagline, lang)}</p>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between gap-4">
        {/* Main tech — bottom-left, brand-colored icons, name on hover */}
        <div className="relative z-20 flex items-center gap-2.5">
          {techIcons.map((ti) => (
            <BrandBadge key={ti.key} label={ti.label} path={ti.path} hex={ti.hex} className="h-[18px] w-[18px]" />
          ))}
        </div>
        <div className="relative z-20 flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 flex items-center text-sm font-medium transition-colors"
            >
              <Github className="mr-1 h-3.5 w-3.5" /> {t.viewCode}
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 flex items-center text-sm font-medium transition-colors"
            >
              {t.viewProject} <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
