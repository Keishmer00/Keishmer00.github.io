// src/lib/featured.ts
// Fuente única de los PROYECTOS DESTACADOS (spec 008): una entidad por marca que
// narra el proceso completo — briefing → investigación → branding → UX/UI → desarrollo.
// La consumen FeaturedProjects.astro (home), pages/projects.astro (listado) y
// pages/projects/[slug].astro (detalle). El catálogo por categorías sigue en projects.ts.
//
// Reglas (docs/rules.md §1.3): base en inglés (`baseFeatured`) + overrides ES (`esFeatured`)
// en el MISMO cambio. Las etiquetas de etapa ("Briefing", "Research"…) son UI y viven en
// i18n (`featured.stages.<id>`); el relato de cada etapa es contenido y vive aquí.
//
// ⚠️ Copy PROVISIONAL (redactado a partir de los casos de estudio anteriores y de
// md_marcas_ruana_nexus_karim.md / web.md). El owner entrega el definitivo — ver spec 008 §5.
//
// Imágenes: importadas desde src/assets/images/<slug>-brand/ como hace Astro (el import devuelve
// ImageMetadata: src, width, height, format). Convención de nombres — docs/images.md:
//   <slug>-index.webp → image (panel de la home, 4:5) · <slug>-hero.webp → heroImage (16:9)
//   1.webp … 9.webp   → gallery (16:9, en orden de la historia)
import type { ImageMetadata } from "astro";
import type { Lang } from "../i18n/index";

import wisegoldIndex from "../assets/images/wisegold-brand/wisegold-index.webp";
import wisegoldHero from "../assets/images/wisegold-brand/wisegold-hero.webp";
import wisegoldWeb from "../assets/images/wisegold-brand/wisegold.webp"; // provisional: única imagen de galería hasta que existan 1…9.webp

import karimIndex from "../assets/images/karim-brand/karim-index.webp";
import karimHero from "../assets/images/karim-brand/karim-hero.webp";
import karim1 from "../assets/images/karim-brand/1.webp";
import karim2 from "../assets/images/karim-brand/2.webp";
import karim3 from "../assets/images/karim-brand/3.webp";
import karim4 from "../assets/images/karim-brand/4.webp";
import karim5 from "../assets/images/karim-brand/5.webp";

import ruanaIndex from "../assets/images/ruana-brand/ruana-index.webp";
import ruanaHero from "../assets/images/ruana-brand/ruana-hero.webp";
import ruana1 from "../assets/images/ruana-brand/1.webp";
import ruana2 from "../assets/images/ruana-brand/2.webp";
import ruana3 from "../assets/images/ruana-brand/3.webp";
import ruana4 from "../assets/images/ruana-brand/4.webp";
import ruana5 from "../assets/images/ruana-brand/5.webp";

import nexusIndex from "../assets/images/nexus-brand/nexus-index.webp";
import nexusHero from "../assets/images/nexus-brand/nexus-hero.webp";
import nexus1 from "../assets/images/nexus-brand/1.webp";
import nexus2 from "../assets/images/nexus-brand/2.webp";
import nexus3 from "../assets/images/nexus-brand/3.webp";
import nexus4 from "../assets/images/nexus-brand/4.webp";
import nexus5 from "../assets/images/nexus-brand/5.webp";

import wisegoldLogo from "../assets/Logos/Logotipo_WiseGold_TM.svg";
import karimLogo from "../assets/Logos/karim-logo.svg";
import ruanaLogo from "../assets/Logos/Ruana_logo.svg";
import nexusLogo from "../assets/Logos/nexus-logo.svg";

// ─────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────

/** Vocabulario fijo de etapas. Añadir una = extender aquí + `featured.stages.<id>` en en.json y es.json. */
export const PROCESS_STAGE_IDS = ["briefing", "research", "branding", "uxui", "development"] as const;
export type ProcessStageId = (typeof PROCESS_STAGE_IDS)[number];

export type ProcessStage = {
  id: ProcessStageId;
  title: string;        // Titular narrativo de la etapa para esta marca
  body: string;         // Relato de la etapa (1–3 párrafos cortos en un string)
  images?: ImageMetadata[]; // Imágenes propias de la etapa (4:3), opcionales; sin ellas la etapa es solo texto
};

