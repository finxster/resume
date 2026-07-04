// Structured resume content for the downloadable PDF, in both languages.
// Authored to mirror the site (lib/data.ts / lib/projects.ts) plus the extra
// detail from the full CVs. Re-run scripts/generate-resume.mjs after editing.

export const contact = {
  name: "Luis Felipe Volpato Alves",
  email: "mail.for.luis.alves@gmail.com",
  phone: "(415) 272-9149",
  linkedin: "linkedin.com/in/luisfvalves",
  github: "github.com/finxster",
  site: "finx.dev",
};

export const content = {
  en: {
    role: "Staff Software Engineer · Tech Lead · Scrum Master",
    location: "SF Bay Area, USA",
    labels: {
      summary: "Summary",
      skills: "Technical Skills",
      experience: "Professional Experience",
      ventures: "Entrepreneurial Ventures",
      education: "Education",
      languages: "Languages",
      certifications: "Certifications",
      client: "Client",
      tech: "Tech",
      present: "Present",
    },
    summary:
      "Senior software engineer with 17+ years across the full software lifecycle — UX, analysis, design, development, testing, and deployment. Experienced on backend-only, backend + frontend, and backend + mobile projects, acting as Developer, Tech Lead, or Scrum Master / Agile facilitator depending on the team's needs. Strong entrepreneurial streak: founding engineer at X4Fare and PayAqui, co-founder of fleeber (now amy.network), and currently building AtipicALI. I lead by example, enjoy working with non-technical stakeholders, and turn ambiguity into shipped products.",
    skills: [
      { group: "Backend", items: "Java (8–21), Spring Boot, Spring WebFlux, Kafka, Hibernate, Drools, Python, REST, JMS, SOAP" },
      { group: "Frontend & Mobile", items: "React, TypeScript, JavaScript, Flutter, Swift (iOS), Android, JSF, Wicket" },
      { group: "Cloud & Data", items: "AWS (EC2, RDS, SQS, S3), Databricks, Oracle, SQL Server, PostgreSQL" },
      { group: "DevOps & Tooling", items: "CI/CD, GitHub Actions, Jenkins, Bamboo, Maven, Gradle, Git, Liquibase, JHipster" },
      { group: "AI & Practices", items: "AI / LLMs, Agentic AI, GitHub Copilot, Codex, TDD/BDD, JUnit, Mockito, Scrum, Kanban" },
    ],
    experience: [
      {
        company: "Avenue Code",
        title: "Senior Software Engineer · Tech Lead",
        place: "SF Bay Area, USA — Remote",
        period: "2022 – Present",
        bullets: [
          "Hands-on tech lead across GAP and Williams Sonoma accounts, fully remote from the US.",
          "GAP · Hands Free Planning: built a Databricks/Python simulation platform that normalizes data from many sources so the data-science team can optimize purchasing decisions.",
          "Williams Sonoma · Supply Chain: developed microservices integrating warehouse systems (PKMS/WMOS) with the personalization platform (Pulse); built a reusable file-upload framework and automated the back-order notification flow across all brands.",
          "Led a 3-person team migrating ~20 microservices from Java 11 to Java 21; built an AI-powered DevOps dashboard adopted by all teams.",
          "Ran a successful Drools proof-of-concept and now lead an AI-built internal rules-engine product that replaced a third-party vendor — pioneering AI-first, agentic development across the supply-chain vertical.",
        ],
        tech: "Java 21, Spring Boot, Spring WebFlux, Kafka, Drools, AI/LLMs, Agentic AI, GitHub Copilot, Codex, Databricks, Python, AWS, Jenkins, Oracle, SQL Server",
      },
      {
        company: "X4Fare",
        title: "Founding Engineer",
        place: "São Paulo, Brazil — Remote",
        period: "2020 – 2021",
        bullets: [
          "Founding engineer of a transit-fintech startup: managed the development team, sourced and hired talent, and created the interview and onboarding processes (new developers shipped to production within two weeks).",
          "Acted as Scrum Master and senior engineer, mentoring and coaching junior developers and interns.",
          "Shipped two platforms: Evompass — a standalone white-label digital wallet — and Mobipix — an app to manage transactions from multiple sources, including turnstile transactions from public-transport buses.",
          "Built with JHipster backends, React frontends, and Flutter apps; Mobipix included an SDK for Android devices.",
        ],
        tech: "Java, Flutter, React, Spring Boot, AWS, JHipster, Liquibase, GitHub Actions (CI/CD)",
      },
      {
        company: "Avenue Code",
        title: "Senior Software Engineer · Tech Lead",
        place: "São Paulo, Brazil → USA",
        period: "2015 – 2020",
        bullets: [
          "SquareTrade: one of the first three engineers to start the account in Brazil — the work grew the team to 30+ people. Worked on Merchant Integrations (Apache Camel, Apache Zookeeper); acted as Tech Lead, Scrum Master, and 'Buddy' (managerial mentoring role).",
          "Merchant e-Solutions: traveled to Redwood City, CA to help the company achieve AMEX certification, working on-site.",
          "Williams Sonoma: built microservices on top of a Sterling application layer; helped the team build dashboards in pure JS/HTML plus Bash scripts.",
          "GAP · PIM / Data Governance: led and mentored the team on unit and integration tests for Kafka, replacing the product catalog (Pacman) with Stibo and publishing standardized data into a Kafka cluster; also served as Management Mentor.",
        ],
        tech: "Java, Spring Boot, Kafka, JMS, SOAP, Apache Camel, EJB, JUnit, Mockito, Gradle, Swagger, Bash, Jenkins, Oracle, SQL Server, PostgreSQL",
      },
      {
        company: "MAPS Soluções e Serviços",
        title: "Intern → Senior Engineer · Tech Lead · Scrum Master · Product Owner",
        place: "São Paulo, Brazil",
        period: "2005 – 2015",
        bullets: [
          "Ten years in financial systems, acting as the team needed: Senior Engineer, Tech Lead, Technical Manager, Scrum Master, or Product Owner.",
          "Investment-fund platforms — Centaurus (control & bookkeeping), NAVE (asset management), and fund-management regulatory features: designed and developed the tax component (system core), business analysis, and test scenarios.",
          "Earlier banking/payments systems — Pegasus (custody & controllership), BWPAG (Brazilian payment control), and TCL (customer control for a major global bank).",
          "As Technical Manager owned planning, scheduling, hiring, and feedback; as Product Owner gathered and prioritized requirements directly with clients.",
        ],
        tech: "Java, Spring, Hibernate, Jetty, Wicket, Velocity, JSF, AWS, Oracle, PostgreSQL, Maven, Ant, Jenkins, SVN, Mercurial",
      },
      {
        company: "Faculdade Cásper Líbero",
        title: "IT Intern",
        place: "São Paulo, Brazil",
        period: "2002 – 2005",
        bullets: [
          "Maintained the university's computer labs, supported students with technical issues, and automated administrative routines.",
        ],
        tech: "Bash Scripting, JavaScript",
      },
    ],
    ventures: [
      {
        name: "AtipicALI",
        title: "Co-founder",
        period: "2025 – Present",
        desc: "An active parallel venture started in 2025 alongside full-time work, still running today.",
      },
      {
        name: "PayAqui",
        title: "Founding Engineer · Mobile",
        period: "2018 – 2019",
        desc: "Founding engineer of a side payments venture. Designed and built the native Android and iOS apps end to end — from architecture to shipping — while also owning requirements discovery and UX, and contributing to the Java backend.",
      },
      {
        name: "fleeber (now amy.network)",
        title: "Co-founder",
        period: "2013 – 2015",
        desc: "Co-founded a social network for musicians with three applications (public app, back-office, and Studios ERP). Responsible for all technical decisions and most of the development, using a BDD approach, an Apache Lucene search engine, and AWS infrastructure. Continues today as amy.network.",
      },
    ],
    education: [
      { degree: "Bachelor in Computer Science", school: "Pontifical Catholic University of São Paulo (PUC-SP)", period: "2002 – 2009" },
    ],
    languages: "Portuguese (native/bilingual) · English (full professional proficiency)",
    certifications: [
      "PSM — Professional Scrum Master, Scrum.org (2017)",
      "MCD — Integration & API Associate, MuleSoft (2018)",
      "KMP I — Kanban Management Professional, Kanban University (2015)",
      "Building High-Performing Teams, Stanford University (2020)",
      "An Introduction to Agile Project Management, Stanford University (2020)",
      "Swift & TDD/Unit tests, Managing projects with Scrum (Alura, 2015) · UX & Usability (Adaptworks, 2014)",
    ],
  },

  pt: {
    role: "Staff Software Engineer · Tech Lead · Scrum Master",
    location: "SF Bay Area, EUA",
    labels: {
      summary: "Resumo",
      skills: "Competências Técnicas",
      experience: "Experiência Profissional",
      ventures: "Empreendimentos",
      education: "Formação",
      languages: "Idiomas",
      certifications: "Certificações",
      client: "Cliente",
      tech: "Tecnologias",
      present: "Atual",
    },
    summary:
      "Engenheiro de software sênior com mais de 17 anos de experiência em todo o ciclo de desenvolvimento — UX, análise, design, desenvolvimento, testes e deploy. Atuei em projetos só de backend, de backend + frontend e de backend + mobile, como Desenvolvedor, Tech Lead ou Scrum Master / facilitador ágil, conforme a necessidade do time. Forte perfil empreendedor: engenheiro fundador na X4Fare e na PayAqui, cofundador da fleeber (hoje amy.network) e atualmente construindo a AtipicALI. Lidero pelo exemplo, gosto de trabalhar com pessoas não-técnicas e transformo ambiguidade em produtos entregues.",
    skills: [
      { group: "Backend", items: "Java (8–21), Spring Boot, Spring WebFlux, Kafka, Hibernate, Drools, Python, REST, JMS, SOAP" },
      { group: "Frontend & Mobile", items: "React, TypeScript, JavaScript, Flutter, Swift (iOS), Android, JSF, Wicket" },
      { group: "Cloud & Dados", items: "AWS (EC2, RDS, SQS, S3), Databricks, Oracle, SQL Server, PostgreSQL" },
      { group: "DevOps & Ferramentas", items: "CI/CD, GitHub Actions, Jenkins, Bamboo, Maven, Gradle, Git, Liquibase, JHipster" },
      { group: "IA & Práticas", items: "IA / LLMs, IA Agentic, GitHub Copilot, Codex, TDD/BDD, JUnit, Mockito, Scrum, Kanban" },
    ],
    experience: [
      {
        company: "Avenue Code",
        title: "Engenheiro de Software Sênior · Tech Lead",
        place: "SF Bay Area, EUA — Remoto",
        period: "2022 – Atual",
        bullets: [
          "Tech lead hands-on nas contas GAP e Williams Sonoma, totalmente remoto a partir dos EUA.",
          "GAP · Hands Free Planning: construí uma plataforma de simulação em Databricks/Python que normaliza dados de várias fontes para o time de data science otimizar decisões de compra.",
          "Williams Sonoma · Supply Chain: desenvolvi microsserviços integrando sistemas de armazém (PKMS/WMOS) com a plataforma de personalização (Pulse); criei um framework reutilizável de file upload e automatizei o fluxo de notificação de back-order para todas as marcas.",
          "Liderei um time de 3 pessoas na migração de ~20 microsserviços de Java 11 para Java 21; construí um dashboard de DevOps com IA adotado por todos os times.",
          "Conduzi um POC bem-sucedido com Drools e hoje lidero um produto interno de motor de regras construído com IA que substituiu um fornecedor externo — sendo pioneiro em desenvolvimento AI-first e agentic na vertical de supply chain.",
        ],
        tech: "Java 21, Spring Boot, Spring WebFlux, Kafka, Drools, IA/LLMs, IA Agentic, GitHub Copilot, Codex, Databricks, Python, AWS, Jenkins, Oracle, SQL Server",
      },
      {
        company: "X4Fare",
        title: "Engenheiro Fundador",
        place: "São Paulo, Brasil — Remoto",
        period: "2020 – 2021",
        bullets: [
          "Engenheiro fundador de uma startup de fintech de mobilidade: gerenciei o time de desenvolvimento, prospectei e contratei talentos e criei os processos de entrevista e onboarding (novos devs subiam código em produção em duas semanas).",
          "Atuei como Scrum Master e engenheiro sênior, mentorando e treinando desenvolvedores juniores e estagiários.",
          "Entreguei duas plataformas: Evompass — carteira digital white-label — e Mobipix — app para gerenciar transações de várias origens, incluindo transações de catracas de ônibus do transporte público.",
          "Construídas com backends em JHipster, frontends em React e apps em Flutter; o Mobipix incluía um SDK para dispositivos Android.",
        ],
        tech: "Java, Flutter, React, Spring Boot, AWS, JHipster, Liquibase, GitHub Actions (CI/CD)",
      },
      {
        company: "Avenue Code",
        title: "Engenheiro de Software Sênior · Tech Lead",
        place: "São Paulo, Brasil → EUA",
        period: "2015 – 2020",
        bullets: [
          "SquareTrade: um dos três primeiros engenheiros a iniciar a conta no Brasil — o trabalho fez o time crescer para mais de 30 pessoas. Atuei em Merchant Integrations (Apache Camel, Apache Zookeeper) como Tech Lead, Scrum Master e 'Buddy' (papel gerencial de mentoria).",
          "Merchant e-Solutions: viajei para Redwood City, CA para ajudar a empresa a obter a certificação AMEX, trabalhando on-site.",
          "Williams Sonoma: construí microsserviços sobre uma camada de aplicação Sterling; ajudei o time a montar dashboards em JS/HTML puro e scripts em Bash.",
          "GAP · PIM / Data Governance: liderei e mentorei o time em testes unitários e de integração para Kafka, substituindo o catálogo de produtos (Pacman) pelo Stibo e publicando dados padronizados em um cluster Kafka; também atuei como Management Mentor.",
        ],
        tech: "Java, Spring Boot, Kafka, JMS, SOAP, Apache Camel, EJB, JUnit, Mockito, Gradle, Swagger, Bash, Jenkins, Oracle, SQL Server, PostgreSQL",
      },
      {
        company: "MAPS Soluções e Serviços",
        title: "Estagiário → Engenheiro Sênior · Tech Lead · Scrum Master · Product Owner",
        place: "São Paulo, Brasil",
        period: "2005 – 2015",
        bullets: [
          "Dez anos em sistemas financeiros, atuando conforme a necessidade do time: Engenheiro Sênior, Tech Lead, Gerente Técnico, Scrum Master ou Product Owner.",
          "Plataformas de fundos de investimento — Centaurus (controle e escrituração), NAVE (gestão de ativos) e funcionalidades regulatórias de gestão de fundos: projetei e desenvolvi o componente de impostos (núcleo do sistema), análise de negócio e cenários de teste.",
          "Sistemas bancários/pagamentos anteriores — Pegasus (custódia e controladoria), BWPAG (controle de pagamentos brasileiro) e TCL (controle de clientes para um grande banco global).",
          "Como Gerente Técnico cuidei de planejamento, cronograma, contratações e feedbacks; como Product Owner levantei e priorizei requisitos diretamente com os clientes.",
        ],
        tech: "Java, Spring, Hibernate, Jetty, Wicket, Velocity, JSF, AWS, Oracle, PostgreSQL, Maven, Ant, Jenkins, SVN, Mercurial",
      },
      {
        company: "Faculdade Cásper Líbero",
        title: "Estagiário de TI",
        place: "São Paulo, Brasil",
        period: "2002 – 2005",
        bullets: [
          "Mantinha os laboratórios de informática da faculdade, dava suporte técnico aos alunos e automatizava rotinas administrativas.",
        ],
        tech: "Bash Scripting, JavaScript",
      },
    ],
    ventures: [
      {
        name: "AtipicALI",
        title: "Cofundador",
        period: "2025 – Atual",
        desc: "Projeto paralelo ativo, iniciado em 2025 em paralelo ao trabalho full-time, ainda em andamento.",
      },
      {
        name: "PayAqui",
        title: "Engenheiro Fundador · Mobile",
        period: "2018 – 2019",
        desc: "Engenheiro fundador de uma fintech de pagamentos tocada em paralelo. Projetei e construí os apps nativos Android e iOS de ponta a ponta — da arquitetura à publicação — participando também da descoberta de requisitos e UX, além de contribuir com o backend em Java.",
      },
      {
        name: "fleeber (hoje amy.network)",
        title: "Cofundador",
        period: "2013 – 2015",
        desc: "Cofundei uma rede social para músicos com três aplicações (app público, back-office e o ERP Studios). Responsável por todas as decisões técnicas e a maior parte do desenvolvimento, com abordagem BDD, motor de busca em Apache Lucene e infraestrutura na AWS. Continua hoje como amy.network.",
      },
    ],
    education: [
      { degree: "Bacharelado em Ciência da Computação", school: "Pontifícia Universidade Católica de São Paulo (PUC-SP)", period: "2002 – 2009" },
    ],
    languages: "Português (nativo/bilíngue) · Inglês (proficiência profissional plena)",
    certifications: [
      "PSM — Professional Scrum Master, Scrum.org (2017)",
      "MCD — Integration & API Associate, MuleSoft (2018)",
      "KMP I — Kanban Management Professional, Kanban University (2015)",
      "Building High-Performing Teams, Stanford University (2020)",
      "An Introduction to Agile Project Management, Stanford University (2020)",
      "Swift & TDD/testes unitários, Gestão de projetos com Scrum (Alura, 2015) · UX & Usabilidade (Adaptworks, 2014)",
    ],
  },
};
