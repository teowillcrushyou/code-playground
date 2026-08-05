import styles from "./SandboxGameFrame.module.css";

type SandboxGameFrameProps = {
  title: string;
  build: string;
  sourceUrl: string;
};

export default function SandboxGameFrame({ title, build, sourceUrl }: SandboxGameFrameProps) {
  return (
    <main className={styles.page}>
      <header className={styles.bar}>
        <a className={styles.back} href="/sandbox/">← ALL SANDBOX GAMES</a>
        <div className={styles.identity}>
          <p>IN-PROGRESS GAME</p>
          <h1>{title}</h1>
          <strong>CURRENT BUILD {build}</strong>
        </div>
        <a className={styles.direct} href={sourceUrl}>OPEN DIRECTLY ↗</a>
      </header>
      <iframe
        className={styles.game}
        src={sourceUrl}
        title={`${title} current build ${build}`}
        allow="autoplay; fullscreen; gamepad"
        allowFullScreen
      />
    </main>
  );
}
