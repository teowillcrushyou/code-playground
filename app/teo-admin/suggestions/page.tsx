"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import styles from "./SuggestionsAdmin.module.css";

type Suggestion = {
  id: string;
  nickname: string;
  idea: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  buildUrl?: string | null;
  priorUrl?: string | null;
  officialUrl?: string | null;
  branch?: string | null;
};

const statusNames: Record<string, string> = {
  pending: "NEEDS A DECISION",
  approved: "QUEUED FOR BUILD",
  building: "IN THE BUILD ROOM",
  ready: "READY TO PLAY",
  publish_requested: "QUEUED FOR MAIN SITE",
  publishing: "MOVING TO MAIN SITE",
  published: "OFFICIAL GAME",
  rejected: "PASSED FOR NOW",
  failed: "NEEDS HELP",
};

export default function SuggestionsAdminPage() {
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "request" | "reset">("login");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [csrf, setCsrf] = useState("");
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState("");

  const loadSuggestions = useCallback(async () => {
    const response = await fetch("/api/suggestions.php?action=list", {
      method: "POST",
      cache: "no-store",
    });
    if (response.status === 401) {
      setAuthenticated(false);
      return;
    }
    const result = (await response.json()) as {
      ok?: boolean;
      csrf?: string;
      suggestions?: Suggestion[];
      message?: string;
    };
    if (!response.ok || !result.ok) throw new Error(result.message || "Could not load ideas.");
    setCsrf(result.csrf || "");
    setSuggestions(result.suggestions || []);
    setAuthenticated(true);
  }, []);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("reset") || "";
    if (/^[a-f0-9]{64}$/.test(token)) {
      setResetToken(token);
      setMode("reset");
    }
  }, []);

  useEffect(() => {
    loadSuggestions().catch((error) => {
      setAuthenticated(false);
      setMessage(error instanceof Error ? error.message : "Could not load ideas.");
    });
  }, [loadSuggestions]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/suggestions.php?action=login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const result = (await response.json()) as { ok?: boolean; message?: string };
    if (!response.ok || !result.ok) {
      setMessage(result.message || "That password did not work.");
      return;
    }
    setPassword("");
    await loadSuggestions();
  }

  async function requestPasswordReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/suggestions.php?action=request_password_reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const result = (await response.json()) as { ok?: boolean; message?: string };
    setMessage(result.message || "The reset request could not be completed.");
    if (response.ok && result.ok) setEmail("");
  }

  async function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (newPassword !== confirmPassword) {
      setMessage("The two passwords do not match.");
      return;
    }
    const response = await fetch("/api/suggestions.php?action=reset_password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: resetToken, password: newPassword }),
    });
    const result = (await response.json()) as { ok?: boolean; message?: string };
    setMessage(result.message || "The password could not be changed.");
    if (response.ok && result.ok) {
      setNewPassword("");
      setConfirmPassword("");
      setResetToken("");
      window.history.replaceState({}, "", "/teo-admin/suggestions/");
      setMode("login");
    }
  }

  async function act(id: string, action: "approve" | "reject" | "publish") {
    setBusyId(id);
    setMessage("");
    try {
      const response = await fetch("/api/suggestions.php?action=moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf },
        body: JSON.stringify({ id, decision: action }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "That action did not work.");
      setMessage(result.message || "Saved.");
      await loadSuggestions();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "That action did not work.");
    } finally {
      setBusyId("");
    }
  }

  async function logout() {
    await fetch("/api/suggestions.php?action=logout", {
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
            <button type="submit">EMAIL RESET LINK →</button>
            {message ? <strong role="status">{message}</strong> : null}
            <button
              className={styles.textButton}
              type="button"
              onClick={() => { setMessage(""); setMode("login"); }}
            >
              ← BACK TO SIGN IN
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
            <button type="submit">SAVE NEW PASSWORD →</button>
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
          <button type="submit">OPEN THE BOARD →</button>
          {message ? <strong role="status">{message}</strong> : null}
          <button
            className={styles.textButton}
            type="button"
            onClick={() => { setMessage(""); setMode("request"); }}
          >
            FORGOT PASSWORD?
          </button>
          <a href="/sandbox/">← BACK TO THE SANDBOX</a>
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
                <a href={suggestion.buildUrl} target="_blank" rel="noreferrer">PLAY NEW BUILD ↗</a>
                {suggestion.priorUrl ? (
                  <a href={suggestion.priorUrl} target="_blank" rel="noreferrer">PLAY PRIOR BUILD ↗</a>
                ) : null}
              </div>
            ) : null}

            {suggestion.status === "published" && suggestion.officialUrl ? (
              <a className={styles.officialLink} href={suggestion.officialUrl} target="_blank" rel="noreferrer">
                OPEN OFFICIAL GAME ↗
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

