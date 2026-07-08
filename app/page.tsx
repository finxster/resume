"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Download, Server, Smartphone, Cloud, GitBranch, Sparkles } from "lucide-react"
import HeroGraph from "@/components/hero-graph"
import Timeline from "@/components/timeline"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import ContactForm from "@/components/contact-form"
import { useLang, tx, type L } from "@/lib/i18n"
import { getDict } from "@/lib/dictionary"
import { projects } from "@/lib/projects"

export default function Home() {
  const { lang } = useLang()
  const t = getDict(lang)
  const resumeHref = lang === "pt" ? "/resume-pt.pdf" : "/resume.pdf"

  const skillGroups = [
    { key: "backend" as const, category: "backend", icon: Server, items: ["Java", "Spring Boot", "Kafka", "Python", "Drools"] },
    { key: "frontend" as const, category: "frontend", icon: Smartphone, items: ["React", "TypeScript", "Flutter", "JavaScript"] },
    { key: "cloud" as const, category: "cloud", icon: Cloud, items: ["AWS", "Databricks", "PostgreSQL", "Oracle"] },
    { key: "devops" as const, category: "devops", icon: GitBranch, items: ["CI/CD", "Jenkins", "Git", "Gradle"] },
    { key: "ai" as const, category: "ai", icon: Sparkles, items: ["AI / LLMs", "Agentic AI", "GitHub Copilot", "TDD/BDD", "Scrum"] },
  ]


  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-background overflow-hidden">
        <HeroGraph />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-8 lg:gap-16 lg:grid-cols-[minmax(0,600px)_320px] items-center lg:justify-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Luis Alves</h1>
                <p className="text-xl text-muted-foreground md:text-2xl">{t.hero.role}</p>
              </div>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {t.hero.tagline}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#contact">{t.hero.getInTouch}</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={resumeHref} download>
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
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/luisfvalves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="mailto:mail.for.luis.alves@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-card shadow-xl">
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
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
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
      <section id="about" className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">{t.about.title}</h2>
          <div className="grid gap-6 lg:grid-cols-2 items-start">
            <div className="space-y-4">
              <p className="text-muted-foreground md:text-lg">{t.about.p1}</p>
              <p className="text-muted-foreground md:text-lg">{t.about.p2}</p>
              <p className="text-muted-foreground md:text-lg">{t.about.p3}</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">{t.about.skillsTitle}</h3>
                <div className="grid grid-cols-2 gap-y-2 mb-6">
                  <div>
                    <h4 className="font-medium">{t.about.location}</h4>
                    <p className="text-muted-foreground">{t.about.locationValue}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">{t.about.experience}</h4>
                    <p className="text-muted-foreground">{t.about.experienceValue}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">{t.about.education}</h4>
                    <p className="text-muted-foreground">{t.about.educationValue}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">{t.about.languages}</h4>
                    <p className="text-muted-foreground">{t.about.languagesValue}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {skillGroups.map((group) => {
                    const Icon = group.icon
                    return (
                      <div key={group.key}>
                        <div className="flex items-center gap-2 mb-2 text-sm font-medium text-foreground">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          {t.about.skillGroups[group.key]}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {group.items.map((name) => (
                            <SkillBadge key={name} name={name} category={group.category} />
                          ))}
                        </div>
                      </div>
                    )
                  })}
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
      <section id="projects" className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">{t.projectsSection.title}</h2>
          <p className="text-muted-foreground md:text-lg mb-12 max-w-3xl">
            {t.projectsSection.subtitle}
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-card border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{t.contact.title}</h2>
              <p className="text-muted-foreground md:text-lg mb-6 max-w-md">
                {t.contact.subtitle}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a href="mailto:mail.for.luis.alves@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
                    mail.for.luis.alves@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-muted-foreground" />
                  <a
                    href="https://linkedin.com/in/luisfvalves"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    linkedin.com/in/luisfvalves
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-muted-foreground" />
                  <a
                    href="https://github.com/finxster"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    github.com/finxster
                  </a>
                </div>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <ContactForm t={t.contact} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-background border-t border-border text-muted-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center gap-3">
              {/* Brand lockup — mark + "finx." wordmark from the brand kit.
                  Dark variant swaps the ink to the pale canvas colour. */}
              <img src="/lockup-light.svg" alt="finx." width={51} height={24} className="h-6 w-auto dark:hidden" />
              <img src="/lockup-dark.svg" alt="finx." width={51} height={24} className="hidden h-6 w-auto dark:block" />
              <p>&copy; {new Date().getFullYear()} Luis Alves. {t.footer.rights}</p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/finxster"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/luisfvalves"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:mail.for.luis.alves@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
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