export type FeaturedProject = {
  id: string;           // Slug de la URL: /projects/{id}/
  brand: string;        // Nombre público de la marca (no se traduce)
  title: string;        // Titular del panel (storytelling)
  description: string;  // Gancho del panel (2–3 frases)
  intro: string;        // Apertura de la página de detalle
  outcome: string;      // Cierre de la página de detalle
  client: string;
  year: string;
  sector: string;
  services: string[];
  url?: string;         // Sitio del cliente (opcional)
  image: ImageMetadata;      // <slug>-index.webp — panel de la home, 4:5 (todo el alto, medio ancho en desktop; todo el panel en mobile)
  imageAlt: string;
  heroImage?: ImageMetadata; // <slug>-hero.webp — 16:9: hero del detalle y tarjeta "siguiente" en ≥ lg; si falta, se usa `image`
  logo: ImageMetadata;       // SVG de src/assets/Logos/; se pinta en blanco por CSS
  logoAlt: string;
  gallery?: ImageMetadata[]; // 1.webp … 9.webp — galería del detalle (ProjectGallery), 16:9, en orden de la historia
  stages: ProcessStage[]; // Orden de lectura
  seoTitle: string;
  seoDescription: string;
};

type StageOverride = Pick<ProcessStage, "title" | "body">;

type FeaturedOverrides = Partial<
  Pick<
    FeaturedProject,
    | "title"
    | "description"
    | "intro"
    | "outcome"
    | "sector"
    | "services"
    | "imageAlt"
    | "logoAlt"
    | "seoTitle"
    | "seoDescription"
  >
> & {
  stages?: Partial<Record<ProcessStageId, StageOverride>>;
};

// ─────────────────────────────────────────────
// Datos base (inglés) — el orden del array es el orden de presentación
// ─────────────────────────────────────────────

