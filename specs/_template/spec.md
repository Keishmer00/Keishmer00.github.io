# Spec NNN — <Nombre de la feature>

`Estado: en curso | hecha | reemplazada por NNN` · `Autor: <dev>` · `Fecha: YYYY-MM-DD` · `Relacionadas: NNN`

## 1. Objetivo (una frase)

<Qué logra esta feature y para quién. Si necesitas dos frases, probablemente son dos specs.>

## 2. Alcance

**Entra:**
- <capacidad que SÍ es parte de esta spec>

**No entra:**
- <lo adyacente que alguien podría asumir incluido — dilo explícito y dónde vive si aplica>

<Si toca textos, casos de estudio o SEO, dilo aquí en una línea cada uno: grupos de claves i18n nuevos (en `en.json` **y** `es.json`), entradas/overrides ES en `src/lib/projects.ts`, páginas nuevas (`page` en `Layout`/`SeoHead` + `seo.<key>.*`), cambios de sitemap o `llms.txt`.>

## 3. Modelo de datos y contratos

<Las formas que esta feature lee/escribe. Para API: endpoint, método, campos reales en `snake_case`, validaciones y códigos de respuesta; migración en `supabase/migrations/` si toca la tabla. Para UI pura: props del componente, claves i18n que consume, eventos `data-analytics-event` que emite.>

## 4. Plan de implementación (ordenado)

<Pasos numerados a nivel de "un cambio revisable" cada uno. La verificación (`pnpm build`, revisión en EN y ES) va dentro del plan, no después. Para features grandes, saca el checklist a un `tasks.md`.>

1. …
2. …

## 5. Criterios de aceptación

<Observables, cada uno con cómo se verifica. Mientras no haya tests, la verificación es manual y se describe ("visitar `/es/x/` y comprobar…"). "Hecha" = todos marcados.>

- [ ] <criterio dado/cuando/entonces> — verificado por `<test o comprobación manual>`
- [ ] <criterio del camino malo / caso borde> — verificado por `<…>`

## 6. Decisiones

**Tomadas:**
- <decisión> — <por qué>

**Descartadas:**
- <alternativa considerada> — <por qué se rechazó — esto evita que el próximo dev/IA la vuelva a proponer>
