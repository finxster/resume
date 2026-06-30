// Career data for the subway / git-graph timeline map.
// Two parallel tracks: "fte" (full-time trunk) + "side" (parallel ventures).

export interface ClientPeriod {
  client: string;
  start: number;
  end: number;
  country: string;
}

export interface ProgressionStep {
  years: string;
  title: string;
  note: string;
}

export interface Experience {
  id: string;
  track: "fte" | "side";
  code: string;
  initial: string;
  title: string;
  company: string;
  shortCompany: string;
  short: string;
  start: number;
  end: number;
  country: string;
  location: string;
  description: string;
  roles: string[];
  tech: string[];
  progression?: ProgressionStep[];
  clientPeriods?: ClientPeriod[];
  pointYear?: number;
  interchangeWith?: string;
  mergesBack?: boolean;
  dip?: boolean;
}

export const experiences: Experience[] = [
  {
    id: "casper",
    track: "fte",
    code: "CL",
    initial: "CL",
    title: "Intern",
    company: "Faculdade Cásper Líbero",
    shortCompany: "Cásper Líbero",
    short: "University IT internship — labs, support, automation",
    start: 2002,
    end: 2005,
    country: "BR",
    location: "São Paulo, Brazil",
    description:
      "Internship in the university's IT department. Maintained computer labs, supported students with tech issues, and automated administrative routines.",
    roles: ["Intern"],
    tech: ["Bash Scripting", "JavaScript"],
  },
  {
    id: "maps",
    track: "fte",
    code: "MS",
    initial: "MS",
    title: "Engineer → Senior · Tech Lead · Scrum Master",
    company: "MAPS Soluções",
    shortCompany: "MAPS Soluções",
    short: "A decade in financial systems — intern to tech lead",
    start: 2005,
    end: 2015,
    country: "BR",
    location: "São Paulo, Brazil",
    description:
      "Ten years at MAPS. Started as an intern, grew into engineering, and eventually led teams across investment-fund and payments projects — combining hands-on engineering with agile facilitation and product ownership.",
    roles: ["Intern", "Software Engineer", "Senior Developer", "Tech Lead", "Scrum Master", "Product Owner"],
    progression: [
      {
        years: "2005 – 2010",
        title: "Intern → Software Engineer",
        note: "Fund control, payment systems, and banking — across multiple backend layers.",
      },
      {
        years: "2010 – 2015",
        title: "Senior Engineer · Tech Lead · Scrum Master",
        note: "Led teams on investment-fund solutions, agile management, and requirements analysis.",
      },
    ],
    tech: ["Java", "Spring", "Hibernate", "Velocity", "JSF", "Wicket", "Jetty", "AWS", "Ant", "Maven", "Jenkins", "SVN", "Mercurial", "Oracle", "PostgreSQL"],
  },
  {
    id: "avenuecode-1",
    track: "fte",
    code: "AC",
    initial: "AC",
    title: "Senior Software Engineer · Tech Lead",
    company: "Avenue Code",
    shortCompany: "Avenue Code",
    short: "First stint — microservices & integrations for global clients",
    start: 2015,
    end: 2020,
    country: "BR/US",
    location: "São Paulo, Brazil → USA",
    description:
      "Joined Avenue Code as a senior engineer and tech lead — delivering microservices, data processing platforms, and enterprise integrations for major international clients. Relocated to the US partway through this stint.",
    roles: ["Tech Lead", "Senior Developer", "Scrum Master", "Mentor"],
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
    title: "Founding Engineer · Tech Lead",
    company: "X4Fare",
    shortCompany: "X4Fare",
    short: "Stepped off the consultancy track to build a transit fintech",
    start: 2020,
    end: 2022,
    country: "BR",
    location: "Brazil — Remote",
    description:
      "Left Avenue Code to lead engineering at this transit-fintech startup. Hired and onboarded developers, defined team processes, and built the Evompass (white-label digital wallet) and Mobipix (transaction management) platforms.",
    roles: ["Scrum Master", "Tech Lead", "Mentor"],
    tech: ["Java", "Flutter", "React", "Spring Boot", "AWS", "CI/CD (GitHub Actions)", "JHipster", "Liquibase"],
  },
  {
    id: "avenuecode-2",
    track: "fte",
    code: "AC",
    initial: "AC",
    title: "Senior Software Engineer · Tech Lead",
    company: "Avenue Code",
    shortCompany: "Avenue Code",
    short: "Returned to consultancy — GAP, then Williams Sonoma",
    start: 2022,
    end: 2026,
    country: "US",
    location: "USA — Remote",
    description:
      "Returned to Avenue Code from X4Fare, picking back up the senior engineer / tech lead role for international clients — now fully remote from the US.",
    roles: ["Tech Lead", "Senior Developer", "Scrum Master", "Mentor"],
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
    title: "Co-founder",
    company: "fleeber (now amy.network)",
    shortCompany: "fleeber",
    short: "Social network for musicians — backend & infra",
    start: 2013,
    end: 2014,
    pointYear: 2013,
    country: "BR",
    location: "Brazil",
    description:
      "Co-founded a social network for musicians. Responsible for all technical decisions, backend development, infrastructure, and service integrations — with focus on performance and scalability. Continues today as amy.network.",
    roles: ["Co-founder", "Backend Engineer"],
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
    title: "Co-founder",
    company: "Atipically",
    shortCompany: "Atipically",
    short: "Ongoing parallel venture — current",
    start: 2025,
    end: 2026,
    pointYear: 2025,
    country: "US",
    location: "USA — Remote",
    description:
      "An active parallel venture started in 2025 alongside Avenue Code work. Still running today.",
    roles: ["Co-founder"],
    tech: ["TypeScript", "React", "Node", "PostgreSQL"],
    interchangeWith: "avenuecode-2",
    mergesBack: false, // ongoing — the branch stays open
  },
];

export const YEAR_MIN = 2002;
export const YEAR_MAX = 2026.4; // a bit past today for the open arrow

// Where I physically lived during each stretch — drives the country zones.
export const COUNTRY_PERIODS = [
  { code: "BR", label: "Brazil", start: 2002, end: 2018 },
  { code: "US", label: "USA", start: 2018, end: 2020 },
  { code: "BR", label: "Brazil", start: 2020, end: 2022 },
  { code: "US", label: "USA", start: 2022, end: 2026.4 },
];

export const COUNTRY_PALETTE: Record<
  string,
  { tint: string; zone: string; ink: string; accent: string }
> = {
  BR: { tint: "rgba(31,138,91,0.10)", zone: "rgba(31,138,91,0.055)", ink: "#1F8A5B", accent: "#1F8A5B" },
  US: { tint: "rgba(31,79,184,0.10)", zone: "rgba(31,79,184,0.055)", ink: "#1F4FB8", accent: "#1F4FB8" },
};
