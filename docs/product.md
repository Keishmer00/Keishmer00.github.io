# Keishmer Studio — Producto

> Contexto de negocio. Lo técnico está en [architecture.md](./architecture.md); las reglas en [rules.md](./rules.md).

## Qué es

El sitio profesional de **Keishmer Pérez Torres**, que opera bajo el nombre **Keishmer Studio** (`keishmerstudio.com`): Product Designer, diseñador UX/UI, desarrollador frontend y artista visual con base en Cúcuta (Norte de Santander, Colombia), que trabaja en remoto con startups, negocios de servicios y marcas, en inglés y español. Su trabajo es **posicionar** (SEO/AEO), **demostrar** (casos de estudio) y **captar** (formulario de contacto → lead). No vende nada en línea ni tiene área privada.

La propuesta de valor que repite todo el copy: un solo socio que conecta UX/UI, sistemas de marca y desarrollo frontend, para que el cliente no divida el proyecto entre varios freelancers.

## Audiencias y piezas

- **Clientes potenciales** (startups que preparan un producto o lanzamiento; negocios de servicios que necesitan verse confiables; marcas que buscan diseño estratégico con ejecución) — landing con Hero, "A quién ayudo", Sobre mí, Proyectos destacados (cuatro marcas a pantalla completa con scroll horizontal, cada una contada como proceso briefing → investigación → branding → UX/UI → desarrollo), Proceso (Alinear → Diseñar → Construir), banda de servicios, FAQ, banda de skills y formulario de contacto; tres **páginas de servicio** (`/ux-ui-design/`, `/frontend-dev/`, `/visual-artist/`) que aterrizan búsquedas específicas; página **Sobre mí** (`/about-me/`) con trayectoria, formación y certificaciones.
- **Reclutadores y colaboradores** — `/about-me/`, perfiles enlazados (LinkedIn, GitHub, Instagram) y los proyectos destacados en `/projects/` → `/projects/{slug}/` (intro, meta, las cinco etapas del proceso, cierre, galería navegable).
- **Buscadores y motores de respuesta con IA** — JSON-LD (`Person`, `ProfessionalService`, `WebSite`, `WebPage`, `BreadcrumbList`, `ItemList`, `CreativeWork`), sitemap, `robots.txt` y `llms.txt` en los dos idiomas.
- **El propio Keishmer (interno)** — los leads llegan a la tabla `leads_clients` de Supabase y a su correo vía Resend; no hay panel de administración (se consultan desde el dashboard de Supabase).

## Idiomas

2 idiomas con **inglés como base**: `en` en la raíz (`/`, `/projects/`, …) y `es` bajo `/es/`. No hay detección automática: el visitante aterriza en el idioma de la URL y cambia con el selector EN/ES del navbar. Nombre público de la marca: **Keishmer Studio**; el autor firma como **Keishmer Pérez Torres**. Lo visible hoy son los cuatro destacados (WiseGold Capital, Karim, Ruana Soul Studio, Nexus); el catálogo por categorías anterior se retiró.

## Fuentes de contenido

El copy de los casos de estudio y de "Sobre mí" se redactó a partir de los archivos de investigación que viven en la raíz del repo: `cv_keishmer_perez.md` (trayectoria y certificaciones), `md_marcas_ruana_nexus_karim.md` y `web.md` (marcas y sitios de los clientes). Son material de referencia, no se renderizan.

## Entornos

| Entorno | Dominio | Nota |
|---|---|---|
| Producción | `keishmerstudio.com` | Vercel; único host con canonicals y sitemap |
| Local | `localhost:4321` | `pnpm dev`; reCAPTCHA acepta `localhost` por defecto |

No hay entorno de staging propio (Vercel genera previews por deploy si el proyecto está conectado a Git — ver [spec 006](../specs/006-infra-and-deploy/spec.md)).

## Qué NO es este sitio

No tiene tienda, blog, cuentas de usuario ni panel interno. El único "backend" propio es el endpoint que recibe el formulario de contacto. Las páginas de servicio describen la oferta, no venden paquetes con precio.
