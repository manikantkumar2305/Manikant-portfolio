"use client";

import styles from "./Skills.module.css";
import { useLang } from "@/lib/i18n";

const skillGroups = [
  { key: "skills.cloud", items: ["AWS"] },
  { key: "skills.cicd", items: ["GitHub Actions", "Jenkins"] },
  { key: "skills.iac", items: ["Terraform", "Ansible"] },
  { key: "skills.containers", items: ["Docker", "Kubernetes", "Helm"] },
  { key: "skills.monitoring", items: ["Prometheus", "Grafana", "AWS CloudWatch"] },
  { key: "skills.programming", items: ["Python", "Bash"] },
  { key: "skills.versionControl", items: ["Git", "GitHub"] },
];

export default function Skills() {
  const { t } = useLang();

  return (
    <section className={styles.section} id="skills">
      <div className={styles.wrap}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span>02</span> {t("skills.eyebrow")}
          </p>
          <h2 className={styles.h2}>
            {t("skills.h2")} <em className={styles.serif}>{t("skills.h2Em")}</em>
          </h2>
          <p className={styles.lede}>{t("skills.lede")}</p>
        </div>

        <div className={styles.rows}>
          {skillGroups.map((group) => (
            <article className={styles.row} key={group.key}>
              <h3 className={styles.title}>{t(group.key)}</h3>
              <div className={styles.list}>
                {group.items.map((item) => (
                  <span className={styles.pill} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
