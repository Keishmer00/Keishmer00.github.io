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
import didierWeb from "../assets/images/didier-web/didier.webp"
import wisegoldWeb from "../assets/images/wisegold-web/wisegold.webp"
import karimWeb from "../assets/images/karim-web/karim.webp"
import ruanaWeb from "../assets/images/ruana-web/ruana.webp"


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
  "karim": "Karim",
  "nexus-platform": "NEXUS PLATFORM",
  "MO-TECH SERVICE": "MO-TECH SERVICE",
  "ruanasoulstudio": "Ruana Soul Studio",
  "ruana-studio": "Ruana Soul Studio",
  "karim-ventas": "Karim Ventas",
  "wisegold-capital": "WiseGold Capital",
  "didier-perez": "Didier Pérez — Abogado",
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
  "karim": "Identidad de marca, empaque y sistema visual para una marca colombiana de cosméticos y autocuidado con una estética cálida y empoderadora.",
  "nexus-platform": "Arquitectura de marca e identidad visual para una empresa de desarrollo de software a la medida con enfoque humano.",
  "mo-tech-service": "Identidad de marca completa y sistema visual para una empresa nacional de field service de ATMs y cajeros crypto con cobertura en más de 35 estados.",
  "ruanasoulstudio": "Identidad de marca y sistema visual para una productora audiovisual con enfoque humano, artístico y transformador.",
  "ruana-studio": "Sitio web de agencia integral con storytelling cinemático, estrategia SEO/AEO y enfoque en conversión.",
  "karim-ventas": "E-commerce Shopify personalizado con componentes Liquid a la medida para una marca colombiana de cosméticos y autocuidado.",
  "wisegold-capital": "Plataforma institucional multilingüe con integración de blog Medium y traducción automática a 6 idiomas.",
  "didier-perez": "Portafolio profesional para abogado colombiano especializado en Derecho Administrativo, construido como sitio estático de una sola página.",
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
  "karim":
    "Karim es una marca colombiana de cosméticos, accesorios y experiencias de belleza, enfocada en acompañar a las mujeres en su ritual de autocuidado con productos de calidad, atención cercana y una experiencia de compra emocionalmente significativa. Desarrollamos un sistema completo de identidad de marca que captura su esencia: una estética cálida que combina ternura visual con identidad local colombiana y carácter femenino. Cada punto de contacto — desde el logotipo hasta el empaque y la presencia digital — fue diseñado para que la cliente se sienta vista, valorada y cuidada.",
  "nexus-platform":
    "Nexus es una marca de desarrollo de software a la medida, enfocada en crear soluciones tecnológicas personalizadas para cada cliente. Su metodología comienza con la escucha — entender el problema a fondo antes de escribir una sola línea de código. Creen que la tecnología debe potenciar las conexiones humanas, no reemplazarlas, y que el software debe adaptarse al usuario, no al revés. Creamos una arquitectura de marca e identidad visual que comunica su filosofía: el punto donde todo se conecta, anclado en funcionalidad, innovación y confianza.",
  "mo-tech-service":
    "Move On Tech Service es una empresa de field service con cobertura nacional, especializada en instalación, reparación y mantenimiento de ATMs y cajeros crypto en más de 35 estados de Estados Unidos. Nos contactaron para construir una marca que igualara su escala operativa y comunicara confiabilidad, experiencia técnica y velocidad — los valores que sus equipos de campo representan cada día. Desarrollamos un sistema completo de identidad de marca que incluye diseño de logotipo, paleta de color, tipografía, lineamientos visuales y materiales de documentación, posicionándolos como el socio de servicio técnico de referencia para redes de autoservicio financiero.",
  "ruanasoulstudio":
    "Ruana Soul Studio es una productora audiovisual que crea experiencias cinematográficas y narrativas con enfoque humano, artístico y transformador. Su propuesta no se centra en producir contenido por volumen, sino en desarrollar piezas audiovisuales con intención, sensibilidad cultural y rigor técnico. Construimos una identidad de marca que refleja su filosofía: el cine como herramienta de transformación, empatía y diálogo social — donde la imagen y el alma se encuentran.",
  "ruana-studio":
    "Ruana Soul Studio es una agencia de branding, producción audiovisual y desarrollo web con base en Melbourne, enfocada en dar identidad visual coherente a marcas mediante un enfoque cinematográfico. Construimos nuestro propio sitio web como demostración en vivo de todo lo que ofrecemos: narrativa scroll con GSAP, ingeniería Astro SSR optimizada para rendimiento, estrategia SEO y AEO para motores de búsqueda con IA, y un sistema de diseño que equilibra impacto visual con estrategia de conversión. El blog se integra desde nuestro RSS de Medium y forma parte del ecosistema de contenido del sitio.",
  "karim-ventas":
    "Karim Ventas es la tienda online y física de la marca Karim, una empresa colombiana de cosméticos y autocuidado con sede en Barrancabermeja. Construimos una plataforma Shopify completamente personalizada sobre el tema Tinker v4.1.1, desarrollando componentes Liquid de Shopify a medida — bloques de tema personalizados con esquemas Liquid, sistemas de iconos SVG inline, plantillas JSON para composición flexible de páginas y una arquitectura basada en bloques que le da al comerciante control total sobre el diseño de su tienda. El resultado es una tienda online que captura la estética kawaii-colombiana de Karim mientras maneja todo, desde la categorización de productos hasta el envío nacional en toda Colombia.",
  "wisegold-capital":
    "WiseGold Capital es una infraestructura institucional de custodia de oro y plata físico, diseñada para preservación de capital y continuidad operativa. Construimos una plataforma multilingüe (inglés, español, portugués, francés, chino, árabe) que comunica su modelo de custodia — desde servicios de asesoría y bóveda hasta trading propietario e infraestructura tecnológica — a una audiencia institucional global. La plataforma cuenta con un sistema de blog automatizado que obtiene artículos de su feed RSS de Medium, los almacena en una base de datos PostgreSQL y traduce automáticamente cada publicación a los 5 idiomas adicionales mediante Azure Translator API con traducción HTML-aware que preserva el formato y la estructura.",
  "didier-perez":
    "Didier Pérez es un abogado colombiano especializado en Derecho Administrativo, que ofrece asesoría y representación legal a particulares y trámites frente al Estado. Diseñamos y desarrollamos un portafolio profesional que presenta sus áreas de práctica — Derecho Administrativo, Notarial, Civil y Defensa de Derechos Fundamentales — en un formato limpio, autoritario y accesible. Construido como sitio estático de una sola página desplegado en GitHub Pages, el diseño prioriza claridad y confianza: una paleta de colores profesional, jerarquía tipográfica clara con Open Sans y Urbanist, y navegación directa que ayuda a los clientes potenciales a entender rápidamente su experiencia y contactarlo vía WhatsApp y formularios de contacto.",
};

