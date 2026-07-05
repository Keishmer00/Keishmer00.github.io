// src/lib/projects.ts
// Central data source for all portfolio projects.
// Used by Works.astro (grid) and pages/projects/[category]/[slug].astro (detail pages).
import type { Lang } from "../i18n/index";
import karimBrand from "../assets/images/karim-brand.webp" 
import karim1 from "../assets/images/karim-brand/1.webp"
import karim2 from "../assets/images/karim-brand/2.webp"
import karim3 from "../assets/images/karim-brand/3.webp"
import karim4 from "../assets/images/karim-brand/4.webp"
import karim5 from "../assets/images/karim-brand/5.webp"
import nexusBrand from "../assets/images/nexus-brand.webp"
import nexus1 from "../assets/images/nexus-brand/1.webp"
import nexus2 from "../assets/images/nexus-brand/2.webp"
import nexus3 from "../assets/images/nexus-brand/3.webp"
import nexus4 from "../assets/images/nexus-brand/4.webp"
import nexus5 from "../assets/images/nexus-brand/5.webp"
import moBrand from "../assets/images/mo-brand.webp"
import mo1 from "../assets/images/mo-brand/1.webp"
import mo2 from "../assets/images/mo-brand/2.webp"
import mo3 from "../assets/images/mo-brand/3.webp"
import mo4 from "../assets/images/mo-brand/4.webp"
import mo5 from "../assets/images/mo-brand/5.webp"
import ruanaBrand from "../assets/images/ruana-brand.webp"
import ruana1 from "../assets/images/ruana-brand/1.png"
import ruana2 from "../assets/images/ruana-brand/2.png"
import ruana3 from "../assets/images/ruana-brand/3.png"
import ruana4 from "../assets/images/ruana-brand/4.png"
import ruana5 from "../assets/images/ruana-brand/5.png"


export type WorkItem = {
  id: string;
  title: string;
  tagline: string;            // Short card description (landing)
  description: string;        // Long project overview (detail page)
  challenge: string;          // Problem the client faced
  solution: string;           // What Ruana Soul Studio delivered
  outcome: string;            // Results / impact
  client: string;
  year: string;
  services: string[];
  image: string;              // Hero / cover image
  imageAlt: string;
  gallery: string[];          // 7 additional images
  ctaLabel: string;
  seoTitle: string;
  seoDescription: string;
};

export type WorkCategory = {
  id: string;
  label: string;
  statement: string;
  categoryDescription: string; // Detailed description for SEO on detail pages
  works: WorkItem[];
};

type TextMap = Record<string, string>;

// ─────────────────────────────────────────────
// Spanish text overrides for the Works grid
// ─────────────────────────────────────────────
const esLabels: TextMap = {
  "branding": "Branding",
  "web-dev": "Desarrollo Web",
  "ux-ui": "UX/UI",
  "Art works": "Obras Artísticas",
};

const esStatements: TextMap = {
  "branding": "Cada detalle que creamos lleva claridad con intención. Así diseñamos identidades que perduran.",
  "web-dev": "Código limpio, cargas rápidas y estructura pensada — sitios web construidos para rendir y crecer con tu marca.",
  "social-media": "Historias que detienen el scroll y se quedan en la memoria. Contenido moldeado para cada plataforma.",
  "audiovisual": "Movimiento y sonido que transmiten emoción. Producimos visuales que se sienten cinematográficos, auténticos y vivos.",
};

const esProjectTitles: TextMap = {
  "Karim": "Karim",
  "nexus-platform": "NEXUS PLATFORM",
  "MO-TECH SERVICE": "MO-TECH SERVICE",
  "ruanasoulstudio": "Ruana Soul Studio",
  "ruana-studio": "RUANA SOUL STUDIO",
  "arch-gallery": "ARCH GALLERY",
  "event-landing": "SUMMIT EVENTS",
  "saas-docs": "NEXUS DOCS",
  "fashion-drop": "FASHION DROP",
  "cafe-stories": "CAFÉ STORIES",
  "fitness-series": "PULSE FITNESS",
  "wedding-reel": "EVER AFTER",
  "wedding-film": "AMALFI VOWS",
  "brand-spot": "ROAST SPOT",
  "event-recap": "DESIGN WEEK",
  "product-bts": "VERDE BTS",
};

const esTaglines: TextMap = {
  "the-cakery": "Identidad visual y sistema de empaque para una panadería artesanal con tono audaz y divertido.",
  "nexus-platform": "Arquitectura de marca y guías digitales para un ecosistema de productos B2B.",
  "mo-tech-service": "Identidad de marca completa y sistema visual para una empresa nacional de field service de ATMs y cajeros crypto con cobertura en más de 35 estados.",
  "ruanasoulstudio": "Redefiniendo la presencia digital de un estudio emergente de marca y diseño.",
  "ruana-studio": "Sitio web de alto rendimiento con narrativa scroll y estructura preparada para CMS.",
  "arch-gallery": "Portafolio headless con optimización de imágenes y transiciones de página sutiles.",
  "event-landing": "Página de aterrizaje de alta conversión con integración de venta de entradas y agenda en vivo.",
  "saas-docs": "Centro de documentación con búsqueda, referencias API versionadas y modo oscuro.",
  "fashion-drop": "Reels y plantillas de carrusel para una campaña de lanzamiento de moda urbana de temporada.",
  "cafe-stories": "Frames diarios para historias y cuadrículas de feed que destacan origen y artesanía.",
  "fitness-series": "Shorts con movimiento y publicaciones estáticas para un estudio de entrenamiento boutique.",
  "wedding-reel": "Reels cinematográficos y tableros estilo Pinterest para clientes de bodas.",
  "wedding-film": "Film de boda de día completo con cobertura de dron y entregas con corrección de color.",
  "brand-spot": "Spot principal de 30 segundos y versiones cortas para redes sociales y pantallas en tienda.",
  "event-recap": "Ediciones resumen del mismo día y paquetes de destacados de ponentes para un festival de diseño.",
  "product-bts": "Serie detrás de escenas documentando el photoshoot de lanzamiento de una marca de cuidado de la piel.",
};

