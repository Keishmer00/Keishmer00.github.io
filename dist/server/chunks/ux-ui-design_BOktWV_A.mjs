import { C as createAstro, a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_zi87HHEW.mjs";
import { r as __exportAll } from "../entry.mjs";
import "./compiler_D1XTSHuQ.mjs";
import { i as useTranslations, n as $$Layout, t as $$Navbar } from "./Navbar_B5mUQThe.mjs";
//#region src/pages/[...lang]/ux-ui-design.astro
var ux_ui_design_exports = /* @__PURE__ */ __exportAll({
	default: () => $$UxUiDesign,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://keishmerstudio.com");
function getStaticPaths() {
	return [{ params: { lang: void 0 } }, { params: { lang: "es" } }];
}
var $$UxUiDesign = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$UxUiDesign;
	const { lang = "en" } = Astro.params;
	const { t } = useTranslations(lang);
	const pathname = lang === "en" ? "/ux-ui-design/" : "/es/ux-ui-design/";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"lang": lang,
		"page": "uxui",
		"pathname": pathname
	}, { "default": ($$result) => renderTemplate`
  ${renderComponent($$result, "Navbar", $$Navbar, {
		"lang": lang,
		"pathname": pathname
	})}
  ${maybeRenderHead($$result)}<main class="bg-black flex flex-col items-center justify-center min-h-screen px-4 pt-24"><h1 class="text-5xl font-unbounded text-white text-center">${t("nav.uxuiDesigner")}</h1><p class="text-gray-400 text-center mt-4 max-w-xl">${t("subpages.uxuiDescription")}</p></main>
` })}`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/ux-ui-design.astro", void 0);
var $$file = "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/ux-ui-design.astro";
var $$url = "/[...lang]/ux-ui-design";
//#endregion
//#region \0virtual:astro:page:src/pages/[...lang]/ux-ui-design@_@astro
var page = () => ux_ui_design_exports;
//#endregion
export { page };
