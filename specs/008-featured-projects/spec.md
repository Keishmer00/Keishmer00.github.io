# Spec 008 — Proyectos destacados con narrativa de proceso

`Estado: hecha (copy e imágenes provisionales — ver §5; galería y heroImage añadidos el mismo día)` · `Autor: Keishmer + IA` · `Fecha: 2026-09-05` · `Relacionadas: 001 (rutas ES), 002 (CreativeWork/ItemList/sitemap), 004 (catálogo por categorías — reemplazada), 005 (eventos de CTA)`

## 1. Objetivo (una frase)

Presentar en la home y en `/projects/` **cuatro marcas** (WiseGold, Karim, Ruana Soul Studio, Nexus — en ese orden) como una historia por marca — briefing → investigación → branding → UX/UI → desarrollo — con un panel a pantalla completa por proyecto que se recorre con scroll horizontal, y una página de detalle por marca e idioma que amplía esa narrativa.

## 2. Alcance

**Entra:**
- `src/lib/featured.ts`: tipos `FeaturedProject` / `ProcessStage`, vocabulario fijo de etapas `PROCESS_STAGE_IDS`, datos base EN, overrides ES (`esFeatured`), helpers.
- `src/components/FeaturedProjects.astro` (`<featured-projects>`): sección fullscreen de la home con scroll horizontal (GSAP ScrollTrigger pin + scrub + snap), contador, barra de progreso y fallback nativo (`scroll-snap`) sin JS o con `prefers-reduced-motion`.
- `src/pages/[...lang]/projects/[slug].astro`: plantilla de detalle por marca (`/projects/{slug}/` y `/es/projects/{slug}/`), con art direction del hero (`heroImage` 16:9 en ≥ lg vía `<picture>`, `image` 4:5 en el resto).
- `src/components/ProjectGallery.astro` (`<project-gallery>`): galería del detalle en **una sola pantalla** — adaptación a vanilla JS + GSAP del "canvas gallery" de Giovanni Antonio: rejilla de celdas 16:9 vista alejada (viewport escalado), selección por clic / teclado / swipe / minimapa, pan con GSAP, y la imagen seleccionada **se amplía a pantalla completa** (overlay `fixed`) donde flechas y swipe pasan de imagen; Escape / "Cerrar" / clic fuera vuelven.
- `docs/images.md`: requerimientos exactos de cada imagen (proporción, píxeles, peso, zona segura) para crearlas a mano.
- `src/pages/[...lang]/projects.astro`: pasa a listar **solo** los destacados con su narrativa.
- `src/pages/[...lang]/index.astro`: `<Works/>` se sustituye por `<FeaturedProjects/>`.
- **Retiro del catálogo por categorías (spec 004)** — segunda decisión del owner el mismo día, al reorganizar las imágenes por marca: se borran `src/lib/projects.ts`, `Works.astro`, `ProjectsCatalog.astro`, `SelectedWork.astro`, `/projects/[category]/[slug].astro` (32 URLs → 404, sin redirecciones) y las claves i18n `works.*`, `selectedWork.*`, `projects.overview|challenge|solution|outcome`.
- Imágenes por marca en `src/assets/images/<slug>-brand/`: `<slug>-index.webp` (panel), `<slug>-hero.webp` (hero 16:9), `1…N.webp` (galería). Se importan como hace Astro (`ImageMetadata`: `src`, `width`, `height`) y los `<img>` toman `width`/`height` del import. Los PNG de Ruana (66 MB) se convirtieron a WebP 2400 × 1350 y se eliminaron.
- `src/layouts/Layout.astro`: `overflow-x: hidden` → `overflow-x: clip` en `html`/`body` y fondo negro en `body` (ver §6 — necesario para que la ventana sea el scroller y el pin funcione).

**No entra:**
- Redirecciones 301 de las URLs viejas `/projects/{categoría}/{slug}/` (descartadas por el owner; si algún día hacen falta, van en `vercel.json`).
- El **copy definitivo** de cada marca y etapa: el owner lo entregará; lo que hay es provisional (redactado a partir de los casos de estudio anteriores). Las etapas van sin imágenes (decisión del owner; el campo `stages[].images` queda disponible) y las galerías tienen 5 imágenes de las 9 previstas (WiseGold, 1 provisional).

