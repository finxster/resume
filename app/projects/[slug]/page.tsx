import { projects } from "@/lib/projects"
import ProjectDetail from "@/components/project-detail"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <ProjectDetail slug={slug} />
}