const esChallenges: TextMap = {
  "karim":
    "El mercado de la belleza está dominado por minimalismo de lujo o marcas genéricas producidas en masa. Karim necesitaba una identidad visual que se sintiera personal, cálida y profundamente colombiana — algo que pudiera destacar en los estantes mientras comunicaba calidad, curaduría y el valor emocional del autocuidado. Su origen familiar y sus relaciones cercanas con las clientas tenían que traducirse en cada punto de contacto de la marca sin perder autenticidad.",
  "nexus-platform":
    "Nexus había crecido mediante referencias basadas en la calidad de su ingeniería y su enfoque colaborativo. Al escalar, necesitaban una identidad visual que comunicara sus valores a nuevos clientes sin depender únicamente del boca a boca. La marca debía reflejar su precisión técnica, su metodología centrada en el ser humano y su promesa de construir tecnología que realmente sirva a las personas.",
  "mo-tech-service":
    "Move On Tech Service había crecido rápidamente por recomendación boca a boca, construyendo una sólida reputación operativa sin una identidad visual correspondiente. Sus materiales de marca eran inconsistentes: los técnicos usaban diferentes formatos de documentos, su presencia digital carecía de cohesión y no existía un lenguaje visual unificado que operadores y socios pudieran reconocer. El desafío fue crear una marca que reflejara su rigor operativo, alcance nacional y experiencia técnica, al mismo tiempo que se sintiera moderna, confiable y escalable.",
  "ruanasoulstudio":
    "El mercado de producción audiovisual está saturado de estudios que compiten por velocidad y volumen. Ruana Soul Studio necesitaba una marca que comunicara su diferenciador: ellos no solo 'hacen contenido' — crean momentos significativos. La marca debía transmitir su visión artesanal del cine, su compromiso con la profundidad cultural y su enfoque en el impacto por encima del volumen, atrayendo clientes que valoren la profundidad sobre la cantidad.",
  "ruana-studio":
    "La mayoría de los sitios web de agencias caen en una de dos trampas: son un patio de juegos visual sin estrategia de conversión, o un sitio genérico sin personalidad. Necesitábamos construir algo genuinamente hermoso, técnicamente excelente, Y que moviera a los visitantes hacia un siguiente paso claro — todo mientras demostrábamos nuestras capacidades en branding, desarrollo web, producción audiovisual y SEO/AEO de manera cohesiva.",
  "karim-ventas":
    "Karim necesitaba una tienda online que igualara la calidez y personalidad de su boutique física. Los temas de Shopify listos para usar no podían capturar su estética kawaii-colombiana — una mezcla de ternura visual con identidad local colombiana y carácter femenino. La tienda debía sentirse personal y curada, manteniendo todas las capacidades operativas de un e-commerce: variantes de producto, gestión de inventario, integraciones de envío nacional y una experiencia de pago móvil fluida.",
  "wisegold-capital":
    "WiseGold opera en una industria altamente regulada donde la confianza lo es todo. Su plataforma necesitaba comunicar estructuras de custodia complejas — inventario asignado vs consolidado, gobernanza multinivel con depositarios independientes, marcos de cumplimiento AML/CTF — de una manera que clientes institucionales e intermediarios de diferentes jurisdicciones pudieran entender y confiar. Su estrategia de contenido dependía de Medium para liderazgo de pensamiento, pero Medium no soporta su audiencia multilingüe de 6 idiomas. Necesitaban un sistema que uniera la creación de contenido (Medium) con una plataforma localizada basada en base de datos, sin esfuerzo manual de traducción.",
  "didier-perez":
    "Los profesionales del derecho necesitan una presencia web que comunique autoridad, confianza y accesibilidad — pero la mayoría de los sitios web de abogados en Colombia son portales corporativos excesivamente complejos o plantillas genéricas que no generan confianza. Didier necesitaba un sitio que se sintiera profesional sin ser intimidante, accesible sin ser informal, y que presentara claramente sus áreas de práctica para que clientes potenciales de diferentes contextos pudieran entender inmediatamente su experiencia y tomar acción.",
};

