import styles from "./Sandbox.module.css";

const projects = [
  {
    name: "Eggstorm Arena",
    url: "https://egg.teoisthewinner.com/",
    status: "LIVE GAME",
    tone: "live",
    description: "A fast 3D egg-tossing arena with mobile and desktop controls.",
  },
  {
    name: "Alcan Crowd Clash",
    url: "https://sandbox.teoisthewinner.com/",
    status: "PLAYABLE TEST",
    tone: "test",
    description: "The first crowd-logic build: choose gates, grow the group, and meet the red crowd.",
  },
  {
    name: "Alcan Crowd Clash: Home Wall",
    url: "https://sandbox2.teoisthewinner.com/",
    status: "PLAYABLE TEST",
    tone: "test",
    description: "A newer crowd build with wall damage, repair crates, and a longer survival loop.",
  },
  {
    name: "Sandshift",
    url: "https://sandshift.teoisthewinner.com/",
    status: "IN PRODUCTION",
    tone: "building",
    description: "A digging puzzle beneath Bellingham Bay with falling stone, creatures, and tideglass.",
  },
];

export const metadata = {
  title: "The Sandbox | Teo Is The Winner",
  description: "Playable experiments and in-production games from Teo Is The Winner.",
};

export default function SandboxPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.back} href="/">← MAIN GAME MENU</a>
        <p>TEO&apos;S BUILD ROOM</p>
        <h1>THE SANDBOX</h1>
        <span>
          These games are real and playable, but some are still being tested.
          Things may change, break, or get much better overnight.
        </span>
      </header>

      <section className={styles.list} aria-label="Verified games and production builds">
        {projects.map((project, index) => (
          <article className={styles.project} key={project.url}>
            <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>
            <div className={styles.copy}>
              <div className={styles.titleRow}>
                <h2>{project.name}</h2>
                <strong className={styles[project.tone]}>{project.status}</strong>
              </div>
              <p>{project.description}</p>
              <code>{project.url.replace("https://", "")}</code>
            </div>
            <a
              className={styles.open}
              href={project.url}
              aria-label={`Open ${project.name}`}
            >
              OPEN <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </section>

      <footer className={styles.footer}>
        <p><strong>Sandbox rule:</strong> try things, report weirdness, and have fun.</p>
        <a href="/">BACK TO PRIME-TIME GAMES</a>
      </footer>
    </main>
  );
}
