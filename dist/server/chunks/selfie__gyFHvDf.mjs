//#region src/assets/images/selfie.jpg
var selfie_default = new Proxy({
	"src": "/_astro/selfie.CbPCeoNO.jpg",
	"width": 3016,
	"height": 4524,
	"format": "jpg",
	"orientation": 1
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/ASUS/Documents/GitHub/WebPortfolioKeishmer/src/assets/images/selfie.jpg";
	return target[name];
} });
//#endregion
export { selfie_default as t };