const esSolutions: TextMap = {
  "karim":
    "Creamos una identidad de marca anclada en calidez, feminidad y carácter colombiano. El sistema visual utiliza pasteles suaves con acentos tropicales audaces y tipografía personalizada con calidez dibujada a mano. El empaque fue diseñado como una experiencia de regalo — cada caja, inserto y etiqueta contribuye a un 'ritual de unboxing' que extiende la filosofía de cuidado de la marca al producto físico. El resultado es una marca que se siente visualmente encantadora y emocionalmente resonante, destacando en estantes y en videos de unboxing por igual.",
  "nexus-platform":
    "Desarrollamos un sistema de marca anclado en el concepto de conexión y protección. El isotipo y el discurso visual refuerzan solidez, tecnología confiable e integración fluida. La paleta de colores combina tonos profundos y confiables con acentos vibrantes que señalan innovación. Creamos lineamientos de marca integrales, un marco de mensajería y un sistema visual que se adapta a puntos de contacto digitales e impresos manteniendo coherencia y confianza.",
  "mo-tech-service":
    "Desarrollamos un sistema completo de identidad de marca anclado en claridad, movimiento y precisión técnica. El logotipo combina precisión geométrica con impulso hacia adelante, haciendo referencia tanto a la conectividad de las redes de ATMs como a la movilidad del servicio en campo. La paleta de color utiliza azul marino profundo para confianza y autoridad, naranja eléctrico para visibilidad y energía, y grises limpios para documentación técnica. Diseñamos un sistema cohesivo de lineamientos de marca, plantillas de reportes de servicio, conceptos de uniformes para técnicos y activos digitales que garantizan consistencia en cada punto de contacto con el cliente.",
  "ruanasoulstudio":
    "Desarrollamos una identidad de marca arraigada en la calidad cinematográfica y la intención artística. El sistema visual utiliza texturas fílmicas, una paleta de colores refinada que referencia la gradación de color del cine, y tipografía que equilibra elegancia con vanguardia. La marca gráfica es una abstracción geométrica del punto de encuentro entre la imagen y el alma — el núcleo de su filosofía. Los lineamientos de marca cubren su posicionamiento único, criterios de selección de proyectos y voz de comunicación para asegurar consistencia en cada interacción con el cliente.",
  "ruana-studio":
    "Construimos el sitio con Astro SSR para rendimiento, con GSAP potenciando animaciones scroll-triggered y secuencias de entrada cinemáticas. El sistema de diseño usa tipografía personalizada, una paleta de colores refinada y un layout que balancea densidad de información con espacio para respirar. Cada sección es un argumento considerado para trabajar con nosotros. SEO y AEO (Answer Engine Optimization) se integraron desde la base — con datos estructurados JSON-LD, jerarquía HTML semántica y contenido estructurado tanto para buscadores tradicionales como para motores de respuesta con IA. El blog se alimenta de nuestro RSS de Medium y se integra directamente al ecosistema de contenido del sitio.",
  "karim-ventas":
    "Construimos sobre Tinker v4.1.1, creando una biblioteca de componentes Liquid de Shopify personalizados que tradujeron la marca Karim en una experiencia de compra digital cohesiva. Desarrollamos bloques de tema personalizados con esquemas Liquid a medida, un sistema de composición de páginas basado en bloques para control flexible del layout, y sistemas de iconos SVG inline para elementos visuales específicos de la marca. El diseño usa escalado responsive con clamp(), tipografía Urbanist y Playfair Display, y una paleta cálida de pasteles con acentos tropicales. Las páginas de producto, la navegación por categorías y el flujo de carrito fueron reingenierizados con Liquid personalizado para mantener consistencia de marca en cada punto de contacto.",
  "wisegold-capital":
    "Construimos una plataforma Astro SSR con backend Node.js y base de datos PostgreSQL. El sistema de blog usa un fetcher RSS impulsado por cron que consulta el feed de Medium cada 30 minutos, almacena nuevos artículos en la base de datos y activa Azure Translator API para traducir cada publicación a los 5 idiomas adicionales. El frontend sirve contenido traducido desde la base de datos con traducción de respaldo diferida para casos extremos. La arquitectura de información desglosa conceptos complejos de custodia en pilares de servicio claros (Advisory, Vault, Technology, Trading) con jerarquía visual que guía a los clientes institucionales a través de la cadena de valor. El soporte multilingüe se maneja mediante middleware inteligente con detección por cookie, Accept-Language y geolocalización IP. La plataforma se despliega en Azure VMs con Docker, usando Nginx y SSL automatizado via Certbot.",
  "didier-perez":
    "Desarrollamos un portafolio limpio de una sola página con enfoque en jerarquía de contenido y conversión. La sección hero establece inmediatamente la especialización de Didier en Derecho Administrativo y su ubicación en Colombia. Las áreas de práctica se presentan con descripciones claras que ayudan a los clientes potenciales a autoidentificar sus necesidades legales. Un CTA de consulta destacado con enlace integrado a WhatsApp facilita el contacto inmediato. El diseño usa una paleta de colores profesionales definida mediante propiedades personalizadas CSS, Open Sans para legibilidad del cuerpo y Urbanist para encabezados. La arquitectura estática garantiza carga instantánea y cero mantenimiento — fundamental para un profesional legal que debe enfocarse en su práctica, no en su sitio web.",
};

