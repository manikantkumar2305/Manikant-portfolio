"use client";

/*
 * Centralised EN/FR store for every user-facing string on the site.
 *
 * Switching is pure React state: scroll position, the active section and all
 * pinned ScrollTriggers survive, with no reload. The choice persists in
 * localStorage and is mirrored onto <html lang> for assistive tech.
 *
 * Proper nouns (companies, products, tools, place names) are deliberately
 * NOT translated. French runs longer than English, so copy here is written
 * to fit the same layout rather than translated literally.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "fr";

type Entry = { en: string; fr: string };

export const DICT: Record<string, Entry> = {
  /* ---------------- nav ---------------- */
  "nav.home": { en: "Home", fr: "Accueil" },
  "nav.about": { en: "About", fr: "À propos" },
  "nav.work": { en: "Work", fr: "Projets" },
  "nav.resume": { en: "Resume", fr: "CV" },
  "nav.skills": { en: "Skills", fr: "Compétences" },
  "nav.contact": { en: "Contact", fr: "Contact" },
  "nav.menu": { en: "Open menu", fr: "Ouvrir le menu" },
  "nav.close": { en: "Close menu", fr: "Fermer le menu" },

  /* ---------------- intro ---------------- */
  "intro.scroll": { en: "Scroll to enter", fr: "Faites défiler pour entrer" },

  /* ---------------- hero ---------------- */
  "hero.kicker": {
    en: "CLOUD & DEVOPS ENGINEER",
    fr: "INGÉNIEUR CLOUD & DEVOPS",
  },
  "hero.h1a": { en: "Infrastructure that scales.", fr: "Une infrastructure qui scale." },
  "hero.h1aEm": { en: "", fr: "" },
  "hero.h1b": { en: "Deployments that", fr: "Des déploiements qui" },
  "hero.h1bEm": { en: "just work.", fr: "fonctionnent sans effort." },
  "hero.sub": {
    en: "I design and automate cloud infrastructure end to end — from first commit to production — with CI/CD pipelines, infrastructure as code, and monitoring that catches problems before your users do.",
    fr: "Je conçois et automatise l’infrastructure cloud de bout en bout — du premier commit à la production — avec des pipelines CI/CD, de l’infrastructure as code et une supervision qui détecte les problèmes avant vos utilisateurs.",
  },
  "hero.cta1": { en: "View My Work", fr: "Voir mes projets" },
  "hero.cta2": { en: "See How I Work", fr: "Ma façon de travailler" },
  "hero.scroll": { en: "Scroll to Explore", fr: "Faites défiler" },
  "stat.projects": { en: "Projects Completed", fr: "Projets réalisés" },
  "stat.years": { en: "Years of Experience", fr: "Ans d’expérience" },
  "stat.countries": { en: "Countries Worked With", fr: "Pays collaborés" },
  "stat.satisfaction": { en: "Client Satisfaction", fr: "Satisfaction client" },

  /* ---------------- about ---------------- */
  "about.eyebrow": { en: "About", fr: "À propos" },
  "about.h2a": { en: "Cloud is where I build.", fr: "Le cloud est là où je construis." },
  "about.h2b": { en: "Automation is how I", fr: "L’automatisation est ma façon de" },
  "about.h2Em": { en: "ship ", fr: "livrer " },
  "about.h2c": { en: "it.", fr: "le." },
  "about.m1": {
    en: "Cloud & DevOps Projects",
    fr: "Projets Cloud & DevOps",
  },
  "about.m2": {
    en: "Technical Lead — AWS Student Builders Group, Malla Reddy University",
    fr: "Technical Lead — AWS Student Builders Group, Malla Reddy University",
  },
  "about.m3": {
    en: "Community members",
    fr: "Étudiants encadrés",
  },
  "about.m4": {
    en: "Core Cloud & DevOps Technologies",
    fr: "Technologies Cloud & DevOps clés",
  },
  "about.edu": {
    en: "B.Tech Computer Science · Malla Reddy University · 2023–2027 · Cloud Engineering · DevOps · AWS",
    fr: "B.Tech Computer Science · Malla Reddy University · 2023–2027 · Cloud Engineering · DevOps · AWS",
  },
  "about.cta": { en: "Explore My Work", fr: "Découvrir mes projets" },

  /* ---------------- journey ----------------
     Chapter copy lives in content/journey.ts; only the chrome is here. */
  "journey.eyebrow": { en: "My Journey", fr: "Mon parcours" },
  "journey.enter": { en: "Scroll to travel", fr: "Faites défiler pour avancer" },
  "journey.chapter": { en: "Chapter", fr: "Chapitre" },
  "journey.lede": {
    en: "From Telangana to the Côte d’Azur — the chapters that turned a salesperson into a product designer.",
    fr: "Du Telangana à la Côte d’Azur — les chapitres qui ont transformé un commercial en product designer.",
  },

  /* ---------------- skills ---------------- */
  "skills.eyebrow": { en: "Skills", fr: "Compétences" },
  "skills.h2": { en: "Core capabilities", fr: "Compétences clés" },
  "skills.h2Em": { en: "I use every day.", fr: "que j’utilise chaque jour." },
  "skills.lede": {
    en: "A practical stack focused on cloud platforms, automation, observability, and reliable delivery.",
    fr: "Une stack pratique centrée sur les plateformes cloud, l’automatisation, l’observabilité et une livraison fiable.",
  },
  "skills.cloud": { en: "Cloud Platforms", fr: "Plateformes cloud" },
  "skills.cicd": { en: "CI/CD", fr: "CI/CD" },
  "skills.iac": { en: "Infrastructure as Code", fr: "Infrastructure as Code" },
  "skills.containers": { en: "Containers & Orchestration", fr: "Conteneurs & orchestration" },
  "skills.monitoring": { en: "Monitoring & Observability", fr: "Supervision & observabilité" },
  "skills.programming": { en: "Programming & Scripting", fr: "Programmation & scripts" },
  "skills.versionControl": { en: "Version Control", fr: "Gestion de versions" },

  /* ---------------- design stack ---------------- */
  "stack.eyebrow": { en: "Toolkit", fr: "Outils" },
  "stack.h2": { en: "My Tech", fr: "Ma boîte à" },
  "stack.h2Em": { en: "Stack.", fr: "outils." },
  "stack.lede": {
    en: "The tools I use to build, deploy, and run cloud infrastructure — reliably, end to end.",
    fr: "Les outils avec lesquels je recherche, conçois, prototype, collabore et livre — du premier croquis au code en production.",
  },
  "stack.count": { en: "tools", fr: "outils" },
  "stack.disciplines": { en: "disciplines", fr: "disciplines" },

  /* ---------------- work ---------------- */
  "work.eyebrow": { en: "Featured Work", fr: "Projets sélectionnés" },
  "work.h2a": { en: "Selected projects,", fr: "Des projets choisis," },
  "work.h2b": { en: "automated to", fr: "conçus pour être" },
  "work.h2Em": { en: "ship.", fr: "livrés." },
  "work.lede": {
    en: "Cloud infrastructure, automation, CI/CD and systems reliability — each project a different capability, all one practice.",
    fr: "UX produit, stratégie produit, design de données et de systèmes — chaque projet une compétence différente, une seule pratique.",
  },
  "work.open": { en: "Open case study", fr: "Voir l’étude de cas" },
  "work.hint": { en: "SCROLL TO BROWSE", fr: "FAITES DÉFILER" },

  /* ---------------- experience ---------------- */
  "exp.eyebrow": { en: "Experience", fr: "Expérience" },
  "exp.h2": { en: "Where I built my", fr: "Là où j’ai forgé mon" },
  "exp.h2Em": { en: "judgment.", fr: "jugement." },
  "exp.worked": { en: "What I worked on", fr: "Ce sur quoi j’ai travaillé" },
  "exp.impact": { en: "Impact", fr: "Impact" },
  "exp.tools": { en: "Tools & skills", fr: "Outils & compétences" },
  "exp.hint": { en: "SCROLL · CLICK TO JUMP", fr: "DÉFILER · CLIQUER POUR NAVIGUER" },
  "type.Internship": { en: "Internship", fr: "Stage" },
  "type.Full-time": { en: "Full-time", fr: "Temps plein" },
  "type.Hackathon": { en: "Hackathon", fr: "Hackathon" },
  "type.Freelance": { en: "Freelance", fr: "Freelance" },

  /* ---------------- credentials ---------------- */
  "cert.introLabel": { en: "Introduction", fr: "Introduction" },
  "cert.introTitle1": { en: "VERIFIED", fr: "TITRES" },
  "cert.introTitle2": { en: "CREDENTIALS", fr: "VÉRIFIÉS" },
  "cert.introBody": {
    en: "Continuous, applied learning across data, design, marketing and AI — the technical base underneath the product work.",
    fr: "Un apprentissage continu et appliqué en données, design, marketing et IA — la base technique du travail produit.",
  },
  "cert.introNote": {
    en: "Five programmes · Coursera, LinkedIn Learning and hands-on portfolio projects.",
    fr: "Cinq programmes · Coursera, LinkedIn Learning et projets concrets.",
  },
  "cert.eyebrow": { en: "Credentials", fr: "Titres & certifications" },
  "cert.h2": { en: "Credentials", fr: "Certifications" },
  "cert.lede": {
    en: "Professional certifications and credentials earned throughout my design and technology journey.",
    fr: "Les certifications et titres professionnels obtenus tout au long de mon parcours en design et en technologie.",
  },
  "cert.certified": { en: "Certified", fr: "Certifié" },
  "cert.brandRole": { en: "Product Designer", fr: "Product Designer" },
  "cert.issuerTBC": { en: "Issuer — to confirm", fr: "Organisme — à confirmer" },
  "cert.certification": { en: "Certification", fr: "Certification" },
  "cert.verified": { en: "✓ Verified", fr: "✓ Vérifié" },
  "cert.onRequest": { en: "Credential on request", fr: "Justificatif sur demande" },
  "cert.issuedBy": { en: "Issued by", fr: "Délivré par" },
  "cert.year": { en: "Year", fr: "Année" },
  "cert.id": { en: "Credential ID", fr: "N° de justificatif" },
  "cert.tbc": { en: "To confirm", fr: "À confirmer" },
  "cert.skills": { en: "Skills", fr: "Compétences" },
  "cert.verify": { en: "Verify credential ↗", fr: "Vérifier le justificatif ↗" },
  "cert.foot": { en: "Credentials", fr: "Titres" },

  /* ---------------- gallery — the people behind the work ---------------- */
  "gallery.eyebrow": { en: "The Archive", fr: "L’archive" },
  "gallery.h2a": { en: "The people behind", fr: "Celles et ceux derrière" },
  "gallery.h2Em": { en: "the work", fr: "le travail" },
  "gallery.lede": {
    en: "The people, moments and experiences that shaped the work behind the screen.",
    fr: "Les personnes, les moments et les expériences qui ont façonné le travail derrière l’écran.",
  },
  "gallery.alt": {
    en: "A moment with the people behind the work",
    fr: "Un moment avec celles et ceux derrière le travail",
  },
  "gallery.frames": { en: "Frames", fr: "Images" },
  "gallery.hint": { en: "Scroll to travel the archive", fr: "Faites défiler pour parcourir l’archive" },

  /* ---------------- connect ---------------- */
  "connect.eyebrow": { en: "Let’s Connect", fr: "Restons en contact" },
  "connect.h2a": { en: "Let's build what's", fr: "Créons ce qui" },
  "connect.h2Em": { en: "next.", fr: "vient." },
  "connect.lede": {
    en: "I'm open to cloud and DevOps roles, collaborations and good conversations — if you're scaling something that needs to run reliably, I'd like to hear about it.",
    fr: "Je suis ouvert aux postes en product design, aux collaborations et aux bonnes conversations — si vous construisez quelque chose que les gens devraient adorer, parlons-en.",
  },
  "connect.cta": { en: "Start a Conversation", fr: "Démarrer la conversation" },
  "connect.credit": { en: "Designed & Developed by", fr: "Conçu & développé par" },
  "connect.top": { en: "Back to top ↑", fr: "Haut de page ↑" },

  /* ---------------- case study (/work/[slug]) ---------------- */
  "case.back": { en: "← Back to work", fr: "← Retour aux projets" },
  "case.kicker": { en: "Case Study", fr: "Étude de cas" },
  "case.role": { en: "Role", fr: "Rôle" },
  "case.timeline": { en: "Timeline", fr: "Période" },
  "case.focus": { en: "Focus", fr: "Focus" },
  "case.site": { en: "Live product", fr: "Produit en ligne" },
  "case.repo": { en: "Source", fr: "Code source" },
  "case.cover": { en: "COVER", fr: "VISUEL" },
  "case.context": { en: "Context", fr: "Contexte" },
  "case.problem": { en: "The Problem", fr: "Le problème" },
  "case.process": { en: "Process", fr: "Démarche" },
  "case.decisions": { en: "Design Decisions", fr: "Décisions de design" },
  "case.outcome": { en: "Outcome", fr: "Résultats" },
  "case.reflection": { en: "Reflection", fr: "Ce que j’en retire" },
  "case.all": { en: "← All projects", fr: "← Tous les projets" },
  "case.next": { en: "Next project", fr: "Projet suivant" },

  /* ---------------- lab (/tunnel) ---------------- */
  "lab.back": { en: "← PORTFOLIO", fr: "← PORTFOLIO" },
  "lab.hint": {
    en: "LAB · TUNNEL TYPE — SCROLL TO TRAVEL · MOVE THE MOUSE",
    fr: "LAB · TUNNEL TYPE — FAITES DÉFILER POUR AVANCER · BOUGEZ LA SOURIS",
  },

  /* ---------------- 404 ---------------- */
  "nf.label": { en: "404 — NOT FOUND", fr: "404 — PAGE INTROUVABLE" },
  "nf.h1": { en: "This page went", fr: "Cette page a quitté" },
  "nf.h1Em": { en: "off the grid.", fr: "les radars." },
  "nf.cta": { en: "Back to the portfolio →", fr: "Retour au portfolio →" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (k) => DICT[k]?.en ?? k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "fr") {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("lang", l);
    } catch {
      /* private mode — the choice simply won't persist */
    }
    document.documentElement.lang = l;
  };

  const t = (k: string) => DICT[k]?.[lang] ?? DICT[k]?.en ?? k;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);

/** Pick a translated field off a content record: `L(lang, item, "summary")`
 *  returns `item.fr.summary` when available, else the English original. */
export function L<T extends { fr?: Record<string, unknown> }>(
  lang: Lang,
  item: T,
  field: keyof T & string
): string {
  if (lang === "fr" && item.fr && typeof item.fr[field] === "string") {
    return item.fr[field] as string;
  }
  return item[field] as unknown as string;
}
