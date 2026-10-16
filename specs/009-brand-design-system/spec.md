# Spec 009 — Sistema de diseño y manual de marca (`/brand/`)

`Estado: hecha` · `Autor: Keishmer` · `Fecha: 2026-10-14` · `Relacionadas: 002, 004`

## 1. Objetivo (una frase)

Una página pública `/brand/` que consolida el sistema de diseño del sitio (color, tipografía, espaciado, radio/borde, elevación, movimiento, layout, iconografía, efectos, componentes en vivo y voz) como única fuente de verdad, inspirada en `wise.gold/brand` pero optimizada para bilingüe EN/ES. Al momento de su creación el sitio era dark-only; ver spec 010 para el modo claro.

## 2. Alcance

**Entra:**
- Página nueva `/brand/` (EN) y `/es/brand/` (ES) en `src/pages/[...lang]/brand.astro`, prerenderizada, indexable.
- `src/lib/tokens.ts`: fuente única tipada de la paleta, escala tipográfica, espaciado, radios, movimiento, breakpoints + helper de contraste WCAG. La página se renderiza desde aquí.
- Componentes de sección en `src/components/brand/` (`LogoSection`, `ColorSection`, `TypographySection`, `Foundations`, `ComponentsSection`, `VoiceSection`, `TocNav`, `SectionHeading`).
- Custom element `<brand-manual>` (vanilla): copia de hex al portapapeles, scrollspy del TOC, indicador "copiado". Respeta `prefers-reduced-motion` y limpia en `disconnectedCallback`.
- Sidebar: sticky vertical en escritorio (`lg`); en móvil es una **barra fija abajo, horizontal con scroll**, que **centra automáticamente el ítem activo** (solo al cambiar de sección) y se **desliza fuera de vista cuando el footer entra en pantalla** (IntersectionObserver sobre `footer`).
- Sección de logo con el monograma K. (`src/assets/icons/Logo_Keishmer.svg`, inline, `currentColor`) + wordmark en mono.
- Galería de componentes renderizada con las clases reales del sitio.

**No entra:**
- **No** refactoriza componentes existentes ni introduce una capa semántica nueva en `global.css` (el sitio conserva sus tokens actuales; `tokens.ts` solo los documenta).
- **No** añade tema claro ni selector de modo en este spec; esa funcionalidad queda en la spec 010.
- **No** hay descarga de tokens (`tokens.css`/JSON) ni paquete instalable.

**Textos/i18n:** grupo `brand.*` (contenido de página) + `seo.brand.*` (`title`, `description`) + `nav.brand`, en `en.json` **y** `es.json` (EN base). **SEO:** `page: "brand"` en `Layout`/`SeoHead` → canonical/hreflang automáticos; prioridad `0.6` / `yearly` en `astro.config.mjs`. Enlace en `Navbar` (menú) y `Footer`.

## 3. Modelo de datos y contratos

- `tokens.ts` exporta: `colorGroups`, `typeFamilies`, `typeScale`, `typeWeights`, `spacingScale`, `radiusScale`, `strokeScale`, `motionDurations`, `motionEasings`, `breakpoints`, `PAGE_BACKGROUND`, y helpers `contrastRatio` / `contrastRating`. Sin endpoints ni datos dinámicos: todo prerender.
- El `<brand-manual>` no emite eventos `data-analytics-event`. El swatch usa `data-copy="<hex>"`; la etiqueta "copiado" llega por `data-copied` (i18n, nada quemado en el script). La barra móvil se marca con `data-mobile-toc` y su contenedor de scroll con `data-toc-scroll`.

## 4. Plan de implementación (ordenado)

1. `tokens.ts` con los valores reales extraídos de `global.css` + uso en componentes.
2. Claves i18n `brand.*`, `seo.brand.*`, `nav.brand` en ambos locales; verificar paridad EN/ES.
3. Componentes de sección.
4. Página `brand.astro` + `<brand-manual>`.
5. `page: "brand"` en `Layout`/`SeoHead`; enlace en `Navbar`/`Footer`; prioridad en `astro.config.mjs`.
6. `pnpm build` en verde; revisar `/brand/` y `/es/brand/` en EN/ES y móvil.

## 5. Criterios de aceptación

- [ ] `/brand/` y `/es/brand/` renderizan todas las secciones con textos en el locale correcto — visitar ambas rutas.
- [ ] Cada swatch muestra token, hex y ratio de contraste vs el fondo; clic copia el hex y muestra "copiado" — interacción manual.
- [ ] El TOC resalta la sección visible al hacer scroll; los anclas respetan el navbar fijo (`scroll-mt`) — interacción manual.
- [ ] Paridad EN/ES sin claves faltantes — script de `add-translations`.
- [ ] `pnpm build` compila y genera las dos rutas estáticas.

## 6. Decisiones

**Tomadas:**
- **Ruta ES `/es/brand/`** (no `/es/marca/`): mantiene intacta la convención de slugs idénticos que asumen `getAlternatePaths`, `LanguageSwitcher` y el hreflang, sin tocar helpers compartidos.
- **`tokens.ts` como fuente única** en lugar de hex sueltos en la página: documenta sin refactor y evita que el manual se desincronice.
- **Un solo tema oscuro** (al momento de la spec 010 se amplía a dos temas; esta spec describe el manual base).
- **Galería de componentes en vivo** con las clases reales, no solo muestras de token.

**Descartadas:**
- **Slug `/es/marca/` con alias de rutas**: exigía extender `getAlternatePaths`/`LanguageSwitcher`/hreflang con un mapa de slugs para una sola página; complejidad desproporcionada.
- **Refactor a tokens semánticos (`surface/text/border/action`) en `global.css`**: alcance mayor con riesgo de tocar muchos componentes; fuera de lo pedido.
- **Descargables / paquete**: no están en alcance.
- **Modo claro**: ahora vive en la spec 010.
