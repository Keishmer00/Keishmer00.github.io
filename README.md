# Keishmer Studio — Portafolio web

Portafolio profesional de **Keishmer Pérez Torres** (Product Designer, UX/UI, Frontend y Artista Visual) en [keishmerstudio.com](https://keishmerstudio.com): landing bilingüe (inglés base, español bajo `/es/`), casos de estudio por categoría, páginas de servicio, formulario de contacto que guarda leads en Supabase y avisa por correo, analítica bajo consentimiento y SEO con datos estructurados. Astro 7 + Tailwind v4 + GSAP, desplegado en Vercel.

Repos hermanos: `wise-website` y `wisegold-system`. Los tres comparten el mismo sistema de trabajo (SDD).

## Mapa de documentación

| Quiero… | Leer |
|---|---|
| Entender qué es el sitio | [docs/product.md](docs/product.md) |
| Montar mi entorno local | [docs/onboarding.md](docs/onboarding.md) |
| Conocer las reglas | [docs/rules.md](docs/rules.md) |
| Entender el código | [docs/architecture.md](docs/architecture.md) |
| Construir una feature (specs) | [specs/README.md](specs/README.md) |
| Apuntar mi IA al proyecto | [AGENTS.md](AGENTS.md) |

## Arranque rápido

```bash
git clone <repo-url> && cd WebPortfolioKeishmer
pnpm install                      # pnpm, no npm · Node >= 22.12
cp .env.example .env              # y rellena las claves (ver docs/onboarding.md)
pnpm dev                          # http://localhost:4321 (EN) · /es/ (ES)
```

Sin `.env` el sitio corre igual; solo el formulario de contacto falla (necesita Supabase, reCAPTCHA y Resend).

## Comandos

```bash
pnpm dev          # dev server (localhost:4321)
pnpm build        # build con adapter de Vercel → .vercel/output — antes de pushear
pnpm preview      # preview del build
pnpm astro        # CLI de Astro (add, check, …)
```

## Stack

Astro 7 (`output: 'server'` + adapter `@astrojs/vercel`; páginas `prerender = true`, API serverless) · TypeScript (`astro/tsconfigs/strict`) · Tailwind CSS v4 · GSAP + ScrollTrigger · i18n propio con 2 idiomas (EN base) · Supabase (PostgreSQL + RLS) · Resend · reCAPTCHA v3 · Microsoft Clarity + Vercel Analytics (bajo consentimiento) · `@astrojs/sitemap`

## Cómo trabajamos

Cambios de comportamiento, contrato, datos o SEO parten de una spec corta en [`specs/`](specs/README.md); commits atómicos en inglés (Conventional Commits) directos a `main`; `pnpm build` en verde antes de pushear. Reglas completas: [docs/rules.md](docs/rules.md).
