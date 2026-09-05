# AGENTS.md — Keishmer Studio (keishmerstudio.com)

> **Único archivo que toda IA lee siempre.** No leas los demás documentos por protocolo:
> usa el mapa de "lectura bajo demanda" y lee solo lo que tu tarea necesite.
> Los archivos por herramienta (`CLAUDE.md`, `.claude/…`) son punteros a este.


## Qué es este proyecto

Portafolio profesional de **Keishmer Pérez Torres** (Keishmer Studio) en `keishmerstudio.com`: **Astro 7** con adapter de **Vercel** (`output: 'server'`, pero todas las páginas llevan `prerender = true` — solo la API es serverless) + Tailwind v4 + GSAP, **2 idiomas** (`en` base sin prefijo, `es` bajo `/es/`), proyectos destacados por marca (proceso briefing → investigación → branding → UX/UI → desarrollo) en `src/lib/featured.ts` con imágenes por marca en `src/assets/images/<slug>-brand/`, formulario de leads de clientes (Supabase + reCAPTCHA v3 + Resend), analítica bajo consentimiento (Clarity + Vercel Analytics) y SEO con JSON-LD, sitemap y `llms.txt`. Sin React/Vue: Astro + vanilla JS (custom elements). Rama canónica: `main`.

## Reglas de oro (checklist — completo en `docs/rules.md`)

- **Todo texto visible va por claves i18n**: cada componente recibe `lang` por props y obtiene `const { t, tArray } = useTranslations(lang)` — nunca strings quemados. (Deuda conocida: textos del script de `Form.astro` y algunos `aria-label` — no añadas más.)
- **Paridad de locales EN + ES**: toda clave entra a `src/i18n/en.json` y `src/i18n/es.json` en el mismo cambio, con **EN como base**. **No hay fallback**: una clave ausente en cualquiera de los dos se renderiza como la clave literal. Skill `.agents/skills/add-translations/`.
- **Los casos de estudio no van en i18n**: viven en `src/lib/featured.ts` (base EN `baseFeatured` + `esFeatured[id]`). Proyecto nuevo = entrada base **y** su bloque ES en el mismo cambio, con sus imágenes en `src/assets/images/<slug>-brand/` importadas como `ImageMetadata` (`docs/images.md`). Las etiquetas de etapa (`featured.stages.*`) sí son i18n.
- **Páginas**: `src/pages/[...lang]/` con `getStaticPaths()` de dos entradas (`{ lang: undefined }`, `{ lang: "es" }`) y `export const prerender = true`. Solo los endpoints llevan `prerender = false`. Página nueva = `page` nuevo en `Layout`/`SeoHead` + claves `seo.<key>.*` en ambos locales.
- **Supabase solo desde el servidor** con `SUPABASE_SERVICE_ROLE_KEY`; nunca en cliente. Cambios de schema por migración en `supabase/migrations/`. RLS siempre activa.
- **Secretos jamás en el código ni en git**: viven en `.env` local (gitignorado) y en las variables del proyecto de Vercel. (El `.env` estuvo commiteado en julio 2026 — rotación pendiente en `docs/pending.md`.)
- **SEO**: canonical y hreflang los pone `SeoHead.astro`; el sitemap lo genera `@astrojs/sitemap` (prioridades en `astro.config.mjs`). Nada de `noindex` salvo la página de error.
- **Commits: atómicos, en INGLÉS, Conventional Commits**, sin push automático — skill `commit-changes`. Commit directo a `main` (no usamos PRs).
- **`pnpm build` en verde antes de pushear.** No hay `check`, linter ni tests todavía — no asumas que existen.

## Lectura bajo demanda (lee SOLO si aplica)

| Si vas a tocar… | Lee |
|---|---|
| Idiomas, rutas `[...lang]`, `useTranslations`, selector de idioma, 404 | `specs/001-i18n-and-routing/spec.md` |
| Meta tags, canonical/hreflang, JSON-LD, sitemap, robots, `llms.txt` | `specs/002-seo-and-structured-data/spec.md` |
| Formulario de contacto, `api/submit-clients`, Supabase, Resend, reCAPTCHA | `specs/003-client-leads/spec.md` |
| Proyectos destacados, `src/lib/featured.ts`, `FeaturedProjects.astro` (scroll horizontal), `ProjectGallery.astro`, `/projects/` y `/projects/{slug}/` | `specs/008-featured-projects/spec.md` |
| Tamaños, proporciones y zonas seguras de las imágenes de los destacados | `docs/images.md` |
| Consentimiento, Clarity, Vercel Analytics, eventos `data-analytics-event` | `specs/005-analytics-and-consent/spec.md` |
| Vercel, variables de entorno, dominio, build, Supabase CLI | `specs/006-infra-and-deploy/spec.md` |
| Páginas de servicio (`/ux-ui-design/`, `/frontend-dev/`, `/visual-artist/`) | `specs/007-service-landings/spec.md` |
| Arquitectura general (secciones puntuales) | `docs/architecture.md` |
| Contexto de negocio y audiencia | `docs/product.md` |
| El detalle de una regla | `docs/rules.md` |

Índice y ciclo de specs: `specs/README.md`. Cambio de comportamiento/contrato/datos/SEO sin spec → crea una corta desde `specs/_template/`.

## Skills (`.agents/`)

`commit-changes` · `add-translations` (2 locales) · librería de referencia importada (`supabase`, `supabase-postgres-best-practices`) — **opcional, no leer por protocolo**; si contradice `docs/rules.md`, ganan las reglas del proyecto.

## Comandos

```bash
pnpm dev          # dev server en localhost:4321
pnpm build        # build con adapter de Vercel → .vercel/output — antes de entregar/pushear
pnpm preview      # preview local del build
```

## Guardarraíles duros para IA

No inventes endpoints, tablas ni claves i18n (si falta, dilo y para). No introduzcas secretos en código ni en archivos versionados. No leas docs completos por protocolo. No hagas push, y no commitees sin que te lo pidan. No añadas frameworks de UI (React/Vue/Svelte): el sitio es Astro + vanilla. Node ≥ 22.12; pnpm, no npm (`package-lock.json` está gitignorado).
