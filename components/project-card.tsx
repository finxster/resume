"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { getDict } from "@/lib/dictionary"

interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { lang } = useLang()
  const t = getDict(lang).projectsSection
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-500 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      {project.link && project.link !== "#" && (
        <CardFooter className="p-6 pt-0">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
          >
            {t.viewProject} <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </CardFooter>
      )}
    </Card>
  )
}
