# Spec 010 — Tema claro con selector Sistema/Claro/Oscuro

`Estado: hecha` · `Autor: Keishmer` · `Fecha: 2026-10-15` · `Relacionadas: 002 (theme-color), 009 (manual de marca)`

## 1. Objetivo

Añadir un modo claro al sitio que, por defecto, siga la preferencia del navegador/OS (`prefers-color-scheme`) y permita al usuario elegir Sistema, Claro u Oscuro con un selector persistente, sin que cambie la apariencia del modo oscuro actual.

## 2. Alcance

**Entra:**
- Capa semántica de tokens de color en `src/styles/global.css` y utilidades Tailwind para superficies, texto, bordes y acciones.
- Actualización de `src/lib/tokens.ts` para documentar ambas paletas y mantener el cálculo de contraste.
- Selector de tema en el menú de navegación: tres opciones (Sistema / Claro / Oscuro) con persistencia en `localStorage`.
- Respeto de `prefers-color-scheme` cuando no hay preferencia guardada o el usuario elige Sistema.
- Actualización de `<meta name="theme-color">` y `color-scheme` al modo efectivo.
- Migración de todos los componentes compartidos y páginas principales a tokens semánticos: `Layout`, `Navbar`, `Footer`, `Hero`, `BlackHoleBG`, `CTA`, `Form`, `ConsentBanner`, `FeaturedProjects`, `CursorParticles`, `LanguageSwitcher`, `Breadcrumbs`, `ServiceBanner`, secciones de servicio, legales, 404 y `/brand/`.
- Actualización del manual `/brand/` para mostrar las dos paletas y sus contrastes.

**No entra:**
- Rediseño de ilustraciones, fotografías o contenido de marca: las imágenes se conservan; solo se adaptan overlays y textos.
- Nuevos endpoints, tablas ni lógica de servidor.
- Cambio del slug `/brand/` ni de la estructura de URLs.

**Textos/i18n:** grupo `theme.*` en `en.json` y `es.json` con claves para el selector, el botón y los tres modos. `brand.metaLine` se actualiza a "Two themes · EN/ES · Astro + Tailwind v4 + GSAP" / "Dos temas · EN/ES · Astro + Tailwind v4 + GSAP".

**SEO:** `SeoHead.astro` deja de usar un `theme-color` fijo; emite dos `<meta name="theme-color">` con `media` para claro/oscuro y, cuando hay una preferencia manual, un script actualiza el activo. Spec 002 se actualiza para reflejar este contrato.

## 3. Modelo de datos y contratos

