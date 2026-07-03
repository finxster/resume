// Side-project / product data for the Projects section.
//
// Localized text fields use { en, pt } — resolve with `tx(field, lang)`.
// `end` undefined means the project is still running; `status` drives the
// badge on the card ("active" | "paused" | "sunset").

import type { L } from "@/lib/i18n";

export type ProjectStatus = "active" | "paused" | "sunset";

// LLMs / AI coding tools used to build the project (rendered as brand icons).
export type Llm = "claude" | "codex" | "copilot" | "gemini";

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
  tech: string[];
  llms: Llm[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    slug: "piggly",
    name: "Piggly",
    status: "active",
    start: 2025,
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
    llms: ["claude"],
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
      en: "Founding engineer at PayAqui, a side payments venture. Designed and built the company's native mobile apps for Android and iOS end to end — from architecture to shipping.",
      pt: "Engenheiro fundador na PayAqui, uma fintech de pagamentos tocada em paralelo. Projetei e construí os apps mobile nativos da empresa para Android e iOS de ponta a ponta — da arquitetura à publicação.",
    },
    tech: ["Java (Android)", "Swift (iOS)", "REST APIs"],
    llms: [],
  },
  {
    slug: "uscis-tracker",
    name: "USCIS Silent Update Tracker",
    status: "active",
    start: 2025,
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
