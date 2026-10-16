# Spec 001 — i18n y routing bilingüe

`Estado: hecha (as-built, verificada contra código 2026-08-22)` · `Autor: Keishmer + IA` · `Fecha: 2026-08-22` · `Relacionadas: 002 (hreflang/sitemap), 004 (overrides ES de proyectos), 007 (landings)`

## 1. Objetivo (una frase)

Servir todo el sitio en inglés (raíz) y español (`/es/`) como páginas estáticas pre-renderizadas, con un sistema de traducciones propio y un selector que lleva siempre a la URL equivalente del otro idioma.

## 2. Alcance

**Entra:** el tipo `Lang`, los JSON de traducción, `useTranslations` (`t`/`tArray`), los helpers de rutas, el patrón `[...lang]` + `getStaticPaths`, el selector de idioma y la resolución de idioma del 404.
**No entra:** los textos de los casos de estudio (viven en `src/lib/projects.ts` con sus propios overrides — spec 004); canonical/hreflang/sitemap (spec 002, que consume `getAlternatePaths`).

## 3. Modelo de datos y contratos

**Idiomas** (`src/i18n/index.ts`): `type Lang = "en" | "es"`. `en` es base y vive en la raíz (`/`, `/projects/`…); `es` vive bajo `/es/` (`/es/`, `/es/projects/`…). No hay RTL ni más idiomas previstos.

**Traducciones** (`src/i18n/en.json`, `src/i18n/es.json`): JSON anidado con 27 grupos de primer nivel (`site`, `nav`, `hero`, `about`, `serviceBanner`, `aboutMe`, `trust`, `idealClients`, `selectedWork`, `process`, `faq`, `finalCta`, `consent`, `seo`, `strategic`, `works`, `projects`, `projectCta`, `contact`, `form`, `terms`, `privacy`, `servicePages`, `subpages`, `error`, `footer`, `jsonld`) y **343 claves hoja cada uno** (paridad 343/343 verificada por script el 2026-08-22). Valores: string o array de strings.

**`useTranslations(lang)`** → `{ t, tArray, lang, alternateLang }`:
- `t("a.b.c")` recorre la clave punteada sobre el diccionario del idioma; si algún tramo falta o el valor final no es string, **devuelve la clave literal**. No hay fallback a EN ni interpolación de parámetros.
- `tArray("a.b")` devuelve el array o `[]` si falta / no es array.
- `alternateLang` es el otro idioma.

**Patrón de uso:** las páginas leen `const { lang = "en" } = Astro.params as { lang?: Lang }` y cada componente recibe `lang` por props y obtiene su propio `t` (`const { t } = useTranslations(lang)`). No se pasa `t` por props.

**Rutas** (`src/pages/[...lang]/*.astro`): cada página exporta `prerender = true` y `getStaticPaths()` → `[{ params: { lang: undefined } }, { params: { lang: "es" } }]`; el detalle de proyecto multiplica esas dos entradas por el catálogo (spec 004). Helpers: `getLangFromUrl(url)` (segmento `es` → `"es"`, resto `"en"`), `getLocalizedPath(path, lang)` (antepone `/es/` y quita la barra inicial duplicada), `getAlternatePaths(pathname)` → `{ en, es }` (detecta `/es/` o `/es` y calcula el par). `Navbar` y `Footer` usan además un helper local `localizedPath` equivalente.

**Selector** (`LanguageSwitcher.astro`): recibe `{ lang, pathname }`, calcula `en: pathname.replace(/^\/es(\/|$)/, "/")` y `es: pathname === "/" ? "/es/" : "/es" + pathname`, y renderiza un único `<a hreflang={otro}>` con los chips EN/ES (el activo resaltado); emite `data-analytics-event="language_switch"` (spec 005).

