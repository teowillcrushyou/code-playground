import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const candidateRoot = new URL("candidate/", projectRoot);
const games = JSON.parse(await readFile(new URL("games/sandbox.json", projectRoot), "utf8"));

if (!Array.isArray(games) || games.length === 0) {
  throw new Error("The sandbox needs at least one in-progress game.");
}

const slugs = new Set();
for (const game of games) {
  if (!/^[a-z0-9-]+$/.test(game.slug) || slugs.has(game.slug)) {
    throw new Error(`Invalid or duplicate sandbox slug: ${game.slug}`);
  }
  if (!/^0\.\d{2}$/.test(game.build)) {
    throw new Error(`Invalid pre-release build for ${game.slug}: ${game.build}`);
  }
  if (typeof game.title !== "string" || typeof game.description !== "string") {
    throw new Error(`Missing sandbox game copy for ${game.slug}.`);
  }
  slugs.add(game.slug);
  await stat(new URL(`out/sandbox/games/${game.slug}/index.html`, projectRoot));
}

await stat(new URL("out/sandbox/index.html", projectRoot));
await rm(candidateRoot, { recursive: true, force: true });
await mkdir(candidateRoot, { recursive: true });
await cp(new URL("out/sandbox/", projectRoot), candidateRoot, { recursive: true });
await cp(new URL("out/_next/", projectRoot), new URL("_next/", candidateRoot), { recursive: true });

const commit = /^[0-9a-f]{40}$/.test(process.env.GITHUB_SHA || "")
  ? process.env.GITHUB_SHA
  : "local-test";
await writeFile(
  new URL("candidate-meta.json", candidateRoot),
  `${JSON.stringify({ commit, games: games.map(({ slug, title, build }) => ({ slug, title, build })) })}\n`,
  "utf8",
);
