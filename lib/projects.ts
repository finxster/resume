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
  /** Additional live URLs (e.g. sub-apps), shown as secondary link buttons. */
  links?: { label: string; url: string }[];
  github?: string;
  /** Optional link to a brand/design doc (PDF under /public), shown as a button. */
  brandDoc?: string;
  /** Screenshots for the detail-page gallery. `src` is a path under /public. */
  screenshots?: { src: string; caption: L }[];
}

export const projects: Project[] = [
  {
    slug: "atipically",
    name: "AtipicALI",
    logo: "/projects/atipicali.webp",
    status: "active",
    start: 2025,
    tagline: {
      en: "Ongoing parallel venture — a multi-app ecosystem on a Vue + Spring Boot stack.",
      pt: "Projeto paralelo em andamento — um ecossistema multi-app numa stack Vue + Spring Boot.",
    },
    description: {
      en: "An ongoing parallel venture started in 2025, running alongside my full-time work. Built end to end as a multi-app ecosystem: a single Java/Spring Boot backend serves every frontend — a deliberate monolith (microservices would be cleaner, but the monolith keeps server costs down) backed by PostgreSQL, with file storage on Cloudflare R2. The frontends are Vue 3 apps: web (the main public site), admin (approve places, moderate community-wall posts, publish news, handle reports), scheduling (for the platform's service providers to manage the appointments booked through booking), booking (a Calendly-style flow where users book online), and chatbot (a new AI service for professionals, currently on mocked data). These are progressively being integrated into the web app (WIP). Frontends deploy to Cloudflare Pages; the backend runs on Koyeb.",
      pt: "Um projeto paralelo em andamento, iniciado em 2025, em paralelo ao meu trabalho full-time. Construído de ponta a ponta como um ecossistema multi-app: um único backend em Java/Spring Boot serve todos os frontends — um monolito por decisão (microserviços seriam mais limpos, mas o monolito mantém o custo de servidor baixo) sobre PostgreSQL, com armazenamento de arquivos no Cloudflare R2. Os frontends são apps em Vue 3: web (o site público principal), admin (aprovar lugares, moderar postagens do mural, publicar novidades, tratar reports), scheduling (para os prestadores de serviço da plataforma gerenciarem os agendamentos feitos pelo booking), booking (um fluxo estilo Calendly onde os usuários agendam online) e chatbot (um novo serviço de IA para profissionais, hoje com dados mockados). Tudo vem sendo progressivamente integrado ao app web (WIP). Os frontends rodam no Cloudflare Pages; o backend no Koyeb.",
    },
    tech: ["Java", "Spring Boot", "Vue", "PostgreSQL"],
    stack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Vue",
      "Vite",
      "Pinia",
      "Tailwind CSS",
      "Leaflet",
      "PostgreSQL",
      "Liquibase",
      "Cloudflare R2",
      "Koyeb (backend)",
      "Cloudflare Pages CI/CD (frontends)",
    ],
    llms: ["claude", "copilot"],
    deployment: "cloudflare-pages",
    link: "https://atipicali.com",
    links: [
      { label: "Admin", url: "https://admin.atipicali.com" },
      { label: "Scheduling", url: "https://scheduling.atipicali.com" },
      { label: "Booking", url: "https://booking.atipicali.com" },
      { label: "Chatbot", url: "https://chatbot.atipicali.com" },
    ],
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
      en: "The site you're looking at. A statically-exported Next.js portfolio with a bilingual (EN/PT) UI and a build step that generates print-ready résumé PDFs from a single content source. Its centerpiece is a career timeline rendered as a hand-built git-graph: the full-time career runs as a trunk, side ventures fork off as parallel branches that either merge back in or trail off into a dashed tail while ongoing, with client containers, per-country zones, year markers, hover-to-focus dimming, interactive tooltips and detail cards, plus a toggle to a plain list view — all in bespoke SVG, and honestly a ton of work to get right. It even has its own brand system — the mark, the graphite-neutral palette with a single indigo accent, the type and the favicon — designed with Claude Design. Bootstrapped with v0, now maintained with Claude Code.",
      pt: "O site que você está vendo. Um portfólio em Next.js com export estático, interface bilíngue (EN/PT) e um passo de build que gera PDFs de currículo prontos para impressão a partir de uma fonte única. A peça central é uma timeline de carreira renderizada como um git-graph feito à mão: a carreira full-time corre como um tronco, os side ventures forkam como branches paralelos que dão merge de volta ou seguem num rabinho tracejado enquanto estão ativos, com contêineres de cliente, zonas por país, marcadores de ano, escurecimento por hover para focar, tooltips interativos e cards de detalhe, além de um toggle para uma visão em lista — tudo em SVG artesanal, e sinceramente deu bastante trabalho para acertar. Tem até um brand system próprio — o mark, a paleta grafite com um único acento índigo, a tipografia e o favicon — desenhado com Claude Design. Iniciado com v0, hoje mantido com Claude Code.",
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "PDFKit", "GitHub Actions (CI/CD)"],
    llms: ["claude", "vercel"],
    deployment: "github-pages",
    link: "https://finx.dev",
    github: "https://github.com/finxster/resume",
    brandDoc: "/finx-brand-system.pdf",
    screenshots: [
      {
        src: "/projects/finxdev-timeline.webp",
        caption: {
          en: "The centerpiece — a hand-built git-graph career timeline with country zones and forking side ventures.",
          pt: "A peça central — uma timeline de carreira em git-graph feita à mão, com zonas por país e side ventures forkando.",
        },
      },
      {
        src: "/projects/finxdev-list.webp",
        caption: {
          en: "A toggle switches the same data to a plain, print-friendly list view.",
          pt: "Um toggle troca os mesmos dados por uma visão em lista simples e amigável para impressão.",
        },
      },
      {
        src: "/projects/finxdev-hero.webp",
        caption: {
          en: "The landing hero, over an animated constellation background.",
          pt: "O hero da landing, sobre um fundo animado de constelação.",
        },
      },
    ],
  },
  {
    slug: "piggly",
    name: "Piggly",
    logo: "/projects/piggly.svg",
    status: "active",
    start: 2026,
    tagline: {
      en: "App to manage kids' allowances.",
      pt: "App para controlar a mesada das crianças.",
    },
    description: {
      en: "An app to manage kids' allowances. It was born at home: we started giving our kids an allowance so they'd learn about money, but actually handling it — pulling out cash and handing it over every time — turned out to be the hard part (the difficulty was really ours). We tried tracking it on a scrap of paper and lost the thread more than once. So the app took over: you set the periodicity and it computes everything for you. Then one of the kids reached reading age, so I built a kid view — protected so only adults perform operations, gated behind a PIN — where the child can see how much they have, add wishes, and watch the app estimate how long until they can afford each one. Built as a full product: a React/Supabase web app, a marketing landing page, and a Cloudflare Worker that schedules the recurring deposits.",
      pt: "Um app para controlar a mesada das crianças. Nasceu aqui em casa: começamos a dar mesada para as crianças, para elas aprenderem sobre finanças, mas ficar tirando dinheiro e entregando toda vez era muito difícil (a dificuldade era mais nossa). Tentamos controlar no papelzinho e nos perdemos várias vezes. Então o app assumiu: você escolhe a periodicidade e ele computa tudo para você. Aí um dos filhos chegou na idade de saber ler, então criei a visão para a criança — protegida, só adultos fazem operações, com acesso por PIN — onde a criança vê quanto tem, pode colocar desejos e o app calcula quanto tempo falta para conquistar cada um. Construído como produto completo: um web app em React/Supabase, uma landing page de marketing e um Cloudflare Worker que agenda os depósitos recorrentes.",
    },
    tech: ["React", "Vite", "Tailwind", "Supabase", "Cloudflare Workers"],
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "Cloudflare Workers",
      "Cloudflare Pages",
      "Cloudflare Git integration (CI/CD)",
    ],
    llms: ["claude"],
    deployment: "cloudflare-pages",
    link: "https://piggly.pages.dev",
    screenshots: [
      {
        src: "/projects/piggly-dashboard.webp",
        caption: {
          en: "Parent view — each child's balance and their next scheduled deposit.",
          pt: "Visão dos pais — o saldo de cada criança e o próximo depósito agendado.",
        },
      },
      {
        src: "/projects/piggly-kidview-balance.webp",
        caption: {
          en: "Kid view — balance and transaction history, deposits and spending.",
          pt: "Visão da criança — saldo e histórico de transações, depósitos e gastos.",
        },
      },
      {
        src: "/projects/piggly-kidview-wish.webp",
        caption: {
          en: "Wishes — the app estimates how long until the child can afford each goal.",
          pt: "Desejos — o app estima quanto tempo falta para a criança conquistar cada meta.",
        },
      },
      {
        src: "/projects/piggly-pin-gate.webp",
        caption: {
          en: "PIN-gated operations — only adults can move money.",
          pt: "Operações protegidas por PIN — só adultos movimentam o dinheiro.",
        },
      },
    ],
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
        src: "/projects/uscis_dashboard.webp",
        caption: {
          en: "Dashboard — one card per receipt, flagging silent updates and every check with its content hash.",
          pt: "Dashboard — um cartão por recibo, sinalizando atualizações silenciosas e cada verificação com seu hash de conteúdo.",
        },
      },
      {
        src: "/projects/uscis_detail.webp",
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
      "Cloudflare KV",
      "Cloudflare Workers",
      "Cloudflare Pages",
      "Cloudflare Git integration (CI/CD)",
    ],
    llms: ["copilot"],
    deployment: "cloudflare-pages",
    link: "https://sisosig.pages.dev/",
    screenshots: [
      {
        src: "/projects/sisosig_top.webp",
        caption: {
          en: "Neo-brutalist UI — Stay vs. Go head to head, with a live winner and score.",
          pt: "Interface neo-brutalista — Ficar vs. Ir lado a lado, com vencedor e pontuação ao vivo.",
        },
      },
      {
        src: "/projects/sisosig_bottom.webp",
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
    tech: ["JavaScript", "Cloudflare KV", "Cloudflare Workers", "Telegram Bot API"],
    stack: [
      "JavaScript",
      "Cloudflare KV",
      "Cloudflare Workers",
      "Cron Triggers",
      "Telegram Bot API",
      "Cloudflare Git integration (CI/CD)",
    ],
    llms: ["copilot"],
    deployment: "cloudflare-workers",
    github: "https://github.com/finxster/AnxiousPermBot",
    screenshots: [
      {
        src: "/projects/anxiousperm_report.webp",
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
    logo: "/projects/mealwheel.webp",
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
    tech: ["Node", "React", "TypeScript", "Tailwind", "PostgreSQL"],
    stack: [
      "Node.js",
      "Express",
      "Passport.js",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Wouter",
      "TanStack Query",
      "PostgreSQL",
      "Drizzle ORM",
      "Neon",
      "Replit Deployments (CI/CD)",
    ],
    llms: ["replit"],
    deployment: "replit",
    screenshots: [
      {
        src: "/projects/mealwheel-wheel.webp",
        caption: {
          en: "The wheel picks a winner from everyone's shared list of places.",
          pt: "A roleta sorteia um vencedor a partir da lista compartilhada de lugares.",
        },
      },
      {
        src: "/projects/mealwheel-spin.webp",
        caption: {
          en: "Pick your crew, the meal type, and the places in the running.",
          pt: "Escolha a galera, o tipo de refeição e os lugares que entram no sorteio.",
        },
      },
      {
        src: "/projects/mealwheel-history.webp",
        caption: {
          en: "Every spin is saved — a full audit trail of past decisions.",
          pt: "Todo giro é salvo — um histórico completo das decisões anteriores.",
        },
      },
      {
        src: "/projects/mealwheel-places.webp",
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
    stack: ["Java (Android)", "Swift (iOS)", "Java (backend)", "REST APIs", "Bamboo (CI/CD)"],
    llms: [],
    deployment: "aws",
  },
  {
    slug: "fleeber",
    name: "fleeber",
    logo: "/projects/fleeber.webp",
    status: "sunset",
    start: 2013,
    end: 2016,
    tagline: {
      en: "Social network for musicians, with a studio-booking system.",
      pt: "Rede social para músicos, com sistema de agendamento para estúdios.",
    },
    description: {
      en: "Co-founded a social network for musicians, with a booking system for rehearsal and recording studios. I built the entire backend of the social network (the frontend was done by someone else), plus the full stack — backend and frontend — of the studio-booking product, in Java with Apache Wicket. Search was built on Apache Lucene, inspired by LinkedIn's approach, which gave us fine-grained control over ranking; this was in a pre-AI era, very early days for Elasticsearch. Testing followed a BDD strategy with JBehave to guarantee natural-language search worked — a query like \"punk-rock drummer in São Paulo\" actually returned the right people. Feature set spanned a social timeline, a map to explore what's around you, direct messages, events, classifieds and reviews.",
      pt: "Cofundei uma rede social para músicos, com sistema de agendamento para estúdios de ensaio e gravação. Implementei o backend inteiro da rede social (o front foi feito por outra pessoa), além do stack completo — backend e frontend — do produto de agendamento de estúdios, em Java com Apache Wicket. A busca foi construída sobre o Apache Lucene, inspirada pela busca do LinkedIn, o que nos dava controle fino sobre o ranking; isso numa era pré-IA e no comecinho do Elasticsearch. A estratégia de testes usava BDD com JBehave para garantir que a busca em linguagem natural funcionava — uma consulta como \"baterista que gosta de punk rock em São Paulo\" realmente retornava as pessoas certas. As funcionalidades incluíam timeline social, um mapa para explorar o que há ao seu redor, mensagens diretas, eventos, classificados e reviews.",
    },
    tech: ["Java", "AWS", "Apache Wicket", "Lucene", "JBehave"],
    stack: [
      "Java",
      "Apache Wicket",
      "Apache Lucene",
      "JBehave",
      "AWS",
      "Bamboo (CI/CD)",
    ],
    llms: [],
    deployment: "aws",
    screenshots: [
      {
        src: "/projects/fleeber_timeline.webp",
        caption: {
          en: "The social timeline — posts, events, classifieds and nearby opportunities.",
          pt: "A timeline social — posts, eventos, classificados e oportunidades próximas.",
        },
      },
      {
        src: "/projects/fleeber_studio_email.webp",
        caption: {
          en: "Studio-booking confirmation email from the fleeber Studio product.",
          pt: "E-mail de confirmação de reserva do produto fleeber Studio.",
        },
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
