/* Professional experience — from Gireesh's CV, positioned design-first per
   03_CONTENT_STRATEGY.md. Reverse chronological: newest first. */

export type Role = {
  company: string;
  role: string;
  type: "Internship" | "Full-time" | "Hackathon" | "Freelance";
  location: string;
  period: string;
  summary: string;
  achievements: string[];
  outcome: string;
  skills: string[];
  /* panel color — intentional, one vibrant per role (Experience deck) */
  color: string;
  fg: "light" | "dark";
  /* Company mark. `variant` follows what the supplied file actually IS:
     · "tile"  — the logo ships with its own background baked in (square
                 avatars), so it is shown as a rounded tile, uncropped
     · "plate" — transparent artwork that needs a light ground to read;
                 the plate's width follows the logo's true aspect ratio
     · absent  — no official file supplied yet → typographic fallback */
  logo?: {
    src: string;
    variant: "tile" | "plate";
    aspect: number;
    /* Placement adapts to how dense the panel's copy is — a logo is not
       forced into the same slot for every company.
       "right" — sits beside the content (default, when there is room)
       "below" — closes the panel underneath the content (dense copy) */
    placement?: "right" | "below";
  };
  /* French copy for the translatable fields (see lib/i18n.tsx → L()) */
  fr?: { role?: string; summary?: string; outcome?: string; achievements?: string[] };
};

