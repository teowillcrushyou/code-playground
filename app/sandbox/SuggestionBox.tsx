
"use client";

import { FormEvent, useState } from "react";
import styles from "./Sandbox.module.css";

type SubmitState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export default function SuggestionBox() {
  const [nickname, setNickname] = useState("");
  const [idea, setIdea] = useState("");
  const [website, setWebsite] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle" });

  async function submitSuggestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitState.kind === "sending") return;

    setSubmitState({ kind: "sending" });

    try {
      const response = await fetch("/api/suggestions.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, idea, website }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "That idea could not be sent yet.");
      }

      setIdea("");
      setWebsite("");
      setSubmitState({
        kind: "success",
        message: result.message || "Idea sent to Teo's review board!",
      });
    } catch (error) {
      setSubmitState({
        kind: "error",
        message: error instanceof Error ? error.message : "That idea could not be sent yet.",
      });
    }
  }

  return (
    <section className={styles.suggestions} aria-labelledby="suggestion-title">
      <div className={styles.suggestionIntro}>
        <p>PLAYER IDEA BOX</p>
        <h2 id="suggestion-title">WHAT SHOULD TEO BUILD NEXT?</h2>
        <span>
          Anyone can send a kind, game-sized idea. Teo reviews every suggestion
          before it reaches the build room.
        </span>
      </div>

      <form className={styles.suggestionForm} onSubmit={submitSuggestion}>
        <label htmlFor="suggestion-nickname">
          PLAYER NAME <small>OPTIONAL â€” GET CREDIT FOR YOUR IDEA</small>
        </label>
        <input
          id="suggestion-nickname"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          maxLength={20}
          autoComplete="nickname"
          placeholder="GameFan (or leave this blank)"
        />
        <p className={styles.nameHint}>
          Use a player name if you want friends to know the idea was yours. Anonymous ideas are welcome too.
        </p>

        <label htmlFor="suggestion-idea">YOUR GAME IDEA</label>
        <textarea
          id="suggestion-idea"
          value={idea}
          onChange={(event) => setIdea(event.target.value)}
          minLength={10}
          maxLength={500}
          required
          placeholder="Add a snow ramp, a giant friendly crab, and a bonus for landing safely."
        />

        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="suggestion-website">Website</label>
          <input
            id="suggestion-website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className={styles.suggestionActions}>
          <p>
            Keep it friendly. Do not include your real name, email, phone number,
            passwords, or links.
          </p>
          <button type="submit" disabled={submitState.kind === "sending"}>
            {submitState.kind === "sending" ? "SENDING..." : "SEND IDEA"}
            <span aria-hidden="true">â†’</span>
          </button>
        </div>

        {submitState.kind === "success" || submitState.kind === "error" ? (
          <p
            className={submitState.kind === "success" ? styles.success : styles.error}
            role="status"
          >
            {submitState.message}
          </p>
        ) : null}
      </form>
    </section>
  );
}

