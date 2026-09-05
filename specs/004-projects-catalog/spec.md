# Spec 004 — Catálogo de proyectos y casos de estudio

`Estado: reemplazada por 008 (código retirado el 2026-09-05)` · `Autor: Keishmer + IA` · `Fecha: 2026-08-22` · `Relacionadas: 001 (rutas ES), 002 (ItemList/CreativeWork/sitemap), 005 (eventos de CTA), 008 (destacados — sustituye a `Works` y al listado de `/projects/`)`

> **Reemplazada el 2026-09-05 por la spec 008.** Primero la home dejó de montar `Works.astro` y `/projects/` dejó de listar por categorías; después, al reorganizar `src/assets/images/` por marca (`<slug>-brand/`), desaparecieron las imágenes de este catálogo y el owner decidió retirarlo del todo: se borraron `src/lib/projects.ts`, `Works.astro`, `ProjectsCatalog.astro`, `SelectedWork.astro`, la página `/projects/[category]/[slug].astro` (32 URLs, incluidos los 16 placeholders ficticios — cierra pending #3) y las claves `works.*`, `selectedWork.*` y `projects.overview|challenge|solution|outcome`. Las URLs viejas caen a 404 (sin redirecciones, por decisión del owner). Este documento queda como registro histórico de lo que existió.

## 1. Objetivo (una frase)

Mostrar los trabajos de Keishmer por categoría — en la home, en el listado y en una página de caso de estudio por proyecto y por idioma — desde una única fuente de datos tipada, sin CMS.

## 2. Alcance

**Entra:** `src/lib/projects.ts` (tipos, datos base EN, overrides ES, helpers), `Works.astro` (tabs de la home), `/projects/` (listado) y `/projects/[category]/[slug]/` (detalle), con sus JSON-LD y animaciones.
**No entra:** las claves `projects.*` / `projectCta.*` / `works.*` de la UI (spec 001 — etiquetas "Cliente", "Servicios", "El Desafío", CTA…); `SelectedWork.astro` (existe, no está montado — pending #6.1).

**Impacto i18n:** ninguno en los JSON — el contenido de los casos vive en `projects.ts`. **SEO:** cada caso tiene `seoTitle`/`seoDescription` propios y entra al sitemap y al `ItemList` (spec 002).

## 3. Modelo de datos y contratos

**Tipos** (`projects.ts`):

```ts
WorkCategory { id, label, statement, categoryDescription, works: WorkItem[] }
WorkItem { id, title, tagline, description, challenge, solution, outcome, client, year,
           services: string[], image, imageAlt, gallery: string[], ctaLabel, seoTitle, seoDescription }
```

`image`/`gallery` son imports de `src/assets/images/**` (resueltos a `/_astro/*.webp` en build) o URLs absolutas.

**Datos:** `baseCategories` (inglés) es la fuente; `getCategories("es")` devuelve una copia con `applySpanishOverrides`, que sustituye por `id` desde los mapas `esLabels`, `esStatements`, `esProjectTitles`, `esTaglines`, `esCtaLabels` (por valor: `"View details"` → `"Ver detalles"`), `esDescriptions`, `esChallenges`, `esSolutions`, `esOutcomes`, `esSeoTitles`, `esSeoDescriptions`, `esImageAlts`, `esServices`. **Sin override, la pieza sale en inglés en `/es/`.** `categoryDescription` no se renderiza en ninguna página hoy.

**Catálogo actual (4 categorías, 16 casos):**

| Categoría (`id` · label EN / ES) | Casos reales | Placeholders de plantilla ⚠️ |
|---|---|---|
| `branding` · Branding / Branding | `karim`, `nexus-platform`, `mo-tech-service`, `ruanasoulstudio` | — |
| `web-dev` · Web Dev / Desarrollo Web | `ruana-studio`, `karim-ventas`, `wisegold-capital`, `didier-perez` | — |
| `ux-ui` · UX/UI / UX/UI | — | `fashion-drop`, `cafe-stories`, `fitness-series`, `wedding-reel` |
| `audiovisual` · Art Works / Obras Artísticas | — | `wedding-film`, `brand-spot`, `event-recap`, `product-bts` |

Los 8 placeholders vienen de la plantilla original de Ruana Soul Studio: clientes ficticios, imágenes de Unsplash y `seoTitle` terminado en "| Ruana Soul Studio" (pending #3).

**Helpers:** `allCategories` (base EN, para `getStaticPaths`), `getCategories(lang)`, `getProjectUrl(categoryId, workId, lang)` → `/projects/{cat}/{slug}` (con `/es` delante si aplica; sin barra final — la normaliza `SeoHead`), `findProject(category, slug, lang)` → `{ category, work } | null`.

**Páginas y componentes:**

- `Works.astro` (**sin montar desde 008**; home, `<works-section>`): título `works.title`, un `statement` por categoría (solo visible el activo), **tablist WAI-ARIA** (`role="tab"`, flechas/Home/End, `aria-selected`, `tabindex` rotativo) y un `tabpanel` por categoría con sus tarjetas (imagen en escala de grises, título, `tagline`, CTA → detalle). Bajo `lg` el grid es carrusel horizontal con `snap`. GSAP: entrada scrubbed con `ScrollTrigger` (`matchMedia` para `prefers-reduced-motion`), transición al cambiar de tab, precarga de imágenes de paneles ocultos al acercarse (`IntersectionObserver`, 400 px), limpieza en `disconnectedCallback`.
- `/projects/` (**desde 008 lista solo los destacados**; el listado por categorías vive en `ProjectsCatalog.astro`, `<projects-catalog>`, sin montar): secciones por categoría (`label`, `statement`, grid de 4 columnas en `lg`) + JSON-LD `ItemList` de todos los casos; entrada GSAP por sección salvo `prefers-reduced-motion`.
- `/projects/[category]/[slug]/`: `getStaticPaths` = {EN, ES} × categorías × casos (hoy 32 páginas); `findProject` nulo → `Astro.redirect` a `/404` (defensivo: en prerender nunca ocurre). Hero (imagen + categoría — año + título), aside (cliente, servicios, sitio web si `projectUrls[work.id]` — mapa quemado en la página con las 4 URLs externas de `ruana-studio`, `karim-ventas`, `wisegold-capital`, `didier-perez`), artículo (resumen, desafío, solución, resultado), galería (primera imagen a ancho completo), CTA a `/contact/` (`cta_case_study_click`, label = `work.id`), JSON-LD `CreativeWork`, animaciones GSAP/ScrollTrigger.

## 4. Plan (resumen as-built)

1. Tipos + datos base EN en `projects.ts`, imágenes importadas desde `src/assets/images/`.
2. Mapas de overrides ES y `getCategories(lang)`.
3. `Works.astro` con tabs accesibles y GSAP; `/projects/` con listado y `ItemList`.
4. Detalle por `[category]/[slug]` con `getStaticPaths` completo, `CreativeWork` y CTA.

## 5. Criterios de aceptación (as-built)

- [x] Cada caso del catálogo genera `/projects/{cat}/{slug}/` y `/es/projects/{cat}/{slug}/` en el build, con título, descripción y SEO del idioma — comprobación en `.vercel/output/static`.
- [x] En la home, las tabs cambian de categoría con ratón y teclado, anuncian `aria-selected` y el panel oculto no queda en el orden de tabulación.
- [x] Un caso con todos sus overrides sale 100 % en español en `/es/`; uno sin override muestra esa pieza en inglés (comportamiento documentado, no bug).
- [x] Con `prefers-reduced-motion`, no hay animaciones de entrada ni de cambio de tab.
- [ ] **Deuda as-built** (pending #3): los 8 placeholders generan 16 URLs indexables con contenido ficticio y marca ajena (sitemap + `ItemList` incluidos); `categoryDescription` de las 4 categorías y un comentario del tipo mencionan "Ruana Soul Studio"; `ux-ui` tiene un `statement` de social media y `audiovisual` se etiqueta "Art Works". Cierra con la spec `projects-cleanup`.
- [ ] **Deuda menor:** `projectUrls` quemado en `[slug].astro` en vez de un campo `url` de `WorkItem` (pending #3.3); `ruana-brand/1–5.png` pesan 6–24 MB cada uno (pending #8.4).

## 6. Decisiones

**Tomadas:** un único módulo TypeScript como fuente de los casos — tipado, sin CMS ni colecciones de contenido, y las imágenes pasan por el pipeline de Vite al importarse. Overrides ES por mapa y no un árbol duplicado — añadir un caso es una entrada base + sus overrides, y el inglés nunca se desincroniza de los `id`. Tabs accesibles renderizadas en HTML (todos los paneles en el DOM) — sin estado en JS para el contenido, SEO y sin parpadeo; JS solo conmuta `hidden`. `getStaticPaths` derivado de `allCategories` — cada caso nuevo obtiene sus dos URLs sin tocar la página.

**Descartadas:** colecciones de contenido de Astro (Markdown por caso) — el catálogo es pequeño y con campos fijos; el módulo TS da tipado y overrides sin frontmatter duplicado. Cargar los casos desde Supabase — contenido editorial que cambia con deploy, no con datos; no justifica runtime. Una página por categoría — el listado único con anclas por categoría basta para 4 categorías.
