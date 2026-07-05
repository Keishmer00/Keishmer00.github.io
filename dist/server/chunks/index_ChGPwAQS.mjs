import { C as createAstro, a as renderComponent, f as renderTemplate, g as maybeRenderHead, n as renderScript, v as addAttribute, w as createComponent } from "./server_zi87HHEW.mjs";
import { r as __exportAll } from "../entry.mjs";
import "./compiler_D1XTSHuQ.mjs";
import { i as useTranslations, n as $$Layout, r as getLocalizedPath, t as $$Navbar } from "./Navbar_B5mUQThe.mjs";
import { t as $$Footer } from "./Footer_BxyxIJIa.mjs";
import { t as $$CTA } from "./CTA_BYMmOXRV.mjs";
import { t as selfie_default } from "./selfie__gyFHvDf.mjs";
import { t as $$Form } from "./Form_C2muxrn5.mjs";
import { n as getProjectUrl, t as getCategories } from "./projects_DeXMpWWS.mjs";
//#region src/assets/videos/background.mp4
var background_default = "/_astro/background.Cl1iVEIA.mp4";
//#endregion
//#region src/components/Hero.astro
createAstro("https://keishmerstudio.com");
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Hero;
	const { lang } = Astro.props;
	const { t } = useTranslations(lang);
	return renderTemplate`${maybeRenderHead($$result)}<header class="flex flex-col justify-between p-4 pb-8 md:pb-4 pt-44 items-center h-svh lg:h-screen bg-linear-to-r from-black via-black/80 to-black"><section class="flex flex-col justify-center items-center gap-2 md:gap-4"><span class="hidden md:flex text-center max-w-72 md:max-w-none items-center gap-2 px-4 py-1 text-sm md:text-base font-mono uppercase text-white"><div class="hidden md:block w-2 h-2 rounded-full bg-primary"></div>${t("hero.available")}</span><p class="lg:text-6xl text-transparent bg-clip-text bg-linear-to-r from-white/70 via-white to-white/70 text-center font-extrabold font-unbounded w-full text-3xl uppercase">${t("hero.name")}</p><h1 class="text-white text-base md:text-lg font-mono text-center w-full max-w-3xl px-4">${t("hero.subtitle")}</h1>${renderComponent($$result, "CTA", $$CTA, { "lang": lang })}</section><div class="flex w-full justify-between px-4 self-end text-white"><div class="flex flex-col w-full md:w-auto items-center gap-2 md:items-start text-left"><p class="font-mono text-lg uppercase text-gray-300">${t("hero.whatIAm")}</p><div class="font-mono text-lg flex md:flex-col justify-between w-full"><p>${t("hero.roleVisualArtist")}</p><p>${t("hero.roleFrontendDev")}</p><p>${t("hero.roleProductDesigner")}</p></div></div><div class="hidden md:flex flex-col gap-2 items-end text-right"><p class="font-mono text-lg uppercase text-gray-300">${t("hero.expertise")}</p><h2 class="font-mono text-lg">${t("hero.expAIGenerative")}<br>${t("hero.expBranding")}<br>${t("hero.expResearch")}</h2></div></div><video autoplay muted loop playsinline class="absolute -z-10 w-full h-full object-cover inset-0"><source${addAttribute(background_default, "src")} type="video/mp4"></video></header>`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/Hero.astro", void 0);
//#endregion
//#region src/components/About.astro
createAstro("https://keishmerstudio.com");
var $$About = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$About;
	const { lang } = Astro.props;
	const { t } = useTranslations(lang);
	return renderTemplate`${maybeRenderHead($$result)}<section class="flex flex-col items-center p-8 py-16 pb-8 justify-between h-svh lg:h-screen bg-black "><p class="text-left font-mono text-xl self-start text-gray-300">${t("about.title")}</p><h2 class=" text-left font-unbounded pt-4 md:pt-0 text-xl md:text-2xl lg:text-4xl  self-center">${t("about.subtitle")}</h2><div class="flex flex-col lg:flex-row gap-4 justify-between w-full pt-8"><p class=" hidden md:block text-gray-300 text-left font-mono text-base max-w-sm self-start">${t("about.text1")}</p><img${addAttribute(selfie_default.src, "src")}${addAttribute(t("about.imageAlt"), "alt")} class="w-44 lg:w-50 h-auto grayscale border-[0.2px] rounded-lg [corner-shape:scoop] border-white shadow-md shadow-[#000000] self-end"><div class="flex flex-col gap-2 self-end"><a class="flex items-center gap-1 py-1 border-b group hover:text-primary hover:border-primary border-white w-fit self-end"${addAttribute(getLocalizedPath("/about-me/", lang), "href")}>${t("about.cta")}<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="m243-240-51-51 405-405H240v-72h480v480h-72v-357L243-240Z"></path></svg></a><p class="text-end font-mono text-gray-300 text-base max-w-xs self-end">${t("about.text2")}</p></div></div></section>`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/About.astro", void 0);
