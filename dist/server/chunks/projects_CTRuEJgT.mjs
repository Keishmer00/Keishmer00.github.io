import { C as createAstro, a as renderComponent, f as renderTemplate, g as maybeRenderHead, n as renderScript, v as addAttribute, w as createComponent } from "./server_zi87HHEW.mjs";
import { r as __exportAll } from "../entry.mjs";
import "./compiler_D1XTSHuQ.mjs";
import { i as useTranslations, n as $$Layout, t as $$Navbar } from "./Navbar_B5mUQThe.mjs";
import { t as $$Breadcrumbs } from "./Breadcrumbs_CqzMPImN.mjs";
import { t as $$Footer } from "./Footer_BxyxIJIa.mjs";
import { n as getProjectUrl, t as getCategories } from "./projects_DeXMpWWS.mjs";
//#region src/pages/[...lang]/projects.astro
var projects_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Projects,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://keishmerstudio.com");
function getStaticPaths() {
	return [{ params: { lang: void 0 } }, { params: { lang: "es" } }];
}
var $$Projects = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Projects;
	const { lang = "en" } = Astro.params;
	const { t } = useTranslations(lang);
	const pathname = lang === "en" ? "/projects/" : "/es/projects/";
	const localizedCategories = getCategories(lang);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"lang": lang,
		"page": "projects",
		"pathname": pathname,
		"data-astro-cid-lq4mfblj": true
	}, { "default": ($$result) => renderTemplate`
  ${renderComponent($$result, "Navbar", $$Navbar, {
		"lang": lang,
		"pathname": pathname,
		"data-astro-cid-lq4mfblj": true
	})}
  ${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, {
		"items": [{
			label: t("projects.breadcrumbHome"),
			href: lang === "en" ? "/" : "/es/"
		}, { label: t("projects.breadcrumbProjects") }],
		"light": true,
		"data-astro-cid-lq4mfblj": true
	})}
  ${maybeRenderHead($$result)}<main class="pt-32 lg:pt-40 pb-8 px-4 md:px-8 lg:px-24 bg-black" data-astro-cid-lq4mfblj><section class="max-w-6xl mx-auto mb-16 " data-astro-cid-lq4mfblj><h1 class="text-3xl md:text-5xl text-brand-primary font-unbounded font-bold uppercase leading-tight" data-astro-cid-lq4mfblj>${t("projects.title")}</h1><p class="text-xs font-mono md:text-xl text-gray-300 mt-4" data-astro-cid-lq4mfblj>${t("projects.description")}</p></section>${renderComponent($$result, "projects-page", "projects-page", {
		"id": "projects-page",
		"class": "max-w-6xl mx-auto flex flex-col",
		"data-astro-cid-lq4mfblj": true
	}, { "default": ($$result) => renderTemplate`
      ${localizedCategories.map((category, catIndex) => renderTemplate`<section class="category-section pb-8 lg:pb-16"${addAttribute(category.id, "data-category-id")} data-astro-cid-lq4mfblj><div class="mb-8" data-astro-cid-lq4mfblj><h2 class="text-xl md:text-2xl font-unbounded font-black text-black-700 uppercase" data-astro-cid-lq4mfblj>${category.label}</h2><p class="text-gray-300 font-mono text-base mt-2 w-full leading-relaxed" data-astro-cid-lq4mfblj>${category.statement}</p></div><div class="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" data-astro-cid-lq4mfblj>${category.works.map((work) => renderTemplate`<article class="work-card group bg-secondary hover:border hover:border-primary/50 overflow-hidden shadow-lg shadow-black/5 border border-black/5" data-astro-cid-lq4mfblj><div class="relative aspect-4/3 overflow-hidden" data-astro-cid-lq4mfblj><img${addAttribute(work.image, "src")}${addAttribute(work.imageAlt, "alt")} width="400" height="300" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-astro-cid-lq4mfblj></div><div class="p-5" data-astro-cid-lq4mfblj><h3 class="text-base font-medium uppercase font-unbounded tracking-wide text-black-700" data-astro-cid-lq4mfblj>${work.title}</h3><p class="text-base text-gray-500 mt-2 font-mono leading-relaxed line-clamp-2" data-astro-cid-lq4mfblj>${work.tagline}</p><a${addAttribute(getProjectUrl(category.id, work.id, lang), "href")} class="inline-flex items-center gap-1 mt-4 text-sm font-bold font-mono hover:text-primary text-brand-primary hover:text-black-700 transition-colors duration-200 group/link" data-astro-cid-lq4mfblj>${work.ctaLabel}<span class="transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" data-astro-cid-lq4mfblj>→</span></a></div></article>`)}</div></section>`)}
    ` })}</main>
  ${renderComponent($$result, "Footer", $$Footer, {
		"lang": lang,
		"pathname": pathname,
		"data-astro-cid-lq4mfblj": true
	})}
` })}${renderScript($$result, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/projects.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/projects.astro", void 0);
var $$file = "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/projects.astro";
var $$url = "/[...lang]/projects";
//#endregion
//#region \0virtual:astro:page:src/pages/[...lang]/projects@_@astro
var page = () => projects_exports;
//#endregion
export { page };
