import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const candidateRoot = new URL("../candidate/", import.meta.url);

test("packages the permanent sandbox hub before the suggestion field", async () => {
  const html = await readFile(new URL("index.html", candidateRoot), "utf8");

  assert.match(html, /GAMES IN PROGRESS/);
  assert.match(html, /Eggstorm Arena/);
  assert.match(html, /Sandshift/);
  assert.match(html, /CURRENT BUILD (?:<!-- -->)?0\.01/);
  assert.match(html, /href="\/sandbox\/games\/eggstorm-arena\/"/);
  assert.match(html, /href="\/sandbox\/games\/sandshift\/"/);
  assert.match(html, /href="\/sandbox\/games\/northline\/"/);
  assert.match(html, /href="\/sandbox\/games\/unicorn-star-trail\/"/);
  assert.match(html, /Unicorn Star Trail/);
  assert.match(html, /TEST UNICORN FOUND/);
  assert.match(html, /CURRENT BUILD (?:<!-- -->)?0\.02/);
  assert.match(html, /WHAT SHOULD TEO BUILD NEXT/);
  assert.ok(html.indexOf("GAMES IN PROGRESS") < html.indexOf("WHAT SHOULD TEO BUILD NEXT"));
  assert.ok(html.indexOf("WHAT SHOULD TEO BUILD NEXT") < html.indexOf("TEST UNICORN FOUND"));
  assert.doesNotMatch(html, /sandbox2/i);
  assert.doesNotMatch(html, /Alcan Crowd Clash/);
});

for (const [slug, title, source] of [
  ["eggstorm-arena", "Eggstorm Arena", "https://egg.teoisthewinner.com/"],
  ["sandshift", "Sandshift", "https://sandshift.teoisthewinner.com/"],
  ["northline", "Northline", "https://zeathe.teoisthewinner.com/"],
]) {
  test(`packages a stable playable route for ${title}`, async () => {
    const html = await readFile(new URL(`games/${slug}/index.html`, candidateRoot), "utf8");
    assert.match(html, new RegExp(title));
    assert.match(html, /CURRENT BUILD (?:<!-- -->)?0\.0[12]/);
    assert.match(html, new RegExp(source.replaceAll(".", "\\.")));
    assert.match(html, /<iframe/);
  });
}

test("packages Unicorn Star Trail as a same-site playable build", async () => {
  const html = await readFile(new URL("games/unicorn-star-trail/index.html", candidateRoot), "utf8");
  assert.match(html, /Unicorn Star Trail/);
  assert.match(html, /CURRENT BUILD (?:<!-- -->)?0\.01/);
  assert.match(html, /COLLECT 10 STARS/);
  assert.match(html, /START THE TRAIL/);
  assert.doesNotMatch(html, /<iframe/);
});

test("records one displayed build per in-progress game", async () => {
  const metadata = JSON.parse(await readFile(new URL("candidate-meta.json", candidateRoot), "utf8"));
  assert.deepEqual(metadata.games, [
    { slug: "eggstorm-arena", title: "Eggstorm Arena", build: "0.01" },
    { slug: "sandshift", title: "Sandshift", build: "0.01" },
    { slug: "northline", title: "Northline", build: "0.02" },
    { slug: "unicorn-star-trail", title: "Unicorn Star Trail", build: "0.01" },
  ]);
});
