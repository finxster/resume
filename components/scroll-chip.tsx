"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLang } from "@/lib/i18n"
import { getDict } from "@/lib/dictionary"
import { getProject } from "@/lib/projects"

// Home-page sections tracked in document order. Ids match the DOM section ids;
// "top" is the initial hero / intro state before any section.
const SECTIONS = ["top", "about", "experience", "projects", "contact"]

// The "F>" brand mark, theme-aware: the F inherits the foreground color, the
// chevron keeps the accent.
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M62 30 H44 a10 10 0 0 0 -10 10 V72"
        fill="none"
        stroke="currentColor"
        strokeWidth={9}
        strokeLinecap="round"
      />
      <line x1="30" y1="52" x2="52" y2="52" stroke="currentColor" strokeWidth={9} strokeLinecap="round" />
      <path d="M80 56 L70 46 M80 56 L70 66" stroke="#6E7BFF" strokeWidth={9} strokeLinecap="round" />
    </svg>
  )
}

export default function ScrollChip() {
  const { lang } = useLang()
  const pathname = usePathname()
  const nav = getDict(lang).nav

  const onHome = pathname === "/"
  const projectSlug = pathname.startsWith("/projects/") ? pathname.split("/")[2] : undefined
  const project = projectSlug ? getProject(projectSlug) : undefined

  const sectionLabels: Record<string, string> = {
    top: lang === "pt" ? "Início" : "Intro",
    about: nav.about,
    experience: nav.experience,
    projects: nav.projects,
    contact: nav.contact,
  }

  const [active, setActive] = useState("top")

  // Track the active section — only on the home page, where the sections live.
  useEffect(() => {
    if (!onHome) return

    const els = SECTIONS.map((id) =>
      id === "top" ? null : document.getElementById(id),
    )

    const onScroll = () => {
      // Reference line a third of the way down the viewport.
      const line = window.scrollY + window.innerHeight / 3
      let current = "top"
      for (let i = 1; i < SECTIONS.length; i++) {
        const el = els[i]
        if (el && el.offsetTop <= line) current = SECTIONS[i]
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [onHome])

  // On a project page, the chip names the project; on home it names the
  // section under the scroll line.
  const label = onHome ? sectionLabels[active] : project?.name
  const chipKey = onHome ? active : projectSlug

  return (
    <Link
      href="/"
      aria-label={label ? `finx — ${label}` : "finx — back to home"}
      className="group fixed top-4 left-4 z-[60] hidden sm:flex items-center"
    >
      {/* Brand mark */}
      <span className="relative z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-sm backdrop-blur transition-transform group-hover:scale-105">
        <BrandMark className="h-5 w-5" />
      </span>

      {/* Chip sliding out from behind the mark */}
      {label && (
        <span
          key={chipKey}
          className="-ml-3 animate-in slide-in-from-left-2 fade-in flex items-center rounded-r-full rounded-l-md border border-l-0 border-border bg-card/80 py-1.5 pl-4 pr-3.5 shadow-sm backdrop-blur duration-300"
        >
          <span className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6E7BFF]" />
          <span className="max-w-[42vw] truncate text-xs font-medium text-foreground">{label}</span>
        </span>
      )}
    </Link>
  )
}
