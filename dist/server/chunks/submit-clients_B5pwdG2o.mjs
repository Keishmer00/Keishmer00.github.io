import { r as __exportAll } from "../entry.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/[...lang]/api/submit-clients.ts
var submit_clients_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	try {
		const { legal_name, client_email, phone_number, text, recaptcha } = await request.json();
		if (!legal_name || !client_email || !phone_number || !text || !recaptcha) return new Response(JSON.stringify({
			success: false,
			message: "Missing required fields"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (legal_name.length > 100 || client_email.length > 100 || phone_number.length > 20) return new Response(JSON.stringify({
			success: false,
			message: "Input fields are too long"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=6LfPS0AtAAAAABy4oVv5G-k55FFlcLsEbL_lSN2b&response=${recaptcha}`;
		const recaptchaData = await (await fetch(verifyURL, { method: "POST" })).json();
		if (!recaptchaData.success || recaptchaData.score < .5) {
			console.warn("reCAPTCHA validation failed or score too low:", recaptchaData);
			return new Response(JSON.stringify({
				success: false,
				message: "Security validation failed. Please try again."
			}), {
				status: 403,
				headers: { "Content-Type": "application/json" }
			});
		}
		const supabaseUrl = "https://fjzpijpeowodguibpvlu.supabase.co";
		const supabaseKey = "sb_secret_qumH4Tr6wvXI-l4CcGgkqA_-fI0UMpD";
		console.log("SUPABASE_URL present?", true);
		console.log("SERVICE KEY prefix:", supabaseKey.slice(0, 8));
		const supabase = createClient(supabaseUrl, supabaseKey);
		const client_email_normalized = String(client_email).trim();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client_email_normalized)) return new Response(JSON.stringify({
			success: false,
			message: "Invalid client_email"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { error } = await supabase.from("leads_clients").insert([{
			legal_name,
			client_email: client_email_normalized,
			phone_number,
			message: text || null
		}]);
		if (error) {
			console.error("--- DETALLES DEL ERROR DE SUPABASE ---");
			console.error("Mensaje:", error.message);
			console.error("Detalles:", error.details);
			console.error("Sugerencia (Hint):", error.hint);
			console.error("Código de error:", error.code);
			console.error("--------------------------------------");
			return new Response(JSON.stringify({
				success: false,
				message: `Error real de Supabase: ${error.message}`,
				details: error.details
			}), {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
		return new Response(JSON.stringify({
			success: true,
			message: "Application submitted successfully"
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("API Route Error:", error);
		return new Response(JSON.stringify({
			success: false,
			message: "Internal server error"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/[...lang]/api/submit-clients@_@ts
var page = () => submit_clients_exports;
//#endregion
export { page };
