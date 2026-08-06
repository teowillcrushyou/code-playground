import sandboxGames from "../../games/sandbox.json";
import Link from "next/link";
import styles from "./Sandbox.module.css";
import SuggestionBox from "./SuggestionBox";

export const metadata = {
  title: "The Sandbox | Teo Is The Winner",
  description: "Play Teo's in-progress games and suggest what should be built next.",
};

export default function SandboxPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.back} href="/">← MAIN GAME MENU</Link>
        <p>TEO&apos;S BUILD ROOM</p>
        <h1>THE SANDBOX</h1>
        <span>
          Play every game still being built. Each game has one current build,
          and things may change, break, or get much better overnight.
        </span>
      </header>

      <section className={styles.gameSection} aria-labelledby="in-progress-title">
        <div className={styles.sectionHeading}>
          <div>
            <p>PLAYABLE NOW</p>
            <h2 id="in-progress-title">GAMES IN PROGRESS</h2>
          </div>
          <span>{sandboxGames.length} CURRENT BUILDS</span>
        </div>

        <div className={styles.list}>
          {sandboxGames.map((game, index) => (
            <article className={styles.project} key={game.slug}>
              <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>
              <div className={styles.copy}>
                <div className={styles.titleRow}>
                  <h3>{game.title}</h3>
                  <strong className={styles.test}>{game.status}</strong>
                </div>
                <p>{game.description}</p>
                <div className={styles.buildRow}>
                  <b>CURRENT BUILD {game.build}</b>
                  <code>/sandbox/games/{game.slug}/</code>
                </div>
              </div>
              <a
                className={styles.open}
                href={`/sandbox/games/${game.slug}/`}
                aria-label={`Play ${game.title} current build ${game.build}`}
              >
                PLAY <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <SuggestionBox />

      <footer className={styles.footer}>
        <p><strong>Sandbox rule:</strong> try things, report weirdness, and have fun.</p>
        <Link href="/">BACK TO OFFICIAL GAMES</Link>
      </footer>

      <div className={styles.unicornFooter} aria-label="A cheerful test unicorn at the bottom of the sandbox">
        <span aria-hidden="true">{"\u2728"}</span>
        <Link href="/sandbox/games/unicorn-star-trail/" aria-label="Play Unicorn Star Trail current build 0.01">
          <b aria-hidden="true">{"\u{1F984}"}</b>
          <strong>TEST UNICORN FOUND</strong>
          <small>PLAY BUILD 0.01 {"\u2192"}</small>
        </Link>
        <span aria-hidden="true">{"\u2728"}</span>
      </div>
    </main>
  );
}