const baseFeatured: FeaturedProject[] = [
  {
    id: "wisegold",
    brand: "WiseGold Capital",
    title: "Turning institutional trust into a platform that speaks six languages",
    description:
      "WiseGold Capital custodies physical gold and silver for professional intermediaries across jurisdictions. Its story needed a platform as rigorous as its vaults: clear custody structures, a content engine that publishes in six languages without a manual step, and a visual system built for institutional trust.",
    intro:
      "In a regulated industry, trust is the product. WiseGold Capital came with a complex custody model — allocated versus pooled inventory, multi-tier governance with independent depositories, AML/CTF frameworks — and a global audience of intermediaries who read in six different languages. My job was to make all of that legible without making it smaller.",
    outcome:
      "WiseGold launched a multilingual platform that works both as its institutional presence and as its content engine: every new Medium article is fetched, translated into five more languages and published automatically, with millisecond page loads from PostgreSQL. The site became a credibility signal for intermediaries in Latin America, Europe and Asia evaluating its custody infrastructure.",
    client: "WiseGold Capital",
    year: "2024",
    sector: "Precious metals custody",
    services: [
      "Brand system",
      "Information architecture",
      "UX/UI design",
      "Astro SSR development",
      "Multilingual platform",
      "Blog automation",
    ],
    url: "https://wise.gold/",
    image: wisegoldIndex,
    imageAlt: "WiseGold Capital — institutional bullion custody platform, homepage",
    heroImage: wisegoldHero,
    logo: wisegoldLogo,
    gallery: [wisegoldWeb],
    logoAlt: "WiseGold Capital logo",
    stages: [
      {
        id: "briefing",
        title: "A custodian that needed to be understood in six languages",
        body: "The brief was precise: communicate an institutional custody model — advisory, vault, technology and trading — to intermediaries in different jurisdictions, and keep a Medium-based thought-leadership strategy alive for readers who do not read English. Success meant clarity for a compliance officer and credibility for a family office, in the same page.",
      },
      {
        id: "research",
        title: "Mapping how an intermediary decides to trust a vault",
        body: "I studied how professional intermediaries evaluate a custodian: what they verify first, which terms trigger doubt, and where competitor sites hide the governance details that matter. That research turned into a content hierarchy where segregation, independent depositories and compliance frameworks appear before any marketing claim.",
      },
      {
        id: "branding",
        title: "A visual system for institutional trust",
        body: "The identity was tightened into a system that could carry dense information without noise: a restrained typographic hierarchy, a dark institutional palette with a single gold accent, and iconography for the four service pillars. Every page component was designed to look the same in Arabic, Chinese or Spanish.",
      },
      {
        id: "uxui",
        title: "Breaking a complex value chain into four clear pillars",
        body: "The information architecture organises the custody chain into Advisory, Vault, Technology and Trading, guiding institutional visitors from the model to the request for platform access. Language switching, comparison tables and the blog were prototyped for six locales before a line of production code was written.",
      },
      {
        id: "development",
        title: "A content engine that publishes itself in six languages",
        body: "I built an Astro SSR platform with a Node.js backend and PostgreSQL. A cron-driven fetcher polls the Medium RSS feed every 30 minutes, stores new articles and sends them to the Azure Translator API with HTML-aware translation that preserves structure. Locale detection runs in middleware (cookie, Accept-Language, IP geolocation) and the whole stack ships on Azure VMs with Docker, Nginx and automated SSL.",
      },
    ],
    seoTitle: "WiseGold Capital — Multilingual Custody Platform, Brand to Code | Keishmer Studio",
    seoDescription:
      "How WiseGold Capital went from briefing to a six-language institutional custody platform: research, brand system, UX/UI and Astro SSR development with automated blog translation.",
  },
  {
    id: "karim",
    brand: "Karim",
    title: "A self-care ritual that starts with the box",
    description:
      "Karim is a Colombian cosmetics brand born from a family that treats beauty as a ritual of care. From the first briefing to the Shopify store, every decision protected one feeling: the customer should feel seen the moment she opens the box.",
    intro:
      "Karim sells cosmetics, accessories and beauty experiences from Barrancabermeja to the whole of Colombia. What it really sells is a ritual — curation with taste, a warm 'kawaii Colombian' soul and a relationship with its customers that is anything but transactional. The brand and the online store had to carry that ritual from the shelf to the checkout.",
    outcome:
      "Karim launched with a cohesive identity across packaging, social media and retail, and an online store that became its main digital sales channel. The unboxing experience turned into a differentiator customers share organically, and the block-based Shopify build lets the team launch seasonal campaigns and new product lines without losing the brand.",
    client: "Karim",
    year: "2024",
    sector: "Cosmetics & self-care",
    services: [
      "Brand identity",
      "Packaging design",
      "Art direction",
      "E-commerce UX/UI",
      "Shopify development",
      "Custom Liquid components",
    ],
    url: "https://karimventas.com/",
    image: karimIndex,
    imageAlt: "Karim — cosmetics packaging with the brand identity in warm pink tones",
    heroImage: karimHero,
    logo: karimLogo,
    logoAlt: "Karim logo",
    gallery: [karim1, karim2, karim3, karim4, karim5],
    stages: [
      {
        id: "briefing",
        title: "Beauty as identity, not as surface",
        body: "The founders described Karim as a family project where every purchase includes packaging, attention and a personal detail. The brief was to translate that closeness into an identity that could stand on a shelf next to luxury minimalism and mass-market brands, and then into a store that felt like the boutique itself.",
      },
      {
        id: "research",
        title: "Listening to the women who already loved the brand",
        body: "I looked at how Karim's customers talk about self-care, what they photograph when a package arrives and where generic beauty e-commerce loses warmth. The pattern was clear: the emotional peak is the unboxing, and the store had to be designed backwards from that moment.",
      },
      {
        id: "branding",
        title: "Soft pastels, tropical accents and a hand-drawn warmth",
        body: "The identity is anchored in warmth, femininity and Colombian character: soft pastels with bold tropical accents, custom typography with hand-drawn warmth and a logo that works from a lipstick cap to a storefront. Packaging was designed as a gifting experience — box, insert and label build the 'unboxing ritual'.",
      },
      {
        id: "uxui",
        title: "A boutique you can browse from your phone",
        body: "The store experience keeps the boutique's personality while handling real e-commerce work: product variants, category navigation, national shipping and a mobile checkout that stays out of the way. Layouts use fluid clamp() scaling and the Urbanist + Playfair Display pairing so the brand voice survives every screen size.",
      },
      {
        id: "development",
        title: "Custom Liquid components on a Shopify theme",
        body: "Built on the Tinker 4.1.1 theme, I developed a library of custom Liquid components: theme blocks with their own schemas, an inline SVG icon system and JSON templates for block-based page composition. The team can rearrange pages, promotions and seasonal campaigns without touching code — and without breaking the brand.",
      },
    ],
    seoTitle: "Karim — Cosmetics Brand Identity and Shopify Store, Brand to Code | Keishmer Studio",
    seoDescription:
      "The full process behind Karim, a Colombian cosmetics brand: briefing, research, brand identity and packaging, e-commerce UX/UI and a custom Shopify build with Liquid components.",
  },
  {
    id: "ruana-soul-studio",
    brand: "Ruana Soul Studio",
    title: "Where the image and the soul meet — and the site proves it",
    description:
      "Ruana Soul Studio makes films with intention, not volume. I built its identity and its website as one continuous piece of cinema: a mark born from film grain, a color story taken from the grading suite, and a scroll narrative that performs like a trailer.",
    intro:
      "Ruana Soul Studio is an audiovisual production studio in Melbourne that treats cinema as a tool for transformation, empathy and social dialogue. In a market that competes on speed and volume, it needed a brand — and a website — that filtered for the right clients: the ones who value depth over quantity.",
    outcome:
      "The identity positioned Ruana as a high-impact boutique studio rather than a traditional production house, attracting high-level productions, social-impact documentaries and co-productions. The website runs with sub-second loads and perfect Lighthouse scores, ranks on the first page for its core Melbourne searches and works as a living portfolio of everything the studio offers.",
    client: "Ruana Soul Studio",
    year: "2024",
    sector: "Audiovisual production",
    services: [
      "Brand identity",
      "Art direction",
      "Brand guidelines",
      "UX/UI design",
      "Astro SSR development",
      "SEO & AEO strategy",
    ],
    url: "https://ruanasoulstudio.com/",
    image: ruanaIndex,
    imageAlt: "Ruana Soul Studio — brand identity projected on a cinema screen",
    heroImage: ruanaHero,
    logo: ruanaLogo,
    logoAlt: "Ruana Soul Studio logo",
    gallery: [ruana1, ruana2, ruana3, ruana4, ruana5],
    stages: [
      {
        id: "briefing",
        title: "Not a content factory — a studio that creates meaningful moments",
        body: "The founders were explicit: they do not 'make content', they create moments where the image and the soul meet. The brief asked for a brand that communicates that difference and a website that demonstrates it — cinematic, technically excellent and still able to move a visitor towards a clear next step.",
      },
      {
        id: "research",
        title: "Studying a market that competes on volume",
        body: "I mapped the production studios competing for the same clients and how their sites talk: speed, packages, showreels. Ruana's differentiator was craft and cultural depth, so the research defined a positioning, project-selection criteria and a voice that would attract fewer, better-aligned briefs.",
      },
      {
        id: "branding",
        title: "A mark born from film grain and the grading suite",
        body: "The identity is rooted in cinematic quality: film textures, a refined palette that references color grading and typography that balances elegance with the avant-garde. The brand mark is a geometric abstraction of the meeting point between image and soul — the core of the studio's philosophy — documented in guidelines that cover voice and project selection.",
      },
      {
        id: "uxui",
        title: "A scroll narrative that behaves like a trailer",
        body: "Every section of the site was designed as a considered argument for working with the studio: cinematic entrance sequences, scroll-triggered storytelling with GSAP and a layout that balances information density with room to breathe. Conversion paths were designed alongside the visuals, never after them.",
      },
      {
        id: "development",
        title: "Astro SSR, GSAP and search built for AI answer engines",
        body: "I built the site with Astro SSR for performance and GSAP for the motion system. SEO and AEO were engineered from the base — JSON-LD structured data, semantic HTML hierarchy and content structured for both traditional search and AI answer engines — and the blog is fed from the studio's Medium RSS feed into the site's content ecosystem.",
      },
    ],
    seoTitle: "Ruana Soul Studio — Brand Identity and Cinematic Website, Brand to Code | Keishmer Studio",
    seoDescription:
      "How Ruana Soul Studio went from briefing to a cinematic brand and website: research, identity born from film grain, scroll storytelling UX/UI and Astro SSR development with SEO/AEO.",
  },
  {
    id: "nexus",
    brand: "Nexus",
    title: "The point where everything connects, made visible",
    description:
      "Nexus builds custom software by listening first. The brand had to say that before a single line of code: an isotype about protection and connection, a messaging framework the team could actually use, and digital touchpoints that make precision feel human.",
    intro:
      "Nexus develops custom software with a methodology that starts by listening — understanding the problem in depth before writing code. It had grown through referrals on the strength of its engineering, and needed an identity that could communicate its values to new clients without depending on word of mouth.",
    outcome:
      "The new brand gave Nexus a unified, professional presence that reflects its technical precision and human-centred philosophy. The messaging framework helps the team articulate its collaborative method, and the visual system adapts to a growing offer — from custom development to technology consulting — while staying instantly recognisable.",
    client: "Nexus",
    year: "2024",
    sector: "Custom software development",
    services: [
      "Brand architecture",
      "Logo design",
      "Visual identity",
      "Messaging framework",
      "UX/UI design",
      "Front-end development",
    ],
    image: nexusIndex,
    imageAlt: "Nexus — brand identity displayed on a tablet",
    heroImage: nexusHero,
    logo: nexusLogo,
    logoAlt: "Nexus logo",
    gallery: [nexus1, nexus2, nexus3, nexus4, nexus5],
    stages: [
      {
        id: "briefing",
        title: "Technology that serves people, not the other way around",
        body: "Nexus believes software should adapt to the user, not the reverse, and that technology should strengthen human connections. The brief was to give that philosophy a face: a brand architecture, a visual identity and a way of speaking that would scale from proposals to product interfaces.",
      },
      {
        id: "research",
        title: "Learning how Nexus listens",
        body: "I sat with the team's process — listen, question, understand, iterate, collaborate — and with the clients who had referred them. The insight was that Nexus' real product is trust built through precision, which became the strategic line every visual decision had to follow.",
      },
      {
        id: "branding",
        title: "An isotype about protection and connection",
        body: "The brand system is anchored in connection and protection: an isotype that reads as a node where everything meets, a palette that combines deep, trustworthy tones with vibrant accents of innovation, and comprehensive guidelines with a messaging framework for the team's day-to-day communication.",
      },
      {
        id: "uxui",
        title: "Interfaces where precision feels human",
        body: "The identity was extended into digital touchpoints — presentation layouts, interface components and a design language for the products Nexus builds — so that clarity, hierarchy and warmth stay consistent whether the team is pitching a proposal or shipping a dashboard.",
      },
      {
        id: "development",
        title: "A front-end foundation ready to grow with the offer",
        body: "The system was implemented as reusable front-end components and templates that the team can extend as its services grow, from custom development to technology consulting, keeping every new touchpoint aligned with the brand without a designer in the loop.",
      },
    ],
    seoTitle: "Nexus — Brand Architecture and Digital Identity, Brand to Code | Keishmer Studio",
    seoDescription:
      "The process behind Nexus, a custom software brand: briefing, research, brand architecture and isotype, UX/UI language and a reusable front-end foundation.",
  },
];