//#endregion
//#region src/components/Strategic.astro
createAstro("https://keishmerstudio.com");
var $$Strategic = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Strategic;
	const { lang } = Astro.props;
	const { t } = useTranslations(lang);
	return renderTemplate`${maybeRenderHead($$result)}<section id="strategic" class="flex flex-col items-center justify-between h-svh lg:h-screen w-full bg-linear-to-r from-black via-black/80 to-black px-8 py-16 lg:py-16"><div class="flex flex-col items-center w-full gap-2 max-w-3xl "><h4 class="text-lg text-center text-white font-mono font-medium uppercase leading-tight">${t("strategic.title")}</h4><p class="text-gray-400 text-base text-center font-mono md:text-lg leading-relaxed mb-4">${t("strategic.description")}</p></div><article class="flex flex-col justify-between w-full items-center "><h5 class="text-white text-center lg:text-6xl text-4xl font-unbounded font-bold uppercase">${t("strategic.ai")}</h5><h5 class="text-white text-center lg:text-6xl text-4xl font-unbounded font-bold uppercase">${t("strategic.design")}</h5><h5 class="text-white text-center lg:text-6xl text-4xl font-unbounded font-bold uppercase">${t("strategic.development")}</h5><h5 class="text-white text-center lg:text-6xl text-4xl font-unbounded font-bold uppercase">${t("strategic.branding")}</h5><h5 class="text-white text-center lg:text-6xl text-4xl font-unbounded font-bold uppercase">${t("strategic.seo")}</h5></article><article class="flex flex-col lg:flex-row gap-3 lg:gap-0 lg:justify-between w-full"><div class="text-gray-300 text-base lg:text-start text-center max-w-sm font-mono md:text-lg">${t("strategic.text1")}</div><div class="text-gray-300 text-base lg:text-end text-center max-w-sm font-mono md:text-lg">${t("strategic.text2")}</div></article></section>${renderScript($$result, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/Strategic.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/Strategic.astro", void 0);
//#endregion
//#region src/components/Works.astro
createAstro("https://keishmerstudio.com");
var $$Works = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Works;
	const { lang } = Astro.props;
	const { t } = useTranslations(lang);
	const categoriesData = getCategories(lang);
	const categoriesForGrid = categoriesData.map((category) => ({
		id: category.id,
		label: category.label,
		statement: category.statement,
		works: category.works.map((work) => ({
			id: work.id,
			title: work.title,
			description: work.tagline,
			image: work.image,
			imageAlt: work.imageAlt,
			ctaLabel: work.ctaLabel,
			href: getProjectUrl(category.id, work.id, lang)
		}))
	}));
	const defaultCategoryIndex = 0;
	const defaultCategory = categoriesForGrid[defaultCategoryIndex];
	return renderTemplate`${renderComponent($$result, "works-section", "works-section", {
		"id": "works",
		"data-categories": JSON.stringify(categoriesForGrid),
		"class": "flex w-full justify-between bg-black pt-12 pb-12 h-svh lg:h-auto px-8 md:px-6 lg:px-8 selection:bg-brand-primary selection:text-white"
	}, { "default": ($$result) => renderTemplate`
  ${maybeRenderHead($$result)}<div class="w-full mx-auto flex flex-col justify-between h-full"><h3 class="text-xl md:text-2xl text-left lg:text-2xl font-medium uppercase font-unbounded text-white pb-2">${t("works.title")}</h3><p id="works-category-statement" class="text-xl font-medium font-mono text-left text-gray-300 leading-relaxed pb-8">${defaultCategory.statement}</p><div class="flex flex-col-reverse lg:items-start h-[80%] lg:h-full justify-between gap-16 lg:gap-10 xl:gap-14"><!-- Categories + statement --><article class="flex flex-col justify-between shrink-0 order-1 lg:order-2"><div class="flex flex-col gap-2 lg:gap-5 w-full"><div id="works-category-list" role="tablist" aria-label="Work categories" class="flex flex-row justify-between items-center w-auto md:w-fit gap-0 lg:gap-4 p-1">${categoriesData.map((category, index) => {
		const isActive = index === defaultCategoryIndex;
		return renderTemplate`<button type="button" role="tab"${addAttribute(`works-tab-${category.id}`, "id")}${addAttribute(category.id, "data-category-id")}${addAttribute(index, "data-category-index")}${addAttribute(isActive ? "true" : "false", "aria-selected")} aria-controls="works-panel"${addAttribute(isActive ? 0 : -1, "tabindex")}${addAttribute(`category-tab shrink-0 text-base font-mono transition-all duration-300 ease-out px-2 lg:px-4 max-lg:py-1.5 lg:py-2 lg:text-right uppercase ${isActive ? "is-active text-black bg-white" : "text-gray-300 hover:text-white"}`, "class")}>${category.label}</button>`;
	})}</div></div></article><!-- Works grid --><div class="flex-1 h-auto justify-between min-w-0 order-2 lg:order-1 max-lg:overflow-x-hidden" role="tabpanel" id="works-panel"${addAttribute(`works-tab-${defaultCategory.id}`, "aria-labelledby")}><div id="projects" class="flex flex-row h-full lg:h-auto max-lg:overflow-x-auto max-lg:gap-4 max-lg:pb-3 max-lg:snap-x max-lg:snap-mandatory max-lg:[&amp;::-webkit-scrollbar]:hidden max-lg:[-ms-overflow-style:none] max-lg:scrollbar-none lg:grid lg:grid-cols-4 xl:grid-cols-4 lg:gap-5 xl:gap-6">${defaultCategory.works.map((work, index) => renderTemplate`<article${addAttribute(index, "data-work-index")} class="work-card flex flex-col min-w-0 max-lg:shrink-0 max-lg:w-[65vw] max-lg:snap-center h-full lg:max-h-[55vh]"><div class="work-image-wrap flex flex-col w-full overflow-hidden bg-black h-full hover:shadow-lg transition-all duration-300"><img${addAttribute(work.image, "src")}${addAttribute(work.imageAlt, "alt")} loading="lazy" decoding="async" class="work-image w-full flex-1 object-cover grayscale"><div class="py-4 flex flex-col gap-2 bg-black"><h3 class="work-title text-sm md:text-base font-bold font-unbounded uppercase tracking-wide text-white leading-tight">${work.title}</h3><p class="work-desc text-sm text-gray-300 block font-light font-mono leading-relaxed line-clamp-2">${work.description}</p><a${addAttribute(work.href, "href")} target="_blank" class="block work-cta lg:inline-flex items-center gap-1 text-xs font-medium font-mono  hover:text-primary transition-colors duration-200 w-fit group"><span class="work-cta-label">${work.ctaLabel}</span><span class="work-cta-arrow transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span></a></div></div></article>`)}</div></div></div></div>
` })}${renderScript($$result, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/Works.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/Works.astro", void 0);
//#endregion
//#region src/pages/[...lang]/index.astro
var ____lang__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://keishmerstudio.com");
function getStaticPaths() {
	return [{ params: { lang: void 0 } }, { params: { lang: "es" } }];
}
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const { lang = "en" } = Astro.params;
	const pathname = lang === "en" ? "/" : "/es/";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"lang": lang,
		"page": "home",
		"pathname": pathname
	}, { "default": ($$result) => renderTemplate`
  ${maybeRenderHead($$result)}<main>${renderComponent($$result, "Navbar", $$Navbar, {
		"lang": lang,
		"pathname": pathname
	})}${renderComponent($$result, "Hero", $$Hero, { "lang": lang })}${renderComponent($$result, "About", $$About, { "lang": lang })}${renderComponent($$result, "Works", $$Works, { "lang": lang })}${renderComponent($$result, "Strategic", $$Strategic, { "lang": lang })}${renderComponent($$result, "Form", $$Form, { "lang": lang })}${renderComponent($$result, "Footer", $$Footer, {
		"lang": lang,
		"pathname": pathname
	})}</main>
` })}`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/index.astro", void 0);
var $$file = "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/index.astro";
var $$url = "/[...lang]";
//#endregion
//#region \0virtual:astro:page:src/pages/[...lang]/index@_@astro
var page = () => ____lang__exports;
//#endregion
export { page };
