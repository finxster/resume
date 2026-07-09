// Side-project / product data for the Projects section.
//
// Localized text fields use { en, pt } — resolve with `tx(field, lang)`.
// `end` undefined means the project is still running; `status` drives the
// badge on the card ("active" | "paused" | "sunset").

import type { L } from "@/lib/i18n";

export type ProjectStatus = "active" | "paused" | "sunset";

// LLMs / AI coding tools used to build the project (rendered as brand icons).
export type Llm = "claude" | "codex" | "copilot" | "gemini" | "vercel" | "replit";

export interface Project {
  slug: string;
  name: string;
  /** Path under /public, e.g. "/projects/piggly-logo.svg". Falls back to a monogram. */
  logo?: string;
  status: ProjectStatus;
  start: number;
  end?: number; // undefined = ongoing
  tagline: L;
  description: L;
  /** Primary tech, shown as icon-only chips on the card. */
  tech: string[];
  /** Full tech stack, shown on the detail page. Falls back to `tech`. */
  stack?: string[];
  llms: Llm[];
  link?: string;
  github?: string;
  /** Screenshots for the detail-page gallery. `src` is a path under /public. */
  screenshots?: { src: string; caption: L }[];
}

export const projects: Project[] = [
  {
    slug: "atipically",
    name: "AtipicALI",
    status: "active",
    start: 2025,
    tagline: {
      en: "Ongoing parallel venture on a modern TypeScript stack.",
      pt: "Projeto paralelo em andamento numa stack moderna de TypeScript.",
    },
    description: {
      en: "An ongoing parallel venture started in 2025, running alongside my full-time work. Building a product end to end on a modern TypeScript stack.",
      pt: "Um projeto paralelo em andamento, iniciado em 2025, em paralelo ao meu trabalho full-time. Construindo um produto de ponta a ponta em uma stack moderna de TypeScript.",
    },
    tech: ["TypeScript", "React", "Node", "PostgreSQL"],
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    llms: ["claude", "copilot"],
  },
  {
    slug: "portfolio",
    name: "finx.dev",
    status: "active",
    start: 2026,
    tagline: {
      en: "This very site — an interactive portfolio & résumé.",
      pt: "Este próprio site — um portfólio & currículo interativo.",
    },
    description: {
      en: "The site you're looking at. A statically-exported Next.js portfolio with a bilingual (EN/PT) UI, a custom git-graph career timeline, and a build step that generates print-ready résumé PDFs from a single content source. Bootstrapped with v0, now maintained with Claude Code.",
      pt: "O site que você está vendo. Um portfólio em Next.js com export estático, interface bilíngue (EN/PT), uma timeline de carreira em git-graph feita à mão e um passo de build que gera PDFs de currículo prontos para impressão a partir de uma fonte única. Iniciado com v0, hoje mantido com Claude Code.",
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "PDFKit"],
    llms: ["claude", "vercel"],
    link: "https://finx.dev",
    github: "https://github.com/finxster/resume",
  },
  {
    slug: "piggly",
    name: "Piggly",
    status: "active",
    start: 2026,
    tagline: {
      en: "Family allowance app — \"mesada, now with wishes.\"",
      pt: "App de mesada em família — \"mesada, agora com desejos.\"",
    },
    description: {
      en: "A family app for managing kids' allowances — \"mesada, now with wishes.\" Built as a full product: a React/Supabase web app, a marketing landing page, and a Cloudflare Worker that schedules recurring deposits.",
      pt: "Um app family para gerenciar a mesada das crianças — \"mesada, agora com desejos.\" Construído como produto completo: um web app em React/Supabase, uma landing page de marketing e um Cloudflare Worker que agenda depósitos recorrentes.",
    },
    tech: ["React", "Vite", "Supabase", "Tailwind", "Cloudflare Workers"],
    llms: ["claude"],
    link: "https://piggly.pages.dev",
  },
  {
    slug: "uscis-tracker",
    name: "USCIS Silent Update Tracker",
    status: "active",
    start: 2026,
    tagline: {
      en: "Monitors USCIS receipts for silent case updates.",
      pt: "Monitora recibos do USCIS em busca de atualizações silenciosas.",
    },
    description: {
      en: "A local Python tool that monitors multiple USCIS receipts for \"silent\" case updates across different endpoints and surfaces every change in a dashboard.",
      pt: "Uma ferramenta local em Python que monitora múltiplos recibos do USCIS em busca de atualizações \"silenciosas\" de processos em diferentes endpoints e exibe cada mudança em um dashboard.",
    },
    tech: ["Python", "Automation", "Dashboard"],
    llms: ["claude"],
    github: "https://github.com/finxster/uscis-tracker",
  },
  {
    slug: "sisosig",
    name: "Should I Stay Or Should I Go",
    status: "active",
    start: 2025,
    tagline: {
      en: "A decision helper for the classic stay-or-go dilemma.",
      pt: "Um ajudante de decisão para o clássico dilema de ficar ou partir.",
    },
    description: {
      en: "A small web app that helps you reason through the classic \"should I stay or should I go\" dilemma, turning a fuzzy gut call into a structured decision.",
      pt: "Um web app que ajuda a raciocinar sobre o clássico dilema \"ficar ou partir\", transformando uma decisão intuitiva em uma escolha estruturada.",
    },
    tech: ["React", "TypeScript", "Tailwind CSS"],
    llms: ["copilot"],
    link: "https://sisosig.pages.dev/",
  },
  {
    slug: "mealwheel",
    name: "MealWheel",
    logo: "/projects/mealwheel.jpeg",
    status: "sunset",
    start: 2025,
    end: 2025,
    tagline: {
      en: "Spin the wheel to settle the daily \"where should we eat?\" fight.",
      pt: "Gire a roleta e encerre a briga diária do \"onde a gente come?\".",
    },
    description: {
      en: "Born from a pre-pandemic ritual: back when everyone worked on-site, a big group of us went out for lunch together every day — and every day devolved into the same argument over where to go. The idea sat on the shelf for years until AI and vibe coding finally made it cheap to build. MealWheel lets each person add the places they like to eat, then spins a wheel to pick one at random from everyone's shared list — turning the daily standoff into a fair, one-tap decision. Under the hood it's a full-stack app, not just an animation: real accounts (Passport.js + bcrypt), session-based login, and a PostgreSQL database so your places and history persist. Built end to end on Replit as my first real dip into vibe coding.",
      pt: "Nasceu de um ritual pré-pandemia: na época em que todo mundo trabalhava presencial, um grupo grande de nós ia almoçar junto todo dia — e todo dia acabava na mesma discussão sobre onde ir. A ideia ficou guardada por anos, até a IA e o vibe coding finalmente tornarem barato tirá-la do papel. No MealWheel cada pessoa adiciona os lugares que gosta de comer, e o app gira uma roleta que sorteia um deles a partir da lista compartilhada de todos — transformando o impasse diário em uma decisão justa, a um toque. Por baixo é um app full-stack, não só uma animação: contas de verdade (Passport.js + bcrypt), login por sessão e um banco PostgreSQL para persistir seus lugares e histórico. Construído de ponta a ponta no Replit, meu primeiro mergulho de verdade no vibe coding.",
    },
    tech: ["React", "TypeScript", "Node", "PostgreSQL", "Tailwind"],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Wouter",
      "TanStack Query",
      "Node.js",
      "Express",
      "Passport.js",
      "PostgreSQL",
      "Drizzle ORM",
      "Neon",
    ],
    llms: ["replit"],
    screenshots: [
      {
        src: "/projects/mealwheel-wheel.jpg",
        caption: {
          en: "The wheel picks a winner from everyone's shared list of places.",
          pt: "A roleta sorteia um vencedor a partir da lista compartilhada de lugares.",
        },
      },
      {
        src: "/projects/mealwheel-spin.jpg",
        caption: {
          en: "Pick your crew, the meal type, and the places in the running.",
          pt: "Escolha a galera, o tipo de refeição e os lugares que entram no sorteio.",
        },
      },
      {
        src: "/projects/mealwheel-history.jpg",
        caption: {
          en: "Every spin is saved — a full audit trail of past decisions.",
          pt: "Todo giro é salvo — um histórico completo das decisões anteriores.",
        },
      },
      {
        src: "/projects/mealwheel-places.jpg",
        caption: {
          en: "Manage places: add restaurants and toggle which ones are in play.",
          pt: "Gerencie lugares: adicione restaurantes e ative quais entram no sorteio.",
        },
      },
    ],
  },
  {
    slug: "payaqui",
    name: "PayAqui",
    logo: "/projects/payaqui.svg",
    status: "sunset",
    start: 2018,
    end: 2019,
    tagline: {
      en: "Native Android & iOS apps for a payments venture.",
      pt: "Apps nativos Android & iOS para uma fintech de pagamentos.",
    },
    description: {
      en: "Founding engineer at PayAqui, a side payments venture. Designed and built the company's native mobile apps for Android and iOS end to end — from architecture to shipping — while also owning non-technical work like requirements discovery and UX, and contributing to the Java backend.",
      pt: "Engenheiro fundador na PayAqui, uma fintech de pagamentos tocada em paralelo. Projetei e construí os apps mobile nativos da empresa para Android e iOS de ponta a ponta — da arquitetura à publicação — participando ativamente também de funções não técnicas como descoberta de requisitos e UX, além de contribuir com o backend em Java.",
    },
    tech: ["Java", "Swift", "REST APIs"],
    stack: ["Java (Android)", "Swift (iOS)", "Java (backend)", "REST APIs"],
    llms: [],
  },
  {
    slug: "fleeber",
    name: "fleeber",
    logo: "/projects/fleeber.png",
    status: "sunset",
    start: 2013,
    end: 2016,
    tagline: {
      en: "Social network for musicians — backend & infra. Continues today as amy.network.",
      pt: "Rede social para músicos — backend & infra. Continua hoje como amy.network.",
    },
    description: {
      en: "Co-founded a social network for musicians. Responsible for all technical decisions, backend development, infrastructure, and service integrations — with focus on performance and scalability. Continues today as amy.network.",
      pt: "Cofundei uma rede social para músicos. Responsável por todas as decisões técnicas, desenvolvimento do backend, infraestrutura e integrações de serviços — com foco em performance e escalabilidade. Continua hoje como amy.network.",
    },
    tech: ["Java", "AWS", "Lucene", "JBehave", "Wicket"],
    llms: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
