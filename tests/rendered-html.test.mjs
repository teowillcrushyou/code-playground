import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../out/", import.meta.url);

test("publishes both active games from the Game Zone", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /2 GAMES READY/);
  assert.match(html, /DRIVE DOWN/);
  assert.match(html, /https:\/\/teo\.slashnburngrowth\.biz\//);
  assert.match(html, /ALCAN CROWD/);
  assert.match(html, /href="\/alcan-block-brigade\/"/);
});

test("renders the promoted crowd game as a public route", async () => {
  const html = await readFile(
    new URL("alcan-block-brigade/index.html", outputRoot),
    "utf8",
  );

  assert.match(html, /Alcan Crowd Clash \| Teo Is The Winner!/);
  assert.match(html, /HOME WALL DEFENSE/);
  assert.match(html, /START CROWD RUN/);
  assert.doesNotMatch(html, /SANDBOX CROWD LOGIC TEST/);
  assert.doesNotMatch(html, /noindex/i);
});

test("renders the public idea box without exposing moderation controls", async () => {
  const html = await readFile(new URL("sandbox/index.html", outputRoot), "utf8");

  assert.match(html, /WHAT SHOULD TEO BUILD NEXT/);
  assert.match(html, /SEND IDEA/);
  assert.match(html, /Do not include your real name/);
  assert.doesNotMatch(html, /APPROVE IDEA/);
});

test("exports Teo's private review-board login route", async () => {
  const html = await readFile(
    new URL("teo-admin/suggestions/index.html", outputRoot),
    "utf8",
  );

  assert.match(html, /TEO(?:'|&#x27;)S CONTROL ROOM/);
  assert.match(html, /IDEA REVIEW/);
  assert.match(html, /REVIEW PASSWORD/);
  assert.match(html, /FORGOT PASSWORD/);
  assert.doesNotMatch(html, /teoisthewinner@gmail\.com/i);
});

