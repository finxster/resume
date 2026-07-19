import type { L } from "@/lib/i18n";

// LinkedIn recommendations, transcribed verbatim from the "Received" tab.
// `quote` is the original text in `lang`; `quoteTranslated` is a faithful
// translation into the *other* language, shown (clearly marked) when the
// visitor's site language differs from the original. A translation is the
// site's rendering, not the person's words — the UI always labels it as such
// and offers "see original".
//
// `featured` ones surface on the homepage (compact, clamped); the full set
// lives on /recommendations.
//
// `profileUrl` and `photo` are intentionally empty: they're third-party
// personal data. Fill them only once each person has given permission —
// `photo` as a local path under /public (LinkedIn media URLs can't be
// hotlinked), `profileUrl` as their public profile. The card renders an
// initials monogram and a non-linked name until then.

export const LINKEDIN_SOURCE_URL =
  "https://www.linkedin.com/in/luisfvalves/details/recommendations/";

export interface Recommendation {
  name: string;
  // Role/relationship as of the recommendation, e.g. "Teammate · MAPS".
  context: L;
  lang: "en" | "pt";
  quote: string;
  quoteTranslated: string;
  featured: boolean;
  profileUrl?: string;
  photo?: string; // e.g. "/recommendations/carol.jpg"
}

