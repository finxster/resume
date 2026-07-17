// Career data for the subway / git-graph timeline map.
// Two parallel tracks: "fte" (full-time trunk) + "side" (parallel ventures).
//
// Human-readable text fields are localized ({ en, pt }); resolve them with
// `tx(field, lang)` from lib/i18n. Structural fields (years, ids, codes,
// company names, tech) are language-independent.

import type { L } from "@/lib/i18n";

export interface ClientPeriod {
  client: string;
  start: number;
  end: number;
  country: string;
}

export interface ProgressionStep {
  years: string;
  title: L;
  note: L;
}

export interface Experience {
  id: string;
  track: "fte" | "side";
  code: string;
  initial: string;
  title: L;
  company: string;
  shortCompany: string;
  short: L;
  start: number;
  end: number;
  country: string;
  location: L;
  description: L;
  roles: L[];
  tech: string[];
  progression?: ProgressionStep[];
  clientPeriods?: ClientPeriod[];
  pointYear?: number;
  interchangeWith?: string;
  mergesBack?: boolean;
  dip?: boolean;
}

// Common short role labels, localized once and reused.
const R = {
  intern: { en: "Intern", pt: "Estagiário" },
  softwareEngineer: { en: "Software Engineer", pt: "Engenheiro de Software" },
  seniorDeveloper: { en: "Senior Developer", pt: "Desenvolvedor Sênior" },
  techLead: { en: "Tech Lead", pt: "Tech Lead" },
  scrumMaster: { en: "Scrum Master", pt: "Scrum Master" },
  productOwner: { en: "Product Owner", pt: "Product Owner" },
  mentor: { en: "Mentor", pt: "Mentor" },
  coFounder: { en: "Co-founder", pt: "Cofundador" },
  backendEngineer: { en: "Backend Engineer", pt: "Engenheiro de Backend" },
  foundingEngineer: { en: "Founding Engineer", pt: "Engenheiro Fundador" },
  mobileEngineer: { en: "Mobile Engineer", pt: "Engenheiro Mobile" },
} satisfies Record<string, L>;

const BR = { en: "São Paulo, Brazil", pt: "São Paulo, Brasil" };