**Impacto i18n:** grupo nuevo `featured.*` en `en.json` **y** `es.json` (eyebrow, CTA, etiquetas de etapas, aria-labels, títulos de la página de detalle). El contenido de cada marca **no** va en JSON: vive en `featured.ts` (regla 1.3).
**SEO:** cada destacado tiene `seoTitle`/`seoDescription` propios, entra al sitemap (prioridad 0.8 por `/projects/`) y al `ItemList` de `/projects/`; su detalle emite `CreativeWork` + `BreadcrumbList`. El `ItemList` de `/projects/` deja de listar los 16 casos por categoría y lista los 4 destacados.

## 3. Modelo de datos y contratos

**Tipos** (`src/lib/featured.ts`):

```ts
PROCESS_STAGE_IDS = ["briefing", "research", "branding", "uxui", "development"] as const
ProcessStage   { id: ProcessStageId; title: string; body: string; images?: ImageMetadata[] }  // hoy sin images en todas
FeaturedProject {
  id: string;                 // slug de la URL: wisegold | karim | ruana-soul-studio | nexus
  brand: string;              // nombre público de la marca (no se traduce)
  title: string;              // titular narrativo del panel
  description: string;        // gancho del panel (2–3 frases)
  intro: string;              // apertura del detalle
  outcome: string;            // cierre del detalle
  client: string; year: string; sector: string; services: string[]; url?: string;
  image: ImageMetadata; imageAlt: string;   // <slug>-index.webp — panel, 4:5 (import de Astro: src, width, height)
  heroImage?: ImageMetadata;                // <slug>-hero.webp — 16:9, hero del detalle y tarjeta "siguiente" en ≥ lg; si falta, `image`
  logo: ImageMetadata;  logoAlt: string;    // SVG de src/assets/Logos/** — se pinta en blanco por CSS (brightness-0 invert)
  gallery?: ImageMetadata[];  // 1…N.webp — 16:9; alimenta ProjectGallery (4–9 imágenes recomendadas, hasta 16)
  stages: ProcessStage[];     // orden = orden de lectura; hoy las 5 etapas en todos
  seoTitle: string; seoDescription: string;
}
```

**Datos:** `baseFeatured: FeaturedProject[]` (inglés, en el orden de presentación) es la fuente. `esFeatured: Record<id, FeaturedOverrides>` contiene, por marca, los campos traducibles (`title`, `description`, `intro`, `outcome`, `sector`, `services`, `imageAlt`, `logoAlt`, `seoTitle`, `seoDescription` y `stages` como mapa `stageId → { title, body }`). `applySpanish` mezcla por `id`; **sin override, la pieza sale en inglés en `/es/`** (mismo comportamiento documentado que 004). Añadir un proyecto = una entrada en `baseFeatured` **y** su bloque en `esFeatured`; añadir una etapa nueva = extender `PROCESS_STAGE_IDS` + sus etiquetas `featured.stages.<id>` en los dos locales.

**Helpers:** `allFeaturedProjects` (base EN, para `getStaticPaths`) · `getFeaturedProjects(lang)` · `getFeaturedProjectUrl(id, lang)` → `/projects/{id}/` (con `/es` delante si aplica; **con barra final**, igual que el canonical) · `findFeaturedProject(slug, lang)` · `getAdjacentFeatured(id, lang)` → `{ prev, next }` circular para el enlace "siguiente proyecto".

**Componente `FeaturedProjects.astro`** — props `{ lang }`. Claves que consume: `featured.eyebrow`, `featured.regionLabel`, `featured.counterSeparator`, `featured.cta`, `featured.stagesLabel`, `featured.stages.*`. Eventos: el CTA emite `data-analytics-event="case_study_click"` con `data-analytics-label={id}` (spec 005).

