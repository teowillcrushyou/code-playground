import Leaderboard from "./Leaderboard";

const upcomingGames = [
  {
    icon: "⛏",
    title: "Block Quest",
    type: "BUILD + EXPLORE",
    tone: "lime",
  },
  {
    icon: "🏄",
    title: "Rail Rush",
    type: "DODGE + DASH",
    tone: "blue",
  },
  {
    icon: "🏰",
    title: "Sand Kingdom",
    type: "DIG + DISCOVER",
    tone: "gold",
  },
];

export default function Home() {
  return (
    <main>
      <div className="sky-grid" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Teo Is The Winner home">
          <span className="brand-cube" aria-hidden="true">T</span>
          <span>
            <strong>TEO IS THE</strong>
            <b>WINNER!</b>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-active" href="#games">Games</a>
          <a href="#about">About</a>
        </nav>
        <div className="player-pill" aria-label="Player one">
          <span className="player-dot" />
          PLAYER 1
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>★</span> WELCOME TO TEO&apos;S WORLD</p>
          <h1>PLAY BIG.<br /><em>WIN BIGGER.</em></h1>
          <p className="hero-intro">
            Wild rides, blocky worlds, and brand-new challenges—all built for
            players who never stop exploring.
          </p>
          <a className="primary-button" href="#games">
            <span aria-hidden="true">▶</span> EXPLORE GAMES
          </a>
          <div className="online-row">
            <span className="online-dot" />
            <strong>ARCADE ONLINE</strong>
            <span>NEW GAMES ON THE WAY</span>
          </div>
        </div>

        <div className="hero-world" aria-label="A colorful block-built game world">
          <div className="sun" />
          <div className="cloud cloud-one" />
          <div className="cloud cloud-two" />
          <div className="mountain mountain-back" />
          <div className="mountain mountain-front" />
          <div className="island">
            <div className="tree tree-one"><i /><b /></div>
            <div className="tree tree-two"><i /><b /></div>
            <div className="road"><span className="road-line one" /><span className="road-line two" /></div>
            <div className="car"><i /><b /><span /></div>
          </div>
          <div className="float-block block-one" />
          <div className="float-block block-two" />
          <div className="score-chip"><span>🏆</span><strong>HIGH SCORE</strong><b>10,250</b></div>
        </div>
      </section>

      <section className="games-section" id="games">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>◆</span> PICK YOUR ADVENTURE</p>
            <h2>THE GAME ZONE</h2>
          </div>
          <span className="game-count">2 GAMES READY · MORE IN THE WORKS</span>
        </div>

        <article className="featured-card">
          <div className="featured-art" aria-hidden="true">
            <div className="mini-sky" />
            <div className="mini-hills one" />
            <div className="mini-hills two" />
            <div className="mini-road"><i /><b /></div>
            <div className="mini-car"><i /><b /><span /></div>
            <span className="featured-badge">FIRST RELEASE</span>
          </div>
          <div className="featured-copy">
            <p className="card-kicker">🏁 FEATURED GAME</p>
            <h3>DRIVE DOWN<br /><em>THE ALCAN</em></h3>
            <p>
              Hit the hills, keep your wheels down, and chase a new personal
              best on Teo&apos;s wildest road.
            </p>
            <div className="game-tags"><span>DRIVING</span><span>ARCADE</span><span>ALL AGES</span></div>
            <a
              className="launch-button"
              href="https://teo.slashnburngrowth.biz/"
              aria-label="Play Drive Down the Alcan"
            >
              PLAY NOW <span>→</span>
            </a>
          </div>
        </article>

        <article className="crowd-game-card">
          <div className="crowd-game-art" aria-hidden="true">
            <div className="crowd-road" />
            <div className="choice-gate choice-gate-left"><span>+12</span></div>
            <div className="choice-gate choice-gate-right"><span>×3</span></div>
            <div className="crowd-squad crowd-squad-blue">
              {Array.from({ length: 14 }, (_, index) => <i key={`blue-${index}`} />)}
            </div>
            <div className="crowd-squad crowd-squad-red">
              {Array.from({ length: 10 }, (_, index) => <i key={`red-${index}`} />)}
            </div>
            <div className="wall-meter-mini"><span>HOME WALL</span><b /></div>
            <span className="crowd-game-badge">NEW GAME</span>
          </div>
          <div className="crowd-game-copy">
            <p className="card-kicker">SECOND ACTIVE GAME</p>
            <h3>ALCAN CROWD<br /><em>CLASH</em></h3>
            <p>
              Compare the gates, grow your blue crew, stop the red crowd, and
              protect the home wall.
            </p>
            <div className="game-tags"><span>STRATEGY</span><span>ARCADE</span><span>ALL AGES</span></div>
            <a
              className="launch-button"
              href="/alcan-block-brigade/"
              aria-label="Play Alcan Crowd Clash"
            >
              PLAY NOW <span>→</span>
            </a>
          </div>
        </article>

        <div className="upcoming-grid" aria-label="Upcoming games">
          {upcomingGames.map((game) => (
            <article className={`upcoming-card ${game.tone}`} key={game.title}>
              <div className="upcoming-icon" aria-hidden="true">{game.icon}</div>
              <div>
                <span>{game.type}</span>
                <h3>{game.title}</h3>
              </div>
              <b>COMING SOON</b>
            </article>
          ))}
        </div>
      </section>

      <Leaderboard />

      <section className="about-strip" id="about">
        <p>BUILT FOR BIG IMAGINATIONS</p>
        <h2>THIS IS JUST THE START.</h2>
        <span>New worlds. New challenges. More ways to win.</span>
      </section>

      <section className="sandbox-entry" aria-labelledby="sandbox-entry-title">
        <div>
          <p>WORKBENCH ACCESS</p>
          <h2 id="sandbox-entry-title">THE SANDBOX</h2>
          <span>Playable experiments and games still being built.</span>
        </div>
        <a className="sandbox-button" href="/sandbox/">
          OPEN SANDBOX <span aria-hidden="true">→</span>
        </a>
        <small>EXPERIMENTAL BUILDS · EXPECT CHANGES</small>
      </section>

      <footer>
        <div className="brand footer-brand">
          <span className="brand-cube" aria-hidden="true">T</span>
          <span><strong>TEO IS THE</strong><b>WINNER!</b></span>
        </div>
        <p>© 2026 TeoIsTheWinner.com · PLAY KIND. HAVE FUN.</p>
      </footer>
    </main>
  );
}