// ─────────────────────────────────────────────
// Overrides en español (por id de proyecto)
// ─────────────────────────────────────────────

const esFeatured: Record<string, FeaturedOverrides> = {
  wisegold: {
    title: "Convertir la confianza institucional en una plataforma que habla seis idiomas",
    description:
      "WiseGold Capital custodia oro y plata físicos para intermediarios profesionales en distintas jurisdicciones. Su historia necesitaba una plataforma tan rigurosa como sus bóvedas: estructuras de custodia claras, un motor de contenido que publica en seis idiomas sin pasos manuales y un sistema visual hecho para la confianza institucional.",
    intro:
      "En una industria regulada, la confianza es el producto. WiseGold Capital llegó con un modelo de custodia complejo — inventario asignado frente a consolidado, gobernanza multinivel con depositarios independientes, marcos AML/CTF — y una audiencia global de intermediarios que leen en seis idiomas distintos. Mi trabajo era hacer todo eso legible sin hacerlo más pequeño.",
    outcome:
      "WiseGold lanzó una plataforma multilingüe que funciona a la vez como presencia institucional y como motor de contenido: cada artículo nuevo de Medium se obtiene, se traduce a cinco idiomas más y se publica automáticamente, con cargas en milisegundos desde PostgreSQL. El sitio se convirtió en una señal de credibilidad para los intermediarios de Latinoamérica, Europa y Asia que evalúan su infraestructura de custodia.",
    sector: "Custodia de metales preciosos",
    services: [
      "Sistema de marca",
      "Arquitectura de información",
      "Diseño UX/UI",
      "Desarrollo Astro SSR",
      "Plataforma multilingüe",
      "Automatización del blog",
    ],
    imageAlt: "WiseGold Capital — plataforma institucional de custodia de metales, página de inicio",
    logoAlt: "Logotipo de WiseGold Capital",
    stages: {
      briefing: {
        title: "Un custodio que debía entenderse en seis idiomas",
        body: "El brief fue preciso: comunicar un modelo de custodia institucional — asesoría, bóveda, tecnología y trading — a intermediarios de distintas jurisdicciones, y mantener viva una estrategia de liderazgo de opinión en Medium para lectores que no leen inglés. El éxito era claridad para un oficial de cumplimiento y credibilidad para un family office, en la misma página.",
      },
      research: {
        title: "Mapear cómo un intermediario decide confiar en una bóveda",
        body: "Estudié cómo evalúan los intermediarios profesionales a un custodio: qué verifican primero, qué términos despiertan dudas y dónde esconden los competidores los detalles de gobernanza que importan. Esa investigación se convirtió en una jerarquía de contenido donde la segregación, los depositarios independientes y los marcos de cumplimiento aparecen antes que cualquier promesa comercial.",
      },
      branding: {
        title: "Un sistema visual para la confianza institucional",
        body: "La identidad se afinó en un sistema capaz de cargar información densa sin ruido: una jerarquía tipográfica contenida, una paleta institucional oscura con un único acento dorado e iconografía para los cuatro pilares de servicio. Cada componente se diseñó para verse igual en árabe, chino o español.",
      },
      uxui: {
        title: "Romper una cadena de valor compleja en cuatro pilares claros",
        body: "La arquitectura de información organiza la cadena de custodia en Advisory, Vault, Technology y Trading, y guía al visitante institucional desde el modelo hasta la solicitud de acceso a la plataforma. El cambio de idioma, las tablas comparativas y el blog se prototiparon para seis locales antes de escribir una línea de código de producción.",
      },
      development: {
        title: "Un motor de contenido que se publica solo en seis idiomas",
        body: "Construí una plataforma Astro SSR con backend Node.js y PostgreSQL. Un fetcher por cron consulta el RSS de Medium cada 30 minutos, guarda los artículos nuevos y los envía a Azure Translator API con una traducción consciente del HTML que preserva la estructura. La detección de idioma corre en middleware (cookie, Accept-Language, geolocalización IP) y todo el stack se despliega en VMs de Azure con Docker, Nginx y SSL automatizado.",
      },
    },
    seoTitle: "WiseGold Capital — Plataforma de custodia multilingüe, de la marca al código | Keishmer Studio",
    seoDescription:
      "Cómo WiseGold Capital pasó del briefing a una plataforma institucional de custodia en seis idiomas: investigación, sistema de marca, UX/UI y desarrollo Astro SSR con traducción automática del blog.",
  },
  karim: {
    title: "Un ritual de autocuidado que empieza en la caja",
    description:
      "Karim es una marca colombiana de cosméticos nacida de una familia que entiende la belleza como un ritual de cuidado. Del primer briefing a la tienda Shopify, cada decisión protegió una sola sensación: que la clienta se sienta vista desde que abre la caja.",
    intro:
      "Karim vende cosméticos, accesorios y experiencias de belleza desde Barrancabermeja para toda Colombia. Lo que vende en realidad es un ritual: curaduría con gusto, un alma 'kawaii colombiana' cálida y una relación con sus clientas que no tiene nada de transaccional. La marca y la tienda online tenían que llevar ese ritual del estante al checkout.",
    outcome:
      "Karim se lanzó con una identidad cohesiva en empaque, redes y punto de venta, y con una tienda online que se convirtió en su principal canal de venta digital. La experiencia de unboxing pasó a ser un diferenciador que las clientas comparten de forma orgánica, y la construcción por bloques en Shopify permite al equipo lanzar campañas de temporada y nuevas líneas sin perder la marca.",
    sector: "Cosmética y autocuidado",
    services: [
      "Identidad de marca",
      "Diseño de empaque",
      "Dirección de arte",
      "UX/UI de e-commerce",
      "Desarrollo Shopify",
      "Componentes Liquid a medida",
    ],
    imageAlt: "Karim — empaques de cosméticos con la identidad de marca en tonos rosa cálidos",
    logoAlt: "Logotipo de Karim",
    stages: {
      briefing: {
        title: "La belleza como identidad, no como superficie",
        body: "Las fundadoras describieron Karim como un proyecto familiar donde cada compra incluye empaque, atención y un detalle personal. El brief pedía traducir esa cercanía en una identidad capaz de sostenerse en un estante junto al minimalismo de lujo y a las marcas masivas, y después en una tienda que se sintiera como la boutique misma.",
      },
      research: {
        title: "Escuchar a las mujeres que ya amaban la marca",
        body: "Observé cómo hablan de autocuidado las clientas de Karim, qué fotografían cuando llega un paquete y dónde pierde calidez el e-commerce de belleza genérico. El patrón fue claro: el pico emocional es el unboxing, y la tienda había que diseñarla hacia atrás desde ese momento.",
      },
      branding: {
        title: "Pasteles suaves, acentos tropicales y una calidez dibujada a mano",
        body: "La identidad se ancla en calidez, feminidad y carácter colombiano: pasteles suaves con acentos tropicales audaces, tipografía personalizada con calidez dibujada a mano y un logotipo que funciona desde la tapa de un labial hasta una fachada. El empaque se diseñó como una experiencia de regalo: caja, inserto y etiqueta construyen el 'ritual de unboxing'.",
      },
      uxui: {
        title: "Una boutique que se recorre desde el celular",
        body: "La experiencia de la tienda conserva la personalidad de la boutique mientras resuelve el trabajo real del e-commerce: variantes de producto, navegación por categorías, envío nacional y un checkout móvil que no estorba. Los layouts usan escalado fluido con clamp() y la pareja Urbanist + Playfair Display para que la voz de la marca sobreviva en cualquier pantalla.",
      },
      development: {
        title: "Componentes Liquid a medida sobre un tema de Shopify",
        body: "Sobre el tema Tinker 4.1.1 desarrollé una biblioteca de componentes Liquid personalizados: bloques de tema con sus propios esquemas, un sistema de iconos SVG inline y plantillas JSON para componer páginas por bloques. El equipo puede reorganizar páginas, promociones y campañas de temporada sin tocar código — y sin romper la marca.",
      },
    },
    seoTitle: "Karim — Identidad de marca y tienda Shopify, de la marca al código | Keishmer Studio",
    seoDescription:
      "El proceso completo detrás de Karim, una marca colombiana de cosméticos: briefing, investigación, identidad y empaque, UX/UI de e-commerce y una tienda Shopify a medida con componentes Liquid.",
  },
  "ruana-soul-studio": {
    title: "Donde la imagen y el alma se encuentran — y el sitio lo demuestra",
    description:
      "Ruana Soul Studio hace cine con intención, no por volumen. Construí su identidad y su sitio como una sola pieza cinematográfica: una marca nacida del grano de película, una historia de color tomada de la sala de etalonaje y una narrativa de scroll que funciona como un tráiler.",
    intro:
      "Ruana Soul Studio es una productora audiovisual de Melbourne que entiende el cine como herramienta de transformación, empatía y diálogo social. En un mercado que compite por velocidad y volumen, necesitaba una marca — y un sitio web — que filtrara a los clientes correctos: los que valoran la profundidad por encima de la cantidad.",
    outcome:
      "La identidad posicionó a Ruana como un estudio boutique de alto impacto y no como una casa de producción tradicional, atrayendo producciones de alto nivel, documentales de impacto social y coproducciones. El sitio carga en menos de un segundo con puntuaciones perfectas de Lighthouse, rankea en primera página para sus búsquedas principales en Melbourne y funciona como un portafolio vivo de todo lo que ofrece el estudio.",
    sector: "Producción audiovisual",
    services: [
      "Identidad de marca",
      "Dirección de arte",
      "Guías de marca",
      "Diseño UX/UI",
      "Desarrollo Astro SSR",
      "Estrategia SEO y AEO",
    ],
    imageAlt: "Ruana Soul Studio — identidad de marca proyectada en una pantalla de cine",
    logoAlt: "Logotipo de Ruana Soul Studio",
    stages: {
      briefing: {
        title: "No una fábrica de contenido: un estudio que crea momentos significativos",
        body: "Los fundadores fueron explícitos: no 'hacen contenido', crean momentos donde la imagen y el alma se encuentran. El brief pedía una marca que comunicara esa diferencia y un sitio web que la demostrara — cinematográfico, técnicamente impecable y aun así capaz de mover al visitante hacia un siguiente paso claro.",
      },
      research: {
        title: "Estudiar un mercado que compite por volumen",
        body: "Mapeé las productoras que compiten por los mismos clientes y cómo hablan sus sitios: velocidad, paquetes, reels. El diferenciador de Ruana era el oficio y la profundidad cultural, así que la investigación definió un posicionamiento, criterios de selección de proyectos y una voz que atrajera menos briefs, pero mejor alineados.",
      },
      branding: {
        title: "Una marca nacida del grano de película y la sala de etalonaje",
        body: "La identidad se arraiga en la calidad cinematográfica: texturas fílmicas, una paleta refinada que referencia la corrección de color y una tipografía que equilibra elegancia con vanguardia. La marca gráfica es una abstracción geométrica del punto de encuentro entre la imagen y el alma — el núcleo de la filosofía del estudio — documentada en guías que cubren la voz y la selección de proyectos.",
      },
      uxui: {
        title: "Una narrativa de scroll que se comporta como un tráiler",
        body: "Cada sección del sitio se diseñó como un argumento meditado para trabajar con el estudio: secuencias de entrada cinemáticas, storytelling activado por scroll con GSAP y un layout que equilibra densidad de información con espacio para respirar. Los caminos de conversión se diseñaron junto con lo visual, nunca después.",
      },
      development: {
        title: "Astro SSR, GSAP y búsqueda pensada para motores de respuesta con IA",
        body: "Construí el sitio con Astro SSR para el rendimiento y GSAP para el sistema de movimiento. El SEO y el AEO se diseñaron desde la base — datos estructurados JSON-LD, jerarquía HTML semántica y contenido estructurado tanto para buscadores tradicionales como para motores de respuesta con IA — y el blog se alimenta del RSS de Medium del estudio dentro del ecosistema de contenido del sitio.",
      },
    },
    seoTitle: "Ruana Soul Studio — Identidad y sitio cinematográfico, de la marca al código | Keishmer Studio",
    seoDescription:
      "Cómo Ruana Soul Studio pasó del briefing a una marca y un sitio cinematográficos: investigación, identidad nacida del grano de película, UX/UI con storytelling de scroll y desarrollo Astro SSR con SEO/AEO.",
  },
  nexus: {
    title: "El punto donde todo se conecta, hecho visible",
    description:
      "Nexus desarrolla software a la medida escuchando primero. La marca tenía que decirlo antes de una sola línea de código: un isotipo sobre protección y conexión, un marco de mensajes que el equipo pudiera usar de verdad y puntos de contacto digitales que hacen sentir humana la precisión.",
    intro:
      "Nexus desarrolla software a la medida con una metodología que empieza por escuchar — entender el problema a fondo antes de escribir código. Había crecido por referidos gracias a la calidad de su ingeniería y necesitaba una identidad que comunicara sus valores a clientes nuevos sin depender del boca a boca.",
    outcome:
      "La nueva marca le dio a Nexus una presencia unificada y profesional que refleja su precisión técnica y su filosofía centrada en las personas. El marco de mensajes ayuda al equipo a articular su método colaborativo, y el sistema visual se adapta a una oferta creciente — del desarrollo a medida a la consultoría tecnológica — sin dejar de ser reconocible al instante.",
    sector: "Desarrollo de software a la medida",
    services: [
      "Arquitectura de marca",
      "Diseño de logotipo",
      "Identidad visual",
      "Marco de mensajes",
      "Diseño UX/UI",
      "Desarrollo front-end",
    ],
    imageAlt: "Nexus — identidad de marca mostrada en una tablet",
    logoAlt: "Logotipo de Nexus",
    stages: {
      briefing: {
        title: "Tecnología que sirve a las personas, no al revés",
        body: "Nexus cree que el software debe adaptarse al usuario, no al contrario, y que la tecnología debe potenciar las conexiones humanas. El brief era darle rostro a esa filosofía: una arquitectura de marca, una identidad visual y una forma de hablar que escalaran de las propuestas a las interfaces de producto.",
      },
      research: {
        title: "Aprender cómo escucha Nexus",
        body: "Me senté con el proceso del equipo — escuchar, cuestionar, entender, iterar, colaborar — y con los clientes que los habían referido. El hallazgo fue que el verdadero producto de Nexus es la confianza construida con precisión, y esa se convirtió en la línea estratégica que toda decisión visual debía seguir.",
      },
      branding: {
        title: "Un isotipo sobre protección y conexión",
        body: "El sistema de marca se ancla en conexión y protección: un isotipo que se lee como un nodo donde todo se encuentra, una paleta que combina tonos profundos y confiables con acentos vibrantes de innovación, y guías completas con un marco de mensajes para la comunicación diaria del equipo.",
      },
      uxui: {
        title: "Interfaces donde la precisión se siente humana",
        body: "La identidad se extendió a los puntos de contacto digitales — layouts de presentación, componentes de interfaz y un lenguaje de diseño para los productos que construye Nexus — para que la claridad, la jerarquía y la calidez se mantengan iguales cuando el equipo presenta una propuesta o entrega un dashboard.",
      },
      development: {
        title: "Una base front-end lista para crecer con la oferta",
        body: "El sistema se implementó como componentes y plantillas front-end reutilizables que el equipo puede extender a medida que crecen sus servicios, del desarrollo a medida a la consultoría tecnológica, manteniendo cada punto de contacto nuevo alineado con la marca sin necesitar un diseñador en el proceso.",
      },
    },
    seoTitle: "Nexus — Arquitectura de marca e identidad digital, de la marca al código | Keishmer Studio",
    seoDescription:
      "El proceso detrás de Nexus, una marca de software a la medida: briefing, investigación, arquitectura de marca e isotipo, lenguaje UX/UI y una base front-end reutilizable.",
  },
};

