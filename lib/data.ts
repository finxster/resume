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
      en: "Joined Avenue Code as a senior engineer and tech lead — delivering microservices, data processing platforms, and enterprise integrations for major international clients. Relocated to the US partway through this stint.",
      pt: "Entrei na Avenue Code como engenheiro sênior e tech lead — entregando microsserviços, plataformas de processamento de dados e integrações corporativas para grandes clientes internacionais. Mudei-me para os EUA no meio dessa passagem.",
    },
    roles: [R.techLead, R.seniorDeveloper, R.scrumMaster, R.mentor],
    clientPeriods: [
      { client: "SquareTrade", start: 2015, end: 2018, country: "BR" },
      { client: "Williams Sonoma", start: 2018, end: 2019, country: "US" },
      { client: "GAP", start: 2019, end: 2020, country: "US" },
    ],
    tech: ["Java", "Spring Boot", "Kafka", "JMS", "Databricks", "Python", "JUnit", "Mockito", "Gradle", "Swagger", "Bash", "Jenkins", "Oracle", "SQL Server", "PostgreSQL"],
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
      en: "Left Avenue Code to lead engineering at this transit-fintech startup. Hired and onboarded developers, defined team processes, and built the Evompass (white-label digital wallet) and Mobipix (transaction management) platforms.",
      pt: "Saí da Avenue Code para liderar a engenharia nesta startup de fintech de mobilidade. Contratei e integrei desenvolvedores, defini processos de time e construí as plataformas Evompass (carteira digital white-label) e Mobipix (gestão de transações).",
    },
    roles: [R.scrumMaster, R.techLead, R.mentor],
    tech: ["Java", "Flutter", "React", "Spring Boot", "AWS", "CI/CD (GitHub Actions)", "JHipster", "Liquibase"],
  },
  {
    id: "avenuecode-2",
    track: "fte",
    code: "AC",
    initial: "AC",
    title: { en: "Senior Software Engineer · Tech Lead", pt: "Engenheiro de Software Sênior · Tech Lead" },
    company: "Avenue Code",
    shortCompany: "Avenue Code",
    short: {
      en: "Returned to consultancy — GAP, then Williams Sonoma",
      pt: "Voltei à consultoria — GAP, depois Williams Sonoma",
    },
    start: 2022,
    end: 2026,
    country: "US",
    location: { en: "USA — Remote", pt: "EUA — Remoto" },
    description: {
      en: "Returned to Avenue Code from X4Fare, picking back up the senior engineer / tech lead role for international clients — now fully remote from the US.",
      pt: "Voltei à Avenue Code depois da X4Fare, retomando o papel de engenheiro sênior / tech lead para clientes internacionais — agora totalmente remoto a partir dos EUA.",
    },
    roles: [R.techLead, R.seniorDeveloper, R.scrumMaster, R.mentor],
    clientPeriods: [
      { client: "GAP", start: 2022, end: 2023, country: "US" },
      { client: "Williams Sonoma", start: 2023, end: 2026, country: "US" },
    ],
    tech: ["Java", "Spring Boot", "Kafka", "Databricks", "Python", "AWS", "Jenkins", "PostgreSQL"],
  },
  // ── Side projects (parallel) ─────────────────────────────────────────
  {
    id: "fleeber",
    track: "side",
    code: "FL",
    initial: "fl",
    title: { en: "Co-founder", pt: "Cofundador" },
    company: "fleeber (now amy.network)",
    shortCompany: "fleeber",
    short: {
      en: "Social network for musicians — backend & infra",
      pt: "Rede social para músicos — backend & infraestrutura",
    },
    start: 2013,
    end: 2014,
    pointYear: 2013,
    country: "BR",
    location: { en: "Brazil", pt: "Brasil" },
    description: {
      en: "Co-founded a social network for musicians. Responsible for all technical decisions, backend development, infrastructure, and service integrations — with focus on performance and scalability. Continues today as amy.network.",
      pt: "Cofundei uma rede social para músicos. Responsável por todas as decisões técnicas, desenvolvimento do backend, infraestrutura e integrações de serviços — com foco em performance e escalabilidade. Continua hoje como amy.network.",
    },
    roles: [R.coFounder, R.backendEngineer],
    tech: ["Java", "AWS (EC2, RDS, SQS, S3)", "BDD", "Lucene", "JBehave", "Maven", "Mercurial", "Wicket"],
    interchangeWith: "maps",
    mergesBack: false, // drawn open like Atipically — fleeber lives on as amy.network
    dip: true, // rendered as a subtle smooth scoop off the trunk
  },
  {
    id: "atipically",
    track: "side",
    code: "AT",
    initial: "At",
    title: { en: "Co-founder", pt: "Cofundador" },
    company: "Atipically",
    shortCompany: "Atipically",
    short: {
      en: "Ongoing parallel venture — current",
      pt: "Projeto paralelo em andamento — atual",
    },
    start: 2025,
    end: 2026,
    pointYear: 2025,
    country: "US",
    location: { en: "USA — Remote", pt: "EUA — Remoto" },
    description: {
      en: "An active parallel venture started in 2025 alongside Avenue Code work. Still running today.",
      pt: "Um projeto paralelo ativo, iniciado em 2025 em paralelo ao trabalho na Avenue Code. Segue em andamento.",
    },
    roles: [R.coFounder],
    tech: ["TypeScript", "React", "Node", "PostgreSQL"],
    interchangeWith: "avenuecode-2",
    mergesBack: false, // ongoing — the branch stays open
  },
];

export const YEAR_MIN = 2002;
export const YEAR_MAX = 2026.4; // a bit past today for the open arrow

// Where I physically lived during each stretch — drives the country zones.
export const COUNTRY_PERIODS: { code: string; label: L; start: number; end: number }[] = [
  { code: "BR", label: { en: "Brazil", pt: "Brasil" }, start: 2002, end: 2018 },
  { code: "US", label: { en: "USA", pt: "EUA" }, start: 2018, end: 2020 },
  { code: "BR", label: { en: "Brazil", pt: "Brasil" }, start: 2020, end: 2022 },
  { code: "US", label: { en: "USA", pt: "EUA" }, start: 2022, end: 2026.4 },
];

export const COUNTRY_PALETTE: Record<
  string,
  { tint: string; zone: string; ink: string; accent: string }
> = {
  BR: { tint: "rgba(31,138,91,0.10)", zone: "rgba(31,138,91,0.055)", ink: "#1F8A5B", accent: "#1F8A5B" },
  US: { tint: "rgba(31,79,184,0.10)", zone: "rgba(31,79,184,0.055)", ink: "#1F4FB8", accent: "#1F4FB8" },
};
