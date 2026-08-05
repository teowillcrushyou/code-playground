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
  assert.ok((html.match(/VERSION 1\.00/g) || []).length >= 2);
  assert.doesNotMatch(html, /COMING SOON/);
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

test("renders the canonical sandbox hub and public idea box", async () => {
  const html = await readFile(new URL("sandbox/index.html", outputRoot), "utf8");

  assert.match(html, /GAMES IN PROGRESS/);
  assert.match(html, /WHAT SHOULD TEO BUILD NEXT/);
  assert.match(html, /\/sandbox\/games\/northline\//);
  assert.match(html, /CURRENT BUILD/);
  assert.doesNotMatch(html, /sandbox2/i);
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
