# AGENTS.md — WebPortfolioKeishmer

## Package manager

Use **pnpm** (not npm). `package-lock.json` is gitignored — never run `npm install`.

## Available commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Dev server (localhost:4321) |
| `pnpm build` | Build to `dist/` |
| `pnpm preview` | Preview production build |
| `pnpm astro` | Astro CLI (add, check, etc.) |

No lint, typecheck, or test scripts exist. Node >=22.12.0 required.

## Architecture

- **Astro 7** with `@astrojs/vercel` adapter, `output: 'server'`, every page has `export const prerender = true` (static except API).
- **No React / Vue / Svelte** — pure Astro + vanilla JS. Canvas animations (`BlackHoleBG.astro`, `MeshText.astro`) use vanilla `<script>` tags, no frameworks.
- **Tailwind v4** via `@tailwindcss/vite` plugin. No `tailwind.config.*`. Gradients use `bg-linear-to-r` (v4 syntax). Custom `@theme` directive maps fonts and colors.

## Routing & i18n

- Pages use `[...lang]` catch-all param with `getStaticPaths()` returning `{ params: { lang: undefined } }` (English, no prefix) and `{ params: { lang: "es" } }` (Spanish, `/es/` prefix).
- i18n is custom: `src/i18n/index.ts` with `t("dot.key")` / `tArray("dot.key")`, JSON files per locale.
- Helpers: `getLocalizedPath(path, lang)`, `getAlternatePaths(pathname)`.

## Key components & pages

| File | Role |
|------|------|
| `Hero.astro` | Full-viewport header with `BlackHoleBG` canvas background |
| `Strategic.astro` | Scroll-triggered word list + `MeshText` WebGL2 hover effect |
| `SeoHead.astro` | Canonical URLs, JSON-LD, hreflang, `noindex` on placeholder pages |
| `Layout.astro` | Wraps all pages: `CursorParticles`, Microsoft Clarity analytics |
| `[...lang]/api/submit-clients.ts` | POST endpoint (Supabase + reCAPTCHA v3) |

## Contact / Form flow

API route `submit-clients.ts` requires these env vars (all in `.env`, gitignored):

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RECAPTCHA_SECRET_KEY=
```

The API route disables prerender (`export const prerender = false`). The form uses Supabase `leads_clients` table and ReCAPTCHA v3 score (>0.5).

## Styling

- Three font faces in `global.css`: **Unbounded** (200-900, display), **Albert** (body), **Mono** (VT323, code).
- Custom `@theme` tokens: `--font-unbounded`, `--font-albert`, `--font-mono`, `--color-primary` (#FF6B6B).
- Gradients and overlays use CSS `mix-blend-mode: overlay`.
- Custom scrollbar (4px, dark).

## Animations

- **GSAP** + **ScrollTrigger** in `Strategic.astro` for scroll-based fade/slide.
- **BlackHoleBG.astro**: Canvas 2D particle simulation (vanilla JS, `requestAnimationFrame`).
- **MeshText.astro**: WebGL2 interactive text distortion with chromatic aberration (vertex/fragment shaders, mouse tracking).

## Known gotchas

- Placeholder pages (`/ux-ui-design/`, `/frontend-dev/`, `/visual-artist/`) have `<meta name="robots" content="noindex">`.
- `/projects/[category]/[slug].astro` and `Works.astro` read from `src/lib/projects.ts` (central project data with image imports).
- The reCAPTCHA badge is hidden via CSS (`.grecaptcha-badge { visibility: hidden }`).