export const experiences: Experience[] = [
  {
    id: "casper",
    track: "fte",
    code: "CL",
    initial: "CL",
    title: { en: "Intern", pt: "Estagiário" },
    company: "Faculdade Cásper Líbero",
    shortCompany: "Cásper Líbero",
    short: {
      en: "University IT internship — labs, support, automation",
      pt: "Estágio de TI na faculdade — laboratórios, suporte, automação",
    },
    start: 2002,
    end: 2005,
    country: "BR",
    location: BR,
    description: {
      en: "Internship in the university's IT department. Maintained computer labs, supported students with tech issues, and automated administrative routines.",
      pt: "Estágio no departamento de TI da faculdade. Mantinha os laboratórios de informática, dava suporte técnico aos alunos e automatizava rotinas administrativas.",
    },
    roles: [R.intern],
    tech: ["Bash Scripting", "JavaScript"],
  },
  {
    id: "maps",
    track: "fte",
    code: "MS",
    initial: "MS",
    title: {
      en: "Engineer → Senior · Tech Lead · Scrum Master",
      pt: "Engenheiro → Sênior · Tech Lead · Scrum Master",
    },
    company: "MAPS Soluções",
    shortCompany: "MAPS Soluções",
    short: {
      en: "A decade in financial systems — intern to tech lead",
      pt: "Uma década em sistemas financeiros — de estagiário a tech lead",
    },
    start: 2005,
    end: 2015,
    country: "BR",
    location: BR,
    description: {
      en: "Ten years at MAPS. Started as an intern, grew into engineering, and eventually led teams across investment-fund and payments projects — combining hands-on engineering with agile facilitation and product ownership.",
      pt: "Dez anos na MAPS. Comecei como estagiário, evoluí na engenharia e passei a liderar times em projetos de fundos de investimento e pagamentos — combinando engenharia hands-on com facilitação ágil e product ownership.",
    },
    roles: [R.intern, R.softwareEngineer, R.seniorDeveloper, R.techLead, R.scrumMaster, R.productOwner],
    progression: [
      {
        years: "2005 – 2010",
        title: { en: "Intern → Software Engineer", pt: "Estagiário → Engenheiro de Software" },
        note: {
          en: "Fund control, payment systems, and banking — across multiple backend layers.",
          pt: "Controle de fundos, sistemas de pagamento e bancário — em múltiplas camadas de backend.",
        },
      },
      {
        years: "2010 – 2015",
        title: {
          en: "Senior Engineer · Tech Lead · Scrum Master",
          pt: "Engenheiro Sênior · Tech Lead · Scrum Master",
        },
        note: {
          en: "Led teams on investment-fund solutions, agile management, and requirements analysis.",
          pt: "Liderei times em soluções de fundos de investimento, gestão ágil e análise de requisitos.",
        },
      },
    ],
    tech: ["Java", "Spring", "Hibernate", "Velocity", "JSF", "Wicket", "Jetty", "AWS", "Ant", "Maven", "Jenkins", "SVN", "Mercurial", "Oracle", "PostgreSQL"],
  },
  {
    id: "avenuecode-1",
    track: "fte",
    code: "AC",
    initial: "AC",
    title: { en: "Senior Software Engineer · Tech Lead", pt: "Engenheiro de Software Sênior · Tech Lead" },
    company: "Avenue Code",
    shortCompany: "Avenue Code",
    short: {
      en: "First stint — microservices & integrations for global clients",
      pt: "Primeira passagem — microsserviços e integrações para clientes globais",
    },
    start: 2015,
    end: 2020,
    country: "BR/US",
    location: { en: "São Paulo, Brazil → USA", pt: "São Paulo, Brasil → EUA" },
    description: {
      en: "Joined Avenue Code as a senior engineer and tech lead. Started on the SquareTrade account in Brazil — one of the first three engineers, growing the team to 30+ — then relocated to the US: on-site at Merchant e-Solutions for their AMEX certification, microservices at Williams Sonoma, and the PIM / Data Governance (Stibo → Kafka) project at GAP.",
      pt: "Entrei na Avenue Code como engenheiro sênior e tech lead. Comecei na conta da SquareTrade no Brasil — um dos três primeiros engenheiros, ajudando a crescer o time para mais de 30 pessoas — e depois me mudei para os EUA: on-site na Merchant e-Solutions para a certificação AMEX, microsserviços na Williams Sonoma e o projeto de PIM / Data Governance (Stibo → Kafka) na GAP.",
    },
    roles: [R.techLead, R.seniorDeveloper, R.scrumMaster, R.mentor],
    clientPeriods: [
      { client: "SquareTrade", start: 2015, end: 2017, country: "BR" },
      { client: "Merchant e-Solutions", start: 2017, end: 2018, country: "US" },
      { client: "Williams Sonoma", start: 2018, end: 2019, country: "US" },
      { client: "GAP", start: 2019, end: 2020, country: "US" },
    ],
    tech: ["Java", "Spring Boot", "Kafka", "JMS", "SOAP", "Apache Camel", "EJB", "JUnit", "Mockito", "Gradle", "Swagger", "Bash", "Jenkins", "Oracle", "SQL Server", "PostgreSQL"],
  },
  {
    id: "x4fare",
    track: "fte",
    code: "X4",
    initial: "X4",
    title: { en: "Founding Engineer · Tech Lead", pt: "Engenheiro Fundador · Tech Lead" },
    company: "X4Fare",
    shortCompany: "X4Fare",
    short: {
      en: "Stepped off the consultancy track to build a transit fintech",
      pt: "Saí da trilha de consultoria para construir uma fintech de mobilidade",
    },
    start: 2020,
    end: 2022,
    country: "BR",
    location: { en: "Brazil — Remote", pt: "Brasil — Remoto" },
    description: {
      en: "The project that pushed me furthest outside my comfort zone. Joined early and turned product ideas into production software for real customers — switching between backend, mobile, hiring, mentoring, and product depending on the day. Mobile wasn't my background, so I learned Flutter and built the mobile side of the platform. We shipped a white-label digital wallet and a transaction platform aggregating multiple transport and payment systems, validated with paying pilot customers, and I built onboarding that got new engineers shipping production code in ~two weeks.",
      pt: "O projeto que mais me tirou da zona de conforto. Entrei cedo e transformei ideias de produto em software em produção para clientes reais — alternando entre backend, mobile, contratação, mentoria e produto conforme o dia. Mobile não fazia parte da minha bagagem, então aprendi Flutter e construí o lado mobile da plataforma. Entregamos uma carteira digital white-label e uma plataforma de transações que agregava múltiplos sistemas de transporte e pagamento, validada com clientes-piloto pagantes, e criei um onboarding que fazia novos engenheiros subirem código em produção em ~duas semanas.",
    },
    roles: [R.scrumMaster, R.techLead, R.mentor],
    tech: ["Java", "Flutter", "React", "Spring Boot", "AWS", "CI/CD (GitHub Actions)", "JHipster", "Liquibase"],
  },
  {
    id: "avenuecode-2",
    track: "fte",
    code: "AC",
    initial: "AC",
    title: { en: "Senior Engineer → Tech Lead · AI", pt: "Engenheiro Sênior → Tech Lead · IA" },
    company: "Avenue Code",
    shortCompany: "Avenue Code",
    short: {
      en: "Return to consultancy — from GAP data platforms to leading an AI-built rules engine",
      pt: "Volta à consultoria — de plataformas de dados na GAP a liderar um motor de regras feito com IA",
    },
    start: 2022,
    end: 2026,
    country: "US",
    location: { en: "SF Bay Area, USA", pt: "SF Bay Area, EUA" },
    description: {
      en: "Sitting between hands-on engineering and technical leadership for Fortune 500 retail across supply chain, logistics, data engineering, and AI. Built the proof-of-concept for a strategic internal rules platform that led leadership to replace a commercial vendor — now a foundation for future AI work — and helped pioneer AI-first engineering practices (workflows, prompts, guidelines) adopted by multiple teams. Also built an operational dashboard used across supply-chain teams (service health, deployments, environment availability, auto-created Jira tickets) and coordinated migrating ~20 microservices from Java 11 to 21.",
      pt: "Atuando entre engenharia hands-on e liderança técnica para varejo Fortune 500 em supply chain, logística, engenharia de dados e IA. Construí a prova de conceito de uma plataforma de regras interna estratégica que levou a liderança a substituir um fornecedor comercial — hoje base para futuras iniciativas de IA — e ajudei a ser pioneiro em práticas de engenharia AI-first (workflows, prompts, diretrizes) adotadas por múltiplos times. Também construí um dashboard operacional usado por vários times de supply chain (saúde dos serviços, deploys, disponibilidade de ambientes, criação automática de tickets no Jira) e coordenei a migração de ~20 microsserviços de Java 11 para 21.",
    },
    roles: [R.techLead, R.seniorDeveloper, R.scrumMaster, R.mentor],
    progression: [
      {
        years: "2025 – now",
        title: { en: "Tech Lead · AI Rules Engine", pt: "Tech Lead · Motor de Regras com IA" },
        note: {
          en: "Hands-on tech lead and lead developer of the internal rules-engine product — 100% AI/agentic with Codex, pioneering AI across the supply-chain vertical, defining AI processes, sharing best practices, and mentoring a 3-dev team.",
          pt: "Tech lead hands-on e principal desenvolvedor do produto interno de motor de regras — 100% IA/agentic com Codex, pioneiro em IA na vertical de supply chain, definindo processos de IA, compartilhando boas práticas e mentorando um time de 3 devs.",
        },
      },
      {
        years: "2024 – 2025",
        title: { en: "Tech Evolution & AI", pt: "Evolução Técnica & IA" },
        note: {
          en: "Led a 3-person team migrating ~20 microservices from Java 11 to 21; built an AI-powered DevOps dashboard used by all teams, authored a Python integration solo, and ran a successful Drools POC to replace a vendor — all with GitHub Copilot.",
          pt: "Liderei um time de 3 pessoas na migração de ~20 microsserviços de Java 11 para 21; construí um dashboard de DevOps com IA usado por todos os times, escrevi sozinho uma integração em Python e conduzi um POC bem-sucedido com Drools para substituir um fornecedor — tudo com GitHub Copilot.",
        },
      },
      {
        years: "2023 – 2024",
        title: { en: "Williams Sonoma · Supply Chain", pt: "Williams Sonoma · Supply Chain" },
        note: {
          en: "Supply-chain microservices integrating warehouse systems (PKMS/WMOS) with personalization (Pulse); built a reusable file-upload framework and automated the back-order flow.",
          pt: "Microsserviços de supply chain integrando sistemas de armazém (PKMS/WMOS) com personalização (Pulse); criei um framework reutilizável de file upload e automatizei o fluxo de back-order.",
        },
      },
      {
        years: "2022 – 2023",
        title: { en: "GAP · Hands Free Planning", pt: "GAP · Hands Free Planning" },
        note: {
          en: "Built a Databricks/Python simulation platform so the data-science team could normalize data from many sources and optimize purchasing decisions.",
          pt: "Construí uma plataforma de simulação em Databricks/Python para o time de data science normalizar dados de várias fontes e otimizar decisões de compra.",
        },
      },
    ],
    clientPeriods: [
      { client: "GAP", start: 2022, end: 2023, country: "US" },
      { client: "Williams Sonoma", start: 2023, end: 2026, country: "US" },
    ],
    tech: ["Java 21", "Spring Boot", "Spring WebFlux", "Kafka", "Drools", "AI / LLMs", "Agentic AI", "GitHub Copilot", "Codex", "Databricks", "Python", "AWS", "Jenkins", "Oracle", "SQL Server"],
  },
  // ── Side projects (parallel) ─────────────────────────────────────────
  {
    id: "fleeber",
    track: "side",
    code: "FL",
    initial: "fl",
    title: { en: "Co-founder", pt: "Cofundador" },
    company: "fleeber",
    shortCompany: "fleeber",
    short: {
      en: "Social network for musicians, with a studio-booking system",
      pt: "Rede social para músicos, com sistema de agendamento para estúdios",
    },
    start: 2013,
    end: 2015,
    country: "BR",
    location: { en: "Brazil", pt: "Brasil" },
    description: {
      en: "Co-founded a social network for musicians, with a booking system for rehearsal and recording studios. I built the entire backend of the social network, plus the full stack — backend and frontend — of the studio-booking product, in Java with Apache Wicket. Search ran on Apache Lucene, inspired by LinkedIn's approach for fine-grained control over ranking, in a pre-AI era and the very early days of Elasticsearch. A BDD test strategy with JBehave guaranteed natural-language search worked — a query like \"punk-rock drummer in São Paulo\" actually returned the right people.",
      pt: "Cofundei uma rede social para músicos, com sistema de agendamento para estúdios de ensaio e gravação. Implementei o backend inteiro da rede social, além do stack completo — backend e frontend — do produto de agendamento de estúdios, em Java com Apache Wicket. A busca rodava sobre o Apache Lucene, inspirada pela abordagem do LinkedIn para ter controle fino sobre o ranking, numa era pré-IA e no comecinho do Elasticsearch. Uma estratégia de testes BDD com JBehave garantia que a busca em linguagem natural funcionava — uma consulta como \"baterista que gosta de punk rock em São Paulo\" realmente retornava as pessoas certas.",
    },
    roles: [R.coFounder, R.backendEngineer],
    tech: ["Java", "AWS (EC2, RDS, S3)", "BDD", "Lucene", "JBehave", "Maven", "Wicket", "Bamboo"],
    interchangeWith: "maps",
    // mergesBack (default) — the branch rises and returns to the trunk
  },
  {
    id: "payaqui",
    track: "side",
    code: "PA",
    initial: "pa",
    title: { en: "Founding Engineer · Mobile", pt: "Engenheiro Fundador · Mobile" },
    company: "PayAqui",
    shortCompany: "PayAqui",
    short: {
      en: "Founding engineer building native Android & iOS apps for a payments venture",
      pt: "Engenheiro fundador construindo apps nativos Android & iOS para uma fintech de pagamentos",
    },
    start: 2018,
    end: 2019,
    country: "BR",
    location: { en: "Brazil", pt: "Brasil" },
    description: {
      en: "Founding engineer at PayAqui, a side payments venture. Designed and built the company's native mobile apps for Android and iOS end to end — from architecture to shipping — while also owning non-technical work like requirements discovery and UX, and contributing to the Java backend.",
      pt: "Engenheiro fundador na PayAqui, uma fintech de pagamentos tocada em paralelo. Projetei e construí os apps mobile nativos da empresa para Android e iOS de ponta a ponta — da arquitetura à publicação — participando ativamente também de funções não técnicas como descoberta de requisitos e UX, além de contribuir com o backend em Java.",
    },
    roles: [R.foundingEngineer, R.mobileEngineer],
    tech: ["Java (Android)", "Swift (iOS)", "Java (backend)", "REST APIs", "Bamboo"],
    interchangeWith: "avenuecode-1",
    // mergesBack (default) — the branch rises and returns to the trunk
  },
  {
    id: "atipically",
    track: "side",
    code: "AT",
    initial: "At",
    title: { en: "Founder & Engineer", pt: "Fundador & Engenheiro" },
    company: "AtipicALI",
    shortCompany: "AtipicALI",
    short: {
      en: "Ongoing parallel venture — current",
      pt: "Projeto paralelo em andamento — atual",
    },
    start: 2025,
    end: 2026,
    pointYear: 2025,
    country: "US",
    location: { en: "SF Bay Area, USA", pt: "SF Bay Area, EUA" },
    description: {
      en: "My current side project and the closest representation of how I enjoy building software. Started as a platform to help neurodivergent individuals and families find services, businesses, and places that fit their needs, and grew into a broader ecosystem — place discovery, content management, scheduling, booking, and AI-assisted experiences. I'm responsible for the entire technical side: architecture, backend, frontend, infrastructure, deployment, auth, admin tools, and AI integrations — and it's where I experiment with agentic workflows and ideas I later bring back into my professional work.",
      pt: "Meu projeto paralelo atual e a representação mais fiel de como eu gosto de construir software. Começou como uma plataforma para ajudar pessoas e famílias neurodivergentes a encontrar serviços, negócios e lugares que atendam melhor às suas necessidades, e evoluiu para um ecossistema mais amplo — descoberta de lugares, gestão de conteúdo, agendamento, reservas e experiências assistidas por IA. Sou responsável por toda a parte técnica: arquitetura, backend, frontend, infraestrutura, deploy, autenticação, ferramentas de administração e integrações de IA — e é onde experimento workflows agentic e ideias que depois trago para o meu trabalho profissional.",
    },
    roles: [R.coFounder],
    tech: ["Java", "Spring Boot", "Vue", "PostgreSQL"],
    interchangeWith: "avenuecode-2",
    mergesBack: false, // ongoing — the branch stays open
  },
];

