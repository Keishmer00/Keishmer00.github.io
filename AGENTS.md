# AGENTS.md — WebPortfolioKeishmer

## Package manager

Use **pnpm** (not npm). Both `pnpm-lock.yaml` and `package-lock.json` exist in the repo — the npm lockfile is stale and must not be updated.

## Available commands

Only `dev`, `build`, `preview` are defined. No lint, typecheck, or test scripts exist.

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Dev server (localhost:4321) |
| `pnpm build` | Static build to `dist/` |
| `pnpm preview` | Preview production build |
| `pnpm astro` | Astro CLI (add, check, etc.) |

Node >=22.12.0 required. No CI/CD workflows.

## Routing & i18n

Pages use `[...lang]` catch-all param. Every page defines `getStaticPaths()` returning `{ params: { lang: undefined } }` for English and `{ params: { lang: "es" } }` for Spanish.

- English is the default locale with **no URL prefix** (`/`, `/ux-ui-design/`)
- Spanish uses `/es/` prefix (`/es/`, `/es/ux-ui-design/`)
- i18n is **custom** (not `astro:i18n`): `src/i18n/index.ts` with `t("dot.key")` and `tArray("dot.key")`
- `getLocalizedPath(path, lang)` / `getAlternatePaths(pathname)` in `src/i18n/index.ts`

## Tailwind v4 quirks

- Uses `@import "tailwindcss"` (v4 syntax), no `tailwind.config.*` file
- Gradients use `bg-linear-to-r` (not `bg-gradient-to-r`) — v4 syntax change
- Custom `@theme` directive defines font and color tokens mapped to CSS vars

## Known gotchas

- **Hero video path is wrong** (`src/components/Hero.astro:92`): `<source src="/src/assets/videos/background.mp4">` won't resolve — Astro cannot serve files from `src/` via plain URLs. Move the video to `public/` or use ESM `import`.
- **`About.astro`** is imported in `index.astro` (homepage).
- **All sub-pages** (`ux-ui-design`, `frontend-dev`, `visual-artist`) are "coming soon" placeholders.
- **Microsoft Clarity** analytics (`tfbwgxewkn`) embedded in `Layout.astro`.
- **Canonical URLs** reference `keishmerstudio.com`; JSON-LD also references `keishmer00.github.io` (GitHub Pages alias).
- `package-lock.json` (npm) and `pnpm-lock.yaml` coexist — never run `npm install`.
