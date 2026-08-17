"use client";

/* Client half of the case study. The route stays a server component so
   generateStaticParams / generateMetadata keep working; everything the
   reader sees lives here, where the language context is available.

   The English study is the base record and the French one is layered over
   it, so a partially translated study still renders — untranslated fields
   fall through to English instead of disappearing. */

import Link from "next/link";
import { useState } from "react";
import { PROJECTS } from "@/content/projects";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { useLang, L } from "@/lib/i18n";
import styles from "./case.module.css";

export default function CaseView({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const [viewerOpen, setViewerOpen] = useState(false);

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return null; /* the server component already called notFound() */

  const fr = lang === "fr" ? project.fr : undefined;
  const study = { ...project.study, ...(fr?.study ?? {}) };
  const tags = fr?.tags ?? project.tags;

  const hero = project.hero ?? project.cover;
  const viewerSrc = hero?.src ?? project.cover?.src;

  const idx = PROJECTS.indexOf(project);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <main className={styles.page}>
      <div className={styles.bar}>
        <Link href="/#work" className={styles.back}>
          {t("case.back")}
        </Link>
        {/* the toggle is repeated here because Nav only exists on the home
            page — a shared case-study link is often a visitor's first screen */}
        <div className={styles.barRight}>
          <Link href="/" className={styles.logo}>
            GIREESH<i>.</i>
          </Link>
          <LanguageToggle />
        </div>
      </div>

      <div className={styles.wrap}>
        {/* ---- hero ---- */}
        <header className={styles.hero}>
          <p className={styles.kicker}>
            {t("case.kicker")} · {project.year}
            {project.award ? ` · ${project.award}` : ""}
          </p>
          <h1 className={styles.title}>{L(lang, project, "title")}</h1>
          <p className={styles.oneLiner}>{L(lang, project, "oneLiner")}</p>
          <div className={styles.meta}>
            <div>
              <b>{t("case.role")}</b>
              <span>{study.role}</span>
            </div>
            <div>
              <b>{t("case.timeline")}</b>
              <span>{study.timeline}</span>
            </div>
            <div>
              <b>{t("case.focus")}</b>
              <span>{tags.join(" · ")}</span>
            </div>
            {/* verified official destinations only — never a guessed URL */}
            {project.site && (
              <div>
                <b>{t("case.site")}</b>
                <span>
                  <a
                    className={styles.siteLink}
                    href={project.site.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.site.label} ↗
                  </a>
                </span>
              </div>
            )}
            {project.repo && (
              <div>
                <b>{t("case.repo")}</b>
                <span>
                  <a
                    className={styles.siteLink}
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub ↗
                  </a>
                </span>
              </div>
            )}
          </div>
          {hero ? (
            <div
              className={styles.cover}
              style={{
                background: hero.bg,
                color: hero.ink === "light" ? "#fff" : "var(--ink)",
              }}
            >
              {hero.src && hero.variant === "photo" ? (
                <img
                  className={styles.coverPhoto}
                  src={hero.src}
                  alt={project.coverLabel}
                  style={hero.focus ? { objectPosition: hero.focus, cursor: "zoom-in" } : { cursor: "zoom-in" }}
                  onClick={() => setViewerOpen(true)}
                  role="button"
                  aria-label={`View full image for ${project.coverLabel}`}
                />
              ) : hero.src ? (
                <img
                  className={styles.coverBrand}
                  src={hero.src}
                  alt={project.coverLabel}
                  style={{ aspectRatio: hero.aspect ?? 1 }}
                />
              ) : (
                <span className={styles.coverMark}>{hero.mark}</span>
              )}
            </div>
          ) : (
            <div className={styles.cover}>
              ▢&nbsp;&nbsp;{project.coverLabel} — {t("case.cover")}
            </div>
          )}
        </header>

        {viewerOpen && viewerSrc ? (
          <div className={styles.viewerOverlay} onClick={() => setViewerOpen(false)}>
            <div className={styles.viewerCard} onClick={(event) => event.stopPropagation()}>
              <button
                className={styles.viewerClose}
                type="button"
                onClick={() => setViewerOpen(false)}
                aria-label="Close image viewer"
              >
                ×
              </button>
              <img className={styles.viewerImage} src={viewerSrc} alt={project.coverLabel} />
            </div>
          </div>
        ) : null}

        {/* ---- context ---- */}
        <section className={styles.section}>
          <p className={styles.secLabel}>{t("case.context")}</p>
          <p className={styles.body}>{study.context}</p>
        </section>

        {/* ---- problem ---- */}
        <section className={styles.section}>
          <p className={styles.secLabel}>{t("case.problem")}</p>
          <p className={styles.problem}>{study.problem}</p>
        </section>

        {/* ---- process ---- */}
        <section className={styles.section}>
          <p className={styles.secLabel}>{t("case.process")}</p>
          <div className={styles.steps}>
            {/* index keys on purpose: these lists are static and never
                reorder, so switching language re-labels rows in place
                instead of remounting them */}
            {study.process.map((s, i) => (
              <div className={styles.step} key={i}>
                <span className={styles.stepN}>0{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- decisions ---- */}
        <section className={styles.section}>
          <p className={styles.secLabel}>{t("case.decisions")}</p>
          <div className={styles.decisions}>
            {study.decisions.map((d, i) => (
              <div className={styles.decision} key={i}>
                <h3>{d.title}</h3>
                <p>{d.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- outcome ---- */}
        <section className={styles.section}>
          <p className={styles.secLabel}>{t("case.outcome")}</p>
          <div className={styles.outcomes}>
            {study.outcomes.map((o, i) => (
              <p className={styles.outcome} key={i}>
                <span>✦</span> {o}
              </p>
            ))}
          </div>
          {study.note && <p className={styles.note}>{study.note}</p>}
        </section>

        {/* ---- reflection ---- */}
        <section className={styles.section}>
          <p className={styles.secLabel}>{t("case.reflection")}</p>
          <p className={styles.reflection}>&ldquo;{study.reflection}&rdquo;</p>
        </section>

        {/* ---- next ---- */}
        <nav className={styles.footNav}>
          <Link href="/#work" className={styles.back}>
            {t("case.all")}
          </Link>
          <Link href={`/work/${next.slug}`} className={styles.nextLink}>
            <small>{t("case.next")}</small>
            <span>
              {L(lang, next, "title")} <i>→</i>
            </span>
          </Link>
        </nav>
      </div>
    </main>
  );
}
