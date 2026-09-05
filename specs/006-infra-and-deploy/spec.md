# Spec 006 — Infraestructura y deploy

`Estado: hecha (as-built, verificada contra código/config 2026-08-22)` · `Autor: Keishmer + IA` · `Fecha: 2026-08-22` · `Relacionadas: 002 (dominio canónico), 003 (variables de la API)`

## 1. Objetivo (una frase)

Servir el sitio estático y su único endpoint desde Vercel bajo `keishmerstudio.com`, con Supabase gestionado como base de datos y sin infraestructura propia que operar.

## 2. Alcance

**Entra:** la configuración de Astro/Vercel, la forma del build, el dominio, las variables de entorno por entorno, la gestión del proyecto de Supabase con la CLI y el runbook de deploy/rollback.
**No entra:** CI/CD propio (no existe — el deploy lo hace Vercel); el endpoint en sí (spec 003).

## 3. Modelo y contratos

**Astro** (`astro.config.mjs`): `output: 'server'`, `adapter: vercel()` (opciones por defecto), `site: https://keishmerstudio.com`, `@tailwindcss/vite`, integración `sitemap` (spec 002). Todas las páginas declaran `prerender = true` → HTML estático; solo `api/submit-clients.ts` (`prerender = false`) corre en la función serverless.

**Build** (`pnpm build` → `.vercel/output/`, gitignorado): `static/` con las páginas de los dos idiomas y `_astro/*` (cache `immutable`, 1 año); función `_render` para `/api/submit-clients` (con prefijo de idioma opcional), `/404`, `/_image` y `/_server-islands/*`; cualquier otra ruta → `_render` con `status: 404` (sirve `404.astro`). Hay un `dist/` local de builds anteriores — también gitignorado.

**Plataforma:** **Vercel**, proyecto con dominio `keishmerstudio.com` (HTTPS gestionado). El repo remoto es `github.com/Keishmer00/Keishmer00.github.io` (rama canónica `main`); `CNAME` e `index.html` en la raíz son residuos del hosting anterior en GitHub Pages y Astro no los sirve. ⚠️ **Por confirmar por el owner:** que el proyecto de Vercel esté conectado a ese repo con `main` como rama de producción (deploy automático en cada push + previews por rama) — desde el código no se puede verificar.

**Toolchain:** Node ≥ 22.12 (`engines`), pnpm ≥ 10 (`pnpm-workspace.yaml` usa `minimumReleaseAgeExclude` y `allowBuilds` con `esbuild`/`sharp` en `false`, así que ningún postinstall nativo corre — sin `sharp` no funciona `<Image>`/`_image` de Astro, hoy no usado), `pnpm-lock.yaml` versionado, `package-lock.json` ignorado. `packageManager` **no** está fijado (pending #4.2).

**Variables de entorno** — local en `.env` (gitignorado; plantilla `.env.example`) y en Vercel → Settings → Environment Variables:

| Variable | Uso | Entorno |
|---|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | insert de leads (spec 003) | servidor |
| `RECAPTCHA_SECRET_KEY` | verificación reCAPTCHA | servidor |
| `PUBLIC_RECAPTCHA_SITE_KEY` | script del formulario | cliente (inlined en build) |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`*, `LEAD_NOTIFICATION_EMAIL`* | correo de aviso | servidor |
| `RECAPTCHA_ALLOWED_HOSTNAMES`* | hosts válidos del token | servidor |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | sin uso en código hoy | — |

\* opcionales (tienen default en el código). Las `PUBLIC_*` se incrustan en el build: cambiarlas exige redeploy. ⚠️ Deuda as-built: el `.env` estuvo commiteado del 2026-07-04 al 2026-07-08 — rotación en pending #1.

**Supabase:** proyecto gestionado, enlazado con la CLI (`supabase/.temp/`, ignorado). `supabase/config.toml` (⚠️ `project_id = "Landing_WiseGold"`, heredado — pending #7.4), `supabase/migrations/*.sql` (schema, spec 003), `supabase/functions/send-notification-email/` (legado, `verify_jwt = true`).

**Runbook:**

```bash
# Deploy a producción
pnpm build                      # debe pasar en local antes de pushear
git push origin main            # Vercel construye y publica (si la integración está activa)
# alternativa sin integración: npx vercel --prod

# Rollback
# Vercel → Deployments → deploy anterior → "Promote to Production"

# Migración de schema
supabase link --project-ref <ref>   # una vez por máquina
supabase db push                    # aplica supabase/migrations/ pendientes

# Variables
# Vercel → Project → Settings → Environment Variables (Production / Preview) → redeploy
```

## 4. Plan (resumen as-built)

1. Adapter de Vercel con `output: 'server'` y `prerender = true` en páginas.
2. Dominio `keishmerstudio.com` en Vercel; `site` en la config para canonicals y sitemap.
3. Variables en `.env`/Vercel; `.env.example` como plantilla.
4. Supabase enlazado por CLI con migraciones versionadas.

## 5. Criterios de aceptación (as-built)

- [x] `pnpm build` en local produce `.vercel/output` con las páginas de ambos idiomas como estáticos y la función para `/api/submit-clients`.
- [x] `https://keishmerstudio.com/` y `/es/` sirven con HTTPS; el formulario envía en producción (hostname permitido por reCAPTCHA).
- [x] Una URL no generada responde con la página 404 de Astro (HTTP 404).
- [x] Los secretos no están en el repo actual (`.env` ignorado; `.env.example` sin valores).
- [ ] Integración Git ↔ Vercel y rama de producción confirmadas por el owner (ver §3).
- [ ] Claves rotadas tras la exposición en el historial (pending #1).

## 6. Decisiones

**Tomadas:** **Vercel con el adapter oficial** — cero servidores, previews por deploy y una función para el único endpoint. `output: 'server'` + `prerender = true` por página — Astro ≥ 5 no tiene modo híbrido separado: este es el patrón para "estático por defecto, servidor solo donde se declara". Supabase gestionado — tabla con RLS y dashboard para ver leads sin operar Postgres. Variables en la plataforma, no en código ni en build args — cada entorno tiene las suyas; un cambio de `PUBLIC_*` es un redeploy. Sin CI propia — `pnpm build` local como gate y Vercel como build de verdad; el equipo es una persona.

**Descartadas:** GitHub Pages (hosting original del repo) — no puede ejecutar la función del formulario; de ahí la migración a Vercel (quedan `CNAME` e `index.html` por retirar). `output: 'static'` — dejaría la API sin runtime. Docker en VM (patrón de `wise-website`) — sobredimensionado para un portafolio sin base de datos propia. Netlify/Cloudflare — sin ventaja frente a la integración Astro ↔ Vercel ya en uso.
