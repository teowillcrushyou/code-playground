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