// URL-safe id from a name, for per-card anchors (deep links from the homepage).
export function recSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const recommendations: Recommendation[] = [
  {
    name: "Carol Stenger",
    context: { en: "Teammate · Williams-Sonoma", pt: "Colega de time · Williams-Sonoma" },
    lang: "en",
    quote:
      "Luis and I worked together on a software development team at Williams-Sonoma. Luis programmed a microservice to massage the data from an upstream customer system to a handful of downstream systems that needed different data sets (of course, in different formats, and often with data added or calculated). From the beginning of working with Luis, I appreciated his warm, friendly demeanor. He was inquisitive and learned the new systems quickly, and he really understood how the end user would use the software he was developing. He delivered quality code that worked — and if it didn't work the first time, he was humble and willing to admit fault, and then hardworking and determined to fix the problem quickly and with improvements and error handling steps to catch future issues. I especially appreciate how Agile-minded Luis was; he broke down requirements from broad waterfall-based ideas into smaller agile chunks for faster delivery. If upper management wanted a solution he didn't think was best, he would respectfully and calmly present the pros and cons, and ultimately he would graciously deliver whatever they decided without complaining. Luis is a team player who does quality work, with a fantastic attitude. I hope to work with him again some day!",
    quoteTranslated:
      "Luis e eu trabalhamos juntos em um time de desenvolvimento de software na Williams-Sonoma. O Luis programou um microsserviço para tratar os dados de um sistema de origem do cliente para vários sistemas downstream que precisavam de conjuntos de dados diferentes (claro, em formatos diferentes e muitas vezes com dados adicionados ou calculados). Desde o começo do trabalho com o Luis, apreciei seu jeito caloroso e amigável. Ele era curioso e aprendeu os novos sistemas rapidamente, e entendia de verdade como o usuário final usaria o software que estava desenvolvendo. Ele entregava código de qualidade que funcionava — e quando não funcionava de primeira, era humilde e admitia o erro, e então trabalhava com afinco e determinação para resolver o problema rapidamente, com melhorias e tratamento de erros para evitar problemas futuros. Aprecio especialmente o quanto o Luis era orientado a Agile; ele quebrava requisitos de ideias amplas em cascata em partes ágeis menores para entrega mais rápida. Se a gestão queria uma solução que ele não achava a melhor, ele apresentava os prós e contras de forma respeitosa e calma, e no fim entregava com boa vontade o que decidissem, sem reclamar. O Luis é um cara de time que faz um trabalho de qualidade, com uma atitude fantástica. Espero trabalhar com ele de novo algum dia!",
    featured: true,
  },
  {
    name: "Manisha Verma",
    context: { en: "Product Owner · SquareTrade", pt: "Product Owner · SquareTrade" },
    lang: "en",
    quote:
      "Luis was an engineer in my team at SquareTrade and I worked closely with him to deliver numerous partner integrations and product launches. Besides being a very thorough and efficient engineer he has a strong sense of ownership and commitment to the success of the team and projects. He always went above and beyond what was expected and worked the extra mile to ensure things were delivered in time. It has been a pleasure working with him.",
    quoteTranslated:
      "O Luis foi engenheiro no meu time na SquareTrade e trabalhei de perto com ele para entregar diversas integrações de parceiros e lançamentos de produto. Além de ser um engenheiro muito minucioso e eficiente, ele tem um forte senso de dono e comprometimento com o sucesso do time e dos projetos. Ele sempre ia além do esperado e fazia o esforço extra para garantir que as coisas fossem entregues no prazo. Foi um prazer trabalhar com ele.",
    featured: true,
  },
  {
    name: "Susmitha Sethu",
    context: { en: "QA Engineer · SquareTrade", pt: "Engenheira de QA · SquareTrade" },
    lang: "en",
    quote:
      "Luis works flawlessly under pressure and even in the toughest times. He writes code with highest quality and makes it really hard for testers to find a bug :) Luis has a vast knowledge of both backend and frontend technologies and always sets the bar high for other developers. He is by all means one of the best Backend Java developers I have had a chance to work with during my career.",
    quoteTranslated:
      "O Luis trabalha impecavelmente sob pressão, mesmo nos momentos mais difíceis. Ele escreve código com a mais alta qualidade e torna muito difícil para os testers encontrarem um bug :) O Luis tem um vasto conhecimento de tecnologias de backend e frontend e sempre eleva o nível para os outros desenvolvedores. Ele é, sem dúvida, um dos melhores desenvolvedores Java de backend com quem tive a chance de trabalhar na minha carreira.",
    featured: true,
  },
  {
    name: "Leandro Lyra",
    context: {
      en: "Client · Caixa Econômica Federal",
      pt: "Cliente · Caixa Econômica Federal",
    },
    lang: "pt",
    quote:
      "Trabalhei com o Luis no projeto de implantação do sistema de custódia qualificada da CAIXA e posso dizer que grande parte do sucesso foi devido ao esforço e conhecimento dele, alinhando capacidade técnica e conhecimento de conceitos negociais inerentes ao produto.",
    quoteTranslated:
      "I worked with Luis on the project to roll out CAIXA's qualified custody system, and I can say that much of its success was due to his effort and knowledge, combining technical skill with an understanding of the business concepts inherent to the product.",
    featured: false,
  },
  {
    name: "José Roberto Araujo Filho",
    context: { en: "Teammate · Fleeber", pt: "Colega de time · Fleeber" },
    lang: "pt",
    quote:
      "Tive a oportunidade de trabalhar com o Luis Felipe no Fleeber e sempre fui surpreendido positivamente com sua capacidade de inovação. Luis Felipe sempre se mostrou aberto a novas ideias e métodos e, com isso, trouxe grande valor à organização. Ao mesmo tempo, quando esteve à frente de grandes desafios, posicionou-se de forma embasada, assertiva, pró-ativa e eficiente. Um grande profissional que recomendo à qualquer empresa.",
    quoteTranslated:
      "I had the opportunity to work with Luis Felipe at Fleeber and was always positively surprised by his capacity for innovation. Luis Felipe was always open to new ideas and methods and, with that, brought great value to the organization. At the same time, when facing big challenges, he positioned himself in a well-grounded, assertive, proactive, and efficient way. A great professional whom I recommend to any company.",
    featured: false,
  },
  {
    name: "Diego Rafael Alves Ferreira",
    context: { en: "Teammate · MAPS", pt: "Colega de time · MAPS" },
    lang: "pt",
    quote:
      "Luis Felipe é um excelente desenvolvedor, possui um vasto conhecimento técnico e uma motivação ímpar quando se trata de ajudar e treinar pessoas. Nós trabalhamos juntos durante quatro anos, sua facilidade em ensinar desde assuntos técnicos até regras de business é realmente surpreendente, esta experiência foi muito importante para a minha carreira profissional.",
    quoteTranslated:
      "Luis Felipe is an excellent developer, with vast technical knowledge and a unique motivation when it comes to helping and training people. We worked together for four years, and his ease in teaching — from technical subjects to business rules — is truly surprising; this experience was very important for my professional career.",
    featured: false,
  },
  {
    name: "Fabio Sakiyama",
    context: { en: "Mentored by Luis", pt: "Mentorado pelo Luis" },
    lang: "en",
    quote:
      "I worked with Luis for about 3 years. I was an intern at that time and he taught me a lot about Java in general. I consider him a great person to work with since he is very helpful, proactive and has leadership skills.",
    quoteTranslated:
      "Trabalhei com o Luis por cerca de 3 anos. Eu era estagiário na época e ele me ensinou muito sobre Java em geral. Considero-o uma ótima pessoa para trabalhar, já que é muito prestativo, proativo e tem habilidades de liderança.",
    featured: false,
  },
];
