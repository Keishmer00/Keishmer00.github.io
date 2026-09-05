# Keishmer Studio — Reglas del proyecto

> **No negociables** para todo colaborador, humano o IA. Si una regla debe cambiar, se cambia aquí por commit.
> Versión resumida en [AGENTS.md](../AGENTS.md). Mismo espíritu que `wise-website/docs/rules.md`.

## 1. Idioma y contenido

1. **Todo texto visible va por claves i18n** — nunca strings quemados en páginas o componentes. Patrón del repo: cada componente recibe `lang` por props y hace `const { t, tArray } = useTranslations(lang)` (de `src/i18n/index.ts`); las listas se leen con `tArray`. Deuda as-built registrada (textos del script de `Form.astro`, `aria-label` de `Breadcrumbs`/`LanguageSwitcher`): no se amplía.
2. **Paridad de 2 locales con EN como base**: toda clave se añade/renombra/elimina en `src/i18n/en.json` **y** `src/i18n/es.json` en el mismo cambio, misma ruta anidada. **No hay fallback**: `t` devuelve la clave literal si falta en el locale activo, así que una clave ausente en cualquiera de los dos es un bug visible. Skill `.agents/skills/add-translations/`.
3. **Los casos de estudio no son claves i18n**: los proyectos destacados viven en `src/lib/featured.ts` (base en inglés `baseFeatured` y español en `esFeatured[id]`, incluidas las 5 etapas). Un proyecto nuevo lleva su entrada base **y** todos sus overrides ES (título, descripción, intro, cierre, etapas, sector, SEO, alt, servicios) en el mismo cambio, y sus imágenes en `src/assets/images/<slug>-brand/` importadas como `ImageMetadata` (medidas en [images.md](./images.md)). Las etiquetas de etapa (`featured.stages.*`) sí son claves i18n.
4. **Nombre y firma**: la marca pública es **Keishmer Studio**; el autor es **Keishmer Pérez Torres**. No se introducen otros nombres de estudio en contenido visible ni en SEO (los residuos "Ruana Soul Studio" de la plantilla original son deuda — [pending.md](./pending.md)).
5. Comentarios de código: español permitido. Docs internos: español. **Commits: inglés.**

## 2. Rutas y renderizado

1. Las páginas viven en `src/pages/[...lang]/…` con `export function getStaticPaths()` que devuelve exactamente `[{ params: { lang: undefined } }, { params: { lang: "es" } }]` y `export const prerender = true`. La única excepción global es `src/pages/404.astro`.
2. Solo los endpoints (`src/pages/[...lang]/api/*.ts`) llevan `export const prerender = false`. No se crean páginas SSR sin spec.
3. Toda página construye su `pathname` canónico **con barra final** (`/about-me/`, `/es/about-me/`) y lo pasa a `Layout`, `Navbar` y `Footer` (las migas de `Breadcrumbs` reciben sus `items` con `href` ya localizados). Los enlaces internos se generan con `getLocalizedPath(path, lang)` o el helper local `localizedPath` — nunca con `/es` quemado en un componente.
4. Página nueva = valor nuevo en la unión `page` de `Layout.astro` **y** `SeoHead.astro` + grupo `seo.<key>` (`title`, `description`) en ambos locales + enlace en `Navbar`/`Footer` si es navegable. El sitemap la recoge solo; ajustar la prioridad en `astro.config.mjs` si aplica.
5. **SEO**: canonical, hreflang y Open Graph los pone exclusivamente `SeoHead.astro`. `noindex` solo en la página de error. Ninguna URL indexable puede servir contenido ficticio o de terceros.

## 3. Datos, API y secretos