export const ROLES: Role[] = [
  {
    company: "Laventra Technologies LLP",
    role: "SRE / DevOps Intern",
    type: "Internship",
    location: "Hyderabad, India",
    period: "Oct 2026 – Present",
    summary:
      "Supporting deployment and reliability of RenderReply, an Instagram automation SaaS on AWS Elastic Beanstalk, with GitHub Actions CI/CD and CloudWatch monitoring.",
    achievements: [
      "Supported deployment and reliability of an AWS Elastic Beanstalk application for RenderReply",
      "Worked with GitHub Actions CI/CD to streamline release and environment automation",
      "Monitored application health and operational signals using Amazon CloudWatch",
    ],
    outcome: "Automated deployments across all environments through GitHub Actions CI/CD",
    skills: ["AWS Elastic Beanstalk", "GitHub Actions", "Amazon CloudWatch", "CI/CD", "Amazon Web Services (AWS)"],
    color: "#0072E3",
    fg: "light",
    logo: {
      src: "/images/companies/Laventra.png",
      variant: "plate",
      aspect: 1,
      placement: "right",
    },
    fr: {
      role: "Stagiaire SRE / DevOps",
      summary:
        "Support du déploiement et de la fiabilité de RenderReply, un SaaS d’automatisation Instagram sur AWS Elastic Beanstalk, avec CI/CD GitHub Actions et monitoring CloudWatch.",
      outcome: "Déploiements automatisés sur tous les environnements via GitHub Actions CI/CD",
      achievements: [
        "Support du déploiement et de la fiabilité d’une application AWS Elastic Beanstalk pour RenderReply",
        "Travail avec GitHub Actions CI/CD pour fluidifier les releases et l’automatisation des environnements",
        "Surveillance de la santé applicative et des signaux opérationnels avec Amazon CloudWatch",
      ],
    },
  },
  /*
  {
    company: "UNBIAS Innovation Hackathon",
    role: "Product & AI Innovation Lead",
    type: "Hackathon",
    location: "Sophia Antipolis, France",
    period: "Mar 2026",
    summary:
      "End-to-end product design of an AI venture in one sprint — value proposition, UX, monetisation logic and three live prototypes.",
    achievements: [
      "Designed the interaction model for an offline, privacy-first AI assistant",
      "Built three functional prototype websites demonstrating concept, AI workflow and commercial framework",
      "Delivered a live jury walkthrough of architecture, user flow and unit economics",
    ],
    outcome: "🏆 1st place — LockAI, offline secure on-device AI",
    skills: ["Product Strategy", "Prototyping", "UX/UI", "AI", "HTML/CSS"],
    color: "#6D3BF5",
    fg: "light",
    logo: {
      src: "/images/companies/unbias.png",
      variant: "plate",
      aspect: 685 / 226,
      placement: "below",
    },
    fr: {
      role: "Responsable produit & innovation IA",
      summary:
        "Conception produit de bout en bout d’une start-up IA en un sprint — proposition de valeur, UX, modèle de revenus et trois prototypes en ligne.",
      outcome: "🏆 1re place — LockAI, IA sécurisée hors-ligne",
      achievements: [
        "Conception du modèle d’interaction d’un assistant IA hors-ligne, axé sur la confidentialité",
        "Trois sites prototypes fonctionnels démontrant le concept, le workflow IA et le cadre commercial",
        "Présentation live au jury : architecture, parcours utilisateur et économie unitaire",
      ],
    },
  },
  {
    company: "V Raise",
    role: "Business & Process Analyst",
    type: "Internship",
    location: "Paris, France",
    period: "Apr – Oct 2025",
    summary:
      "Mapped and redesigned logistics workflows across operations, finance, IT and external 3PL partners.",
    achievements: [
      "Business-process mapping, gap analysis and root-cause analysis to surface inefficiencies",
      "Designed steering-committee dashboards that made operational health legible at a glance",
    ],
    outcome: "12% end-to-end logistics workflow efficiency gain",
    skills: ["Process Mapping", "Dashboard Design", "KPI Design", "Stakeholders"],
    color: "#FFFFFF",
    fg: "dark",
    logo: { src: "/images/companies/vraise.jpg", variant: "tile", aspect: 1 },
    fr: {
      role: "Analyste métier & processus",
      summary:
        "Cartographie et refonte des flux logistiques entre les opérations, la finance, l’IT et les partenaires 3PL externes.",
      outcome: "+12 % d’efficacité sur le flux logistique de bout en bout",
      achievements: [
        "Cartographie des processus, analyse des écarts et des causes racines pour révéler les inefficacités",
        "Conception des tableaux de bord du comité de pilotage, rendant la santé opérationnelle lisible d’un coup d’œil",
      ],
    },
  },
  {
    company: "Oigetit.ai",
    role: "Human-in-the-Loop AI Analyst",
    type: "Internship",
    location: "Los Gatos, USA · Remote",
    period: "Jan – May 2025",
    summary:
      "Improved an AI misinformation filter's accuracy and translated its verification engine into user-facing explanations — the UX of trust.",
    achievements: [
      "Pattern recognition, data validation and edge-case identification across the AI pipeline",
      "Contributed to Responsible AI initiatives; wrote simplified user-focused explanations",
    ],
    outcome: "Improved AI classification accuracy",
    skills: ["Responsible AI", "Data Validation", "UX Writing"],
    color: "#FF2E0F",
    fg: "light",
    logo: { src: "/images/companies/oigetit.jpg", variant: "tile", aspect: 1 },
    fr: {
      role: "Analyste IA « human-in-the-loop »",
      summary:
        "Amélioration de la précision d’un filtre anti-désinformation et traduction de son moteur de vérification en explications destinées aux utilisateurs — l’UX de la confiance.",
      outcome: "Précision de classification de l’IA améliorée",
      achievements: [
        "Reconnaissance de motifs, validation des données et identification des cas limites dans le pipeline IA",
        "Contribution aux initiatives d’IA responsable ; rédaction d’explications simplifiées",
      ],
    },
  },
  {
    company: "Site Web & Co",
    role: "SEO & Digital Marketing",
    type: "Internship",
    location: "Montpellier, France",
    period: "Jan – Apr 2025",
    summary:
      "Audited and optimised web experiences across a B2B/B2C client portfolio — design decisions driven by measurement.",
    achievements: [
      "On-page & technical SEO fixes; rewrote meta architecture and internal-linking logic for the highest-traffic templates",
      "Produced performance dashboards and growth insights for client stakeholders",
    ],
    outcome: "35% organic traffic growth across the portfolio",
    skills: ["Analytics", "CRO", "Web Performance", "SEO"],
    color: "#FF6A00",
    fg: "light",
    fr: {
      role: "SEO & marketing digital",
      summary:
        "Audit et optimisation d’expériences web sur un portefeuille de clients B2B/B2C — des décisions de design guidées par la mesure.",
      outcome: "+35 % de trafic organique sur le portefeuille",
      achievements: [
        "SEO technique et on-page ; refonte de l’architecture des métadonnées et du maillage interne des gabarits les plus consultés",
        "Tableaux de bord de performance et recommandations de croissance pour les clients",
      ],
    },
  },
  {
    company: "Sage Finance",
    role: "Operations & Business Development Lead",
    type: "Full-time",
    location: "Telangana, India",
    period: "Sep 2022 – Aug 2024",
    summary:
      "Owned sales strategy and client acquisition for a financial-consulting practice — where my instincts about customers were forged.",
    achievements: [
      "Built the inbound-to-close playbook adopted by the broader sales team",
      "Market analysis, customer segmentation and pipeline management against tracked KPIs",
    ],
    outcome: "$20K+ sales in one week → promoted to Marketing Team Lead",
    skills: ["Strategy", "Segmentation", "Pipeline", "Leadership"],
    color: "#FFB200",
    fg: "dark",
    logo: { src: "/images/companies/sage.jpg", variant: "tile", aspect: 1 },
    fr: {
      role: "Responsable opérations & développement commercial",
      summary:
        "Pilotage de la stratégie commerciale et de l’acquisition client d’un cabinet de conseil financier — là où s’est forgé mon instinct client.",
      outcome: "20 000 $+ de ventes en une semaine → promu responsable marketing",
      achievements: [
        "Création du playbook inbound-to-close adopté par toute l’équipe commerciale",
        "Analyse de marché, segmentation client et gestion du pipeline face aux KPI suivis",
      ],
    },
  },
  {
    company: "Tutorac",
    role: "Business Development Executive",
    type: "Full-time",
    location: "Telangana, India",
    period: "Nov 2021 – Aug 2022",
    summary:
      "Go-to-market and retention analysis for a subscription e-learning platform across the South-Indian market.",
    achievements: [
      "Analysed subscription trends and customer feedback to support retention",
      "Expanded the client portfolio through outbound and partnership channels",
    ],
    outcome: "$50K+ subscription sales in one month",
    skills: ["Go-to-Market", "Growth", "Retention"],
    color: "#171429",
    fg: "light",
    logo: { src: "/images/companies/tutorac.jpg", variant: "tile", aspect: 1 },
    fr: {
      role: "Chargé de développement commercial",
      summary:
        "Go-to-market et analyse de rétention pour une plateforme d’e-learning par abonnement sur le marché sud-indien.",
      outcome: "50 000 $+ de ventes d’abonnements en un mois",
      achievements: [
        "Analyse des tendances d’abonnement et des retours clients pour soutenir la rétention",
        "Élargissement du portefeuille clients via des canaux outbound et partenariats",
      ],
    },
  },
  */
];
