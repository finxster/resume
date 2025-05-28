import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import Timeline from "@/components/timeline"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"

export default function Home() {
  const skills = [
    { name: "JavaScript", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "React", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "Node.js", category: "backend" },
    { name: "Python", category: "backend" },
    { name: "AWS", category: "cloud" },
    { name: "Docker", category: "devops" },
    { name: "Kubernetes", category: "devops" },
    { name: "CI/CD", category: "devops" },
    { name: "MongoDB", category: "database" },
    { name: "PostgreSQL", category: "database" },
  ]

  const experiences = [
    {
      id: 1,
      title: "CTO & Co-Founder",
      company: "Startup Founders",
      period: "2022 - Present",
      description: "Leading technology strategy and development for early-stage startups.",
      parallel: false,
    },
    {
      id: 2,
      title: "Senior Software Engineer",
      company: "Talkdesk",
      period: "2019 - 2022",
      description: "Developed cloud-based contact center solutions and led engineering initiatives.",
      parallel: false,
    },
    {
      id: 3,
      title: "Startup Advisor",
      company: "Various Startups",
      period: "2018 - Present",
      description: "Providing technical guidance and mentorship to early-stage startups.",
      parallel: true,
    },
    {
      id: 4,
      title: "Software Engineer",
      company: "Farfetch",
      period: "2017 - 2019",
      description: "Built e-commerce platform features and improved performance metrics.",
      parallel: false,
    },
    {
      id: 5,
      title: "Full Stack Developer",
      company: "Critical Software",
      period: "2015 - 2017",
      description: "Developed mission-critical applications for enterprise clients.",
      parallel: false,
    },
  ]

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A scalable e-commerce solution with advanced search and recommendation features.",
      tags: ["React", "Node.js", "MongoDB", "AWS"],
      link: "#",
    },
    {
      title: "Contact Center Analytics",
      description: "Real-time analytics dashboard for contact center performance monitoring.",
      tags: ["TypeScript", "Next.js", "PostgreSQL", "Docker"],
      link: "#",
    },
    {
      title: "Startup Incubator Platform",
      description: "Platform connecting founders, mentors, and investors in the startup ecosystem.",
      tags: ["React", "GraphQL", "AWS", "Kubernetes"],
      link: "#",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Luis Alves</h1>
                <p className="text-xl text-gray-500 md:text-2xl">Software Engineer & Startup Founder</p>
              </div>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Building innovative solutions with modern technologies. Passionate about creating impactful software and
                helping startups grow.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#contact">Get in touch</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://github.com/"
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
                <a href="mailto:contact@example.com" className="text-gray-500 hover:text-gray-900">
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src="/placeholder.svg?height=320&width=320"
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
            <span className="sr-only">Scroll down</span>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">About Me</h2>
          <div className="grid gap-6 lg:grid-cols-2 items-start">
            <div className="space-y-4">
              <p className="text-gray-500 md:text-lg">
                I'm a software engineer with extensive experience in full-stack development, cloud architecture, and
                startup leadership. My journey spans from developing mission-critical applications at established
                companies to founding and advising technology startups.
              </p>
              <p className="text-gray-500 md:text-lg">
                With a passion for building scalable and innovative solutions, I've worked across various domains
                including e-commerce, contact centers, and enterprise software. I enjoy tackling complex problems and
                mentoring other developers.
              </p>
              <p className="text-gray-500 md:text-lg">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or advising early-stage startups on their technical challenges.
              </p>
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Skills & Expertise</h3>
                <div className="grid grid-cols-2 gap-y-2 mb-6">
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-gray-500">Portugal</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Experience</h4>
                    <p className="text-gray-500">8+ Years</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Education</h4>
                    <p className="text-gray-500">Computer Science</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Languages</h4>
                    <p className="text-gray-500">English, Portuguese</p>
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
      <section id="experience" className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Experience</h2>
          <p className="text-gray-500 md:text-lg mb-12 max-w-3xl">
            My career path has included both traditional roles and parallel entrepreneurial ventures. The timeline below
            illustrates my professional journey.
          </p>
          <Timeline experiences={experiences} />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Projects</h2>
          <p className="text-gray-500 md:text-lg mb-12 max-w-3xl">
            A selection of projects I've worked on throughout my career. Each represents different challenges and
            technologies.
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Get In Touch</h2>
              <p className="text-gray-500 md:text-lg mb-6 max-w-md">
                Interested in working together or have a question? Feel free to reach out through any of the channels
                below.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <a href="mailto:contact@example.com" className="text-gray-500 hover:text-gray-900">
                    contact@example.com
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
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    github.com/username
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
                        Name
                      </label>
                      <input id="name" className="w-full p-2 border rounded-md" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-2 border rounded-md"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input id="subject" className="w-full p-2 border rounded-md" placeholder="Subject" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="w-full p-2 border rounded-md min-h-[120px]"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
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
              <p>&copy; {new Date().getFullYear()} Luis Alves. All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/"
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
              <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white">
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
