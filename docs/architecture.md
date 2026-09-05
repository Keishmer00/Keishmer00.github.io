# Keishmer Studio — Arquitectura

> Referencia de consulta puntual — ve a la sección que tu tarea necesite.
> Negocio: [product.md](./product.md) · Reglas: [rules.md](./rules.md) · Setup: [onboarding.md](./onboarding.md)

## Stack

**Astro 7** (`output: 'server'` con adapter `@astrojs/vercel`, `site: https://keishmerstudio.com`; todas las páginas declaran `prerender = true`, así que el build produce HTML estático y solo la API corre como función serverless) · TypeScript (`astro/tsconfigs/strict`) · **Tailwind CSS v4** vía `@tailwindcss/vite` (tema en `src/styles/global.css`: `:root` + `@theme`; fuentes locales Unbounded, Albert Sans, VT323 "Mono") · **GSAP** + ScrollTrigger · canvas 2D / WebGL2 en vanilla JS · **Supabase** (`@supabase/supabase-js`, tabla `leads_clients` con RLS) · **Resend** (API HTTP directa, el paquete `resend` no se importa) · reCAPTCHA v3 · `@astrojs/sitemap` · Microsoft Clarity + Vercel Analytics (scripts cargados bajo consentimiento) · pnpm (no npm) · Node ≥ 22.12.

Sin React/Vue/Svelte: la interactividad son custom elements y `<script>` de componente. (`tsconfig`/`jsconfig` declaran `jsx: react-jsx` por herencia de la plantilla — no hay JSX en el repo.)

## Estructura de `src/`

```
pages/
├── [...lang]/           # Catch-all de idioma: lang = undefined (EN, raíz) | "es"
│   ├── index.astro      # Home: Navbar, Hero, IdealClients, About, FeaturedProjects, Process,
│   │                    #       ServiceBanner, Faq, SkillsBanner, Form, Footer
│   ├── about-me.astro   # Sobre mí (trayectoria, formación, certificaciones, skills)
│   ├── projects.astro   # Listado de los proyectos destacados (featured.ts) + JSON-LD ItemList
│   ├── projects/[slug].astro              # Detalle de destacado (narrativa por etapas, galería) + CreativeWork
│   ├── contact.astro    # Contacto (intro + Form)
│   ├── ux-ui-design.astro · frontend-dev.astro · visual-artist.astro  # → ServiceLanding
│   ├── privacy.astro · terms.astro        # Legales
│   └── api/submit-clients.ts              # POST del formulario (prerender = false)
└── 404.astro            # Global; idioma por prefijo /es/ del path
components/
├── Navbar (+ LanguageSwitcher, atoms/item__menu) · Footer · Hero (+ CTA, BlackHoleBG)
├── IdealClients · About · FeaturedProjects · Process · ServiceBanner · Faq · SkillsBanner · Form
├── FeaturedProjects     # Destacados fullscreen con scroll horizontal (GSAP pin + snap; fallback scroll-snap)
├── ProjectGallery       # Galería del detalle: rejilla 16:9 vista alejada + ampliar a pantalla completa (GSAP)
├── ServiceLanding       # Plantilla de las 3 páginas de servicio
├── SeoHead · Analytics · ConsentBanner · CursorParticles   # Montados por Layout
├── atoms/Breadcrumbs    # Migas + JSON-LD BreadcrumbList
└── (sin montar hoy: Strategic + MeshText, FinalCTA, molecules/EmailObfuscator)
i18n/                    # index.ts (Lang, useTranslations, helpers de rutas), en.json, es.json
layouts/Layout.astro     # <html lang>, favicons, manifest, SeoHead, CursorParticles, Analytics, ConsentBanner
lib/featured.ts          # Proyectos destacados por marca con etapas del proceso (base EN + esFeatured) — spec 008
styles/global.css        # @font-face, :root, @theme, scrollbar, .grecaptcha-badge oculto
assets/                  # fonts/, icons/, images/<slug>-brand/ (index, hero, 1…N), Logos/, videos/ (404.mp4, background.mp4)
```

