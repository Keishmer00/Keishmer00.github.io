import { C as createAstro, a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_zi87HHEW.mjs";
import { r as __exportAll } from "../entry.mjs";
import "./compiler_D1XTSHuQ.mjs";
import { i as useTranslations, n as $$Layout, t as $$Navbar } from "./Navbar_B5mUQThe.mjs";
import { t as $$Breadcrumbs } from "./Breadcrumbs_CqzMPImN.mjs";
import { t as $$Footer } from "./Footer_BxyxIJIa.mjs";
import { t as $$Form } from "./Form_C2muxrn5.mjs";
//#region src/pages/[...lang]/contact.astro
var contact_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contact,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://keishmerstudio.com");
function getStaticPaths() {
	return [{ params: { lang: void 0 } }, { params: { lang: "es" } }];
}
var $$Contact = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Contact;
	const { lang = "en" } = Astro.params;
	const { t } = useTranslations(lang);
	const pathname = lang === "en" ? "/contact" : "/es/contact";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"lang": lang,
		"page": "contact",
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
		}, { label: t("nav.contact") }],
		"light": true
	})}
    ${maybeRenderHead($$result)}<main class="pt-32 bg-black lg:pt-40 pb-8 lg:pb-24 px-4 md:px-8 lg:px-24"><section class="max-w-6xl mx-auto"><h1 class="text-3xl md:text-5xl text-brand-primary font-unbounded font-bold uppercase leading-tight">${t("contact.title")}</h1><p class="text-xs md:text-base text-gray-300 mt-4">${t("contact.description")}</p></section></main>
    ${renderComponent($$result, "Form", $$Form, { "lang": lang })} 
    ${renderComponent($$result, "Footer", $$Footer, {
		"lang": lang,
		"pathname": pathname
	})}
` })}`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/contact.astro", void 0);
var $$file = "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/contact.astro";
var $$url = "/[...lang]/contact";
//#endregion
//#region \0virtual:astro:page:src/pages/[...lang]/contact@_@astro
var page = () => contact_exports;
//#endregion
export { page };
