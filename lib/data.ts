export interface Experience {
  id: string;
  title: string;
  company: string;
  type: "job" | "startup" | "education";
  startYear: number;
  endYear: number;
  description: string;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    id: "x4fare",
    title: "Founding Engineer",
    company: "X4Fare",
    type: "startup",
    startYear: 2020,
    endYear: 2021,
    description:
      "Led the technical development of the startup. Responsible for hiring and onboarding developers, defining team processes, and developing the Evompass (white-label digital wallet) and Mobipix (transaction management system) platforms.",
    tags: ["Node.js", "React", "Architecture", "Team Leadership"],
  },
  {
    id: "avenue",
    title: "Tech Lead / Senior Software Engineer",
    company: "Avenue Code",
    type: "job",
    startYear: 2015,
    endYear: 2023,
    description:
      "Acted as tech lead and senior engineer on projects for major international clients, delivering robust microservices, data processing platforms, and enterprise integrations. Also worked as a mentor and agile facilitator.",
    tags: ["Microservices", "Node.js", "Java", "Agile", "Mentoring"],
  },
  {
    id: "maps2",
    title: "Senior SWE / Tech Lead / Scrum Master",
    company: "MAPS Soluções e Serviços",
    type: "job",
    startYear: 2010,
    endYear: 2015,
    description:
      "Held multiple roles in finance-related projects, including technical leadership, agile management, and requirements analysis. Led teams, managed planning, and ensured delivery of critical solutions for investment funds.",
    tags: ["Java", "Finance", "Scrum", "Team Leadership"],
  },
  {
    id: "fleeber",
    title: "Co-founder",
    company: "fleeber (now amy.network)",
    type: "startup",
    startYear: 2012,
    endYear: 2014,
    description:
      "Co-founded a social network for musicians. Responsible for all technical decisions and backend development, infrastructure, and service integrations, with focus on performance and scalability.",
    tags: ["Node.js", "MongoDB", "Startup", "Co-founder"],
  },
  {
    id: "maps1",
    title: "Software Engineer",
    company: "MAPS Soluções e Serviços",
    type: "job",
    startYear: 2005,
    endYear: 2010,
    description:
      "Started as an intern and progressed to software engineer, contributing to projects in fund control, payment systems, and banking. Worked across multiple layers of backend systems.",
    tags: ["Java", ".NET", "Banking", "Finance"],
  },
  {
    id: "casper",
    title: "Intern",
    company: "Faculdade Cásper Líbero",
    type: "education",
    startYear: 2002,
    endYear: 2005,
    description:
      "Internship in the university's IT department. Responsible for maintaining computer labs, supporting students with tech issues, and automating administrative routines.",
    tags: ["IT Support", "Automation"],
  },
];