Fuera de `src/`: `public/` (favicons, `og-image.png`, `robots.txt`, `llms.txt`, `es/llms.txt`), `supabase/` (`config.toml`, `migrations/`, `functions/send-notification-email/`), `astro.config.mjs` (adapter, `site`, sitemap con prioridades), `index.html` y `CNAME` en la raíz (residuos de la versión estática en GitHub Pages — Astro no los sirve).

## Routing e i18n

- Dos idiomas, sistema propio (no `astro:i18n`): `en` base en la raíz, `es` bajo `/es/`. Cada página exporta `getStaticPaths()` con las dos entradas y lee `const { lang = "en" } = Astro.params`.
- `useTranslations(lang)` devuelve `{ t, tArray, lang, alternateLang }`. `t("a.b.c")` resuelve claves punteadas sobre el JSON del idioma; si falta o no es string, **devuelve la clave literal** (no hay fallback a EN ni interpolación de parámetros). `tArray` devuelve `[]` si falta.
- Helpers de rutas: `getLangFromUrl(url)`, `getLocalizedPath(path, lang)` (antepone `/es/`), `getAlternatePaths(pathname)` (par `{en, es}` para hreflang). `LanguageSwitcher` calcula la URL equivalente del otro idioma y enlaza con `hreflang`.
- `Layout` pone `<html lang="en|es">`; no hay RTL. El 404 resuelve el idioma mirando si el path empieza por `/es/`.
- Detalle y decisiones: [spec 001](../specs/001-i18n-and-routing/spec.md).

## SEO y datos estructurados

`SeoHead.astro` (dentro de `Layout`) emite título/descripción (`seo.<page>.*` o props `title`/`description`), canonical con barra final, hreflang `en`/`es`/`x-default`, Open Graph (`og-image.png` 1200×630) y JSON-LD: `Person` (home y about-me), `ProfessionalService` (home), `WebSite` y `WebPage` (todas). `Breadcrumbs` añade `BreadcrumbList`; `projects.astro` un `ItemList` de los destacados; el detalle de destacado un `CreativeWork`. `@astrojs/sitemap` genera `sitemap-index.xml` con i18n y prioridades (home 1.0, contacto 0.9, proyectos 0.8, resto 0.7). `public/llms.txt` y `public/es/llms.txt` resumen el sitio para motores de respuesta. Detalle: [spec 002](../specs/002-seo-and-structured-data/spec.md).

## Leads de clientes

`Form.astro` (home y `/contact/`) envía JSON a `POST /api/submit-clients` con token de reCAPTCHA v3 (acción `submit`) y atribución (`language`, `source_path`, `referrer`, `utm_*`). El endpoint aplica rate limit 5/min/IP, valida y recorta campos, verifica reCAPTCHA (score ≥ 0.5, acción, hostname permitido), inserta en `leads_clients` con la service role de Supabase y notifica por Resend (fallo del correo no falla el request). Detalle: [spec 003](../specs/003-client-leads/spec.md).

## Proyectos destacados

Una fuente tipada, sin CMS (spec 008) — `src/lib/featured.ts`: `baseFeatured` (EN, en orden de presentación) con `FeaturedProject { id, brand, title, description, intro, outcome, client, year, sector, services, url?, image, imageAlt, heroImage?, logo, logoAlt, gallery?, stages, seoTitle, seoDescription }` (las imágenes son `ImageMetadata` importadas de `src/assets/images/<slug>-brand/`) y `stages: ProcessStage[]` sobre el vocabulario fijo `PROCESS_STAGE_IDS` (`briefing | research | branding | uxui | development`; las etiquetas son i18n `featured.stages.*`). El español se aplica por `esFeatured[id]` (objeto de overrides por marca, con `stages` por id de etapa). Helpers: `allFeaturedProjects`, `getFeaturedProjects(lang)`, `getFeaturedProjectUrl(id, lang)` → `/projects/{id}/`, `findFeaturedProject`, `getAdjacentFeatured`. Lo consumen `FeaturedProjects.astro` (home: un panel fullscreen por marca, scroll horizontal con ScrollTrigger pin + scrub + snap y fallback nativo con `scroll-snap`), `/projects/` (listado) y `/projects/[slug]/` (detalle con las etapas, hero con `<picture>` — `heroImage` 16:9 en ≥ lg — y `ProjectGallery.astro`: celdas 16:9 en un viewport escalado, minimapa, y la seleccionada ampliada a pantalla completa). Requerimientos de imágenes: [images.md](./images.md). Detalle: [spec 008](../specs/008-featured-projects/spec.md).
El catálogo por categorías (spec 004: `projects.ts`, `Works.astro`, `/projects/{categoría}/{slug}/`) se retiró el 2026-09-05; sus URLs caen a 404.