const esCtaLabels: TextMap = {
  "View details": "Ver detalles",
};

const esDescriptions: TextMap = {
  "mo-tech-service":
    "Move On Tech Service es una empresa de field service con cobertura nacional, especializada en instalación, reparación y mantenimiento de ATMs y cajeros crypto en más de 35 estados de Estados Unidos. Nos contactaron para construir una marca que igualara su escala operativa y comunicara confiabilidad, experiencia técnica y velocidad — los valores que sus equipos de campo representan cada día. Desarrollamos un sistema completo de identidad de marca que incluye diseño de logotipo, paleta de color, tipografía, lineamientos visuales y materiales de documentación, posicionándolos como el socio de servicio técnico de referencia para redes de autoservicio financiero.",
};

const esChallenges: TextMap = {
  "mo-tech-service":
    "Move On Tech Service había crecido rápidamente por recomendación boca a boca, construyendo una sólida reputación operativa sin una identidad visual correspondiente. Sus materiales de marca eran inconsistentes: los técnicos usaban diferentes formatos de documentos, su presencia digital carecía de cohesión y no existía un lenguaje visual unificado que operadores y socios pudieran reconocer. El desafío fue crear una marca que reflejara su rigor operativo, alcance nacional y experiencia técnica, al mismo tiempo que se sintiera moderna, confiable y escalable.",
};

const esSolutions: TextMap = {
  "mo-tech-service":
    "Desarrollamos un sistema completo de identidad de marca anclado en claridad, movimiento y precisión técnica. El logotipo combina precisión geométrica con impulso hacia adelante, haciendo referencia tanto a la conectividad de las redes de ATMs como a la movilidad del servicio en campo. La paleta de color utiliza azul marino profundo para confianza y autoridad, naranja eléctrico para visibilidad y energía, y grises limpios para documentación técnica. Diseñamos un sistema cohesivo de lineamientos de marca, plantillas de reportes de servicio, conceptos de uniformes para técnicos y activos digitales que garantizan consistencia en cada punto de contacto con el cliente.",
};

const esOutcomes: TextMap = {
  "mo-tech-service":
    "La nueva identidad de marca le dio a Move On Tech Service una presencia profesional y unificada que iguala su excelencia operativa. Sus técnicos de campo ahora portan documentación de servicio consistente y con marca. Los lineamientos de marca permiten que su equipo en crecimiento mantenga consistencia visual sin cuellos de botella de diseño. La estructura modular del sistema soporta el crecimiento futuro — desde agregar nuevas líneas de servicio hasta expandirse a plataformas digitales — mientras que la jerarquía visual clara ayuda a los operadores a reconocer de inmediato la calidad y confiabilidad detrás de cada llamada de servicio.",
};

const esSeoTitles: TextMap = {
  "mo-tech-service":
    "Move On Tech Service — Identidad de Marca y Sistema Visual para Field Service de ATMs | Keishmer Studio",
};

const esSeoDescriptions: TextMap = {
  "mo-tech-service":
    "Sistema completo de identidad de marca para Move On Tech Service, una empresa de field service de ATMs y cajeros crypto con cobertura en más de 35 estados. Logotipo, sistema visual y guías de marca creados por Keishmer Studio.",
};

const esImageAlts: TextMap = {
  "mo-tech-service":
    "Move On Tech Service — Identidad de marca y sistema visual para servicio técnico de ATMs y cajeros crypto",
};

const esServices: Record<string, string[]> = {
  "mo-tech-service": [
    "Identidad de Marca",
    "Diseño de Logotipo",
    "Sistema Visual",
    "Paleta de Color",
    "Tipografía",
    "Guías de Marca",
    "Plantillas de Documentos",
    "Activos Digitales",
  ],
};

function applySpanishOverrides(categories: WorkCategory[]): WorkCategory[] {
  return categories.map((cat) => ({
    ...cat,
    label: esLabels[cat.id] ?? cat.label,
    statement: esStatements[cat.id] ?? cat.statement,
    works: cat.works.map((work) => ({
      ...work,
      title: esProjectTitles[work.id] ?? work.title,
      tagline: esTaglines[work.id] ?? work.tagline,
      ctaLabel: esCtaLabels[work.ctaLabel] ?? work.ctaLabel,
      description: esDescriptions[work.id] ?? work.description,
      challenge: esChallenges[work.id] ?? work.challenge,
      solution: esSolutions[work.id] ?? work.solution,
      outcome: esOutcomes[work.id] ?? work.outcome,
      seoTitle: esSeoTitles[work.id] ?? work.seoTitle,
      seoDescription: esSeoDescriptions[work.id] ?? work.seoDescription,
      imageAlt: esImageAlts[work.id] ?? work.imageAlt,
      services: esServices[work.id] ?? work.services,
    })),
  }));
}

