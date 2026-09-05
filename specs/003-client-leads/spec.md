# Spec 003 — Leads de clientes (formulario de contacto)

`Estado: hecha (as-built, verificada contra código 2026-08-22 — con deudas de seguridad señaladas)` · `Autor: Keishmer + IA` · `Fecha: 2026-08-22` · `Relacionadas: 005 (eventos del formulario), 006 (variables de entorno)`

## 1. Objetivo (una frase)

Capturar de forma segura las consultas de clientes potenciales — protegidas contra bots y abuso — guardarlas con su atribución en Supabase y avisar a Keishmer por correo sin frenar al visitante.

## 2. Alcance

**Entra:** `Form.astro` (UI y script de envío), el endpoint `POST /api/submit-clients`, sus validaciones y protecciones (rate limit, reCAPTCHA v3), la tabla `leads_clients` con sus migraciones y la notificación por Resend.
**No entra:** un panel para gestionar leads (se consultan en el dashboard de Supabase); la Edge Function `send-notification-email` como flujo activo (queda documentada como legado).

Textos: claves `form.*` en los dos locales. El formulario se monta en la home (`#contact`) y en `/contact/`.

## 3. Modelo de datos y contratos

**UI (`Form.astro`, `<form id="users-form" data-analytics-form data-lang={lang}>`):**

| Campo | Tipo | Reglas |
|---|---|---|
| `legal_name` | text | requerido, ≤ 100 |
| `client_email` | email | requerido, ≤ 100 |
| `phone_number` | tel | opcional, ≤ 30 |
| `project_type` | select | requerido: `ux-ui` · `web-frontend` · `branding` · `ongoing-support` |
| `budget_range` | select | requerido: `under-1000` · `1000-3000` · `over-3000` |
| `timeline` | select | requerido: `asap` · `within-month` · `one-to-three-months` · `exploring` |
| `message` | textarea | requerido, ≤ 3000 |

El script (al `submit`) carga `api.js?render=PUBLIC_RECAPTCHA_SITE_KEY` bajo demanda, ejecuta `grecaptcha.execute(siteKey, { action: "submit" })` y envía JSON a **`/api/submit-clients`** (ruta raíz, también desde `/es/`) con los campos + `language` (`data-lang` o prefijo del path), `source_path`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign` y `recaptcha`. Éxito → `form.reset()`, mensaje de estado y evento `keishmer:form-success` (spec 005). El badge de reCAPTCHA está oculto por CSS y la atribución textual la da la clave `form.recaptcha` junto a los enlaces a privacidad y términos.

**Endpoint** (`src/pages/[...lang]/api/submit-clients.ts`, `prerender = false` → función serverless en Vercel; la ruta acepta prefijo opcional de idioma). Orden de comprobaciones y respuestas (`{ success, message }` JSON):

1. **Rate limit** 5 requests/min por IP (`x-forwarded-for`, mapa en memoria) → `429 Too many requests`.
2. Body JSON inválido → `400 Invalid request`.
3. Saneado: `trim` + recorte a la longitud máxima por campo (`language` ≤ 2, `source_path` ≤ 200, `referrer` ≤ 500, `utm_*` ≤ 100); requeridos vacíos → `400 Please complete the required fields`; `language ∉ {en, es}` → `400 Invalid language`; email sin forma `x@y.z` → `400 Invalid email`; enums fuera de lista → `400 Invalid project details`.
4. **reCAPTCHA v3**: sin token o sin `RECAPTCHA_SECRET_KEY` → `500 Security validation unavailable`; verificación en `siteverify` con `remoteip`; falla si `!success`, `score < 0.5`, `action !== "submit"` o `hostname` fuera de `RECAPTCHA_ALLOWED_HOSTNAMES` (default `keishmerstudio.com,localhost`) → `403 Security validation failed` (⚠️ hoy con un objeto `debug` en la respuesta).
5. **Persistencia**: `createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)` → `insert` en `leads_clients`; sin credenciales → `500 Server unavailable`; error de insert → `500 We could not save your inquiry`.
6. **Notificación**: `POST https://api.resend.com/emails` con `RESEND_API_KEY`, `from` = `RESEND_FROM_EMAIL` (default `Keishmer Studio <onboarding@resend.dev>`), `to` = `LEAD_NOTIFICATION_EMAIL` (default correo del owner), `reply_to` = email del lead, HTML con los campos escapados. Sin API key → `warn` y se omite; fallo → `error` en log. **Nunca falla el request.**
7. `200` con mensaje por idioma ("Gracias. Te responderé en menos de 24 horas." / "Thanks. I will reply within 24 hours.").

