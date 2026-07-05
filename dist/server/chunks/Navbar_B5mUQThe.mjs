import { C as createAstro, _ as renderHead, a as renderComponent, f as renderTemplate, g as maybeRenderHead, l as renderSlot, n as renderScript, v as addAttribute, w as createComponent, x as unescapeHTML } from "./server_zi87HHEW.mjs";
import "./compiler_D1XTSHuQ.mjs";
//#endregion
//#region src/i18n/index.ts
var translations = {
	en: {
		site: {
			"title": "Keishmer Pérez Torres - UX/UI Designer, Visual Artist and Frontend Developer",
			"description": "Keishmer Perez is a Visual Artist and Multimedia Designer specialized in UX/UI and front-end development. Explore my portfolio and projects.",
			"url": "https://keishmerstudio.com",
			"author": "Keishmer Pérez Torres"
		},
		nav: {
			"menu": "Menu",
			"uxuiDesigner": "UX/UI Designer",
			"frontendDev": "Frontend Dev",
			"visualArtist": "Visual Artist",
			"downloadCV": "Download CV",
			"projects": "Projects",
			"contact": "Contact",
			"logo": "KEISHMER STUDIO"
		},
		hero: {
			"available": "Available for design, SEO, frontend development, and branding projects",
			"name": "Keishmer Pérez",
			"subtitle": "UX/UI Designer, Frontend Developer, and Visual Artist in Colombia. I create digital experiences, branding, and SEO-optimized websites with a focus on clarity, conversion, and visual value",
			"cta": "Start a project",
			"whatIAm": "What I am",
			"expertise": "Expertise",
			"roleVisualArtist": "Visual Artist",
			"roleFrontendDev": "Web Developer",
			"roleProductDesigner": "UX/UI Designer",
			"expAIGenerative": "AI Generative",
			"expBranding": "Branding Design",
			"expResearch": "Strategic Research"
		},
		about: {
			"title": "I design at the intersection of art, strategy design, and technology",
			"subtitle": "My work brings together UX/UI, frontend development, branding, and visual thinking to create digital experiences that are clear, functional, and intentional.",
			"text1": "With a background in visual arts and experience across product design, teaching, and digital environments, I approach each project with both conceptual depth and technical precision",
			"text2": "I am interested in creating solutions that do more than look good, perform better, and create real value for people and brands",
			"cta": "Know More About Me",
			"imageAlt": "Selfie"
		},
		aboutMe: {
			"title": "About Me",
			"subtitle": "Product Designer & Visual Artist",
			"breadcrumb": "About Me",
			"imageAlt": "Keishmer Pérez Torres — Product Designer, UX/UI and Visual Artist portrait",
			"role": "Product Designer · UX/UI Designer · Visual Artist",
			"location": "Pamplona, Norte de Santander, Colombia",
			"intro": "I am a Product Designer and Visual Artist who builds digital experiences at the intersection of art, strategy, and technology. I specialize in UX/UI design, AI-driven design, branding, and front-end development — creating products that are intuitive, performant, and visually compelling.",
			"professionalSummary": "Keishmer Pérez Torres is a Product Designer and Visual Artist with over 4 years of experience across digital product design, university teaching, and multimedia production. He holds a Master's degree in Multimedia Design and Production from Universidad Internacional de la Rioja (Spain) and a Bachelor's in Visual Arts from Universidad de Pamplona (Colombia). He currently works as a Product Designer at Move On Tech Service, leading visual and functional design for digital solutions in the security and logistics sector. Previously, he served as a university lecturer in Industrial Design, coordinated digital library services, and created multimedia content for educational and cultural institutions. With 40+ certifications in design, development, AI, SEO, and marketing, he brings a multidisciplinary approach to every project — combining artistic sensibility, technical precision, and strategic thinking to deliver solutions that create real value for people and brands.",
			"skillsTitle": "Skills & Specialties",
			"skillAI": "AI Design",
			"skillUX": "UX Research & UI Design",
			"skillProduct": "Product Design",
			"skillBranding": "Branding & Identity",
			"skillFrontend": "Frontend Development",
			"skillSEO": "SEO / AEO / GEO",
			"skillFigma": "Figma & Design Systems",
			"skillMobile": "iOS & Android Design",
			"skillMarketing": "Content Strategy & Marketing",
			"skillReact": "React · Next.js · Astro",
			"skillHTML": "HTML · CSS · JavaScript",
			"skillCyber": "Cybersecurity Fundamentals",
			"experienceTitle": "Work Experience",
			"exp1Role": "Product Designer / UX/UI Designer",
			"exp1Company": "Move On Tech Service",
			"exp1Period": "2024 — Present",
			"exp1Desc": "Leads visual and functional design of digital solutions focused on security and high-value logistics. Develops interactive prototypes in Figma to optimize user experience across mobile, web, and multi-device platforms. Maintains a hands-on approach to product design, UX research, and front-end collaboration.",
			"exp2Role": "Industrial Design Lecturer",
			"exp2Company": "Universidad de Pamplona",
			"exp2Period": "2023 — 2024",
			"exp2Desc": "Led research and product creation processes using user-centered design methodologies for wood products, technical drawing, and manual illustration. Taught courses on two-dimensional and three-dimensional representation with physical materials and guided practical workshops on contemporary design trends and fundamentals.",
			"exp3Role": "Digital Libraries Coordinator",
			"exp3Company": "Universidad de Pamplona",
			"exp3Period": "2023 — 2024",
			"exp3Desc": "Led the transition and management of library services to digital environments. Implemented academic search tools, open access resources, and content curation strategies. Established visual communication campaigns to promote scientific databases and research resources across the university community.",
			"exp4Role": "Multimedia Designer",
			"exp4Company": "Universidad de Pamplona",
			"exp4Period": "2023 — 2024",
			"exp4Desc": "Created graphics, videos, and interactive content for educational and cultural campaigns. Supported institutional communication through visual design and multimedia tools. Optimized the brand's omnichannel experience across digital and physical touchpoints.",
			"educationTitle": "Education",
			"edu1Degree": "Master's in Multimedia Design and Production",
			"edu1School": "Universidad Internacional de la Rioja (Spain)",
			"edu1Period": "2023 — 2024",
			"edu2Degree": "Diploma in Cultural Project Management",
			"edu2School": "Universidad EAN · Ministry of Culture",
			"edu2Period": "2022",
			"edu3Degree": "Bachelor's in Visual Arts",
			"edu3School": "Universidad de Pamplona (Colombia)",
			"edu3Period": "2016 — 2021",
			"certificationsTitle": "Certifications & Continuous Learning",
			"certCount": "40+ certifications in design, development, AI, SEO, and marketing",
			"certKey1": "Branding & Identity Design",
			"certKey2": "AI & Generative Tools (Gemini, Perplexity, Copilot)",
			"certKey3": "SEO, AEO & GEO for Organic Search",
			"certKey4": "React.js & Modern Frontend",
			"certKey5": "Design Systems & Information Architecture",
			"certKey6": "Product Management for Mobile",
			"certKey7": "Content Strategy & Social Media Marketing",
			"certKey8": "A/B Testing & Data-Driven Design",
			"certKey9": "Cybersecurity & Digital Protection",
			"certKey10": "Shopify & E-commerce Platforms",
			"valuesTitle": "My Values",
			"value1": "Clarity & Simplicity",
			"value1Desc": "Every pixel must have a purpose. I believe in clean, intuitive design that communicates without friction.",
			"value2": "Technical Integrity",
			"value2Desc": "I write code that is maintainable, accessible, and performant. Design without solid engineering is incomplete.",
			"value3": "Human-Centered",
			"value3Desc": "Every decision starts with the user. I design for real people with real needs and contexts.",
			"cta": "Let's Work Together",
			"ctaSubtext": "Have a project in mind? I'm available for design, development, and branding projects worldwide."
		},
		seo: {
			"home": {
				"title": "Keishmer Pérez Torres - UX/UI Designer, Visual Artist and Frontend Developer",
				"description": "Keishmer Perez is a Visual Artist and Multimedia Designer specialized in UX/UI and front-end development. Explore my portfolio and projects."
			},
			"uxui": {
				"title": "UX/UI Design Portfolio - Keishmer Pérez Torres",
				"description": "Explore UX/UI design projects by Keishmer Perez: user interfaces, design systems, wireframes, and prototypes built with Figma."
			},
			"frontend": {
				"title": "Frontend Development Portfolio - Keishmer Pérez Torres",
				"description": "Frontend development projects by Keishmer Perez: responsive websites, web apps, and interactive experiences built with modern technologies."
			},
			"visualArtist": {
				"title": "Visual Art Portfolio - Keishmer Pérez Torres",
				"description": "Visual art portfolio by Keishmer Perez: digital art, illustrations, and creative visual projects."
			},
			"aboutMe": {
				"title": "About Keishmer Pérez Torres — Product Designer, UX/UI & Visual Artist | Pamplona, Colombia",
				"description": "Product Designer and Visual Artist based in Pamplona, Colombia. Specialized in UX/UI design, AI design, branding, and front-end development. 40+ certifications, Master's in Multimedia Design. Available for projects worldwide."
			},
			"projects": {
				"title": "Projects Portfolio - Keishmer Pérez Torres",
				"description": "Explore portfolio projects by Keishmer Perez: branding, web development, UX/UI design, and visual art projects."
			},
			"contact": {
				"title": "Contact - Keishmer Pérez Torres",
				"description": "Get in touch with Keishmer Pérez Torres for UX/UI design, frontend development, branding, and visual art projects."
			},
			"terms": {
				"title": "Terms and Conditions - Keishmer Studio",
				"description": "Read the terms and conditions for using Keishmer Studio services and website."
			},
			"privacy": {
				"title": "Privacy Policy - Keishmer Studio",
				"description": "Learn how Keishmer Studio collects, uses, and protects your personal data."
			},
			"error": {
				"title": "404 - Page Not Found - Keishmer Studio",
				"description": "The page you are looking for does not exist or has been moved."
			}
		},
		strategic: {
			"title": "Strategic Vision",
			"description": "Here are some of my recent projects that showcase my skills in UX/UI design and front-end development. Each project reflects my commitment to quality and attention to detail.",
			"ai": "AI",
			"design": "Design",
			"development": "Development",
			"branding": "Branding",
			"seo": "SEO",
			"text1": "I design interfaces, brands, and digital experiences with visual clarity and strategic focus",
			"text2": "I create visual systems and digital experiences that connect identity, function, and value"
		},
		works: { "title": "Best Projects" },
		projects: {
			"title": "Best Projects",
			"description": "A curated selection of work I am proud of. Each project reflects a partnership built on trust, creativity, and a relentless attention to detail.",
			"breadcrumbHome": "Home",
			"breadcrumbProjects": "Best Projects",
			"client": "Client",
			"services": "Services",
			"overview": "Project Overview",
			"challenge": "The Challenge",
			"solution": "Our Solution",
			"outcome": "The Outcome"
		},
		contact: {
			"title": "Let's Work Together",
			"description": "Have a project in mind or just want to say hello? Fill out the form below and I'll get back to you as soon as possible.",
			"namePlaceholder": "Your Name",
			"emailPlaceholder": "Your Email",
			"subjectPlaceholder": "Subject",
			"messagePlaceholder": "Tell me about your project...",
			"submit": "Send Message",
			"success": "Thanks for reaching out! I'll get back to you soon.",
			"error": "Something went wrong. Please try again or send an email directly."
		},
		form: {
			"title": "Start Your Project",
			"description": "Tell me about your project and I'll get back to you within 24 hours.",
			"name": "Legal Name",
			"email": "Client Email",
			"phone": "Phone Number",
			"text": "Subject or Project Idea",
			"submit": "Send Application",
			"privacy": "Privacy Policy",
			"terms": "Terms of Service",
			"apply": "apply."
		},
		terms: {
			"title": "Terms and Conditions",
			"description": "Read the terms and conditions for using Keishmer Studio services and website.",
			"breadcrumb": "Terms and Conditions",
			"lastUpdate": "Last updated: July 2026",
			"intro": "Please read these Terms and Conditions carefully before using the Keishmer Studio website and services.",
			"section1Title": "1. General Information",
			"section1Text": "Keishmer Studio is a personal portfolio and professional services website operated by Keishmer Pérez Torres. Throughout this site, the terms \"we\", \"us\", and \"our\" refer to Keishmer Studio. By accessing this website, you agree to be bound by these Terms and Conditions.",
			"section2Title": "2. Intellectual Property",
			"section2Text": "All content on this website — including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software — is the property of Keishmer Pérez Torres and is protected by applicable intellectual property laws. You may not reproduce, distribute, or exploit any content without explicit written permission.",
			"section3Title": "3. Use of the Website",
			"section3Text": "You agree to use this website for lawful purposes only. You must not use this site in any way that damages, disables, overburdens, or impairs the site or interferes with any other party's use of the site.",
			"section4Title": "4. Third-Party Links",
			"section4Text": "This website may contain links to third-party websites. These links are provided for your convenience. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites.",
			"section5Title": "5. Limitation of Liability",
			"section5Text": "Keishmer Studio shall not be liable for any damages arising from the use or inability to use the materials on this website, even if we have been notified of the possibility of such damages.",
			"section6Title": "6. Changes to Terms",
			"section6Text": "We reserve the right to revise these Terms and Conditions at any time without prior notice. By continuing to use this website after changes are posted, you agree to be bound by the revised terms.",
			"section7Title": "7. Contact",
			"section7Text": "If you have any questions about these Terms and Conditions, please contact us through the form on our website."
		},
		privacy: {
			"title": "Privacy Policy",
			"description": "Learn how Keishmer Studio collects, uses, and protects your personal data.",
			"breadcrumb": "Privacy Policy",
			"lastUpdate": "Last updated: July 2026",
			"intro": "At Keishmer Studio, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.",
			"section1Title": "1. Information We Collect",
			"section1Text": "We collect personal information that you voluntarily provide to us when you fill out a contact form, including your name, email address, phone number, and any message you submit. We also automatically collect certain information when you visit the website, such as your IP address, browser type, and pages visited.",
			"section2Title": "2. How We Use Your Information",
			"section2Text": "We use the information we collect to respond to your inquiries, provide services you request, improve our website, and send occasional updates if you have opted in. We do not sell your personal information to third parties.",
			"section3Title": "3. Data Protection",
			"section3Text": "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.",
			"section4Title": "4. Third-Party Services",
			"section4Text": "We use Supabase for database storage, Resend for email notifications, and Google reCAPTCHA for spam protection. These services have their own privacy policies governing the use of your data.",
			"section5Title": "5. Cookies",
			"section5Text": "Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie preferences through your browser settings.",
			"section6Title": "6. Your Rights",
			"section6Text": "Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete your information. To exercise these rights, please contact us.",
			"section7Title": "7. Changes to This Policy",
			"section7Text": "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.",
			"section8Title": "8. Contact",
			"section8Text": "If you have questions about this Privacy Policy, please reach out through the contact form on our website."
		},
		subpages: {
			"uxuiTitle": "UX/UI Design",
			"uxuiDescription": "Explore my UX/UI design projects, case studies, and design process. Coming soon.",
			"frontendTitle": "Frontend Development",
			"frontendDescription": "Discover frontend development projects built with modern technologies. Coming soon.",
			"visualTitle": "Visual Art",
			"visualDescription": "Browse my visual art portfolio including digital art, illustrations, and creative projects. Coming soon.",
			"comingSoon": "Coming soon",
			"comingSoonDescription": "This page is under construction. New content will be available soon."
		},
		error: {
			"title": "404 - Page Not Found",
			"description": "The page you are looking for does not exist or has been moved.",
			"message": "The page you are looking for does not exist or has been moved.",
			"cta": "Go back home"
		},
		footer: {
			"description": "Design, development and visual art — everything you need to build a brand that stands out.",
			"copyright": "© 2026 Keishmer Studio. All rights reserved.",
			"pagesTitle": "Pages",
			"legalTitle": "Legal",
			"logo": "Keishmer Studio"
		},
		jsonld: {
			"personName": "Keishmer Pérez Torres",
			"jobTitle": "Product Designer, UX/UI Designer & Frontend Developer",
			"jobTitleEs": "Artista Visual, Diseñador UX/UI & Desarrollador Frontend",
			"knowsAbout": [
				"UX/UI Design",
				"Product Design",
				"AI Design",
				"Figma",
				"Design Systems",
				"iOS Design",
				"Android Design",
				"Branding",
				"Frontend Development",
				"React",
				"Next.js",
				"Astro",
				"HTML",
				"CSS",
				"JavaScript",
				"SEO",
				"AEO",
				"GEO",
				"Multimedia Design",
				"Graphic Design",
				"Illustration",
				"Content Strategy",
				"Marketing",
				"Cybersecurity"
			],
			"knowsAboutEs": [
				"Diseño UX/UI",
				"Diseño de Producto",
				"Diseño con IA",
				"Figma",
				"Sistemas de Diseño",
				"Diseño iOS",
				"Diseño Android",
				"Branding",
				"Desarrollo Frontend",
				"React",
				"Next.js",
				"Astro",
				"HTML",
				"CSS",
				"JavaScript",
				"SEO",
				"AEO",
				"GEO",
				"Diseño Multimedia",
				"Diseño Gráfico",
				"Ilustración",
				"Estrategia de Contenido",
				"Marketing",
				"Ciberseguridad"
			]
		}
	},
	es: {
		site: {
			"title": "Keishmer Pérez Torres - Diseñador UX/UI, Artista Visual y Desarrollador Frontend",
			"description": "Keishmer Perez es un Artista Visual y Diseñador Multimedia especializado en UX/UI y desarrollo frontend. Explora mi portafolio y proyectos.",
			"url": "https://keishmerstudio.com",
			"author": "Keishmer Perez"
		},
		nav: {
			"menu": "Menú",
			"uxuiDesigner": "Diseñador UX/UI",
			"frontendDev": "Desarrollador Frontend",
			"visualArtist": "Artista Visual",
			"downloadCV": "Descargar CV",
			"projects": "Proyectos",
			"contact": "Contacto",
			"logo": "KEISHMER STUDIO"
		},
		hero: {
			"available": "Disponible para proyectos de diseño, SEO, desarrollo frontend y branding",
			"name": "Keishmer Perez",
			"subtitle": "UX/UI Designer, Frontend Developer y Artista Visual en Colombia. Creo experiencias digitales, branding y sitios web optimizados para SEO, con enfoque en claridad, conversión y valor visual",
			"cta": "Escríbeme",
			"whatIAm": "Qué soy",
			"expertise": "Expertise",
			"roleVisualArtist": "Artista Visual",
			"roleFrontendDev": "Programador Web",
			"roleProductDesigner": "Diseñador UX/UI",
			"expAIGenerative": "IA Generativa",
			"expBranding": "Diseño de Marca",
			"expResearch": "Investigación Estratégica"
		},
		about: {
			"title": "Diseño desde la intersección entre arte, estrategia y tecnología",
			"subtitle": "Mi trabajo une UX/UI, desarrollo frontend, branding y pensamiento visual para crear experiencias digitales claras, funcionales y con intención.",
			"text1": "Con formación en artes visuales y experiencia en diseño, investigación y entornos digitales, abordo cada proyecto con una mirada conceptual y técnica",
			"text2": "Me interesa construir soluciones que comuniquen mejor, funcionen mejor y generen valor real para las personas y las marcas",
			"cta": "Saber Más Sobre Mí",
			"imageAlt": "Foto de perfil"
		},
		aboutMe: {
			"title": "Sobre Mí",
			"subtitle": "Product Designer & Artista Visual",
			"breadcrumb": "Sobre Mí",
			"imageAlt": "Keishmer Pérez Torres — Product Designer, UX/UI y Artista Visual",
			"role": "Product Designer · Diseñador UX/UI · Artista Visual",
			"location": "Pamplona, Norte de Santander, Colombia",
			"intro": "Soy Product Designer y Artista Visual. Construyo experiencias digitales desde la intersección entre arte, estrategia y tecnología. Me especializo en diseño UX/UI, diseño con inteligencia artificial, branding y desarrollo front-end — creando productos intuitivos, eficientes y visualmente sólidos.",
			"professionalSummary": "Keishmer Pérez Torres es Product Designer y Artista Visual con más de 4 años de experiencia en diseño de productos digitales, docencia universitaria y producción multimedia. Posee un Máster en Diseño y Producción Multimedia de la Universidad Internacional de la Rioja (España) y una Licenciatura en Artes Visuales de la Universidad de Pamplona (Colombia). Actualmente trabaja como Product Designer en Move On Tech Service, liderando el diseño visual y funcional de soluciones digitales para el sector de seguridad y logística. Anteriormente se desempeñó como docente universitario de Diseño Industrial, coordinador de bibliotecas digitales y diseñador multimedia para instituciones educativas y culturales. Con más de 40 certificaciones en diseño, desarrollo, IA, SEO y marketing, aporta un enfoque multidisciplinario a cada proyecto — combinando sensibilidad artística, precisión técnica y pensamiento estratégico para entregar soluciones que generan valor real para las personas y las marcas.",
			"skillsTitle": "Habilidades & Especialidades",
			"skillAI": "Diseño con IA",
			"skillUX": "UX Research & Diseño UI",
			"skillProduct": "Diseño de Producto",
			"skillBranding": "Branding e Identidad",
			"skillFrontend": "Desarrollo Frontend",
			"skillSEO": "SEO / AEO / GEO",
			"skillFigma": "Figma & Sistemas de Diseño",
			"skillMobile": "Diseño iOS & Android",
			"skillMarketing": "Estrategia de Contenido y Marketing",
			"skillReact": "React · Next.js · Astro",
			"skillHTML": "HTML · CSS · JavaScript",
			"skillCyber": "Fundamentos de Ciberseguridad",
			"experienceTitle": "Experiencia Laboral",
			"exp1Role": "Product Designer / Diseñador UX/UI",
			"exp1Company": "Move On Tech Service",
			"exp1Period": "2024 — Presente",
			"exp1Desc": "Lidera el diseño visual y funcional de soluciones digitales enfocadas en seguridad y logística de valor. Desarrolla prototipos interactivos en Figma para optimizar la experiencia del usuario en plataformas móviles, web y multidispositivo. Mantiene un enfoque práctico en diseño de producto, UX research y colaboración con desarrollo front-end.",
			"exp2Role": "Docente de Diseño Industrial",
			"exp2Company": "Universidad de Pamplona",
			"exp2Period": "2023 — 2024",
			"exp2Desc": "Lideró procesos de investigación y creación de productos con metodologías de diseño centrado en el usuario aplicadas a objetos en madera, representación técnica en planos e ilustración manual. Dictó asignaturas de representación bidimensional y tridimensional con materiales físicos y guió talleres prácticos sobre tendencias contemporáneas y fundamentos del diseño.",
			"exp3Role": "Coordinador de Bibliotecas Digitales",
			"exp3Company": "Universidad de Pamplona",
			"exp3Period": "2023 — 2024",
			"exp3Desc": "Lideró la transición y gestión de servicios bibliotecarios hacia entornos digitales. Implementó herramientas de consulta académica, acceso abierto y curaduría de contenidos. Estableció estrategias de comunicación visual para promover bases de datos y recursos científicos en la comunidad universitaria.",
			"exp4Role": "Diseñador Multimedia",
			"exp4Company": "Universidad de Pamplona",
			"exp4Period": "2023 — 2024",
			"exp4Desc": "Creó piezas gráficas, videos y contenidos interactivos para campañas educativas y culturales. Apoyó la comunicación institucional mediante diseño visual y herramientas multimedia. Optimizó la experiencia omnicanal de la marca en puntos de contacto digitales y físicos.",
			"educationTitle": "Formación Académica",
			"edu1Degree": "Máster en Diseño y Producción Multimedia",
			"edu1School": "Universidad Internacional de la Rioja (España)",
			"edu1Period": "2023 — 2024",
			"edu2Degree": "Diplomado en Gestión y Formulación de Proyectos Culturales",
			"edu2School": "Universidad EAN · Ministerio de Cultura",
			"edu2Period": "2022",
			"edu3Degree": "Maestro en Artes Visuales",
			"edu3School": "Universidad de Pamplona (Colombia)",
			"edu3Period": "2016 — 2021",
			"certificationsTitle": "Certificaciones y Aprendizaje Continuo",
			"certCount": "Más de 40 certificaciones en diseño, desarrollo, IA, SEO y marketing",
			"certKey1": "Branding y Diseño de Identidad",
			"certKey2": "IA y Herramientas Generativas (Gemini, Perplexity, Copilot)",
			"certKey3": "SEO, AEO y GEO para Búsqueda Orgánica",
			"certKey4": "React.js y Frontend Moderno",
			"certKey5": "Sistemas de Diseño y Arquitectura de Información",
			"certKey6": "Product Management para Mobile",
			"certKey7": "Estrategia de Contenido y Redes Sociales",
			"certKey8": "A/B Testing y Diseño Basado en Datos",
			"certKey9": "Ciberseguridad y Protección Digital",
			"certKey10": "Shopify y Plataformas E-commerce",
			"valuesTitle": "Mis Valores",
			"value1": "Claridad & Simplicidad",
			"value1Desc": "Cada píxel debe tener un propósito. Creo en el diseño limpio e intuitivo que comunica sin fricción.",
			"value2": "Integridad Técnica",
			"value2Desc": "Escribo código mantenible, accesible y eficiente. El diseño sin una ingeniería sólida está incompleto.",
			"value3": "Enfocado en las Personas",
			"value3Desc": "Cada decisión comienza con el usuario. Diseño para personas reales con necesidades y contextos reales.",
			"cta": "Trabajemos Juntos",
			"ctaSubtext": "¿Tienes un proyecto en mente? Estoy disponible para proyectos de diseño, desarrollo y branding en todo el mundo."
		},
		seo: {
			"home": {
				"title": "Keishmer Pérez Torres - Diseñador UX/UI, Artista Visual y Desarrollador Frontend",
				"description": "Keishmer Perez es un Artista Visual y Diseñador Multimedia especializado en UX/UI y desarrollo frontend. Explora mi portafolio y proyectos."
			},
			"uxui": {
				"title": "Portafolio de Diseño UX/UI - Keishmer Pérez Torres",
				"description": "Explora proyectos de diseño UX/UI de Keishmer Perez: interfaces de usuario, sistemas de diseño, wireframes y prototipos creados con Figma."
			},
			"frontend": {
				"title": "Portafolio de Desarrollo Frontend - Keishmer Pérez Torres",
				"description": "Proyectos de desarrollo frontend de Keishmer Perez: sitios web responsivos, aplicaciones web y experiencias interactivas con tecnologías modernas."
			},
			"visualArtist": {
				"title": "Portafolio de Arte Visual - Keishmer Pérez Torres",
				"description": "Portafolio de arte visual de Keishmer Perez: arte digital, ilustraciones y proyectos visuales creativos."
			},
			"aboutMe": {
				"title": "Sobre Keishmer Pérez Torres — Product Designer, UX/UI y Artista Visual | Pamplona, Colombia",
				"description": "Product Designer y Artista Visual con sede en Pamplona, Colombia. Especializado en diseño UX/UI, diseño con IA, branding y desarrollo frontend. Más de 40 certificaciones, Máster en Diseño Multimedia. Disponible para proyectos en todo el mundo."
			},
			"projects": {
				"title": "Portafolio de Proyectos - Keishmer Pérez Torres",
				"description": "Explora proyectos del portafolio de Keishmer Perez: branding, desarrollo web, diseño UX/UI y proyectos de arte visual."
			},
			"contact": {
				"title": "Contacto - Keishmer Pérez Torres",
				"description": "Ponte en contacto con Keishmer Pérez Torres para proyectos de diseño UX/UI, desarrollo frontend, branding y arte visual."
			},
			"terms": {
				"title": "Términos y Condiciones - Keishmer Studio",
				"description": "Lee los términos y condiciones para usar los servicios y el sitio web de Keishmer Studio."
			},
			"privacy": {
				"title": "Política de Privacidad - Keishmer Studio",
				"description": "Conoce cómo Keishmer Studio recopila, usa y protege tus datos personales."
			},
			"error": {
				"title": "404 - Página No Encontrada - Keishmer Studio",
				"description": "La página que buscas no existe o ha sido movida."
			}
		},
		strategic: {
			"title": "Visión Estratégica",
			"description": "Estos son algunos de mis proyectos recientes que demuestran mis habilidades en diseño UX/UI y desarrollo frontend. Cada proyecto refleja mi compromiso con la calidad y la atención al detalle.",
			"ai": "IA",
			"design": "Diseño",
			"development": "Desarrollo",
			"branding": "Branding",
			"seo": "SEO",
			"text1": "Diseño interfaces, marcas y experiencias digitales con claridad visual y enfoque estratégico",
			"text2": "Creo sistemas visuales y experiencias digitales que conectan identidad, función y valor"
		},
		works: { "title": "Mejores Proyectos" },
		projects: {
			"title": "Mejores Proyectos",
			"description": "Una selección curada de trabajos de los que estoy orgulloso. Cada proyecto refleja una alianza construida sobre confianza, creatividad y una atención implacable al detalle.",
			"breadcrumbHome": "Inicio",
			"breadcrumbProjects": "Mejores Proyectos",
			"client": "Cliente",
			"services": "Servicios",
			"overview": "Resumen del Proyecto",
			"challenge": "El Desafío",
			"solution": "Nuestra Solución",
			"outcome": "El Resultado"
		},
		contact: {
			"title": "Trabajemos Juntos",
			"description": "¿Tienes un proyecto en mente o solo quieres saludar? Completa el formulario y te responderé lo antes posible.",
			"namePlaceholder": "Tu Nombre",
			"emailPlaceholder": "Tu Email",
			"subjectPlaceholder": "Asunto",
			"messagePlaceholder": "Cuéntame sobre tu proyecto...",
			"submit": "Enviar Mensaje",
			"success": "¡Gracias por escribirme! Te responderé pronto.",
			"error": "Algo salió mal. Intenta de nuevo o envía un email directamente."
		},
		form: {
			"title": "Inicia Tu Proyecto",
			"description": "Cuéntame sobre tu proyecto y te responderé en menos de 24 horas.",
			"name": "Nombre Legal",
			"email": "Correo Electrónico",
			"phone": "Teléfono",
			"text": "Asunto o Idea del Proyecto",
			"submit": "Enviar Solicitud",
			"privacy": "Política de Privacidad",
			"terms": "Términos del Servicio",
			"apply": "aplica."
		},
		terms: {
			"title": "Términos y Condiciones",
			"description": "Lee los términos y condiciones para usar los servicios y el sitio web de Keishmer Studio.",
			"breadcrumb": "Términos y Condiciones",
			"lastUpdate": "Última actualización: julio 2026",
			"intro": "Por favor, lee estos Términos y Condiciones cuidadosamente antes de usar el sitio web y los servicios de Keishmer Studio.",
			"section1Title": "1. Información General",
			"section1Text": "Keishmer Studio es un portafolio personal y sitio web de servicios profesionales operado por Keishmer Pérez Torres. A lo largo de este sitio, los términos \"nosotros\" y \"nuestro\" se refieren a Keishmer Studio. Al acceder a este sitio web, aceptas estar sujeto a estos Términos y Condiciones.",
			"section2Title": "2. Propiedad Intelectual",
			"section2Text": "Todo el contenido de este sitio web — incluyendo pero no limitado a texto, gráficos, logotipos, imágenes, clips de audio, descargas digitales y software — es propiedad de Keishmer Pérez Torres y está protegido por las leyes de propiedad intelectual aplicables. No puedes reproducir, distribuir ni explotar ningún contenido sin permiso explícito por escrito.",
			"section3Title": "3. Uso del Sitio Web",
			"section3Text": "Aceptas usar este sitio web solo con fines legales. No debes usar este sitio de ninguna manera que dañe, deshabilite, sobrecargue o deteriore el sitio o interfiera con el uso de otros.",
			"section4Title": "4. Enlaces a Terceros",
			"section4Text": "Este sitio web puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan para tu conveniencia. No tenemos control ni asumimos responsabilidad por el contenido, políticas de privacidad o prácticas de sitios de terceros.",
			"section5Title": "5. Limitación de Responsabilidad",
			"section5Text": "Keishmer Studio no será responsable por daños derivados del uso o la imposibilidad de usar los materiales en este sitio web, incluso si se nos ha notificado la posibilidad de dichos daños.",
			"section6Title": "6. Cambios a los Términos",
			"section6Text": "Nos reservamos el derecho de revisar estos Términos y Condiciones en cualquier momento sin previo aviso. Al continuar usando este sitio web después de que se publiquen los cambios, aceptas estar sujeto a los términos revisados.",
			"section7Title": "7. Contacto",
			"section7Text": "Si tienes preguntas sobre estos Términos y Condiciones, contáctanos a través del formulario en nuestro sitio web."
		},
		privacy: {
			"title": "Política de Privacidad",
			"description": "Conoce cómo Keishmer Studio recopila, usa y protege tus datos personales.",
			"breadcrumb": "Política de Privacidad",
			"lastUpdate": "Última actualización: julio 2026",
			"intro": "En Keishmer Studio, tomamos tu privacidad en serio. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos tu información cuando visitas nuestro sitio web.",
			"section1Title": "1. Información que Recopilamos",
			"section1Text": "Recopilamos información personal que nos proporcionas voluntariamente al llenar un formulario de contacto, incluyendo tu nombre, correo electrónico, número de teléfono y cualquier mensaje que envíes. También recopilamos automáticamente cierta información cuando visitas el sitio web, como tu dirección IP, tipo de navegador y páginas visitadas.",
			"section2Title": "2. Cómo Usamos Tu Información",
			"section2Text": "Usamos la información que recopilamos para responder a tus consultas, proporcionar los servicios que solicites, mejorar nuestro sitio web y enviar actualizaciones ocasionales si has optado por recibirlas. No vendemos tu información personal a terceros.",
			"section3Title": "3. Protección de Datos",
			"section3Text": "Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.",
			"section4Title": "4. Servicios de Terceros",
			"section4Text": "Usamos Supabase para almacenamiento en base de datos, Resend para notificaciones por correo electrónico y Google reCAPTCHA para protección contra spam. Estos servicios tienen sus propias políticas de privacidad que rigen el uso de tus datos.",
			"section5Title": "5. Cookies",
			"section5Text": "Nuestro sitio web puede usar cookies y tecnologías de rastreo similares para mejorar tu experiencia de navegación. Puedes controlar las preferencias de cookies a través de la configuración de tu navegador.",
			"section6Title": "6. Tus Derechos",
			"section6Text": "Dependiendo de tu ubicación, puedes tener derechos sobre tus datos personales, incluyendo el derecho a acceder, corregir o eliminar tu información. Para ejercer estos derechos, contáctanos.",
			"section7Title": "7. Cambios a Esta Política",
			"section7Text": "Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva política en esta página.",
			"section8Title": "8. Contacto",
			"section8Text": "Si tienes preguntas sobre esta Política de Privacidad, comunícate a través del formulario de contacto en nuestro sitio web."
		},
		subpages: {
			"uxuiTitle": "Diseño UX/UI",
			"uxuiDescription": "Explora mis proyectos de diseño UX/UI, casos de estudio y proceso de diseño. Próximamente.",
			"frontendTitle": "Desarrollo Frontend",
			"frontendDescription": "Descubre proyectos de desarrollo frontend construidos con tecnologías modernas. Próximamente.",
			"visualTitle": "Arte Visual",
			"visualDescription": "Explora mi portafolio de arte visual incluyendo arte digital, ilustraciones y proyectos creativos. Próximamente.",
			"comingSoon": "Próximamente",
			"comingSoonDescription": "Esta página está en construcción. Nuevo contenido estará disponible pronto."
		},
		error: {
			"title": "404 - Página No Encontrada",
			"description": "La página que buscas no existe o ha sido movida.",
			"message": "La página que buscas no existe o ha sido movida.",
			"cta": "Volver al inicio"
		},
		footer: {
			"description": "Diseño, desarrollo y arte visual — todo lo que necesitas para construir una marca que destaque.",
			"copyright": "© 2026 Keishmer Studio. Todos los derechos reservados.",
			"pagesTitle": "Páginas",
			"legalTitle": "Legal",
			"logo": "Keishmer Studio"
		},
		jsonld: {
			"personName": "Keishmer Pérez Torres",
			"jobTitle": "Product Designer, Diseñador UX/UI & Desarrollador Frontend",
			"jobTitleEs": "Artista Visual, Diseñador UX/UI & Desarrollador Frontend",
			"knowsAbout": [
				"Diseño UX/UI",
				"Diseño de Producto",
				"Diseño con IA",
				"Figma",
				"Sistemas de Diseño",
				"Diseño iOS",
				"Diseño Android",
				"Branding",
				"Desarrollo Frontend",
				"React",
				"Next.js",
				"Astro",
				"HTML",
				"CSS",
				"JavaScript",
				"SEO",
				"AEO",
				"GEO",
				"Diseño Multimedia",
				"Diseño Gráfico",
				"Ilustración",
				"Estrategia de Contenido",
				"Marketing",
				"Ciberseguridad"
			],
			"knowsAboutEs": [
				"Diseño UX/UI",
				"Diseño de Producto",
				"Diseño con IA",
				"Figma",
				"Sistemas de Diseño",
				"Diseño iOS",
				"Diseño Android",
				"Branding",
				"Desarrollo Frontend",
				"React",
				"Next.js",
				"Astro",
				"HTML",
				"CSS",
				"JavaScript",
				"SEO",
				"AEO",
				"GEO",
				"Diseño Multimedia",
				"Diseño Gráfico",
				"Ilustración",
				"Estrategia de Contenido",
				"Marketing",
				"Ciberseguridad"
			]
		}
	}
};
function useTranslations(lang) {
	const dict = translations[lang];
	function t(key) {
		const keys = key.split(".");
		let value = dict;
		for (const k of keys) if (typeof value === "object" && value !== null && k in value) value = value[k];
		else return key;
		return typeof value === "string" ? value : key;
	}
	function tArray(key) {
		const keys = key.split(".");
		let value = dict;
		for (const k of keys) if (typeof value === "object" && value !== null && k in value) value = value[k];
		else return [];
		return Array.isArray(value) ? value : [];
	}
	return {
		t,
		tArray,
		lang,
		alternateLang: lang === "en" ? "es" : "en"
	};
}
function getLocalizedPath(path, lang) {
	if (lang === "en") return path;
	return `/es/${path.replace(/^\//, "")}`;
}
//#endregion
//#region src/components/SeoHead.astro
createAstro("https://keishmerstudio.com");
var $$SeoHead = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SeoHead;
	const { lang, page, pathname, title: customTitle, description: customDescription } = Astro.props;
	const { t, tArray } = useTranslations(lang);
	const seoKey = page === "home" ? "home" : page === "about-me" ? "aboutMe" : page;
	const title = customTitle || t(`seo.${seoKey}.title`);
	const description = customDescription || t(`seo.${seoKey}.description`);
	const canonical = `https://keishmerstudio.com/${pathname}`;
	const alternateEn = `https://keishmerstudio.com/${page === "home" ? "/" : pathname.replace(/^\/es\//, "/")}`;
	const alternateEs = `https://keishmerstudio.com/${page === "home" && lang === "en" ? "/es/" : pathname.startsWith("/es/") ? pathname : `/es${pathname === "/" ? "/" : pathname}`}`;
	return renderTemplate`<!-- Primary Meta Tags --><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="author"${addAttribute(t("site.author"), "content")}><meta name="theme-color" content="#0a0a0a"><meta name="robots" content="index, follow"><link rel="canonical"${addAttribute(canonical, "href")}><!-- Alternate language links --><link rel="alternate" hreflang="en"${addAttribute(alternateEn, "href")}><link rel="alternate" hreflang="es"${addAttribute(alternateEs, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(alternateEn, "href")}><!-- Open Graph --><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image" content="/Public/Images/About.png"><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:locale"${addAttribute(lang === "en" ? "en_US" : "es_ES", "content")}><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image" content="/Public/Images/About.png"><meta name="twitter:creator" content="@keishmer00"><meta name="twitter:site" content="@keishmer00"><!-- JSON-LD Structured Data for AI indexing --><script type="application/ld+json">${unescapeHTML(JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Person",
		"name": t("jsonld.personName"),
		"jobTitle": t("jsonld.jobTitle"),
		"url": "https://keishmerstudio.com",
		"image": "https://keishmerstudio/Public/images/About.png",
		"sameAs": ["https://twitter.com/keishmer00"],
		"knowsAbout": tArray("jsonld.knowsAbout")
	}))}<\/script><script type="application/ld+json">${unescapeHTML(JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": t("site.title"),
		"url": "https://keishmerstudio.com",
		"description": t("site.description"),
		"inLanguage": lang === "en" ? "en-US" : "es-ES"
	}))}<\/script><script type="application/ld+json">${unescapeHTML(JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebPage",
		"name": title,
		"description": description,
		"url": canonical,
		"inLanguage": lang === "en" ? "en-US" : "es-ES",
		"isPartOf": {
			"@type": "WebSite",
			"url": "https://keishmerstudio.com"
		}
	}))}<\/script>`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/SeoHead.astro", void 0);
