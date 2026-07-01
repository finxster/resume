"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import Timeline from "@/components/timeline"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import { useLang, tx, type L } from "@/lib/i18n"
import { getDict } from "@/lib/dictionary"

export default function Home() {
  const { lang } = useLang()
  const t = getDict(lang)

  const skills = [
    { name: "Java", category: "backend" },
    { name: "Spring Boot", category: "backend" },
    { name: "Python", category: "backend" },
    { name: "Kafka", category: "backend" },
    { name: "Flutter", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "AWS", category: "cloud" },
    { name: "Databricks", category: "cloud" },
    { name: "CI/CD", category: "devops" },
    { name: "PostgreSQL", category: "database" },
    { name: "Oracle", category: "database" },
  ]

  const projectsData: { title: string; description: L; tags: string[]; link?: string }[] = [
    {
      title: "Piggly",
      description: {
        en: "A family app for managing kids' allowances — \"mesada, now with wishes.\" Built as a full product: a React/Supabase web app, a marketing landing page, and a Cloudflare Worker that schedules recurring deposits.",
        pt: "Um app family para gerenciar a mesada das crianças — \"mesada, agora com desejos.\" Construído como produto completo: um web app em React/Supabase, uma landing page de marketing e um Cloudflare Worker que agenda depósitos recorrentes.",
      },
      tags: ["React", "Vite", "Supabase", "Tailwind", "Cloudflare Workers"],
      link: "https://piggly.pages.dev",
    },
    {
      title: "AtipicALI",
      description: {
        en: "An ongoing parallel venture started in 2025, running alongside my full-time work. Building a product end to end on a modern TypeScript stack.",
        pt: "Um projeto paralelo em andamento, iniciado em 2025, em paralelo ao meu trabalho full-time. Construindo um produto de ponta a ponta em uma stack moderna de TypeScript.",
      },
      tags: ["TypeScript", "React", "Node", "PostgreSQL"],
    },
    {
      title: "USCIS Silent Update Tracker",
      description: {
        en: "A local Python tool that monitors multiple USCIS receipts for \"silent\" case updates across different endpoints and surfaces every change in a dashboard.",
        pt: "Uma ferramenta local em Python que monitora múltiplos recibos do USCIS em busca de atualizações \"silenciosas\" de processos em diferentes endpoints e exibe cada mudança em um dashboard.",
      },
      tags: ["Python", "Automation", "Dashboard"],
      link: "https://github.com/finxster/uscis-tracker",
    },
  ]

  const projects = projectsData.map((p) => ({ ...p, description: tx(p.description, lang) }))

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Luis Alves</h1>
                <p className="text-xl text-gray-500 md:text-2xl">{t.hero.role}</p>
              </div>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                {t.hero.tagline}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#contact">{t.hero.getInTouch}</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    {t.hero.downloadResume}
                  </a>
                </Button>
              </div>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://github.com/finxster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/luisfvalves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="mailto:mail.for.luis.alves@gmail.com" className="text-gray-500 hover:text-gray-900">
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/profile.jpg"
                  alt="Luis Alves"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-gray-500 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span className="sr-only">{t.hero.scrollDown}</span>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">{t.about.title}</h2>
          <div className="grid gap-6 lg:grid-cols-2 items-start">
            <div className="space-y-4">
              <p className="text-gray-500 md:text-lg">{t.about.p1}</p>
              <p className="text-gray-500 md:text-lg">{t.about.p2}</p>
              <p className="text-gray-500 md:text-lg">{t.about.p3}</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">{t.about.skillsTitle}</h3>
                <div className="grid grid-cols-2 gap-y-2 mb-6">
                  <div>
                    <h4 className="font-medium">{t.about.location}</h4>
                    <p className="text-gray-500">{t.about.locationValue}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">{t.about.experience}</h4>
                    <p className="text-gray-500">{t.about.experienceValue}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">{t.about.education}</h4>
                    <p className="text-gray-500">{t.about.educationValue}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">{t.about.languages}</h4>
                    <p className="text-gray-500">{t.about.languagesValue}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillBadge key={skill.name} name={skill.name} category={skill.category} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience">
        <Timeline />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">{t.projectsSection.title}</h2>
          <p className="text-gray-500 md:text-lg mb-12 max-w-3xl">
            {t.projectsSection.subtitle}
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{t.contact.title}</h2>
              <p className="text-gray-500 md:text-lg mb-6 max-w-md">
                {t.contact.subtitle}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <a href="mailto:mail.for.luis.alves@gmail.com" className="text-gray-500 hover:text-gray-900">
                    mail.for.luis.alves@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-gray-500" />
                  <a
                    href="https://linkedin.com/in/luisfvalves"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    linkedin.com/in/luisfvalves
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-gray-500" />
                  <a
                    href="https://github.com/finxster"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    github.com/finxster
                  </a>
                </div>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        {t.contact.name}
                      </label>
                      <input id="name" className="w-full p-2 border rounded-md" placeholder={t.contact.namePlaceholder} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {t.contact.email}
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-2 border rounded-md"
                        placeholder={t.contact.emailPlaceholder}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      {t.contact.subject}
                    </label>
                    <input id="subject" className="w-full p-2 border rounded-md" placeholder={t.contact.subjectPlaceholder} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t.contact.message}
                    </label>
                    <textarea
                      id="message"
                      className="w-full p-2 border rounded-md min-h-[120px]"
                      placeholder={t.contact.messagePlaceholder}
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">
                    {t.contact.send}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-gray-300">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} Luis Alves. {t.footer.rights}</p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/finxster"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/luisfvalves"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:mail.for.luis.alves@gmail.com" className="text-gray-400 hover:text-white">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