**Idioma automático (enmienda 2026-10-16):** script inline en el `<head>` de `Layout` (tras `SeoHead`). Al **entrar** al sitio (referrer vacío o de otro origen), una vez por sesión (`sessionStorage["keishmer-lang-auto"]`), decide el idioma preferido = `localStorage["keishmer-lang"]` (lo guarda el `LanguageSwitcher` al hacer clic, `data-lang-switch`) o, si no hay, el primer `navigator.languages` que empiece por `es`/`en` (otro idioma → `en`, como `x-default`). Si no coincide con la página, `location.replace` a la URL equivalente leída del `<link rel="alternate" hreflang>`, conservando query y hash. No actúa en navegación interna, en el 404 (`page="error"`) ni con user-agents de bots/crawlers/Lighthouse/headless, así que Google sigue viendo cada URL tal cual (canonical + hreflang intactos).

**Documento:** `Layout.astro` pone `<html lang="en"|"es">` y `SeoHead` deriva `og:locale` e `inLanguage` del mismo `lang`.

**404** (`src/pages/404.astro`, global, fuera de `[...lang]`): `lang = pathname.startsWith("/es/") ? "es" : "en"`, `Astro.response.status = 404`, textos `error.*`, botón a `/` o `/es/`. En Vercel, toda ruta no generada cae a esta página (`status: 404` en la config de salida — spec 006).

## 4. Plan (resumen as-built)

1. `Lang` + JSON por idioma + `useTranslations` con `t`/`tArray` sin fallback.
2. Helpers de rutas (`getLangFromUrl`, `getLocalizedPath`, `getAlternatePaths`).
3. Páginas bajo `[...lang]` con `getStaticPaths` de dos entradas y `prerender = true`; `pathname` canónico con barra final pasado a `Layout`/`Navbar`/`Footer` y migas con `href` localizados.
4. `LanguageSwitcher` en el navbar; `Layout` aplica `lang` al `<html>`.
5. 404 global con idioma por prefijo.

## 5. Criterios de aceptación (as-built)

- [x] `pnpm build` genera cada página en las dos URLs (`/x/` y `/es/x/`) y `<html lang>` coincide con el idioma — verificación: árbol de `.vercel/output/static` tras el build.
- [x] El selector lleva a la URL equivalente conservando la ruta (`/projects/` ↔ `/es/projects/`, `/` ↔ `/es/`) — comprobación manual en navbar.
- [x] Una URL inexistente bajo `/es/` muestra el 404 en español y fuera de `/es/` en inglés, con HTTP 404 — comprobación manual.
- [x] Paridad de claves EN/ES: 343/343 — verificada por script el 2026-08-22; cuando haya tooling de tests, convertir en test permanente (pending #4).
- [ ] Sin textos visibles quemados — **deuda as-built**: el script de `Form.astro` ("Sending...", mensaje de error, etiqueta del botón por idioma), `aria-label` de `Breadcrumbs` ("Breadcrumb"), `Works` ("Work categories") y `LanguageSwitcher`, y el `alt` de la galería del detalle ("Gallery image N"). Se corrigen en `leads-hardening` / limpieza (pending #2.3).

## 6. Decisiones

**Tomadas:** EN en la raíz y ES con prefijo (catch-all `[...lang]`) — URLs limpias para el idioma principal del mercado objetivo y una sola plantilla por página. ~~Sin detección automática de idioma~~ → **Detección en el cliente al entrar al sitio** (2026-10-16, pedido del dueño): se hace en el navegador para no romper el prerender ni necesitar middleware; cada URL sigue siendo canónica e indexable porque los bots no se redirigen, y la elección manual del selector siempre gana. `t` sin fallback a EN — una clave olvidada en ES se ve en desarrollo en vez de esconderse en inglés. Sistema propio en vez de `astro:i18n` — control sobre `tArray`, la unión `Lang` y los helpers de rutas, sin configuración de routing del framework. Cada componente llama `useTranslations(lang)` — componentes autocontenidos con una sola prop; el coste (crear el closure por componente) es despreciable en build.

**Descartadas:** redirección por `Accept-Language` o geo-IP en servidor/middleware — rompería el prerender y la URL raíz dejaría de ser estable para SEO (se usa la detección en cliente descrita arriba). Fallback a EN en `t` — oculta traducciones faltantes; si se adopta, debe venir con un test de paridad que lo compense. Pasar `t` por props (patrón de `wise-website`) — el repo ya tiene 20+ componentes con `lang`; cambiarlo sería un refactor sin ganancia funcional.
