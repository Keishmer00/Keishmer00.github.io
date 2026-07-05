import { C as createAstro, a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_zi87HHEW.mjs";
import { r as __exportAll } from "../entry.mjs";
import "./compiler_D1XTSHuQ.mjs";
import { i as useTranslations, n as $$Layout, t as $$Navbar } from "./Navbar_B5mUQThe.mjs";
import { t as $$Breadcrumbs } from "./Breadcrumbs_CqzMPImN.mjs";
import { t as $$Footer } from "./Footer_BxyxIJIa.mjs";
//#region src/pages/[...lang]/privacy.astro
var privacy_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Privacy,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://keishmerstudio.com");
function getStaticPaths() {
	return [{ params: { lang: void 0 } }, { params: { lang: "es" } }];
}
var $$Privacy = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Privacy;
	const { lang = "en" } = Astro.params;
	const { t } = useTranslations(lang);
	const pathname = lang === "en" ? "/privacy" : "/es/privacy";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"lang": lang,
		"page": "privacy",
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
		}, { label: t("privacy.breadcrumb") }],
		"absolute": true,
		"light": true
	})}
    ${maybeRenderHead($$result)}<main class="pt-32 lg:pt-40 pb-24 px-4 md:px-8 lg:px-24"><h1 class="text-3xl md:text-5xl font-anton font-regular uppercase leading-tight">${t("privacy.title")}</h1><p class="text-sm mb-16">${t("privacy.lastUpdate")}</p><div class="flex flex-col gap-10 max-w-3xl"><section><h3 class="font-anton text-2xl tracking-wide mb-2">${t("privacy.section1Title")}</h3><p class="text-sm leading-relaxed">${t("privacy.section1Text")}</p></section><section><h3 class="font-anton text-2xl tracking-wide mb-2">${t("privacy.section2Title")}</h3><p class="text-sm leading-relaxed">${t("privacy.section2Text")}</p></section><section><h3 class="font-anton text-2xl tracking-wide mb-2">${t("privacy.section3Title")}</h3><p class="text-sm leading-relaxed">${t("privacy.section3Text")}</p></section><section><h3 class="font-anton text-2xl tracking-wide mb-2">${t("privacy.section4Title")}</h3><p class="text-sm leading-relaxed">${t("privacy.section4Text")}</p></section><section><h3 class="font-anton text-2xl tracking-wide mb-2">${t("privacy.section5Title")}</h3><p class="text-sm leading-relaxed">${t("privacy.section5Text")}</p></section><section><h3 class="font-anton text-2xl tracking-wide mb-2">${t("privacy.section6Title")}</h3><p class="text-sm leading-relaxed">${t("privacy.section6Text")}</p></section><section><h3 class="font-anton text-2xl tracking-wide mb-2">${t("privacy.section7Title")}</h3><p class="text-sm leading-relaxed">${t("privacy.section7Text")}</p></section><section><h3 class="font-anton text-2xl tracking-wide mb-2">${t("privacy.section8Title")}</h3><p class="text-sm leading-relaxed">${t("privacy.section8Text")}</p></section></div></main>
    ${renderComponent($$result, "Footer", $$Footer, {
		"lang": lang,
		"pathname": pathname
	})}
` })}`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/privacy.astro", void 0);
var $$file = "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/privacy.astro";
var $$url = "/[...lang]/privacy";
//#endregion
//#region \0virtual:astro:page:src/pages/[...lang]/privacy@_@astro
var page = () => privacy_exports;
//#endregion
export { page };