**Mecánica del scroll (desktop y mobile):**
- HTML/CSS base (sin JS): `[data-viewport]` es un contenedor `overflow-x: auto` + `scroll-snap-type: x mandatory`, `tabindex="0"`, con un `[data-track]` de `n × 100 %` y paneles de `100 % / n`. Es el estado de `prefers-reduced-motion` y el fallback si el script falla.
- Con JS y `prefers-reduced-motion: no-preference` (`gsap.matchMedia`): el contenedor pasa a `overflow: hidden`, se retira el `tabindex`, y un `gsap.to(track, { x: -(scrollWidth − clientWidth), ease: "none" })` se ata a un `ScrollTrigger` con `pin: true`, `start: "top top"`, `end: "+=" + distancia horizontal`, `scrub: 1`, `snap` a `1 / (n − 1)`, `invalidateOnRefresh`, `anticipatePin: 1`. El scroll vertical normal (rueda, trackpad, swipe vertical) desplaza los paneles; la barra del navegador sigue funcionando.
- `onUpdate` actualiza contador (`01 / 04`), barra de progreso (`scaleX`) y `data-active` del panel. Los textos de los paneles 2–n entran con `scrollTrigger.containerAnimation`; el panel 1 entra con un trigger normal al llegar la sección. La imagen de cada panel lleva un parallax horizontal leve (también con `containerAnimation`).
- `ScrollTrigger.config({ ignoreMobileResize: true })` para que el colapso de la barra de direcciones no refresque el pin. Limpieza completa en `disconnectedCallback` (`mm.revert()`, listeners).

**Layout de cada panel:** `lg+`: dos columnas de 50 %; izquierda = índice + marca + año (mono), titular (Unbounded), descripción (Albert), línea de etapas (mono, `→` entre etapas); derecha = imagen a **todo el alto y medio ancho** (`absolute inset-0 -z-10`, `grayscale`, velo `bg-linear-to-t from-black/85 via-black/40 to-black/20`; a color en `hover`), logo blanco centrado, CTA `featured.cta ↗` en la esquina inferior izquierda de la imagen (el enlace se extiende a toda la imagen con `before:absolute before:inset-0` solo en `lg+`). `< lg`: la imagen ocupa todo el panel como fondo, el logo se centra en el tercio superior y el bloque de texto + CTA se apoya abajo. Cabecera: overlay fijo con `featured.eyebrow` (izquierda) y contador (derecha) bajo el navbar; barra de progreso de 1 px en el borde inferior.

**Componente `ProjectGallery.astro`** — props `{ lang, images: string[], brand }`. Rejilla `cols = min(4, ceil(√n))`, `rows = ceil(n / cols)`; arranca en la imagen central del orden lineal. Celda = la caja 16:9 más grande que cabe en el escenario (`--cell-w: min(100cqw, 100cqh·16/9)`, `container-type: size`), de modo que ampliar = la celda ocupa la pantalla sin recorte. Estados: vista alejada (`scale` 0.42 desktop / 0.58 mobile, seleccionada a color y opacidad 1, resto en grises al 35 %) y abierta (escenario `position: fixed; inset: 0; z-index: 60`, scroll de página bloqueado, resto de celdas a 0). Navegación: clic en celda vecina, ←/→ y anterior/siguiente = ±1 lineal, ↑/↓ = ±fila, swipe horizontal siempre y vertical solo abierta (`touch-action: pan-y` en vista alejada para no robar el scroll), minimapa clicable; Enter/Espacio en la celda seleccionada abre, Escape cierra. Claves: `featured.gallery.*` (eyebrow, regionLabel, imageLabel, expand, close, prev, next, mapLabel, goTo). Sin JS: `translate` CSS centra la celda inicial y la vista queda alejada fija; con `prefers-reduced-motion` todo funciona con duración 0. Limpieza en `disconnectedCallback` (observer, listeners, timeline, desbloqueo del scroll).

**Página de detalle `/projects/[slug].astro`:** `getStaticPaths` = {EN, ES} × `allFeaturedProjects` (hoy 8 páginas). Layout `page="projects"` con `title`/`description` propios. Secciones: hero (imagen + logo, eyebrow `featured.detail.eyebrow` + sector + año, `h1` = `title`, `intro`), aside (`projects.client`, `featured.detail.year`, `featured.detail.sector`, `projects.services`, `projects.website` si `url`), proceso (`featured.detail.processTitle`, una sección por etapa con número, etiqueta `featured.stages.<id>`, `title`, `body`, imágenes opcionales), cierre (`featured.detail.outcomeTitle` + `outcome`), galería opcional (`ProjectGallery`, sección `#gallery` a todo el ancho, 80svh en mobile y 100svh en desktop), "siguiente proyecto" (`featured.detail.next`, con `<picture>` igual que el hero), CTA a `/contact/` (`projectCta.*`, evento `cta_case_study_click`). JSON-LD `CreativeWork` (misma forma que 004) y `BreadcrumbList` vía `Breadcrumbs`.