// ─────────────────────────────────────────────
// Localización
// ─────────────────────────────────────────────

function applySpanish(project: FeaturedProject): FeaturedProject {
  const o = esFeatured[project.id];
  if (!o) return project;
  const { stages: stageOverrides, ...fields } = o;
  return {
    ...project,
    ...fields,
    stages: project.stages.map((stage) => ({
      ...stage,
      ...(stageOverrides?.[stage.id] ?? {}),
    })),
  };
}

/** Proyectos destacados localizados, en orden de presentación. */
export function getFeaturedProjects(lang: Lang): FeaturedProject[] {
  return lang === "es" ? baseFeatured.map(applySpanish) : baseFeatured;
}

/** Base EN, sin localizar — para `getStaticPaths()`. */
export const allFeaturedProjects: readonly FeaturedProject[] = baseFeatured;

/** URL del detalle, con barra final (igual que el canonical de `SeoHead`). */
export function getFeaturedProjectUrl(id: string, lang: Lang = "en"): string {
  const prefix = lang === "es" ? "/es" : "";
  return `${prefix}/projects/${id}/`;
}

export function findFeaturedProject(slug: string, lang: Lang = "en"): FeaturedProject | null {
  return getFeaturedProjects(lang).find((project) => project.id === slug) ?? null;
}

/** Anterior y siguiente (circular) para la navegación del detalle. */
export function getAdjacentFeatured(
  id: string,
  lang: Lang = "en",
): { prev: FeaturedProject; next: FeaturedProject } | null {
  const projects = getFeaturedProjects(lang);
  const index = projects.findIndex((project) => project.id === id);
  if (index < 0 || projects.length < 2) return null;
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
