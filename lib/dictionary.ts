// UI copy for both locales. Longer-form résumé content (the experience
// timeline) lives localized in lib/data.ts; this file holds page chrome.

import type { Lang } from "@/lib/i18n";

export const dictionary = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      resume: "Resume",
      toggleMenu: "Toggle menu",
    },
    hero: {
      role: "Software Engineer & Startup Founder",
      tagline:
        "Building innovative solutions with modern technologies. Passionate about creating impactful software and helping startups grow.",
      getInTouch: "Get in touch",
      downloadResume: "Download Resume",
      scrollDown: "Scroll down",
    },
    about: {
      title: "About Me",
      p1: "I'm a software engineer with extensive experience in full-stack development, cloud architecture, and startup leadership. My journey spans from developing mission-critical applications at established companies to founding and advising technology startups.",
      p2: "With a passion for building scalable and innovative solutions, I've worked across various domains including e-commerce, contact centers, and enterprise software. I enjoy tackling complex problems and mentoring other developers.",
      p3: "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or advising early-stage startups on their technical challenges.",
      skillsTitle: "Skills & Expertise",
      location: "Location",
      locationValue: "Bay Area, California, US",
      experience: "Experience",
      experienceValue: "20+ Years",
      education: "Education",
      educationValue: "Computer Science",
      languages: "Languages",
      languagesValue: "English, Portuguese",
    },
    timeline: {
      title: "Experience",
      subtitle:
        "A non-linear journey, drawn linearly — a main trunk of full-time roles, with side ventures forking off in parallel.",
      fullTime: "Full-time",
      sideVenture: "Side venture",
      progression: "Progression",
      skillsTech: "Skills & technologies",
      today: "TODAY",
      present: "Present",
      now: "now",
      close: "Close",
    },
    projectsSection: {
      title: "Projects",
      subtitle:
        "A selection of projects I've worked on throughout my career. Each represents different challenges and technologies.",
      viewProject: "View Project",
    },
    contact: {
      title: "Get In Touch",
      subtitle:
        "Interested in working together or have a question? Feel free to reach out through any of the channels below.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "Your email",
      subject: "Subject",
      subjectPlaceholder: "Subject",
      message: "Message",
      messagePlaceholder: "Your message",
      send: "Send Message",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  pt: {
    nav: {
      about: "Sobre",
      experience: "Experiência",
      projects: "Projetos",
      contact: "Contato",
      resume: "Currículo",
      toggleMenu: "Abrir menu",
    },
    hero: {
      role: "Engenheiro de Software & Fundador de Startups",
      tagline:
        "Construindo soluções inovadoras com tecnologias modernas. Apaixonado por criar software de impacto e ajudar startups a crescer.",
      getInTouch: "Entre em contato",
      downloadResume: "Baixar Currículo",
      scrollDown: "Rolar para baixo",
    },
    about: {
      title: "Sobre Mim",
      p1: "Sou um engenheiro de software com ampla experiência em desenvolvimento full-stack, arquitetura em nuvem e liderança de startups. Minha trajetória vai do desenvolvimento de aplicações críticas em empresas consolidadas à fundação e consultoria de startups de tecnologia.",
      p2: "Com paixão por construir soluções escaláveis e inovadoras, trabalhei em diversos domínios — e-commerce, contact centers e software corporativo. Gosto de resolver problemas complexos e de mentorar outros desenvolvedores.",
      p3: "Quando não estou programando, você me encontra explorando novas tecnologias, contribuindo com projetos open-source ou orientando startups em estágio inicial em seus desafios técnicos.",
      skillsTitle: "Habilidades & Especialidades",
      location: "Localização",
      locationValue: "Bay Area, Califórnia, EUA",
      experience: "Experiência",
      experienceValue: "20+ Anos",
      education: "Formação",
      educationValue: "Ciência da Computação",
      languages: "Idiomas",
      languagesValue: "Inglês, Português",
    },
    timeline: {
      title: "Experiência",
      subtitle:
        "Uma trajetória não-linear, desenhada de forma linear — um tronco principal de cargos full-time, com projetos paralelos se ramificando.",
      fullTime: "Full-time",
      sideVenture: "Projeto paralelo",
      progression: "Progressão",
      skillsTech: "Habilidades & tecnologias",
      today: "HOJE",
      present: "Atual",
      now: "atual",
      close: "Fechar",
    },
    projectsSection: {
      title: "Projetos",
      subtitle:
        "Uma seleção de projetos em que trabalhei ao longo da minha carreira. Cada um representa desafios e tecnologias diferentes.",
      viewProject: "Ver Projeto",
    },
    contact: {
      title: "Vamos Conversar",
      subtitle:
        "Interessado em trabalhar junto ou tem alguma pergunta? Fique à vontade para entrar em contato por qualquer um dos canais abaixo.",
      name: "Nome",
      namePlaceholder: "Seu nome",
      email: "E-mail",
      emailPlaceholder: "Seu e-mail",
      subject: "Assunto",
      subjectPlaceholder: "Assunto",
      message: "Mensagem",
      messagePlaceholder: "Sua mensagem",
      send: "Enviar Mensagem",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
  },
};

export type Dictionary = (typeof dictionary)["en"];

export function getDict(lang: Lang): Dictionary {
  return dictionary[lang];
}
