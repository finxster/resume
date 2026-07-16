// Side-project / product data for the Projects section.
//
// Localized text fields use { en, pt } — resolve with `tx(field, lang)`.
// `end` undefined means the project is still running; `status` drives the
// badge on the card ("active" | "paused" | "sunset").

import type { L } from "@/lib/i18n";

export type ProjectStatus = "active" | "paused" | "sunset";

// LLMs / AI coding tools used to build the project (rendered as brand icons).
export type Llm = "claude" | "codex" | "copilot" | "gemini" | "vercel" | "replit";

// Where the project is hosted (rendered as a badge on the detail page).
export type Deployment = "cloudflare-pages" | "cloudflare-workers" | "github-pages" | "replit" | "aws" | "local";

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
  /** Where it's hosted, shown as a badge on the detail page. */
  deployment?: Deployment;
  link?: string;
  github?: string;
  /** Screenshots for the detail-page gallery. `src` is a path under /public. */
  screenshots?: { src: string; caption: L }[];
}

export const projects: Project[] = [
  {
    slug: "atipically",
    name: "AtipicALI",
    logo: "/projects/atipicali.png",
    status: "active",
    start: 2025,
    tagline: {
      en: "Ongoing parallel venture on a Vue + Spring Boot stack.",
      pt: "Projeto paralelo em andamento numa stack Vue + Spring Boot.",
    },
    description: {
      en: "An ongoing parallel venture started in 2025, running alongside my full-time work. Built end to end: a Vue 3 SPA (plus a separate admin app), a Java/Spring Boot REST API backed by PostgreSQL, with file storage on Cloudflare R2. The frontends deploy to Cloudflare Pages and the backend runs on Koyeb.",
      pt: "Um projeto paralelo em andamento, iniciado em 2025, em paralelo ao meu trabalho full-time. Construído de ponta a ponta: uma SPA em Vue 3 (mais um app admin separado), uma API REST em Java/Spring Boot sobre PostgreSQL, com armazenamento de arquivos no Cloudflare R2. Os frontends rodam no Cloudflare Pages e o backend no Koyeb.",
    },
    tech: ["Vue", "Java", "Spring Boot", "PostgreSQL"],
    stack: [
      "Vue",
      "Vite",
      "Pinia",
      "Tailwind CSS",
      "Leaflet",
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Liquibase",
      "Cloudflare R2",
    ],
    llms: ["claude", "copilot"],
    deployment: "cloudflare-pages",
  },
  {
    slug: "portfolio",
    name: "finx.dev",
    logo: "/favicon.svg",
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
    deployment: "github-pages",
    link: "https://finx.dev",
    github: "https://github.com/finxster/resume",
  },
  {
    slug: "piggly",
    name: "Piggly",
    logo: "/projects/piggly.svg",
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
    deployment: "cloudflare-pages",
    link: "https://piggly.pages.dev",
  },
  {
    slug: "uscis-tracker",
    name: "USCIS Silent Update Tracker",
    logo: "/projects/uscis_python.svg",
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
    deployment: "local",
    github: "https://github.com/finxster/uscis-tracker",
    screenshots: [
      {
        src: "/projects/uscis_dashboard.png",
        caption: {
          en: "Dashboard — one card per receipt, flagging silent updates and every check with its content hash.",
          pt: "Dashboard — um cartão por recibo, sinalizando atualizações silenciosas e cada verificação com seu hash de conteúdo.",
        },
      },
      {
        src: "/projects/uscis_detail.png",
        caption: {
          en: "Field-level diff — expanding a change shows exactly which fields moved, old value → new value.",
          pt: "Diff a nível de campo — ao expandir uma mudança, mostra exatamente quais campos mudaram, valor antigo → valor novo.",
        },
      },
    ],
  },
  {
    slug: "sisosig",
    name: "Should I Stay Or Should I Go",
    logo: "/projects/sisosig_react.svg",
    status: "active",
    start: 2025,
    tagline: {
      en: "Weigh the pros & cons of the classic stay-or-go dilemma.",
      pt: "Pese os prós & contras do clássico dilema de ficar ou partir.",
    },
    description: {
      en: "Born from a real fork in the road: facing a big life decision, I was about to scribble the classic pros-and-cons list on a scrap of paper — then thought, why not a simple app instead? No login, no fuss. You open it, build side-by-side lists (Stay vs. Go), add pros and cons, and even assign a weight to each criterion so the app tallies a weighted score and crowns a winner. Your decision lives at its own link — save it and it's yours, Trello-style, no account required. It's also a deliberate exercise in neo-brutalist design: chunky borders, hard shadows, loud type. Bilingual (EN/PT) and effectively zero-cost — Cloudflare KV is the whole database, with an offline fallback to localStorage. A small, genuinely useful app.",
      pt: "Nasceu de uma encruzilhada real: diante de uma decisão grande na vida, eu já ia rabiscar a clássica lista de prós e contras num papelzinho — então pensei, por que não um app simples? Sem login, sem frescura. Você entra, monta listas lado a lado (Ficar vs. Ir), adiciona prós e contras e ainda pode dar um peso a cada critério, para o app somar uma pontuação ponderada e coroar um vencedor. Sua decisão mora em um link próprio — salvou, é seu, no estilo Trello, sem precisar de conta. É também um exercício proposital de design neo-brutalista: bordas grossas, sombras duras, tipografia marcante. Bilíngue (EN/PT) e de custo praticamente zero — o Cloudflare KV é o banco inteiro, com fallback offline para o localStorage. Um app pequeno e genuinamente útil.",
    },
    tech: ["React", "Vite", "Tailwind", "Cloudflare Workers"],
    stack: [
      "React",
      "Vite",
      "JavaScript",
      "Tailwind CSS",
      "lucide-react",
      "Cloudflare Pages",
      "Cloudflare Workers",
      "Cloudflare KV",
    ],
    llms: ["copilot"],
    deployment: "cloudflare-pages",
    link: "https://sisosig.pages.dev/",
    screenshots: [
      {
        src: "/projects/sisosig_top.png",
        caption: {
          en: "Neo-brutalist UI — Stay vs. Go head to head, with a live winner and score.",
          pt: "Interface neo-brutalista — Ficar vs. Ir lado a lado, com vencedor e pontuação ao vivo.",
        },
      },
      {
        src: "/projects/sisosig_bottom.png",
        caption: {
          en: "Weighted pros & cons — each item gets a 1–5 weight that feeds the score.",
          pt: "Prós & contras com pesos — cada item recebe um peso de 1 a 5 que alimenta a pontuação.",
        },
      },
    ],
  },
  {
    slug: "anxious-perm-bot",
    name: "AnxiousPermBot",
    logo: "/projects/anxiousperm_telegram.svg",
    status: "active",
    start: 2025,
    tagline: {
      en: "Telegram bot that tracks PERM green-card queue movement daily.",
      pt: "Bot no Telegram que acompanha a fila do PERM (green card) diariamente.",
    },
    description: {
      en: "Born from the anxiety of waiting in the PERM labor-certification queue and refreshing a prediction site over and over. So I automated the refresh: a Cloudflare Worker runs on a cron every morning, pulls the latest prediction from permupdate.com, stores a snapshot in Cloudflare KV, and sends a formatted Telegram report comparing today against yesterday — estimated date, queue position, processing rate, and days remaining, each with a 🔴▲/🟢▼ delta so you see at a glance whether the line moved your way. Daily reports Monday–Saturday, a fuller summary on Sundays, multi-recipient support, and a small web dashboard to trigger a report on demand. Zero-cost serverless, and genuinely calming: like reading the morning paper fresh off the press — I'd wake up already knowing my spot in the line. The bot watches the queue so you don't have to.",
      pt: "Nasceu da ansiedade de esperar na fila do PERM (etapa da certificação de trabalho para o green card) e ficar atualizando um site de previsão sem parar. Então automatizei a atualização: um Cloudflare Worker roda num cron toda manhã, busca a previsão mais recente do permupdate.com, guarda um snapshot no Cloudflare KV e envia um relatório formatado no Telegram comparando hoje com ontem — data estimada, posição na fila, ritmo de processamento e dias restantes, cada um com um delta 🔴▲/🟢▼ para você ver num relance se a fila andou a seu favor. Relatórios diários de segunda a sábado, um resumo mais completo aos domingos, suporte a múltiplos destinatários e um pequeno dashboard web para disparar um relatório sob demanda. Serverless de custo zero e genuinamente tranquilizador: aquela sensação de ler as notícias fresquinhas toda manhã — eu acordava e já sabia meu lugar na fila. O bot vigia a fila para você não precisar.",
    },
    tech: ["JavaScript", "Cloudflare Workers", "Cloudflare KV", "Telegram Bot API"],
    stack: [
      "JavaScript",
      "Cloudflare Workers",
      "Cloudflare KV",
      "Cron Triggers",
      "Telegram Bot API",
    ],
    llms: ["copilot"],
    deployment: "cloudflare-workers",
    github: "https://github.com/finxster/AnxiousPermBot",
    screenshots: [
      {
        src: "/projects/anxiousperm_report.png",
        caption: {
          en: "Daily Telegram report — estimated date, queue position, and processing rate, each with a day-over-day delta.",
          pt: "Relatório diário no Telegram — data estimada, posição na fila e ritmo de processamento, cada um com o delta em relação ao dia anterior.",
        },
      },
    ],
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
    deployment: "replit",
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
    deployment: "aws",
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
    deployment: "aws",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
