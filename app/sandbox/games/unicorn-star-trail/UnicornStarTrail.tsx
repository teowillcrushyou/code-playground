"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./UnicornStarTrail.module.css";

type Mode = "idle" | "playing" | "won" | "lost";
type Drop = { id: number; x: number; y: number; kind: "star" | "cloud" };

const TARGET = 10;
const ROUND_SECONDS = 45;

export default function UnicornStarTrail() {
  const [mode, setMode] = useState<Mode>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [unicornX, setUnicornX] = useState(50);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [message, setMessage] = useState("Collect ten stars before the rainbow fades.");
  const nextId = useRef(1);

  const move = useCallback((amount: number) => {
    setUnicornX((position) => Math.max(7, Math.min(93, position + amount)));
  }, []);

  const start = useCallback(() => {
    setScore(0);
    setTimeLeft(ROUND_SECONDS);
    setUnicornX(50);
    setDrops([]);
    setMessage("The star trail is open!");
    setMode("playing");
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        event.preventDefault();
        move(-8);
      }
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        event.preventDefault();
        move(8);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move]);

  useEffect(() => {
    if (mode !== "playing") return;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          setMode("lost");
          setMessage("The rainbow faded, but the trail is ready for another run!");
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode]);

  useEffect(() => {
    if (mode !== "playing") return;
    const spawner = window.setInterval(() => {
      const id = nextId.current++;
      setDrops((items) => [
        ...items,
        { id, x: 7 + Math.random() * 86, y: -5, kind: id % 5 === 0 ? "cloud" : "star" },
      ]);
    }, 620);
    return () => window.clearInterval(spawner);
  }, [mode]);

  useEffect(() => {
    if (mode !== "playing") return;
    const motion = window.setInterval(() => {
      setDrops((items) => {
        let starsCaught = 0;
        let cloudCaught = false;
        const next = items
          .map((item) => ({ ...item, y: item.y + 3.3 }))
          .filter((item) => {
            const caught = item.y >= 76 && item.y <= 92 && Math.abs(item.x - unicornX) < 9;
            if (caught) {
              if (item.kind === "star") starsCaught += 1;
              else cloudCaught = true;
              return false;
            }
            return item.y < 105;
          });

        if (starsCaught) {
          setScore((value) => {
            const newScore = Math.min(TARGET, value + starsCaught);
            if (newScore >= TARGET) {
              setMode("won");
              setMessage("Rainbow complete! The whole sky is sparkling.");
            } else {
              setMessage(`${newScore} star${newScore === 1 ? "" : "s"} collected - keep galloping!`);
            }
            return newScore;
          });
        }
        if (cloudCaught) setMessage("Puff! A cloud tickled the unicorn. Keep going!");
        return next;
      });
    }, 70);
    return () => window.clearInterval(motion);
  }, [mode, unicornX]);

  function steerFromPointer(event: React.PointerEvent<HTMLDivElement>) {
    if (mode !== "playing") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setUnicornX(Math.max(7, Math.min(93, ((event.clientX - bounds.left) / bounds.width) * 100)));
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/sandbox/">{"\u2190"} ALL SANDBOX GAMES</Link>
        <div>
          <p>IN-PROGRESS GAME</p>
          <h1>UNICORN STAR TRAIL</h1>
        </div>
        <strong>CURRENT BUILD 0.01</strong>
      </header>

      <section className={styles.gameShell} aria-labelledby="trail-title">
        <div className={styles.intro}>
          <p>RAINBOW RESEARCH TEST 01</p>
          <h2 id="trail-title">COLLECT 10 STARS</h2>
          <span>Move with A / D, arrow keys, the buttons, or tap anywhere on the sky.</span>
        </div>

        <div className={styles.scoreboard} aria-label="Game status">
          <div><span>STARS</span><b>{score} / {TARGET}</b></div>
          <div><span>TIME</span><b>{timeLeft}s</b></div>
        </div>

        <div
          className={styles.sky}
          onPointerDown={steerFromPointer}
          onPointerMove={(event) => event.buttons === 1 && steerFromPointer(event)}
          role="application"
          aria-label="Unicorn Star Trail play area"
        >
          <div className={styles.rainbow} aria-hidden="true" />
          <div className={styles.hills} aria-hidden="true" />
          {drops.map((drop) => (
            <span
              className={drop.kind === "star" ? styles.star : styles.cloud}
              style={{ left: `${drop.x}%`, top: `${drop.y}%` }}
              key={drop.id}
              aria-hidden="true"
            >
              {drop.kind === "star" ? "\u2605" : "\u2601"}
            </span>
          ))}
          <div className={styles.unicorn} style={{ left: `${unicornX}%` }} aria-hidden="true">{"\u{1F984}"}</div>

          {mode !== "playing" ? (
            <div className={styles.overlay}>
              <b aria-hidden="true">{mode === "won" ? "\u{1F308}" : mode === "lost" ? "\u2728" : "\u{1F984}"}</b>
              <h3>{mode === "won" ? "TRAIL COMPLETE!" : mode === "lost" ? "SO CLOSE!" : "READY TO GALLOP?"}</h3>
              <button type="button" onClick={start}>{mode === "idle" ? "START THE TRAIL" : "PLAY AGAIN"}</button>
            </div>
          ) : null}
        </div>

        <div className={styles.controls}>
          <button type="button" onClick={() => move(-9)} aria-label="Move unicorn left">{"\u2190"} LEFT</button>
          <p aria-live="polite">{message}</p>
          <button type="button" onClick={() => move(9)} aria-label="Move unicorn right">RIGHT {"\u2192"}</button>
        </div>
      </section>
    </main>
  );
}
