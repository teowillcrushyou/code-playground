"use client";

import { useEffect, useState } from "react";

type ScoreEntry = { name: string; score: number; miles: number };

export default function Leaderboard() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(`/api/leaderboard.php?t=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as { scores?: ScoreEntry[] };
        if (active) setScores(Array.isArray(data.scores) ? data.scores.slice(0, 5) : []);
      } finally {
        if (active) setLoaded(true);
      }
    };
    void load();
    const timer = window.setInterval(load, 30000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  return (
    <section className="leaderboard-section" aria-labelledby="leaderboard-title">
      <div className="leaderboard-heading">
        <div>
          <p className="eyebrow"><span>★</span> GAME ZONE HIGH SCORES</p>
          <h2 id="leaderboard-title">TRAILBLAZERS</h2>
        </div>
        <span>TOP 5 ALL-TIME RUNS</span>
      </div>
      <ol className="leaderboard-list">
        {scores.length > 0 ? scores.map((entry, index) => (
          <li key={`${entry.name}-${index}`}>
            <b>{index + 1}</b><strong>{entry.name}</strong><span>{entry.miles.toLocaleString()} MI</span><em>{entry.score.toLocaleString()}</em>
          </li>
        )) : (
          <li className="leaderboard-empty"><b>—</b><strong>{loaded ? "FIRST RUN IS UP FOR GRABS" : "LOADING SCORES"}</strong></li>
        )}
      </ol>
      <p className="leaderboard-note">Nicknames only—no login, email, or password required.</p>
    </section>
  );
}
