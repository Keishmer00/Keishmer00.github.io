import { C as createAstro, a as renderComponent, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_zi87HHEW.mjs";
import { r as __exportAll } from "../entry.mjs";
import "./compiler_D1XTSHuQ.mjs";
import { i as useTranslations, n as $$Layout, t as $$Navbar } from "./Navbar_B5mUQThe.mjs";
//#region src/pages/[...lang]/visual-artist.astro
var visual_artist_exports = /* @__PURE__ */ __exportAll({
	default: () => $$VisualArtist,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://keishmerstudio.com");
function getStaticPaths() {
	return [{ params: { lang: void 0 } }, { params: { lang: "es" } }];
}
var $$VisualArtist = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$VisualArtist;
	const { lang = "en" } = Astro.params;
	const { t } = useTranslations(lang);
	const pathname = lang === "en" ? "/visual-artist/" : "/es/visual-artist/";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"lang": lang,
		"page": "visualArtist",
		"pathname": pathname
	}, { "default": ($$result) => renderTemplate`
  ${renderComponent($$result, "Navbar", $$Navbar, {
		"lang": lang,
		"pathname": pathname
	})}
  ${maybeRenderHead($$result)}<main class="bg-black flex flex-col items-center justify-center min-h-screen px-4 pt-24"><h1 class="text-5xl font-unbounded text-white text-center">${t("nav.visualArtist")}</h1><p class="text-gray-400 text-center mt-4 max-w-xl">${t("subpages.visualDescription")}</p></main>
` })}`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/visual-artist.astro", void 0);
var $$file = "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/pages/[...lang]/visual-artist.astro";
var $$url = "/[...lang]/visual-artist";
//#endregion
//#region \0virtual:astro:page:src/pages/[...lang]/visual-artist@_@astro
var page = () => visual_artist_exports;
//#endregion
export { page };