**Página `/projects/`:** título y descripción de `projects.*` (sin cambios), un bloque por destacado (imagen + logo, índice, marca, titular, descripción, línea de etapas, CTA al detalle) y `ItemList` con los 4. `<projects-page>` mantiene la entrada GSAP (respetando `prefers-reduced-motion`).

## 4. Plan de implementación (ordenado)

1. Spec 008 (este documento) + fila en `specs/README.md`.
2. `src/lib/featured.ts` con los 4 proyectos (copy provisional EN + ES, imágenes y logos existentes).
3. Claves `featured.*` en `en.json` y `es.json`; paridad verificada con el script de la skill `add-translations`.
4. `FeaturedProjects.astro` + montaje en `index.astro` (sin borrar `Works.astro`) + ajuste de `Layout.astro`.
5. `projects/[slug].astro` (plantilla de detalle) y `projects.astro` rehecha; listado viejo a `ProjectsCatalog.astro`.
6. Docs: `AGENTS.md` (lectura bajo demanda), `docs/architecture.md`, enmienda en spec 004, skill `add-translations`, `docs/pending.md`.
7. `pnpm build` en verde; revisión visual en EN/ES, desktop y mobile, con y sin `prefers-reduced-motion`.

## 5. Criterios de aceptación

- [x] La home muestra 4 paneles a pantalla completa (WiseGold, Karim, Ruana, Nexus) y al hacer scroll vertical avanzan horizontalmente con snap; el contador y la barra reflejan el panel activo — verificado con capturas en varios puntos del scroll (1440×900 y 390×844).
- [x] Cada panel tiene título, descripción y línea de etapas a la izquierda; imagen a todo el alto/medio ancho con logo blanco centrado y CTA `↗` que lleva a `/projects/{slug}/` (y `/es/projects/{slug}/` en ES) — verificado en el HTML generado.
- [x] En mobile la imagen ocupa todo el panel y el texto va encima, sin que nada quede fuera del alto de pantalla — verificado con captura 390×844.
- [x] Con `prefers-reduced-motion: reduce` (o sin JS) la sección es un carrusel horizontal nativo con snap, sin pin ni animaciones — verificado con captura en modo reducido.
- [x] Existen `/projects/{slug}/` y `/es/projects/{slug}/` para los 4 destacados, con las 5 etapas, meta, siguiente proyecto y CTA; `/projects/` lista los 4 con `ItemList`; `pnpm build` en verde — verificado en `.vercel/output/static`.
- [x] La galería del detalle cabe en una pantalla, la imagen seleccionada se amplía a pantalla completa sin recorte y se cierra con Escape / botón / clic fuera; anterior/siguiente, teclado, swipe y minimapa cambian la selección; el scroll de la página queda bloqueado solo mientras está abierta — verificado con Playwright en 1440 × 900 (EN) y 390 × 844 (ES), con y sin `prefers-reduced-motion`.
- [x] Las claves `featured.*` existen en ambos locales (paridad `solo en EN: []`, `solo en ES: []`).
- [x] El catálogo por categorías ya no existe en el código ni en el build: `pnpm build` genera 10 páginas bajo `/projects/` (listado + 4 destacados × 2 idiomas) y ninguna `/projects/{categoría}/…` — verificado en `.vercel/output/static`.
- [ ] **Pendiente del owner:** sustituir el copy provisional (`featured.ts`, base EN **y** `esFeatured`) y completar las galerías a 9 imágenes (WiseGold hoy solo tiene `wisegold.webp`).

## 6. Decisiones

