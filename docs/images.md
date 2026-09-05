# Keishmer Studio — Imágenes de los proyectos destacados (spec 008)

> Requerimientos **exactos** para crear a mano las imágenes de `src/lib/featured.ts`. El sitio sirve cada archivo tal cual se sube (van por `<img>` importado; `sharp`/`<Image>` de Astro están bloqueados en `pnpm-workspace.yaml`), así que **exporta a tamaño final**: no hay redimensionado automático. Regla general de peso: ningún binario nuevo > ~1 MB sin justificación ([rules.md §4.4](./rules.md)).

## Formato de exportación (todas las imágenes raster)

WebP **lossy, calidad 78–82**, sRGB, metadatos e ICC eliminados, sin transparencia (fondo resuelto). Nada de PNG/JPG nuevos (los PNG de 6–24 MB que había en `ruana-brand/` ya se convirtieron a WebP). Los logos van en SVG.

## Tabla de requerimientos

| Campo en `featured.ts` | Dónde se ve | Proporción | Tamaño exacto (px) | Peso máx. | Zona segura y notas |
|---|---|---|---|---|---|
| `image` (obligatoria) | **Panel de la home**: desktop = 50 % del ancho × 100 % del alto (720 × 900 en 1440 × 900); mobile = todo el panel (390 × 844). También tarjeta de `/projects/`, **hero del detalle en < lg** y tarjeta "siguiente proyecto" en < lg. Es la imagen del JSON-LD. | **4:5** vertical | **1600 × 2000** (opción retina: 2000 × 2500) | **300 KB** (400 KB retina) | `object-fit: cover` centrado. Sobrevive el **55 % central del ancho** (mobile) y el **50 % central del alto** (hero < lg). El **logo blanco se dibuja en el centro** (hasta 384 × 144 px): el centro debe ser tranquilo, sin detalle importante. Se muestra en **grises + velo oscuro** (color solo al pasar el ratón): contraste de luminosidad medio-alto; ni muy oscura ni muy clara. |
| `heroImage` (opcional) | **Hero del detalle en ≥ lg**: todo el ancho × alto de pantalla (1440 × 900 → 16:10). **Tarjeta "siguiente proyecto" en ≥ lg**: banda de ~1250 × 300 al 30 % de opacidad. Si falta, se usa `image`. | **16:9** | **2400 × 1350** (2880 × 1620 si es captura de UI con texto pequeño) | **350 KB** (450 KB en 2880) | En 16:10 se recorta un 5 % arriba y abajo. El **título va abajo a la izquierda y el logo abajo a la derecha** sobre un velo oscuro: el **tercio inferior** debe ser tranquilo. En la tarjeta "siguiente" solo se ve la **banda central (~25 % del alto)**. |
| `gallery[]` (opcional) | **ProjectGallery** del detalle: rejilla navegable de celdas 16:9 en vista alejada y la **misma imagen a pantalla completa** al ampliarla (sin recorte: la celda es la caja 16:9 más grande que cabe en pantalla). | **16:9** | **2400 × 1350** (2880 × 1620 si hay texto de UI) | **350 KB** c/u (450 KB en 2880) | **4–9 imágenes** recomendadas (rejilla 2 × 2 o 3 × 3; soporta hasta 16 → 4 × 4). Orden del array = orden de la historia (anterior/siguiente lo recorren en ese orden; la galería arranca en la imagen central). En mobile se ve completa, con bandas negras. |
| `stages[].images` (opcional) | Bajo el relato de cada etapa del detalle: rejilla de **2 columnas 4:3** (≈ 392 px c/u en desktop), **1 columna** en mobile (≈ 358 px). | **4:3** | **1600 × 1200** | **200 KB** c/u | 1–2 por etapa. No se recorta en ninguna vista. Ideal para mostrar proceso (bocetos, wireframes, variantes). |
| `logo` (obligatoria) | Centrado sobre el panel (máx. **384 × 144 px** desktop, **240 × 80** mobile), hero del detalle (alto **96 px**) y tarjeta de `/projects/` (máx. 240 × 112). | Libre (wordmark horizontal ≥ 2.5:1 ideal; cuadrado aceptado) | **SVG** con `viewBox` ajustado al dibujo, **sin márgenes** | ≤ 20 KB | El CSS lo **aplana a blanco** (`brightness-0 invert`): un solo color, sin degradados ni efectos; **trazos ≥ 1 px a 144 px de alto** (lo más fino desaparece). Sin `<style>` con clases genéricas que dependan de ids externos; texto convertido a trazados. |

Recortes que hace cada vista sobre `image` (4:5, `object-fit: cover` centrado): panel desktop 1440 × 900 → sin recorte; panel desktop 1920 × 1080 → 5 % arriba y abajo; panel mobile 390 × 844 → 21 % a cada lado; hero < lg → igual que el panel mobile; tarjeta `/projects/` desktop (~460 × 460) → 13 % arriba y abajo; tarjeta `/projects/` mobile (4:3) → 20 % arriba y abajo.

## Nombres y carpetas (convención en uso)

Una carpeta por marca en `src/assets/images/<marca>-brand/`. Cada archivo se importa en `featured.ts` como hace Astro (`import karimHero from "../assets/images/karim-brand/karim-hero.webp"` → `ImageMetadata` con `src`, `width`, `height`), y los `<img>` toman `width`/`height` del import:

```
src/assets/images/<marca>-brand/
├── <marca>-index.webp        → image            (4:5, 1600 × 2000) — panel de la home, listado, hero en mobile
├── <marca>-hero.webp         → heroImage        (16:9, 2400 × 1350) — hero del detalle en desktop y tarjeta "siguiente"
├── 1.webp … 9.webp           → gallery[]        (16:9, 2400 × 1350) — orden de la historia
└── stage-<etapa>-1.webp      → stages[].images  (4:3, 1600 × 1200) — opcionales; hoy las etapas son solo texto; <etapa> = briefing | research | branding | uxui | development
```

Carpetas: `wisegold-brand`, `karim-brand`, `ruana-brand`, `nexus-brand`. Los logos siguen en `src/assets/Logos/`. Para añadir una imagen nueva: exportarla con estas medidas, importarla arriba de `featured.ts` y ponerla en el campo correspondiente de la marca (una línea).

Estado actual (2026-09-05): las `*-index.webp` son 1000 × 1498 (2:3) y las `*-hero.webp` 1400 × 933 (3:2) — funcionan con `object-cover`, pero recortan más de lo previsto; las galerías de Karim y Nexus (1200 × 800) pierden ~15 % arriba y abajo en las celdas 16:9; las de Ruana ya cumplen (2400 × 1350). WiseGold usa `wisegold.webp` (1200 × 569) como única imagen de galería hasta que existan sus `1…9.webp`.

## Checklist antes de subir

- [ ] Proporción y píxeles exactos de la tabla (no "aproximados": el recorte se calcula sobre ellos).
- [ ] Vista previa en **blanco y negro** de `image` y `heroImage`: ¿sigue leyéndose? ¿el centro está tranquilo para el logo?
- [ ] Peso dentro del máximo; si no llega, baja la calidad a 74 antes que reducir píxeles.
- [ ] `alt` decidido para `imageAlt` (EN en la base, ES en `esFeatured`); los `alt` de galería y etapas se generan (`<marca> — Imagen de galería n`).
