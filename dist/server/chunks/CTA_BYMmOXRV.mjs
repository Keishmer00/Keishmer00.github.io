import { C as createAstro, f as renderTemplate, g as maybeRenderHead, w as createComponent } from "./server_zi87HHEW.mjs";
import "./compiler_D1XTSHuQ.mjs";
import { i as useTranslations } from "./Navbar_B5mUQThe.mjs";
//#region src/components/CTA.astro
createAstro("https://keishmerstudio.com");
var $$CTA = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CTA;
	const { lang } = Astro.props;
	const { t } = useTranslations(lang);
	return renderTemplate`${maybeRenderHead($$result)}<a href="https://wa.me/573186800595?text=Hello,%20I%20am%20interested%20in%20learning%20more%20about%20your%20products" target="_blank" class="flex items-center w-fit p-4 text-xl font-mono leading-6 text-white border border-gray-400 gap-2 bg-black  cursor-pointer mt-2 transition-transform duration-300 ease-in-out hover:border-primary hover:shadow-lg hover:shadow-primary/50 hover:scale-105 active:scale-95">${t("hero.cta")}<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#c6d2d4"><path d="m264-213 73-36q-9-30-16.5-60.5T308-371l-44 34v124Zm144-51h144q16-47 26-94.5t10-97.5q0-88-22.5-173T480-776q-63 63-85.5 147.5T372-456q0 50 10.5 97.5T408-264Zm21-213q-21-21-21-51t21-51q21-21 51-21t51 21q21 21 21 51t-21 51q-21 21-51 21t-51-21Zm267 264v-124l-44-34q-5 31-12.5 61.5T623-249l73 36ZM480-864q95 57 137.5 166T660-480v24l80 62q13 11 20.5 25.5T768-337v241l-192-96H384L192-96v-241q0-17 7-32t21-25l80-62v-24q0-109 43-218t137-166Z"></path></svg></a>`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/CTA.astro", void 0);
//#endregion
export { $$CTA as t };
