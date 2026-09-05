# Onboarding de desarrolladores — Keishmer Studio

De cero a un entorno local funcionando.

## 1. Contexto en 1 minuto

Este repo es el **portafolio profesional** de Keishmer Pérez Torres (`keishmerstudio.com`): landing bilingüe (EN base, ES bajo `/es/`), casos de estudio, páginas de servicio, formulario de contacto que guarda leads en Supabase y avisa por correo (Resend), analítica bajo consentimiento y SEO con datos estructurados. Astro 7 + Tailwind v4 + GSAP, desplegado en Vercel. Sin cuentas, sin tienda, sin panel.

Lectura siguiente: [product.md](./product.md) → [rules.md](./rules.md) → [architecture.md](./architecture.md) (consulta puntual). Conocimiento por feature: [`specs/`](../specs/README.md).

## 2. Prerrequisitos

- **Node.js ≥ 22.12** y **pnpm** (no npm — `package-lock.json` está gitignorado). `corepack enable` recomendado.
- Opcional: **Supabase CLI** si vas a tocar el schema (`supabase/migrations/`) o la Edge Function legada.
- Opcional: cuenta en Vercel con acceso al proyecto para ver deploys y variables.

## 3. Setup paso a paso

```bash
git clone <repo-url> && cd WebPortfolioKeishmer
pnpm install
cp .env.example .env
pnpm dev          # http://localhost:4321 (EN) · http://localhost:4321/es/ (ES)
```

### 3.1 Variables de entorno

`.env.example` lista todas las variables sin valores. Pide al owner las claves reales (Supabase service role, reCAPTCHA, Resend) o crea las tuyas de desarrollo. Propósito de cada una: [architecture.md → Variables de entorno](./architecture.md#variables-de-entorno). Regla de oro: **ningún secreto se commitea** — `.env` es local de cada máquina y las de producción viven en Vercel.

Sin `.env` todo el sitio funciona salvo el envío del formulario: el endpoint responde `500 Security validation unavailable` si falta `RECAPTCHA_SECRET_KEY` y `500 Server unavailable` si faltan las de Supabase.

### 3.2 Base de datos

No hay DB local: el formulario escribe directamente en el proyecto de Supabase configurado en `SUPABASE_URL`. Para desarrollar contra un proyecto propio: crea uno, aplica las migraciones de `supabase/migrations/` (`supabase db push` con el proyecto enlazado, o pégalas en el SQL editor en orden) y usa su service role key en tu `.env`.

### 3.3 Probar el formulario en local

reCAPTCHA v3 acepta `localhost` por defecto (`RECAPTCHA_ALLOWED_HOSTNAMES`), pero la site key debe tener `localhost` registrado en la consola de reCAPTCHA. El envío se hace a `/api/submit-clients`; el éxito se ve en el estado del formulario y en la tabla `leads_clients`.

## 4. Comandos del día a día

```bash
pnpm dev          # dev server
pnpm build        # build con adapter de Vercel → .vercel/output — SIEMPRE antes de pushear
pnpm preview      # preview del build
pnpm astro        # CLI de Astro (add, check, …)
```

## 5. Cómo trabajamos (versión corta)

1. **Spec primero** para cambios de comportamiento/contrato/datos/SEO: copia `specs/_template/`. Lo cosmético va directo. ([specs/README.md](../specs/README.md))
2. **Commit directo a `main`** — no usamos PRs. Commits atómicos en inglés, Conventional Commits ([rules.md §6](./rules.md#6-proceso-sdd-simplificado--1-dev--ia)).
3. **`pnpm build` en verde antes de pushear.**
4. **Con IA**: apúntala a [`AGENTS.md`](../AGENTS.md).

## 6. Trampas que te ahorran una tarde

- **Toda clave i18n va en `en.json` y `es.json`** — no hay fallback: si falta en uno, la UI muestra la clave literal (`hero.headline`). Skill `add-translations`.
- Los textos de los **casos de estudio no están en los JSON**: están en `src/lib/featured.ts` (español en `esFeatured`). Si añades un proyecto y olvidas un override, esa pieza saldrá en inglés en `/es/`.
- Cada página necesita su `getStaticPaths()` de dos entradas y `prerender = true`; si lo omites, la página pasa a renderizarse en la función serverless de Vercel sin que nadie lo note en local.
- El `pathname` que pasas a `Layout` debe llevar **barra final** — el canonical, el hreflang y el selector de idioma se calculan a partir de él.
- Página nueva sin `page` en la unión de `Layout`/`SeoHead` ni claves `seo.<key>.*` → título y descripción salen como clave literal.
- La home (`FeaturedProjects.astro`), `/projects/` y `/projects/{slug}/` (con `ProjectGallery.astro`) comparten `featured.ts`; las imágenes van en `src/assets/images/<slug>-brand/` con las medidas de `docs/images.md`; `Strategic.astro` y `FinalCTA.astro` existen pero **no están montados** — no los "arregles" pensando que se ven.
- `output: 'server'` no significa SSR: el sitio es estático por `prerender = true`. Solo `/api/submit-clients` corre en servidor.
- El rate limit del endpoint es en memoria: en Vercel se reinicia con cada instancia — no dependas de él para pruebas de abuso.