const esOutcomes: TextMap = {
  "karim":
    "La marca se lanzó con una identidad cohesiva en empaque, redes sociales y puntos de venta. La experiencia de unboxing se convirtió en un diferenciador clave, con clientes compartiendo sus compras orgánicamente en redes sociales. La voz de marca cálida y personal ayudó a construir una comunidad leal de clientes recurrentes que se identifican con los valores de Karim: autocuidado, orgullo colombiano y la belleza como un ritual de identidad y empoderamiento.",
  "nexus-platform":
    "La nueva marca le dio a Nexus una presencia profesional y unificada que refleja su experiencia técnica y su filosofía centrada en el ser humano. El marco de mensajería ayudó a su equipo a articular su metodología colaborativa de manera más efectiva. El sistema visual se adapta a su creciente oferta de servicios — desde desarrollo personalizado hasta consultoría tecnológica — mientras la jerarquía visual clara ayuda a los clientes a reconocer inmediatamente la calidad y el cuidado detrás de cada proyecto.",
  "mo-tech-service":
    "La nueva identidad de marca le dio a Move On Tech Service una presencia profesional y unificada que iguala su excelencia operativa. Sus técnicos de campo ahora portan documentación de servicio consistente y con marca. Los lineamientos de marca permiten que su equipo en crecimiento mantenga consistencia visual sin cuellos de botella de diseño. La estructura modular del sistema soporta el crecimiento futuro — desde agregar nuevas líneas de servicio hasta expandirse a plataformas digitales — mientras que la jerarquía visual clara ayuda a los operadores a reconocer de inmediato la calidad y confiabilidad detrás de cada llamada de servicio.",
  "ruanasoulstudio":
    "La identidad de marca posicionó a Ruana Soul Studio como un estudio boutique de alto impacto, no como una casa de producción tradicional. Su nueva presencia visual atrae clientes que valoran la profundidad sobre el volumen — desde producciones audiovisuales de alto nivel hasta documentales de impacto social y coproducciones cinematográficas. La marca se ha convertido en un mecanismo de filtro que les trae los proyectos adecuados con los clientes correctos que comparten su visión del cine como transformación.",
  "ruana-studio":
    "El sitio logra puntuaciones perfectas de Lighthouse con cargas de página en menos de un segundo. El formulario de contacto convierte a tasas superiores al promedio de la industria. El sitio rankea en la primera página para nuestros términos de búsqueda principales en Melbourne y tiene un rendimiento sólido en resultados de búsqueda impulsados por IA. Funciona como un portafolio vivo que demuestra nuestras capacidades en branding, desarrollo web, producción audiovisual y estrategia de contenido — todo en una plataforma cohesiva.",
  "karim-ventas":
    "Karim Ventas lanzó con una tienda online completamente operativa que conecta su boutique física en Barrancabermeja con clientes de todo Colombia. Los componentes Liquid personalizados le dan al equipo de Karim la flexibilidad de actualizar productos, categorías y promociones sin perder consistencia de marca. La arquitectura basada en bloques les permite añadir campañas de temporada y nuevas líneas de producto de forma independiente. La plataforma sirve como el canal de ventas digital principal de Karim, apoyando su crecimiento de boutique local a marca nacional de e-commerce con una identidad online distintiva y propia.",
  "wisegold-capital":
    "WiseGold Capital lanzó con una plataforma multilingüe robusta que funciona tanto como su presencia institucional como su motor de marketing de contenido. El sistema de blog automatizado mantiene las 6 versiones de idioma del sitio continuamente actualizadas con contenido fresco sin intervención manual — los nuevos artículos de Medium se obtienen, traducen y publican automáticamente en toda la plataforma. El almacenamiento basado en PostgreSQL garantiza entrega confiable de contenido con cargas de página en milisegundos. La plataforma se ha convertido en una señal de credibilidad clave para clientes institucionales que evalúan su infraestructura de custodia, con la capacidad multilingüe particularmente valorada por sus redes de intermediarios en Latinoamérica, Europa y Asia.",
  "didier-perez":
    "El sitio funciona como el escaparate digital principal de Didier, presentando su experiencia legal en un formato profesional y confiable que genera credibilidad instantánea. El desglose claro de áreas de práctica ayuda a los clientes potenciales a autoidentificar sus necesidades antes de contactarlo, reduciendo la fricción en la solicitud de consulta inicial. La integración de WhatsApp se ha convertido en un canal principal para solicitudes de consulta. La arquitectura de sitio estático garantiza tiempos de carga rápidos, optimización móvil y cero costos de mantenimiento — permitiendo a Didier enfocarse en su práctica legal mientras mantiene una presencia online profesional que compite con firmas más grandes.",
};

const esSeoTitles: TextMap = {
  "karim":
    "Karim — Identidad de Marca Colombiana de Cosméticos y Autocuidado | Keishmer Studio",
  "nexus-platform":
    "Nexus — Identidad de Marca para Desarrollo de Software a la Medida | Keishmer Studio",
  "mo-tech-service":
    "Move On Tech Service — Identidad de Marca y Sistema Visual para Field Service de ATMs | Keishmer Studio",
  "ruanasoulstudio":
    "Ruana Soul Studio — Identidad de Marca para Productora Audiovisual | Keishmer Studio",
  "ruana-studio":
    "Ruana Soul Studio — Sitio Web de Agencia Integral con Astro SSR y SEO/AEO | Keishmer Studio",
  "karim-ventas":
    "Karim Ventas — E-commerce Shopify con Componentes Liquid Personalizados | Keishmer Studio",
  "wisegold-capital":
    "WiseGold Capital — Plataforma Institucional Multilingüe con Blog Automatizado | Keishmer Studio",
  "didier-perez":
    "Didier Pérez — Portafolio Legal para Abogado de Derecho Administrativo | Keishmer Studio",
};