1. **Supabase solo desde el servidor**, con el cliente creado en el endpoint a partir de `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`. Nunca se expone una clave de Supabase al navegador (no hay `PUBLIC_SUPABASE_*`). RLS activa en toda tabla; políticas solo para `service_role`.
2. Cambios de schema **solo por migración** en `supabase/migrations/` (SQL idempotente: `if not exists`, `drop constraint if exists`…). Nunca se edita la tabla a mano desde el dashboard sin dejar la migración en el repo.
3. Todo endpoint público **valida y recorta su entrada** (tipos, longitudes, enumeraciones, email), **verifica reCAPTCHA v3** antes de escribir (score ≥ 0.5, `action` esperada, hostname permitido) y aplica rate limit. Patrón: `submit-clients.ts`.
4. **Secretos jamás en código ni en archivos versionados** — van en `.env` local (gitignorado) y en las variables del proyecto de Vercel. Solo los valores realmente públicos usan el prefijo `PUBLIC_` (site key de reCAPTCHA). Deuda registrada en [pending.md](./pending.md): el `.env` estuvo en el historial de git (jul 2026) y sus claves deben rotarse.
5. El correo de notificación es **aviso, no registro**: la fuente de verdad del lead es la tabla; un fallo de Resend nunca hace fallar el envío del visitante.
6. Sin `console.log` de depuración en endpoints que llegan a producción (los `console.warn/error` operativos sí). La respuesta de un endpoint nunca expone detalles internos de validación (deuda as-built en [spec 003](../specs/003-client-leads/spec.md)).

## 4. Estilo, assets e interactividad

1. Tailwind v4 con el tema de `src/styles/global.css` (`:root` + `@theme`): fuentes `font-unbounded` / `font-albert` / `font-mono` y colores por nombre (`primary`, `gray-*`, `white`, `black`) — no hex sueltos repetidos. Gradientes con sintaxis v4 (`bg-linear-to-r`).
2. **Sin frameworks de UI**: Astro + vanilla JS. La interactividad se encapsula en custom elements (`featured-projects`, `featured-case-study`, `projects-page`) o en `<script>` del componente, con `prefers-reduced-motion` respetado (`gsap.matchMedia`) y limpieza en `disconnectedCallback` cuando hay listeners. Si un ScrollTrigger hace **pin**, fija un hijo del custom element, nunca el custom element (el pin-spacer lo re-parenta y dispara `disconnectedCallback`).
3. Animaciones con GSAP (+ ScrollTrigger / `matchMedia`) siguiendo los patrones de `FeaturedProjects.astro` (pin + scrub + snap, `containerAnimation`) y `projects/[slug].astro`; los efectos de canvas/WebGL existentes (`BlackHoleBG`, `CursorParticles`, `MeshText`) se reutilizan, no se duplican. `html`/`body` llevan `overflow-x: clip` (no `hidden`): la ventana debe seguir siendo el scroller o ningún ScrollTrigger funciona.
4. Imágenes **importadas desde `src/assets/`** como hace Astro (`import img from "…"` → `ImageMetadata` con `src`, `width`, `height`; los `<img>` llevan `width`/`height` del import), exportadas a tamaño final en webp (medidas en [images.md](./images.md)); un binario nuevo > ~1 MB requiere justificación (pesa en el repo y en el build). Ninguna imagen remota de stock en contenido real.
5. Accesibilidad mínima: `alt` en toda imagen, `aria-*` en controles interactivos (región con `aria-label` y fallback nativo de `FeaturedProjects.astro`, tabindex rotatorio de `ProjectGallery.astro`), foco visible.

## 5. Calidad

1. **`pnpm build` en verde antes de pushear** (compila con el adapter de Vercel y genera las rutas estáticas de los dos idiomas).
2. No hay `pnpm check`, linter ni tests todavía: **no asumas que existen**. Cuando haya tooling, la paridad EN/ES y la validación del endpoint serán los primeros tests (candidatas en [pending.md](./pending.md)). Mientras tanto, la spec del área es el contrato.
3. Todo cambio de UI se revisa en **EN y ES** y en móvil (la home y el footer usan `h-svh`; los proyectos tienen carrusel horizontal bajo `lg`).

## 6. Proceso (SDD simplificado — 1 dev + IA)

1. **Spec primero, sin burocracia**: cambios de comportamiento, contrato, datos o SEO parten de una spec corta en `specs/` (plantilla `specs/_template/`, media página basta). Lo cosmético va directo. Estados: `en curso` → `hecha` (→ `reemplazada`). Sin gate de aprobación.
2. Si la implementación se desvía, **la spec se actualiza en el mismo commit**.
3. **Commits: atómicos, en inglés, Conventional Commits** (`feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `perf` con scope; referencia `Spec: NNN` cuando aplique). Sin push automático. Skill `commit-changes`. Esta regla aplica **desde ahora** — el historial viejo no la cumple y no se reescribe.
4. **Commit directo a `main`** (rama canónica). No usamos pull requests.
5. Instrucciones de IA centralizadas: `AGENTS.md` + `.agents/` — nada normativo en archivos por-herramienta (patrón en `.agents/README.md`).
