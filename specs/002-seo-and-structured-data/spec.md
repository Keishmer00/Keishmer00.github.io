# Spec 002 — SEO y datos estructurados

`Estado: hecha (as-built, verificada contra código 2026-08-22)` · `Autor: Keishmer + IA` · `Fecha: 2026-08-22` · `Relacionadas: 001 (rutas/hreflang), 004 (ItemList/CreativeWork), 006 (dominio), 007 (landings)`

## 1. Objetivo (una frase)

Que cada URL del sitio, en los dos idiomas, salga a buscadores y motores de respuesta con IA con metadatos correctos, canonical/hreflang coherentes, datos estructurados que identifiquen a Keishmer y a su estudio, y un sitemap y `llms.txt` mantenidos sin trabajo manual.

## 2. Alcance

**Entra:** `SeoHead.astro` (meta, canonical, hreflang, Open Graph, JSON-LD de página), los JSON-LD que emiten `Breadcrumbs`, `/projects/` y el detalle de caso, la integración de sitemap, `robots.txt`, `llms.txt` (EN/ES), favicons y manifest.
**No entra:** el copy de los títulos/descripciones (claves `seo.*` — spec 001); el contenido de los casos (spec 004); la analítica (spec 005).

## 3. Modelo de datos y contratos

**`SeoHead.astro`** (montado por `Layout`): props `{ lang, page, pathname, title?, description? }` con `page ∈ { home, about-me, uxui, frontend, visualArtist, projects, contact, terms, privacy, error }` (misma unión que `Layout`). Resuelve `seoKey` (`home`→`home`, `about-me`→`aboutMe`, resto igual) y lee `seo.<seoKey>.title|description` salvo que lleguen props (el detalle de caso pasa `work.seoTitle`/`work.seoDescription`).

- **Canonical:** `https://keishmerstudio.com` + `normalizePath(pathname)` (colapsa `//` y **fuerza barra final**). **Hreflang:** `en`, `es` y `x-default` (= EN) a partir de `getAlternatePaths(pathname)`, siempre sobre producción.
- **Meta:** `description`, `author` (`site.author`), `theme-color #121314`, `apple-mobile-web-app-status-bar-style`, `robots` = `noindex` solo si `page === "error"`, `index, follow` en el resto.
- **Open Graph:** `og:title`, `og:description`, `og:image` = `/og-image.png` (1200×630, `og:image:alt` = descripción), `og:site_name` (`site.title`), `og:type website`, `og:url` = canonical, `og:locale` `en_US`/`es_ES`. No hay Twitter cards.
- **JSON-LD por página:** `Person` (`@id https://keishmerstudio.com/#person`; nombre, `jobTitle` traducido, `sameAs` LinkedIn/GitHub/Instagram, email, `knowsAbout` desde `tArray("jsonld.knowsAbout")`, `homeLocation`/`address` Cúcuta – Norte de Santander – CO, `worksFor` Move On Tech Service, `alumniOf` UNIR y Universidad de Pamplona) en `home` y `about-me`; `ProfessionalService` (`@id #service`, Keishmer Studio, `areaServed`, `availableLanguage` EN/ES, `serviceType` UX/UI · Frontend · Branding · Design Systems · Visual Art, `provider → #person`) solo en `home`; `WebSite` y `WebPage` (`isPartOf`) en todas.

**Otros JSON-LD:** `atoms/Breadcrumbs.astro` emite `BreadcrumbList` (URL absoluta en los items con `href`); `/projects/` emite `ItemList` con todos los casos de todas las categorías (URL + imagen); `/projects/[category]/[slug]/` emite `CreativeWork` (`author`/`provider → #person`, `dateCreated` = año).

**Sitemap** (`astro.config.mjs`, `@astrojs/sitemap`): i18n `defaultLocale en` + `es`; `changefreq`/`priority` por URL vía `serialize`: home EN/ES `1.0 weekly`, `/contact/` `0.9 monthly`, `/projects/*` `0.8 monthly`, resto `0.7 monthly`; `lastmod = new Date()` (fecha del build para todas). Salida `sitemap-index.xml`, enlazada desde `Layout` (`<link rel="sitemap">`) y desde `public/robots.txt` (`Allow: /` para todos).

**`llms.txt`:** `public/llms.txt` (EN) y `public/es/llms.txt` (ES) — resumen del perfil, servicios, stack, perfiles y contacto con enlaces absolutos. Estáticos, se editan a mano.

**Favicons/manifest:** `public/favicon/*` + `site.webmanifest`, enlazados desde `Layout`.

## 4. Plan (resumen as-built)

1. `SeoHead` con claves `seo.*` por página, canonical normalizado y hreflang desde los helpers de i18n.
2. Open Graph con imagen única del sitio.
3. JSON-LD `Person`/`ProfessionalService`/`WebSite`/`WebPage` según página; `BreadcrumbList`, `ItemList` y `CreativeWork` en sus componentes.
4. Sitemap con i18n y prioridades; `robots.txt`; `llms.txt` por idioma.

## 5. Criterios de aceptación (as-built)

- [x] Toda página emite un único canonical con barra final y los tres hreflang apuntando a `keishmerstudio.com` — comprobación manual del HTML generado en `/`, `/es/`, `/projects/…`.
- [x] `noindex` solo en el 404; el resto `index, follow`.
- [x] Home: `Person` + `ProfessionalService` + `WebSite` + `WebPage` + `BreadcrumbList` donde hay migas; `/projects/`: `ItemList`; detalle: `CreativeWork` — validable en el Rich Results Test.
- [x] `sitemap-index.xml` lista las URLs de los dos idiomas con las prioridades definidas; `robots.txt` lo referencia.
- [x] `/llms.txt` y `/es/llms.txt` responden 200 con el contenido por idioma.
- [ ] **Deudas as-built:** (a) el sitemap y el `ItemList` incluyen las 16 URLs de los casos placeholder con marca "Ruana Soul Studio" (spec 004 / pending #3); (b) `lastmod` es la fecha de cada build, no la del cambio real; (c) `PUBLIC_GOOGLE_SITE_VERIFICATION` existe en `.env` pero no se emite ningún `<meta name="google-site-verification">` (pending #5.3); (d) la política de privacidad no nombra a los proveedores de analítica (pending #5.1).

## 6. Decisiones

**Tomadas:** un único `SeoHead` dentro de `Layout` — una sola fuente de metadatos; ninguna página escribe `<title>` por su cuenta. Canonical con barra final — Vercel sirve `/x` y `/x/` igual; fijar una evita duplicados. `x-default` → inglés — coincide con el idioma sin prefijo. `Person` con `@id` estable — `CreativeWork` y `ProfessionalService` lo referencian sin duplicar datos; el `jobTitle` y `knowsAbout` salen traducidos del locale activo. Sitemap por integración, no a mano — las páginas nuevas entran solas; las prioridades se ajustan en un solo sitio. `llms.txt` estático por idioma — contenido curado para motores de respuesta, sin coste de runtime.

**Descartadas:** `noindex` en las páginas de servicio — lo tenían cuando eran placeholders "Próximamente"; hoy son landings completas (spec 007) y deben indexar. Twitter cards — Open Graph cubre las previsualizaciones que importan. Sitemap manual en `public/` — se desincroniza con el catálogo.