**Tabla `public.leads_clients`** (migraciones `00001_create_leads_clients.sql` + `20260819213150_add_lead_attribution_fields.sql`): `id bigint identity`, `created_at timestamptz default now()`, `legal_name text not null (≤100)`, `client_email text not null (≤100)`, `phone_number text (≤30 o null)`, `message text (≤3000 o null)`, `project_type`, `budget_range`, `timeline`, `language text (en|es o null)`, `source_path`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`. **RLS habilitada**; políticas solo para `service_role` (insert y select) — `anon`/`authenticated` no tienen ninguna. Índice `idx_leads_clients_created_at (created_at desc)`.

**Legado — Edge Function `send-notification-email`** (Deno, `verify_jwt = true` en `config.toml`, exige header `x-webhook-secret` = `WEBHOOK_SECRET`, CORS a `ALLOWED_ORIGIN`): pensada para un Database Webhook de Supabase que enviara el correo al insertar. El endpoint ya envía el correo directamente, así que hoy no participa en el flujo; se conserva hasta decidir su destino (pending #2.4).

**Variables:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RECAPTCHA_SECRET_KEY`, `PUBLIC_RECAPTCHA_SITE_KEY`, `RESEND_API_KEY`, opcionales `RESEND_FROM_EMAIL`, `LEAD_NOTIFICATION_EMAIL`, `RECAPTCHA_ALLOWED_HOSTNAMES` (spec 006).

## 4. Plan (resumen as-built)

1. Tabla con RLS cerrada y migración de atribución.
2. Formulario con selects enumerados, estado accesible (`role="status"`) y script de envío con reCAPTCHA bajo demanda.
3. Endpoint con rate limit → validación → reCAPTCHA → insert → correo → respuesta localizada.
4. Variables en `.env`/Vercel; `localhost` permitido para probar.

## 5. Criterios de aceptación (as-built)

- [x] Un envío válido con score ≥ 0.5 inserta la fila con su atribución y responde 200 en el idioma del visitante aunque Resend falle o no esté configurado.
- [x] Campos faltantes, email inválido o valores fuera de las listas → 400 sin insert.
- [x] Token inválido, score bajo, acción distinta de `submit` u hostname no permitido → 403 sin insert.
- [x] Más de 5 envíos por minuto desde la misma IP (en la misma instancia) → 429.
- [x] Con la clave `anon` no se puede insertar ni leer `leads_clients` (RLS sin políticas para ese rol).
- [x] El correo llega con `reply_to` del lead, de modo que "Responder" desde el inbox escribe al cliente.
- [ ] **Deudas as-built** (pending #1 y #2): (a) el `.env` con `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY` estuvo en git (jul 2026) — **rotar claves**; (b) tres `console.log` de depuración y el objeto `debug` en la respuesta 403 exponen hostnames permitidos, banderas y prefijo del token; (c) el rate limit vive en memoria de cada instancia serverless — protección de mejor esfuerzo; (d) los textos del script ("Sending...", error genérico, etiqueta del botón) están quemados en inglés/por idioma fuera de i18n; (e) el remitente por defecto `onboarding@resend.dev` es el dominio de pruebas de Resend — para cambiar destinatario o remitente hay que verificar el dominio propio.

## 6. Decisiones

**Tomadas:** reCAPTCHA **v3** (score, sin fricción) con umbral 0.5 más comprobación de `action` y `hostname` — un formulario de captación no puede ponerle un captcha visual al cliente; la acción y el host cierran el reuso de tokens. Service role **solo en el servidor** con RLS sin políticas públicas — el navegador nunca toca Supabase. Correo **después** del insert y sin hacer fallar el request — la fuente de verdad es la tabla; el correo es aviso. `reply_to` con el email del lead — responder en un clic. Guardar atribución (`source_path`, `referrer`, `utm_*`, `language`) — saber qué página e idioma convierten. Enumeraciones del endpoint espejo de los `<select>` — el servidor no confía en el cliente. Envío a `/api/submit-clients` sin prefijo de idioma — el idioma viaja en el payload (`language`), no en la URL.

**Descartadas:** Database Webhook + Edge Function para el correo — añadía un secreto más y un salto extra; el endpoint ya tiene todo el contexto. Formulario nativo con recarga — se quiso feedback inline y reset sin perder el scroll. Doble opt-in al cliente — fricción innecesaria para un lead que Keishmer contacta a mano. Cola/reintentos para el correo — complejidad injustificada al volumen actual; si el correo se vuelve crítico, spec propia.