**Tomadas:**
- **Fuente nueva `featured.ts` + ruta plana `/projects/{slug}/`** en vez de reutilizar los `WorkItem` por categoría — una marca con branding + web estaba partida en dos casos (`karim` / `karim-ventas`); la narrativa por proceso necesita una entidad por marca. Las URLs viejas no se tocan.
- **Etapas como array con vocabulario fijo** — hoy las cuatro marcas declaran las 5 etapas (decisión del owner: todas pasaron por el proceso completo), pero el modelo admite quitar/añadir/reordenar sin tocar componentes. Las etiquetas de etapa son UI → i18n; el relato de cada etapa es contenido → `featured.ts`.
- **Overrides ES como un objeto por marca** (`esFeatured[id]`) y no un mapa plano por campo como en 004 — con etapas anidadas, los mapas por campo se volvían ilegibles; sigue siendo "base EN + overrides por id".
- **Pin + scrub + snap (ScrollTrigger)** y no un slider por pasos (Observer) ni scroll nativo horizontal como único modo — el pin usa el gesto que ya conoce el usuario (scroll vertical), funciona igual con rueda, trackpad y touch, y no secuestra el scroll. El scroll-snap nativo queda como fallback progresivo.
- **`overflow-x: clip` en `html`/`body`** — con `height: 100 %` + `overflow-x: hidden`, el `body` era el contenedor de scroll (comprobado: `window.scrollY` siempre 0), lo que dejaba sin efecto todos los ScrollTrigger del sitio y hace imposible el pin. `clip` recorta sin crear contenedor de scroll; la ventana vuelve a ser el scroller. Fondo negro en `body` para que el pin no deje un hueco blanco al colapsar la barra de direcciones en mobile.
- **Imagen en grises + velo, logo blanco por filtro CSS** — coherente con el resto del sitio y evita que logos de color (Ruana rojo, WiseGold claro) compitan; a color en hover como recompensa. `<img>` en vez de SVG inline para no arrastrar los `<style>` internos de los SVG al documento.
- **`/projects/` solo con destacados y catálogo por categorías retirado** — los 8 placeholders ficticios eran deuda (pending #3), la narrativa única no convive con tabs por categoría y, al reorganizar las imágenes por marca, el catálogo viejo perdió sus assets. Primero se conservó sin montar; el mismo día el owner decidió borrarlo (sin redirecciones).
- **Imágenes como `ImageMetadata`** (import de Astro) en vez de strings `.src` — los `<img>` llevan `width`/`height` reales (sin CLS) y una sola convención de nombres por marca; sin `<Image>` de Astro porque `sharp` está bloqueado en `pnpm-workspace.yaml` y las imágenes ya se exportan a tamaño final.
- **Galería como "canvas" de una pantalla con celdas 16:9 = caja máxima del escenario** — así ampliar es exactamente la celda a pantalla completa (sin cambiar `object-fit`, sin saltos) y las imágenes de galería tienen una sola especificación (16:9). Se descartaron el zoom con rueda y el slider del original (secuestraban el scroll de la página) y el arranque en una esquina (se arranca en la imagen central). El overlay es `position: fixed` con un placeholder que conserva el alto, para que "pantalla completa" no dependa de dónde esté la sección.
- **`heroImage` opcional con `<picture>` (art direction)** en vez de una sola imagen para todo — un 4:5 recortado a 16:10 pierde la mitad del alto en el hero de desktop; con 16:9 en ≥ lg y 4:5 en mobile cada vista recibe el encuadre correcto sin JS. Especificación completa en `docs/images.md`.
- **Voz en primera persona singular** en el copy provisional — es la voz de la home (`hero.*`, `process.*`); los casos de 004 hablan en plural (pending #8.2). El owner decide al entregar el copy definitivo.

**Descartadas:**
- Extender `WorkItem` con `process` — mantiene la fragmentación por categoría y obliga a elegir una categoría "dueña" de cada marca.
- Ruta `/work/{slug}/` — pierde la prioridad y el agrupamiento de `/projects/` en el sitemap y en `llms.txt`.
- Slider tipo fullpage con `Observer` — secuestra el scroll y frustra en trackpad; descartado por el owner.
- `scroller: document.body` en los ScrollTrigger en lugar de arreglar el scroller — habría dejado el resto del sitio con el `body` como scroller y el pin en modo `transform` (peor en mobile).
- Colecciones de contenido / Markdown por marca — el catálogo es pequeño y tipado; mismo razonamiento que 004.
