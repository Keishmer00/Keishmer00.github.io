# Spec 005 — Analítica y consentimiento

`Estado: hecha (as-built, verificada contra código 2026-08-22)` · `Autor: Keishmer + IA` · `Fecha: 2026-08-22` · `Relacionadas: 003 (eventos del formulario), 006 (Vercel)`

## 1. Objetivo (una frase)

Medir qué páginas y acciones llevan a una consulta — con Microsoft Clarity y Vercel Analytics — cargando los scripts solo cuando el visitante acepta, y registrar los clics importantes con un único atributo de datos.

## 2. Alcance

**Entra:** `ConsentBanner.astro` (banner y persistencia de la decisión), `Analytics.astro` (carga condicional de proveedores, `track`, eventos automáticos) y el inventario de `data-analytics-event`.
**No entra:** la redacción legal de la política de privacidad (claves `privacy.*` — hoy no nombra a estos proveedores, pending #5.1); Vercel Speed Insights (instalado, no renderizado — pending #5.2).

Textos: `consent.text`, `consent.accept`, `consent.decline` en ambos locales.

## 3. Modelo de datos y contratos

**Consentimiento** (`ConsentBanner.astro`, montado por `Layout`): `<aside id="consent-banner">` fijo, oculto si ya existe `localStorage["keishmer-analytics-consent"]`. Botones → `accepted` | `declined`; al decidir, guarda el valor, oculta el banner y emite `window.dispatchEvent(new CustomEvent("keishmer:analytics-consent", { detail }))`. No hay forma de revocar desde la UI (solo borrando el `localStorage`).

**Carga de proveedores** (`Analytics.astro`, `<script is:inline>`): `hasConsent()` = valor `accepted`. `loadAnalytics()` inyecta una sola vez (marca `data-keishmer-analytics`) **Microsoft Clarity** (`https://www.clarity.ms/tag/tfbwgxewkn`) y **Vercel Analytics** (`/_vercel/insights/script.js`, `defer`); se invoca al cargar y al recibir `keishmer:analytics-consent`. Antes de cargar existe el stub `window.va` (cola `vaq`) del SDK de Vercel. El paquete `@vercel/analytics` está instalado pero no se importa (el script se inyecta a mano).

**Eventos** (`track(name, props)` → `window.va("event", name, props)` + `window.clarity("event", name)` si existe; no hace nada sin consentimiento):

| Disparador | Evento | Props |
|---|---|---|
| `click` en `[data-analytics-event]` (delegado en `document`) | el valor del atributo | `path`, `label` = `data-analytics-label` o texto (≤ 80) |
| primer `focusin` en `form[data-analytics-form]` | `contact_form_start` | `path` |
| `keishmer:form-success` (lo emite `Form.astro` tras un 200) | `contact_form_submit` | `path` |

**Inventario de `data-analytics-event`** (2026-08-22): `cta_hero_primary_click`, `cta_hero_secondary_click`, `cta_about_click`, `cta_final_click`, `cta_service_primary_click` y `cta_service_final_click` (label = servicio), `case_study_click` y `cta_case_study_click` (label = `work.id`), `direct_email_click` (contacto y footer), `language_switch`. Convención: `snake_case`, verbo al final (`_click`, `_start`, `_submit`).

## 4. Plan (resumen as-built)

1. Banner con persistencia en `localStorage` y evento de decisión.
2. Cargador condicional de Clarity + Vercel Analytics con stub `va`.
3. `track` unificado + delegación de clics por atributo + eventos del formulario.
4. Atributos `data-analytics-event` en los CTAs principales.

## 5. Criterios de aceptación (as-built)

- [x] Sin decisión previa aparece el banner; con `declined` no se carga ningún script de terceros ni se envía evento alguno — comprobación en la pestaña Network.
- [x] Al aceptar, Clarity y `/_vercel/insights/script.js` se cargan sin recargar la página y los clics posteriores emiten eventos.
- [x] Un CTA nuevo se mide añadiendo solo `data-analytics-event` (y opcionalmente `data-analytics-label`), sin tocar `Analytics.astro`.
- [x] `contact_form_start` se emite una sola vez por formulario; `contact_form_submit` solo tras un envío exitoso.
- [ ] **Deudas as-built:** la política de privacidad no nombra Clarity ni Vercel Analytics (pending #5.1); no hay UI para retirar el consentimiento; el `index.html` legado de la raíz carga Clarity sin consentimiento (no se sirve, pending #7.1).

## 6. Decisiones

**Tomadas:** analítica **opt-in** (nada se carga sin `accepted`) — el sitio capta leads en la UE/LatAm/EE. UU. y no quiere depender de un CMP externo. Dos proveedores con un solo `track` — Clarity da mapas de calor y grabaciones; Vercel Analytics, métricas de tráfico y conversiones sin cookies; el código de la página no conoce a ninguno. Eventos por atributo `data-analytics-event` — declarativo, sin listeners por componente, y el inventario se obtiene con un `grep`. Persistencia en `localStorage` y no cookie — no viaja al servidor; el sitio es estático.

**Descartadas:** Google Analytics / GTM — peso y cookies sin necesidad para un portafolio. Cargar Clarity siempre y gatear solo los eventos — el script en sí ya es tracking; el consentimiento debe preceder a la carga. Usar los componentes `<Analytics />` de `@vercel/analytics/astro` — no permiten gatear la carga por consentimiento tan directamente como inyectar el script.
