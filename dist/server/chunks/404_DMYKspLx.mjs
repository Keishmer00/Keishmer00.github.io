import { C as createAstro, a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_zi87HHEW.mjs";
import { r as __exportAll } from "../entry.mjs";
import "./compiler_D1XTSHuQ.mjs";
import { i as useTranslations, n as $$Layout, t as $$Navbar } from "./Navbar_B5mUQThe.mjs";
import { t as $$Breadcrumbs } from "./Breadcrumbs_CqzMPImN.mjs";
import { t as $$Footer } from "./Footer_BxyxIJIa.mjs";
import { t as $$CTA } from "./CTA_BYMmOXRV.mjs";
//#region src/pages/[...lang]/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://keishmerstudio.com");
function getStaticPaths() {
	return [{ params: { lang: void 0 } }, { params: { lang: "es" } }];
}
var $$404 = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$404;
	const { lang = "en" } = Astro.params;
	const { t } = useTranslations(lang);
	const pathname = lang === "en" ? "/404" : "/es/404";
	Astro.response.status = 404;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"lang": lang,
		"page": "error",
		"pathname": pathname
	}, { "default": ($$result) => renderTemplate`
    ${renderComponent($$result, "Navbar", $$Navbar, {
		"lang": lang,
		"pathname": pathname
	})}
    ${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, {
		"items": [{
			label: t("projects.breadcrumbHome"),
			href: "/"
		}, { label: "404" }],
		"absolute": true,
		"light": true
	})}
    ${maybeRenderHead($$result)}<main class="flex flex-col justify-center items-center text-center p-4 w-full min-h-screen"><h1 class="text-8xl font-unbounded text-brand-primary font-bold mb-4">404</h1><p class="text-gray-400 text-lg mb-10 max-w-lg">${t("error.message")}</p>${renderComponent($$result, "CTA", $$CTA, {
		"text": t("error.cta"),
		"link": "/"
	})}</main>
    ${renderComponent($$result, "Footer", $$Footer, {
		"lang": lang,
		"pathname": pathname
	})}
` })}`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/404.astro", void 0);
var $$file = "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/404.astro";
var $$url = "/[...lang]/404";
//#endregion
//#region \0virtual:astro:page:src/pages/[...lang]/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
