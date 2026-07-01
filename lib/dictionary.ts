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
      role: "Staff Engineer & Founder",
      tagline:
        "21+ years across the full software lifecycle — from financial systems and enterprise integrations to founding my own ventures. Building things that ship.",
      getInTouch: "Get in touch",
      downloadResume: "Download Resume",
      scrollDown: "Scroll down",
    },
    about: {
      title: "About Me",
      p1: "I'm a staff software engineer with 21+ years of experience covering the full software lifecycle — analysis, architecture, development, testing, and delivery. My career started in 2005 building financial systems in Brazil (investment funds, custody, and payments) and grew from engineer into tech lead, Scrum Master, and product owner.",
      p2: "Over the last decade I've delivered microservices, data platforms, and enterprise integrations for major clients — GAP, Williams Sonoma, SquareTrade, and Merchant e-Solutions — as a tech lead at Avenue Code, relocating from Brazil to the US along the way. Most recently I've been leading AI-first, agentic development — building an internal rules engine end to end and pioneering AI practices across a supply-chain vertical. I care deeply about a strong testing culture (TDD/BDD), clean architecture, and mentoring engineers.",
      p3: "I also have a strong entrepreneurial streak that helps me solve problems from the ground up: I was the founding engineer at X4Fare (a transit fintech), co-founded fleeber (now amy.network), and I'm currently building AtipicALI alongside my full-time work. I lead by example, enjoy talking to non-technical people, and like turning ambiguity into shipped products.",
      skillsTitle: "Skills & Expertise",
      location: "Location",
      locationValue: "San Francisco Bay Area, CA",
      experience: "Experience",
      experienceValue: "21+ Years",
      education: "Education",
      educationValue: "Computer Science (PUC-SP, Brazil)",
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
      role: "Staff Engineer & Fundador",
      tagline:
        "Mais de 21 anos cobrindo todo o ciclo de software — de sistemas financeiros e integrações corporativas até fundar meus próprios negócios. Construindo coisas que vão pra produção.",
      getInTouch: "Entre em contato",
      downloadResume: "Baixar Currículo",
      scrollDown: "Rolar para baixo",
    },
    about: {
      title: "Sobre Mim",
      p1: "Sou um staff software engineer com mais de 21 anos de experiência cobrindo todo o ciclo de software — análise, arquitetura, desenvolvimento, testes e entrega. Minha carreira começou em 2005 construindo sistemas financeiros no Brasil (fundos de investimento, custódia e pagamentos) e evoluiu de engenheiro para tech lead, Scrum Master e product owner.",
      p2: "Na última década, entreguei microsserviços, plataformas de dados e integrações corporativas para grandes clientes — GAP, Williams Sonoma, SquareTrade e Merchant e-Solutions — como tech lead na Avenue Code, mudando do Brasil para os EUA no caminho. Mais recentemente, venho liderando desenvolvimento AI-first e agentic — construindo um motor de regras interno de ponta a ponta e sendo pioneiro em práticas de IA numa vertical de supply chain. Tenho grande apreço por cultura de testes (TDD/BDD), arquitetura limpa e mentoria de engenheiros.",
      p3: "Também tenho um forte perfil empreendedor que me ajuda a resolver problemas do zero: fui engenheiro fundador na X4Fare (fintech de mobilidade), cofundei a fleeber (hoje amy.network) e atualmente construo a AtipicALI em paralelo ao meu trabalho full-time. Lidero pelo exemplo, gosto de conversar com pessoas não-técnicas e de transformar ambiguidade em produtos entregues.",
      skillsTitle: "Habilidades & Especialidades",
      location: "Localização",
      locationValue: "San Francisco Bay Area, CA",
      experience: "Experiência",
      experienceValue: "21+ Anos",
      education: "Formação",
      educationValue: "Ciência da Computação (PUC-SP, Brasil)",
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
