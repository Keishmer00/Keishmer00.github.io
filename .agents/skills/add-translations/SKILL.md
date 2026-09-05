---
name: add-translations
description: Cómo añadir o cambiar texto visible del sitio — claves i18n en los 2 locales (en base, es) con useTranslations(lang), y overrides ES para los casos de estudio en src/lib/projects.ts. Usar para todo copy nuevo o limpieza de textos quemados.
---

# Añadir traducciones (2 idiomas, EN base)

## Dónde viven

- **UI y páginas:** `src/i18n/en.json` y `src/i18n/es.json` — JSON anidado, claves punteadas (`seo.home.title`, `form.projectTypeUx`, `servicePages.uxui.deliverables`). Valores string o array de strings.
- **Casos de estudio:** NO están en los JSON. Viven en `src/lib/featured.ts` (spec 008) — base en inglés (`baseFeatured`) + `esFeatured[id]` con los campos traducibles de la marca (`title`, `description`, `intro`, `outcome`, `sector`, `services`, `imageAlt`, `logoAlt`, `seoTitle`, `seoDescription`) y `stages: { briefing | research | branding | uxui | development: { title, body } }`. Las etiquetas de etapa son UI (`featured.stages.*` en los JSON).

**Regla dura:** toda clave se añade/renombra/elimina en **los 2 archivos en el mismo cambio, empezando por `en.json`**. **No hay fallback**: si la clave falta en el locale activo, la UI muestra la clave literal (`hero.headline`). Lo mismo para los overrides: un caso sin override sale en inglés en `/es/`.

## Cómo se usa en código

- Cada **componente o página** recibe `lang` y hace `const { t, tArray } = useTranslations(lang)` (de `src/i18n/index.ts`).
- Texto: `t("clave")`; listas: `tArray("clave")` (devuelve `[]` si falta). No hay interpolación de parámetros: si un texto necesita un valor dinámico, divídelo en dos claves o compón en el componente.
- Atributos y plantillas: `aria-label={t("nav.menu")}`, `{`${t("x")} ↗`}`.

## Procedimiento

1. Escanear el componente/página buscando texto visible quemado (incluye `aria-label`, `alt`, `title`, placeholders y strings dentro de `<script>`).
2. Escribir el copy **en inglés primero**, en la voz del sitio (marca pública *Keishmer Studio*; el autor es *Keishmer Pérez Torres*).
3. Añadir la clave a `en.json` y luego su traducción a `es.json` (misma ruta anidada). Si no puedes producir una traducción de calidad, usa el valor EN como provisional y dilo en la entrega — nunca dejes la clave ausente.
4. Reemplazar el texto quemado por `t("clave")` / `tArray("clave")`.
5. Página nueva: además `page` en la unión de `Layout.astro`/`SeoHead.astro` y grupo `seo.<key>` con `title` y `description` en los dos locales.
6. Destacado nuevo: entrada en `baseFeatured` (con sus 5 etapas e imágenes importadas de `src/assets/images/<slug>-brand/`) + su bloque completo en `esFeatured`.
7. Verificar con `pnpm build` y comprobando la página en `/…/` y `/es/…/`. Paridad rápida:

```bash
node -e "const f=p=>Object.keys((function g(o,k=''){return Object.entries(o).reduce((a,[x,v])=>typeof v==='object'&&!Array.isArray(v)?{...a,...g(v,k+x+'.')}:{...a,[k+x]:1},{})})(require(p)));const e=f('./src/i18n/en.json'),s=f('./src/i18n/es.json');console.log('solo en EN:',e.filter(k=>!s.includes(k)));console.log('solo en ES:',s.filter(k=>!e.includes(k)))"
```

## Nunca

- Quemar un string visible (ni en `<script>` del componente).
- Añadir una clave en un locale y no en los dos.
- Meter texto de casos de estudio en los JSON, ni texto de UI en `featured.ts`.
- Introducir otro nombre de estudio en contenido visible (los residuos "Ruana Soul Studio" son deuda, no patrón).