export const YEAR_MIN = 2002;
export const YEAR_MAX = 2028; // a bit past today for the open arrow + current tail

// Where I physically lived during each stretch — drives the country zones.
export const COUNTRY_PERIODS: { code: string; label: L; start: number; end: number }[] = [
  { code: "BR", label: { en: "Brazil", pt: "Brasil" }, start: 2002, end: 2018 },
  { code: "US", label: { en: "USA", pt: "EUA" }, start: 2018, end: 2020 },
  { code: "BR", label: { en: "Brazil", pt: "Brasil" }, start: 2020, end: 2022 },
  { code: "US", label: { en: "USA", pt: "EUA" }, start: 2022, end: 2028 },
];

export const COUNTRY_PALETTE: Record<
  string,
  { tint: string; zone: string; ink: string; accent: string }
> = {
  // Cool Graphite brand: zones are neutral graphite tints (indigo stays
  // reserved for stations/links); alternating opacity keeps them legible.
  BR: { tint: "rgba(20,22,26,0.08)", zone: "rgba(20,22,26,0.045)", ink: "#4B5563", accent: "#4B5563" },
  US: { tint: "rgba(20,22,26,0.04)", zone: "rgba(20,22,26,0.02)", ink: "#4B5563", accent: "#4B5563" },
};
