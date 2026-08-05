import Leaderboard from "./Leaderboard";

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
          <p className="eyebrow"><span>‚òÖ</span> WELCOME TO TEO&apos;S WORLD</p>
          <h1>PLAY BIG.<br /><em>WIN BIGGER.</em></h1>
          <p className="hero-intro">
            Wild rides, blocky worlds, and brand-new challenges‚Äîall built for
            players who never stop exploring.
          </p>
          <a className="primary-button" href="#games">
            <span aria-hidden="true">‚ñ∂</span> EXPLORE GAMES
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
          <div className="score-chip"><span>üèÜ</span><strong>HIGH SCORE</strong><b>10,250</b></div>
        </div>
      </section>

      <section className="games-section" id="games">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>‚óÜ</span> PICK YOUR ADVENTURE</p>
            <h2>THE GAME ZONE</h2>
          </div>
          <span className="game-count">2 GAMES READY ¬∑ MORE IN THE WORKS</span>
        </div>

        <article className="featured-card">
          <div className="featured-art" aria-hidden="true">
            <div className="mini-sky" />
            <div className="mini-hills one" />
            <div className="mini-hills two" />
            <div className="mini-road"><i /><b /></div>
            <div className="mini-car"><i /><b /><span /></div>
            <span className="featured-badge">OFFICIAL ¬∑ VERSION 1.00</span>
          </div>
          <div className="featured-copy">
            <p className="card-kicker">üèÅ FEATURED GAME</p>
            <h3>DRIVE DOWN<br /><em>THE ALCAN</em></h3>
            <p>
              Hit the hills, keep your wheels down, and chase a new personal
              best on Teo&apos;s wildest road.
            </p>
            <div className="game-tags"><span>DRIVING</span><span>ARCADE</span><span>ALL AGES</span></div>
            <a
              className="launch-button"ÔÆ{∂âûÀk∫wµÁon=logout", {
      method: "POST",
      headers: { "X-CSRF-Token": csrf },
    });
    setSuggestions([]);
    setAuthenticated(false);
    setCsrf("");
  }

  if (authenticated !== true) {
    if (mode === "request") {
      return (
        <main className={styles.loginPage}>
          <form className={styles.loginCard} onSubmit={requestPasswordReset}>
            <p>TEO&apos;S CONTROL ROOM</p>
            <h1>RESET ACCESS</h1>
            <span>Enter the recovery email to receive a one-time reset link.</span>
            <label htmlFor="recovery-email">RECOVERY EMAIL</label>
            <input
              id="recovery-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
            <button type="submit">EMAIL RESET LINK ‚Üí</button>
            {message ? <strong role="status">{message}</strong> : null}
            <button
              className={styles.textButton}
              type="button"
              onClick={() => { setMessage(""); setMode("login"); }}
            >
              ‚Üê BACK TO SIGN IN
            </button>
          </form>
        </main>
      );
    }

    if (mode === "reset") {
      return (
        <main className={styles.loginPage}>
          <form className={styles.loginCard} onSubmit={resetPassword}>
            <p>TEO&apos;S CONTROL ROOM</p>
            <h1>NEW PASSWORD</h1>
            <span>Choose at least 10 characters with a letter and a number.</span>
            <label htmlFor="new-review-password">NEW REVIEW PASSWORD</label>
            <input
              id="new-review-password"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              minLength={10}
              maxLength={128}
              autoComplete="new-password"
              required
            />
            <label htmlFor="confirm-review-password">CONFIRM PASSWORD</label>
            <input
              id="confirm-review-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={10}
              maxLength={128}
              autoComplete="new-password"
              required
            />
            <button type="submit">SAVE NEW PASSWORD ‚Üí</button>
            {message ? <strong role="status">{message}</strong> : null}
          </form>
        </main>
      );
    }

    return (
      <main className={styles.loginPage}>
        <form className={styles.loginCard} onSubmit={login}>
          <p>TEO&apos;S CONTROL ROOM</p>
          <h1>IDEA REVIEW</h1>
          <span>Use the private review password to open the suggestion board.</span>
          <label htmlFor="review-password">REVIEW PASSWORD</label>
          <input
            id="review-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
          <button type="submit">OPEN THE BOARD ‚Üí</button>
          {message ? <strong role="status">{message}</strong> : null}
          <button
            className={styles.textButton}
            type="button"
            onClick={() => { setMessage(""); setMode("request"); }}
          >
            FORGOT PASSWORD?
          </button>
          <a href="/sandbox/">‚Üê BACK TO THE SANDBOX</a>
        </form>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p>TEO&apos;S CONTROL ROOM</p>
          <h1>IDEA REVIEW</h1>
          <span>Approve the fun ideas. Pass on anything that does not fit.</span>
        </div>
        <button type="button" onClick={logout}>LOCK BOARD</button>
      </header>

      {message ? <p className={styles.notice} role="status">{message}</p> : null}

      <section className={styles.board} aria-label="Game suggestions">
        {suggestions.length === 0 ? (
          <div className={styles.empty}>NO IDEAS WAITING YET. GO PLAY SOMETHING.</div>
        ) : suggestions.map((suggestion) => (
          <article className={styles.card} key={suggestion.id}>
            <div className={styles.cardTop}>
              <strong className={styles[suggestion.status] || styles.pending}>
                {statusNames[suggestion.status] || suggestion.status.toUpperCase()}
              </strong>
              <time dateTime={suggestion.createdAt}>
                {new Date(suggestion.createdAt).toLocaleString()}
              </time>
            </div>
            <h2>{suggestion.nickname || "ANONYMOUS PLAYER"}</h2>
            <p>{suggestion.idea}</p>

            {suggestion.status === "ready" && suggestion.buildUrl ? (
              <div className={styles.buildLinks}>
                <a href={suggestion.buildUrl} target="_blank" rel="noreferrer">PLAY NEW BUILD ‚Üó</a>
              </div>
            ) : null}

            {suggestion.status === "published" && suggestion.officialUrl ? (
              <a className={styles.officialLink} href={suggestion.officialUrl} target="_blank" rel="noreferrer">
                OPEN OFFICIAL GAME ‚Üó
              </a>
            ) : null}

            <div className={styles.actions}>
              {suggestion.status === "pending" ? (
                <>
                  <button
                    className={styles.approve}
                    type="button"
                    disabled={busyId === suggestion.id}
                    onClick={() => act(suggestion.id, "approve")}
                  >
                    APPROVE IDEA
                  </button>
                  <button
                    className={styles.reject}
                    type="button"
                    disabled={busyId === suggestion.id}
                    onClick={() => act(suggestion.id, "reject")}
                  >
                    PASS FOR NOW
                  </button>
                </>
              ) : null}
              {suggestion.status === "ready" ? (
                <button
                  className={styles.publish}
                  type="button"
                  disabled={busyId === suggestion.id}
                  onClick={() => act(suggestion.id, "publish")}
                >
                  MAKE IT AN OFFICIAL GAME
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