const esSeoDescriptions: TextMap = {
  "karim":
    "Identidad de marca, empaque y sistema visual para Karim, una marca colombiana de cosméticos y autocuidado con una estética cálida y empoderadora. Diseñado por Keishmer Studio.",
  "nexus-platform":
    "Arquitectura de marca e identidad visual para Nexus, una empresa de desarrollo de software a la medida que construye tecnología centrada en el ser humano. Estrategia de marca creada por Keishmer Studio.",
  "mo-tech-service":
    "Sistema completo de identidad de marca para Move On Tech Service, una empresa de field service de ATMs y cajeros crypto con cobertura en más de 35 estados. Logotipo, sistema visual y guías de marca creados por Keishmer Studio.",
  "ruanasoulstudio":
    "Identidad de marca y sistema visual para Ruana Soul Studio, una productora audiovisual que crea experiencias cinematográficas con enfoque humano, artístico y transformador.",
  "ruana-studio":
    "Sitio web de agencia integral para Ruana Soul Studio construido con Astro SSR, animaciones GSAP, estrategia SEO/AEO y blog integrado desde Medium RSS.",
  "karim-ventas":
    "E-commerce Shopify personalizado con componentes Liquid a la medida para Karim Ventas, marca colombiana de cosméticos y autocuidado. Desarrollo de tema, arquitectura de bloques y diseño e-commerce por Keishmer Studio.",
  "wisegold-capital":
    "Plataforma institucional multilingüe para WiseGold Capital con integración de blog Medium RSS, almacenamiento PostgreSQL y traducción automática Azure en 6 idiomas. Construido por Keishmer Studio.",
  "didier-perez":
    "Portafolio profesional para Didier Pérez, abogado colombiano de Derecho Administrativo. Diseño limpio de una sola página con presentación de áreas de práctica e integración de WhatsApp por Keishmer Studio.",
};

const esImageAlts: TextMap = {
  "karim":
    "Karim — Identidad de marca colombiana de cosméticos y autocuidado",
  "nexus-platform":
    "Nexus — Identidad de marca para desarrollo de software a la medida",
  "mo-tech-service":
    "Move On Tech Service — Identidad de marca y sistema visual para servicio técnico de ATMs y cajeros crypto",
  "ruanasoulstudio":
    "Ruana Soul Studio — Identidad de marca para productora audiovisual",
  "ruana-studio":
    "Ruana Soul Studio — Sitio web de agencia integral",
  "karim-ventas":
    "Karim Ventas — E-commerce Shopify para marca colombiana de cosméticos",
  "wisegold-capital":
    "WiseGold Capital — Plataforma institucional multilingüe",
  "didier-perez":
    "Didier Pérez — Portafolio profesional para abogado",
};