//#endregion
//#region src/components/CursorParticles.astro
var $$CursorParticles = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<canvas id="cursor-particles" class="fixed inset-0 pointer-events-none z-50"></canvas>${renderScript($$result, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/CursorParticles.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/CursorParticles.astro", void 0);
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://keishmerstudio.com");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { lang, page, pathname, title, description } = Astro.props;
	return renderTemplate`<html${addAttribute(lang === "en" ? "en" : "es", "lang")} data-astro-cid-ju4pidww><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro.generator, "content")}><meta http-equiv="X-UA-Compatible" content="IE=edge"><link rel="icon" type="image/png" href="/Public/Icons/favicon.png">${renderComponent($$result, "SeoHead", $$SeoHead, {
		"lang": lang,
		"page": page,
		"pathname": pathname,
		"title": title,
		"description": description,
		"data-astro-cid-ju4pidww": true
	})}<script type="text/javascript" defer>
			(function (c, l, a, r, i, t, y) {
				c[a] =
					c[a] ||
					function () {
						(c[a].q = c[a].q || []).push(arguments);
					};
				t = l.createElement(r);
				t.async = 1;
				t.src = "https://www.clarity.ms/tag/" + i;
				y = l.getElementsByTagName(r)[0];
				y.parentNode.insertBefore(t, y);
			})(window, document, "clarity", "script", "tfbwgxewkn");
		<\/script>${renderHead($$result)}</head><body data-astro-cid-ju4pidww>${renderComponent($$result, "CursorParticles", $$CursorParticles, { "data-astro-cid-ju4pidww": true })}${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/layouts/Layout.astro", void 0);
//#endregion
//#region src/components/LanguageSwitcher.astro
createAstro("https://keishmerstudio.com");
var $$LanguageSwitcher = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LanguageSwitcher;
	const { lang, pathname } = Astro.props;
	const targetLang = lang === "en" ? "es" : "en";
	const target = {
		en: pathname.replace(/^\/es(\/|$)/, "/"),
		es: pathname === "/" ? "/es/" : `/es${pathname}`
	}[targetLang];
	return renderTemplate`${maybeRenderHead($$result)}<div><a${addAttribute(target, "href")}${addAttribute(targetLang, "hreflang")}${addAttribute(targetLang === "en" ? "Switch to English" : "Cambiar a Español", "aria-label")} class="flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/20 cursor-pointer transition-all duration-300 w-auto"><span${addAttribute(`flex items-center justify-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] text-gray-300 font-medium leading-none transition-all duration-300 ${lang === "en" ? "bg-white/20 text-white shadow-sm" : "text-gray-300"}`, "class")}><span>EN</span></span><span${addAttribute(`flex items-center justify-center gap-1 px-1.5 py-0.5 rounded-full text-[11px] text-gray-300 font-medium leading-none transition-all duration-300 ${lang === "es" ? "bg-white/20 text-white shadow-sm" : "text-gray-300"}`, "class")}><span>ES</span></span></a></div>`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/LanguageSwitcher.astro", void 0);
//#endregion
//#region src/components/Navbar.astro
createAstro("https://keishmerstudio.com");
var $$Navbar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Navbar;
	const { lang, pathname } = Astro.props;
	const { t } = useTranslations(lang);
	const localizedPath = (path) => {
		if (lang === "en") return path;
		return `/es${path}`;
	};
	return renderTemplate`${maybeRenderHead($$result)}<nav class="fixed flex w-full justify-between px-4 md:px-8 py-4 items-center z-10"><a${addAttribute(localizedPath("/"), "href")} class="text-white hover:text-primary font-mono text-xl no-underline"${addAttribute(t("site.title"), "aria-label")}>${t("nav.logo")}</a><div class="flex items-center gap-3">${renderComponent($$result, "LanguageSwitcher", $$LanguageSwitcher, {
		"lang": lang,
		"pathname": pathname
	})}<button class="flex flex-col gap-2 w-auto h-auto z-50 relative group cursor-pointer" id="openMenu"${addAttribute(t("nav.menu"), "aria-label")}><div id="line1" class="w-6 h-0.5 bg-white transition-all duration-300 group-hover:bg-primary origin-center"></div><div id="line2" class="w-6 h-0.5 bg-white transition-all duration-300 group-hover:bg-primary origin-center"></div></button></div><div id="menuOverlay" class="fixed inset-0 lg:left-290 bg-black/95 lg:border-l lg:border-gray-400 backdrop-blur-md transition-opacity duration-300 opacity-0 pointer-events-none z-40 flex items-center justify-center"><div class="flex flex-col items-start justify-start py-24 w-full h-full relative"><div class="flex flex-col md:flex-row gap-12 items-start justify-start w-full max-w-4xl px-4 text-white"><ul class="flex flex-col gap-6 text-2xl font-mono uppercase px-8 items-start w-full"><p class="text-gray-300 text-sm uppercase tracking-widest mb-2">${t("nav.menu")}</p><li><a${addAttribute(localizedPath("/about-me/"), "href")} class="flex items-center gap-4 hover:text-primary transition-colors group"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" class="group-hover:fill-primary transition-colors"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"></path></svg>${t("aboutMe.title")}</a></li><li><a${addAttribute(localizedPath("/projects/"), "href")} class="flex items-center gap-4 hover:text-primary transition-colors group"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" class="group-hover:fill-primary transition-colors"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"></path></svg>${t("nav.projects")}</a></li><li><a${addAttribute(localizedPath("/ux-ui-design/"), "href")} class="flex items-center gap-4 hover:text-primary transition-colors group"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" class="group-hover:fill-primary transition-colors"><path d="M200-80q-50 0-85-35t-35-85q0-39 22.5-69.5T160-313v-334q-35-13-57.5-43.5T80-760q0-50 35-85t85-35q39 0 69.5 22.5T313-800h334q12-35 42.5-57.5T760-880q50 0 85 35t35 85q0 40-22.5 70.5T800-647v334q35 13 57.5 43.5T880-200q0 50-35 85t-85 35q-39 0-69.5-22.5T647-160H313q-13 35-43.5 57.5T200-80Zm0-640q17 0 28.5-11.5T240-760q0-17-11.5-28.5T200-800q-17 0-28.5 11.5T160-760q0 17 11.5 28.5T200-720Zm560 0q17 0 28.5-11.5T800-760q0-17-11.5-28.5T760-800q-17 0-28.5 11.5T720-760q0 17 11.5 28.5T760-720ZM313-240h334q9-26 28-45t45-28v-334q-26-9-45-28t-28-45H313q-9 26-28 45t-45 28v334q26 9 45 28t28 45Zm447 80q17 0 28.5-11.5T800-200q0-17-11.5-28.5T760-240q-17 0-28.5 11.5T720-200q0 17 11.5 28.5T760-160Zm-560 0q17 0 28.5-11.5T240-200q0-17-11.5-28.5T200-240q-17 0-28.5 11.5T160-200q0 17 11.5 28.5T200-160Zm0-600Zm560 0Zm0 560Zm-560 0Z"></path></svg>${t("nav.uxuiDesigner")}</a></li><li><a${addAttribute(localizedPath("/frontend-dev/"), "href")} class="flex items-center gap-4 hover:text-primary transition-colors group"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" class="group-hover:fill-primary transition-colors"><path d="M200-120q-33 0-56.5-23.5T120-200v-500q0-14 4.5-26.5T138-750l56-68q9-11 20.5-16.5T240-840h480q14 0 25.5 5.5T766-818l56 68q9 11 13.5 23.5T840-700v500q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm-16 520h560v-440H200v440Zm382-78 142-142-142-142-58 58 84 84-84 84 58 58Zm-202 0 58-58-84-84 84-84-58-58-142 142 142 142Zm-180 78v-440 440Z"></path></svg>${t("nav.frontendDev")}</a></li><li><a${addAttribute(localizedPath("/visual-artist/"), "href")} class="flex items-center gap-4 hover:text-primary transition-colors group"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" class="group-hover:fill-primary transition-colors"><path d="M603-160h56v-83l102-24q21-5 43.5-11.5T827-299q0-8-8-14.5T792-326q-38-11-58-34t-18-49q2-21 19.5-37.5T785-474q28-10 41.5-22.5T840-526q0-20-17-30.5t-37-3.5q-6 2-12.5 3t-12.5 1q-26 0-43.5-20T700-625q0-26 13.5-47.5T727-720q0-17-14.5-28.5T677-760q-29 0-40.5 12.5T625-700q0 17 1.5 33t1.5 33q0 45-16 66t-50 21q-11 0-23-3t-23-3q-6 0-9.5 2.5T503-543q0 10 12 20t23 19q26 23 38 44t12 42q0 27-19.5 46T521-353q-11 0-21-2t-21-3q-28-2-43 5t-15 21q0 14 13 23t38 13l131 21v115Zm-450 40-73-33 200-440 73 33-200 440Zm370 40v-128l-57-8q-55-8-89.5-39.5T342-329q0-48 39.5-80.5T476-439q5 0 8.5.5t7.5 1.5q-8-8-15-14.5T464-465q-20-22-29-40.5t-9-37.5q0-38 21.5-62.5T504-630q7 0 19 .5t26 2.5q2-20 0-41t-2-41q0-63 34-97t97-34q56 0 93.5 32t36.5 78q0 23-8 45t-18 43q5-1 10.5-1.5t10.5-.5q48 0 82.5 34.5T920-525q0 43-30.5 77.5T818-402q7 2 13 4t12 5q29 14 47 39.5t18 55.5q0 38-33.5 66.5T779-188l-40 10v98H523ZM138-537q-29-29-43.5-65.5T80-679q0-84 58-142.5T280-880q40 0 76.5 15t65.5 44l-56 56q-17-17-39.5-26t-46.5-9q-50 0-85 35t-35 85q0 24 9 46.5t26 39.5l-57 57Zm493 128Z"></path></svg>${t("nav.visualArtist")}</a></li><li><a${addAttribute(localizedPath("/contact/"), "href")} class="flex items-center gap-4 hover:text-primary transition-colors group"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" class="group-hover:fill-primary transition-colors"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"></path></svg>${t("nav.contact")}</a></li></ul></div><div class="flex flex-col gap-4 p-12 justify-center lg:justify-start"><span class="font-mono uppercase text-gray-300">Social</span><div class="flex gap-4"><a class="font-mono uppercase text-white hover:text-primary transition-colors" href="https://www.linkedin.com/in/keishmer-p%C3%A9rez-torres/">LinkedIn</a><a class="font-mono uppercase text-white hover:text-primary transition-colors" href="https://github.com/Keishmer00">GitHub</a><a class="font-mono uppercase text-white hover:text-primary transition-colors" href="https://www.instagram.com/keishmer00/">Instagram</a></div></div></div></div></nav>${renderScript($$result, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/Navbar.astro", void 0);
//#endregion
export { useTranslations as i, $$Layout as n, getLocalizedPath as r, $$Navbar as t };