Nota de scroll: `Layout.astro` usa `overflow-x: clip` (no `hidden`) en `html`/`body` para que la **ventana** sea el scroller; con `hidden` + `height: 100%` el `body` pasaba a ser el contenedor de scroll y ningún ScrollTrigger recibía el scroll (008 §6).

## Analítica y consentimiento

`ConsentBanner` guarda `keishmer-analytics-consent` (`accepted` | `declined`) en `localStorage` y emite `keishmer:analytics-consent`; `Analytics.astro` solo inyecta Clarity y `/_vercel/insights/script.js` con consentimiento aceptado, y traduce clics en `[data-analytics-event]`, el primer foco en `form[data-analytics-form]` (`contact_form_start`) y `keishmer:form-success` (`contact_form_submit`) en eventos para ambos proveedores. Detalle: [spec 005](../specs/005-analytics-and-consent/spec.md).

## Base de datos (Supabase)

Proyecto enlazado con la CLI (`supabase/.temp/`, gitignorado). Schema por migraciones:

| Migración | Qué hace |
|---|---|
| `00001_create_leads_clients.sql` | Tabla `public.leads_clients`, RLS, políticas `service_role` (insert/select), índice `created_at desc` |
| `20260819213150_add_lead_attribution_fields.sql` | Columnas `project_type`, `budget_range`, `timeline`, `language`, `source_path`, `referrer`, `utm_*`; constraints tolerantes a `null` |

Edge Function `send-notification-email` (Deno, `verify_jwt = true`, header `x-webhook-secret`): **legado** — el envío de correo ya lo hace el endpoint; queda por si se conecta un Database Webhook.

## Variables de entorno

`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (opcional, default `Keishmer Studio <onboarding@resend.dev>`), `LEAD_NOTIFICATION_EMAIL` (opcional, default correo del owner), `RECAPTCHA_ALLOWED_HOSTNAMES` (opcional, default `keishmerstudio.com,localhost`), `RECAPTCHA_SECRET_KEY`, `PUBLIC_RECAPTCHA_SITE_KEY` (única pública, la lee el script del formulario), `PUBLIC_GOOGLE_SITE_VERIFICATION` (presente en `.env`, hoy sin uso en el código). Plantilla sin valores: `.env.example`. Los `.env*` están gitignorados y viven en cada máquina y en el proyecto de Vercel. ⚠️ El `.env` real estuvo commiteado entre el 2026-07-04 y el 2026-07-08 — ver [pending.md](./pending.md).

## Build, deploy e infra

`pnpm build` → `.vercel/output/` (estáticos + función `_render` para `/api/submit-clients`, `404`, `_image` y server islands). Producción en **Vercel** bajo `keishmerstudio.com`; las variables se configuran en el proyecto de Vercel. El repositorio remoto sigue siendo `Keishmer00/Keishmer00.github.io` (origen de `CNAME` e `index.html` legados). Detalle y runbook: [spec 006](../specs/006-infra-and-deploy/spec.md).

## Calidad

Gate actual: `pnpm build`. **No hay `check`, linter ni tests** (candidatas en [pending.md](./pending.md)); no asumas que existen. No hay CI propia: el deploy lo hace Vercel.
