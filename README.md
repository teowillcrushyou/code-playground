# TeoIsTheWinner.com

The home base for Teo's games. The first release will be **Drive Down the Alcan**, with more driving, building, exploration, and arcade games planned.

## Project shape

- `app/page.tsx` — game-menu home screen and content
- `app/globals.css` — the visual system and responsive layout
- `public/` — shared images, icons, and future game art
- `games/` — reserved for self-contained web game builds
- `out/` — upload-ready static website created by the production build

## Local use

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Create the upload-ready site

```bash
npm run build
```

The static result is written to `out/` for publishing to the InMotion web folder. The game itself will be connected in the next publishing step.

## Brand direction

Original block-built arcade styling with energetic colors, big touch-friendly controls, and a mobile-first game menu. It takes broad inspiration from sandbox and endless-runner games without copying their characters, logos, or artwork.