- **Tokens CSS:** variables semánticas en `:root` (oscuro, base) y `@media (prefers-color-scheme: light) { :root:not([data-theme="dark"]) }` (claro automático, también sin JS). Sobrescritas manuales con `:root[data-theme="light"]` / `:root[data-theme="dark"]`. Grupos: `--surface-*` (page, default, panel, elevated, muted, inverse, primary), `--text-*` (primary, secondary, muted, subtle, accent, accent-blue, inverse, on-primary), `--border-*` (subtle, default, strong, inverse), `--state-*` y `--fx-*` (colores de canvas: line, particle, glow, scanline, cursor). Todos expuestos como utilidades Tailwind (`bg-surface-page`, `text-text-primary`, `border-border-subtle`…).
- **Mapeo desde las clases viejas (oscuro idéntico):** `text-white`→`text-text-primary` (#C6D2D4), `text-gray-200`→`text-text-secondary` (#949494), `text-gray-300`→`text-text-muted`, `text-gray-400/500`→`text-text-subtle`, `text-primary`→`text-text-accent`, `bg-black`→`bg-surface-page`, `bg-white`→`bg-surface-inverse`, `border-white/10|15`→`border-border-subtle`, `/20|30`→`border-border-default`, `/40`→`border-border-strong`.
- **Variante `light:`** (`@custom-variant` en `global.css`): estilos solo para el tema claro efectivo, p. ej. `brightness-0 invert light:invert-0` en logos blancos sobre imagen.
- **Preferencia guardada:** clave `keishmer-theme` en `localStorage` con valores `"system" | "light" | "dark"`. Si la clave no existe o es `"system"`, el sitio sigue `prefers-color-scheme`.
- **Selector:** custom element `<theme-controller>` que lee/escribe `localStorage`, aplica `data-theme` y sincroniza el `<meta name="theme-color">`. Si JavaScript falla o está deshabilitado, CSS sigue respetando la preferencia del sistema.
- **Eventos internos:** cuando cambia el tema se dispara `CustomEvent("keishmer:theme-change", { detail: { theme: "light" | "dark", preference: "system" | "light" | "dark" } })`. `BlackHoleBG`, `CursorParticles` y `MeshText` re-resuelven sus colores `var(--fx-*)`/`var(--text-primary)` y repintan; las demás instancias de `<theme-controller>` (navbar y la galería de `/brand/`) sincronizan su estado `aria-pressed`.
- **Contraste:** `tokens.ts` exporta `semanticTokens` (fuente única: `cssVar`, grupo, valor oscuro y claro), `themePalettes`/`getThemePalette()` derivados y `THEME_PAGE_BACKGROUND`; `/brand/` (`ColorSection`) pinta la tabla oscuro|claro con el contraste WCAG de cada token de texto contra el fondo de página de su tema. Todo token de texto claro cumple AA (≥4.5:1) sobre `#F2F4FF`.

## 4. Plan de implementación

1. **Documentación:** crear esta spec, actualizar `specs/README.md`, corregir la spec 009 (ya no es dark-only) y actualizar la spec 002 para el `theme-color` dinámico.
2. **Tokens:** definir variables semánticas en `global.css` y añadir colores/utilidades a `@theme`. Añadir `themePalettes` a `tokens.ts`.
3. **Selector:** crear `src/components/ThemeController.astro`, montarlo en `Layout`/`Navbar` y añadir claves i18n `theme.*`.
4. **SEO:** actualizar `SeoHead.astro` para emitir `theme-color` por modo y preparar el meta para actualización desde JS.
5. **Migración por bloques:**
   - Shell: `Layout`, `Navbar`, `Footer`, `LanguageSwitcher`, `ConsentBanner`.
   - Home: `Hero`, `BlackHoleBG`, `CTA`.
   - Proyectos: `FeaturedProjects` y detalle de caso.
   - Formulario y CTA final: `Form`.
   - Páginas de servicio, legales, 404 y `/brand/`.
6. **Manual de marca:** actualizar `ColorSection` y `ComponentsSection` para reflejar ambos temas.
7. **QA:** `pnpm build`, revisar `/`, `/es/`, `/brand/`, `/contact/`, `/projects/`, detalle de caso, móvil y escritorio; comprobar que el modo oscuro no cambió.

## 5. Criterios de aceptación

- [x] El modo oscuro se ve idéntico al estado actual en `/`, `/es/`, `/brand/` y `/projects/`.
- [x] Con `prefers-color-scheme: light` y sin preferencia guardada, el sitio se renderiza claro; con `: dark` se renderiza oscuro.
- [x] El selector permite elegir Claro/Oscuro/Sistema; la elección persiste tras recargar y se puede volver a Sistema.
- [x] No hay destello de tema al cargar: el script de `ThemeController` corre tan pronto como sea posible.
- [x] `theme-color` del navegador coincide con el modo efectivo (oscuro `#121314`, claro `#F2F4FF` o similar definido).
- [x] Todos los textos, bordes, formularios, botones, banner de consentimiento, footer y navegación son legibles en ambos modos.
- [x] Canvas/efectos (`BlackHoleBG`, `CursorParticles`) se adaptan al tema activo sin recargar.
- [x] `pnpm build` compila sin errores y las rutas principales responden 200.
- [x] EN/ES mantienen paridad de claves i18n; no hay strings quemados en el selector.

**Verificación (2026-10-16):** `pnpm build` en verde. Comparación píxel a píxel en modo oscuro contra `HEAD` (1440px, `/`, `/about-me/`, `/projects/`, `/projects/wisegold/`, `/contact/`, `/ux-ui-design/`, `/es/terms/`): ≤0,05 % de píxeles distintos, todos en canvas animados o imágenes lazy. `/brand/` cambia a propósito (tabla semántica + selector en la galería). Modo claro revisado en las mismas rutas a 1440px y 390px; selector probado (cambio en vivo, persistencia tras recarga, `theme-color`, vuelta a Sistema). Sin errores de JS.

## 6. Decisiones

**Tomadas:**
- **Tema automático + selector manual:** respeta la preferencia del sistema por defecto y deja al usuario decidir si quiere forzar un modo. Así se cumple el requisito de adaptación automática sin quitar el control.
- **Tokens semánticos en lugar de invertir `black`/`white`:** evita romper componentes que usan los mismos nombres para fondos y textos. El modo oscuro queda protegido como baseline.
- **Selector dentro del menú de navegación:** no satura la navbar fija en móvil y queda junto a las demás opciones de preferencia (idioma).
- **Colores de acento conservados para decoración; variantes oscuras para texto:** el coral `#FF6B6B` y el azul `#67A6D8` se mantienen en glows y detalles; para texto pequeño sobre fondo claro se usan versiones más oscuras que cumplen 4.5:1.
- **`<html data-theme>` como fuente de verdad en runtime:** CSS y el selector la leen/escriben; los canvas pueden reaccionar al evento `keishmer:theme-change`.

- **Oscuro píxel-idéntico como regla:** los tokens oscuros replican los valores reales de las clases viejas (`--color-white` era `#C6D2D4`, `gray-200` era `#949494`), no los nombres; `--fx-*` conserva los colores originales de los canvas. Única excepción deliberada: el texto en hover sobre coral pasa a `text-on-primary` (#121314, 6,7:1) en lugar del gris claro original (1,8:1).
- **Fondo del hero (`BlackHoleBG`) con modo de fusión por tema:** las capas de scanlines y glow usan `mix-blend-mode: var(--fx-blend)` — `overlay` en oscuro (sin cambios) y `multiply` en claro, porque `overlay` sobre un fondo casi blanco aclara todo y borraba la animación. En claro el glow es un rosa casi imperceptible (`#FFF4F4`), la malla es `#B1B6CA` y las partículas gris `#6E7389`; al cambiar de tema se regeneran malla y partículas.
- **Sin línea entre proyectos en el carrusel (`FeaturedProjects`):** el desplazamiento horizontal se redondea a píxeles físicos; los paneles miden 2px más y se solapan 2px (el borde cae sobre la foto vecina, clave con densidades fraccionarias como 2.625×/2.75×); el contenedor de la foto ya no usa `isolate` (orden explícito foto z-0 / velo z-[1] / CTA z-10); y el parallax de la foto solo corre en desktop (≥1024px). Verificado con 0 frames con línea en 10 combinaciones de tamaño/densidad/tema y snap exacto.
- **Bandas invertidas se mantienen invertidas:** `IdealClients` era una banda clara en el sitio oscuro; usa `surface-inverse`/`text-inverse`, así que en el tema claro es una banda oscura.
- **Overlays sobre fotos usan `surface-page`:** en claro la imagen queda lavada en claro con texto oscuro (FeaturedProjects, hero de caso con un lavado más fuerte vía `light:`); los logos blancos pasan a negros con `light:invert-0`.
- **Fondos fijos no cambian:** `ProjectGallery` (visor de imágenes a pantalla completa), las miniaturas de `/projects/` con overlay negro, `Process` y el CTA coral de caso conservan sus colores en ambos temas porque el fondo es la imagen o el coral, no la página.

**Descartadas:**
- **Invertir `--black` y `--white` globalmente:** rompería botones, bordes y textos que usan esos tokens con significados opuestos.
- **Tema claro solo en zonas aisladas:** el usuario pidió adaptar toda la página, no dejar islas oscuras fijas.
- **Servir manifest diferente por tema:** el estándar no soporta variantes por preferencia; se usa un color de splash neutro.