export function getCategories(lang: Lang): WorkCategory[] {
  if (lang === "es") {
    return applySpanishOverrides(baseCategories);
  }
  return baseCategories;
}

const baseCategories: WorkCategory[] = [
  // ─────────────────────────────────────────────
  // BRANDING
  // ─────────────────────────────────────────────
  {
    id: "branding",
    label: "Branding",
    statement:
      "Every detail we craft carries clarity with intention. That's how we design identities that endure.",
    categoryDescription:
      "We build brand identities from the inside out — from naming and strategy to visual systems and print. Every Ruana Soul Studio branding project is rooted in your story and designed to own its space in the market.",
    works: [
      {
        id: "the-cakery",
        title: "KARIM",
        tagline:
          "Visual identity and packaging system for an artisan bakery with a bold, playful tone.",
        description:
          "The Cakery came to us as a home-based bakery ready to open its first brick-and-mortar location in Melbourne's inner north. The founders wanted a brand that felt handcrafted yet confident — something that could hold its own on a high street while staying warm and approachable. We developed a complete visual identity system from the ground up, covering logo design, color palette, typography, packaging, and in-store collateral.",
        challenge:
          "The bakery market is saturated with either overly rustic aesthetics or clinical minimalism. The Cakery needed a middle ground — playful energy with enough polish to attract a design-savvy Melbourne crowd and justify a premium price point.",
        solution:
          "We grounded the identity in a bold wordmark with hand-drawn lettering, paired with a warm cream and terracotta palette. Packaging became the hero touchpoint: every box, bag, and label was designed as a gifting moment. We created a modular pattern system from illustrated fruit and flora that could flex across formats without losing coherence.",
        outcome:
          "Launch day sold out. Within two months the brand was featured in a local food editorial. The Cakery now operates two locations and uses the identity system across retail, social media, and seasonal campaign merchandise.",
        client: "The Cakery",
        year: "2024",
        services: ["Brand Strategy", "Logo Design", "Packaging", "Print Collateral"],
        image: karimBrand.src,
        imageAlt: "The Cakery branding — citrus still life with packaging",
        gallery: [
          karim1.src,
          karim2.src,
          karim3.src,
          karim4.src,
          karim5.src,
        ],
        ctaLabel: "View details",
        seoTitle: "The Cakery — Artisan Bakery Brand Identity | Ruana Soul Studio",
        seoDescription:
          "How Ruana Soul Studio designed The Cakery's complete visual identity and packaging system — a bold, playful brand for an artisan Melbourne bakery.",
      },
      {
        id: "nexus-platform",
        title: "NEXUS PLATFORM",
        tagline:
          "Brand architecture and digital guidelines for a B2B product ecosystem.",
        description:
          "Nexus Platform is a growing B2B SaaS ecosystem serving operations teams in logistics and supply chain. By the time they approached us, they had six products operating under inconsistent naming, visual languages, and tone of voice. We were brought in to create a unified brand architecture that could scale across their portfolio while giving each product its own clear identity lane.",
        challenge:
          "Each Nexus product had been designed by different teams at different points in time. There was no shared design language, no consistent typography or color logic, and no documentation. Customers found the product suite confusing. Sales couldn't explain the family structure in a pitch.",
        solution:
          "We conducted a full brand audit and stakeholder interviews before writing a brand architecture framework. The system uses a master brand with endorsed sub-brand logic — each product inherits core elements but operates with defined accent colors and iconography. We created a comprehensive design system in Figma, a brand book, and digital guidelines for their internal design and marketing teams.",
        outcome:
          "Six months post-launch, NPS scores increased by 18 points. The sales team reported shorter pitch cycles and higher clarity from prospects. Internal teams shipped new materials 40% faster using the guidelines.",
        client: "Nexus Platform",
        year: "2024",
        services: ["Brand Architecture", "Design System", "Brand Book", "Digital Guidelines"],
        image: nexusBrand.src,
        imageAlt: "Nexus Platform branding — tech workspace with brand assets",
        gallery: [
        nexus1.src,
        nexus2.src,
        nexus3.src,
        nexus4.src,
        nexus5.src,
        ],
        ctaLabel: "View details",
        seoTitle: "Nexus Platform — B2B Brand Architecture | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio built the brand architecture and design system for Nexus Platform's B2B SaaS product ecosystem — unifying six products under one visual language.",
      },
      {
        id: "mo-tech-service",
        title: "MO-TECH SERVICE",
        tagline:
          "Complete brand identity and visual system for a nationwide ATM and crypto ATM field service company operating in 35+ states.",
        description:
          "Move On Tech Service is a nationwide field service company specializing in ATM and crypto ATM installation, repair, and maintenance across 35+ states in the US. They approached us needing a brand that could match their operational scale and communicate reliability, technical expertise, and speed — the values their field teams embody every day. We built a comprehensive brand identity system including logo design, color palette, typography, visual guidelines, and documentation materials that position them as the trusted field service partner for financial self-service networks.",
        challenge:
          "Move On Tech Service had grown rapidly by word of mouth, building a strong operational reputation without a corresponding visual identity. Their brand materials were inconsistent: technicians used different document formats, their digital presence lacked cohesion, and there was no unified visual language that operators and partners could recognize. The challenge was to create a brand that reflected their operational rigor, national reach, and technical expertise — while feeling modern, trustworthy, and scalable.",
        solution:
          "We developed a complete brand identity system anchored in clarity, movement, and technical precision. The logo combines geometric precision with forward momentum — referencing both the connectivity of ATM networks and the mobility of field service. The color palette uses deep navy for trust and authority, electric orange for visibility and energy, and clean grays for technical documentation. We designed a cohesive system of brand guidelines, service report templates, technician uniform concepts, and digital assets that ensure consistency across every customer touchpoint.",
        outcome:
          "The new brand identity gave Move On Tech Service a professional, unified presence that matched their operational excellence. Their field technicians now carry consistent, branded service documentation. The brand guidelines enable their growing team to maintain visual consistency without design bottlenecks. The system's modular structure supports future growth — from adding new service lines to expanding into digital platforms — while the clear visual hierarchy helps operators immediately recognize the quality and reliability behind every service call.",
        client: "Move On Tech Service",
        year: "2024",
        services: ["Brand Identity", "Logo Design", "Visual System", "Color Palette", "Typography", "Brand Guidelines", "Document Templates", "Digital Assets"],
        image: moBrand.src,
        imageAlt: "Move On Tech Service — Brand identity and visual system for ATM and crypto ATM field service",
        gallery: [mo1.src, mo2.src, mo3.src, mo4.src, mo5.src],
        ctaLabel: "View details",
        seoTitle: "Move On Tech Service — Brand Identity & Visual System for ATM Field Service | Keishmer Studio",
        seoDescription:
          "Complete brand identity system for Move On Tech Service, a nationwide ATM and crypto ATM field service company operating in 35+ states. Logo design, visual system, and brand guidelines crafted by Keishmer Studio.",
      },
      {
        id: "ruanasoulstudio",
        title: "Ruana Soul Studio",
        tagline:
          "Redefining the digital presence of an emerging brand and design studio",
        description:
          "Ruana Soul Studio is a brand identity and web design studio based in Melbourne, Australia. We specialize in creating unique and memorable brands that stand out from the crowd.",
        challenge:
          "Ruana Soul Studio is a brand identity and web design studio based in Melbourne, Australia. We specialize in creating unique and memorable brands that stand out from the crowd.",
        solution:
          "We built the identity around the idea of 'botanical precision' — the meeting point of science and nature. The primary mark is a geometric interpretation of a botanical cross-section. We specified premium uncoated stocks for packaging, with foil accents in sage green and warm gold. Every touchpoint — from outer box to product insert — was designed as a considered ritual object.",
        outcome:
          "We helped transform Ruana Soul Studio from a freelance operation into a recognized design studio. By clearly defining their niche, refining their visual systems, and launching a modern, strategic website, we created a foundation that has supported consistent client acquisition and industry recognition. The studio now operates with a clear point of view and a visual presence that reflects the quality of work they deliver.",
        client: "Ruana Soul Studio",
        year: "2024",
        services: ["Brand Identity", "Packaging Design", "Retail Strategy", "Print Production"],
        image: ruanaBrand.src,
        imageAlt: "Ruana Soul Studio - Identity and Web Design",
        gallery: [
          ruana1.src,
          ruana2.src,
          ruana3.src,
          ruana4.src,
          ruana5.src,
        ],
        ctaLabel: "View details",
        seoTitle: "Verde Botánica — Luxury Skincare Brand Identity | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio created Verde Botánica's luxury skincare visual identity — tactile print finishes, premium packaging, and a brand built for shelf presence.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // WEB DEV
  // ─────────────────────────────────────────────
  {
    id: "web-dev",
    label: "Web Dev",
    statement:
      "Clean code, fast loads, and thoughtful structure — websites built to perform and grow with your brand.",
    categoryDescription:
      "We design and build websites that are fast, accessible, and built to rank. Every Ruana Soul Studio web project starts with strategy and ends with a site that earns its keep — turning visitors into clients.",
    works: [
      {
        id: "ruana-studio",
        title: "RUANA SOUL STUDIO",
        tagline:
          "Performance-focused marketing site with scroll storytelling and CMS-ready structure.",
        description:
          "This is the site you're looking at right now. We built Ruana Soul Studio's own marketing site as a live demonstration of what we do best: scroll-driven storytelling, performance-first engineering, and design that earns trust fast. The project served as a proving ground for our own process — treating ourselves as a client with the highest possible standards.",
        challenge:
          "Most agency websites are either a visual playground with no conversion strategy, or a template site with no personality. We needed to build something that was genuinely beautiful, technically excellent, and moved visitors toward a clear next step.",
        solution:
          "We used Astro for static generation with zero JavaScript overhead by default. GSAP powers the scroll storytelling and cinematic entrance animations. The design system uses custom typography, a refined color palette, and a layout grid that balances information density with breathing room. Every section is a considered argument for working with us.",
        outcome:
          "The site achieves a perfect Lighthouse score. Page load under 1 second. The contact form converts at above-industry-average rates. It ranks on page one for our primary search terms in Melbourne.",
        client: "Ruana Soul Studio",
        year: "2024",
        services: ["Web Design", "Astro Development", "GSAP Animation", "SEO"],
        image:
          "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Ruana Soul Studio — marketing site development",
        gallery: [
          "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "View details",
        seoTitle: "Ruana Soul Studio Website — Design & Development Case Study",
        seoDescription:
          "Behind the build: how Ruana Soul Studio designed and developed its own performance marketing site with Astro, GSAP, and a conversion-first approach.",
      },
      {
        id: "arch-gallery",
        title: "ARCH GALLERY",
        tagline:
          "Headless portfolio with image optimization and subtle page transitions.",
        description:
          "Arch Gallery is a contemporary art gallery in Melbourne's CBD, representing emerging and mid-career artists across painting, sculpture, and digital media. They needed a digital home that matched the ambition of the work they show — a site where art is the hero and everything else gets out of the way.",
        challenge:
          "Gallery websites tend to compromise: either they look stunning but load slowly (destroying the art viewing experience), or they're fast but visually forgettable. Art deserves better. The site also needed to handle large, high-resolution images without degrading performance.",
        solution:
          "We built a headless architecture using Astro with a custom CMS integration. Every image passes through an optimisation pipeline — correctly sized, lazy-loaded, and served in next-gen formats. Page transitions use a custom GSAP clip-path reveal so navigating between works feels like turning gallery pages. The layout is intentionally restrained: dark backgrounds, generous white space, and typography that steps back.",
        outcome:
          "Load times dropped 70% from their previous WordPress site. Average session time increased by 3 minutes. Online enquiries for represented artists increased by 45% in the first quarter post-launch.",
        client: "Arch Gallery",
        year: "2023",
        services: ["Web Design", "Headless CMS", "Performance Optimization", "GSAP Animation"],
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Arch Gallery — headless portfolio website",
        gallery: [
          "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "Explore options",
        seoTitle: "Arch Gallery — Headless Portfolio Website | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio built Arch Gallery's headless portfolio website — image-optimized, lightning-fast, with GSAP page transitions built for the contemporary art world.",
      },
      {
        id: "event-landing",
        title: "SUMMIT EVENTS",
        tagline:
          "High-conversion landing with ticketing integration and live agenda updates.",
        description:
          "Summit Events runs premium professional development conferences for the architecture and design industry. For their flagship annual event, they needed a landing page capable of driving ticket sales, communicating a packed agenda, and handling real-time updates as speakers were confirmed — all while reflecting the premium positioning of the event itself.",
        challenge:
          "Event landing pages live and die by one thing: conversion. But this one also needed to function as a live information hub for weeks before the event — updating speaker bios, session times, and venue details without developer intervention.",
        solution:
          "We built a high-fidelity landing page connected to a lightweight CMS for agenda management. The ticketing flow is integrated directly into the page with a drawer-style checkout — no redirects. Above the fold we put the single most important piece of information: the date, the city, and the CTA. Everything below supports the decision to buy.",
        outcome:
          "Tickets sold out in 11 days — 3 weeks ahead of their previous record. The page handled 4,200 unique visitors on launch day with zero downtime. Conversion rate on the ticketing CTA was 8.4%.",
        client: "Summit Events",
        year: "2024",
        services: ["Landing Page Design", "CMS Integration", "Ticketing UX", "Performance"],
        image:
          "https://images.unsplash.com/photo-1505373877847-8d25f39a466a?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Summit Events — high-conversion event landing page",
        gallery: [
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1492538368677-f6e0afe31dab?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1550305080-4e029753abcf?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "View details",
        seoTitle: "Summit Events — Event Landing Page Design | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio built Summit Events' high-conversion conference landing page — integrated ticketing, live agenda updates, and sold out in 11 days.",
      },
      {
        id: "saas-docs",
        title: "NEXUS DOCS",
        tagline:
          "Documentation hub with search, versioned API references, and dark mode.",
        description:
          "Following our branding work with Nexus Platform, their engineering team commissioned us to design and build their documentation hub. Developer documentation is a product in itself — bad docs kill adoption. We treated this as a UX and design challenge as much as an engineering one.",
        challenge:
          "Nexus had six products with distinct APIs and workflows. Their existing docs were a mix of Notion pages, PDF guides, and GitHub readmes with no consistent structure or search. Developers were churning at the integration stage because they couldn't find what they needed.",
        solution:
          "We designed a documentation system with a three-panel layout: global navigation, section tree, and content. Search is powered by a local index for instant results. The system supports versioned API references with automatic diff highlighting. Dark mode is first-class — not an afterthought. Code blocks use syntax highlighting with one-click copy. Every page has an estimated reading time and a feedback widget.",
        outcome:
          "Time-to-first-integration dropped from an average of 4.2 days to 1.8 days after launch. Developer satisfaction scores increased by 31%. Support ticket volume for integration questions dropped 55%.",
        client: "Nexus Platform",
        year: "2024",
        services: ["UX Design", "Documentation System", "Search Integration", "Dark Mode"],
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538a199?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Nexus Docs — developer documentation hub design",
        gallery: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1562813733-b31f71025d54?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "View details",
        seoTitle: "Nexus Docs — Developer Documentation Hub | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio designed Nexus Platform's developer documentation hub — versioned API references, instant search, and dark mode that cut integration time in half.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // UX/UI
  // ─────────────────────────────────────────────
  {
    id: "ux-ui",
    label: "UX/UI",
    statement:
      "Stories that stop the scroll and stay in memory. Content shaped for each platform.",
    categoryDescription:
      "We create social media content that is strategic, on-brand, and built for the algorithm without sacrificing creativity. From Reels to carousels, we shape content that earns attention and drives action.",
    works: [
      {
        id: "fashion-drop",
        title: "FASHION DROP",
        tagline:
          "Reels and carousel templates for a seasonal streetwear launch campaign.",
        description:
          "Fashion Drop is a Melbourne streetwear label known for limited-quantity seasonal releases. For their Summer 2024 drop they needed a social media campaign that could generate anticipation pre-launch, drive traffic on drop day, and extend the conversation post-sell-out. We handled creative direction, production, and content strategy across Instagram and TikTok.",
        challenge:
          "Streetwear social media is visually overcrowded. Every brand is doing cinematic moodshots and flat-lay product shots. Fashion Drop needed to look different, move differently, and feel authentic to their community — not like a polished brand trying too hard.",
        solution:
          "We led with movement and contrast. The pre-launch campaign used fragmented, high-contrast teaser Reels that revealed the collection one detail at a time. Drop day content led with real faces — community members, not models. Post-sell-out we published a 'making of' carousel series that created demand for the next drop. All creative was delivered as a template system so the internal team could adapt future content.",
        outcome:
          "The campaign reached 280K accounts organically in the first 72 hours. Drop day sold out in 4 hours — their fastest sell-through to date. The TikTok campaign delivered 1.2M views. Template adoption by the internal team saved 12 hours per week of creative production.",
        client: "Fashion Drop",
        year: "2024",
        services: ["Creative Direction", "Reels Production", "Carousel Design", "Content Strategy"],
        image:
          "https://images.unsplash.com/photo-1483985988354-763728e3685b?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Fashion Drop — streetwear social media campaign",
        gallery: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "View details",
        seoTitle: "Fashion Drop — Streetwear Social Media Campaign | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio ran Fashion Drop's Summer 2024 launch campaign — Reels, carousels, and content strategy that sold out in 4 hours and reached 280K accounts.",
      },
      {
        id: "cafe-stories",
        title: "CAFÉ STORIES",
        tagline:
          "Daily story frames and feed grids highlighting origin and craft.",
        description:
          "Café Stories is a specialty coffee and community space in Fitzroy, Melbourne. They built their following through genuine hospitality and great coffee — but their social presence wasn't doing justice to the experience they create daily. We were brought in to build a content system that felt as considered as their café itself.",
        challenge:
          "The café team had no dedicated social media person. Content was inconsistent, irregular, and shot on phones without a visual strategy. They were losing potential new customers who were 'doing research' on their Instagram before visiting.",
        solution:
          "We created a complete social content system: a grid template set in Figma, a story frame library, a photography brief for their team, and a 3-month content calendar. The visual system uses warm tones, close-up textures, and a consistent typographic voice. We trained the team to produce content themselves using the templates — no ongoing agency dependency required.",
        outcome:
          "Follower growth increased 340% in the first three months. Post reach tripled. Walk-in foot traffic increased noticeably, with customers frequently mentioning Instagram as their discovery point. The team now produces consistent content independently.",
        client: "Café Stories",
        year: "2023",
        services: ["Content Strategy", "Social Templates", "Photography Brief", "Content Calendar"],
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Café Stories — specialty coffee social media content system",
        gallery: [
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1516637090014-9e3d0b32c3c5?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1521302200778-33500795e128?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1462966854575-8c36a5bcf1c8?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "Explore options",
        seoTitle: "Café Stories — Coffee Shop Social Media Strategy | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio built Café Stories' social media content system — templates, strategy, and training that grew their following 340% in three months.",
      },
      {
        id: "fitness-series",
        title: "PULSE FITNESS",
        tagline:
          "Motion-led shorts and static posts for a boutique training studio.",
        description:
          "Pulse Fitness is a boutique strength and conditioning studio in South Yarra. Their training is serious and results-driven, and they needed social content that reflected the intensity and community of their studio — without falling into the generic fitness content trap of before/after shots and motivational quotes.",
        challenge:
          "The fitness social media space is enormously crowded. Standing out requires either a charismatic personal brand (which the studio didn't want to build around one person) or a distinctive aesthetic and content voice that makes the studio feel like a place you want to be part of.",
        solution:
          "We developed a content strategy built around two pillars: the work and the people. The work pillar covers technique videos, session structure, and training philosophy — content with genuine educational value. The people pillar covers member milestones, coach spotlights, and real training moments. Visually we leaned into contrast and motion: fast edits with heavy sound design, and stills that capture the texture of real effort.",
        outcome:
          "Studio membership increased by 28% in the 6 months following the launch of the new content strategy. Their Reels regularly reach 15K–40K accounts organically. Trial session enquiries through Instagram DMs increased by 180%.",
        client: "Pulse Fitness",
        year: "2024",
        services: ["Content Strategy", "Reels Production", "Photography Direction", "Copywriting"],
        image:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Pulse Fitness — boutique training studio social media",
        gallery: [
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "View details",
        seoTitle: "Pulse Fitness — Boutique Studio Social Media | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio created Pulse Fitness' social content strategy — motion-led Reels and photography that grew studio membership by 28% in six months.",
      },
      {
        id: "wedding-reel",
        title: "EVER AFTER",
        tagline:
          "Cinematic highlight reels and Pinterest-ready boards for wedding clients.",
        description:
          "Ever After is a Melbourne wedding planning and styling company specialising in intimate, design-forward ceremonies. They came to us needing a social media presence that could attract a very specific client: design-literate couples who want a wedding that feels nothing like a wedding. Their aesthetic is editorial, organic, and deeply personal.",
        challenge:
          "Wedding social media is dominated by the same three aesthetics: rustic barns, white marquees, and tropical resorts. Ever After's actual work was far more interesting — but their social presence didn't reflect it. They were attracting the wrong enquiries.",
        solution:
          "We created a cinematic content identity: colour-graded highlight reels in a signature warm-cool contrast ratio, editorial still photography briefs for their partner photographers, and a Pinterest board architecture that functioned as a curated mood collection rather than a promotional tool. We also developed a captioning voice that told the story of each couple without being saccharine.",
        outcome:
          "Enquiry quality transformed within two months. Ever After began receiving direct DM enquiries from exactly their target client. Their Pinterest monthly views grew from 2,000 to 67,000 in four months. Three clients in their first year cited Pinterest or Instagram as their primary discovery channel.",
        client: "Ever After",
        year: "2023",
        services: ["Creative Direction", "Reel Editing", "Pinterest Strategy", "Brand Voice"],
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Ever After — cinematic wedding highlights social media",
        gallery: [
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1506268954-2297b3d3cad5?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "View details",
        seoTitle: "Ever After — Wedding Social Media & Reel Direction | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio created Ever After's cinematic social identity — editorial reels, Pinterest strategy, and brand voice that transformed their client enquiries.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // Art Works
  // ─────────────────────────────────────────────
  {
    id: "audiovisual",
    label: "Art Works",
    statement:
      "Motion and sound that carry emotion. We produce visuals that feel cinematic, authentic, and alive.",
    categoryDescription:
      "We produce film and video that respects its subject. Whether it's a wedding, a brand commercial, or an event, every Ruana Soul Studio production is shot with intent and edited to feel alive — not processed.",
    works: [
      {
        id: "wedding-film",
        title: "AMALFI VOWS",
        tagline:
          "Full-day wedding film with drone coverage and color-graded deliverables.",
        description:
          "Amalfi Vows was a destination wedding filmed over three days on the Amalfi Coast, Italy. The couple — a Melbourne architect and a Neapolitan chef — wanted a film that captured the scale of the location and the intimacy of their ceremony without feeling like a travel commercial. We brought a two-camera team and a licensed drone operator to deliver a complete cinematic package.",
        challenge:
          "Destination wedding films often sacrifice intimacy for spectacle. The couple wanted both — the sweeping coastline and the quiet moments between two people. The challenge was to balance epic and tender without feeling disjointed.",
        solution:
          "We structured the film in three movements: arrival and anticipation, the ceremony as its centrepiece, and the celebration as an epilogue. We chose a warm, filmic colour grade that referenced Italian cinema of the 1970s without being retro. Sound design layered ambient location audio beneath a bespoke music selection to create a sensory experience that holds beyond the first watch.",
        outcome:
          "The couple shared their film privately, but it was later featured (with permission) in two international wedding publications. It remains one of our most-requested reference films in client conversations.",
        client: "Amalfi Vows",
        year: "2023",
        services: ["Wedding Film", "Drone Coverage", "Colour Grading", "Sound Design"],
        image:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Amalfi Vows — cinematic wedding film with drone coverage",
        gallery: [
          "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "View details",
        seoTitle: "Amalfi Vows — Cinematic Destination Wedding Film | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio filmed Amalfi Vows — a three-day destination wedding on the Amalfi Coast, with drone coverage, colour grading, and cinematic sound design.",
      },
      {
        id: "brand-spot",
        title: "ROAST SPOT",
        tagline:
          "30-second hero spot and cut-downs for paid social and in-store screens.",
        description:
          "Building on our brand identity work for Roast Collective, they commissioned us to produce their first brand film. The brief was ambitious: a 30-second hero spot that could run on paid social, in-store screens, and pre-roll — with a series of 15 and 6-second cut-downs for different placements. One shoot day, multiple deliverables, one unified story.",
        challenge:
          "Coffee brand films tend to either be too romantic (slow pours, steam, golden hour) or too functional (product features, price callouts). Roast Collective wanted neither. They wanted something that made you feel the ritual of specialty coffee — the focus, the precision, the small moments of waiting.",
        solution:
          "We developed a concept around 'the 4-minute window' — the brief time between a perfect roast and its first pour. The film is structured as a sensory countdown: close-up textures, precise movement, sound design that puts you in the room. We shot on an Arri Alexa with macro lenses to capture detail invisible to the naked eye. The grade emphasizes warmth without romanticisation.",
        outcome:
          "The hero spot achieved a 6.2% view-through rate on Instagram — more than double the industry average. In-store screen conversion uplift was 14%. The cut-down campaign ran for 8 months without creative fatigue.",
        client: "Roast Collective",
        year: "2024",
        services: ["Brand Film", "Direction", "Cinematography", "Post-Production"],
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Roast Spot — specialty coffee brand commercial",
        gallery: [
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1521302200778-33500795e128?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1462966854575-8c36a5bcf1c8?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "Explore options",
        seoTitle: "Roast Spot — Coffee Brand Film Production | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio produced Roast Collective's brand film — a 30-second hero spot and paid social cut-downs that doubled industry view-through rates.",
      },
      {
        id: "event-recap",
        title: "DESIGN WEEK",
        tagline:
          "Same-day recap edits and speaker highlight packages for a design festival.",
        description:
          "Design Week Melbourne is a multi-day festival celebrating design, architecture, and creative practice. We were commissioned to produce the official video documentation of the event — capturing talks, installations, exhibitions, and conversations — with a requirement to deliver same-day recap edits for social media throughout the festival.",
        challenge:
          "Event video is operationally complex. Multiple simultaneous sessions, constantly moving subjects, unpredictable lighting, and a social media publishing deadline before the day ends. Quality cannot be sacrificed for speed, but speed is non-negotiable.",
        solution:
          "We deployed a four-person production team with defined roles: a dedicated social team for same-day edits and a documentary team for the full festival film. We built a custom proxy workflow that allowed editing to begin while shooting was still in progress. Each day's recap was published by 8pm. The full festival film was delivered two weeks post-event.",
        outcome:
          "The same-day recaps collectively reached 180K accounts across the festival days. Speaker highlight packages were shared directly by speakers to their own audiences, generating significant earned reach. The full festival film has since been used in grant applications and future sponsor pitches.",
        client: "Design Week Melbourne",
        year: "2024",
        services: ["Event Documentation", "Same-Day Editing", "Multi-Camera Production", "Post-Production"],
        image:
          "https://images.unsplash.com/photo-1505373877847-8d25f39a466a?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Design Week Melbourne — event documentation and recap film",
        gallery: [
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1492538368677-f6e0afe31dab?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1550305080-4e029753abcf?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "View details",
        seoTitle: "Design Week Melbourne — Event Film & Documentation | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio documented Design Week Melbourne — same-day social recaps, speaker highlights, and a full festival film for one of Melbourne's leading design events.",
      },
      {
        id: "product-bts",
        title: "VERDE BTS",
        tagline:
          "Behind-the-scenes series documenting a skincare launch photoshoot.",
        description:
          "Following Verde Botánica's brand identity work, they commissioned us to document the production of their debut campaign photoshoot. The brief was to create a behind-the-scenes film series — content that pulls back the curtain on the craft behind the brand, for use on their social channels and as part of a media kit for press and retail buyers.",
        challenge:
          "BTS content is often treated as an afterthought — phone footage and talking heads stuck together. Verde Botánica needed BTS content that was as beautiful as the campaign itself, because their audience and buyers would be watching it as a quality signal.",
        solution:
          "We planned the BTS production in parallel with the campaign shoot, treating it as a co-production rather than a secondary unit. We captured the tension and focus of a professional shoot: the light setups, the botanical sourcing process, the iteration between photographer and creative director. Delivered as three episodic chapters: Before, During, and After the shoot.",
        outcome:
          "The three-episode series was released over three consecutive weeks, extending the launch campaign by 21 days. Each episode outperformed their regular content by 4x in reach. Two press features mentioned the BTS series specifically as what drew them to the brand.",
        client: "Verde Botánica",
        year: "2024",
        services: ["Documentary Production", "BTS Film", "Series Editing", "Brand Storytelling"],
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
        imageAlt: "Verde BTS — behind the scenes skincare launch photoshoot film",
        gallery: [
          "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1573461160327-1f3d4e9dc1b9?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1615485925515-ef06f2240b6a?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "View details",
        seoTitle: "Verde BTS — Skincare Brand Documentary Series | Ruana Soul Studio",
        seoDescription:
          "Ruana Soul Studio produced Verde Botánica's behind-the-scenes launch series — a three-episode documentary that extended the campaign and earned press features.",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// Named export for path generation (non-localized)
// ─────────────────────────────────────────────
export const allCategories: readonly WorkCategory[] = baseCategories;

// ─────────────────────────────────────────────
// Helper: Build URL for a project
// ─────────────────────────────────────────────
export function getProjectUrl(categoryId: string, workId: string, lang?: Lang): string {
  const prefix = lang === "es" ? "/es" : "";
  return `${prefix}/projects/${categoryId}/${workId}`;
}

// ─────────────────────────────────────────────
// Helper: Find a project by category + slug
// ─────────────────────────────────────────────
export function findProject(
  categorySlug: string,
  workSlug: string,
  lang: Lang = "en"
): { category: WorkCategory; work: WorkItem } | null {
  const cats = getCategories(lang);
  const category = cats.find((c) => c.id === categorySlug);
  if (!category) return null;
  const work = category.works.find((w) => w.id === workSlug);
  if (!work) return null;
  return { category, work };
}