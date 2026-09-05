# Specs — desarrollo guiado por especificaciones (Keishmer Studio)

Todo cambio que altera **comportamiento, contratos, datos o SEO** parte de una spec corta — antes del código. La spec es la fuente de verdad permanente de su feature. Lo cosmético (copys, estilos) no necesita spec. Mismo sistema que `wise-website` y `wisegold-system`.

## Cómo crear una

1. Copia `_template/` a `specs/NNN-nombre-corto/` con el **siguiente número libre** (los números no se reutilizan; el nombre de carpeta va en inglés kebab-case, el contenido en español).
2. Llena `spec.md` — media página basta para una feature chica. Tú respondes por su exactitud.
3. Implementa contra la spec; si te desvías, **actualiza la spec en el mismo commit**.
4. Al terminar: estado `hecha` + actualizar la fila del índice. Los commits referencian `Spec: NNN`.

Sin gate de aprobación: con un solo dev, la spec es tu contrato con la IA (y con tu yo de dentro de tres meses). `tasks.md` es opcional (solo features grandes).

## Estados

`en curso` → `hecha` (→ `reemplazada por NNN`)

## Anatomía

Metadata en una línea · **1.** Objetivo en una frase · **2.** Alcance in/out (incluye impacto i18n/SEO si lo hay) · **3.** Modelo de datos y contratos · **4.** Plan ordenado · **5.** Criterios de aceptación · **6.** Decisiones tomadas y descartadas.

## Índice

| ID | Spec | Estado | Notas |
|---|---|---|---|
| 001 | [i18n y routing bilingüe](./001-i18n-and-routing/spec.md) | hecha (as-built) | EN raíz / ES `/es/`, catch-all `[...lang]`, `useTranslations` sin fallback, selector, 404 |
| 002 | [SEO y datos estructurados](./002-seo-and-structured-data/spec.md) | hecha (as-built) | `SeoHead`, canonical/hreflang, JSON-LD ×7, sitemap con prioridades, `llms.txt` |
| 003 | [Leads de clientes](./003-client-leads/spec.md) | hecha (as-built) | Form → `POST /api/submit-clients` → Supabase `leads_clients` + Resend; reCAPTCHA v3 — con deudas de seguridad |
| 004 | [Catálogo de proyectos y casos de estudio](./004-projects-catalog/spec.md) | reemplazada por 008 | Catálogo por categorías (`projects.ts`, `Works`, `/projects/{categoría}/{slug}/`, 8 placeholders) — código retirado el 2026-09-05; queda como registro |
| 005 | [Analítica y consentimiento](./005-analytics-and-consent/spec.md) | hecha (as-built) | Banner → `localStorage`, Clarity + Vercel Analytics bajo consentimiento, eventos `data-analytics-event` |
| 006 | [Infra y deploy](./006-infra-and-deploy/spec.md) | hecha (as-built) | Vercel adapter, páginas prerender + API serverless, envs, Supabase CLI, residuos de GitHub Pages |
| 007 | [Landings de servicio](./007-service-landings/spec.md) | hecha (as-built) | `ServiceLanding` ×3 (`ux-ui-design`, `frontend-dev`, `visual-artist`), claves `servicePages.*`, indexables |
| 008 | [Proyectos destacados con narrativa de proceso](./008-featured-projects/spec.md) | hecha (copy provisional) | `src/lib/featured.ts` (4 marcas × 5 etapas, overrides ES, imágenes por marca en `<slug>-brand/`), `FeaturedProjects` fullscreen con scroll horizontal (GSAP pin), `ProjectGallery`, `/projects/{slug}/`, `/projects/` solo destacados; reemplaza a 004 |

> **as-built**: escritas retroactivamente documentando lo que existe, verificadas contra el código el 2026-08-22. Son la línea base — los cambios futuros de esas áreas las enmiendan.

Próxima ola (número al escribirlas): `projects-cleanup`, `leads-hardening`, `quality-tooling`, `privacy-and-analytics-disclosure` — ver candidatas en `docs/pending.md`.