const esServices: Record<string, string[]> = {
  "karim": [
    "Identidad de Marca",
    "Diseño de Logotipo",
    "Diseño de Empaque",
    "Sistema Visual",
    "Dirección de Arte",
  ],
  "nexus-platform": [
    "Arquitectura de Marca",
    "Diseño de Logotipo",
    "Identidad Visual",
    "Guías de Marca",
    "Marco de Mensajería",
  ],
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
  "ruanasoulstudio": [
    "Identidad de Marca",
    "Diseño de Logotipo",
    "Sistema Visual",
    "Guías de Marca",
    "Dirección de Arte",
  ],
  "ruana-studio": [
    "Desarrollo Web",
    "Astro SSR",
    "Animaciones GSAP",
    "Estrategia SEO y AEO",
    "Estrategia de Contenido",
  ],
  "karim-ventas": [
    "Desarrollo Shopify",
    "Componentes Liquid Personalizados",
    "Diseño E-commerce",
    "Desarrollo de Tema",
    "Diseño UX",
  ],
  "wisegold-capital": [
    "Desarrollo Web",
    "Plataforma Multilingüe",
    "Integración de Blog",
    "Arquitectura de Base de Datos",
    "Infraestructura Cloud",
  ],
  "didier-perez": [
    "Diseño Web",
    "Desarrollo de Sitio Estático",
    "Diseño UI/UX",
    "SEO",
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
        id: "karim",
        title: "Karim",
        tagline:
          "Brand identity, packaging and visual system for a Colombian cosmetics and self-care brand with a warm, empowering aesthetic.",
        description:
          "Karim is a Colombian cosmetics, accessories and beauty experiences brand, focused on accompanying women in their self-care ritual with quality products, close and personalized attention, and an emotionally meaningful shopping experience. We developed a complete brand identity system that captures their essence: a warm aesthetic that blends visual tenderness with local Colombian identity and feminine character. Every touchpoint — from logo to packaging to digital presence — was designed to make the customer feel seen, valued, and cared for.",
        challenge:
          "The beauty market is dominated by either luxury minimalism or mass-produced generic branding. Karim needed a visual identity that felt personal, warm, and deeply Colombian — something that could stand out on shelves while communicating quality, curation, and the emotional value of self-care. Their family origin and close customer relationships had to be translated into every brand touchpoint without losing authenticity.",
        solution:
          "We created a brand identity anchored in warmth, femininity, and Colombian character. The visual system uses soft pastels with bold tropical accents and custom typography with hand-drawn warmth. Packaging was designed as a gifting experience — every box, insert, and label contributes to an 'unboxing ritual' that extends the brand's care philosophy into the physical product. The result is a brand that feels both visually delightful and emotionally resonant, standing out on shelves and in unboxing videos alike.",
        outcome:
          "The brand launched with a cohesive identity across packaging, social media, and retail touchpoints. The unboxing experience became a key differentiator, with customers sharing their purchases organically on social media. The warm, personal brand voice helped build a loyal community of repeat customers who identify with Karim's values of self-care, Colombian pride, and beauty as a ritual of identity and empowerment.",
        client: "Karim",
        year: "2024",
        services: ["Brand Identity", "Logo Design", "Packaging Design", "Visual System", "Art Direction"],
        image: karimBrand.src,
        imageAlt: "Karim — Colombian cosmetics and self-care brand identity",
        gallery: [
          karim1.src,
          karim2.src,
          karim3.src,
          karim4.src,
          karim5.src,
        ],
        ctaLabel: "View details",
        seoTitle: "Karim — Colombian Cosmetics Brand Identity | Keishmer Studio",
        seoDescription:
          "Brand identity, packaging and visual system for Karim, a Colombian cosmetics and self-care brand with a warm, empowering aesthetic crafted by Keishmer Studio.",
      },
      {
        id: "nexus-platform",
        title: "NEXUS PLATFORM",
        tagline:
          "Brand architecture and visual identity for a custom software development company with a human-centered approach.",
        description:
          "Nexus is a custom software development brand focused on building personalized technological solutions for each client. Their methodology starts with listening — understanding the problem deeply before writing a single line of code. They believe technology should enhance human connections, not replace them, and that software must adapt to the user, not the other way around. We were brought in to create a brand architecture and visual identity that communicates their philosophy: the point where everything connects, anchored in functionality, innovation, and trust.",
        challenge:
          "Nexus had grown through referrals based on engineering quality and their collaborative, listening-first approach. As they scaled, they needed a visual identity that could communicate their values to new clients without relying solely on word of mouth. The brand had to reflect their technical precision, their human-centered methodology, and their promise of building technology that truly serves people.",
        solution:
          "We developed a brand system anchored in the concept of connection and protection. The isotype and visual discourse reinforce solidity, reliable technology, and seamless integration. The color palette combines deep, trustworthy tones with vibrant accents that signal innovation. We created comprehensive brand guidelines, a messaging framework, and a visual system that flexes across digital and print touchpoints while maintaining coherence and trust.",
        outcome:
          "The new brand gave Nexus a professional, unified presence that reflects their technical expertise and human-centered philosophy. The messaging framework helped their team articulate their collaborative methodology more effectively. The visual system scales across their growing service offerings — from custom development to technology consulting — while the clear hierarchy helps clients immediately recognize the quality and care behind every project.",
        client: "Nexus",
        year: "2024",
        services: ["Brand Architecture", "Logo Design", "Visual Identity", "Brand Guidelines", "Messaging Framework"],
        image: nexusBrand.src,
        imageAlt: "Nexus — Custom software development brand identity",
        gallery: [
        nexus1.src,
        nexus2.src,
        nexus3.src,
        nexus4.src,
        nexus5.src,
        ],
        ctaLabel: "View details",
        seoTitle: "Nexus — Custom Software Development Brand Identity | Keishmer Studio",
        seoDescription:
          "Brand architecture and visual identity for Nexus, a custom software development company that builds human-centered technology. Brand strategy crafted by Keishmer Studio.",
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
          "Brand identity and visual system for an audiovisual production studio with a human, artistic, and transformative approach.",
        description:
          "Ruana Soul Studio is an audiovisual production studio that creates cinematic experiences and narratives with a human, artistic, and transformative approach. Their proposal is not about producing content by volume, but about developing audiovisual pieces with intention, cultural sensitivity, and technical rigor. We built a brand identity that reflects their philosophy: film as a tool for transformation, empathy, and social dialogue — where image and soul meet.",
        challenge:
          "The audiovisual production market is crowded with studios that compete on speed and volume. Ruana Soul Studio needed a brand that communicated their differentiator: they don't just 'make content' — they create meaningful moments. The brand had to convey their artisanal vision of cinema, their commitment to cultural depth, and their focus on impact over output, while attracting clients who value depth over volume.",
        solution:
          "We developed a brand identity rooted in cinematic quality and artistic intention. The visual system uses filmic textures, a refined color palette that references cinema color grading, and typography that balances elegance with edge. The logo mark is a geometric abstraction of the meeting point between image and soul — the core of their philosophy. Brand guidelines cover their unique positioning, project selection criteria, and communication voice to ensure consistency across every client interaction.",
        outcome:
          "The brand identity positioned Ruana Soul Studio as a boutique, high-impact studio rather than a traditional production house. Their new visual presence attracts clients who value depth over volume — from high-level audiovisual productions to social impact documentaries and cinematographic co-productions. The brand has become a filtering mechanism that brings them the right projects with the right clients who share their vision of cinema as transformation.",
        client: "Ruana Soul Studio",
        year: "2024",
        services: ["Brand Identity", "Logo Design", "Visual System", "Brand Guidelines", "Art Direction"],
        image: ruanaBrand.src,
        imageAlt: "Ruana Soul Studio — Audiovisual production brand identity",
        gallery: [
          ruana1.src,
          ruana2.src,
          ruana3.src,
          ruana4.src,
          ruana5.src,
        ],
        ctaLabel: "View details",
        seoTitle: "Ruana Soul Studio — Audiovisual Production Brand Identity | Keishmer Studio",
        seoDescription:
          "Brand identity and visual system for Ruana Soul Studio, an audiovisual production studio creating cinematic experiences with a human, artistic, and transformative approach.",
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
          "Full-service agency website with cinematic storytelling, SEO/AEO strategy, and a conversion-first approach.",
        description:
          "Ruana Soul Studio is a branding, audiovisual production, and web development agency based in Melbourne, focused on giving brands cohesive visual identity through a cinematic approach. We built our own agency website as a live demonstration of everything we offer: scroll-driven storytelling with GSAP, performance-first Astro engineering, SEO and AEO optimization for AI-powered search engines, and a design system that balances visual impact with conversion strategy. The site serves as both our portfolio and our best sales pitch — proving that we can deliver the same quality we promise our clients.",
        challenge:
          "Most agency websites fall into one of two traps: they're either a visual playground with no conversion strategy, or a template site with no personality. We needed to build something that was genuinely beautiful, technically excellent, AND moved visitors toward a clear next step — all while demonstrating our capabilities in branding, web development, audiovisual production, and SEO/AEO in a cohesive way.",
        solution:
          "We built the site using Astro SSR for performance, with GSAP powering scroll-triggered animations and cinematic entrance sequences. The design system uses custom typography, a refined color palette, and a layout that balances information density with breathing room. Every section is a considered argument for working with us. SEO and AEO (Answer Engine Optimization) were integrated from the ground up — with JSON-LD structured data, semantic HTML hierarchy, and content structured for both traditional search engines and AI answer engines. The blog pulls from our Medium RSS feed and integrates directly into the site's content ecosystem.",
        outcome:
          "The site achieves perfect Lighthouse scores with sub-second page loads. The contact form converts at above-industry-average rates. The site ranks on page one for our primary search terms in Melbourne and performs strongly in AI-powered search results. It serves as a living portfolio that demonstrates our capabilities across branding, web development, audiovisual production, and content strategy — all in one cohesive platform.",
        client: "Ruana Soul Studio",
        year: "2024",
        services: ["Web Development", "Astro SSR", "GSAP Animation", "SEO & AEO Strategy", "Content Strategy"],
        image:
          ruanaWeb.src,
        imageAlt: "Ruana Soul Studio — Full-service agency website",
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
        seoTitle: "Ruana Soul Studio — Full-Service Agency Website | Branding, Web Dev & SEO",
        seoDescription:
          "How Ruana Soul Studio built its own agency website — Astro SSR, GSAP animations, SEO/AEO strategy, and a conversion-first approach that demonstrates our full service capabilities.",
      },
      {
        id: "karim-ventas",
        title: "Karim Ventas",
        tagline:
          "Custom Shopify e-commerce with bespoke Liquid components for a Colombian cosmetics and self-care brand.",
        description:
          "Karim Ventas is the online and physical store for the Karim brand, a Colombian cosmetics and self-care company based in Barrancabermeja. We built a fully customized Shopify e-commerce platform using the Tinker v4.1.1 theme as foundation, developing bespoke Shopify Liquid components — custom theme blocks with tailored schemas, inline SVG icon systems, JSON templates for flexible page composition, and a block-based architecture that gives the merchant full control over their store layout. The result is an online store that captures Karim's warm, kawaii-colombiana aesthetic while handling everything from product categorization and inventory management to national shipping across Colombia.",
        challenge:
          "Karim needed an online store that matched the warmth and personality of their physical boutique. Off-the-shelf Shopify themes couldn't capture their unique kawaii-colombiana aesthetic — a blend of visual tenderness with local Colombian identity and feminine character. The store had to feel personal and curated while maintaining full e-commerce capabilities: product variants, inventory tracking, shipping integrations for national delivery, and a seamless mobile checkout experience.",
        solution:
          "We built on top of Tinker v4.1.1, creating a library of custom Shopify Liquid components that translated Karim's brand into a cohesive digital shopping experience. We developed custom theme blocks with bespoke Liquid schemas, a block-based page composition system for flexible layout control, and inline SVG icon systems for brand-specific visual elements. The design uses clamp-based responsive scaling, Urbanist and Playfair Display typography, and a warm pastel palette with tropical accents. Product pages, category navigation, and the cart flow were re-engineered with custom Liquid to maintain brand consistency at every touchpoint — from the hero section to the checkout confirmation.",
        outcome:
          "Karim Ventas launched with a fully operational online store that bridges their physical boutique in Barrancabermeja with customers nationwide. The custom Liquid components give the Karim team the flexibility to update products, categories, and promotions without losing brand consistency. The block-based architecture allows them to add seasonal campaigns and new product lines independently. The platform serves as Karim's primary digital sales channel, supporting their growth from a local boutique to a national e-commerce brand with a distinctive, ownable online identity.",
        client: "Karim Ventas",
        year: "2024",
        services: ["Shopify Development", "Custom Liquid Components", "E-commerce Design", "Theme Development", "UX Design"],
        image:
          karimWeb.src,
        imageAlt: "Karim Ventas — Custom Shopify e-commerce for Colombian cosmetics brand",
        gallery: [
          "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?q=80&w=900&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=900&auto=format&fit=crop",
        ],
        ctaLabel: "View details",
        seoTitle: "Karim Ventas — Custom Shopify E-commerce with Liquid Components | Keishmer Studio",
        seoDescription:
          "Custom Shopify e-commerce built with bespoke Liquid components for Karim Ventas, a Colombian cosmetics and self-care brand. Theme development, block architecture, and e-commerce design by Keishmer Studio.",
      },
      {
        id: "wisegold-capital",
        title: "WiseGold Capital",
        tagline:
          "Multi-language institutional platform with Medium RSS blog integration and automated translation across 6 languages.",
        description:
          "WiseGold Capital is an institutional gold and silver custody infrastructure designed for capital preservation and operational continuity. We built a multi-language platform (English, Spanish, Portuguese, French, Chinese, Arabic) that communicates their sophisticated custody model — from advisory and vault services to proprietary trading and technology infrastructure — to a global institutional audience. The platform features a fully automated blog system that fetches articles from their Medium RSS feed, stores them in a PostgreSQL database, and automatically translates every post into all 5 additional languages via Azure Translator API with HTML-aware translation that preserves formatting and structure.",
        challenge:
          "WiseGold operates in a highly regulated, trust-intensive industry. Their platform needed to communicate complex custody structures — assigned vs consolidated inventory, multi-tier governance with independent depositaries, AML/CTF compliance frameworks — in a way that institutional clients and intermediaries across different jurisdictions could understand and trust. Their content strategy relied on Medium for thought leadership, but Medium doesn't support their multi-language audience across 6 languages. They needed a system that could bridge content creation (Medium) with a localized, database-driven platform without manual translation effort.",
        solution:
          "We built an Astro SSR platform with a Node.js backend and PostgreSQL database. The blog system uses a cron-driven RSS fetcher that polls Medium's feed every 30 minutes, stores new posts in the database, and triggers Azure Translator API to translate each post into all 5 additional languages. The frontend serves translated content from the database with lazy fallback translation for edge cases. The information architecture breaks down complex custody concepts into clear service pillars (Advisory, Vault, Technology, Trading) with visual hierarchy that guides institutional clients through the value chain. Multi-language support is handled via intelligent middleware with cookie-based, Accept-Language, and IP geolocation detection. The platform is deployed on Azure VMs with Docker, using Nginx and automated SSL via Certbot.",
        outcome:
          "WiseGold Capital launched with a robust multi-language platform that serves as both their institutional presence and their content marketing engine. The automated blog system keeps all 6 language versions continuously updated with fresh content without manual intervention — new Medium posts are automatically fetched, translated, and published across the entire platform. The PostgreSQL-backed storage ensures reliable content delivery with sub-second page loads. The platform has become a key credibility signal for institutional clients evaluating their custody infrastructure, with the multi-language capability particularly valued by their Latin American, European, and Asian intermediary networks.",
        client: "WiseGold Capital",
        year: "2024",
        services: ["Web Development", "Multi-language Platform", "Blog System Integration", "Database Architecture", "Cloud Infrastructure"],
        image:
          wisegoldWeb.src,
        imageAlt: "WiseGold Capital — Multi-language institutional platform with blog automation",
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
        seoTitle: "WiseGold Capital — Multi-language Institutional Platform | Keishmer Studio",
        seoDescription:
          "Multi-language institutional platform for WiseGold Capital with Medium RSS blog integration, PostgreSQL storage, and automated Azure translation across 6 languages. Built by Keishmer Studio.",
      },
      {
        id: "didier-perez",
        title: "Didier Pérez — Abogado",
        tagline:
          "Professional portfolio website for a Colombian administrative law attorney, built as a clean, single-page static site.",
        description:
          "Didier Pérez is a Colombian lawyer specialized in Administrative Law, offering legal advisory and representation for individuals and state procedures. We designed and developed a professional portfolio website that presents his practice areas — Administrative Law, Notarial Law, Civil Law, and Fundamental Rights defense — in a clean, authoritative, and accessible format. Built as a single-page static site deployed via GitHub Pages, the design prioritizes clarity and trust: a professional color scheme, clear typography hierarchy using Open Sans and Urbanist, and straightforward navigation that helps potential clients quickly understand his expertise and reach out via WhatsApp and contact forms.",
        challenge:
          "Legal professionals need a web presence that communicates authority, trust, and accessibility — but most lawyer websites in Colombia are either overly complex corporate portals or generic templates that fail to build confidence. Didier needed a site that felt professional without being intimidating, approachable without being informal, and that clearly presented his areas of practice in a way that potential clients from different backgrounds could immediately understand and take action on. The site also needed to work flawlessly on mobile devices, where most legal searches originate.",
        solution:
          "We developed a clean single-page portfolio with a focus on content hierarchy and conversion. The hero section immediately establishes Didier's specialization in Administrative Law and his location in Colombia. Practice areas are presented with clear descriptions that help potential clients self-identify their legal needs. A prominent consultation CTA with integrated WhatsApp link makes it frictionless to initiate contact. The design uses a restrained professional color palette defined via CSS custom properties, Open Sans for body readability, and Urbanist for headings. The static architecture ensures instant loading and zero maintenance — critical for a legal professional who should focus on their practice, not their website.",
        outcome:
          "The site serves as Didier's primary digital storefront, presenting his legal expertise in a professional, trustworthy format that builds instant credibility. The clear practice area breakdown helps potential clients self-identify their needs before reaching out, reducing friction in the initial consultation request. The WhatsApp integration has become a primary channel for consultation inquiries. The static site architecture guarantees fast load times, mobile optimization, and zero maintenance overhead — allowing Didier to focus on his legal practice while maintaining a professional online presence that competes with larger firms.",
        client: "Didier Pérez",
        year: "2024",
        services: ["Web Design", "Static Site Development", "UI/UX Design", "SEO"],
        image:
          didierWeb.src,
        imageAlt: "Didier Pérez — Legal portfolio website for Colombian administrative law attorney",
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
        seoTitle: "Didier Pérez — Legal Portfolio Website for Administrative Law Attorney | Keishmer Studio",
        seoDescription:
          "Professional portfolio website for Didier Pérez, Colombian administrative law attorney. Clean single-page design with practice area presentation and WhatsApp integration by Keishmer Studio.",
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