# Spec 007 — Landings de servicio

`Estado: hecha (as-built, verificada contra código 2026-08-22)` · `Autor: Keishmer + IA` · `Fecha: 2026-08-22` · `Relacionadas: 001 (rutas), 002 (SEO), 005 (eventos de CTA)`

## 1. Objetivo (una frase)

Aterrizar las búsquedas de cada servicio — diseño UX/UI, desarrollo frontend y arte visual — en una página propia por idioma que explique a quién sirve, qué entrega y cómo empezar, sin duplicar plantilla.

## 2. Alcance

**Entra:** `ServiceLanding.astro`, las tres páginas que lo instancian (`ux-ui-design.astro`, `frontend-dev.astro`, `visual-artist.astro`), sus claves `servicePages.*` y `seo.*`, y sus CTAs medidos.
**No entra:** la banda de servicios de la home (`ServiceBanner.astro`, lista `serviceBanner.items`); el grupo `subpages.*` de los antiguos placeholders "Próximamente" (huérfano — pending #6.2).

**Impacto i18n:** grupo `servicePages.{uxui|frontend|visual}` (17 claves cada uno) y `seo.{uxui|frontend|visualArtist}` en ambos locales. **SEO:** tres URLs indexables por idioma, prioridad 0.7 en el sitemap.

## 3. Modelo de datos y contratos

**Páginas** (`src/pages/[...lang]/`): cada una exporta el `getStaticPaths` estándar y renderiza `<ServiceLanding lang={lang} service="uxui" | "frontend" | "visual" />`.

**`ServiceLanding.astro`** — props `{ lang, service }`. Deriva:

| `service` | slug / URL | `page` (SEO) | grupo i18n |
|---|---|---|---|
| `uxui` | `/ux-ui-design/` · `/es/ux-ui-design/` | `uxui` | `servicePages.uxui` |
| `frontend` | `/frontend-dev/` · `/es/frontend-dev/` | `frontend` | `servicePages.frontend` |
| `visual` | `/visual-artist/` · `/es/visual-artist/` | `visualArtist` | `servicePages.visual` |

Estructura (dentro de `Layout` + `Navbar` + `Breadcrumbs` [Inicio › `breadcrumb`] + `Footer`): `eyebrow` → `h1` `title` → `description` → CTA primario a `getLocalizedPath("/contact/")` (`data-analytics-event="cta_service_primary_click"`, label = `service`) → sección doble `audienceTitle`/`audience` y `deliverablesTitle`/`deliverables[]` (`tArray`) → tres pasos `oneTitle/oneText`, `twoTitle/twoText`, `threeTitle/threeText` → cierre `closingTitle`/`closingText` con CTA final (`cta_service_final_click`). Claves consumidas: `breadcrumb`, `eyebrow`, `title`, `description`, `cta`, `audienceTitle`, `audience`, `deliverablesTitle`, `deliverables`, `{one,two,three}Title`, `{one,two,three}Text`, `closingTitle`, `closingText`.

**SEO:** `SeoHead` con `seo.<page>.title|description`; `robots` = `index, follow` (el `noindex` de la etapa placeholder ya no existe — el `AGENTS.md` anterior estaba desactualizado).

## 4. Plan (resumen as-built)

1. Componente plantilla con mapa `service → slug/page/grupo`.
2. Tres páginas finas bajo `[...lang]` que lo instancian.
3. Claves `servicePages.*` y `seo.*` en EN y ES; enlaces desde `Navbar` y `Footer`.
4. CTAs hacia contacto con eventos etiquetados por servicio.

## 5. Criterios de aceptación (as-built)

- [x] Las seis URLs (3 servicios × 2 idiomas) se generan en el build con su `h1`, descripción y SEO propios — comprobación en `.vercel/output/static`.
- [x] Cada landing tiene exactamente dos CTAs a `/contact/` (o `/es/contact/`) medidos con el `service` como label.
- [x] `deliverables` renderiza una lista por `tArray` (si falta la clave, lista vacía, sin romper el build).
- [x] Ninguna landing lleva `noindex`; las tres aparecen en el sitemap.

## 6. Decisiones

**Tomadas:** una plantilla y tres páginas de dos líneas — la estructura es idéntica; solo cambian los textos, que viven en i18n. Claves agrupadas por servicio (`servicePages.<service>.*`) con nombres de campo iguales — añadir un cuarto servicio es un grupo nuevo + una página de dos líneas + una fila en el mapa. Mismo slug en los dos idiomas (`/es/ux-ui-design/`) — simplifica `getAlternatePaths` y los hreflang; el SEO en español lo aportan título, descripción y contenido.

**Descartadas:** slugs traducidos (`/es/diseno-ux-ui/`) — exigiría un mapa de equivalencias en los helpers de rutas y en el selector de idioma para una ganancia marginal. Mantener las landings como placeholders con `noindex` — se sustituyeron por contenido completo para captar búsquedas de servicio.
