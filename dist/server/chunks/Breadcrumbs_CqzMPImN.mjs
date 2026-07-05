import { C as createAstro, a as renderComponent, f as renderTemplate, g as maybeRenderHead, o as Fragment, v as addAttribute, w as createComponent } from "./server_zi87HHEW.mjs";
import "./compiler_D1XTSHuQ.mjs";
//#region src/components/atoms/Breadcrumbs.astro
createAstro("https://keishmerstudio.com");
var $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Breadcrumbs;
	const { items, class: className = "", light = false } = Astro.props;
	const linkClass = light ? "text-black-700 hover:text-brand-primary transition-colors font-bold" : "text-brand-primary hover:text-brand-primary transition-colors";
	const separatorClass = light ? "gray-700" : "opacity-50 text-brand-primary/50";
	const currentClass = light ? "text-brand-primary font-bold" : "text-brand-primary font-bold";
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(` absolute z-50 w-fit mx-4 md:mx-52 lg:mx-64 pt-16 md:pt-6 ${className}`, "class")}><nav class="flex text-[11px] md:text-xs font-medium tracking-widest uppercase"><ol class="flex items-center gap-2">${items.map((item, index) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${index > 0 && renderTemplate`<li><span${addAttribute(separatorClass, "class")}>/</span></li>`}<li>${item.href ? renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(linkClass, "class")}>${item.label}</a>` : renderTemplate`<span${addAttribute(currentClass, "class")}>${item.label}</span>`}</li>` })}`)}</ol></nav></div>`;
}, "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/components/atoms/Breadcrumbs.astro", void 0);
//#endregion
export { $$Breadcrumbs as t };
