import Image from "next/image";
import { PauseMenu } from "@/components/menu/PauseMenu";
import { GithubIcon, ICON_MAP, LinkIcon, StarIcon } from "@/components/icons";
import { CONTACT, EXPERIENCES, PROFILE, PROJECTS, SKILLS } from "@/lib/data";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <PauseMenu />

      {/* --- HERO --- */}
      <section id="home" className={styles.wrapper}>
        <div className={styles.hero}>
          <div className={styles.avatarFrame}>
            <Image
              src={PROFILE.avatar}
              alt={`Portrait of ${PROFILE.name}`}
              width={132}
              height={132}
              loading="eager"
              fetchPriority="high"
              sizes="132px"
            />
          </div>

          <p className={styles.eyebrow}>{PROFILE.role}</p>
          <h1 className={styles.heading}>
            Hi, I&apos;m {PROFILE.shortName}
            <span className={styles.headingAccent}>{PROFILE.role}</span>
          </h1>
          <p className={styles.description}>{PROFILE.tagline}</p>
        </div>
      </section>

      {/* --- PROJECTS --- */}
      <section id="projects" className={styles.wrapper}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>01</span>
          <h2 className={styles.sectionTitle}>Projects</h2>
        </div>

        <div className={styles.projectsGrid}>
          {PROJECTS.map((project) => (
            <article key={project.id} className={styles.projectCard}>
              <div className={styles.cardImage}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  loading={project.image === "/Portfolio.png" ? "eager" : "lazy"}
                  className={`object-cover ${project.imagePosition}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>

                <ul className={styles.stackList}>
                  {project.stack.map((tech) => (
                    <li key={tech} className={styles.stackTag}>
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className={styles.cardActions}>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnPrimary}
                    >
                      <LinkIcon size={14} /> Live
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnSecondary}
                    >
                      <GithubIcon size={14} /> Repo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- SKILL --- */}
      <section id="skill" className={styles.wrapper}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>02</span>
          <h2 className={styles.sectionTitle}>Skill</h2>
        </div>

        <div className={styles.statusGrid}>
          <p className={styles.bio}>{PROFILE.bio}</p>

          <div className={styles.statList}>
            {SKILLS.map((skill) => (
              <div key={skill.label} className={styles.statRow}>
                <div className={styles.statHead}>
                  <span className={styles.statLabel}>{skill.label}</span>
                  <span className={styles.statRank}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} size={11} filled={i < skill.rank} />
                    ))}
                  </span>
                </div>
                <div className={styles.statTrack}>
                  <div
                    className={styles.statFill}
                    style={{ width: `${(skill.rank / 5) * 100}%` }}
                  />
                </div>
                <p className={styles.statNote}>{skill.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HISTORY PROJECT --- */}
      <section id="history-project" className={styles.wrapper}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>03</span>
          <h2 className={styles.sectionTitle}>History Project</h2>
        </div>

        <div className={styles.linkGrid}>
          {EXPERIENCES.map((item) => (
            <article key={item.id} className={styles.linkCard}>
              <div className={styles.linkHead}>
                <h3 className={styles.linkTitle}>{item.title}</h3>
                <span className={styles.linkRank}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} size={12} filled={i < item.rank} />
                  ))}
                </span>
              </div>

              <p className={styles.linkDesc}>{item.description}</p>
              <p className={styles.linkRole}>{item.role}</p>

              <ul className={styles.stackList}>
                {item.stack.map((tech) => (
                  <li key={tech} className={styles.stackTag}>
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* --- CONTACT --- */}
      <footer id="contact" className={styles.footer}>
        <div className={styles.contactPanel}>
          <p className={styles.footerLead}>Contact</p>
          <p className={styles.footerIntro}>
            Let&apos;s build something great together. Reach out for projects,
            collaborations, or just a quick hello.
          </p>

          <ul className={styles.contactList}>
            {CONTACT.map((item) => {
              const Icon = ICON_MAP[item.icon];
              const isExternal = item.href.startsWith("http");
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={styles.contactLink}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <Icon size={18} />
                    <span className={styles.contactLabel}>{item.label}</span>
                    <span className={styles.contactValue}>{item.value}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <p className={styles.footerMeta}>
            {PROFILE.program} · {PROFILE.school}
          </p>
        </div>
      </footer>
    </div>
  );
}